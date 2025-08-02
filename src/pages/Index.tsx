import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/contexts/I18nContext';
import { 
  ChefHat, 
  Sparkles, 
  MessageCircle, 
  Star, 
  Clock, 
  Users, 
  ArrowRight,
  Flame,
  Gift,
  Camera,
  Utensils,
  Eye,
  TrendingUp,
  Shield,
  Award,
  Zap,
  Heart,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
  Calendar,
  Truck,
  Globe
} from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import BiryaniBuilder from '@/components/BiryaniBuilder';
import LiveKitchen from '@/components/LiveKitchen';
import MenuShowcase from '@/components/MenuShowcase';
import CustomerWall from '@/components/CustomerWall';
import WhatsAppOrder from '@/components/WhatsAppOrder';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AuthForm from '@/components/AuthForm';
import UserProfile from '@/components/UserProfile';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { User, LogIn, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { totalItems } = useCart();
  const { language, setLanguage, t, isRTL } = useI18n();
  const [viewerCount, setViewerCount] = useState(47);
  const [recentOrder, setRecentOrder] = useState("Chicken Biryani");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate real-time activity
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 3) - 1);
      const dishes = [
        t('menu.dishes.chickenBiryani') || "Chicken Biryani", 
        t('menu.dishes.seekhKebab') || "Seekh Kebab", 
        t('menu.dishes.chickenTikka') || "Chicken Tikka Masala", 
        t('menu.dishes.fishBiryani') || "Fish Biryani"
      ];
      setRecentOrder(dishes[Math.floor(Math.random() * dishes.length)]);
    }, 8000);

    // Handle scroll effect for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [t]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || t('common.user') || 'User';
  const userAvatar = user?.user_metadata?.avatar_url || '';

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
  };

  // Quick Action Tiles Data - matching design brief services
  const quickActions = [
    {
      title: t('services.viewMenu') || 'View Menu',
      icon: Utensils,
      onClick: () => navigate('/menu'),
    },
    {
      title: t('services.reservations') || 'Reservations',
      icon: Calendar,
      onClick: () => navigate('/reservations'),
    },
    {
      title: t('services.delivery') || 'Delivery',
      icon: Truck,
      onClick: () => navigate('/menu'),
    },
    {
      title: t('services.reviews') || 'Reviews',
      icon: Star,
      onClick: () => navigate('/reviews'),
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-yellow via-warm-cream to-light-yellow text-rich-brown" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sticky Navigation with updated colors */}
      <nav className={`${isScrolled ? 'bg-yellow/95 backdrop-blur-md shadow-sm' : 'bg-yellow/90 backdrop-blur-sm'} border-b border-[#E0E0E0] sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#D39D38] rounded-full flex items-center justify-center">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-serif font-bold text-[#222222]">
                {t('brandName') || 'Al-Bayt'}
              </span>
            </div>
            
            {/* Center Navigation - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate('/')} 
                className="text-[#222222] hover:text-[#D39D38] transition-colors duration-300 relative group font-medium ml-6"
              >
                {t('navigation.home') || 'Home'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D39D38] group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => navigate('/menu')} 
                className="text-[#222222] hover:text-[#D39D38] transition-colors duration-300 relative group font-medium"
              >
                {t('navigation.menu') || 'Menu'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D39D38] group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => navigate('/reservations')} 
                className="text-[#222222] hover:text-[#D39D38] transition-colors duration-300 relative group font-medium"
              >
                {t('navigation.reservations') || 'Reservations'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D39D38] group-hover:w-full transition-all duration-300"></span>
              </button>
              <a 
                href="#about" 
                className="text-[#222222] hover:text-[#D39D38] transition-colors duration-300 relative group font-medium"
              >
                {t('navigation.about') || 'About'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D39D38] group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <Button
                size="sm"
                onClick={toggleLanguage}
                className="bg-[#D39D38] hover:bg-[#C08A2E] text-white border-none shadow-sm"
              >
                <Globe className="h-4 w-4 mr-2 text-white" />
                {t('navigation.switchToArabic') || (language === 'en' ? 'العربية' : 'English')}
              </Button>

              {/* Cart Icon */}
              <Button
                className="relative bg-[#D39D38] hover:bg-[#C08A2E] text-white border-none shadow-sm"
                onClick={() => navigate('/menu')}
                title={t('common.cart') || 'Cart'}
              >
                <ShoppingCart className="h-5 w-5 text-white" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-[#E1C699] text-[#222222] min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* User Profile OR Auth Button */}
              {user ? (
                <Popover>
                  <PopoverTrigger>
                    <Avatar className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-300">
                      <AvatarImage src={userAvatar} alt={userDisplayName} />
                      <AvatarFallback className="bg-[#D39D38] text-white">
                        {getInitials(userDisplayName)}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-0" align="end">
                    <UserProfile />
                  </PopoverContent>
                </Popover>
              ) : (
                <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-[#222222] text-[#222222] hover:bg-[#D39D38] hover:text-white hover:border-[#D39D38]"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      {t('navigation.signIn') || 'Sign In'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <AuthForm mode="login" onClose={() => setAuthDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              )}

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-[#222222]"
                  title={t('common.menu') || 'Menu'}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#E0E0E0] shadow-lg">
              <div className="px-6 py-6 space-y-4">
                <button onClick={() => navigate('/')} className="block text-[#222222] hover:text-[#D39D38] transition-colors py-2 font-medium">
                  {t('navigation.home') || 'Home'}
                </button>
                <button onClick={() => navigate('/menu')} className="block text-[#222222] hover:text-[#D39D38] transition-colors py-2 font-medium">
                  {t('navigation.menu') || 'Menu'}
                </button>
                <button onClick={() => navigate('/reservations')} className="block text-[#222222] hover:text-[#D39D38] transition-colors py-2 font-medium">
                  {t('navigation.reservations') || 'Reservations'}
                </button>
                <a href="#about" className="block text-[#222222] hover:text-[#D39D38] transition-colors py-2 font-medium">
                  {t('navigation.about') || 'About'}
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Real-time Activity Banner */}
      <section className="py-3 bg-[#D39D38]/10 border-b border-[#D39D38]/20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[#222222]">
                {viewerCount} {t('activity.peopleViewing') || 'people viewing now'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-[#222222]">
                {recentOrder} {t('activity.justOrdered') || 'just ordered!'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Section */}
      <section id="menu" className="py-20 bg-light-yellow backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-h2 font-semibold mb-4 text-golden-brown">
              {t('menu.title') || 'Our Signature Dishes'}
            </h2>
            <p className="text-base text-rich-brown leading-[1.6]">
              {t('menu.subtitle') || 'Authentic Flavors That Delight'}
            </p>
          </div>
          <MenuShowcase />
        </div>
      </section>

      {/* Services Strip */}
      <section className="py-8 bg-dark-brown">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="flex justify-center items-center space-x-8 lg:space-x-16">
            {quickActions.map((action, index) => (
              <div 
                key={index}
                className="flex flex-col items-center space-y-3 cursor-pointer group transition-all duration-300 ml-6"
                onClick={action.onClick}
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <action.icon 
                    className="h-8 w-8 text-light-yellow group-hover:text-[#D39D38] transition-colors duration-300" 
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-sm font-medium text-light-yellow text-center">
                  {action.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials - Wall of Fame */}
      <section id="testimonials" className="py-20 bg-light-yellow">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-h2 font-semibold mb-4 text-rich-brown">
              {t('testimonials.title') || 'Wall of Fame'}
            </h2>
            <p className="text-base text-rich-brown leading-[1.6]">
              {t('testimonials.subtitle') || 'See what our happy customers are saying'}
            </p>
          </div>
          <CustomerWall />
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 bg-dark-brown text-light-yellow">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-h2 font-semibold mb-4 text-light-yellow">
              {t('membership.title') || 'Choose Your Experience'}
            </h2>
            <p className="text-base text-soft-gold leading-[1.6]">
              {t('membership.subtitle') || 'Unlock exclusive benefits and elevate your dining journey'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Standard Membership */}
            <div className="flex-1 bg-light-yellow rounded-lg p-8 border border-golden-brown transition-all duration-500 hover:shadow-lg">
              <div className="text-center mb-8">
                <h3 className="font-serif text-2xl font-semibold text-rich-brown mb-2">
                  {t('membership.standard.title') || 'Standard'}
                </h3>
                <div className="text-3xl font-bold text-rich-brown mb-2">
                  {t('membership.standard.price') || 'Free'}
                </div>
                <p className="text-rich-brown">
                  {t('membership.standard.subtitle') || 'Perfect for casual dining'}
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {(t('membership.standard.benefits') || [
                  'No Delivery Fee',
                  'No Reservation Fee',
                  'Access to full menu',
                  'Basic support',
                  'Earn 1 point per SAR 10 spent'
                ]).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-golden-brown flex items-center justify-center">
                      <span className="text-light-yellow text-xs">✓</span>
                    </div>
                    <span className="text-rich-brown text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-golden-brown hover:bg-dark-brown text-white font-semibold py-3 rounded-lg">
                {t('membership.standard.cta') || 'Get Started'}
              </Button>
            </div>

            {/* VIP Membership */}
            <div className="flex-1 bg-light-yellow rounded-lg p-8 border-2 border-golden-brown relative transition-all duration-300 hover:shadow-xl hover:shadow-golden-brown/20">
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-golden-brown text-light-yellow px-6 py-2 rounded-full text-sm font-bold">
                  {t('membership.vip.mostPopular') || 'Most Popular'}
                </div>
              </div>
              
              <div className="text-center mb-8 mt-4">
                <h3 className="font-serif text-2xl font-semibold text-golden-brown mb-2">
                  {t('membership.vip.title') || 'VIP'}
                </h3>
                <div className="text-3xl font-bold text-golden-brown mb-2">
                  {t('membership.vip.price') || '₳10/month'}
                </div>
                <p className="text-rich-brown">
                  {t('membership.vip.subtitle') || 'Luxury dining experience'}
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="text-golden-brown font-semibold mb-3">
                  {t('membership.vip.allStandardPlus') || 'All Standard benefits PLUS:'}
                </div>
                {(t('membership.vip.benefits') || [
                  '30-minute guaranteed delivery window',
                  'Priority table reservations',
                  'Complimentary appetizer on birthdays',
                  'Dedicated VIP support line',
                  '2× loyalty points per SAR 10 spent'
                ]).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-golden-brown flex items-center justify-center">
                      <span className="text-light-yellow text-xs">✓</span>
                    </div>
                    <span className="text-rich-brown text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-golden-brown hover:bg-dark-brown text-white font-bold py-3 rounded-lg">
                {t('membership.vip.cta') || 'Upgrade to VIP'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Ordering */}
      <WhatsAppOrder />

      {/* Footer */}
      <footer className="bg-[#222222] text-[#CCCCCC] py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-[#D39D38] p-2 rounded-full">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-serif font-bold text-white">
                  {t('brandName') || 'Al Bayt'}
                </span>
              </div>
              <p className="text-[#CCCCCC] leading-relaxed text-sm">
                {t('footer.description') || 'Authentic Saudi Flavors'}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {t('footer.quickLinks') || 'Quick Links'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => navigate('/menu')} className="hover:text-[#D39D38] transition-colors">
                    {t('navigation.menu') || 'Menu'}
                  </button>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#D39D38] transition-colors">
                    {t('navigation.about') || 'About'}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#D39D38] transition-colors">
                    {t('navigation.contact') || 'Contact'}
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {t('footer.contactInfo') || 'Contact'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-[#D39D38]" />
                  <span>{t('footer.address') || '123 Spice Street, Food City'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#D39D38]" />
                  <span>{t('footer.phone') || '+91 98765 43210'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#D39D38]" />
                  <span>{t('footer.email') || 'hello@albayt.com'}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {t('footer.followUs') || 'Social'}
              </h3>
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#D39D38] transition-colors"
                  title={t('common.instagram') || 'Instagram'}
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#D39D38] transition-colors"
                  title={t('common.facebook') || 'Facebook'}
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#D39D38] transition-colors"
                  title={t('common.twitter') || 'Twitter'}
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-[#CCCCCC] text-xs">
              {t('footer.copyright') || '© 2024 Al-Bayt. All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;