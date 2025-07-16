
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import EnhancedAdminDashboard from '@/components/admin/EnhancedAdminDashboard';
import BackButton from '@/components/BackButton';

export type AdminSection = 'dashboard' | 'menu' | 'orders' | 'reservations' | 'customers' | 'analytics' | 'settings';

const Admin = () => {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-sand">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <BackButton to="/" />
          <EnhancedAdminDashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
