
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Truck, ChefHat, Package } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '@/components/BackButton';

const OrderTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedTime, setEstimatedTime] = useState(35);
  
  const orderNumber = location.state?.orderNumber || `ORD-${Date.now()}`;

  const steps = [
    { id: 1, title: 'Order Confirmed', description: 'Your order has been received', icon: CheckCircle, time: '2 min' },
    { id: 2, title: 'Preparing', description: 'Our chefs are preparing your meal', icon: ChefHat, time: '15 min' },
    { id: 3, title: 'Ready for Pickup', description: 'Your order is ready for delivery', icon: Package, time: '25 min' },
    { id: 4, title: 'Out for Delivery', description: 'Your order is on the way', icon: Truck, time: '35 min' },
    { id: 5, title: 'Delivered', description: 'Enjoy your meal!', icon: CheckCircle, time: '40 min' }
  ];

  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 5) {
          const nextStep = prev + 1;
          setEstimatedTime(prev => Math.max(0, prev - 8));
          return nextStep;
        }
        return prev;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-sand">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton to="/" />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald mb-2">Track Your Order</h1>
          <p className="text-emerald/70">Order #{orderNumber}</p>
        </div>

        {/* Order Status */}
        <Card className="bg-white rounded-2xl shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-emerald/10 px-4 py-2 rounded-full">
                <Clock className="h-5 w-5 text-emerald" />
                <span className="text-emerald font-semibold">
                  {currentStep === 5 ? 'Delivered!' : `Estimated: ${estimatedTime} minutes`}
                </span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => {
                const status = getStepStatus(step.id);
                const IconComponent = step.icon;
                
                return (
                  <div key={step.id} className="flex items-center space-x-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${status === 'completed' ? 'bg-emerald text-white' : 
                        status === 'active' ? 'bg-gold text-white animate-pulse' : 
                        'bg-gray-200 text-gray-400'}
                    `}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${
                          status === 'completed' || status === 'active' ? 'text-emerald' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </h3>
                        <Badge variant={
                          status === 'completed' ? 'default' : 
                          status === 'active' ? 'secondary' : 'outline'
                        }>
                          {step.time}
                        </Badge>
                      </div>
                      <p className={`text-sm ${
                        status === 'completed' || status === 'active' ? 'text-emerald/70' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="bg-white rounded-2xl shadow-lg mb-8">
          <CardHeader className="bg-emerald text-white rounded-t-2xl">
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-emerald mb-2">Delivery Address</h4>
                <p className="text-emerald/70">King Fahd Road, Al-Malaz District</p>
                <p className="text-emerald/70">Building 123, Riyadh</p>
              </div>
              <div>
                <h4 className="font-semibold text-emerald mb-2">Contact</h4>
                <p className="text-emerald/70">Phone: +966 XX XXX XXXX</p>
                <p className="text-emerald/70">Payment: Cash on Delivery</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/menu')}
            variant="outline"
            className="border-emerald text-emerald hover:bg-emerald hover:text-white"
          >
            Order Again
          </Button>
          <Button 
            onClick={() => navigate('/')}
            className="bg-emerald hover:bg-emerald/90"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
