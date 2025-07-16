
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  status: string;
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

export const useRecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);
        
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            id,
            order_number,
            customer_id,
            status,
            total_amount,
            created_at,
            users!orders_customer_id_fkey (
              full_name,
              phone
            ),
            order_items (
              item_name,
              quantity
            )
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        if (ordersError) {
          throw ordersError;
        }

        const formattedOrders = ordersData?.map(order => ({
          id: order.id,
          order_number: order.order_number,
          customer_id: order.customer_id,
          status: order.status,
          total_amount: order.total_amount,
          created_at: order.created_at,
          customer: {
            full_name: order.users?.full_name || 'Unknown Customer',
            phone: order.users?.phone || 'No phone'
          },
          order_items: order.order_items || []
        })) || [];

        setOrders(formattedOrders);
      } catch (err) {
        console.error('Error fetching recent orders:', err);
        setError('Failed to fetch recent orders');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  return { orders, loading, error };
};
