
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

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

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addItem } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    setIsAnimating(true);
    addItem({
      id: item.id,
      name: item.name,
      nameAr: item.name_ar,
      price: item.price,
      image: item.image_url,
      spiceLevel: item.spiceLevel
    });

    // Reset animation after a delay
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getSpiceIndicator = (level: number) => {
    return '🌶️'.repeat(level) + '⚪'.repeat(3 - level);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white overflow-hidden">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center overflow-hidden">
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-6xl shadow-lg">
            {item.image_url}
          </div>
          
          {/* Badges */}
          {item.popular && (
            <Badge className="absolute top-3 left-3 bg-amber-500 text-white border-0">
              Popular
            </Badge>
          )}

          {/* Rating */}
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
            <Star className="h-3 w-3 text-amber-500 fill-current" />
            <span className="text-xs font-semibold text-gray-700">{item.rating}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Name */}
          <h3 className="font-bold text-lg text-gray-800 leading-tight">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 font-arabic">
            {item.name_ar}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {item.description}
          </p>

          {/* Spice Level & Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Spice:</span>
              <span className="text-sm">{getSpiceIndicator(item.spiceLevel)}</span>
            </div>
            <div className="text-xl font-bold text-amber-600">
              SAR {item.price}
            </div>
          </div>

          {/* Add Button */}
          <Button 
            onClick={handleAddToCart}
            className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 ${
              isAnimating ? 'scale-95' : 'scale-100'
            }`}
            disabled={isAnimating}
          >
            <Plus className={`mr-2 h-4 w-4 transition-transform duration-300 ${
              isAnimating ? 'rotate-180' : 'rotate-0'
            }`} />
            {isAnimating ? 'Added!' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
