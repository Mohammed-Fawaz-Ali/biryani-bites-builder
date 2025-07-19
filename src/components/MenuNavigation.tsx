
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
      <div className="fixed top-4 left-4 right-4 z-[60] flex items-center justify-between px-2 sm:px-0">
        {/* Back Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          className="bg-white/95 backdrop-blur-sm border-emerald-200 hover:bg-emerald-50 shadow-lg text-xs sm:text-sm px-2 sm:px-4 py-2 min-w-[80px]"
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden xs:inline">Back</span>
          <span className="xs:hidden">‹</span>
        </Button>

        {/* Cart Button */}
        <Button
          onClick={() => navigate('/checkout')}
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg relative px-2 sm:px-4 py-2 text-xs sm:text-sm"
        >
          <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline mr-2">Cart</span>
          {totalItems > 0 && (
            <Badge className="bg-orange-500 text-white min-w-[1rem] sm:min-w-[1.25rem] h-4 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs ml-1">
              {totalItems}
            </Badge>
          )}
          <span className="ml-1 sm:ml-2 font-bold text-[10px] sm:text-sm whitespace-nowrap">SAR {totalPrice.toFixed(2)}</span>
        </Button>
      </div>

      {/* Bottom Floating Cart Button (Alternative) - Better mobile UX */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[60]">
          <Button
            onClick={() => navigate('/checkout')}
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full shadow-2xl px-3 sm:px-6 py-3 sm:py-4 relative"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="font-bold text-sm sm:text-base">{totalItems}</span>
            <div className="ml-1 sm:ml-2 border-l border-emerald-300 pl-1 sm:pl-2 text-xs sm:text-sm">
              <span className="hidden xs:inline">SAR </span>{totalPrice.toFixed(2)}
            </div>
            {/* Simplified badge for mobile */}
            <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold">
              {totalItems}
            </div>
          </Button>
        </div>
      )}
    </>
  );
};

export default MenuNavigation;
