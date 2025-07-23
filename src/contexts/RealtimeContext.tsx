import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { toast } from 'sonner';

interface RealtimeContextType {
  isConnected: boolean;
  newOrdersCount: number;
  newReservationsCount: number;
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  playNotificationSound: boolean;
  setPlayNotificationSound: (play: boolean) => void;
}

interface Notification {
  id: string;
  type: 'order' | 'reservation' | 'customer';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: any;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
};

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [isConnected, setIsConnected] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [newReservationsCount, setNewReservationsCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [playNotificationSound, setPlayNotificationSound] = useState(true);

  // Audio for notifications
  const playSound = () => {
    if (playNotificationSound) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore audio play errors (browser restrictions)
      });
    }
  };

  useEffect(() => {
    if (!user || !isAdmin) return;

    console.log('Setting up real-time subscriptions for admin user');

    // Orders subscription
    const ordersChannel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('New order received:', payload);
          
          const newNotification: Notification = {
            id: `order-${payload.new.id}`,
            type: 'order',
            title: '📦 New Order Received!',
            message: `Order #${payload.new.order_number} - SAR ${payload.new.total_amount}`,
            timestamp: new Date(),
            read: false,
            data: payload.new
          };

          setNotifications(prev => [newNotification, ...prev]);
          setNewOrdersCount(prev => prev + 1);
          
          // Show toast notification
          toast.success('New Order Received!', {
            description: `Order #${payload.new.order_number} - SAR ${payload.new.total_amount}`,
            duration: 5000,
          });

          playSound();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('Order updated:', payload);
          
          if (payload.old.status !== payload.new.status) {
            const newNotification: Notification = {
              id: `order-update-${payload.new.id}-${Date.now()}`,
              type: 'order',
              title: '📋 Order Status Updated',
              message: `Order #${payload.new.order_number} is now ${payload.new.status}`,
              timestamp: new Date(),
              read: false,
              data: payload.new
            };

            setNotifications(prev => [newNotification, ...prev]);
          }
        }
      )
      .subscribe((status) => {
        console.log('Orders subscription status:', status);
        setIsConnected(status === 'SUBSCRIBED');
      });

    // Reservations subscription
    const reservationsChannel = supabase
      .channel('reservations-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reservations'
        },
        (payload) => {
          console.log('New reservation received:', payload);
          
          const newNotification: Notification = {
            id: `reservation-${payload.new.id}`,
            type: 'reservation',
            title: '🍽️ New Reservation!',
            message: `${payload.new.customer_name} - ${payload.new.party_size} guests on ${payload.new.reservation_date}`,
            timestamp: new Date(),
            read: false,
            data: payload.new
          };

          setNotifications(prev => [newNotification, ...prev]);
          setNewReservationsCount(prev => prev + 1);
          
          toast.success('New Reservation!', {
            description: `${payload.new.customer_name} - ${payload.new.party_size} guests`,
            duration: 5000,
          });

          playSound();
        }
      )
      .subscribe();

    // Users subscription (new customers)
    const usersChannel = supabase
      .channel('users-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'users'
        },
        (payload) => {
          console.log('New user registered:', payload);
          
          const newNotification: Notification = {
            id: `user-${payload.new.id}`,
            type: 'customer',
            title: '👤 New Customer Registered!',
            message: `${payload.new.full_name || payload.new.email} joined`,
            timestamp: new Date(),
            read: false,
            data: payload.new
          };

          setNotifications(prev => [newNotification, ...prev]);
          
          toast.info('New Customer Registered!', {
            description: `${payload.new.full_name || payload.new.email} joined`,
            duration: 3000,
          });
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscriptions');
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(reservationsChannel);
      supabase.removeChannel(usersChannel);
    };
  }, [user, isAdmin]);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setNewOrdersCount(0);
    setNewReservationsCount(0);
  };

  const value: RealtimeContextType = {
    isConnected,
    newOrdersCount,
    newReservationsCount,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    playNotificationSound,
    setPlayNotificationSound,
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
};