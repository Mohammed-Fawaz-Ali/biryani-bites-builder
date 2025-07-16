
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import MenuHeader from '@/components/MenuHeader';
import CategoryFilter from '@/components/CategoryFilter';
import MenuItemCard from '@/components/MenuItemCard';
import CartDrawer from '@/components/CartDrawer';
import { supabase } from '@/integrations/supabase/client';

interface MenuItem {
  id: string;
  name: string;
  name_ar: string;
  description: string | null;
  description_ar: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  spice_level: number;
  rating: number;
  is_featured: boolean;
  is_available: boolean;
  category?: {
    name: string;
    name_ar: string;
  };
}

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch menu items from database
  const { data: menuItems = [], isLoading, error } = useQuery({
    queryKey: ['menuItems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select(`
          *,
          category:menu_categories(name, name_ar)
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching menu items:', error);
        throw error;
      }

      return data as MenuItem[];
    },
  });

  // Fetch categories for filter
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      return data;
    },
  });

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || 
        (item.category && item.category.name.toLowerCase() === selectedCategory.toLowerCase());
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name_ar.includes(searchQuery) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        `${item.spice_level} spice`.includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <MenuHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">🍛</div>
            <h3 className="text-xl font-semibold text-gray-600">Loading delicious dishes...</h3>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <MenuHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Error loading menu</h3>
            <p className="text-gray-500">Please try refreshing the page</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <MenuHeader />
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
      />

      {/* Menu Items Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <MenuItemCard 
                  key={item.id} 
                  item={{
                    id: Number(item.id),
                    name: item.name,
                    nameAr: item.name_ar,
                    description: item.description || '',
                    descriptionAr: item.description_ar || '',
                    price: Number(item.price),
                    image: item.image_url || '🍛',
                    category: item.category?.name.toLowerCase() || 'extras',
                    spiceLevel: item.spice_level,
                    rating: Number(item.rating),
                    popular: item.is_featured
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CartDrawer />
    </div>
  );
};

export default Menu;
