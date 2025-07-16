
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  ChevronLeft,
  CheckCircle2,
  MapPinned
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    paymentMethod: ''
  });
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const deliveryFee = 5;
  const tax = totalPrice * 0.15; // 15% tax
  const finalTotal = totalPrice + deliveryFee + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            street: 'Current Location - ' + position.coords.latitude.toFixed(4),
            city: 'Auto-detected'
          }));
        },
        (error) => {
          console.log('Location access denied:', error);
          toast({
            title: "Location Access Denied",
            description: "Please enter your address manually.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const isFormValid = () => {
    return formData.name && formData.phone && formData.street && 
           formData.city && formData.zip && formData.paymentMethod;
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Generate order number
      const { data: orderNumberData, error: orderNumberError } = await supabase
        .rpc('generate_order_number');

      if (orderNumberError) {
        throw orderNumberError;
      }

      const generatedOrderNumber = orderNumberData;

      // Create delivery address object
      const deliveryAddress = {
        name: formData.name,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        zip: formData.zip
      };

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: generatedOrderNumber,
          customer_id: null, // Will be set when user authentication is implemented
          status: 'pending',
          order_type: 'delivery',
          subtotal: totalPrice,
          tax_amount: tax,
          delivery_fee: deliveryFee,
          total_amount: finalTotal,
          payment_method: formData.paymentMethod as 'cash' | 'card' | 'mobile_wallet',
          payment_status: 'pending',
          delivery_address: deliveryAddress,
          estimated_delivery_time: new Date(Date.now() + 45 * 60 * 1000).toISOString() // 45 minutes from now
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        menu_item_id: item.id,
        item_name: item.name,
        item_name_ar: item.nameAr,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }

      setOrderNumber(generatedOrderNumber);
      setShowConfirmation(true);
      clearCart();

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${generatedOrderNumber} has been confirmed.`,
      });

      setTimeout(() => {
        setShowConfirmation(false);
        navigate('/menu');
      }, 3000);

    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="max-w-md mx-4 text-center">
          <CardContent className="p-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">
              Your order #{orderNumber} has been confirmed.
            </p>
            <p className="text-sm text-gray-500">
              Estimated delivery: 30-45 minutes
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/menu')}
              className="hover:bg-emerald-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Menu
            </Button>
            
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Menu</span>
              <span>→</span>
              <span>Cart</span>
              <span>→</span>
              <span className="text-emerald-600 font-semibold">Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+966 XX XXX XXXX"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      placeholder="Enter your street address"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleLocationRequest}
                      className="hover:bg-emerald-50"
                    >
                      <MapPinned className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      value={formData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center space-x-3 cursor-pointer flex-1">
                        <Banknote className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Cash on Delivery (COD)</div>
                          <div className="text-sm text-gray-500">Pay when your order arrives</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center space-x-3 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-500">Secure payment with Visa, Mastercard, Mada</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-emerald-50 cursor-pointer">
                      <RadioGroupItem value="mobile_wallet" id="mobile" />
                      <Label htmlFor="mobile" className="flex items-center space-x-3 cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium">Mobile Payment</div>
                          <div className="text-sm text-gray-500">Apple Pay, STC Pay, or other mobile wallets</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">
                        SAR {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>SAR {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>SAR {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (15%)</span>
                    <span>SAR {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span className="text-emerald-600">SAR {finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={!isFormValid() || isPlacingOrder}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                  size="lg"
                >
                  {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Estimated delivery: 30-45 minutes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
