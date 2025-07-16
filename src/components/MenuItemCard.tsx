
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Star, Flame } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CustomizeModal from './CustomizeModal';

interface MenuItem {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  image: string;
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
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

  const handleAddToCart = (itemData: any, customizations?: any) => {
    setIsAnimating(true);
    
    addItem({
      id: itemData.id,
      name: itemData.name,
      nameAr: itemData.nameAr,
      price: customizations?.totalPrice || itemData.price,
      image: itemData.image,
      spiceLevel: customizations?.spiceLevel || itemData.spiceLevel,
      customizations: customizations || null
    });

    // Reset animation after a delay
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getSpiceIndicator = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame 
        key={i} 
        className={`w-3 h-3 ${i < level ? 'text-red-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <>
      <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white overflow-hidden rounded-3xl">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative h-48 bg-gradient-to-br from-emerald-100 via-green-200 to-gold/20 flex items-center justify-center overflow-hidden">
            <div className="w-32 h-32 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-6xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
              {item.image}
            </div>
            
            {/* Badges */}
            {item.popular && (
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-gold to-yellow-500 text-white border-0 font-bold shadow-lg">
                ⭐ Popular
              </Badge>
            )}

            {/* Rating */}
            <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <Star className="h-3 w-3 text-gold fill-current" />
              <span className="text-xs font-bold text-gray-700">{item.rating}</span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Name */}
            <div>
              <h3 className="font-bold text-xl text-emerald-800 leading-tight group-hover:text-emerald-700 transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-emerald-600 font-arabic font-medium">
                {item.nameAr}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {item.description}
            </p>

            {/* Spice Level & Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 font-medium">Spice:</span>
                <div className="flex space-x-1">
                  {getSpiceIndicator(item.spiceLevel)}
                </div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
                SAR {item.price}
              </div>
            </div>

            {/* Add Button */}
            <Button 
              onClick={() => setShowCustomizeModal(true)}
              className={`w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white transition-all duration-300 rounded-2xl py-3 shadow-lg hover:shadow-xl ${
                isAnimating ? 'scale-95' : 'scale-100'
              }`}
              disabled={isAnimating}
            >
              <Plus className={`mr-2 h-5 w-5 transition-transform duration-300 ${
                isAnimating ? 'rotate-180' : 'rotate-0'
              }`} />
              {isAnimating ? 'Added!' : 'Customize & Add'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <CustomizeModal
        isOpen={showCustomizeModal}
        onClose={() => setShowCustomizeModal(false)}
        item={item}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default MenuItemCard;
