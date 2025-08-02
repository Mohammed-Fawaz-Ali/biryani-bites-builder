import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';

const initialImage = "https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg";
const imageList = [
  "https://www.spiceandcolour.com/wp-content/uploads/2020/06/receta-presentacion-biryani-de-pollo-01.jpg",
  "https://www.chilitochoc.com/wp-content/uploads/2025/06/kabab-masala-curry-recipe.jpg",
  "https://thebellyrulesthemind.net/wp-content/uploads/2023/11/IMG_9872-scaled.jpg",
  "https://www.shemins.com/wp-content/uploads/2017/05/Shemins-Butter-Chicken-LR.jpg"
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useI18n();
  const [currentImage, setCurrentImage] = useState(-1);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (currentImage === -1) {
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
    <section className="bg-gradient-to-br from-vip-yellow via-warm-cream to-vip-yellow min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle Islamic pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23222222"><path d="M50 10l15 30h30l-24 18 9 30-30-22-30 22 9-30L5 40h30z"/></svg>')`,
          backgroundSize: '80px 80px'
        }}
      />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-24 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-rich-brown leading-[1.2] mb-6">
              {t('hero.title') || 'Savor Saudi Royalty'}
            </h1>
            <p className="text-lg lg:text-xl text-rich-brown leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {t('hero.tagline') || 'Where Every Grain Tells a Story'}
            </p>
            <p className="text-base text-rich-brown leading-[1.6] mb-12 max-w-2xl mx-auto lg:mx-0">
              {t('hero.description') || 'Experience the art of traditional Indian cuisine with our signature biryanis, tandoor specialties, and aromatic curries crafted by master chefs.'}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-8 mb-12 no-flip">
              <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-lg border border-golden-brown shadow-sm">
                <div className="w-10 h-10 bg-golden-brown rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">500+</span>
                </div>
                <span className="text-sm font-medium text-rich-brown no-flip">
                  {t('hero.stats.customers') || 'Customers'}
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-lg border border-golden-brown shadow-sm">
                <div className="w-10 h-10 bg-golden-brown rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">125+</span>
                </div>
                <span className="text-sm font-medium text-rich-brown no-flip">
                  {t('hero.stats.experience') || 'Years Experience'}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start no-flip">
              <Button 
                onClick={() => navigate('/order')}
                className="bg-golden-brown hover:bg-dark-brown text-white font-semibold px-8 py-6 h-12 text-base rounded-lg transition-colors duration-300 shadow-sm no-flip"
              >
                {t('hero.orderNow') || 'Order Now'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/menu')}
                className="border border-rich-brown text-rich-brown bg-transparent hover:bg-golden-brown hover:text-vip-yellow hover:border-golden-brown font-semibold px-8 py-6 h-12 text-base rounded-lg transition-all duration-300 no-flip"
              >
                {t('hero.exploreMenu') || 'Explore Menu →'}
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div 
                className="aspect-square w-full rounded-lg overflow-hidden shadow-lg"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                <img
                  src={currentImage === -1 ? initialImage : imageList[currentImage]}
                  alt={t('hero.imageAlt') || 'Signature Biryani Dish'}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-golden-brown rounded-full opacity-70"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-soft-gold rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;