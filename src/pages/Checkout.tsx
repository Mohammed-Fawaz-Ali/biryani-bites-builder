
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, CreditCard, Truck, Clock, Phone, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/BackButton';

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

interface DeliveryAddress {
  street: string;
  building: string;
  district: string;
  city: string;
  notes: string;
}

interface OrderData {
  customerInfo: CustomerInfo;
  deliveryAddress: DeliveryAddress;
  paymentMethod: string;
  orderNotes: string;
}

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState<OrderData>({
    customerInfo: {
      name: '',
      phone: '',
      email: ''
    },
    deliveryAddress: {
      street: '',
      building: '',
      district: '',
      city: 'Riyadh',
      notes: ''
    },
    paymentMethod: 'cash',
    orderNotes: ''
  });

  const deliveryFee = 15;
  const tax = total * 0.15; // 15% VAT
  const finalTotal = total + deliveryFee + tax;

  const handleInputChange = (section: keyof OrderData, field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!orderData.customerInfo.name || !orderData.customerInfo.phone || 
        !orderData.deliveryAddress.street || !orderData.deliveryAddress.district) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate order submission
    const orderNumber = `ORD-${Date.now()}`;
    
    toast({
      title: "Order Placed Successfully!",
      description: `Your order #${orderNumber} has been confirmed. Estimated delivery: 30-45 minutes.`,
    });

    clearCart();
    navigate('/order-tracker', { state: { orderNumber } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-emerald mb-4">Your cart is empty</h2>
          <p className="text-emerald/70 mb-6">Add some delicious items to your cart first!</p>
          <Button onClick={() => navigate('/menu')} className="bg-emerald hover:bg-emerald/90">
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BackButton to="/menu" />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald mb-2">Checkout</h1>
          <p className="text-emerald/70">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Customer Information */}
              <Card className="bg-white rounded-2xl shadow-lg">
                <CardHeader className="bg-emerald text-white rounded-t-2xl">
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-emerald">Full Name *</Label>
                      <Input
                        id="name"
                        value={orderData.customerInfo.name}
                        onChange={(e) => handleInputChange('customerInfo', 'name', e.target.value)}
                        className="border-emerald/30 focus:border-emerald"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-emerald">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={orderData.customerInfo.phone}
                        onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
                        className="border-emerald/30 focus:border-emerald"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-emerald">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderData.customerInfo.email}
                      onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
                      className="border-emerald/30 focus:border-emerald"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="bg-white rounded-2xl shadow-lg">
                <CardHeader className="bg-emerald text-white rounded-t-2xl">
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="street" className="text-emerald">Street Address *</Label>
                      <Input
                        id="street"
                        value={orderData.deliveryAddress.street}
                        onChange={(e) => handleInputChange('deliveryAddress', 'street', e.target.value)}
                        className="border-emerald/30 focus:border-emerald"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="building" className="text-emerald">Building/Villa No.</Label>
                      <Input
                        id="building"
                        value={orderData.deliveryAddress.building}
                        onChange={(e) => handleInputChange('deliveryAddress', 'building', e.target.value)}
                        className="border-emerald/30 focus:border-emerald"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="district" className="text-emerald">District *</Label>
                      <Input
                        id="district"
                        value={orderData.deliveryAddress.district}
                        onChange={(e) => handleInputChange('deliveryAddress', 'district', e.target.value)}
                        className="border-emerald/30 focus:border-emerald"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-emerald">City</Label>
                      <Input
                        id="city"
                        value={orderData.deliveryAddress.city}
                        onChange={(e) => handleInputChange('deliveryAddress', 'city', e.target.value)}
                        className="border-emerald/30 focus:border-emerald"
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-emerald">Delivery Notes</Label>
                    <Textarea
                      id="notes"
                      value={orderData.deliveryAddress.notes}
                      onChange={(e) => handleInputChange('deliveryAddress', 'notes', e.target.value)}
                      className="border-emerald/30 focus:border-emerald"
                      placeholder="Additional delivery instructions..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-white rounded-2xl shadow-lg">
                <CardHeader className="bg-emerald text-white rounded-t-2xl">
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup
                    value={orderData.paymentMethod}
                    onValueChange={(value) => setOrderData(prev => ({ ...prev, paymentMethod: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="text-emerald">Cash on Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="text-emerald">Card on Delivery</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full bg-emerald hover:bg-emerald/90 text-white py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
              >
                Place Order
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-white rounded-2xl shadow-lg">
              <CardHeader className="bg-emerald text-white rounded-t-2xl">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-emerald">{item.name}</p>
                        <p className="text-sm text-emerald/70">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-emerald">SAR {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-emerald/70">Subtotal</span>
                      <span className="text-emerald">SAR {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald/70">Delivery Fee</span>
                      <span className="text-emerald">SAR {deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald/70">Tax (15%)</span>
                      <span className="text-emerald">SAR {tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-emerald">Total</span>
                      <span className="text-emerald">SAR {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-emerald text-white rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="mr-2 h-5 w-5" />
                  <span className="font-semibold">Estimated Delivery</span>
                </div>
                <p className="text-white/90">30-45 minutes</p>
                <p className="text-sm text-white/70 mt-2">We'll call you when your order is on the way!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
