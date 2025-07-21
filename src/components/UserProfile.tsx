
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  LogOut,
  Settings,
  ShoppingBag,
  Star,
  MapPin,
  Shield
} from 'lucide-react';

interface UserProfileProps {
  onClose?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, signOut, loading } = useAuth();
  const { userRole, loading: roleLoading, isAdmin } = useUserRole();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');

  // Debug logging to see what's happening
  useEffect(() => {
    console.log('UserProfile - User:', user?.id);
    console.log('UserProfile - UserRole:', userRole);
    console.log('UserProfile - IsAdmin:', isAdmin);
    console.log('UserProfile - RoleLoading:', roleLoading);
  }, [user, userRole, isAdmin, roleLoading]);

  const handleSignOut = async () => {
    try {
      await signOut();
      if (onClose) onClose();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const userPhone = user?.user_metadata?.phone || '';
  const userAvatar = user?.user_metadata?.avatar_url || '';
  const joinDate = user?.created_at ? new Date(user.created_at).toLocaleDateString() : '';

  return (
    <ScrollArea className="h-[650px] w-full">
      <div className="p-6">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-orange-50 max-w-2xl mx-auto">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20 border-4 border-orange-200">
                <AvatarImage src={userAvatar} alt={userDisplayName} />
                <AvatarFallback className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-lg font-bold">
                  {getInitials(userDisplayName)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">{userDisplayName}</CardTitle>
            <p className="text-gray-600">{userEmail}</p>
            <div className="flex justify-center mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Active
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
              {[
                { key: 'profile', label: 'Profile', icon: User },
                { key: 'orders', label: 'Orders', icon: ShoppingBag },
                { key: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content with ScrollArea */}
            <ScrollArea className="h-[300px] w-full">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-4 pr-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-600">{userEmail}</p>
                    </div>
                  </div>

                  {userPhone && (
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone</p>
                        <p className="text-sm text-gray-600">{userPhone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Member since</p>
                      <p className="text-sm text-gray-600">{joinDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Default Address</p>
                      <p className="text-sm text-gray-600">Not set</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Account Type</p>
                      <p className="text-sm text-gray-600 capitalize">{userRole}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4 pr-4">
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No orders yet</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      When you place your first order, it will appear here.
                    </p>
                    <Button 
                      onClick={() => window.location.href = '/menu'}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    >
                      Browse Menu
                    </Button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-4 pr-4">
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700"
                      onClick={() => {/* Handle edit profile */}}
                    >
                      <User className="h-4 w-4 mr-2 text-gray-600" />
                      Edit Profile
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700"
                      onClick={() => {/* Handle change password */}}
                    >
                      <Settings className="h-4 w-4 mr-2 text-gray-600" />
                      Change Password
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700"
                      onClick={() => {/* Handle notification settings */}}
                    >
                      <Star className="h-4 w-4 mr-2 text-gray-600" />
                      Notification Settings
                    </Button>
                    
                    {/* Admin Access Button - Only show if user has admin role and not loading */}
                    {!roleLoading && isAdmin && (
                      <>
                        <Separator />
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700"
                          onClick={() => window.location.href = '/admin'}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </ScrollArea>

            <Separator />

            {/* Sign Out Button */}
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
              disabled={loading}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default UserProfile;
