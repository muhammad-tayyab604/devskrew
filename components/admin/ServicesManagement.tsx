'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase, Service } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    long_description: '',
    features: [''],
    technologies: [''],
    starting_price: '',
    delivery_time: '',
    icon: 'Code',
    gradient: 'from-blue-500 to-cyan-500',
    bg_gradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50',
    seo_title: '',
    seo_description: '',
    seo_keywords: [''],
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const serviceData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        features: formData.features.filter(f => f.trim() !== ''),
        technologies: formData.technologies.filter(t => t.trim() !== ''),
        seo_keywords: formData.seo_keywords.filter(k => k.trim() !== ''),
        updated_at: new Date().toISOString(),
      };

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);

        if (error) throw error;
        toast.success('Service updated successfully');
      } else {
        const { error } = await supabase
          .from('services')
          .insert([{
            ...serviceData,
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
          }]);

        if (error) throw error;
        toast.success('Service added successfully');
      }

      setIsDialogOpen(false);
      setEditingService(null);
      resetForm();
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      long_description: service.long_description,
      features: service.features.length > 0 ? service.features : [''],
      technologies: service.technologies.length > 0 ? service.technologies : [''],
      starting_price: service.starting_price,
      delivery_time: service.delivery_time,
      icon: service.icon,
      gradient: service.gradient,
      bg_gradient: service.bg_gradient,
      seo_title: service.seo_title || '',
      seo_description: service.seo_description || '',
      seo_keywords: service.seo_keywords?.length > 0 ? service.seo_keywords : [''],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      long_description: '',
      features: [''],
      technologies: [''],
      starting_price: '',
      delivery_time: '',
      icon: 'Code',
      gradient: 'from-blue-500 to-cyan-500',
      bg_gradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50',
      seo_title: '',
      seo_description: '',
      seo_keywords: [''],
    });
  };

  const openAddDialog = () => {
    setEditingService(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const addArrayField = (field: 'features' | 'technologies' | 'seo_keywords') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayField = (field: 'features' | 'technologies' | 'seo_keywords', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray.length > 0 ? newArray : ['']
    });
  };

  const updateArrayField = (field: 'features' | 'technologies' | 'seo_keywords', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services Management</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage your services and their details</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
              <DialogDescription>
                {editingService ? 'Update service information' : 'Add a new service to your website'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="basic" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setFormData({ 
                            ...formData, 
                            title,
                            slug: generateSlug(title)
                          });
                        }}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">Slug *</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="long_description">Long Description *</Label>
                    <Textarea
                      id="long_description"
                      value={formData.long_description}
                      onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="starting_price">Starting Price *</Label>
                      <Input
                        id="starting_price"
                        value={formData.starting_price}
                        onChange={(e) => setFormData({ ...formData, starting_price: e.target.value })}
                        placeholder="$2,500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="delivery_time">Delivery Time *</Label>
                      <Input
                        id="delivery_time"
                        value={formData.delivery_time}
                        onChange={(e) => setFormData({ ...formData, delivery_time: e.target.value })}
                        placeholder="4-12 weeks"
                        required
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <Label>Features</Label>
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateArrayField('features', index, e.target.value)}
                          placeholder="Enter feature"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('features', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField('features')}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>

                  <div>
                    <Label>Technologies</Label>
                    {formData.technologies.map((tech, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={tech}
                          onChange={(e) => updateArrayField('technologies', index, e.target.value)}
                          placeholder="Enter technology"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('technologies', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField('technologies')}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Technology
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gradient">Gradient Classes</Label>
                      <Input
                        id="gradient"
                        value={formData.gradient}
                        onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                        placeholder="from-blue-500 to-cyan-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="icon">Icon Name</Label>
                      <Input
                        id="icon"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        placeholder="Code"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div>
                    <Label htmlFor="seo_title">SEO Title</Label>
                    <Input
                      id="seo_title"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      placeholder="Custom SEO title (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="seo_description">SEO Description</Label>
                    <Textarea
                      id="seo_description"
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      rows={3}
                      placeholder="Custom SEO description (optional)"
                    />
                  </div>
                  <div>
                    <Label>SEO Keywords</Label>
                    {formData.seo_keywords.map((keyword, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={keyword}
                          onChange={(e) => updateArrayField('seo_keywords', index, e.target.value)}
                          placeholder="Enter keyword"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('seo_keywords', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField('seo_keywords')}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Keyword
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>
            {services.length} service{services.length !== 1 ? 's' : ''} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No services found. Add your first service to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{service.slug}</Badge>
                      </TableCell>
                      <TableCell>{service.starting_price}</TableCell>
                      <TableCell>{service.delivery_time}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {service.features.length} features
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(service)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(service.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}