
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/hooks/use-toast"
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from 'lucide-react';

interface DeliveryAddress {
  street: string;
  city: string;
  phone: string;
  notes: string;
}

const Checkout = () => {
  const { items, subtotal, tax, deliveryFee, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    street: '',
    city: '',
    phone: '',
    notes: '',
  });
  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomerNotes(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to place an order.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generate order number
      const { data: orderNumberData, error: orderNumberError } = await supabase
        .rpc('generate_order_number');

      if (orderNumberError) throw orderNumberError;

      // Create order with proper enum types
      const orderData = {
        order_number: orderNumberData,
        customer_id: user.id,
        subtotal: subtotal,
        tax_amount: tax,
        delivery_fee: deliveryFee,
        total_amount: total,
        payment_method: (paymentMethod as 'cash' | 'card' | 'mobile_wallet' | 'online') || 'cash',
        delivery_address: {
          street: deliveryAddress.street,
          city: deliveryAddress.city,
          phone: deliveryAddress.phone,
          notes: deliveryAddress.notes
        },
        customer_notes: customerNotes,
        status: 'pending' as const,
        payment_status: 'pending' as const
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items with correct types
      const orderItems = items.map(item => ({
        order_id: order.id,
        menu_item_id: String(item.id), // Convert to string
        item_name: item.name,
        item_name_ar: item.nameAr,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and redirect
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: `Your order #${orderData.order_number} has been placed.`,
      });
      
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error placing order",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <Card className="bg-white shadow-md rounded-md">
        <CardHeader>
          <CardTitle>Delivery Address</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="street">Street</Label>
            <Input
              type="text"
              id="street"
              name="street"
              value={deliveryAddress.street}
              onChange={handleAddressChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              id="city"
              name="city"
              value={deliveryAddress.city}
              onChange={handleAddressChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={deliveryAddress.phone}
              onChange={handleAddressChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Delivery Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={deliveryAddress.notes}
              onChange={handleAddressChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md rounded-md mt-6">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="payment">Select Payment Method</Label>
            <Select onValueChange={handlePaymentMethodChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Credit Card</SelectItem>
                <SelectItem value="cash">Cash on Delivery</SelectItem>
                <SelectItem value="mobile_wallet">Mobile Wallet</SelectItem>
                <SelectItem value="online">Online Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md rounded-md mt-6">
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="customerNotes">Customer Notes</Label>
            <Textarea
              id="customerNotes"
              value={customerNotes}
              onChange={handleNotesChange}
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Placing Order...
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
