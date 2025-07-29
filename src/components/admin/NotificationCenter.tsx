import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Bell, 
  BellOff, 
  Check, 
  Trash2, 
  Volume2, 
  VolumeX,
  Settings,
  Package,
  Calendar,
  Users
} from 'lucide-react';
import { useRealtime } from '@/contexts/RealtimeContext';
import { formatDistanceToNow } from 'date-fns';

export function NotificationCenter() {
  const {
    notifications,
    newOrdersCount,
    newReservationsCount,
    markNotificationAsRead,
    clearAllNotifications,
    playNotificationSound,
    setPlayNotificationSound,
  } = useRealtime();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const totalNewItems = newOrdersCount + newReservationsCount;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'reservation':
        return <Calendar className="h-4 w-4 text-green-600" />;
      case 'customer':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'border-l-blue-500 bg-blue-50';
      case 'reservation':
        return 'border-l-green-500 bg-green-50';
      case 'customer':
        return 'border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          {playNotificationSound ? (
            <Bell className="h-4 w-4" />
          ) : (
            <BellOff className="h-4 w-4" />
          )}
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllNotifications}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            {showSettings && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {playNotificationSound ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                    <Label htmlFor="sound-toggle">Notification Sounds</Label>
                  </div>
                  <Switch
                    id="sound-toggle"
                    checked={playNotificationSound}
                    onCheckedChange={setPlayNotificationSound}
                  />
                </div>
              </div>
            )}

            {totalNewItems > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                {newOrdersCount > 0 && (
                  <div className="bg-blue-50 p-2 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-600">{newOrdersCount}</div>
                    <div className="text-xs text-blue-600">New Orders</div>
                  </div>
                )}
                {newReservationsCount > 0 && (
                  <div className="bg-green-50 p-2 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">{newReservationsCount}</div>
                    <div className="text-xs text-green-600">New Reservations</div>
                  </div>
                )}
              </div>
            )}
          </CardHeader>
          
          <Separator />
          
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No notifications</p>
                <p className="text-sm text-gray-500">You're all caught up!</p>
              </div>
            ) : (
              <ScrollArea className="h-96">
                <div className="p-2">
                  {notifications.map((notification, index) => (
                    <div key={notification.id}>
                      <div
                        className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${
                          getNotificationColor(notification.type)
                        } ${notification.read ? 'opacity-60' : ''}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm truncate">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                              </span>
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markNotificationAsRead(notification.id);
                                  }}
                                  className="h-6 px-2"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < notifications.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}