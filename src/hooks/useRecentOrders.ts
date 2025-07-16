import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  status: string;
  total_amount: number;
  created_at: string;
  customer?: {
    full_name: string;
    phone: string;
  };
  order_items?: {
    item_name: string;
    quantity: number;
  }[];
}

export function useRecentOrders(limit: number = 10): {
  data: Order[];
  loading: boolean;
  error?: Error;
} {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);
        setError(undefined);

        const { data, error: fetchError } = await supabase
          .from('orders')
          .select(`
            id,
            order_number,
            customer_id,
            status,
            total_amount,
            created_at,
            customer:users(full_name, phone),
            order_items(item_name, quantity)
          `)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (fetchError) throw fetchError;

        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching recent orders:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();

    // Set up real-time subscription
    const subscription = supabase
      .channel('recent-orders')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders' },
        () => fetchRecentOrders()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [limit]);

  return { data: orders, loading, error };
}