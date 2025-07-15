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
import { StatsCard } from './StatsCard';
import { OrdersTable } from './OrdersTable';
import { PopularItemsChart } from './PopularItemsChart';
import { ActivityLogsFeed } from './ActivityLogsFeed';
import { useAdminStats } from '@/hooks/useAdminStats';
import { useRecentOrders } from '@/hooks/useRecentOrders';
import { usePopularItems } from '@/hooks/usePopularItems';
import { toast } from 'sonner';

const EnhancedAdminDashboard = () => {
  const stats = useAdminStats();
  const { data: recentOrders, loading: ordersLoading, error: ordersError } = useRecentOrders(10);
  const { data: popularItems, loading: itemsLoading, error: itemsError } = usePopularItems(5);

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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at Spice Palace.</p>
      </div>

      {/* Stats Grid - Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          change={getChangePercentage(stats.totalOrders, stats.totalOrders - 15)}
          changeType="positive"
          icon={ShoppingBag}
          iconColor="text-blue-600"
          loading={stats.loading}
          error={stats.error}
        />
        
        <StatsCard
          title="Active Users"
          value={stats.totalUsers}
          change={getChangePercentage(stats.totalUsers, stats.totalUsers - 8)}
          changeType="positive"
          icon={Users}
          iconColor="text-green-600"
          loading={stats.loading}
          error={stats.error}
        />
        
        <StatsCard
          title="Revenue"
          value={`SAR ${stats.totalRevenue.toFixed(2)}`}
          change={getChangePercentage(stats.totalRevenue, stats.totalRevenue - 1200)}
          changeType="positive"
          icon={DollarSign}
          iconColor="text-emerald-600"
          loading={stats.loading}
          error={stats.error}
        />
        
        <StatsCard
          title="Reservations"
          value={stats.totalReservations}
          change={getChangePercentage(stats.totalReservations, stats.totalReservations - 3)}
          changeType="positive"
          icon={Calendar}
          iconColor="text-purple-600"
          loading={stats.loading}
          error={stats.error}
        />
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Clock}
          iconColor="text-orange-600"
          loading={stats.loading}
          error={stats.error}
        />
        
        <StatsCard
          title="Completed Orders"
          value={stats.completedOrders}
          icon={CheckCircle}
          iconColor="text-green-600"
          loading={stats.loading}
          error={stats.error}
        />
        
        <StatsCard
          title="Cancelled Orders"
          value={stats.cancelledOrders}
          icon={XCircle}
          iconColor="text-red-600"
          loading={stats.loading}
          error={stats.error}
        />
        
        <StatsCard
          title="New Users Today"
          value={stats.newUsersToday}
          icon={UserPlus}
          iconColor="text-blue-600"
          loading={stats.loading}
          error={stats.error}
        />
      </div>

      {/* Main Content Grid - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders Table */}
        <OrdersTable
          orders={recentOrders}
          loading={ordersLoading}
          error={ordersError}
          onViewOrder={handleViewOrder}
        />

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