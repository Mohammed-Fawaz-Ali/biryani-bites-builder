
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users, Phone, User, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/BackButton';

const Reservations = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate reservation submission
    toast({
      title: "Reservation Confirmed!",
      description: `Your table for ${formData.guests} on ${formData.date} at ${formData.time} has been confirmed.`,
    });

    // Reset form
    setFormData({
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      specialRequests: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-sand">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton to="/" />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald mb-4">Reserve Your Table</h1>
          <p className="text-emerald/70 text-lg font-arabic mb-2">احجز طاولتك</p>
          <p className="text-emerald/70">Experience authentic Saudi cuisine in our elegant dining room</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reservation Form */}
          <Card className="bg-white rounded-3xl shadow-lg">
            <CardHeader className="bg-emerald text-white rounded-t-3xl">
              <CardTitle className="text-xl flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Make a Reservation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-emerald font-medium">Full Name *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald/50 h-4 w-4" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="pl-10 border-emerald/30 focus:border-emerald"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-emerald font-medium">Phone Number *</Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald/50 h-4 w-4" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 border-emerald/30 focus:border-emerald"
                        placeholder="+966 XX XXX XXXX"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-emerald font-medium">Date *</Label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald/50 h-4 w-4" />
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="pl-10 border-emerald/30 focus:border-emerald"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-emerald font-medium">Time *</Label>
                    <div className="relative mt-2">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald/50 h-4 w-4" />
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="pl-10 border-emerald/30 focus:border-emerald"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests" className="text-emerald font-medium">Number of Guests *</Label>
                  <div className="relative mt-2">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald/50 h-4 w-4" />
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.guests}
                      onChange={(e) => handleInputChange('guests', e.target.value)}
                      className="pl-10 border-emerald/30 focus:border-emerald"
                      placeholder="Number of guests"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialRequests" className="text-emerald font-medium">Special Requests</Label>
                  <div className="relative mt-2">
                    <MessageSquare className="absolute left-3 top-3 text-emerald/50 h-4 w-4" />
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      className="pl-10 border-emerald/30 focus:border-emerald min-h-[100px]"
                      placeholder="Any special requests or dietary requirements..."
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-emerald hover:bg-emerald/90 text-white py-3 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  Confirm Reservation
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          <div className="space-y-6">
            <Card className="bg-white rounded-3xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-emerald mb-4">Restaurant Information</h3>
                <div className="space-y-4 text-emerald/70">
                  <div>
                    <h4 className="font-semibold text-emerald">Operating Hours</h4>
                    <p>Sunday - Thursday: 12:00 PM - 11:00 PM</p>
                    <p>Friday - Saturday: 12:00 PM - 12:00 AM</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald">Location</h4>
                    <p>King Fahd Road, Riyadh, Saudi Arabia</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald">Contact</h4>
                    <p>Phone: +966 11 234 5678</p>
                    <p>Email: reservations@albayt.sa</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-emerald text-white rounded-3xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Reservation Policy</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Reservations are confirmed within 30 minutes</li>
                  <li>• Tables are held for 15 minutes past reservation time</li>
                  <li>• Cancellations must be made 2 hours in advance</li>
                  <li>• Large groups (8+) may require a deposit</li>
                  <li>• Special dietary requirements can be accommodated</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
