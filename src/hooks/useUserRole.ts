import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'customer' | 'admin' | 'manager' | 'delivery_agent';

export const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      // Clear cache on logout or no user
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_id');
      setLoading(false);
      setUserRole('customer');
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Check cache first
      const cachedRole = localStorage.getItem('user_role');
      const cachedUserId = localStorage.getItem('user_id');

      if (cachedRole && cachedUserId === user.id) {
        setUserRole(cachedRole as UserRole);
        setLoading(false);
        return;
      }

      console.log('Fetching user role for user:', user.id);
      // Fetch from Supabase
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', user.id)
        .maybeSingle();

      if (userError) {
        console.error('Error fetching user data:', userError);
        if (userError.code === 'PGRST116') {
          console.log('User not found, creating default profile...');
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
              user_type: 'customer',
            });

          if (insertError) {
            console.error('Error creating user:', insertError);
            setError('Failed to create user profile');
            setUserRole('customer');
            setLoading(false);
            return;
          }

          setUserRole('customer');
          localStorage.setItem('user_role', 'customer');
          localStorage.setItem('user_id', user.id);
          setLoading(false);
          return;
        }

        setError('Failed to fetch user role');
        setUserRole('customer');
        setLoading(false);
        return;
      }

      const role = (userData?.user_type || 'customer') as UserRole;
      const validRoles: UserRole[] = ['customer', 'admin', 'manager', 'delivery_agent'];
      const finalRole = validRoles.includes(role) ? role : 'customer';
      setUserRole(finalRole);
      localStorage.setItem('user_role', finalRole);
      localStorage.setItem('user_id', user.id);
    } catch (err) {
      console.error('Error in fetchUserRole:', err);
      setError('Failed to fetch user role');
      setUserRole('customer');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ user_type: newRole })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user role:', error);
        return false;
      }

      if (localStorage.getItem('user_id') === userId) {
        localStorage.setItem('user_role', newRole);
      }

      return true;
    } catch (err) {
      console.error('Error updating user role:', err);
      return false;
    }
  };

  const checkUserRole = async (userId: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase.rpc('get_user_role', { user_id: userId });
      if (error) {
        console.error('Error checking user role via RPC:', error);
        return null;
      }
      return data || null;
    } catch (err) {
      console.error('Error in checkUserRole:', err);
      return null;
    }
  };

  const checkIsAdmin = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('is_admin', { user_id: userId });
      if (error) {
        console.error('Error checking admin status via RPC:', error);
        return false;
      }
      return data || false;
    } catch (err) {
      console.error('Error in checkIsAdmin:', err);
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
    checkIsAdmin,
  };
};
