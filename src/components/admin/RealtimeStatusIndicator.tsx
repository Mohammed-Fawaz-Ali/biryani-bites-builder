import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';
import { useRealtime } from '@/contexts/RealtimeContext';

export function RealtimeStatusIndicator() {
  const { isConnected } = useRealtime();

  return (
    <Badge 
      variant={isConnected ? "default" : "destructive"}
      className="flex items-center gap-1"
    >
      {isConnected ? (
        <>
          <Wifi className="h-3 w-3" />
          <span>Live</span>
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3" />
          <span>Offline</span>
        </>
      )}
    </Badge>
  );
}