
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Phone, Clock, MapPin } from 'lucide-react';

const WhatsAppOrder = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickOrders = [
    { name: "Chicken Biryani", price: 299, emoji: "🍛" },
    { name: "Mutton Seekh Kebab", price: 199, emoji: "🍢" },
    { name: "Chicken Tikka Masala", price: 249, emoji: "🍗" },
    { name: "Paneer Tikka", price: 219, emoji: "🥗" }
  ];

  const generateWhatsAppMessage = (dish = null) => {
    const baseMessage = "Hi Spice Palace! 👋\n\n";
    
    if (dish) {
      return baseMessage + 
        `I'd like to order:\n` +
        `• ${dish.name} - ₹${dish.price}\n\n` +
        `Please confirm availability and delivery time.\n\n` +
        `Thank you! 😊`;
    }
    
    return baseMessage + 
      `I'd like to place an order. Could you please share your menu?\n\n` +
      `Thank you! 😊`;
  };

  const openWhatsApp = (dish = null) => {
    const message = generateWhatsAppMessage(dish);
    const phoneNumber = "919876543210"; // Replace with actual WhatsApp Business number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>

      {/* WhatsApp Menu Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]">
          <Card className="shadow-2xl border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Quick Order</h3>
                    <p className="text-sm text-gray-600">via WhatsApp</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:bg-gray-100"
                >
                  ✕
                </Button>
              </div>

              {/* Quick Order Options */}
              <div className="space-y-3 mb-4">
                <h4 className="font-semibold text-gray-700 text-sm">Popular Items:</h4>
                {quickOrders.map((dish, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-between p-3 h-auto hover:bg-green-50 hover:border-green-300"
                    onClick={() => openWhatsApp(dish)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{dish.emoji}</span>
                      <div className="text-left">
                        <div className="font-medium text-sm">{dish.name}</div>
                        <div className="text-xs text-gray-500">₹{dish.price}</div>
                      </div>
                    </div>
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </Button>
                ))}
              </div>

              {/* General Order Button */}
              <Button
                onClick={() => openWhatsApp()}
                className="w-full bg-green-500 hover:bg-green-600 text-white mb-4"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                View Full Menu & Order
              </Button>

              {/* Contact Info */}
              <div className="space-y-2 text-xs text-gray-600 bg-white/50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3" />
                  <span>11 AM - 11 PM Daily</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3" />
                  <span>Free delivery in 5km radius</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <h5 className="font-semibold text-yellow-800 text-sm mb-2">WhatsApp Benefits:</h5>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Instant order confirmation</li>
                  <li>• Live order tracking</li>
                  <li>• Direct chat with restaurant</li>
                  <li>• No app download required</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default WhatsAppOrder;
