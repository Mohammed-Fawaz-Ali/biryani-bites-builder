
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Order {
  id: string;
  order_number: string;
  customer_id: string | null;
  total_amount: number;
  status: string;
  created_at: string | null;
  customer?: {
    full_name?: string;
    phone?: string;
  };
  order_items?: Array<{
    quantity: number;
    item_name: string;
  }>;
}

export const useRecentOrders = (limit: number = 10) => {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchRecentOrders();
  }, [limit]);

  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          customer_id,
          total_amount,
          status,
          created_at
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (ordersError) {
        throw new Error('Failed to fetch recent orders');
      }

      // Fetch customer details and order items for each order
      const ordersWithDetails = await Promise.all(
        (ordersData || []).map(async (order) => {
          const [customerResult, itemsResult] = await Promise.all([
            supabase
              .from('users')
              .select('full_name, phone')
              .eq('id', order.customer_id || '')
              .maybeSingle(),
            supabase
              .from('order_items')
              .select('quantity, item_name')
              .eq('order_id', order.id)
          ]);

          return {
            ...order,
            customer: customerResult.data || undefined,
            order_items: itemsResult.data || []
          };
        })
      );

      setData(ordersWithDetails);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch recent orders'));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchRecentOrders
  };
};
