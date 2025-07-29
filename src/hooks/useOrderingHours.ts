
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface OrderingHours {
  is_ordering_enabled: boolean;
  daily_start_time: string;
  daily_end_time: string;
  timezone: string;
}

export function useOrderingHours() {
  const [isOrderingAllowed, setIsOrderingAllowed] = useState(true);
  const [orderingHours, setOrderingHours] = useState<OrderingHours | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOrderingHours = async () => {
      try {
        const { data, error } = await supabase
          .from('feature_flags')
          .select('*')
          .eq('flag_name', 'ordering_hours')
          .eq('is_enabled', true)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking ordering hours:', error);
          setIsOrderingAllowed(true); // Default to allowing orders if error
          setLoading(false);
          return;
        }

        if (!data?.config) {
          setIsOrderingAllowed(true); // Default to allowing orders if no config
          setLoading(false);
          return;
        }

        const config = data.config as unknown as OrderingHours;
        setOrderingHours(config);

        if (!config.is_ordering_enabled) {
          setIsOrderingAllowed(false);
          setLoading(false);
          return;
        }

        // Check if current time is within allowed hours
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        
        const isWithinHours = currentTime >= config.daily_start_time && 
                             currentTime <= config.daily_end_time;
        
        setIsOrderingAllowed(isWithinHours);
      } catch (err) {
        console.error('Error checking ordering hours:', err);
        setIsOrderingAllowed(true); // Default to allowing orders if error
      } finally {
        setLoading(false);
      }
    };

    checkOrderingHours();

    // Check every minute to update the status
    const interval = setInterval(checkOrderingHours, 60000);

    return () => clearInterval(interval);
  }, []);

  return { isOrderingAllowed, orderingHours, loading };
}
