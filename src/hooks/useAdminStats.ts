
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AdminStats {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  totalReservations: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  newUsersToday: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalReservations: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    newUsersToday: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all required data
      const [ordersResult, usersResult, reservationsResult] = await Promise.all([
        supabase.from('orders').select('total_amount, status, created_at'),
        supabase.from('users').select('id, created_at'),
        supabase.from('reservations').select('id')
      ]);

      if (ordersResult.error || usersResult.error || reservationsResult.error) {
        throw new Error('Failed to fetch stats');
      }

      const orders = ordersResult.data || [];
      const users = usersResult.data || [];
      const reservations = reservationsResult.data || [];

      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      const pendingOrders = orders.filter(order => order.status === 'pending').length;
      const completedOrders = orders.filter(order => order.status === 'delivered').length;
      const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
      
      const today = new Date().toISOString().split('T')[0];
      const newUsersToday = users.filter(user => 
        user.created_at && user.created_at.startsWith(today)
      ).length;

      setStats({
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue,
        totalReservations: reservations.length,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        newUsersToday,
      });
    } catch (err) {
      console.error('Error fetching admin stats:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch statistics'));
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};
