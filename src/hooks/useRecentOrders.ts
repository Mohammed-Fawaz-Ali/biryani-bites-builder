import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at: string;
  customer: {
    full_name: string;
    phone: string;
  };
  order_items: {
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
  const [error, setError] = useState<Error | undefined>();

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
            order_items(item_name, quantity)
          `)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (fetchError) throw fetchError;

        // Transform data to match Order type
        const transformedData = (data || []).map(order => ({
          ...order,
          customer: { full_name: 'Customer', phone: '' }, // Default customer info
          order_items: order.order_items || []
        }));

        setOrders(transformedData);
      } catch (err) {
        console.error('Error fetching recent orders:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, [limit]);

  return {
    data: orders,
    loading,
    error
  };
}