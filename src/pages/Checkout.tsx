
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  CreditCard, 
  Clock, 
  CheckCircle,
  Smartphone,
  Banknote,
  Car,
  Store
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import GeolocationPicker from '@/components/GeolocationPicker';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Time, 3: Payment, 4: Confirmation
  const [orderType, setOrderType] = useState('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryTimes = [
    'ASAP (25-35 mins)',
    '1:00 PM - 1:30 PM',
    '1:30 PM - 2:00 PM',
    '2:00 PM - 2:30 PM',
    '2:30 PM - 3:00 PM',
    '6:00 PM - 6:30 PM',
    '6:30 PM - 7:00 PM',
    '7:00 PM - 7:30 PM',
    '7:30 PM - 8:00 PM',
    '8:00 PM - 8:30 PM'
  ];

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', nameAr: 'الدفع عند الاستلام', icon: Banknote },
    { id: 'mada', name: 'Mada Card', nameAr: 'بطاقة مدى', icon: CreditCard },
    { id: 'applepay', name: 'Apple Pay', nameAr: 'أبل باي', icon: Smartphone },
    { id: 'card', name: 'Credit/Debit Card', nameAr: 'بطاقة ائتمان', icon: CreditCard }
  ];

  const handleAddressSelect = (address: any) => {
    setDeliveryAddress(address);
    setStep(2);
  };

  const handleTimeSelect = () => {
    if (selectedTime) {
      setStep(3);
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) return;
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      const orderNum = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderNumber(orderNum);
      setStep(4);
      setIsProcessing(false);
      clearCart();
    }, 3000);
  };

  if (items.length === 0 && step < 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-gold/10 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to continue with checkout</p>
            <Button 
              onClick={() => navigate('/menu')}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
            >
              Browse Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Order Confirmation
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-gold/10">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-emerald-800 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-lg text-emerald-700 mb-2 font-arabic">
                تم تأكيد طلبك
              </p>
              
              <div className="bg-emerald-50 rounded-lg p-6 my-8">
                <h2 className="text-xl font-semibold text-emerald-800 mb-4">Order Details</h2>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-semibold text-emerald-700">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold">SAR {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/order-tracker')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3"
                >
                  Track Your Order
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-gold/10">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/menu')}
            className="text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step > 1 ? 'Back' : 'Back to Menu'}
          </Button>
          
          {/* Progress */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  s <= step 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-800 flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Delivery Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Order Type */}
                  <div className="mb-6">
                    <Label className="text-emerald-700 font-semibold mb-4 block">Order Type</Label>
                    <RadioGroup value={orderType} onValueChange={setOrderType} className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 p-4 border-2 border-emerald-200 rounded-lg">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="flex items-center space-x-2 cursor-pointer">
                          <Car className="w-4 h-4" />
                          <span>Delivery</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border-2 border-emerald-200 rounded-lg">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex items-center space-x-2 cursor-pointer">
                          <Store className="w-4 h-4" />
                          <span>Pickup</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {orderType === 'delivery' ? (
                    <GeolocationPicker onAddressSelect={handleAddressSelect} />
                  ) : (
                    <div className="text-center py-8">
                      <Store className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-emerald-800 mb-2">Pickup Location</h3>
                      <p className="text-gray-600 mb-4">Al-Bayt Restaurant</p>
                      <p className="text-sm text-gray-500 mb-6">123 King Fahd Road, Al Olaya, Riyadh</p>
                      <Button
                        onClick={() => setStep(2)}
                        className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                      >
                        Continue to Time Selection
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-800 flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Delivery Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label className="text-emerald-700 font-semibold">Choose your preferred time</Label>
                    <RadioGroup value={selectedTime} onValueChange={setSelectedTime}>
                      <div className="grid gap-3">
                        {deliveryTimes.map((time) => (
                          <div key={time} className="flex items-center space-x-3 p-4 border-2 border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                            <RadioGroupItem value={time} id={time} />
                            <Label htmlFor={time} className="flex-1 cursor-pointer font-medium">
                              {time}
                            </Label>
                            {time.includes('ASAP') && (
                              <Badge className="bg-emerald-600 text-white">Recommended</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                    
                    <Button
                      onClick={handleTimeSelect}
                      disabled={!selectedTime}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 mt-6"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-800 flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Payment Method</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label className="text-emerald-700 font-semibold">How would you like to pay?</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="grid gap-4">
                        {paymentMethods.map((method) => {
                          const Icon = method.icon;
                          return (
                            <div key={method.id} className="flex items-center space-x-3 p-4 border-2 border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <Icon className="w-5 h-5 text-emerald-600" />
                              <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                                <div className="font-medium">{method.name}</div>
                                <div className="text-sm text-gray-500 font-arabic">{method.nameAr}</div>
                              </Label>
                              {method.id === 'cod' && (
                                <Badge className="bg-gold text-white">Popular</Badge>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
                    
                    <Button
                      onClick={handlePayment}
                      disabled={!paymentMethod || isProcessing}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 mt-6 py-3 text-lg"
                    >
                      {isProcessing ? 'Processing Order...' : `Place Order - SAR ${totalPrice.toFixed(2)}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-emerald-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${JSON.stringify(item.customizations)}`} className="flex items-center space-x-3 py-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-lg">
                        {item.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        {item.customizations?.spiceLevel && (
                          <p className="text-xs text-emerald-600">Spice: {item.customizations.spiceLevel}/3</p>
                        )}
                      </div>
                      <p className="font-semibold text-emerald-600 text-sm">
                        SAR {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>SAR {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>{orderType === 'delivery' ? 'SAR 10.00' : 'Free'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>VAT (15%)</span>
                      <span>SAR {(totalPrice * 0.15).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg text-emerald-800">
                      <span>Total</span>
                      <span>SAR {(totalPrice + (orderType === 'delivery' ? 10 : 0) + (totalPrice * 0.15)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
