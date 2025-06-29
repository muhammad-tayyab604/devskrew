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
import { portfolioService, Portfolio } from '@/lib/firestore';
import { toast } from 'sonner';

interface PortfolioFormProps {
  item?: Portfolio | null;
  onClose: () => void;
}

export default function PortfolioForm({ item, onClose }: PortfolioFormProps) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    slug: item?.slug || '',
    description: item?.description || '',
    longDescription: item?.longDescription || '',
    imageUrl: item?.imageUrl || '',
    featuredImage: item?.featuredImage || '',
    galleryUrls: item?.galleryUrls || [''],
    tags: item?.tags || [''],
    category: item?.category || '',
    client: item?.client || '',
    year: item?.year || '',
    duration: item?.duration || '',
    teamSize: item?.teamSize || '',
    liveUrl: item?.liveUrl || '',
    githubUrl: item?.githubUrl || '',
    challenge: item?.challenge || '',
    solution: item?.solution || '',
    features: item?.features || [''],
    technologies: item?.technologies || { frontend: [''], backend: [''], tools: [''] },
    results: item?.results || [{ metric: '', value: '', description: '' }],
    testimonial: item?.testimonial || { content: '', author: '', role: '', avatar: '' },
    gradient: item?.gradient || 'from-blue-500 to-cyan-500',
    featured: item?.featured || false,
    seoTitle: item?.seoTitle || '',
    seoDescription: item?.seoDescription || '',
    seoKeywords: item?.seoKeywords || [''],
    // OpenGraph fields
    ogTitle: item?.ogTitle || '',
    ogDescription: item?.ogDescription || '',
    ogImage: item?.ogImage || '',
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
        galleryUrls: formData.galleryUrls.filter(url => url.trim() !== ''),
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        features: formData.features.filter(feature => feature.trim() !== ''),
        technologies: {
          frontend: formData.technologies.frontend.filter(tech => tech.trim() !== ''),
          backend: formData.technologies.backend.filter(tech => tech.trim() !== ''),
          tools: formData.technologies.tools.filter(tech => tech.trim() !== ''),
        },
        results: formData.results.filter(result => result.metric.trim() !== ''),
        seoKeywords: formData.seoKeywords.filter(k => k.trim() !== ''),
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
  const handleArrayChange = (field: 'galleryUrls' | 'tags' | 'features' | 'seoKeywords', index: number, value: string) => {
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

  const addArrayItem = (field: 'galleryUrls' | 'tags' | 'features' | 'seoKeywords') => {
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

  const removeArrayItem = (field: 'galleryUrls' | 'tags' | 'features' | 'seoKeywords', index: number) => {
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
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
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
                  <Label htmlFor="longDescription">Long Description *</Label>
                  <Textarea
                    id="longDescription"
                    value={formData.longDescription}
                    onChange={(e) => handleChange('longDescription', e.target.value)}
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
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input
                      id="teamSize"
                      value={formData.teamSize}
                      onChange={(e) => handleChange('teamSize', e.target.value)}
                      placeholder="5 developers"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                      id="liveUrl"
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => handleChange('liveUrl', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => handleChange('githubUrl', e.target.value)}
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
                <div>
                  <Label htmlFor="imageUrl">Main Image URL *</Label>
                  <div className="space-y-4">
                    <Input
                      id="imageUrl"
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => handleChange('imageUrl', e.target.value)}
                      required
                      placeholder="https://example.com/main-image.jpg"
                    />
                    
                    {formData.imageUrl && (
                      <div className="relative">
                        <img
                          src={formData.imageUrl}
                          alt="Main image preview"
                          className="w-full h-48 object-cover rounded-lg border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => handleChange('imageUrl', '')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This is the primary image used in portfolio listings and case study headers.
                  </p>
                </div>

                <div>
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <div className="space-y-4">
                    <Input
                      id="featuredImage"
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => handleChange('featuredImage', e.target.value)}
                      placeholder="https://example.com/featured-image.jpg"
                    />
                    
                    {formData.featuredImage && (
                      <div className="relative">
                        <img
                          src={formData.featuredImage}
                          alt="Featured image preview"
                          className="w-full h-48 object-cover rounded-lg border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => handleChange('featuredImage', '')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {!formData.featuredImage && (
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                        <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Add a featured image URL above to see preview
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Optional: A different image for featured sections and special displays. If not provided, main image will be used.
                  </p>
                </div>

                <div>
                  <Label>Gallery URLs</Label>
                  {formData.galleryUrls.map((url, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        type="url"
                        value={url}
                        onChange={(e) => handleArrayChange('galleryUrls', index, e.target.value)}
                        placeholder="Enter image URL"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('galleryUrls', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('galleryUrls')}
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
                {loading ? 'Saving...' : item ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}