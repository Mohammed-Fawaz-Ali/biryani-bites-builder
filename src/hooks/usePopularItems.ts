
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PopularItem {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  orders: number;
  revenue: number;
}

export const usePopularItems = () => {
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        setLoading(true);
        
        // Get order items with their menu item details
        const { data: orderItemsData, error: orderItemsError } = await supabase
          .from('order_items')
          .select(`
            menu_item_id,
            quantity,
            total_price,
            menu_items (
              id,
              name,
              name_ar,
              price,
              image_url
            )
          `);

        if (orderItemsError) {
          throw orderItemsError;
        }

        // Group by menu item and calculate totals
        const itemStats = new Map();

        orderItemsData?.forEach(item => {
          if (!item.menu_items || !item.menu_item_id) return;
          
          const menuItem = item.menu_items;
          const key = item.menu_item_id;
          
          if (itemStats.has(key)) {
            const existing = itemStats.get(key);
            existing.orders += item.quantity;
            existing.revenue += Number(item.total_price);
          } else {
            itemStats.set(key, {
              id: key,
              name: menuItem.name,
              nameAr: menuItem.name_ar,
              price: Number(menuItem.price),
              image: menuItem.image_url || '🍛',
              orders: item.quantity,
              revenue: Number(item.total_price)
            });
          }
        });

        // Convert to array and sort by orders
        const popularItems = Array.from(itemStats.values())
          .sort((a, b) => b.orders - a.orders)
          .slice(0, 10);

        setPopularItems(popularItems);
      } catch (err) {
        console.error('Error fetching popular items:', err);
        setError('Failed to fetch popular items');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularItems();
  }, []);

  return { popularItems, loading, error };
};
