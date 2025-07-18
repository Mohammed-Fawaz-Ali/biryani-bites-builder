
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background pattern only */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="biryani" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse"><circle cx="100" cy="100" r="80" fill="%23f97316" opacity="0.1"/><circle cx="100" cy="100" r="40" fill="%23dc2626" opacity="0.1"/></pattern></defs><rect width="1200" height="800" fill="url(%23biryani)"/></svg>')`
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="text-left">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Authentic
              </span>
              <span className="block text-foreground">
                Indian Flavors
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl leading-relaxed">
              Experience the art of traditional Indian cuisine with our signature biryanis, 
              tandoor specialties, and aromatic curries crafted by master chefs.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-12">
              <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-semibold">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border">
                <Users className="h-5 w-5 text-green-500" />
                <span className="text-sm font-semibold">50k+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-semibold">30 Years Experience</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/menu')}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Explore Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/menu')}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300"
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Food image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-96 h-96 md:w-[500px] md:h-[500px] rounded-full overflow-hidden shadow-premium-xl">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Traditional Indian Biryani"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements around the image */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-foreground/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
