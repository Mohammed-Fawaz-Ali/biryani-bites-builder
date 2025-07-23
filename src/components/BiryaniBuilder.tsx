
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Plus, Minus } from 'lucide-react';

const BiryaniBuilder = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    rice: 'basmati',
    protein: 'chicken',
    spice: 'medium',
    extras: []
  });

  const [totalPrice, setTotalPrice] = useState(299);

  const options = {
    rice: [
      { id: 'basmati', name: 'Basmati Rice', price: 0, popular: true },
      { id: 'sella', name: 'Sella Rice', price: 20 },
      { id: 'brown', name: 'Brown Rice', price: 30 }
    ],
    protein: [
      { id: 'chicken', name: 'Chicken', price: 0, popular: true },
      { id: 'mutton', name: 'Mutton', price: 100 },
      { id: 'fish', name: 'Fish', price: 80 },
      { id: 'veg', name: 'Vegetables', price: -50 }
    ],
    spice: [
      { id: 'mild', name: '🌶️ Mild', price: 0 },
      { id: 'medium', name: '🌶️🌶️ Medium', price: 0, popular: true },
      { id: 'spicy', name: '🌶️🌶️🌶️ Spicy', price: 0 },
      { id: 'extra-hot', name: '🌶️🌶️🌶️🌶️ Extra Hot', price: 20 }
    ],
    extras: [
      { id: 'raita', name: 'Raita', price: 30 },
      { id: 'pickle', name: 'Pickle', price: 20 },
      { id: 'papad', name: 'Papad', price: 15 },
      { id: 'boiled-egg', name: 'Boiled Egg', price: 25 },
      { id: 'extra-gravy', name: 'Extra Gravy', price: 40 }
    ]
  };

  // Create a lookup object for easy access
  const optionsById: {
    rice: { [key: string]: any };
    protein: { [key: string]: any };
    spice: { [key: string]: any };
    extras: { [key: string]: any };
  } = {
    rice: {},
    protein: {},
    spice: {},
    extras: {}
  };
  
  Object.keys(options).forEach(category => {
    options[category as keyof typeof options].forEach(option => {
      optionsById[category as keyof typeof optionsById][option.id] = option;
    });
  });

  const handleOptionChange = (category, optionId) => {
    if (category === 'extras') {
      const currentExtras = selectedOptions.extras;
      const newExtras = currentExtras.includes(optionId)
        ? currentExtras.filter(id => id !== optionId)
        : [...currentExtras, optionId];
      
      setSelectedOptions({ ...selectedOptions, extras: newExtras });
    } else {
      setSelectedOptions({ ...selectedOptions, [category]: optionId });
    }
    
    // Calculate new price
    calculatePrice({ ...selectedOptions, [category]: category === 'extras' ? 
      (selectedOptions.extras.includes(optionId) ? 
        selectedOptions.extras.filter(id => id !== optionId) : 
        [...selectedOptions.extras, optionId]) : optionId });
  };

  const calculatePrice = (options) => {
    let basePrice = 299;
    
    // Add rice price
    const riceOption = optionsById.rice[options.rice];
    if (riceOption) basePrice += riceOption.price;
    
    // Add protein price
    const proteinOption = optionsById.protein[options.protein];
    if (proteinOption) basePrice += proteinOption.price;
    
    // Add spice price
    const spiceOption = optionsById.spice[options.spice];
    if (spiceOption) basePrice += spiceOption.price;
    
    // Add extras price
    options.extras.forEach(extraId => {
      const extra = optionsById.extras[extraId];
      if (extra) basePrice += extra.price;
    });
    
    setTotalPrice(basePrice);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4">
          <ChefHat className="h-5 w-5" />
          <span className="font-semibold">Build Your Perfect Biryani</span>
        </div>
      </div>

      {/* Rice Selection */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-800">Choose Your Rice</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {options.rice.map(option => (
            <Button
              key={option.id}
              variant={selectedOptions.rice === option.id ? "default" : "outline"}
              className={`p-4 h-auto ${selectedOptions.rice === option.id ? 
                'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 
                'hover:bg-orange-50 hover:border-orange-300'}`}
              onClick={() => handleOptionChange('rice', option.id)}
            >
              <div className="text-center">
                <div className="font-semibold">{option.name}</div>
                {option.price > 0 && <div className="text-sm">+₹{option.price}</div>}
                {option.popular && <Badge className="mt-1 bg-yellow-100 text-yellow-700 text-xs">Popular</Badge>}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Protein Selection */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-800">Choose Your Protein</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {options.protein.map(option => (
            <Button
              key={option.id}
              variant={selectedOptions.protein === option.id ? "default" : "outline"}
              className={`p-4 h-auto ${selectedOptions.protein === option.id ? 
                'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 
                'hover:bg-orange-50 hover:border-orange-300'}`}
              onClick={() => handleOptionChange('protein', option.id)}
            >
              <div className="text-center">
                <div className="font-semibold">{option.name}</div>
                {option.price > 0 && <div className="text-sm">+₹{option.price}</div>}
                {option.price < 0 && <div className="text-sm text-green-600">₹{Math.abs(option.price)} off</div>}
                {option.popular && <Badge className="mt-1 bg-yellow-100 text-yellow-700 text-xs">Popular</Badge>}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Spice Level */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-800">Spice Level</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {options.spice.map(option => (
            <Button
              key={option.id}
              variant={selectedOptions.spice === option.id ? "default" : "outline"}
              className={`p-4 h-auto ${selectedOptions.spice === option.id ? 
                'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 
                'hover:bg-orange-50 hover:border-orange-300'}`}
              onClick={() => handleOptionChange('spice', option.id)}
            >
              <div className="text-center">
                <div className="font-semibold">{option.name}</div>
                {option.price > 0 && <div className="text-sm">+₹{option.price}</div>}
                {option.popular && <Badge className="mt-1 bg-yellow-100 text-yellow-700 text-xs">Popular</Badge>}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Extras */}
      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-800">Add Extras</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {options.extras.map(option => (
            <Button
              key={option.id}
              variant={selectedOptions.extras.includes(option.id) ? "default" : "outline"}
              className={`p-3 h-auto ${selectedOptions.extras.includes(option.id) ? 
                'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 
                'hover:bg-orange-50 hover:border-orange-300'}`}
              onClick={() => handleOptionChange('extras', option.id)}
            >
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="font-semibold text-sm">{option.name}</div>
                  <div className="text-xs">+₹{option.price}</div>
                </div>
                {selectedOptions.extras.includes(option.id) ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl text-gray-800">Your Custom Biryani</h3>
            <div className="text-2xl font-bold text-orange-600">₹{totalPrice}</div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div>Rice: {optionsById.rice[selectedOptions.rice]?.name}</div>
            <div>Protein: {optionsById.protein[selectedOptions.protein]?.name}</div>
            <div>Spice: {optionsById.spice[selectedOptions.spice]?.name}</div>
            {selectedOptions.extras.length > 0 && (
              <div>Extras: {selectedOptions.extras.map(id => optionsById.extras[id]?.name).join(', ')}</div>
            )}
          </div>
          
          <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3">
            Add to Cart - ₹{totalPrice}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiryaniBuilder;
