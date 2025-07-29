import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface RealtimeReservation {
  id: string;
  reservation_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  status: string;
  special_requests?: string;
  special_occasion?: string;
  table_number?: string;
  created_at: string;
  updated_at: string;
}

export const useRealtimeReservations = () => {
  const [reservations, setReservations] = useState<RealtimeReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('reservations')
        .select('*')
        .order('reservation_date', { ascending: true });

      if (fetchError) {
        throw new Error('Failed to fetch reservations');
      }

      setReservations(data || []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch reservations'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchReservations();

    // Set up real-time subscription
    const channel = supabase
      .channel('reservations-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reservations'
        },
        () => {
          // Refetch reservations when any change occurs
          fetchReservations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    reservations,
    loading,
    error,
    refetch: fetchReservations
  };
};