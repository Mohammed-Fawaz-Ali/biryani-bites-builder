
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Utensils, Flame, Leaf } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  name_ar: string;
  icon?: React.ElementType;
}

interface EnhancedCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: Category[];
}

const EnhancedCategoryFilter = ({ 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange,
  categories 
}: EnhancedCategoryFilterProps) => {
  // Enhanced categories with icons and colors
  const defaultCategories = [
    { id: 'all', name: 'All', name_ar: 'الكل', icon: Utensils, color: 'from-emerald-500 to-emerald-600' },
    { id: 'biryani', name: 'Biryani', name_ar: 'برياني', icon: Flame, color: 'from-orange-500 to-red-500' },
    { id: 'chicken', name: 'Chicken', name_ar: 'دجاج', icon: Utensils, color: 'from-amber-500 to-orange-500' },
    { id: 'kebab', name: 'Kebabs', name_ar: 'كباب', icon: Flame, color: 'from-red-500 to-pink-500' },
    { id: 'curry', name: 'Curry', name_ar: 'كاري', icon: Utensils, color: 'from-yellow-500 to-orange-500' },
    { id: 'vegetarian', name: 'Vegetarian', name_ar: 'نباتي', icon: Leaf, color: 'from-green-500 to-emerald-500' }
  ];

  // Use database categories if available, otherwise fallback to defaults
  const allCategories = categories.length > 0 
    ? [
        { id: 'all', name: 'All', name_ar: 'الكل', icon: Utensils, color: 'from-emerald-500 to-emerald-600' },
        ...categories.map((cat, index) => ({
          id: cat.name.toLowerCase(),
          name: cat.name,
          name_ar: cat.name_ar,
          icon: defaultCategories[index + 1]?.icon || Utensils,
          color: defaultCategories[index + 1]?.color || 'from-emerald-500 to-emerald-600'
        }))
      ]
    : defaultCategories;

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-emerald-100 sticky top-16 z-40 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-8 max-w-lg mx-auto animate-slide-up">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search delicious dishes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-4 py-3 w-full border-2 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-full text-lg transition-all duration-300 hover:shadow-lg focus:shadow-xl"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 -z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {allCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  group relative px-6 py-3 rounded-full transition-all duration-500 transform hover:scale-110
                  ${isSelected
                    ? `bg-gradient-to-r ${category.color} text-white shadow-2xl animate-pulse scale-105`
                    : 'border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:shadow-xl bg-white/80 backdrop-blur-sm'
                  }
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className={`h-5 w-5 transition-transform duration-300 group-hover:rotate-12 ${isSelected ? 'animate-bounce' : ''}`} />
                  <div className="text-center">
                    <div className="font-bold text-sm">{category.name}</div>
                    <div className="text-xs opacity-80">{category.name_ar}</div>
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Selection glow */}
                {isSelected && (
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.color} animate-ping opacity-25`}></div>
                )}
              </Button>
            );
          })}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-32 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default EnhancedCategoryFilter;
