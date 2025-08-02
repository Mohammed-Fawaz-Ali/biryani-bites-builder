import React, { useState, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, MessageCircle } from 'lucide-react';

const CustomerWall = () => {
  const { t, isRTL} = useI18n();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: t('testimonials.comments.1'),
      dish: t('menu.dishes.chickenBiryani'),
      image: "👩‍💼",
      verified: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment: t('testimonials.comments.2'),
      dish: t('menu.dishes.seekhKebab'),
      image: "👨‍💻",
      verified: true
    },
    {
      id: 3,
      name: "Anjali Patel",
      location: "Ahmedabad",
      rating: 4,
      comment: t('testimonials.comments.3'),
      dish: t('menu.dishes.chickenBiryani'), // or a new key like `customBiryani`
      image: "👩‍🎨",
      verified: false
    },
    {
      id: 4,
      name: "Mohammed Ali",
      location: "Hyderabad",
      rating: 5,
      comment: t('testimonials.comments.4'),
      dish: t('menu.dishes.muttonBiryani'),
      image: "👨‍🍳",
      verified: true
    },
    {
      id: 5,
      name: "Sneha Reddy",
      location: "Bangalore",
      rating: 5,
      comment: t('testimonials.comments.5'),
      dish: t('menu.dishes.chickenTikka'),
      image: "👩‍🔬",
      verified: true
    },
    {
      id: 6,
      name: "Vikram Singh",
      location: "Jaipur",
      rating: 4,
      comment: t('testimonials.comments.6'),
      dish: t('menu.dishes.seekhKebab'), // or use a new key like `mixedKebabPlatter`
      image: "👨‍🎯",
      verified: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Featured Testimonial */}
      <Card className="bg-gradient-to-r from-orange-50 via-red-50 to-yellow-50 border-orange-200 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{testimonials[currentTestimonial].image}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {testimonials[currentTestimonial].name}
              {testimonials[currentTestimonial].verified && (
                <Badge className="ml-2 bg-green-100 text-yellow-400 text-xs">
                  {t('common.user')} ✓
                </Badge>
              )}
            </h3>
            <p className="text-gray-600">{testimonials[currentTestimonial].location}</p>
          </div>

          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              {renderStars(testimonials[currentTestimonial].rating)}
            </div>
            <blockquote className="text-lg text-gray-700 italic leading-relaxed max-w-2xl mx-auto">
              "{testimonials[currentTestimonial].comment}"
            </blockquote>
          </div>

          <div className="text-center">
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-400 dark:text-gray-900 border-yellow-300">
              {t('common.addToCart')}: {testimonials[currentTestimonial].dish}
            </Badge>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent/70 ${
                  index === currentTestimonial
                    ? 'bg-yellow-400 dark:bg-yellow-400'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-3xl">{testimonial.image}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <Badge className="bg-green-100 text-yellow-400 text-xs px-2 py-0">✓</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <div className="flex mt-2">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {testimonial.comment}
              </p>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-400 dark:text-gray-900 border-yellow-300">
                  {testimonial.dish}
                </Badge>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Heart className="h-4 w-4 hover:text-red-500 cursor-pointer" />
                  <MessageCircle className="h-4 w-4 hover:text-blue-500 cursor-pointer" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerWall;
