
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
  Gift,
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
  Plus
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
  const [recentOrder, setRecentOrder] = useState("Kabsa Royale");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate real-time activity
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 3) - 1);
      const dishes = ["Kabsa Royale", "Mandi Special", "Mixed Grill", "Mutabaq", "Shawarma"];
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

  const todaysSpecials = [
    {
      id: 1,
      name: "Kabsa Royale",
      nameAr: "كبسة ملكية",
      description: "Traditional lamb kabsa with aromatic spices",
      price: 85,
      image: "🍛",
      category: "Traditional"
    },
    {
      id: 2,
      name: "Mandi Special",
      nameAr: "مندي مميز",
      description: "Tender chicken mandi with fragrant rice",
      price: 65,
      image: "🍗",
      category: "Signature"
    },
    {
      id: 3,
      name: "Mixed Grill",
      nameAr: "مشاوي مشكلة",
      description: "Assorted grilled meats with traditional sides",
      price: 120,
      image: "🥩",
      category: "Grill"
    }
  ];

  return (
    <div className="min-h-screen bg-sand">
      {/* Navigation with Al-Bayt styling */}
      <nav className={`${isScrolled ? 'bg-white/95 shadow-lg' : 'bg-white/90'} backdrop-blur-sm border-b border-emerald/20 sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo matching Al-Bayt design */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-emerald">Al-Bayt</span>
                <p className="text-xs text-emerald/70">Authentic Saudi Cuisine</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-emerald hover:text-gold transition-all duration-300 relative group font-medium">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => navigate('/menu')} className="text-emerald hover:text-gold transition-all duration-300 relative group font-medium">
                Menu
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
              </button>
              <button onClick={() => navigate('/reservations')} className="text-emerald hover:text-gold transition-all duration-300 relative group font-medium">
                Reservations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
              </button>
              <a href="#about" className="text-emerald hover:text-gold transition-all duration-300 relative group font-medium">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
              </a>
              
              {/* Language Toggle */}
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-emerald">EN</span>
                <span className="text-emerald/30">|</span>
                <span className="text-emerald/70 font-arabic">عربي</span>
              </div>
            </div>

            {/* User Profile OR Auth Button */}
            {user ? (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform duration-300">
                    <AvatarImage src={userAvatar} alt={userDisplayName} />
                    <AvatarFallback className="bg-emerald text-white">
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
                    className="bg-emerald text-white hover:bg-emerald/90 border-emerald"
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
                className="text-emerald"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-emerald/20 shadow-lg">
              <div className="px-4 py-6 space-y-4">
                <button onClick={() => navigate('/')} className="block text-emerald hover:text-gold transition-colors py-2 font-medium">Home</button>
                <button onClick={() => navigate('/menu')} className="block text-emerald hover:text-gold transition-colors py-2 font-medium">Menu</button>
                <button onClick={() => navigate('/reservations')} className="block text-emerald hover:text-gold transition-colors py-2 font-medium">Reservations</button>
                <a href="#about" className="block text-emerald hover:text-gold transition-colors py-2 font-medium">About</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Quick Actions Section matching the second image */}
      <section className="py-16 bg-emerald">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => navigate('/menu')}>
              <div className="text-gold text-4xl mb-4">
                <Utensils className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-emerald mb-2">View Menu</h3>
              <p className="text-sm text-emerald/70 mb-4">Explore our full menu</p>
              <Button variant="link" className="text-emerald p-0 h-auto">
                Browse →
              </Button>
            </Card>

            <Card className="bg-white rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => navigate('/reservations')}>
              <div className="text-gold text-4xl mb-4">
                <Gift className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-emerald mb-2">Reservations</h3>
              <p className="text-sm text-emerald/70 mb-4">Book your table</p>
              <Button variant="link" className="text-emerald p-0 h-auto">
                Reserve →
              </Button>
            </Card>

            <Card className="bg-white rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => navigate('/menu')}>
              <div className="text-gold text-4xl mb-4">
                <Clock className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-emerald mb-2">Delivery</h3>
              <p className="text-sm text-emerald/70 mb-4">Order for delivery</p>
              <Button variant="link" className="text-emerald p-0 h-auto">
                Order →
              </Button>
            </Card>

            <Card className="bg-white rounded-3xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-gold text-4xl mb-4">
                <Star className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-emerald mb-2">Reviews</h3>
              <p className="text-sm text-emerald/70 mb-4">See what others say</p>
              <Button variant="link" className="text-emerald p-0 h-auto">
                Read →
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Today's Specials */}
      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-charcoal">
              Today's Specials
            </h2>
            <p className="text-charcoal/70 text-lg font-arabic">
              أطباق مختارة من طهاتنا المتميزين
            </p>
            <p className="text-charcoal/70">Handpicked dishes by our master chefs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {todaysSpecials.map((dish) => (
              <Card key={dish.id} className="bg-white rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-emerald/10 to-gold/10 flex items-center justify-center text-6xl">
                  {dish.image}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-emerald mb-2">{dish.name}</h3>
                  <p className="font-arabic text-emerald/70 mb-3">{dish.nameAr}</p>
                  <p className="text-charcoal/70 mb-4">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gold">{dish.price} SAR</span>
                    <Button 
                      size="sm" 
                      className="bg-emerald hover:bg-emerald/90 text-white rounded-full"
                      onClick={() => navigate('/menu')}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-charcoal">
              What Our Customers Say
            </h2>
            <p className="text-charcoal/70">Real reviews from real customers</p>
          </div>
          <CustomerWall />
        </div>
      </section>

      {/* Staff Access Section */}
      <section className="py-16 bg-emerald">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Staff Access</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/admin')}
              className="bg-gold hover:bg-gold/90 text-charcoal px-8 py-3 text-lg rounded-full font-semibold"
            >
              <Shield className="mr-2 h-5 w-5" />
              Admin Dashboard
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-emerald px-8 py-3 text-lg rounded-full font-semibold"
            >
              <Clock className="mr-2 h-5 w-5" />
              Delivery Login
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-emerald">Al-Bayt</span>
                  <p className="text-xs text-emerald/70">Authentic Saudi Cuisine</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Experience the true taste of Saudi Arabia with our traditional recipes and modern presentation.
              </p>
              <p className="text-gray-400 leading-relaxed font-arabic">
                اكتشف المذاق الأصيل للمملكة العربية السعودية مع وصفاتنا التقليدية والعرض العصري
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-emerald">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => navigate('/menu')} className="hover:text-emerald transition-colors">Menu</button></li>
                <li><button onClick={() => navigate('/reservations')} className="hover:text-emerald transition-colors">Reservations</button></li>
                <li><a href="#delivery" className="hover:text-emerald transition-colors">Delivery</a></li>
                <li><a href="#about" className="hover:text-emerald transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-emerald">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-emerald" />
                  <span>+966 11 234 5678</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-emerald" />
                  <span>info@albayt.sa</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-emerald" />
                  <span>King Fahd Road, Riyadh</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-emerald">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-emerald p-3 rounded-full hover:bg-emerald/80 transition-colors">
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="bg-emerald p-3 rounded-full hover:bg-emerald/80 transition-colors">
                  <Twitter className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="bg-emerald p-3 rounded-full hover:bg-emerald/80 transition-colors">
                  <Facebook className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Al-Bayt Restaurant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppOrder />
    </div>
  );
};

export default Index;
