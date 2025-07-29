
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

const initialImage = "https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg";
const imageList = [
  "https://www.spiceandcolour.com/wp-content/uploads/2020/06/receta-presentacion-biryani-de-pollo-01.jpg",
  "https://www.chilitochoc.com/wp-content/uploads/2025/06/kabab-masala-curry-recipe.jpg",
  "https://thebellyrulesthemind.net/wp-content/uploads/2023/11/IMG_9872-scaled.jpg",
  "https://www.shemins.com/wp-content/uploads/2017/05/Shemins-Butter-Chicken-LR.jpg"
];

const HeroSection = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useI18n();
  const [currentImage, setCurrentImage] = useState(-1); // -1 means show initialImage
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (currentImage === -1) {
      // Show initial image for 2 seconds, then start slideshow
      const timer = setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentImage(0);
          setFade(true);
        }, 400);
      }, 2000);
      return () => clearTimeout(timer);
    }
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % imageList.length);
        setFade(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);
  
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50"
      style={{
        backgroundImage: "url('https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Dark tint overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="biryani" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse"><circle cx="100" cy="100" r="80" fill="%23f97316" opacity="0.2"/><circle cx="100" cy="100" r="40" fill="%23dc2626" opacity="0.2"/></pattern></defs><rect width="1200" height="800" fill="url(%23biryani)"/></svg>')`
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Text content with catchphrases */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
            <div className="animate-fade-in">
              {/* Main catchphrase */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
                  <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                    {t('hero.title')}
                  </span>
                </h1>
                
                {/* Elegant catchphrase */}
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-500 mb-4">
                  {t('hero.tagline')}
                </p>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-muted-foreground max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {t('hero.description')}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full border shadow-lg hover:shadow-xl transition-all">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{t('hero.stats.rating')}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full border shadow-lg hover:shadow-xl transition-all">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">{t('hero.stats.customers')}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full border shadow-lg hover:shadow-xl transition-all">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">{t('hero.stats.experience')}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/menu')}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  {t('hero.exploreMenu')}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/menu')}
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto"
                >
                  {t('hero.orderNow')}
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Biryani image */}
          <div className="flex justify-center mt-8 lg:mt-0">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] rounded-full overflow-hidden shadow-2xl border-4 sm:border-6 lg:border-8 border-white/50 backdrop-blur-sm bg-transparent flex items-center justify-center">
                <img
                  src={currentImage === -1 ? initialImage : imageList[currentImage]}
                  alt="Delicious Food"
                  className={`w-full h-full object-cover object-center transition-transform duration-700 transition-opacity ${fade ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transition: 'opacity 2s ease' }}
                />
              </div>
              
              {/* Floating elements around the image - Hidden on small screens */}
              <div className="hidden sm:block absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-70 flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm"></span>
              </div>
              <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 -left-4 sm:-left-6 lg:-left-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-70 flex items-center justify-center">
                <span className="text-white font-bold text-xs"></span>
              </div>
              <div className="hidden lg:block absolute top-1/2 -left-8 lg:-left-12 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-70 flex items-center justify-center">
                <span className="text-white font-bold text-xs">🌿</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
