
-- First, let's enhance the menu_items table to support all the requested features
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS slug text UNIQUE,
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS short_description text,
ADD COLUMN IF NOT EXISTS full_description text,
ADD COLUMN IF NOT EXISTS video_url text,
ADD COLUMN IF NOT EXISTS special_price numeric,
ADD COLUMN IF NOT EXISTS promo_price numeric,
ADD COLUMN IF NOT EXISTS include_tax boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS include_service_charge boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS stock_count integer,
ADD COLUMN IF NOT EXISTS is_out_of_stock boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_chefs_special boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_new_item boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS scheduled_publish_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS draft jsonb; -- for autosave functionality

-- Create add-ons table for menu items
CREATE TABLE IF NOT EXISTS menu_item_addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  name text NOT NULL,
  name_ar text,
  price numeric NOT NULL DEFAULT 0,
  is_available boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on addons table
ALTER TABLE menu_item_addons ENABLE ROW LEVEL SECURITY;

-- Create policies for addons
CREATE POLICY "Anyone can view menu item addons" 
ON menu_item_addons FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage menu item addons" 
ON menu_item_addons FOR ALL 
USING (is_admin(auth.uid()));

-- Create function to generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(input_text text)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN lower(regexp_replace(
    regexp_replace(input_text, '[^a-zA-Z0-9\s]', '', 'g'),
    '\s+', '-', 'g'
  ));
END;
$$;

-- Create trigger to auto-generate slug if not provided
CREATE OR REPLACE FUNCTION auto_generate_slug()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug = generate_slug(NEW.name);
    
    -- Ensure uniqueness by appending number if needed
    WHILE EXISTS (SELECT 1 FROM menu_items WHERE slug = NEW.slug AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)) LOOP
      NEW.slug = NEW.slug || '-' || floor(random() * 1000)::text;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS menu_items_auto_slug ON menu_items;
CREATE TRIGGER menu_items_auto_slug
  BEFORE INSERT OR UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_slug();

-- Create analytics table for menu items
CREATE TABLE IF NOT EXISTS menu_item_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  total_orders integer DEFAULT 0,
  total_revenue numeric DEFAULT 0,
  views_count integer DEFAULT 0,
  last_ordered_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on analytics table
ALTER TABLE menu_item_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics
CREATE POLICY "Admins can view menu analytics" 
ON menu_item_analytics FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage menu analytics" 
ON menu_item_analytics FOR ALL 
USING (is_admin(auth.uid()));

-- Create function to update analytics
CREATE OR REPLACE FUNCTION update_menu_item_analytics()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- When new order item is created, update analytics
    INSERT INTO menu_item_analytics (menu_item_id, total_orders, last_ordered_at)
    VALUES (NEW.menu_item_id, 1, now())
    ON CONFLICT (menu_item_id) 
    DO UPDATE SET 
      total_orders = menu_item_analytics.total_orders + 1,
      last_ordered_at = now(),
      updated_at = now();
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger on order_items to update analytics
CREATE TRIGGER update_analytics_on_order
  AFTER INSERT ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION update_menu_item_analytics();
