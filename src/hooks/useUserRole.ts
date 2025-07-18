
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string>('user');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setLoading(false);
      setUserRole('user');
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;

    try {
      setLoading(true);
      console.log('Fetching user role for user:', user.id);
      
      // Check the user_roles table instead of users table
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        // If no role found, default to 'user'
        if (error.code === 'PGRST116') {
          console.log('No role found, defaulting to user');
          setUserRole('user');
        } else {
          setError('Failed to fetch user role');
        }
        return;
      }

      console.log('User role data:', data);
      setUserRole(data?.role || 'user');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch user role');
      setUserRole('user');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string): Promise<boolean> => {
    try {
      // Check if user already has a role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);

        if (error) {
          console.error('Error updating user role:', error);
          return false;
        }
      } else {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole });

        if (error) {
          console.error('Error inserting user role:', error);
          return false;
        }
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
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error checking user role:', error);
        return null;
      }

      return data?.role || null;
    } catch (err) {
      console.error('Error checking user role:', err);
      return null;
    }
  };

  return {
    userRole,
    loading,
    error,
    isAdmin: userRole === 'admin',
    isDeliveryAgent: userRole === 'delivery_agent',
    isCustomer: userRole === 'user' || userRole === 'customer',
    updateUserRole,
    checkUserRole
  };
};
