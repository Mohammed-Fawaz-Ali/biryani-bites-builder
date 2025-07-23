
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Users, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface NewReservationFormProps {
  onClose?: () => void;
}

export function NewReservationForm({ onClose }: NewReservationFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    party_size: '',
    reservation_date: undefined as Date | undefined,
    reservation_time: '',
    special_requests: '',
    special_occasion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: timeSlots } = useQuery({
    queryKey: ['time-slots'],
    queryFn: async () => {
      // Return hardcoded time slots since time_slots table doesn't exist yet
      return [
        { id: '1', slot_time: '17:00:00' },
        { id: '2', slot_time: '17:30:00' },
        { id: '3', slot_time: '18:00:00' },
        { id: '4', slot_time: '18:30:00' },
        { id: '5', slot_time: '19:00:00' },
        { id: '6', slot_time: '19:30:00' },
        { id: '7', slot_time: '20:00:00' },
        { id: '8', slot_time: '20:30:00' },
        { id: '9', slot_time: '21:00:00' },
        { id: '10', slot_time: '21:30:00' },
        { id: '11', slot_time: '22:00:00' },
      ];
    },
  });

  const { data: availableTables } = useQuery({
    queryKey: ['available-tables', formData.reservation_date, formData.reservation_time, formData.party_size],
    queryFn: async () => {
      if (!formData.reservation_date || !formData.reservation_time || !formData.party_size) {
        return [];
      }

      // Return mock available tables for now
      return [
        { id: '1', table_number: 'T01', capacity: parseInt(formData.party_size) },
        { id: '2', table_number: 'T02', capacity: parseInt(formData.party_size) },
      ];
    },
    enabled: !!(formData.reservation_date && formData.reservation_time && formData.party_size),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('reservations')
        .insert({
          customer_id: user.id,
          customer_name: formData.customer_name,
          customer_phone: formData.customer_phone,
          customer_email: formData.customer_email,
          party_size: parseInt(formData.party_size),
          reservation_date: formData.reservation_date?.toISOString().split('T')[0],
          reservation_time: formData.reservation_time,
          special_requests: formData.special_requests || null,
          special_occasion: formData.special_occasion || null,
          status: 'pending',
          reservation_number: `RES-${Date.now()}`,
        });

      if (error) throw error;

      toast.success('Reservation submitted successfully! We will confirm shortly.');
      
      // Reset form
      setFormData({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        party_size: '',
        reservation_date: undefined,
        reservation_time: '',
        special_requests: '',
        special_occasion: '',
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error('Failed to create reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <CardTitle>Make a Reservation</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">Full Name *</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_phone">Phone Number *</Label>
              <Input
                id="customer_phone"
                type="tel"
                value={formData.customer_phone}
                onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="customer_email">Email Address</Label>
            <Input
              id="customer_email"
              type="email"
              value={formData.customer_email}
              onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="party_size">Party Size *</Label>
              <Select
                value={formData.party_size}
                onValueChange={(value) => setFormData({ ...formData, party_size: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} guests
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Reservation Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.reservation_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.reservation_date ? (
                      format(formData.reservation_date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.reservation_date}
                    onSelect={(date) => setFormData({ ...formData, reservation_date: date })}
                    disabled={(date) => date < today || date > maxDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="reservation_time">Time *</Label>
              <Select
                value={formData.reservation_time}
                onValueChange={(value) => setFormData({ ...formData, reservation_time: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots?.map((slot) => (
                    <SelectItem key={slot.id} value={slot.slot_time}>
                      {format(new Date(`2000-01-01T${slot.slot_time}`), 'h:mm a')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="special_occasion">Special Occasion</Label>
            <Select
              value={formData.special_occasion}
              onValueChange={(value) => setFormData({ ...formData, special_occasion: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select occasion (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anniversary">Anniversary</SelectItem>
                <SelectItem value="birthday">Birthday</SelectItem>
                <SelectItem value="business_lunch">Business Lunch</SelectItem>
                <SelectItem value="date_night">Date Night</SelectItem>
                <SelectItem value="family_gathering">Family Gathering</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="special_requests">Special Requests</Label>
            <Textarea
              id="special_requests"
              placeholder="Any special requests, dietary restrictions, or accessibility needs..."
              value={formData.special_requests}
              onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
            />
          </div>

          {availableTables && availableTables.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">
                ✓ Great! We have {Array.isArray(availableTables) ? availableTables.length : 0} table(s) available for your party size at this time.
              </p>
            </div>
          )}

          {formData.reservation_date && formData.reservation_time && formData.party_size && 
           availableTables && Array.isArray(availableTables) && availableTables.length === 0 && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-700">
                ⚠ No tables available for this date and time. Please try a different time or date.
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !formData.customer_name || !formData.customer_phone || 
                     !formData.party_size || !formData.reservation_date || !formData.reservation_time}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Reservation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
