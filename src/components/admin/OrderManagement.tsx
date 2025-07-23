
import { RealtimeOrdersTable } from './RealtimeOrdersTable';
import { OrderingHoursConfig } from './OrderingHoursConfig';
import { toast } from 'sonner';

export function OrderManagement() {
  const handleViewOrder = (orderId: string) => {
    toast.info(`Viewing order details: ${orderId}`);
    // Implementation would open order details modal or navigate to order page
  };

  return (
    <div className="space-y-6">
      {/* Ordering Hours Configuration */}
      <OrderingHoursConfig />
      
      {/* Real-time Orders Table */}
      <RealtimeOrdersTable onViewOrder={handleViewOrder} />
    </div>
  );
}
