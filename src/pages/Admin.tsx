
import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { MenuManagement } from '@/components/admin/MenuManagement';
import { OrderManagement } from '@/components/admin/OrderManagement';
import { ReservationManagement } from '@/components/admin/ReservationManagement';
import { CustomerManagement } from '@/components/admin/CustomerManagement';
import { Analytics } from '@/components/admin/Analytics';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { SidebarProvider } from '@/components/ui/sidebar';

export type AdminSection = 
  | 'dashboard' 
  | 'menu' 
  | 'orders' 
  | 'reservations' 
  | 'customers' 
  | 'analytics' 
  | 'settings';

const Admin = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
