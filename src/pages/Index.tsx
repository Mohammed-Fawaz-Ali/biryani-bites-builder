
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
  X
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
import { User, LogIn } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [viewerCount, setViewerCount] = useState(47);
  const [recentOrder, setRecentOrder] = useState("Chicken Biryani");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Navigation */}
      <nav className={`${isScrolled ? 'bg-white/95 shadow-lg' : 'bg-white/90'} backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <ChefHat className="h-8 w-8 text-orange-600 transform hover:rotate-12 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hover:from-red-600 hover:to-orange-600 transition-all duration-300">
                Spice Palace
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/menu')} className="text-gray-700 hover:text-orange-600 transition-all duration-300 relative group">
                Menu
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <a href="#about" className="text-gray-700 hover:text-orange-600 transition-all duration-300 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#gallery" className="text-gray-700 hover:text-orange-600 transition-all duration-300 relative group">
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <Button 
                onClick={() => navigate('/menu')}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Zap className="mr-2 h-4 w-4" />
                Order Now
              </Button>
            </div>

          {/* User Profile OR Auth Button */}
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-300">
                  <AvatarImage src={userAvatar} alt={userDisplayName} />
                  <AvatarFallback className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
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
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
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
                className="text-orange-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-lg">
              <div className="px-4 py-6 space-y-4">
                <button onClick={() => navigate('/menu')} className="block text-gray-700 hover:text-orange-600 transition-colors py-2">Menu</button>
                <a href="#about" className="block text-gray-700 hover:text-orange-600 transition-colors py-2">About</a>
                <a href="#gallery" className="block text-gray-700 hover:text-orange-600 transition-colors py-2">Gallery</a>
                <Button 
                  onClick={() => navigate('/menu')}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 mt-4"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Order Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Live Activity Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-3 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 animate-pulse"></div>
        <div className="relative z-10 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <Eye className="h-4 w-4" />
            <span className="font-medium">{viewerCount} people viewing now</span>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <Flame className="h-4 w-4 animate-bounce" />
            <span className="font-medium">🔥 {recentOrder} just ordered!</span>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">⚡ 15% off today only!</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Professional Stats Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 group-hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">50K+</h3>
                <p className="text-gray-600 font-medium">Happy Customers</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 group-hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">25+</h3>
                <p className="text-gray-600 font-medium">Years Experience</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-2xl p-6 group-hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-green-600 to-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">4.9</h3>
                <p className="text-gray-600 font-medium">Rating</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 group-hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">100%</h3>
                <p className="text-gray-600 font-medium">Quality Assured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Experience the Magic
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our unique features that make dining with us an unforgettable experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 animate-fade-in">
            {/* Biryani Builder */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-orange-50 hover:scale-[1.02] transform animate-slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-700">
                  <Utensils className="h-6 w-6" />
                  <span>Custom Biryani Builder</span>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-300">Popular</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BiryaniBuilder />
              </CardContent>
            </Card>

            {/* Professional Gallery Feature */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-yellow-50 hover:scale-[1.02] transform">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-amber-700">
                  <Camera className="h-6 w-6" />
                  <span>Chef's Gallery</span>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-300">Premium</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-lg group cursor-pointer animate-fade-in">
                    <img 
                      src="https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&auto=format" 
                      alt="Signature Biryani"
                      className="w-full h-32 object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-2 left-2 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-semibold text-sm">Signature Biryani</p>
                        <p className="text-xs opacity-90">Chef's Special</p>
                      </div>
                      <div className="absolute top-2 right-2 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-300 delay-100">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                          <Eye className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg group cursor-pointer animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format" 
                      alt="Tandoor Specialties"
                      className="w-full h-32 object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-2 left-2 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-semibold text-sm">Tandoor Specials</p>
                        <p className="text-xs opacity-90">Clay Oven Fresh</p>
                      </div>
                      <div className="absolute top-2 right-2 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-300 delay-100">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                          <Eye className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" className="w-full hover:bg-amber-50 hover:border-amber-300 transition-all duration-500 hover:scale-105 transform group">
                    <Camera className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                    View Full Gallery
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Kitchen */}
          <Card className="mb-16 border-0 bg-gradient-to-br from-white to-yellow-50 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] transform animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-700">
                <Camera className="h-6 w-6" />
                <span>Live from Our Kitchen</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-red-600">LIVE</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LiveKitchen />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Menu Showcase */}
      <section id="menu" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Our Signature Dishes
            </h2>
            <p className="text-gray-600 text-lg">Authentic flavors that tell a story</p>
          </div>
          <MenuShowcase />
        </div>
      </section>

      {/* Customer Wall */}
      <section id="gallery" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Wall of Fame
            </h2>
            <p className="text-gray-600 text-lg">See what our happy customers are saying</p>
          </div>
          <CustomerWall />
        </div>
      </section>

      {/* WhatsApp Ordering */}
      <WhatsAppOrder />

      {/* Footer */}
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
