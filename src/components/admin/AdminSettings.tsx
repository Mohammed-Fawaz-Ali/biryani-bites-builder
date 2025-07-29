
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { OrderingHoursConfig } from './OrderingHoursConfig';
import { 
  Save,
  Bell,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Truck,
  CreditCard,
  Smartphone
} from 'lucide-react';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    restaurant: {
      name: "Bella Vista Restaurant",
      address: "123 Main Street, Downtown",
      phone: "+1 (555) 123-4567",
      email: "info@bellavista.com",
      website: "www.bellavista.com"
    },
    hours: {
      monday: { open: "11:00", close: "22:00", closed: false },
      tuesday: { open: "11:00", close: "22:00", closed: false },
      wednesday: { open: "11:00", close: "22:00", closed: false },
      thursday: { open: "11:00", close: "22:00", closed: false },
      friday: { open: "11:00", close: "23:00", closed: false },
      saturday: { open: "10:00", close: "23:00", closed: false },
      sunday: { open: "10:00", close: "21:00", closed: false }
    },
    delivery: {
      enabled: true,
      radius: 5,
      fee: 3.99,
      freeDeliveryThreshold: 35.00,
      estimatedTime: 30
    },
    notifications: {
      newOrders: true,
      orderUpdates: true,
      reservations: true,
      lowStock: true,
      dailyReports: false
    },
    payments: {
      acceptCash: true,
      acceptCards: true,
      acceptDigitalWallets: true,
      tipSuggestions: [15, 18, 20, 25]
    }
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Implementation would save settings to backend
  };

  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  return (
    <div className="space-y-6">
      {/* Ordering Hours Configuration */}
      <OrderingHoursConfig />

      {/* Restaurant Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Restaurant Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="restaurant-name">Restaurant Name</Label>
              <Input
                id="restaurant-name"
                value={settings.restaurant.name}
                onChange={(e) => setSettings({
                  ...settings,
                  restaurant: { ...settings.restaurant, name: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={settings.restaurant.phone}
                  onChange={(e) => setSettings({
                    ...settings,
                    restaurant: { ...settings.restaurant, phone: e.target.value }
                  })}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={settings.restaurant.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    restaurant: { ...settings.restaurant, email: e.target.value }
                  })}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="website"
                  value={settings.restaurant.website}
                  onChange={(e) => setSettings({
                    ...settings,
                    restaurant: { ...settings.restaurant, website: e.target.value }
                  })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                value={settings.restaurant.address}
                onChange={(e) => setSettings({
                  ...settings,
                  restaurant: { ...settings.restaurant, address: e.target.value }
                })}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operating Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Operating Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(settings.hours).map(([day, hours]) => (
              <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={!hours.closed}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      hours: {
                        ...settings.hours,
                        [day]: { ...hours, closed: !checked }
                      }
                    })}
                  />
                  <span className="font-medium w-20">{dayNames[day as keyof typeof dayNames]}</span>
                </div>
                {!hours.closed ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) => setSettings({
                        ...settings,
                        hours: {
                          ...settings.hours,
                          [day]: { ...hours, open: e.target.value }
                        }
                      })}
                      className="w-24"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => setSettings({
                        ...settings,
                        hours: {
                          ...settings.hours,
                          [day]: { ...hours, close: e.target.value }
                        }
                      })}
                      className="w-24"
                    />
                  </div>
                ) : (
                  <Badge variant="secondary">Closed</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Delivery</Label>
              <p className="text-sm text-muted-foreground">Allow customers to order for delivery</p>
            </div>
            <Switch
              checked={settings.delivery.enabled}
              onCheckedChange={(checked) => setSettings({
                ...settings,
                delivery: { ...settings.delivery, enabled: checked }
              })}
            />
          </div>
          
          {settings.delivery.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <Label htmlFor="delivery-radius">Delivery Radius (km)</Label>
                <Input
                  id="delivery-radius"
                  type="number"
                  value={settings.delivery.radius}
                  onChange={(e) => setSettings({
                    ...settings,
                    delivery: { ...settings.delivery, radius: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="delivery-fee">Delivery Fee ($)</Label>
                <Input
                  id="delivery-fee"
                  type="number"
                  step="0.01"
                  value={settings.delivery.fee}
                  onChange={(e) => setSettings({
                    ...settings,
                    delivery: { ...settings.delivery, fee: parseFloat(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="free-delivery">Free Delivery Threshold ($)</Label>
                <Input
                  id="free-delivery"
                  type="number"
                  step="0.01"
                  value={settings.delivery.freeDeliveryThreshold}
                  onChange={(e) => setSettings({
                    ...settings,
                    delivery: { ...settings.delivery, freeDeliveryThreshold: parseFloat(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="estimated-time">Estimated Time (minutes)</Label>
                <Input
                  id="estimated-time"
                  type="number"
                  value={settings.delivery.estimatedTime}
                  onChange={(e) => setSettings({
                    ...settings,
                    delivery: { ...settings.delivery, estimatedTime: parseInt(e.target.value) }
                  })}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.notifications).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                <p className="text-sm text-muted-foreground">
                  {key === 'newOrders' && 'Get notified when new orders are placed'}
                  {key === 'orderUpdates' && 'Get notified when order status changes'}
                  {key === 'reservations' && 'Get notified about new reservations'}
                  {key === 'lowStock' && 'Get notified when items are running low'}
                  {key === 'dailyReports' && 'Receive daily performance reports'}
                </p>
              </div>
              <Switch
                checked={enabled}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, [key]: checked }
                })}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Accept Cash</Label>
                <p className="text-sm text-muted-foreground">Allow cash payments</p>
              </div>
              <Switch
                checked={settings.payments.acceptCash}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  payments: { ...settings.payments, acceptCash: checked }
                })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Accept Credit/Debit Cards</Label>
                <p className="text-sm text-muted-foreground">Allow card payments</p>
              </div>
              <Switch
                checked={settings.payments.acceptCards}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  payments: { ...settings.payments, acceptCards: checked }
                })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Accept Digital Wallets
                </Label>
                <p className="text-sm text-muted-foreground">Apple Pay, Google Pay, etc.</p>
              </div>
              <Switch
                checked={settings.payments.acceptDigitalWallets}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  payments: { ...settings.payments, acceptDigitalWallets: checked }
                })}
              />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Label>Tip Suggestions (%)</Label>
            <div className="flex gap-2 mt-2">
              {settings.payments.tipSuggestions.map((tip, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {tip}%
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
