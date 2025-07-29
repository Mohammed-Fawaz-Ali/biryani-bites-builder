
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'customer' | 'admin' | 'manager' | 'delivery_agent';

export const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('customer');
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
      
      // First check if the user exists in the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', user.id)
        .maybeSingle();

      if (userError) {
        console.error('Error fetching user data:', userError);
        // If user doesn't exist in users table, create them
        if (userError.code === 'PGRST116') {
          console.log('User not found in users table, creating...');
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
              user_type: 'customer'
            });
          
          if (insertError) {
            console.error('Error creating user:', insertError);
            setUserRole('customer');
            setError('Failed to create user profile');
            return;
          }
          
          setUserRole('customer');
          return;
        }
        
        setUserRole('customer');
        setError('Failed to fetch user role');
        return;
      }

      const role = userData?.user_type || 'customer';
      
      // Use the database function to get user role
      console.log('User role data:', role);
      
      // Validate that the role is one of the valid UserRole values
      const validRoles: UserRole[] = ['customer', 'admin', 'manager', 'delivery_agent'];
      if (validRoles.includes(role as UserRole)) {
        setUserRole(role as UserRole);
      } else {
        console.warn('Invalid role received:', role);
        setUserRole('customer');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch user role');
      setUserRole('customer');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole): Promise<boolean> => {
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
