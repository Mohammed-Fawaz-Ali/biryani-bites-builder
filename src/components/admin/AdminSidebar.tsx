
import { 
  LayoutDashboard, 
  Menu, 
  ShoppingCart, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings,
  ChefHat
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AdminSection } from '@/pages/Admin';

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

const menuItems = [
  { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'menu' as AdminSection, label: 'Menu Management', icon: Menu },
  { id: 'orders' as AdminSection, label: 'Orders', icon: ShoppingCart },
  { id: 'reservations' as AdminSection, label: 'Reservations', icon: Calendar },
  { id: 'customers' as AdminSection, label: 'Customers', icon: Users },
  { id: 'analytics' as AdminSection, label: 'Analytics', icon: BarChart3 },
  { id: 'settings' as AdminSection, label: 'Settings', icon: Settings },
];

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-6">
        <div className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Restaurant Admin</h2>
            <p className="text-sm text-muted-foreground">Management Dashboard</p>
          </div>
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu className="p-4 space-y-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeSection === item.id}
                onClick={() => onSectionChange(item.id)}
                className="w-full justify-start"
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
