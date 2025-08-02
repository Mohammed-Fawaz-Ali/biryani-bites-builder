import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const MenuShowcase = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  const [selectedCategory, setSelectedCategory] = useState('biryani');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    { id: 'biryani', name: t('menu.categories.biryani'), icon: '🍛' },
    { id: 'chicken', name: t('menu.categories.chicken'), icon: '🍗' },
    { id: 'kebab', name: t('menu.categories.kebab'), icon: '🍢' },
    { id: 'curry', name: t('menu.categories.curry'), icon: '🍜' },
    { id: 'veg', name: t('menu.categories.veg'), icon: '🥗' }
  ];

  const menuItems = {
    biryani: [
      {
        id: 1,
        name: t('menu.dishes.chickenBiryani'),
        description: t('menu.dishes.chickenBiryaniDesc'),
        price: 299,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        popular: true,
        spiceLevel: 2
      },
      {
        id: 2,
        name: t('menu.dishes.muttonBiryani'),
        description: t('menu.dishes.muttonBiryaniDesc'),
        price: 399,
        rating: 4.9,
        image: "https://anantha.in/wp-content/uploads/2020/03/Mutton-Biryani-Img.jpg",
        spiceLevel: 3
      },
      {
        id: 3,
        name: t('menu.dishes.fishBiryani'),
        description: t('menu.dishes.fishBiryaniDesc'),
        price: 349,
        rating: 4.7,
        image: "https://images.aws.nestle.recipes/resized/5d80437e677ba82c7a4f6dfede5f6f24_fish_biryani_1500x700-1_944_531.jpg",
        spiceLevel: 2
      }
    ],
    chicken: [
      {
        id: 4,
        name: t('menu.dishes.chickenTikka'),
        description: t('menu.dishes.chickenTikkaDesc'),
        price: 249,
        rating: 4.6,
        image: "https://i0.wp.com/indischwindisch.com/wp-content/uploads/2022/12/Chicken-Tikka-Masala.jpg?resize=683%2C1024&ssl=1",
        popular: true,
        spiceLevel: 2
      },
      {
        id: 5,
        name: t('menu.dishes.butterChicken'),
        description: t('menu.dishes.butterChickenDesc'),
        price: 269,
        rating: 4.8,
        image: "https://www.mysavoryadventures.com/wp-content/uploads/2023/04/restaurant-style-butter-chicken-1152x1536.jpg",
        spiceLevel: 1
      }
    ],
    kebab: [
      {
        id: 6,
        name: t('menu.dishes.seekhKebab'),
        description: t('menu.dishes.seekhKebabDesc'),
        price: 199,
        rating: 4.7,
        image: "https://c.ndtvimg.com/2020-01/a39okhfk_620_625x300_21_January_20.jpg",
        spiceLevel: 3
      },
      {
        id: 7,
        name: t('menu.dishes.paneerTikka'),
        description: t('menu.dishes.paneerTikkaDesc'),
        price: 229,
        rating: 4.5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDuxOXxEoeV_2GfnqwVVkt1ffDmbGotRPAxQ&s",
        spiceLevel: 2
      }
    ],
    curry: [
      {
        id: 8,
        name: t('menu.dishes.dalMakhani'),
        description:t('menu.dishes.dalMakhaniDesc'),
        price: 179,
        rating: 4.4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhoYeLrDlhZU6koAguZE6ik3J41gHeWhxITg&s",
        spiceLevel: 1
      }
    ],
    veg: [
      {
        id: 9,
        name: t('menu.dishes.tandoorKebab'),
        description: t('menu.dishes.tandoorKebabDesc'),
        price: 219,
        rating: 4.3,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlzJMFAH3tVYc5X0TZTZuWEH9LRdUBuhjIrQ&s",
        spiceLevel: 2
      }
    ]
  };

  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(itemId) ? newFavorites.delete(itemId) : newFavorites.add(itemId);
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
              <div className="relative h-48 w-full bg-orange-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover object-center shadow-md rounded-t-lg"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.popular && (
                    <Badge className="bg-yellow-500 text-white border-0">
                      {t('menu.popular')}
                    </Badge>
                  )}
                </div>
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{t('menu.spiceLevel')}:</span>
                    <span className="text-sm">{getSpiceIndicator(item.spiceLevel)}</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">₹{item.price}</div>
                </div>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="flex-1 hover:bg-orange-50 hover:border-orange-300">
                    {t('menu.quickView')}
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {t('menu.addToCart')}
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
          onClick={() => navigate('/menu')}
        >
          {t('menu.viewCompleteMenu')}
        </Button>
      </div>
    </div>
  );
};

export default MenuShowcase;
