
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Users,
  Star,
  Phone,
  Mail,
  Calendar,
  ShoppingCart,
  Eye
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: "C001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      totalOrders: 15,
      totalSpent: 487.50,
      lastOrder: "2024-01-10",
      joinDate: "2023-06-15",
      status: "vip",
      favoriteItems: ["Margherita Pizza", "Caesar Salad"]
    },
    {
      id: "C002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234-567-8901",
      totalOrders: 8,
      totalSpent: 234.75,
      lastOrder: "2024-01-12",
      joinDate: "2023-09-20",
      status: "regular",
      favoriteItems: ["Beef Burger", "Pasta Carbonara"]
    },
    {
      id: "C003",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234-567-8902",
      totalOrders: 3,
      totalSpent: 89.25,
      lastOrder: "2024-01-08",
      joinDate: "2023-12-01",
      status: "new",
      favoriteItems: ["Pizza Pepperoni"]
    },
    {
      id: "C004",
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+1 234-567-8903",
      totalOrders: 22,
      totalSpent: 678.90,
      lastOrder: "2024-01-14",
      joinDate: "2023-03-10",
      status: "vip",
      favoriteItems: ["Pasta Carbonara", "Tiramisu", "Wine"]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip':
        return 'default';
      case 'regular':
        return 'secondary';
      case 'new':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'vip':
        return <Star className="h-4 w-4" />;
      case 'regular':
        return <Users className="h-4 w-4" />;
      case 'new':
        return <Users className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <p className="text-muted-foreground">Manage customer information and loyalty</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">248</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">VIP Customers</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                <p className="text-2xl font-bold">$32.45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Favorite Items</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      {customer.totalOrders}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">${customer.totalSpent}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(customer.status)}
                      <Badge variant={getStatusColor(customer.status) as any}>
                        {customer.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {customer.lastOrder}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {customer.favoriteItems.slice(0, 2).map((item, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                          {item}
                        </Badge>
                      ))}
                      {customer.favoriteItems.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{customer.favoriteItems.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
