'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Plus, Trash2, Upload, Image } from 'lucide-react';
import { servicesService, Service } from '@/lib/database';
import { toast } from 'sonner';
import ImageUpload from '@/components/ui/image-upload';

interface ServiceFormProps {
  service?: Service | null;
  onClose: () => void;
}

export default function ServiceForm({ service, onClose }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    slug: service?.slug || '',
    description: service?.description || '',
    long_description: service?.long_description || '',
    features: service?.features || [''],
    technologies: service?.technologies || [''],
    starting_price: service?.starting_price || '',
    delivery_time: service?.delivery_time || '',
    icon: service?.icon || 'Code',
    featured_image: service?.featured_image || '',
    gradient: service?.gradient || 'from-blue-500 to-cyan-500',
    bg_gradient: service?.bg_gradient || 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50',
    seo_title: service?.seo_title || '',
    seo_description: service?.seo_description || '',
    seo_keywords: service?.seo_keywords || [''],
    // OpenGraph fields
    og_title: service?.og_title || '',
    og_description: service?.og_description || '',
    og_image: service?.og_image || '',
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const cleanedData: Omit<Service, 'id' | 'created_at' | 'updated_at'> = {
  title:            formData.title,
  slug:             formData.slug,
  description:      formData.description,
  long_description: formData.long_description,
  features:         formData.features.filter(f => f.trim() !== ''),
  technologies:     formData.technologies.filter(t => t.trim() !== ''),
  starting_price:   formData.starting_price,
  delivery_time:    formData.delivery_time,
  icon:             formData.icon,
  featured_image:   formData.featured_image,
  gradient:         formData.gradient,
  bg_gradient:      formData.bg_gradient,
  seo_title:        formData.seo_title,
  seo_description:  formData.seo_description,
  seo_keywords:     formData.seo_keywords.filter(k => k.trim() !== ''),
  og_title:         formData.og_title,
  og_description:   formData.og_description,
  og_image:         formData.og_image,
};


      if (service?.id) {
        await servicesService.update(service.id, cleanedData);
        toast.success('Service updated successfully');
      } else {
        await servicesService.create(cleanedData);
        toast.success('Service created successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && !service) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleArrayChange = (field: 'features' | 'technologies' | 'seo_keywords', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item: any, i: number) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'features' | 'technologies' | 'seo_keywords') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'features' | 'technologies' | 'seo_keywords', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-[100vw] max-h-[100vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {service ? 'Edit Service' : 'Add Service'}
              </CardTitle>
              <CardDescription>
                {service ? 'Update service information' : 'Add a new service to your offerings'}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleChange('slug', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="long_description">Long Description *</Label>
                  <Textarea
                    id="long_description"
                    value={formData.long_description}
                    onChange={(e) => handleChange('long_description', e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="starting_price">Starting Price *</Label>
                    <Input
                      id="starting_price"
                      value={formData.starting_price}
                      onChange={(e) => handleChange('starting_price', e.target.value)}
                      placeholder="$2,500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="delivery_time">Delivery Time *</Label>
                    <Input
                      id="delivery_time"
                      value={formData.delivery_time}
                      onChange={(e) => handleChange('delivery_time', e.target.value)}
                      placeholder="4-12 weeks"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon">Icon</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => handleChange('icon', e.target.value)}
                      placeholder="Code"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <ImageUpload
                  value={formData.featured_image}
                  onChange={(url) => handleChange('featured_image', url)}
                  bucket="images"
                  folder="featured-images"
                  label="Featured Image"
                />
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <div>
                  <Label>Features</Label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleArrayChange('features', index, e.target.value)}
                        placeholder="Enter feature"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('features', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('features')}
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
                        onChange={(e) => handleArrayChange('technologies', index, e.target.value)}
                        placeholder="Enter technology"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('technologies', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('technologies')}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Technology
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gradient">Gradient</Label>
                    <Input
                      id="gradient"
                      value={formData.gradient}
                      onChange={(e) => handleChange('gradient', e.target.value)}
                      placeholder="from-blue-500 to-cyan-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bg_gradient">Background Gradient</Label>
                    <Input
                      id="bg_gradient"
                      value={formData.bg_gradient}
                      onChange={(e) => handleChange('bg_gradient', e.target.value)}
                      placeholder="from-blue-50 to-cyan-50"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Basic SEO</h3>
                  
                  <div>
                    <Label htmlFor="seo_title">SEO Title</Label>
                    <Input
                      id="seo_title"
                      value={formData.seo_title}
                      onChange={(e) => handleChange('seo_title', e.target.value)}
                      placeholder="Custom SEO title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="seo_description">SEO Description</Label>
                    <Textarea
                      id="seo_description"
                      value={formData.seo_description}
                      onChange={(e) => handleChange('seo_description', e.target.value)}
                      rows={3}
                      placeholder="Custom SEO description"
                    />
                  </div>

                  <div>
                    <Label>SEO Keywords</Label>
                    {formData.seo_keywords.map((keyword, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={keyword}
                          onChange={(e) => handleArrayChange('seo_keywords', index, e.target.value)}
                          placeholder="Enter keyword"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('seo_keywords', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('seo_keywords')}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Keyword
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-6">
                  <h3 className="text-lg font-semibold">OpenGraph (Social Media)</h3>
                  
                  <div>
                    <Label htmlFor="og_title">OG Title</Label>
                    <Input
                      id="og_title"
                      value={formData.og_title}
                      onChange={(e) => handleChange('og_title', e.target.value)}
                      placeholder="Title for social media sharing"
                    />
                  </div>

                  <div>
                    <Label htmlFor="og_description">OG Description</Label>
                    <Textarea
                      id="og_description"
                      value={formData.og_description}
                      onChange={(e) => handleChange('og_description', e.target.value)}
                      rows={3}
                      placeholder="Description for social media sharing"
                    />
                  </div>

                  <div>
                    <Label htmlFor="og_image">OG Image URL</Label>
                    <Input
                      id="og_image"
                      type="url"
                      value={formData.og_image}
                      onChange={(e) => handleChange('og_image', e.target.value)}
                      placeholder="https://example.com/og-image.jpg"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Recommended size: 1200x630px for optimal social media display
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4 mt-8">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : service ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}