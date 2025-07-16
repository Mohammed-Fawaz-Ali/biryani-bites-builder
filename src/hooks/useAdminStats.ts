import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AdminStats {
  totalOrders: number;
  totalUsers: number;
  totalReservations: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  newUsersToday: number;
  loading: boolean;
  error?: Error;
}

export function useAdminStats(): AdminStats {
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalUsers: 0,
    totalReservations: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    newUsersToday: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true, error: undefined }));

        // Fetch orders stats
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('status, total_amount, created_at');

        if (ordersError) throw ordersError;

        // Fetch users stats
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id, created_at');

        if (usersError) throw usersError;

        // Fetch reservations stats
        const { data: reservationsData, error: reservationsError } = await supabase
          .from('reservations')
          .select('id, status');

        if (reservationsError) throw reservationsError;

        // Calculate stats
        const totalOrders = ordersData?.length || 0;
        const totalUsers = usersData?.length || 0;
        const totalReservations = reservationsData?.length || 0;
        
        const totalRevenue = ordersData?.reduce((sum, order) => 
          sum + (parseFloat(order.total_amount.toString()) || 0), 0) || 0;

        const pendingOrders = ordersData?.filter(order => 
          ['pending', 'confirmed', 'preparing'].includes(order.status)).length || 0;
        
        const completedOrders = ordersData?.filter(order => 
          order.status === 'delivered').length || 0;
        
        const cancelledOrders = ordersData?.filter(order => 
          order.status === 'cancelled').length || 0;

        const today = new Date().toISOString().split('T')[0];
        const newUsersToday = usersData?.filter(user => 
          user.created_at?.startsWith(today)).length || 0;

        setStats({
          totalOrders,
          totalUsers,
          totalReservations,
          totalRevenue,
          pendingOrders,
          completedOrders,
          cancelledOrders,
          newUsersToday,
          loading: false,
        });

      } catch (error) {
        console.error('Error fetching admin stats:', error);
        setStats(prev => ({ 
          ...prev, 
          loading: false, 
          error: error as Error 
        }));
      }
    };

    fetchStats();

    // Set up real-time subscription for orders
    const ordersSubscription = supabase
      .channel('admin-orders')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders' },
        () => fetchStats()
      )
      .subscribe();

    // Set up real-time subscription for users
    const usersSubscription = supabase
      .channel('admin-users')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'users' },
        () => fetchStats()
      )
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
      usersSubscription.unsubscribe();
    };
  }, []);

  return stats;
}