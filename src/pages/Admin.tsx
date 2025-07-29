
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { MenuManagement } from '@/components/admin/MenuManagement';
import { OrderManagement } from '@/components/admin/OrderManagement';
import { ReservationManagement } from '@/components/admin/ReservationManagement';
import { CustomerManagement } from '@/components/admin/CustomerManagement';
import { Analytics } from '@/components/admin/Analytics';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { RealtimeProvider } from '@/contexts/RealtimeContext';

export type AdminSection = 
  | 'dashboard' 
  | 'menu' 
  | 'orders' 
  | 'reservations' 
  | 'customers' 
  | 'analytics' 
  | 'settings';

const Admin = () => {
  // Persist active section in sessionStorage to prevent resets on tab switches
  const [activeSection, setActiveSection] = useState<AdminSection>(() => {
    const saved = sessionStorage.getItem('admin-active-section');
    return (saved as AdminSection) || 'dashboard';
  });

  // Save active section to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('admin-active-section', activeSection);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'menu':
        return <MenuManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'reservations':
        return <ReservationManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <RealtimeProvider>
      <AdminLayout 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      >
        {renderContent()}
      </AdminLayout>
    </RealtimeProvider>
  );
};

export default Admin;
