
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Upload,
  Eye,
  Calendar,
  DollarSign,
  Info,
  Globe,
  BarChart3,
  Settings,
  ChefHat
} from 'lucide-react';

interface MenuItemFormData {
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  short_description?: string;
  full_description?: string;
  price: number;
  special_price?: number;
  promo_price?: number;
  category_id: string;
  image_url: string;
  video_url?: string;
  spice_level: number;
  preparation_time: number;
  calories?: number;
  is_available: boolean;
  is_featured: boolean;
  is_chefs_special: boolean;
  is_new_item: boolean;
  is_out_of_stock: boolean;
  include_tax: boolean;
  include_service_charge: boolean;
  stock_count?: number;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  ingredients?: any;
  customization_options?: any;
  dietary_tags?: string[];
  allergens?: string[];
  scheduled_publish_at?: string;
}

interface Addon {
  id?: string;
  name: string;
  name_ar: string;
  price: number;
  is_available: boolean;
}

interface AddEditMenuItemFormProps {
  itemId?: string;
  onClose: () => void;
  onSave: () => void;
}

export function AddEditMenuItemForm({ itemId, onClose, onSave }: AddEditMenuItemFormProps) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<MenuItemFormData>({
    defaultValues: {
      is_available: true,
      is_featured: false,
      is_chefs_special: false,
      is_new_item: false,
      is_out_of_stock: false,
      include_tax: true,
      include_service_charge: true,
      spice_level: 0,
      preparation_time: 15,
    }
  });

  const watchedValues = watch();

  // Load categories
  useEffect(() => {
    loadCategories();
  }, []);

  // Load item data if editing
  useEffect(() => {
    if (itemId) {
      loadItemData();
    }
  }, [itemId]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveEnabled && itemId) {
      const timeoutId = setTimeout(() => {
        saveDraft();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [watchedValues, autoSaveEnabled, itemId]);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    
    if (data) setCategories(data);
  };

  const loadItemData = async () => {
    setIsLoading(true);
    const { data: item } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', itemId)
      .single();

    const { data: itemAddons } = await supabase
      .from('menu_item_addons')
      .select('*')
      .eq('menu_item_id', itemId)
      .order('sort_order');

    if (item) {
      reset(item);
      if (itemAddons) setAddons(itemAddons);
    }
    setIsLoading(false);
  };

  const saveDraft = async () => {
    if (!itemId) return;
    
    // Convert addons to a plain object structure that's compatible with Json type
    const serializedAddons = addons.map(addon => ({
      id: addon.id || null,
      name: addon.name,
      name_ar: addon.name_ar,
      price: addon.price,
      is_available: addon.is_available
    }));

    const draft = {
      ...watchedValues,
      addons: serializedAddons,
      saved_at: new Date().toISOString()
    };

    await supabase
      .from('menu_items')
      .update({ draft })
      .eq('id', itemId);

    setLastSaved(new Date());
  };

  const addNewAddon = () => {
    setAddons([...addons, {
      name: '',
      name_ar: '',
      price: 0,
      is_available: true
    }]);
  };

  const updateAddon = (index: number, field: keyof Addon, value: any) => {
    const updated = [...addons];
    updated[index] = { ...updated[index], [field]: value };
    setAddons(updated);
  };

  const removeAddon = (index: number) => {
    setAddons(addons.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: MenuItemFormData) => {
    setIsSaving(true);
    
    try {
      // Format the data
      const formattedData = {
        ...data,
        price: Number(data.price),
        special_price: data.special_price ? Number(data.special_price) : null,
        promo_price: data.promo_price ? Number(data.promo_price) : null,
        spice_level: Number(data.spice_level),
        preparation_time: Number(data.preparation_time),
        calories: data.calories ? Number(data.calories) : null,
        stock_count: data.stock_count ? Number(data.stock_count) : null,
        dietary_tags: data.dietary_tags || [],
        allergens: data.allergens || [],
        scheduled_publish_at: data.scheduled_publish_at || null,
      };

      let menuItemId = itemId;

      if (itemId) {
        // Update existing item
        const { error } = await supabase
          .from('menu_items')
          .update(formattedData)
          .eq('id', itemId);
        
        if (error) throw error;
      } else {
        // Create new item
        const { data: newItem, error } = await supabase
          .from('menu_items')
          .insert(formattedData)
          .select()
          .single();
        
        if (error) throw error;
        menuItemId = newItem.id;
      }

      // Handle addons
      if (menuItemId) {
        // Delete existing addons
        await supabase
          .from('menu_item_addons')
          .delete()
          .eq('menu_item_id', menuItemId);

        // Insert new addons
        if (addons.length > 0) {
          const addonsData = addons
            .filter(addon => addon.name.trim())
            .map((addon, index) => ({
              menu_item_id: menuItemId,
              name: addon.name,
              name_ar: addon.name_ar,
              price: Number(addon.price),
              is_available: addon.is_available,
              sort_order: index
            }));

          if (addonsData.length > 0) {
            const { error: addonsError } = await supabase
              .from('menu_item_addons')
              .insert(addonsData);
            
            if (addonsError) throw addonsError;
          }
        }
      }

      toast({
        title: "Success",
        description: `Menu item ${itemId ? 'updated' : 'created'} successfully!`,
      });

      onSave();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-center">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {itemId ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h1>
          {lastSaved && (
            <p className="text-sm text-muted-foreground">
              Last saved: {lastSaved.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={autoSaveEnabled}
              onCheckedChange={setAutoSaveEnabled}
            />
            <span className="text-sm">Auto-save</span>
          </div>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Item'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="addons" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add-ons
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Basic Information */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Item Name (English) *</Label>
                    <Input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Enter item name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="name_ar">Item Name (Arabic) *</Label>
                    <Input
                      {...register('name_ar', { required: 'Arabic name is required' })}
                      placeholder="أدخل اسم الطبق"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category_id">Category *</Label>
                  <Select onValueChange={(value) => setValue('category_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="short_description">Short Description</Label>
                  <Input
                    {...register('short_description')}
                    placeholder="Brief description for menu cards"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="description">Description (English)</Label>
                    <Textarea
                      {...register('description')}
                      placeholder="Detailed description"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description_ar">Description (Arabic)</Label>
                    <Textarea
                      {...register('description_ar')}
                      placeholder="وصف مفصل"
                      rows={4}
                      dir="rtl"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="full_description">Full Description</Label>
                  <Textarea
                    {...register('full_description')}
                    placeholder="Complete detailed description for item page"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Base Price (SAR) *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register('price', { required: 'Price is required' })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="special_price">Special Price (SAR)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register('special_price')}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="promo_price">Promo Price (SAR)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register('promo_price')}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch {...register('include_tax')} />
                    <Label>Include Tax</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch {...register('include_service_charge')} />
                    <Label>Include Service Charge</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media & Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="image_url">Main Image URL</Label>
                  <Input
                    {...register('image_url')}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="video_url">Video URL (Optional)</Label>
                  <Input
                    {...register('video_url')}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="spice_level">Spice Level (0-3)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="3"
                      {...register('spice_level')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="preparation_time">Prep Time (minutes)</Label>
                    <Input
                      type="number"
                      {...register('preparation_time')}
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="calories">Calories (Optional)</Label>
                    <Input
                      type="number"
                      {...register('calories')}
                      placeholder="250"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="stock_count">Stock Count (Leave empty for unlimited)</Label>
                  <Input
                    type="number"
                    {...register('stock_count')}
                    placeholder="Leave empty for unlimited stock"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Status Options</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch {...register('is_available')} />
                        <Label>Available</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch {...register('is_featured')} />
                        <Label>Featured Item</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch {...register('is_chefs_special')} />
                        <Label>Chef's Special</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch {...register('is_new_item')} />
                        <Label>New Item</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch {...register('is_out_of_stock')} />
                        <Label>Out of Stock</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add-ons */}
          <TabsContent value="addons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Add-ons & Extras
                  <Button type="button" onClick={addNewAddon} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Add-on
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {addons.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No add-ons configured. Click "Add Add-on" to get started.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {addons.map((addon, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-medium">Add-on #{index + 1}</h5>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAddon(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Name (English)</Label>
                            <Input
                              value={addon.name}
                              onChange={(e) => updateAddon(index, 'name', e.target.value)}
                              placeholder="Add-on name"
                            />
                          </div>
                          <div>
                            <Label>Name (Arabic)</Label>
                            <Input
                              value={addon.name_ar}
                              onChange={(e) => updateAddon(index, 'name_ar', e.target.value)}
                              placeholder="اسم الإضافة"
                              dir="rtl"
                            />
                          </div>
                          <div>
                            <Label>Price (SAR)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={addon.price}
                              onChange={(e) => updateAddon(index, 'price', Number(e.target.value))}
                              placeholder="0.00"
                            />
                          </div>
                          <div className="flex items-center space-x-2 pt-6">
                            <Switch
                              checked={addon.is_available}
                              onCheckedChange={(checked) => updateAddon(index, 'is_available', checked)}
                            />
                            <Label>Available</Label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    {...register('slug')}
                    placeholder="auto-generated-from-name"
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave empty to auto-generate from item name
                  </p>
                </div>
                <div>
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    {...register('meta_title')}
                    placeholder="SEO title for search engines"
                  />
                </div>
                <div>
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    {...register('meta_description')}
                    placeholder="SEO description for search engines"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="scheduled_publish_at">Scheduled Publishing</Label>
                  <Input
                    type="datetime-local"
                    {...register('scheduled_publish_at')}
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave empty to publish immediately
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
