import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'customer' | 'admin' | 'super_admin';

interface UserRoleData {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  granted_at: string;
  granted_by: string | null;
}

export const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback admin emails (for backwards compatibility)
  const fallbackAdminEmails = [
    'admin@spicepalace.com',
    'manager@spicepalace.com',
    'owner@spicepalace.com',
    'fawazali1806@gmail.com'
  ];

  const checkUserRole = async () => {
    if (!user?.email) {
      setUserRole('customer');
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First, try to get role from database
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (roleError && roleError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected for non-admin users
        console.error('Error fetching user role:', roleError);
        setError('Failed to check user permissions');
      }

      let finalRole: UserRole = 'customer';
      
      if (roleData) {
        // Role found in database
        finalRole = roleData.role as UserRole;
      } else {
        // Fallback: check if user is in fallback admin emails
        const isFallbackAdmin = fallbackAdminEmails.includes(user.email.toLowerCase());
        if (isFallbackAdmin) {
          finalRole = 'admin';
          
          // Optionally, insert this user into the database for future use
          try {
            await supabase.from('user_roles').insert({
              user_id: user.id,
              email: user.email.toLowerCase(),
              role: 'admin',
              granted_by: null,
              granted_at: new Date().toISOString(),
              is_active: true
            });
          } catch (insertError) {
            console.log('Could not insert fallback admin role:', insertError);
          }
        } else {
          // Check user metadata as final fallback
          const metadataRole = user.user_metadata?.role || user.app_metadata?.role;
          if (metadataRole === 'admin' || metadataRole === 'super_admin') {
            finalRole = metadataRole as UserRole;
          }
        }
      }

      setUserRole(finalRole);
      setIsAdmin(finalRole === 'admin' || finalRole === 'super_admin');
      setIsSuperAdmin(finalRole === 'super_admin');
      
    } catch (err) {
      console.error('Error checking user role:', err);
      setError('Failed to verify user permissions');
      
      // Fallback to email-based check
      const isFallbackAdmin = fallbackAdminEmails.includes(user.email.toLowerCase());
      setUserRole(isFallbackAdmin ? 'admin' : 'customer');
      setIsAdmin(isFallbackAdmin);
      setIsSuperAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserRole();
  }, [user?.email]);

  // Function to grant admin role (only for super admins)
  const grantAdminRole = async (email: string, role: UserRole = 'admin') => {
    if (!isSuperAdmin) {
      throw new Error('Only super admins can grant roles');
    }

    try {
      const { error } = await supabase.from('user_roles').insert({
        user_id: user?.id || '',
        role: role
      });

      if (error) throw error;
      
      return { success: true };
    } catch (err) {
      console.error('Error granting admin role:', err);
      throw err;
    }
  };

  // Function to revoke admin role (only for super admins)
  const revokeAdminRole = async (email: string) => {
    if (!isSuperAdmin) {
      throw new Error('Only super admins can revoke roles');
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: 'customer' })
        .eq('user_id', user?.id);

      if (error) throw error;
      
      return { success: true };
    } catch (err) {
      console.error('Error revoking admin role:', err);
      throw err;
    }
  };

  return {
    userRole,
    isAdmin,
    isSuperAdmin,
    loading,
    error,
    grantAdminRole,
    revokeAdminRole,
    refreshRole: checkUserRole
  };
};
