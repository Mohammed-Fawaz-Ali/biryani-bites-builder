
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  MapPin, 
  Phone,
  MessageCircle,
  Navigation
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderTracker = () => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [orderStatus, setOrderStatus] = useState('preparing');
  const [estimatedTime, setEstimatedTime] = useState(25);

  // Simulate real-time updates
  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(() => {
        setEstimatedTime(prev => Math.max(0, prev - 1));
        
        // Simulate status changes
        if (estimatedTime <= 20 && orderStatus === 'preparing') {
          setOrderStatus('ready');
        } else if (estimatedTime <= 15 && orderStatus === 'ready') {
          setOrderStatus('picked_up');
        } else if (estimatedTime <= 5 && orderStatus === 'picked_up') {
          setOrderStatus('delivered');
        }
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [isTracking, estimatedTime, orderStatus]);

  const handleTrackOrder = () => {
    if (orderNumber.trim()) {
      setIsTracking(true);
    }
  };

  const statusSteps = [
    { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, completed: true },
    { id: 'preparing', label: 'Preparing', icon: Package, completed: orderStatus !== 'confirmed' },
    { id: 'ready', label: 'Ready for Pickup', icon: Clock, completed: ['ready', 'picked_up', 'delivered'].includes(orderStatus) },
    { id: 'picked_up', label: 'Out for Delivery', icon: Truck, completed: ['picked_up', 'delivered'].includes(orderStatus) },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle, completed: orderStatus === 'delivered' }
  ];

  if (!isTracking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-gold/10">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-emerald-700 hover:bg-emerald-50"
            >
              ← Back to Home
            </Button>
          </div>
        </div>

        {/* Track Order Form */}
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-emerald-800 mb-4">
              Track Your Order
            </h1>
            <p className="text-lg text-emerald-700 font-arabic">
              تتبع طلبك
            </p>
            <p className="text-gray-600 mt-2">
              Enter your order number to see real-time updates
            </p>
          </div>

          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-emerald-700 font-semibold">Order Number</label>
                  <Input
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter your order number (e.g., ORD-123456)"
                    className="border-emerald-200 focus:border-emerald-500 text-lg py-3"
                  />
                </div>

                <Button
                  onClick={handleTrackOrder}
                  disabled={!orderNumber.trim()}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 text-lg font-semibold"
                >
                  Track Order
                </Button>

                <div className="bg-emerald-50 rounded-lg p-4">
                  <h3 className="font-semibold text-emerald-800 mb-2">Need Help?</h3>
                  <p className="text-sm text-emerald-700 mb-3">
                    Can't find your order number? Check your email confirmation or SMS.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Support
                  </Button>
                </div>
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => setIsTracking(false)}
            className="text-emerald-700 hover:bg-emerald-50"
          >
            ← Track Another Order
          </Button>
          <div className="text-right">
            <p className="text-sm text-gray-600">Order #</p>
            <p className="font-semibold text-emerald-700">{orderNumber}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Status */}
          <div className="space-y-6">
            {/* Status Timeline */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Order Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = orderStatus === step.id;
                    
                    return (
                      <div key={step.id} className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-emerald-600 text-white' 
                            : isActive 
                              ? 'bg-gold text-white animate-pulse'
                              : 'bg-gray-200 text-gray-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${
                            step.completed ? 'text-emerald-700' : isActive ? 'text-gold' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </p>
                          {isActive && (
                            <p className="text-sm text-gray-600">
                              Estimated: {estimatedTime} minutes
                            </p>
                          )}
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div className={`w-px h-8 ${
                            step.completed ? 'bg-emerald-300' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            {orderStatus === 'picked_up' && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-800 flex items-center space-x-2">
                    <Truck className="w-5 h-5" />
                    <span>Delivery Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 font-bold">AH</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Ahmed Hassan</p>
                        <p className="text-sm text-gray-600">Delivery Driver</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Driver
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Live Map */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center space-x-2">
                <Navigation className="w-5 h-5" />
                <span>Live Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Simulated Map */}
              <div className="bg-gradient-to-br from-emerald-100 to-green-200 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-500/20"></div>
                
                {/* Restaurant Marker */}
                <div className="absolute top-6 left-6 bg-emerald-600 text-white p-2 rounded-full shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                
                {/* Delivery Route */}
                <div className="absolute top-12 left-12 w-32 h-1 bg-emerald-400 rounded transform rotate-45"></div>
                <div className="absolute top-20 left-32 w-24 h-1 bg-emerald-400 rounded transform rotate-12"></div>
                
                {/* Driver Location */}
                {orderStatus === 'picked_up' && (
                  <div className="absolute top-28 left-40 bg-gold text-white p-2 rounded-full shadow-lg animate-pulse">
                    <Truck className="w-5 h-5" />
                  </div>
                )}
                
                {/* Destination Marker */}
                <div className="absolute bottom-6 right-6 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>

                <div className="text-center z-10">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-emerald-700 font-semibold">Live Map View</p>
                  <p className="text-sm text-emerald-600">
                    {orderStatus === 'picked_up' 
                      ? 'Driver is on the way to you' 
                      : 'Your order is being prepared'}
                  </p>
                </div>
              </div>

              {/* ETA */}
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-emerald-700">Estimated Delivery</p>
                    <p className="text-lg font-bold text-emerald-800">
                      {estimatedTime} minutes
                    </p>
                  </div>
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
