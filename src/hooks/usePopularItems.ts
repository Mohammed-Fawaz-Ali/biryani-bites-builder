
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PopularItem {
  id: string;
  name: string;
  total_quantity: number;
  total_revenue: number;
}

export const usePopularItems = () => {
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPopularItems();
  }, []);

  const fetchPopularItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('order_items')
        .select(`
          menu_item_id,
          item_name,
          quantity,
          total_price
        `)
        .order('quantity', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching popular items:', error);
        setError('Failed to fetch popular items');
        return;
      }

      // Aggregate the data
      const aggregated = data?.reduce((acc, item) => {
        const existing = acc.find(a => a.id === item.menu_item_id);
        if (existing) {
          existing.total_quantity += item.quantity;
          existing.total_revenue += item.total_price;
        } else {
          acc.push({
            id: item.menu_item_id || '',
            name: item.item_name,
            total_quantity: item.quantity,
            total_revenue: item.total_price
          });
        }
        return acc;
      }, [] as PopularItem[]) || [];

      setPopularItems(aggregated);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch popular items');
    } finally {
      setLoading(false);
    }
  };

  return {
    popularItems,
    loading,
    error,
    refetch: fetchPopularItems
  };
};
