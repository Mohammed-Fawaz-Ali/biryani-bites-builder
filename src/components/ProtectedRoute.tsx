import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, UserX, Home } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, loading: authLoading } = useAuth();
  const { userRole, loading: roleLoading, isAdmin } = useUserRole();

  // Show loading state while checking authentication or roles
  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if admin access is required
  if (requireAdmin && !isAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
          <Card className="max-w-md w-full mx-4 shadow-2xl border-0 bg-gradient-to-br from-white to-red-50">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <ShieldX className="h-12 w-12 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Access Denied</CardTitle>
              <p className="text-gray-600 mt-2">
                You don't have permission to access the admin panel.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <UserX className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold text-red-800">Administrator Access Required</h3>
                </div>
                <p className="text-sm text-red-700">
                  Only authorized administrators can access this page. If you believe this is an error, 
                  please contact the system administrator.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">What you can do:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Return to the main website</li>
                  <li>• Browse our menu and place orders</li>
                  <li>• Contact support if you need admin access</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Button>
                <Button 
                  onClick={() => window.location.href = '/menu'}
                  variant="outline"
                  className="flex-1 border-orange-200 hover:bg-orange-50"
                >
                  View Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
