
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  pendingOrders: number;
  todayOrders: number;
  activeReservations: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    todayOrders: 0,
    activeReservations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch total orders
        const { count: totalOrders } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });

        // Fetch total revenue
        const { data: revenueData } = await supabase
          .from('orders')
          .select('total_amount')
          .eq('payment_status', 'completed');

        const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

        // Fetch total customers
        const { count: totalCustomers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('user_type', 'customer');

        // Fetch pending orders
        const { count: pendingOrders } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // Fetch today's orders
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { count: todayOrders } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today.toISOString());

        // Fetch active reservations
        const { count: activeReservations } = await supabase
          .from('reservations')
          .select('*', { count: 'exact', head: true })
          .in('status', ['pending', 'confirmed']);

        setStats({
          totalOrders: totalOrders || 0,
          totalRevenue,
          totalCustomers: totalCustomers || 0,
          pendingOrders: pendingOrders || 0,
          todayOrders: todayOrders || 0,
          activeReservations: activeReservations || 0,
        });
      } catch (err) {
        console.error('Error fetching admin stats:', err);
        setError('Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
