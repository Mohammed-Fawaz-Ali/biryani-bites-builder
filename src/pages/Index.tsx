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
      const dishes = ["Chicken Biryani", "Mutton Seekh Kabab", "Chicken Tikka Masala", "Fish Curry"];
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
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userAvatar = user?.user_metadata?.avatar_url || '';

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
  };

  // Quick Action Tiles Data
  const quickActions = [
    {
      title: language === 'en' ? 'View Menu' : 'عرض القائمة',
      icon: Utensils,
      onClick: () => navigate('/menu'),
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: language === 'en' ? 'Reservations' : 'الحجوزات',
      icon: Calendar,
      onClick: () => navigate('/reservations'),
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: language === 'en' ? 'Delivery' : 'التوصيل',
      icon: Truck,
      onClick: () => navigate('/menu'),
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: language === 'en' ? 'Reviews' : 'التقييمات',
      icon: Star,
      onClick: () => navigate('/reviews'),
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Navigation */}
      <nav className={`${isScrolled ? 'bg-black shadow-lg backdrop-blur-md' : 'bg-black/90 backdrop-blur-sm'} border-b border-emerald-200 sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold text-white">
                {language === 'en' ? 'Al-Bayt' : 'البيت'}
              </span>
            </div>
            
            {/* Center Navigation - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate('/')} 
                className="text-white hover:text-yellow-400 transition-all duration-300 relative group font-medium"
              >
                {language === 'en' ? 'Home' : 'الرئيسية'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => navigate('/menu')} 
                className="text-white hover:text-yellow-400 transition-all duration-300 relative group font-medium"
              >
                {language === 'en' ? 'Menu' : 'القائمة'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => navigate('/reservations')} 
                className="text-white hover:text-yellow-400 transition-all duration-300 relative group font-medium"
              >
                {language === 'en' ? 'Reservations' : 'الحجوزات'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <a 
                href="#about" 
                className="text-white hover:text-yellow-400 transition-all duration-300 relative group font-medium"
              >
                {language === 'en' ? 'About' : 'عن المطعم'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <Button
                size="sm"
                onClick={toggleLanguage}
                className="bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-md"
              >
                <Globe className="h-4 w-4 mr-2 text-white" />
                {language === 'en' ? 'العربية' : 'English'}
              </Button>

              {/* Cart Icon */}
              <Button
                className="relative bg-emerald-700 hover:bg-emerald-800 text-white border-none shadow-md"
                onClick={() => navigate('/menu')}
              >
                <ShoppingCart className="h-5 w-5 text-white" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
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
                      <AvatarFallback className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
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
                      className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 border-0"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
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
                  className="text-yellow-400"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-emerald-200 shadow-lg">
              <div className="px-4 py-6 space-y-4">
                <button onClick={() => navigate('/')} className="block text-yellow-400 hover:text-orange-400 transition-colors py-2 font-medium">
                  {language === 'en' ? 'Home' : 'الرئيسية'}
                </button>
                <button onClick={() => navigate('/menu')} className="block text-gray-700 hover:text-orange-400 transition-colors py-2 font-medium">
                  {language === 'en' ? 'Menu' : 'القائمة'}
                </button>
                <button onClick={() => navigate('/reservations')} className="block text-gray-700 hover:text-orange-400 transition-colors py-2 font-medium">
                  {language === 'en' ? 'Reservations' : 'الحجوزات'}
                </button>
                <a href="#about" className="block text-gray-700 hover:text-orange-400 transition-colors py-2 font-medium">
                  {language === 'en' ? 'About' : 'عن المطعم'}
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Live Activity Banner */}
      {/* <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600 text-white py-3 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <Eye className="h-4 w-4" />
            <span className="font-medium">{viewerCount} {language === 'en' ? 'people viewing now' : 'شخص يتصفح الآن'}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <Flame className="h-4 w-4 animate-bounce" />
            <span className="font-medium">🔥 {recentOrder} {language === 'en' ? 'just ordered!' : 'تم طلبه للتو!'}</span>
          </div>
        </div>
      </div> */}

      {/* Hero Section */}
      <HeroSection />
{/* Menu Highlights Section */}
      <section id="menu" className="py-20 bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {language === 'en' ? 'Our Signature Dishes' : 'أطباقنا المميزة'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'en' ? 'Authentic flavors that tell a story' : 'نكهات أصيلة تحكي قصة'}
            </p>
          </div>
          <MenuShowcase />
        </div>
      </section>
{/* Quick Action Tiles */}
<section className="py-16 bg-[#1C1C1C] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {language === 'en' ? 'Our Services' : 'خدماتنا'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'en' ? 'Everything you need for the perfect dining experience' : 'كل ما تحتاجه لتجربة طعام مثالية'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-emerald-50 overflow-hidden cursor-pointer"
                onClick={action.onClick}
              >
                <CardContent className="p-6 text-center">
                  <div className={`bg-gradient-to-r ${action.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <action.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-yellow-400 transition-colors">
                    {action.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Customer Testimonials */}
      <section id="testimonials" className="py-20 bg-[#1C1C1C] mb-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {language === 'en' ? 'Wall of Fame' : 'جدار الشهرة'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'en' ? 'See what our happy customers are saying' : 'اطلع على آراء عملائنا السعداء'}
            </p>
          </div>
          <CustomerWall />
        </div>
      </section>

      {/* WhatsApp Ordering */}
      <WhatsAppOrder />

      {/* Keep existing footer unchanged */}
      <footer className="bg-[#1C1C1C] text-white py-16 relative overflow-hidden">
      {/* Membership Tiers Section */}
      <section className="relative bg-[#272727] py-16 overflow-hidden mt-0">
        {/* Subtle starburst texture background */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #F5B82E 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, #F5B82E 1px, transparent 1px),
                               radial-gradient(circle at 50% 50%, #F5B82E 0.5px, transparent 0.5px)`,
              backgroundSize: '60px 60px, 80px 80px, 40px 40px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5B82E] mb-4 font-['Montserrat']">
              Choose Your Experience
            </h2>
            <p className="text-lg text-[#CED4DA] font-['Montserrat']">
              Unlock exclusive benefits and elevate your dining journey
            </p>
          </div>

          {/* Membership Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Standard Membership */}
            <div className="group relative bg-gray-800 rounded-2xl p-8 border-2 border-gray-600 transition-all duration-500 hover:transform hover:-translate-y-1 hover:shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 font-['Montserrat']">Standard</h3>
                <div className="text-4xl font-bold text-[#CED4DA] mb-2">Free</div>
                <p className="text-[#CED4DA] font-['Montserrat']">Perfect for casual dining</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#006746] flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-[#CED4DA] font-['Montserrat']">No Delivery Fee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#006746] flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-[#CED4DA] font-['Montserrat']">No Reservation Fee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#006746] flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-[#CED4DA] font-['Montserrat']">Access to full menu</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#006746] flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-[#CED4DA] font-['Montserrat']">Basic support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#006746] flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-[#CED4DA] font-['Montserrat']">Earn 1 point per SAR 10 spent</span>
                </div>
              </div>
              
              <Button className="w-full bg-[#006746] hover:bg-[#005a3a] text-white font-['Montserrat'] font-semibold py-3 rounded-xl transition-all duration-300">
                Get Started
              </Button>
            </div>

            {/* VIP Membership */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 border-[#F5B82E] transition-all duration-500 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#F5B82E]/20">
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#F5B82E] text-black px-6 py-2 rounded-full text-sm font-bold font-['Montserrat']">
                  Most Popular
                </div>
              </div>
              
              <div className="text-center mb-8 mt-4">
                <h3 className="text-2xl font-bold text-[#F5B82E] mb-2 font-['Montserrat']">VIP</h3>
                <div className="text-4xl font-bold text-[#F5B82E] mb-2">₳10<span className="text-lg">/month</span></div>
                <p className="text-[#CED4DA] font-['Montserrat']">Luxury dining experience</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="text-[#F5B82E] font-semibold mb-3 font-['Montserrat']">All Standard benefits PLUS:</div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#F5B82E] flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-[#CED4DA] font-['Montserrat']">30-minute guaranteed delivery window</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#F5B82E] flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-[#CED4DA] font-['Montserrat']">Priority table reservations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#F5B82E] flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-[#CED4DA] font-['Montserrat']">Complimentary appetizer on birthdays</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#F5B82E] flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-[#CED4DA] font-['Montserrat']">Dedicated VIP support line</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#F5B82E] flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <span className="text-[#CED4DA] font-['Montserrat']">2× loyalty points per SAR 10 spent</span>
                </div>
              </div>
              
              <Button className="w-full bg-[#F5B82E] hover:bg-[#e6a625] text-black font-['Montserrat'] font-bold py-3 rounded-xl transition-all duration-300">
                Upgrade to VIP
              </Button>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[#F5B82E] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservations & Celebrations Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 103, 70, 0.6) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&auto=format')`
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 py-20">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-[#F5B82E] mb-4 font-['Montserrat']">
              Book Memories, Celebrate Moments
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-[#F5B82E] mb-6 font-arabic" dir="rtl">
              احجز الذكريات، احتفل باللحظات
            </h3>
            <p className="text-xl text-[#CED4DA] font-['Montserrat'] max-w-3xl mx-auto">
              From intimate dinners to grand celebrations, create unforgettable experiences at Al-Bayt
            </p>
          </div>

          {/* Horizontal Scroll Carousel */}
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide space-x-6 pb-6 snap-x snap-mandatory smooth-scroll" style={{ scrollBehavior: 'smooth' }}>
              {/* Birthday Celebrations */}
              <div className="flex-none w-80 bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-[#F5B82E]/30 snap-center group hover:transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce transition-all duration-300">🎂</div>
                  <h3 className="text-2xl font-bold text-[#F5B82E] mb-3 font-['Montserrat']">Birthday Bliss</h3>
                  <p className="text-[#CED4DA] mb-6 font-['Montserrat']">Make every birthday unforgettable with our special celebration packages</p>
                  <Button className="bg-transparent border-2 border-[#F5B82E] text-[#F5B82E] hover:bg-[#F5B82E] hover:text-black font-['Montserrat'] font-semibold px-6 py-3 rounded-xl transition-all duration-300">
                    Reserve Now
                  </Button>
                </div>
              </div>

              {/* Office Gatherings */}
              <div className="flex-none w-80 bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-[#F5B82E]/30 snap-center group hover:transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce transition-all duration-300">🏢</div>
                  <h3 className="text-2xl font-bold text-[#F5B82E] mb-3 font-['Montserrat']">Office Gatherings</h3>
                  <p className="text-[#CED4DA] mb-6 font-['Montserrat']">Elevate your corporate events with our professional dining spaces</p>
                  <Button className="bg-transparent border-2 border-[#F5B82E] text-[#F5B82E] hover:bg-[#F5B82E] hover:text-black font-['Montserrat'] font-semibold px-6 py-3 rounded-xl transition-all duration-300">
                    Reserve Now
                  </Button>
                </div>
              </div>

              {/* Anniversary Evenings */}
              <div className="flex-none w-80 bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-[#F5B82E]/30 snap-center group hover:transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce transition-all duration-300">💍</div>
                  <h3 className="text-2xl font-bold text-[#F5B82E] mb-3 font-['Montserrat']">Anniversary Evenings</h3>
                  <p className="text-[#CED4DA] mb-6 font-['Montserrat']">Celebrate love with romantic ambiance and exquisite cuisine</p>
                  <Button className="bg-transparent border-2 border-[#F5B82E] text-[#F5B82E] hover:bg-[#F5B82E] hover:text-black font-['Montserrat'] font-semibold px-6 py-3 rounded-xl transition-all duration-300">
                    Reserve Now
                  </Button>
                </div>
              </div>

              {/* Family Reunions */}
              <div className="flex-none w-80 bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-[#F5B82E]/30 snap-center group hover:transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce transition-all duration-300">👨‍👩‍👧‍👦</div>
                  <h3 className="text-2xl font-bold text-[#F5B82E] mb-3 font-['Montserrat']">Family Reunions</h3>
                  <p className="text-[#CED4DA] mb-6 font-['Montserrat']">Bring the family together for memorable dining experiences</p>
                  <Button className="bg-transparent border-2 border-[#F5B82E] text-[#F5B82E] hover:bg-[#F5B82E] hover:text-black font-['Montserrat'] font-semibold px-6 py-3 rounded-xl transition-all duration-300">
                    Reserve Now
                  </Button>
                </div>
              </div>

              {/* Date Nights */}
              <div className="flex-none w-80 bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-[#F5B82E]/30 snap-center group hover:transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce transition-all duration-300">💕</div>
                  <h3 className="text-2xl font-bold text-[#F5B82E] mb-3 font-['Montserrat']">Date Nights</h3>
                  <p className="text-[#CED4DA] mb-6 font-['Montserrat']">Create magical moments with intimate dining for two</p>
                  <Button className="bg-transparent border-2 border-[#F5B82E] text-[#F5B82E] hover:bg-[#F5B82E] hover:text-black font-['Montserrat'] font-semibold px-6 py-3 rounded-xl transition-all duration-300">
                    Reserve Now
                  </Button>
                </div>
              </div>

              {/* Graduation Celebrations */}
              <div className="flex-none w-80 bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-[#F5B82E]/30 snap-center group hover:transform hover:scale-105 transition-all duration-500">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce transition-all duration-300">🎓</div>
                  <h3 className="text-2xl font-bold text-[#F5B82E] mb-3 font-['Montserrat']">Graduation Celebrations</h3>
                  <p className="text-[#CED4DA] mb-6 font-['Montserrat']">Honor achievements with a feast worthy of success</p>
                  <Button className="bg-transparent border-2 border-[#F5B82E] text-[#F5B82E] hover:bg-[#F5B82E] hover:text-black font-['Montserrat'] font-semibold px-6 py-3 rounded-xl transition-all duration-300">
                    Reserve Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-[#F5B82E]/30 hover:bg-[#F5B82E] transition-all duration-300 cursor-pointer"></div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button 
              onClick={() => navigate('/reservations')}
              className="bg-[#F5B82E] hover:bg-[#e6a625] text-black font-['Montserrat'] font-bold px-12 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Make a Reservation
            </Button>
          </div>
        </div>
      </section>

        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-10 mt-8">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-full">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Al Bayt</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Authentic Indian cuisine crafted with love and tradition since 1995. Experience the finest flavors that tell stories of heritage and passion.
              </p>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <span className="text-gray-400 ml-2">4.9/5 Rating</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-6 text-orange-400">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => navigate('/menu')} className="hover:text-orange-400 transition-all duration-300 flex items-center space-x-2 group"><ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /><span>Menu</span></button></li>
                <li><a href="#about" className="hover:text-orange-400 transition-all duration-300 flex items-center space-x-2 group"><ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /><span>About Us</span></a></li>
                <li><a href="#gallery" className="hover:text-orange-400 transition-all duration-300 flex items-center space-x-2 group"><ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /><span>Gallery</span></a></li>
                <li><a href="#contact" className="hover:text-orange-400 transition-all duration-300 flex items-center space-x-2 group"><ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /><span>Contact</span></a></li>
              </ul>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-6 text-orange-400">Contact Info</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-orange-400" />
                  <span>123 Spice Street, Food City</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-orange-400" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-orange-400" />
                  <span>hello@spicepalace.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <span>11 AM - 11 PM Daily</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-6 text-orange-400">Follow Us</h3>
              <div className="flex space-x-4 mb-6">
                <a 
                  href="#" 
                  className="group bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-full hover:scale-110 hover:shadow-lg transition-all duration-300 transform hover:rotate-12"
                >
                  <Instagram className="h-5 w-5 text-white group-hover:animate-pulse" />
                </a>
                <a 
                  href="#" 
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full hover:scale-110 hover:shadow-lg transition-all duration-300 transform hover:rotate-12"
                >
                  <Facebook className="h-5 w-5 text-white group-hover:animate-pulse" />
                </a>
                <a 
                  href="#" 
                  className="group bg-gradient-to-r from-blue-400 to-blue-500 p-3 rounded-full hover:scale-110 hover:shadow-lg transition-all duration-300 transform hover:rotate-12"
                >
                  <Twitter className="h-5 w-5 text-white group-hover:animate-pulse" />
                </a>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg border border-orange-600/30">
                <p className="text-sm text-orange-400 font-semibold mb-2">Special Offer!</p>
                <p className="text-xs text-gray-400">Get 15% off on your first order. Use code: WELCOME15</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 w-full">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-gray-400 text-center">
                &copy; 2024 Spice Palace. All rights reserved. Made with <Heart className="inline h-4 w-4 text-red-500" /> for food lovers.
              </p>
              <div className="flex items-center space-x-4 text-gray-400 text-sm justify-center">
                <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:text-orange-400 transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
