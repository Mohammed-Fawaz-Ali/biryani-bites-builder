import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Heart, Share2, Eye } from 'lucide-react';

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [likes, setLikes] = useState({});

  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600&h=400&fit=crop&auto=format",
      title: "Signature Chicken Biryani",
      description: "Our most popular dish with aromatic basmati rice and tender chicken",
      chef: "Chef Rajesh",
      category: "Biryani"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop&auto=format",
      title: "Tandoor Mixed Grill",
      description: "Fresh from our clay oven, perfectly charred and juicy",
      chef: "Chef Priya",
      category: "Tandoor"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=400&fit=crop&auto=format",
      title: "Butter Chicken Curry",
      description: "Creamy tomato-based curry with tender chicken pieces",
      chef: "Chef Kumar",
      category: "Curry"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1574653853027-5e71c0cf3c24?w=600&h=400&fit=crop&auto=format",
      title: "Masala Dosa",
      description: "Crispy South Indian crepe with spiced potato filling",
      chef: "Chef Lakshmi",
      category: "South Indian"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&auto=format",
      title: "Paneer Tikka",
      description: "Marinated cottage cheese grilled to perfection",
      chef: "Chef Anjali",
      category: "Vegetarian"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop&auto=format",
      title: "Fish Curry",
      description: "Coastal style fish curry with coconut and spices",
      chef: "Chef Ravi",
      category: "Seafood"
    }
  ];

  const handleLike = (imageId) => {
    setLikes(prev => ({
      ...prev,
      [imageId]: (prev[imageId] || 0) + 1
    }));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Card 
            key={image.id} 
            className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-[1.02] transform"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'fade-in 0.6s ease-out forwards'
            }}
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden">
              <img 
                src={image.src}
                alt={image.title}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Badge className="mb-2 bg-white/20 backdrop-blur-sm text-white border-white/30">
                  {image.category}
                </Badge>
                <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                <p className="text-sm opacity-90 mb-2">{image.description}</p>
                <p className="text-xs opacity-75">by {image.chef}</p>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(image.id);
                  }}
                >
                  <Heart className="h-4 w-4" />
                  <span className="ml-1 text-xs">{likes[image.id] || 0}</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden animate-scale-in">
            <Button
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              size="sm"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative">
                <img 
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-96 lg:h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-300">
                  {selectedImage.category}
                </Badge>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  {selectedImage.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedImage.description}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-500">Created by {selectedImage.chef}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLike(selectedImage.id)}
                      className="hover:bg-red-50 hover:border-red-300"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {likes[selectedImage.id] || 0}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                  Order This Dish
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;