import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { NotificationCenter } from './NotificationCenter';
import { RealtimeStatusIndicator } from './RealtimeStatusIndicator';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSection } from '@/pages/Admin';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

export function AdminLayout({ children, activeSection, onSectionChange }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white text-gray-900">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={onSectionChange} 
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {activeSection.replace(/([A-Z])/g, ' $1').trim()}
                </h1>
                <RealtimeStatusIndicator />
              </div>
              <div className="flex items-center gap-4">
                <NotificationCenter />
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}