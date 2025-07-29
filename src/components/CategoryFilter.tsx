
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  name_ar: string;
}

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: Category[];
}

const CategoryFilter = ({ 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange,
  categories 
}: CategoryFilterProps) => {
  // Default categories with static data as fallback
  const defaultCategories = [
    { id: 'all', name: 'All', name_ar: 'الكل' },
    { id: 'biryani', name: 'Biryani', name_ar: 'برياني' },
    { id: 'chicken', name: 'Chicken', name_ar: 'دجاج' },
    { id: 'kebabs', name: 'Kebabs', name_ar: 'كباب' },
    { id: 'extras', name: 'Extras', name_ar: 'إضافات' }
  ];

  // Use database categories if available, otherwise fallback to defaults
  const allCategories = [
    { id: 'all', name: 'All', name_ar: 'الكل' },
    ...categories.map(cat => ({
      id: cat.name.toLowerCase(),
      name: cat.name,
      name_ar: cat.name_ar
    }))
  ];

  const displayCategories = categories.length > 0 ? allCategories : defaultCategories;

  return (
    <section className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-[120px] z-40">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search dishes, spices, or ingredients..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {displayCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category.id)}
              className={`
                px-6 py-2 rounded-full transition-all duration-300
                ${selectedCategory === category.id
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg scale-105'
                  : 'border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:scale-105'
                }
              `}
            >
              <span className="font-medium">{category.name}</span>
              <span className="text-xs opacity-75 ml-2">{category.name_ar}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
