import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/hooks/useRecentOrders';

export const useRealtimeOrders = (limit: number = 10) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrders = async () => {
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
        throw new Error('Failed to fetch orders');
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

      setOrders(ordersWithDetails);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch orders'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchOrders();

    // Set up real-time subscription
    const channel = supabase
      .channel('orders-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          // Refetch orders when any change occurs
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders
  };
};