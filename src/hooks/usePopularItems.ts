
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PopularItem {
  id: string;
  name: string;
  category?: string;
  rating?: number;
  total_orders: number;
  total_revenue: number;
}

export const usePopularItems = (limit: number = 5) => {
  const [data, setData] = useState<PopularItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchPopularItems();
  }, [limit]);

  const fetchPopularItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select(`
          menu_item_id,
          item_name,
          quantity,
          total_price
        `);

      if (itemsError) {
        throw new Error('Failed to fetch popular items');
      }

      // Aggregate the data
      const aggregated = (itemsData || []).reduce((acc, item) => {
        const existing = acc.find(a => a.id === item.menu_item_id);
        if (existing) {
          existing.total_orders += item.quantity;
          existing.total_revenue += item.total_price;
        } else {
          acc.push({
            id: item.menu_item_id || '',
            name: item.item_name,
            category: 'Unknown',
            rating: 0,
            total_orders: item.quantity,
            total_revenue: item.total_price
          });
        }
        return acc;
      }, [] as PopularItem[]);

      // Sort by total orders and limit results
      const sortedItems = aggregated
        .sort((a, b) => b.total_orders - a.total_orders)
        .slice(0, limit);

      setData(sortedItems);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch popular items'));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchPopularItems
  };
};
