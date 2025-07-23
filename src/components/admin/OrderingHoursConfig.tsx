
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Save } from 'lucide-react';

interface OrderingHours {
  is_ordering_enabled: boolean;
  daily_start_time: string;
  daily_end_time: string;
  timezone: string;
}

export function OrderingHoursConfig() {
  const { toast } = useToast();
  const [hours, setHours] = useState<OrderingHours>({
    is_ordering_enabled: true,
    daily_start_time: '09:00',
    daily_end_time: '23:00',
    timezone: 'Asia/Riyadh'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadOrderingHours();
  }, []);

  const loadOrderingHours = async () => {
    try {
      const { data, error } = await supabase
        .from('feature_flags')
        .select('*')
        .eq('flag_name', 'ordering_hours')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading ordering hours:', error);
        return;
      }

      if (data?.config) {
        setHours(data.config as unknown as OrderingHours);
      }
    } catch (err) {
      console.error('Error loading ordering hours:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveOrderingHours = async () => {
    try {
      setSaving(true);

      const { error } = await supabase
        .from('feature_flags')
        .upsert({
          flag_name: 'ordering_hours',
          description: 'Configuration for daily ordering hours',
          is_enabled: true,
          config: hours as unknown as any
        }, {
          onConflict: 'flag_name'
        });

      if (error) {
        console.error('Error saving ordering hours:', error);
        toast({
          title: "Error",
          description: "Failed to save ordering hours configuration",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Ordering hours configuration saved successfully",
      });
    } catch (err) {
      console.error('Error saving ordering hours:', err);
      toast({
        title: "Error",
        description: "Failed to save ordering hours configuration",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getCurrentStatus = () => {
    if (!hours.is_ordering_enabled) return 'Ordering Disabled';
    
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    
    if (currentTime >= hours.daily_start_time && currentTime <= hours.daily_end_time) {
      return 'Ordering Active';
    } else {
      return 'Ordering Inactive (Outside Hours)';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading ordering hours configuration...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Ordering Hours Configuration
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Current Status: <span className="font-medium">{getCurrentStatus()}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="ordering-enabled"
            checked={hours.is_ordering_enabled}
            onCheckedChange={(checked) =>
              setHours(prev => ({ ...prev, is_ordering_enabled: checked }))
            }
          />
          <Label htmlFor="ordering-enabled">Enable Daily Ordering</Label>
        </div>

        {hours.is_ordering_enabled && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Daily Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={hours.daily_start_time}
                onChange={(e) =>
                  setHours(prev => ({ ...prev, daily_start_time: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">Daily End Time</Label>
              <Input
                id="end-time"
                type="time"
                value={hours.daily_end_time}
                onChange={(e) =>
                  setHours(prev => ({ ...prev, daily_end_time: e.target.value }))
                }
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Input
            id="timezone"
            value={hours.timezone}
            onChange={(e) =>
              setHours(prev => ({ ...prev, timezone: e.target.value }))
            }
            placeholder="e.g., Asia/Riyadh"
          />
        </div>

        <Button
          onClick={saveOrderingHours}
          disabled={saving}
          className="w-full"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Saving...' : 'Save Configuration'}
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>• When ordering is disabled or outside hours, customers won't be able to place orders</p>
          <p>• Inactive menu items will also be hidden from the menu page</p>
          <p>• Use 24-hour format for times (e.g., 09:00, 23:00)</p>
        </div>
      </CardContent>
    </Card>
  );
}
