
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Flame } from 'lucide-react';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: number;
    name: string;
    nameAr: string;
    price: number;
    image: string;
    spiceLevel: number;
  } | null;
  onAddToCart: (item: any, customizations: any) => void;
}

const CustomizeModal = ({ isOpen, onClose, item, onAddToCart }: CustomizeModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState(item?.spiceLevel || 1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const extras = [
    { id: 'extra-rice', name: 'Extra Rice', nameAr: 'أرز إضافي', price: 5 },
    { id: 'extra-sauce', name: 'Extra Sauce', nameAr: 'صوص إضافي', price: 3 },
    { id: 'pickles', name: 'Pickles', nameAr: 'مخللات', price: 4 },
    { id: 'yogurt', name: 'Yogurt', nameAr: 'لبن', price: 6 },
  ];

  const handleAddToCart = () => {
    if (!item) return;

    const extrasPrice = selectedExtras.reduce((total, extraId) => {
      const extra = extras.find(e => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);

    const customizations = {
      quantity,
      spiceLevel,
      specialInstructions,
      extras: selectedExtras.map(id => extras.find(e => e.id === id)).filter(Boolean),
      totalPrice: (item.price + extrasPrice) * quantity
    };

    onAddToCart(item, customizations);
    
    // Reset form
    setQuantity(1);
    setSpiceLevel(item.spiceLevel);
    setSpecialInstructions('');
    setSelectedExtras([]);
    onClose();
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const getSpiceIndicator = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame 
        key={i} 
        className={`w-4 h-4 ${i < level ? 'text-red-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const extrasPrice = selectedExtras.reduce((total, extraId) => {
    const extra = extras.find(e => e.id === extraId);
    return total + (extra?.price || 0);
  }, 0);

  const totalPrice = item ? (item.price + extrasPrice) * quantity : 0;

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-emerald-800">Customize Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-200 rounded-full flex items-center justify-center text-2xl">
              {item.image}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500 font-arabic">{item.nameAr}</p>
              <p className="text-emerald-600 font-bold">SAR {item.price}</p>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <Label className="text-emerald-700 font-semibold">Quantity</Label>
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-semibold text-emerald-800 w-8 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Spice Level */}
          <div className="space-y-3">
            <Label className="text-emerald-700 font-semibold">Spice Level</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mild</span>
                <div className="flex space-x-1">
                  {getSpiceIndicator(spiceLevel)}
                </div>
                <span className="text-sm text-gray-600">Hot</span>
              </div>
              <Slider
                value={[spiceLevel]}
                onValueChange={(value) => setSpiceLevel(value[0])}
                min={1}
                max={3}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Extras */}
          <div className="space-y-3">
            <Label className="text-emerald-700 font-semibold">Add Extras</Label>
            <div className="grid grid-cols-2 gap-2">
              {extras.map((extra) => (
                <button
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedExtras.includes(extra.id)
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-medium text-sm text-gray-800">{extra.name}</div>
                  <div className="text-xs text-gray-500 font-arabic">{extra.nameAr}</div>
                  <div className="text-emerald-600 font-bold text-sm">+SAR {extra.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-3">
            <Label className="text-emerald-700 font-semibold">Special Instructions (Optional)</Label>
            <Textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests or dietary requirements..."
              className="border-emerald-200 focus:border-emerald-500"
              rows={3}
            />
          </div>

          {/* Price Summary */}
          <div className="bg-emerald-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Item ({quantity}x)</span>
              <span>SAR {(item.price * quantity).toFixed(2)}</span>
            </div>
            {extrasPrice > 0 && (
              <div className="flex justify-between text-sm">
                <span>Extras</span>
                <span>SAR {(extrasPrice * quantity).toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-emerald-200 pt-2 flex justify-between font-bold text-emerald-800">
              <span>Total</span>
              <span>SAR {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 text-lg font-semibold"
          >
            Add to Cart - SAR {totalPrice.toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeModal;
