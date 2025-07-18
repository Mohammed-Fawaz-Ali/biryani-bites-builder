
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string>('customer');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setLoading(false);
      setUserRole('customer');
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;

    try {
      setLoading(true);
      console.log('Fetching user role for user:', user.id);
      
      // Use the database function to get user role
      const { data, error } = await supabase
        .rpc('get_user_role', { user_id: user.id });

      if (error) {
        console.error('Error fetching user role:', error);
        // If no role found, default to 'customer'
        setUserRole('customer');
        setError('Failed to fetch user role');
        return;
      }

      console.log('User role data:', data);
      setUserRole(data || 'customer');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch user role');
      setUserRole('customer');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string): Promise<boolean> => {
    try {
      // Update the user_type in the users table
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

  const checkUserRole = async (userId: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_role', { user_id: userId });

      if (error) {
        console.error('Error checking user role:', error);
        return null;
      }

      return data || null;
    } catch (err) {
      console.error('Error checking user role:', err);
      return null;
    }
  };

  const checkIsAdmin = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .rpc('is_admin', { user_id: userId });

      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }

      return data || false;
    } catch (err) {
      console.error('Error checking admin status:', err);
      return false;
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
    checkUserRole,
    checkIsAdmin
  };
};
