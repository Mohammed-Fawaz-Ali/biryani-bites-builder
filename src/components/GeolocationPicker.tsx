
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation, Loader } from 'lucide-react';

interface GeolocationPickerProps {
  onAddressSelect: (address: any) => void;
}

const GeolocationPicker = ({ onAddressSelect }: GeolocationPickerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [manualAddress, setManualAddress] = useState({
    street: '',
    building: '',
    area: '',
    city: 'Riyadh',
    instructions: ''
  });

  const getCurrentLocation = () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Simulate reverse geocoding (in real app, use Google Maps API or similar)
        setTimeout(() => {
          const mockAddress = {
            lat: latitude,
            lng: longitude,
            street: 'King Fahd Road',
            building: '123',
            area: 'Al Olaya',
            city: 'Riyadh',
            fullAddress: '123 King Fahd Road, Al Olaya, Riyadh, Saudi Arabia',
            instructions: ''
          };
          
          onAddressSelect(mockAddress);
          setIsLoading(false);
        }, 2000);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter manually.');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleManualSubmit = () => {
    if (!manualAddress.street || !manualAddress.area) {
      alert('Please fill in at least street address and area.');
      return;
    }

    const fullAddress = {
      ...manualAddress,
      fullAddress: `${manualAddress.building} ${manualAddress.street}, ${manualAddress.area}, ${manualAddress.city}, Saudi Arabia`,
      lat: null,
      lng: null
    };

    onAddressSelect(fullAddress);
  };

  return (
    <div className="space-y-6">
      {/* Auto-detect Location */}
      <Card className="border-emerald-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
              <Navigation className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800 mb-2">Use Current Location</h3>
              <p className="text-sm text-gray-600 mb-4">
                We'll automatically detect your location for faster delivery
              </p>
              <Button
                onClick={getCurrentLocation}
                disabled={isLoading}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Getting Location...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Detect My Location
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-sand text-gray-500">Or enter manually</span>
        </div>
      </div>

      {/* Manual Address Input */}
      <Card className="border-emerald-200">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-emerald-800 mb-4">Enter Address Manually</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-emerald-700">Building/Villa Number</Label>
              <Input
                value={manualAddress.building}
                onChange={(e) => setManualAddress(prev => ({ ...prev, building: e.target.value }))}
                placeholder="123"
                className="border-emerald-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-700">Street Name</Label>
              <Input
                value={manualAddress.street}
                onChange={(e) => setManualAddress(prev => ({ ...prev, street: e.target.value }))}
                placeholder="King Fahd Road"
                className="border-emerald-200 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-emerald-700">Area/District</Label>
              <Input
                value={manualAddress.area}
                onChange={(e) => setManualAddress(prev => ({ ...prev, area: e.target.value }))}
                placeholder="Al Olaya"
                className="border-emerald-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-700">City</Label>
              <Input
                value={manualAddress.city}
                onChange={(e) => setManualAddress(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Riyadh"
                className="border-emerald-200 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-emerald-700">Delivery Instructions (Optional)</Label>
            <Input
              value={manualAddress.instructions}
              onChange={(e) => setManualAddress(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="Apartment 4B, Ring the bell twice"
              className="border-emerald-200 focus:border-emerald-500"
            />
          </div>

          <Button
            onClick={handleManualSubmit}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
          >
            Confirm Address
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeolocationPicker;
