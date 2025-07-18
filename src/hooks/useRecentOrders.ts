
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Order {
  id: string;
  order_number: string;
  customer_id: string | null;
  total_amount: number;
  status: string;
  created_at: string | null;
  customer_name?: string;
}

export const useRecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
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
        .limit(10);

      if (error) {
        console.error('Error fetching recent orders:', error);
        setError('Failed to fetch recent orders');
        return;
      }

      setOrders(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch recent orders');
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    refetch: fetchRecentOrders
  };
};
