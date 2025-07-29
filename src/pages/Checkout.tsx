
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
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, ShoppingCart, Plus, Minus, Trash2, Calculator } from 'lucide-react';

interface DeliveryAddress {
  street: string;
  city: string;
  phone: string;
  notes: string;
}

const Checkout = () => {
  const { items, subtotal, tax, deliveryFee, total, clearCart, updateQuantity, removeItem } = useCart();
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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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
      // Generate order number with fallback
      let orderNumber;
      const { data: orderNumberData, error: orderNumberError } = await supabase
        .rpc('generate_order_number');

      if (orderNumberError || !orderNumberData) {
        // Fallback: generate order number manually
        orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        console.warn('Using fallback order number generation:', orderNumber);
      } else {
        orderNumber = orderNumberData;
      }

      // Create order with proper enum types
      const orderData = {
        order_number: orderNumber,
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
        description: `Your order #${orderData.order_number} has been placed. You'll receive real-time updates!`,
      });
      
      // Navigate to a success page or back to menu
      navigate('/menu');
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
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Order Summary */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="bg-white shadow-md rounded-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Summary ({items.length} items)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center text-xl">
                        {typeof item.image === 'string' && item.image.startsWith('http') ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span>{item.image || '🍽️'}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.nameAr}</p>
                        <p className="text-sm font-medium text-amber-600">SAR {item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* Order Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>SAR {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (15%):</span>
                    <span>SAR {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee:</span>
                    <span>SAR {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span className="text-green-600">SAR {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Forms */}
        <div className="space-y-6">

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

      {/* Terms & Conditions */}
      <Card className="bg-white shadow-md rounded-md">
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Delivery Policy:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Standard delivery time is 30-45 minutes</li>
                <li>Delivery fee applies as shown in your order summary</li>
                <li>We deliver within the city limits only</li>
              </ul>
              
              <p><strong>Payment Terms:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Cash on delivery accepted</li>
                <li>Online payments are processed securely</li>
                <li>No cancellation after order confirmation</li>
              </ul>

              <p><strong>Food Safety:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>All food is prepared with fresh ingredients</li>
                <li>Please inform us of any allergies or dietary restrictions</li>
                <li>Food quality is guaranteed</li>
              </ul>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                I agree to the terms and conditions, privacy policy, and confirm that all information provided is accurate.
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button 
          className="w-full" 
          onClick={handleSubmit} 
          disabled={isLoading || !acceptedTerms || !paymentMethod || !deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.phone}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Placing Order...
            </>
          ) : (
            "Place Order"
          )}
        </Button>
        {(!acceptedTerms || !paymentMethod || !deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.phone) && (
          <p className="text-sm text-red-500 text-center mt-2">
            Please fill in all required fields and accept the terms & conditions
          </p>
        )}
      </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
