
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Database } from '@/integrations/supabase/types';

type UserType = Database['public']['Enums']['user_type'];

export const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserType>('customer');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        setError('Failed to fetch user role');
        return;
      }

      setUserRole(data?.user_type || 'customer');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch user role');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserType): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ user_type: newRole })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user role:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error updating user role:', err);
      return false;
    }
  };

  const checkUserRole = async (userId: string): Promise<UserType | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error checking user role:', error);
        return null;
      }

      return data?.user_type || null;
    } catch (err) {
      console.error('Error checking user role:', err);
      return null;
    }
  };

  return {
    userRole,
    loading,
    error,
    isAdmin: userRole === 'admin' || userRole === 'manager',
    isDeliveryAgent: userRole === 'delivery_agent',
    isCustomer: userRole === 'customer',
    updateUserRole,
    checkUserRole
  };
};
