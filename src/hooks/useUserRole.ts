
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkUserRole = async (userId: string) => {
    try {
      console.log('Checking role for user:', userId);
      
      // First check if user exists in users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Error fetching user:', userError);
        // If user doesn't exist, create them
        if (userError.code === 'PGRST116') {
          await createUserProfile(userId);
          return 'customer';
        }
        throw userError;
      }

      console.log('User data:', userData);
      return userData.user_type || 'customer';
    } catch (err) {
      console.error('Error fetching user role:', err);
      throw err;
    }
  };

  const createUserProfile = async (userId: string) => {
    try {
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser.user) return;

      // Create user profile
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: authUser.user.email,
          full_name: authUser.user.user_metadata?.full_name || authUser.user.email?.split('@')[0],
          user_type: 'customer'
        });

      if (insertError) {
        console.error('Error creating user profile:', insertError);
        throw insertError;
      }

      setRole('customer');
    } catch (err) {
      console.error('Error creating user profile:', err);
      setError('Failed to create user profile');
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ user_type: newRole })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      setRole(newRole);
      return true;
    } catch (err) {
      console.error('Error updating user role:', err);
      setError('Failed to update user role');
      return false;
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const userRole = await checkUserRole(user.id);
        setRole(userRole);
      } catch (err) {
        console.error('Error in fetchUserRole:', err);
        setError('Failed to fetch user role');
        setRole('customer'); // Default fallback
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const isAdmin = role === 'admin' || role === 'manager';
  const isDeliveryAgent = role === 'delivery_agent';
  const isCustomer = role === 'customer';

  return {
    role,
    loading,
    error,
    isAdmin,
    isDeliveryAgent,
    isCustomer,
    updateUserRole,
    checkUserRole
  };
};
