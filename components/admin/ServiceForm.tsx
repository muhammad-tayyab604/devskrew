'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Plus, Trash2, Upload, Image } from 'lucide-react';
import { servicesService, Service } from '@/lib/firestore';
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
    longDescription: service?.longDescription || '',
    features: service?.features || [''],
    technologies: service?.technologies || [''],
    startingPrice: service?.startingPrice || '',
    deliveryTime: service?.deliveryTime || '',
    icon: service?.icon || 'Code',
    featuredImage: service?.featuredImage || '',
    gradient: service?.gradient || 'from-blue-500 to-cyan-500',
    bgGradient: service?.bgGradient || 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50',
    seoTitle: service?.seoTitle || '',
    seoDescription: service?.seoDescription || '',
    seoKeywords: service?.seoKeywords || [''],
    // OpenGraph fields
    ogTitle: service?.ogTitle || '',
    ogDescription: service?.ogDescription || '',
    ogImage: service?.ogImage || '',
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
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        technologies: formData.technologies.filter(t => t.trim() !== ''),
        seoKeywords: formData.seoKeywords.filter(k => k.trim() !== ''),
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

  const handleArrayChange = (field: 'features' | 'technologies' | 'seoKeywords', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'features' | 'technologies' | 'seoKeywords') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'features' | 'technologies' | 'seoKeywords', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
                  <Label htmlFor="longDescription">Long Description *</Label>
                  <Textarea
                    id="longDescription"
                    value={formData.longDescription}
                    onChange={(e) => handleChange('longDescription', e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startingPrice">Starting Price *</Label>
                    <Input
                      id="startingPrice"
                      value={formData.startingPrice}
                      onChange={(e) => handleChange('startingPrice', e.target.value)}
                      placeholder="$2,500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryTime">Delivery Time *</Label>
                    <Input
                      id="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={(e) => handleChange('deliveryTime', e.target.value)}
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
                  value={formData.featuredImage}
                  onChange={(url) => handleChange('featuredImage', url)}
                  bucket="services"
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
                    <Label htmlFor="bgGradient">Background Gradient</Label>
                    <Input
                      id="bgGradient"
                      value={formData.bgGradient}
                      onChange={(e) => handleChange('bgGradient', e.target.value)}
                      placeholder="from-blue-50 to-cyan-50"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Basic SEO</h3>
                  
                  <div>
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input
                      id="seoTitle"
                      value={formData.seoTitle}
                      onChange={(e) => handleChange('seoTitle', e.target.value)}
                      placeholder="Custom SEO title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="seoDescription">SEO Description</Label>
                    <Textarea
                      id="seoDescription"
                      value={formData.seoDescription}
                      onChange={(e) => handleChange('seoDescription', e.target.value)}
                      rows={3}
                      placeholder="Custom SEO description"
                    />
                  </div>

                  <div>
                    <Label>SEO Keywords</Label>
                    {formData.seoKeywords.map((keyword, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={keyword}
                          onChange={(e) => handleArrayChange('seoKeywords', index, e.target.value)}
                          placeholder="Enter keyword"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('seoKeywords', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('seoKeywords')}
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
                    <Label htmlFor="ogTitle">OG Title</Label>
                    <Input
                      id="ogTitle"
                      value={formData.ogTitle}
                      onChange={(e) => handleChange('ogTitle', e.target.value)}
                      placeholder="Title for social media sharing"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ogDescription">OG Description</Label>
                    <Textarea
                      id="ogDescription"
                      value={formData.ogDescription}
                      onChange={(e) => handleChange('ogDescription', e.target.value)}
                      rows={3}
                      placeholder="Description for social media sharing"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ogImage">OG Image URL</Label>
                    <Input
                      id="ogImage"
                      type="url"
                      value={formData.ogImage}
                      onChange={(e) => handleChange('ogImage', e.target.value)}
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