
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const MenuShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('biryani');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    { id: 'biryani', name: 'Biryani', icon: '🍛' },
    { id: 'chicken', name: 'Chicken', icon: '🍗' },
    { id: 'kebab', name: 'Kebabs', icon: '🍢' },
    { id: 'curry', name: 'Curries', icon: '🍜' },
    { id: 'veg', name: 'Vegetarian', icon: '🥗' }
  ];

  const menuItems = {
    biryani: [
      {
        id: 1,
        name: "Hyderabadi Chicken Biryani",
        description: "Aromatic basmati rice with tender chicken, cooked in traditional dum style",
        price: 299,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        popular: true,
        spiceLevel: 2
      },
      {
        id: 2,
        name: "Mutton Biryani",
        description: "Premium mutton pieces with fragrant spices and saffron rice",
        price: 399,
        rating: 4.9,
        image: "https://anantha.in/wp-content/uploads/2020/03/Mutton-Biryani-Img.jpg",
        spiceLevel: 3
      },
      {
        id: 3,
        name: "Fish Biryani",
        description: "Fresh fish fillets with coastal spices and basmati rice",
        price: 349,
        rating: 4.7,
        image: "https://images.aws.nestle.recipes/resized/5d80437e677ba82c7a4f6dfede5f6f24_fish_biryani_1500x700-1_944_531.jpg",
        spiceLevel: 2
      }
    ],
    chicken: [
      {
        id: 4,
        name: "Chicken Tikka Masala",
        description: "Grilled chicken in creamy tomato-based curry",
        price: 249,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1600628422019-6c1a9b7b8c5e?auto=format&fit=crop&w=400&q=80",
        popular: true,
        spiceLevel: 2
      },
      {
        id: 5,
        name: "Butter Chicken",
        description: "Tender chicken in rich, buttery tomato gravy",
        price: 269,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
        spiceLevel: 1
      }
    ],
    kebab: [
      {
        id: 6,
        name: "Seekh Kebab",
        description: "Spiced minced meat grilled to perfection",
        price: 199,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        spiceLevel: 3
      },
      {
        id: 7,
        name: "Chicken Tikka",
        description: "Marinated chicken chunks grilled in tandoor",
        price: 229,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
        spiceLevel: 2
      }
    ],
    curry: [
      {
        id: 8,
        name: "Dal Makhani",
        description: "Creamy black lentils cooked overnight",
        price: 179,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
        spiceLevel: 1
      }
    ],
    veg: [
      {
        id: 9,
        name: "Paneer Tikka",
        description: "Marinated cottage cheese cubes grilled with peppers",
        price: 219,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
        spiceLevel: 2
      }
    ]
  };

  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const getSpiceIndicator = (level) => {
    return '🌶️'.repeat(level) + '⚪'.repeat(3 - level);
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`px-6 py-3 ${selectedCategory === category.id ? 
              'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 
              'hover:bg-orange-50 hover:border-orange-300'}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="mr-2 text-lg">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems[selectedCategory]?.map(item => (
          <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-orange-50 overflow-hidden">
            <CardContent className="p-0">
              {/* Image Section */}
              <div className="relative h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                {item.image && item.image.startsWith('http') ? (
                  <img src={item.image} alt={item.name} className="object-cover h-40 w-40 rounded-2xl shadow-lg" />
                ) : (
                  <div className="text-6xl">{item.image}</div>
                )}
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.popular && (
                    <Badge className="bg-yellow-500 text-white border-0">
                      Popular
                    </Badge>
                  )}
                </div>
                
                {/* Favorite Button */}
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 border-0 hover:bg-white"
                  onClick={() => toggleFavorite(item.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${favorites.has(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </Button>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-800 leading-tight">{item.name}</h3>
                  <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-green-600 fill-current" />
                    <span className="text-sm font-semibold text-green-700">{item.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                
                {/* Spice Level */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Spice Level:</span>
                    <span className="text-sm">{getSpiceIndicator(item.spiceLevel)}</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">₹{item.price}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 hover:bg-orange-50 hover:border-orange-300"
                  >
                    Quick View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button 
          size="lg" 
          variant="outline" 
          className="px-8 py-3 hover:bg-orange-50 hover:border-orange-300 border-2"
        >
          View Complete Menu
        </Button>
      </div>
    </div>
  );
};

export default MenuShowcase;
