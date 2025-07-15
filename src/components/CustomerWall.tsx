
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, MessageCircle } from 'lucide-react';

const CustomerWall = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "The best biryani I've ever had! The spices were perfectly balanced and the chicken was so tender. Will definitely order again!",
      dish: "Hyderabadi Chicken Biryani",
      image: "👩‍💼",
      verified: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment: "Amazing seekh kebabs! Reminded me of the street food in Old Delhi. Authentic flavors and great service.",
      dish: "Seekh Kebab",
      image: "👨‍💻",
      verified: true
    },
    {
      id: 3,
      name: "Anjali Patel",
      location: "Ahmedabad",
      rating: 4,
      comment: "Loved the custom biryani builder! Made exactly how I like it - mild spices with extra raita. Creative concept!",
      dish: "Custom Biryani",
      image: "👩‍🎨",
      verified: false
    },
    {
      id: 4,
      name: "Mohammed Ali",
      location: "Hyderabad",
      rating: 5,
      comment: "Being from Hyderabad, I'm very particular about biryani. This place nailed it! Authentic dum style cooking.",
      dish: "Mutton Biryani",
      image: "👨‍🍳",
      verified: true
    },
    {
      id: 5,
      name: "Sneha Reddy",
      location: "Bangalore",
      rating: 5,
      comment: "The live kitchen feature is amazing! Watched my order being prepared. Very transparent and hygienic.",
      dish: "Chicken Tikka Masala",
      image: "👩‍🔬",
      verified: true
    },
    {
      id: 6,
      name: "Vikram Singh",
      location: "Jaipur",
      rating: 4,
      comment: "Great variety of kebabs! The tandoor items were especially good. Packaging was excellent for delivery.",
      dish: "Mixed Kebab Platter",
      image: "👨‍🎯",
      verified: false
    }
  ];

  const recentOrders = [
    { customer: "Ravi", dish: "Chicken Biryani", time: "2 mins ago", location: "Bandra" },
    { customer: "Meera", dish: "Fish Curry", time: "5 mins ago", location: "Andheri" },
    { customer: "Amit", dish: "Paneer Tikka", time: "8 mins ago", location: "Powai" },
    { customer: "Kavya", dish: "Mutton Seekh", time: "12 mins ago", location: "Worli" }
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
                <Badge className="ml-2 bg-green-100 text-green-700 text-xs">Verified</Badge>
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
            <Badge className="bg-orange-100 text-orange-700 border-orange-300">
              Ordered: {testimonials[currentTestimonial].dish}
            </Badge>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, 6).map((testimonial) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-3xl">{testimonial.image}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0">✓</Badge>
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
                <Badge variant="outline" className="text-xs">
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

      {/* Recent Activity Feed */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
            Recent Orders
          </h3>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-4 bg-white/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {order.customer[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{order.customer} ordered {order.dish}</p>
                    <p className="text-sm text-gray-500">{order.location} • {order.time}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  Delivered
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerWall;
