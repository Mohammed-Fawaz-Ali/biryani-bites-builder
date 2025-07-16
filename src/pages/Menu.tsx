
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Flame, Leaf, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MenuHeader from '@/components/MenuHeader';
import CategoryFilter from '@/components/CategoryFilter';
import MenuItemCard from '@/components/MenuItemCard';
import CartDrawer from '@/components/CartDrawer';
import CustomizeModal from '@/components/CustomizeModal';
import { useCart } from '@/contexts/CartContext';
import BackButton from '@/components/BackButton';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false);
  const { addItem } = useCart();

  const categories = [
    { id: 'all', name: 'All Items', nameAr: 'جميع الأصناف' },
    { id: 'traditional', name: 'Traditional', nameAr: 'تقليدي' },
    { id: 'grills', name: 'Grills', nameAr: 'مشاوي' },
    { id: 'appetizers', name: 'Appetizers', nameAr: 'مقبلات' },
    { id: 'desserts', name: 'Desserts', nameAr: 'حلويات' },
    { id: 'beverages', name: 'Beverages', nameAr: 'مشروبات' }
  ];

  const menuItems = [
    {
      id: 1,
      name: "Kabsa Royale",
      nameAr: "كبسة ملكية",
      description: "Traditional lamb kabsa with aromatic spices",
      price: 85,
      image: "🍛",
      category: "traditional",
      spiceLevel: 2,
      isPopular: true,
      tags: ["Traditional", "Lamb", "Rice"]
    },
    {
      id: 2,
      name: "Mandi Special",
      nameAr: "مندي مميز", 
      description: "Tender chicken mandi with fragrant rice",
      price: 65,
      image: "🍗",
      category: "traditional",
      spiceLevel: 1,
      isPopular: true,
      tags: ["Traditional", "Chicken", "Rice"]
    },
    {
      id: 3,
      name: "Mixed Grill",
      nameAr: "مشاوي مشكلة",
      description: "Assorted grilled meats with traditional sides",
      price: 120,
      image: "🥩",
      category: "grills", 
      spiceLevel: 2,
      isPopular: true,
      tags: ["Grilled", "Mixed Meats", "Traditional"]
    },
    {
      id: 4,
      name: "Hummus Platter",
      nameAr: "طبق الحمص",
      description: "Creamy hummus with olive oil and pita bread",
      price: 25,
      image: "🥙",
      category: "appetizers",
      spiceLevel: 0,
      isVegetarian: true,
      tags: ["Vegetarian", "Appetizer", "Traditional"]
    },
    {
      id: 5,
      name: "Baklava Selection",
      nameAr: "تشكيلة البقلاوة",
      description: "Assorted honey-sweetened pastries",
      price: 35,
      image: "🥮",
      category: "desserts",
      spiceLevel: 0,
      tags: ["Sweet", "Traditional", "Pastry"]
    },
    {
      id: 6,
      name: "Traditional Tea",
      nameAr: "شاي تقليدي",
      description: "Authentic Saudi tea blend with cardamom",
      price: 15,
      image: "🍵",
      category: "beverages",
      spiceLevel: 0,
      tags: ["Tea", "Traditional", "Hot"]
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nameAr.includes(searchTerm) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCustomize = (item: any) => {
    setSelectedItem(item);
    setCustomizeModalOpen(true);
  };

  const handleAddToCart = (item: any, customizations?: any) => {
    addItem({
      id: item.id,
      name: item.name,
      nameAr: item.nameAr,
      price: customizations?.totalPrice || item.price,
      image: item.image,
      spiceLevel: customizations?.spiceLevel || item.spiceLevel,
      customizations: customizations || null
    });
    setCustomizeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-emerald/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <BackButton to="/" />
          <MenuHeader />
          
          {/* Search and Filter */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald/50 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-emerald/30 focus:border-emerald"
              />
            </div>
            <Button variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onCustomize={handleCustomize}
              onAddToCart={(item) => handleAddToCart(item)}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-emerald/60 text-lg">No items found matching your search.</p>
          </div>
        )}
      </div>

      {/* Customize Modal */}
      <CustomizeModal
        item={selectedItem}
        isOpen={customizeModalOpen}
        onClose={() => setCustomizeModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export default Menu;
