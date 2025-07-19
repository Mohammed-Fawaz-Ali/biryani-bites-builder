
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const MenuNavigation = () => {
  const navigate = useNavigate();
  const { totalItems, totalPrice } = useCart();

  return (
    <>
      {/* Top Navigation */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
        {/* Back Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          className="bg-white/90 backdrop-blur-sm border-emerald-200 hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Cart Button */}
        <Button
          onClick={() => navigate('/checkout')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105 shadow-lg relative animate-pulse"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          <span className="mr-2">Cart</span>
          {totalItems > 0 && (
            <Badge className="bg-orange-500 text-white min-w-[1.25rem] h-5 flex items-center justify-center text-xs animate-bounce">
              {totalItems}
            </Badge>
          )}
          <span className="ml-2 font-bold">SAR {totalPrice.toFixed(2)}</span>
        </Button>
      </div>

      {/* Bottom Floating Cart Button (Alternative) */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => navigate('/checkout')}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span className="font-bold">{totalItems}</span>
            <div className="ml-2 border-l border-emerald-300 pl-2">
              SAR {totalPrice.toFixed(2)}
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
              {totalItems}
            </div>
          </Button>
        </div>
      )}
    </>
  );
};

export default MenuNavigation;
