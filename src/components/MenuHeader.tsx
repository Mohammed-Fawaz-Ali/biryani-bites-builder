
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChefHat, ShoppingCart, Globe } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const MenuHeader = () => {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    document.documentElement.dir = language === 'en' ? 'rtl' : 'ltr';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-700">
              {language === 'en' ? 'Spice Palace' : 'قصر التوابل'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hover:bg-emerald-50"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === 'en' ? 'العربية' : 'English'}
            </Button>

            {/* Cart Button */}
            <Button
              variant="outline"
              className="relative hover:bg-emerald-50"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-emerald-600 text-white min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </Badge>
              )}
              <span className="ml-2 font-medium">
                SAR {totalPrice.toFixed(2)}
              </span>
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            {language === 'en' ? 'Reserve Table' : 'احجز طاولة'}
          </Button>
          <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
            {language === 'en' ? 'Delivery' : 'التوصيل'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
