
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Search, 
  ChevronsUpDown, 
  Utensils, 
  Flame, 
  Leaf, 
  ShoppingCart,
  Plus,
  Clock
} from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { useCart } from '@/contexts/CartContext';
import MenuItemCard from '@/components/MenuItemCard';
import { supabase } from '@/integrations/supabase/client';
import { useOrderingHours } from '@/hooks/useOrderingHours';
import MenuNavigation from '@/components/MenuNavigation';
import EnhancedCategoryFilter from '@/components/EnhancedCategoryFilter';

interface MenuItem {
  id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  price: number;
  image_url: string;
  category: string;
  spiceLevel: number;
  rating: number;
  popular?: boolean;
  is_available: boolean;
}

const Menu = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [spiceLevel, setSpiceLevel] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { addItem } = useCart();
  const { isOrderingAllowed, orderingHours, loading: orderingHoursLoading } = useOrderingHours();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);

        // Only fetch items that are available (active)
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('is_available', true)
          .order('name', { ascending: true });

        if (error) {
          console.error('Error fetching menu items:', error);
          setError('Failed to load menu items.');
          return;
        }

        // Transform the data to match our MenuItem interface
        const transformedItems: MenuItem[] = (data || []).map(item => ({
          id: parseInt(item.id),
          name: item.name,
          name_ar: item.name_ar,
          description: item.description || '',
          description_ar: item.description_ar || '',
          price: item.price,
          image_url: item.image_url || '',
          category: item.category_id || 'other',
          spiceLevel: item.spice_level || 0,
          rating: item.rating || 0,
          popular: item.is_featured || false,
          is_available: item.is_available
        }));

        setItems(transformedItems);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = [
    { id: 'biryani', name: 'Biryani', name_ar: 'برياني' },
    { id: 'chicken', name: 'Chicken', name_ar: 'دجاج' },
    { id: 'kebab', name: 'Kebab', name_ar: 'كباب' },
    { id: 'curry', name: 'Curry', name_ar: 'كاري' },
    { id: 'vegetarian', name: 'Vegetarian', name_ar: 'نباتي' },
  ];

  const filteredItems = items.filter(item => {
    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category === 'all' || item.category === category;
    const spiceMatch = item.spiceLevel >= spiceLevel;
    return searchMatch && categoryMatch && spiceMatch;
  });

  const handleAddToCart = (item: MenuItem) => {
    if (!isOrderingAllowed) {
      toast({
        title: "Ordering Unavailable",
        description: "Orders are currently not being accepted. Please try again during our operating hours.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: item.id,
      name: item.name,
      nameAr: item.name_ar,
      price: item.price,
      image: item.image_url,
      spiceLevel: item.spiceLevel
    });
    toast({
      title: "Item added to cart!",
      description: `${item.name} has been added to your cart.`,
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Navigation */}
      <MenuNavigation />

      {/* Main Content */}
      <div className="pt-20 pb-24">
        {/* Ordering Status Banner */}
        {!orderingHoursLoading && !isOrderingAllowed && (
          <div className="mx-4 mb-6">
            <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-amber-800">
                  <Clock className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">Ordering Currently Unavailable</h3>
                    <p className="text-sm">
                      {orderingHours?.is_ordering_enabled 
                        ? `We accept orders from ${orderingHours.daily_start_time} to ${orderingHours.daily_end_time} daily.`
                        : 'Online ordering is temporarily disabled.'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Category Filter */}
        <EnhancedCategoryFilter
          selectedCategory={category}
          onCategoryChange={setCategory}
          searchQuery={search}
          onSearchChange={setSearch}
          categories={categories}
        />

        {/* Spice Level Filter */}
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100">
            <div className="flex items-center space-x-3 mb-4">
              <Flame className="h-6 w-6 text-orange-500" />
              <label htmlFor="spiceLevel" className="text-lg font-semibold text-gray-700">
                Spice Level: {spiceLevel}
              </label>
            </div>
            <Slider
              id="spiceLevel"
              defaultValue={[0]}
              max={3}
              step={1}
              className="w-full"
              onValueChange={(value) => setSpiceLevel(value[0])}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Mild</span>
              <span>Medium</span>
              <span>Hot</span>
              <span>Extra Hot</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="container mx-auto px-4">
          {loading && (
            <div className="text-center py-12">
              <div className="rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading delicious menu items...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${!isOrderingAllowed ? 'opacity-75' : ''}`}>
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                >
                  <MenuItemCard 
                    item={item}
                    onAddToCart={() => handleAddToCart(item)}
                    orderingDisabled={!isOrderingAllowed}
                  />
                </div>
              ))}
            </div>
          )}

          {!loading && !error && filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No dishes found</h3>
              <p className="text-gray-500">Try adjusting your search or category filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
