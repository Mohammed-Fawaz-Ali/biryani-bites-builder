import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, User, ShoppingCart, Calendar, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  admin_id: string;
  created_at: string;
  admin?: {
    full_name: string;
  };
}

export function ActivityLogsFeed() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        setLoading(true);
        setError(undefined);

        const { data, error: fetchError } = await supabase
          .from('admin_activity_logs')
          .select(`
            id,
            action,
            entity_type,
            entity_id,
            admin_id,
            created_at,
            admin:users(full_name)
          `)
          .order('created_at', { ascending: false })
          .limit(20);

        if (fetchError) throw fetchError;

        setLogs(data || []);
      } catch (err) {
        console.error('Error fetching activity logs:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityLogs();

    // Set up real-time subscription
    const subscription = supabase
      .channel('activity-logs')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'admin_activity_logs' },
        () => fetchActivityLogs()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getEntityIcon = (entityType: string) => {
    const icons = {
      user: User,
      order: ShoppingCart,
      reservation: Calendar,
      menu_item: Settings,
    };
    return icons[entityType as keyof typeof icons] || Activity;
  };

  const getActionColor = (action: string) => {
    const colors = {
      create: 'bg-green-100 text-green-800 border-green-300',
      update: 'bg-blue-100 text-blue-800 border-blue-300',
      delete: 'bg-red-100 text-red-800 border-red-300',
      view: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return colors[action.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const formatAction = (action: string, entityType: string) => {
    const actionMap = {
      create: 'Created',
      update: 'Updated',
      delete: 'Deleted',
      view: 'Viewed',
    };
    const formattedAction = actionMap[action.toLowerCase() as keyof typeof actionMap] || action;
    const formattedEntity = entityType.replace('_', ' ');
    return `${formattedAction} ${formattedEntity}`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <Activity className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-2">Failed to load activity logs</p>
            <p className="text-sm text-gray-500">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (logs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No recent activity</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.map((log) => {
            const EntityIcon = getEntityIcon(log.entity_type);
            return (
              <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="p-2 bg-white rounded-full border">
                  <EntityIcon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {log.admin?.full_name || 'Unknown Admin'} {formatAction(log.action, log.entity_type).toLowerCase()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                  </p>
                </div>
                <Badge className={getActionColor(log.action)}>
                  {log.action}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}