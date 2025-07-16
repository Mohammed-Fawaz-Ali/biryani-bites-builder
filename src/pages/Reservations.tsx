
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Users, Clock, MapPin, QrCode, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Reservations = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationNumber, setReservationNumber] = useState('');

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM',
    '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
  ];

  const handleReservation = async () => {
    if (!selectedDate || !selectedTime || !partySize || !customerName || !customerPhone) {
      return;
    }

    // Generate reservation number
    const resNumber = `RES-${Date.now().toString().slice(-6)}`;
    setReservationNumber(resNumber);
    setIsConfirmed(true);
  };

  if (isConfirmed) {
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

        {/* Confirmation */}
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-emerald-800 mb-2">
                Reservation Confirmed!
              </h1>
              <p className="text-lg text-emerald-700 mb-2 font-arabic">
                تم تأكيد حجزك
              </p>
              
              <div className="bg-emerald-50 rounded-lg p-6 my-8">
                <h2 className="text-xl font-semibold text-emerald-800 mb-4">Reservation Details</h2>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reservation #:</span>
                    <span className="font-semibold text-emerald-700">{reservationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{selectedDate && format(selectedDate, 'PPP')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Party Size:</span>
                    <span className="font-semibold">{partySize} guests</span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white p-8 rounded-lg border-2 border-emerald-200 mb-6">
                <QrCode className="w-32 h-32 mx-auto text-emerald-600 mb-4" />
                <p className="text-sm text-gray-600">Show this QR code when you arrive</p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/menu')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3"
                >
                  Pre-Order Your Meal
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">
            Reserve Your Table
          </h1>
          <p className="text-lg text-emerald-700 font-arabic">
            احجز طاولتك في البيت
          </p>
          <p className="text-gray-600 mt-2">
            Experience authentic Saudi cuisine in our warm, welcoming atmosphere
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Reservation Form */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Reservation Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label className="text-emerald-700 font-semibold">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-emerald-200",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label className="text-emerald-700 font-semibold">Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="border-emerald-200">
                    <SelectValue placeholder="Choose time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{time}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Party Size */}
              <div className="space-y-2">
                <Label className="text-emerald-700 font-semibold">Party Size</Label>
                <Select value={partySize} onValueChange={setPartySize}>
                  <SelectTrigger className="border-emerald-200">
                    <SelectValue placeholder="Number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{size} {size === 1 ? 'guest' : 'guests'}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-emerald-700 font-semibold">Full Name</Label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-emerald-700 font-semibold">Phone Number</Label>
                  <Input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+966 50 123 4567"
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-emerald-700 font-semibold">Special Requests (Optional)</Label>
                  <Input
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special arrangements or dietary requirements"
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                </div>
              </div>

              <Button
                onClick={handleReservation}
                disabled={!selectedDate || !selectedTime || !partySize || !customerName || !customerPhone}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 text-lg font-semibold"
              >
                Confirm Reservation
              </Button>
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Restaurant Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Location</p>
                      <p className="text-gray-600">123 King Fahd Road, Riyadh, Saudi Arabia</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">Hours</p>
                      <p className="text-gray-600">Daily: 12:00 PM - 10:30 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Why Choose Al-Bayt?</h3>
                <ul className="space-y-2">
                  <li>• Authentic Saudi family recipes</li>
                  <li>• Fresh ingredients daily</li>
                  <li>• Traditional atmosphere</li>
                  <li>• Excellent service</li>
                  <li>• Family-friendly environment</li>
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
