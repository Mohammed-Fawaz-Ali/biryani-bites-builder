
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald/90 via-emerald/80 to-emerald/70">
      {/* Traditional Arabian architecture background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&auto=format')`
        }}
      ></div>
      
      {/* Emerald overlay for brand consistency */}
      <div className="absolute inset-0 bg-emerald/70 backdrop-blur-[2px]"></div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white">
        <div className="animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white drop-shadow-lg">
              Welcome to Al-Bayt
            </span>
            <span className="block font-arabic text-5xl md:text-6xl text-gold mt-2 drop-shadow-lg">
              أهلاً بكم في البيت
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Experience the authentic flavors of Saudi Arabia in a modern, luxurious setting
          </p>
          <p className="font-arabic text-lg md:text-xl mb-12 text-gold/90 drop-shadow-md">
            اكتشف النكهات الأصيلة للمملكة العربية السعودية في جو عصري وفاخر
          </p>

          {/* CTA Buttons matching the design */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/menu')}
              className="bg-gold hover:bg-gold/90 text-charcoal px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold min-w-[160px]"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Order Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/reservations')}
              className="border-2 border-white text-white hover:bg-white hover:text-emerald px-8 py-4 text-lg rounded-full backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300 font-semibold min-w-[160px]"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Reserve Table
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
