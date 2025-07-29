
-- Create enum for reservation status
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show');

-- Create enum for special occasions
CREATE TYPE special_occasion AS ENUM ('anniversary', 'birthday', 'business_lunch', 'date_night', 'family_gathering', 'other');

-- Create enum for table types
CREATE TYPE table_type AS ENUM ('two_top', 'four_top', 'six_top', 'eight_top', 'booth', 'bar', 'private_room');

-- Create tables table for restaurant layout
CREATE TABLE public.tables (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_number TEXT NOT NULL UNIQUE,
  table_type table_type NOT NULL,
  capacity INTEGER NOT NULL,
  position_x INTEGER, -- For floor plan positioning
  position_y INTEGER, -- For floor plan positioning
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create time slots table for availability management
CREATE TABLE public.time_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_time TIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  max_capacity INTEGER NOT NULL DEFAULT 50, -- Total restaurant capacity for this slot
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Update reservations table to include new fields
ALTER TABLE public.reservations 
ADD COLUMN IF NOT EXISTS special_occasion special_occasion,
ADD COLUMN IF NOT EXISTS table_id UUID REFERENCES public.tables(id),
ADD COLUMN IF NOT EXISTS pre_order_items JSONB,
ADD COLUMN IF NOT EXISTS dietary_restrictions JSONB,
ADD COLUMN IF NOT EXISTS deposit_amount NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS deposit_paid BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS customer_email TEXT,
ADD COLUMN IF NOT EXISTS auto_assign_table BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS accessibility_requests TEXT,
ADD COLUMN IF NOT EXISTS reminder_sent BOOLEAN DEFAULT false;

-- Create waitlist table
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  party_size INTEGER NOT NULL,
  requested_date DATE NOT NULL,
  requested_time TIME NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'waiting',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notified_at TIMESTAMP WITH TIME ZONE
);

-- Create reservation pre-orders table
CREATE TABLE public.reservation_pre_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reservation_id UUID NOT NULL REFERENCES public.reservations(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES public.menu_items(id),
  quantity INTEGER NOT NULL,
  special_instructions TEXT,
  unit_price NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default time slots (30-minute intervals from 5 PM to 10 PM)
INSERT INTO public.time_slots (slot_time) VALUES
('17:00:00'),
('17:30:00'),
('18:00:00'),
('18:30:00'),
('19:00:00'),
('19:30:00'),
('20:00:00'),
('20:30:00'),
('21:00:00'),
('21:30:00'),
('22:00:00');

-- Insert sample tables
INSERT INTO public.tables (table_number, table_type, capacity, position_x, position_y) VALUES
('T01', 'two_top', 2, 100, 100),
('T02', 'two_top', 2, 200, 100),
('T03', 'four_top', 4, 300, 100),
('T04', 'four_top', 4, 400, 100),
('T05', 'six_top', 6, 100, 200),
('T06', 'six_top', 6, 200, 200),
('T07', 'eight_top', 8, 300, 200),
('B01', 'booth', 4, 100, 300),
('B02', 'booth', 4, 200, 300),
('B03', 'booth', 6, 300, 300),
('BAR1', 'bar', 2, 400, 300),
('BAR2', 'bar', 2, 450, 300),
('PRIVATE', 'private_room', 12, 500, 200);

-- Enable RLS on new tables
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservation_pre_orders ENABLE ROW LEVEL SECURITY;

-- RLS policies for tables
CREATE POLICY "Anyone can view tables" ON public.tables FOR SELECT USING (true);
CREATE POLICY "Admins can manage tables" ON public.tables FOR ALL USING (is_admin(auth.uid()));

-- RLS policies for time_slots
CREATE POLICY "Anyone can view time slots" ON public.time_slots FOR SELECT USING (true);
CREATE POLICY "Admins can manage time slots" ON public.time_slots FOR ALL USING (is_admin(auth.uid()));

-- RLS policies for waitlist
CREATE POLICY "Users can view their own waitlist entries" ON public.waitlist FOR SELECT USING (true);
CREATE POLICY "Anyone can add to waitlist" ON public.waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage waitlist" ON public.waitlist FOR ALL USING (is_admin(auth.uid()));

-- RLS policies for reservation_pre_orders
CREATE POLICY "Users can view pre-orders for their reservations" ON public.reservation_pre_orders FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.reservations r 
  WHERE r.id = reservation_pre_orders.reservation_id 
  AND (r.customer_id = auth.uid() OR is_admin(auth.uid()))
));

CREATE POLICY "Users can create pre-orders for their reservations" ON public.reservation_pre_orders FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.reservations r 
  WHERE r.id = reservation_pre_orders.reservation_id 
  AND r.customer_id = auth.uid()
));

CREATE POLICY "Admins can manage all pre-orders" ON public.reservation_pre_orders FOR ALL USING (is_admin(auth.uid()));

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tables_updated_at BEFORE UPDATE ON public.tables 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to check table availability
CREATE OR REPLACE FUNCTION check_table_availability(
  table_id UUID,
  reservation_date DATE,
  reservation_time TIME,
  duration_minutes INTEGER DEFAULT 120
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.reservations r
    WHERE r.table_id = check_table_availability.table_id
    AND r.reservation_date = check_table_availability.reservation_date
    AND r.status IN ('confirmed', 'seated')
    AND (
      (r.reservation_time <= check_table_availability.reservation_time 
       AND r.reservation_time + INTERVAL '120 minutes' > check_table_availability.reservation_time)
      OR
      (check_table_availability.reservation_time <= r.reservation_time 
       AND check_table_availability.reservation_time + INTERVAL '120 minutes' > r.reservation_time)
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Create function to get available tables
CREATE OR REPLACE FUNCTION get_available_tables(
  reservation_date DATE,
  reservation_time TIME,
  party_size INTEGER
) RETURNS TABLE(
  id UUID,
  table_number TEXT,
  table_type table_type,
  capacity INTEGER,
  position_x INTEGER,
  position_y INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT t.id, t.table_number, t.table_type, t.capacity, t.position_x, t.position_y
  FROM public.tables t
  WHERE t.is_available = true
  AND t.capacity >= party_size
  AND check_table_availability(t.id, reservation_date, reservation_time);
END;
$$ LANGUAGE plpgsql;
