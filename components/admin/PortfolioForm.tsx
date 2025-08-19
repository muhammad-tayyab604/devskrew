'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { X, Plus, Trash2, Image } from 'lucide-react';
import { portfolioService, Portfolio } from '@/lib/database';
import { toast } from 'sonner';
import ImageUpload from '@/components/ui/image-upload';

interface PortfolioFormProps {
  item?: Portfolio | null;
  onClose: () => void;
}

export default function PortfolioForm({ item, onClose }: PortfolioFormProps) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    slug: item?.slug || '',
    description: item?.description || '',
    long_description: item?.long_description || '',
    image_url: item?.image_url || '',
    featured_image: item?.featured_image || '',
    gallery_urls: item?.gallery_urls || [''],
    tags: item?.tags || [''],
    category: item?.category || '',
    client: item?.client || '',
    year: item?.year || '',
    duration: item?.duration || '',
    team_size: item?.team_size || '',
    live_url: item?.live_url || '',
    github_url: item?.github_url || '',
    challenge: item?.challenge || '',
    solution: item?.solution || '',
    features: item?.features || [''],
    technologies: item?.technologies || { frontend: [''], backend: [''], tools: [''] },
    results: item?.results || [{ metric: '', value: '', description: '' }],
    testimonial: item?.testimonial || { content: '', author: '', role: '', avatar: '' },
    gradient: item?.gradient || 'from-blue-500 to-cyan-500',
    featured: item?.featured || false,
    seo_title: item?.seo_title || '',
    seo_description: item?.seo_description || '',
    seo_keywords: item?.seo_keywords || [''],
    // OpenGraph fields
    og_title: item?.og_title || '',
    og_description: item?.og_description || '',
    og_image: item?.og_image || '',
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
        gallery_urls: formData.gallery_urls.filter(url => url.trim() !== ''),
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        features: formData.features.filter(feature => feature.trim() !== ''),
        technologies: {
          frontend: formData.technologies.frontend.filter(tech => tech.trim() !== ''),
          backend: formData.technologies.backend.filter(tech => tech.trim() !== ''),
          tools: formData.technologies.tools.filter(tech => tech.trim() !== ''),
        },
        results: formData.results.filter(result => result.metric.trim() !== ''),
        seo_keywords: formData.seo_keywords.filter(k => k.trim() !== ''),
      };

      if (item?.id) {
        await portfolioService.update(item.id, cleanedData);
        toast.success('Portfolio item updated successfully');
      } else {
        await portfolioService.create(cleanedData);
        toast.success('Portfolio item created successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save portfolio item');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && !item) {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
  };

  // Fixed array change handlers with proper typing
  const handleArrayChange = (field: 'gallery_urls' | 'tags' | 'features' | 'seo_keywords', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleTechChange = (category: 'frontend' | 'backend' | 'tools', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: {
        ...prev.technologies,
        [category]: prev.technologies[category].map((tech, i) => i === index ? value : tech)
      }
    }));
  };

  const handleResultChange = (index: number, field: 'metric' | 'value' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.map((result, i) => 
        i === index ? { ...result, [field]: value } : result
      )
    }));
  };

  const handleTestimonialChange = (field: 'content' | 'author' | 'role' | 'avatar', value: string) => {
    setFormData(prev => ({
      ...prev,
      testimonial: { ...prev.testimonial, [field]: value }
    }));
  };

  const addArrayItem = (field: 'gallery_urls' | 'tags' | 'features' | 'seo_keywords') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const addTechItem = (category: 'frontend' | 'backend' | 'tools') => {
    setFormData(prev => ({
      ...prev,
      technologies: {
        ...prev.technologies,
        [category]: [...prev.technologies[category], '']
      }
    }));
  };

  const addResultItem = () => {
    setFormData(prev => ({
      ...prev,
      results: [...prev.results, { metric: '', value: '', description: '' }]
    }));
  };

  const removeArrayItem = (field: 'gallery_urls' | 'tags' | 'features' | 'seo_keywords', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const removeTechItem = (category: 'frontend' | 'backend' | 'tools', index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: {
        ...prev.technologies,
        [category]: prev.technologies[category].filter((_, i) => i !== index)
      }
    }));
  };

  const removeResultItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-[100vw] max-h-[100vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {item ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
              </CardTitle>
              <CardDescription>
                {item ? 'Update portfolio item information' : 'Create a new portfolio item'}
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
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="tech">Tech</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
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
                  <Label htmlFor="description">Short Description *</Label>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="client">Client *</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => handleChange('client', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => handleChange('year', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => handleChange('duration', e.target.value)}
                      placeholder="3 months"
                    />
                  </div>
                  <div>
                    <Label htmlFor="team_size">Team Size</Label>
                    <Input
                      id="team_size"
                      value={formData.team_size}
                      onChange={(e) => handleChange('team_size', e.target.value)}
                      placeholder="5 developers"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="live_url">Live URL</Label>
                    <Input
                      id="live_url"
                      type="url"
                      value={formData.live_url}
                      onChange={(e) => handleChange('live_url', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="github_url">GitHub URL</Label>
                    <Input
                      id="github_url"
                      type="url"
                      value={formData.github_url}
                      onChange={(e) => handleChange('github_url', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleChange('featured', checked)}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => handleChange('image_url', url)}
                  bucket="images"
                  folder="main-images"
                  label="Main Image"
                  required
                />

                <ImageUpload
                  value={formData.featured_image}
                  onChange={(url) => handleChange('featured_image', url)}
                  bucket="images"
                  folder="featured-images"
                  label="Featured Image (Optional)"
                />

                <div>
                  <Label>Gallery URLs</Label>
                  {formData.gallery_urls.map((url, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <div className="flex-1">
                        <ImageUpload
                          value={url}
                          onChange={(newUrl) => handleArrayChange('gallery_urls', index, newUrl)}
                          bucket="images"
                          folder="gallery"
                          label={`Gallery Image ${index + 1}`}
                          className="mb-0"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('gallery_urls', index)}
                        className="mt-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('gallery_urls')}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Gallery Image
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <div>
                  <Label>Tags</Label>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={tag}
                        onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                        placeholder="Enter tag"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('tags', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('tags')}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>

                <div>
                  <Label htmlFor="challenge">Challenge *</Label>
                  <Textarea
                    id="challenge"
                    value={formData.challenge}
                    onChange={(e) => handleChange('challenge', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="solution">Solution *</Label>
                  <Textarea
                    id="solution"
                    value={formData.solution}
                    onChange={(e) => handleChange('solution', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

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
              </TabsContent>

              <TabsContent value="tech" className="space-y-6">
                {Object.entries(formData.technologies).map(([category, techs]) => (
                  <div key={category}>
                    <Label className="capitalize">{category} Technologies</Label>
                    {techs.map((tech, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={tech}
                          onChange={(e) => handleTechChange(category as 'frontend' | 'backend' | 'tools', index, e.target.value)}
                          placeholder={`Enter ${category} technology`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTechItem(category as 'frontend' | 'backend' | 'tools', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTechItem(category as 'frontend' | 'backend' | 'tools')}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add {category} Technology
                    </Button>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                <div>
                  <Label>Results</Label>
                  {formData.results.map((result, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 p-4 border rounded">
                      <Input
                        value={result.metric}
                        onChange={(e) => handleResultChange(index, 'metric', e.target.value)}
                        placeholder="Metric name"
                      />
                      <Input
                        value={result.value}
                        onChange={(e) => handleResultChange(index, 'value', e.target.value)}
                        placeholder="Value (e.g., 300%)"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={result.description}
                          onChange={(e) => handleResultChange(index, 'description', e.target.value)}
                          placeholder="Description"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeResultItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addResultItem}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Result
                  </Button>
                </div>

                <div className="space-y-4">
                  <Label>Testimonial</Label>
                  <Textarea
                    value={formData.testimonial.content}
                    onChange={(e) => handleTestimonialChange('content', e.target.value)}
                    placeholder="Testimonial content"
                    rows={3}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      value={formData.testimonial.author}
                      onChange={(e) => handleTestimonialChange('author', e.target.value)}
                      placeholder="Author name"
                    />
                    <Input
                      value={formData.testimonial.role}
                      onChange={(e) => handleTestimonialChange('role', e.target.value)}
                      placeholder="Author role"
                    />
                    <Input
                      type="url"
                      value={formData.testimonial.avatar}
                      onChange={(e) => handleTestimonialChange('avatar', e.target.value)}
                      placeholder="Avatar URL"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="gradient">Gradient</Label>
                  <Input
                    id="gradient"
                    value={formData.gradient}
                    onChange={(e) => handleChange('gradient', e.target.value)}
                    placeholder="from-blue-500 to-cyan-500"
                  />
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
                {loading ? 'Saving...' : item ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}