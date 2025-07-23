
import { Database } from '@/integrations/supabase/types';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, Phone, Search, Plus, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function AdminReservations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  const { data: reservations, isLoading, refetch } = useQuery({
    queryKey: ['admin-reservations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('reservation_date', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ['reservation-stats'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data: todayReservations, error } = await supabase
        .from('reservations')
        .select('status')
        .eq('reservation_date', today);

      if (error) throw error;

      const stats = {
        total: todayReservations.length,
        pending: todayReservations.filter(r => r.status === 'pending').length,
        confirmed: todayReservations.filter(r => r.status === 'confirmed').length,
        seated: todayReservations.filter(r => r.status === 'seated').length,
        completed: todayReservations.filter(r => r.status === 'completed').length,
      };

      return stats;
    },
  });

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: status as Database['public']['Enums']['reservation_status'] })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Reservation status updated');
      refetch();
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast.error('Failed to update reservation status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'seated':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no_show':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReservations = reservations?.filter(reservation => {
    const matchesSearch = 
      reservation.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customer_phone.includes(searchTerm) ||
      reservation.reservation_number.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;

    const today = new Date().toISOString().split('T')[0];
    const reservationDate = reservation.reservation_date;
    const matchesDate = 
      dateFilter === 'all' ||
      (dateFilter === 'today' && reservationDate === today) ||
      (dateFilter === 'upcoming' && reservationDate >= today);

    return matchesSearch && matchesStatus && matchesDate;
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading reservations...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Today</p>
                <p className="text-2xl font-bold">{stats?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats?.pending || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">{stats?.confirmed || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Seated</p>
                <p className="text-2xl font-bold">{stats?.seated || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats?.completed || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or reservation number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="seated">Seated</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no_show">No Show</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations?.map((reservation) => (
          <Card key={reservation.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{reservation.customer_name}</h3>
                  <p className="text-sm text-muted-foreground">#{reservation.reservation_number}</p>
                </div>
                <Badge className={getStatusColor(reservation.status)}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{format(new Date(reservation.reservation_date), 'PPP')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.reservation_time}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.party_size} guests</span>
                  </div>
                  {reservation.tables && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Table: {reservation.table_number || 'Not assigned'}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{reservation.customer_phone}</span>
                  </div>
                </div>
              </div>

              {reservation.special_requests && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Special Requests:</p>
                  <p className="text-sm text-muted-foreground">{reservation.special_requests}</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                {reservation.status === 'pending' && (
                  <Button
                    size="sm"
                    onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                  >
                    Confirm
                  </Button>
                )}
                {reservation.status === 'confirmed' && (
                  <Button
                    size="sm"
                    onClick={() => updateReservationStatus(reservation.id, 'seated')}
                  >
                    Seat
                  </Button>
                )}
                {reservation.status === 'seated' && (
                  <Button
                    size="sm"
                    onClick={() => updateReservationStatus(reservation.id, 'completed')}
                  >
                    Complete
                  </Button>
                )}
                {['pending', 'confirmed'].includes(reservation.status) && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                )}
                {reservation.status === 'confirmed' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateReservationStatus(reservation.id, 'no_show')}
                  >
                    No Show
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReservations?.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reservations found</h3>
            <p className="text-muted-foreground">
              No reservations match your current filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
