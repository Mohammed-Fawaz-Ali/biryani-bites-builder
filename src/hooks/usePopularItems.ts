import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PopularItem {
  id: string;
  name: string;
  name_ar: string;
  category: string;
  total_orders: number;
  total_revenue: number;
  rating: number;
}

export function usePopularItems(limit: number = 5): {
  data: PopularItem[];
  loading: boolean;
  error?: Error;
} {
  const [items, setItems] = useState<PopularItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        setLoading(true);
        setError(undefined);

        // Query to get popular items based on order frequency
        const { data, error: fetchError } = await supabase
          .from('order_items')
          .select(`
            menu_item_id,
            item_name,
            item_name_ar,
            quantity,
            total_price,
            menu_item:menu_items(
              rating,
              category:menu_categories(name)
            )
          `);

        if (fetchError) throw fetchError;

        // Aggregate data by menu item
        const itemStats = new Map<string, {
          name: string;
          name_ar: string;
          category: string;
          total_orders: number;
          total_revenue: number;
          rating: number;
        }>();

        data?.forEach(item => {
          const key = item.menu_item_id || item.item_name;
          const existing = itemStats.get(key);
          
          if (existing) {
            existing.total_orders += item.quantity;
            existing.total_revenue += parseFloat(item.total_price.toString());
          } else {
            itemStats.set(key, {
              name: item.item_name,
              name_ar: item.item_name_ar || '',
              category: item.menu_item?.category?.name || 'Unknown',
              total_orders: item.quantity,
              total_revenue: parseFloat(item.total_price.toString()),
              rating: item.menu_item?.rating || 0,
            });
          }
        });

        // Convert to array and sort by total orders
        const popularItems = Array.from(itemStats.entries())
          .map(([id, stats]) => ({ id, ...stats }))
          .sort((a, b) => b.total_orders - a.total_orders)
          .slice(0, limit);

        setItems(popularItems);
      } catch (err) {
        console.error('Error fetching popular items:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularItems();

    // Set up real-time subscription
    const subscription = supabase
      .channel('popular-items')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'order_items' },
        () => fetchPopularItems()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [limit]);

  return { data: items, loading, error };
}