
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { CustomerReservations } from '@/components/reservations/CustomerReservations';
import { AdminReservations } from '@/components/reservations/AdminReservations';
import { NewReservationForm } from '@/components/reservations/NewReservationForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, Plus } from 'lucide-react';

export default function Reservations() {
  const { user } = useAuth();
  const { userRole } = useUserRole();
  const [showNewReservationForm, setShowNewReservationForm] = useState(false);

  const isAdmin = userRole === 'admin' || userRole === 'manager';

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Reservations</h1>
          <p className="text-muted-foreground mb-8">Please log in to make or view reservations</p>
        </div>
      </div>
    );
  }

  if (showNewReservationForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <NewReservationForm onClose={() => setShowNewReservationForm(false)} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reservations</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Manage restaurant reservations' : 'Book your table or view your reservations'}
          </p>
        </div>
        {!isAdmin && (
          <Button 
            onClick={() => setShowNewReservationForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Reservation
          </Button>
        )}
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Hours</span>
            </div>
            <p className="text-lg font-bold">5:00 PM - 10:00 PM</p>
            <p className="text-sm text-muted-foreground">Daily</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-600">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Party Size</span>
            </div>
            <p className="text-lg font-bold">2-12 Guests</p>
            <p className="text-sm text-muted-foreground">Various table types</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Booking</span>
            </div>
            <p className="text-lg font-bold">30 Days Ahead</p>
            <p className="text-sm text-muted-foreground">Advanced booking</p>
          </CardContent>
        </Card>
      </div>

      {isAdmin ? (
        <AdminReservations />
      ) : (
        <Tabs defaultValue="my-reservations" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-reservations">My Reservations</TabsTrigger>
            <TabsTrigger value="new-reservation">Book a Table</TabsTrigger>
          </TabsList>
          <TabsContent value="my-reservations" className="mt-6">
            <CustomerReservations />
          </TabsContent>
          <TabsContent value="new-reservation" className="mt-6">
            <NewReservationForm />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
