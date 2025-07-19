import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  const [viewerCount, setViewerCount] = useState(47);
  const [recentOrder, setRecentOrder] = useState("Chicken Biryani");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

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
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    document.documentElement.dir = language === 'en' ? 'rtl' : 'ltr';
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
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
                className="text-white hover:text-emerald-400 transition-all duration-300 relative group font-medium"
              >
                {language === 'en' ? 'Home' : 'الرئيسية'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => navigate('/menu')} 
                className="text-white hover:text-emerald-400 transition-all duration-300 relative group font-medium"
              >
                {language === 'en' ? 'Menu' : 'القائمة'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => navigate('/reservations')} 
                className="text-white hover:text-emerald-400 transition-all duration-300 relative group font-medium"
              >
                {language === 'en' ? 'Reservations' : 'الحجوزات'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <a 
                href="#about" 
                className="text-white hover:text-emerald-400 transition-all duration-300 relative group font-medium"
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
                  className="text-emerald-600"
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
                <button onClick={() => navigate('/')} className="block text-emerald-700 hover:text-emerald-600 transition-colors py-2 font-medium">
                  {language === 'en' ? 'Home' : 'الرئيسية'}
                </button>
                <button onClick={() => navigate('/menu')} className="block text-gray-700 hover:text-emerald-600 transition-colors py-2 font-medium">
                  {language === 'en' ? 'Menu' : 'القائمة'}
                </button>
                <button onClick={() => navigate('/reservations')} className="block text-gray-700 hover:text-emerald-600 transition-colors py-2 font-medium">
                  {language === 'en' ? 'Reservations' : 'الحجوزات'}
                </button>
                <a href="#about" className="block text-gray-700 hover:text-emerald-600 transition-colors py-2 font-medium">
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

      {/* Quick Action Tiles */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
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
                  <h3 className="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
                    {action.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlights Section */}
      <section id="menu" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              {language === 'en' ? 'Our Signature Dishes' : 'أطباقنا المميزة'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'en' ? 'Authentic flavors that tell a story' : 'نكهات أصيلة تحكي قصة'}
            </p>
          </div>
          <MenuShowcase />
        </div>
      </section>

      
      {/* Customer Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
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
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-full">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Spice Palace</span>
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
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-orange-400">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => navigate('/menu')} className="hover:text-orange-400 transition-all duration-300 flex items-center space-x-2 group"><ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /><span>Menu</span></button></li>
                <li><a href="#about" className="hover:text-orange-400 transition-all duration-300 flex items-center space-x-2 group"><ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /><span>About Us</span></a></li>
                <li><a href="#gallery" className="hover:text-orange-400 transition-all duration-300 flex items-center space-x-2 group"><ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /><span>Gallery</span></a></li>
                <li><a href="#contact" className="hover:text-orange-400 transition-all duration-300 flex items-center space-x-2 group"><ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" /><span>Contact</span></a></li>
              </ul>
            </div>
            
            <div>
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
            
            <div>
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
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">
                &copy; 2024 Spice Palace. All rights reserved. Made with <Heart className="inline h-4 w-4 text-red-500" /> for food lovers.
              </p>
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
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
