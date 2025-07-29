
import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus
} from 'lucide-react';
import StatsCard from './StatsCard';
import { RealtimeOrdersTable } from './RealtimeOrdersTable';
import { PopularItemsChart } from './PopularItemsChart';
import { ActivityLogsFeed } from './ActivityLogsFeed';
import { useAdminStats } from '@/hooks/useAdminStats';
import { usePopularItems } from '@/hooks/usePopularItems';
import { toast } from 'sonner';
import { testSupabaseConnection } from '@/integrations/supabase/client';
import { useEffect } from 'react';

const EnhancedAdminDashboard = () => {
  const { stats, loading: statsLoading, error: statsError } = useAdminStats();
  const { data: popularItems, loading: itemsLoading, error: itemsError } = usePopularItems(5);

  useEffect(() => {
    // Test Supabase connection on component mount
    testSupabaseConnection().then(isConnected => {
      if (!isConnected) {
        toast.error('Database connection failed. Please check your Supabase configuration.');
      }
    });
  }, []);

  const handleViewOrder = (orderId: string) => {
    toast.info(`Viewing order: ${orderId}`);
    // Implementation would navigate to order details
  };

  // Calculate percentage changes (mock data for demo)
  const getChangePercentage = (current: number, previous: number) => {
    if (previous === 0) return '+100%';
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid - Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          change={getChangePercentage(stats.totalOrders, stats.totalOrders - 15)}
          changeType="positive"
          icon={ShoppingBag}
          iconColor="text-blue-600"
          loading={statsLoading}
          error={statsError?.message}
        />
        
        <StatsCard
          title="Active Users"
          value={stats.totalUsers}
          change={getChangePercentage(stats.totalUsers, stats.totalUsers - 8)}
          changeType="positive"
          icon={Users}
          iconColor="text-green-600"
          loading={statsLoading}
          error={statsError?.message}
        />
        
        <StatsCard
          title="Revenue"
          value={`SAR ${stats.totalRevenue.toFixed(2)}`}
          change={getChangePercentage(stats.totalRevenue, stats.totalRevenue - 1200)}
          changeType="positive"
          icon={DollarSign}
          iconColor="text-emerald-600"
          loading={statsLoading}
          error={statsError?.message}
        />
        
        <StatsCard
          title="Reservations"
          value={stats.totalReservations}
          change={getChangePercentage(stats.totalReservations, stats.totalReservations - 3)}
          changeType="positive"
          icon={Calendar}
          iconColor="text-purple-600"
          loading={statsLoading}
          error={statsError?.message}
        />
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Clock}
          iconColor="text-orange-600"
          loading={statsLoading}
          error={statsError?.message}
        />
        
        <StatsCard
          title="Completed Orders"
          value={stats.completedOrders}
          icon={CheckCircle}
          iconColor="text-green-600"
          loading={statsLoading}
          error={statsError?.message}
        />
        
        <StatsCard
          title="Cancelled Orders"
          value={stats.cancelledOrders}
          icon={XCircle}
          iconColor="text-red-600"
          loading={statsLoading}
          error={statsError?.message}
        />
        
        <StatsCard
          title="New Users Today"
          value={stats.newUsersToday}
          icon={UserPlus}
          iconColor="text-blue-600"
          loading={statsLoading}
          error={statsError?.message}
        />
      </div>

      {/* Main Content Grid - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Orders Table */}
        <RealtimeOrdersTable onViewOrder={handleViewOrder} />

        {/* Popular Items Chart */}
        <PopularItemsChart
          items={popularItems}
          loading={itemsLoading}
          error={itemsError}
        />
      </div>

      {/* Activity Logs - Full Width */}
      <ActivityLogsFeed />
    </div>
  );
};

export default EnhancedAdminDashboard;
