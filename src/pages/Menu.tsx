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
  Plus
} from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { useCart } from '@/contexts/CartContext';
import MenuItemCard from '@/components/MenuItemCard';
import { supabase } from '@/integrations/supabase/client';

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
}

const Menu = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [spiceLevel, setSpiceLevel] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
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
          popular: item.is_featured || false
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
    { label: 'All', value: null },
    { label: 'Biryani', value: 'biryani' },
    { label: 'Chicken', value: 'chicken' },
    { label: 'Kebab', value: 'kebab' },
    { label: 'Curry', value: 'curry' },
    { label: 'Vegetarian', value: 'vegetarian' },
  ];

  const filteredItems = items.filter(item => {
    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category ? item.category === category : true;
    const spiceMatch = item.spiceLevel >= spiceLevel;
    return searchMatch && categoryMatch && spiceMatch;
  });

  const handleAddToCart = (item: MenuItem) => {
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
    <div className="container py-12">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            type="search"
            placeholder="Search menu items..."
            className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-emerald-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between text-sm"
              >
                {category ?
                  categories.find((c) => c.value === category)?.label :
                  "Select Category"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandList>
                  <CommandInput placeholder="Search category..." />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.value}
                        value={category.label}
                        onSelect={() => {
                          setCategory(category.value);
                          setOpen(false);
                        }}
                      >
                        <Utensils className="mr-2 h-4 w-4" />
                        {category.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full md:w-1/3">
          <div className="flex items-center space-x-3">
            <Flame className="h-5 w-5 text-orange-500" />
            <label htmlFor="spiceLevel" className="text-sm font-medium text-gray-700">
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
        </div>
      </div>

      {loading && <p className="text-center text-gray-600">Loading menu items...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <MenuItemCard 
                key={item.id} 
                item={item} 
              />
            ))}
          </div>
      )}
    </div>
  );
};

export default Menu;
