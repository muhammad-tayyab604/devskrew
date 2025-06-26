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
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import { supabase, Portfolio } from '@/lib/supabase';
import { toast } from 'sonner';

export default function PortfolioManagement() {
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    long_description: '',
    image_url: '',
    gallery_urls: [''],
    tags: [''],
    category: '',
    client: '',
    year: new Date().getFullYear().toString(),
    duration: '',
    team_size: '',
    live_url: '',
    github_url: '',
    challenge: '',
    solution: '',
    features: [''],
    technologies: {
      frontend: [''],
      backend: [''],
      deployment: [''],
      tools: [''],
    },
    results: [{ metric: '', value: '', description: '' }],
    testimonial: {
      content: '',
      author: '',
      role: '',
      avatar: '',
    },
    gradient: 'from-blue-500 to-cyan-500',
    featured: false,
    seo_title: '',
    seo_description: '',
    seo_keywords: [''],
  });

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast.error('Failed to fetch portfolio items');
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
      const portfolioData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        gallery_urls: formData.gallery_urls.filter(url => url.trim() !== ''),
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        features: formData.features.filter(f => f.trim() !== ''),
        technologies: {
          frontend: formData.technologies.frontend.filter(t => t.trim() !== ''),
          backend: formData.technologies.backend.filter(t => t.trim() !== ''),
          deployment: formData.technologies.deployment.filter(t => t.trim() !== ''),
          tools: formData.technologies.tools.filter(t => t.trim() !== ''),
        },
        results: formData.results.filter(r => r.metric.trim() !== '' && r.value.trim() !== ''),
        seo_keywords: formData.seo_keywords.filter(k => k.trim() !== ''),
        updated_at: new Date().toISOString(),
      };

      if (editingItem) {
        const { error } = await supabase
          .from('portfolio')
          .update(portfolioData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Portfolio item updated successfully');
      } else {
        const { error } = await supabase
          .from('portfolio')
          .insert([{
            ...portfolioData,
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
          }]);

        if (error) throw error;
        toast.success('Portfolio item added successfully');
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      resetForm();
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error saving portfolio item:', error);
      toast.error('Failed to save portfolio item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: Portfolio) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      description: item.description,
      long_description: item.long_description,
      image_url: item.image_url,
      gallery_urls: item.gallery_urls.length > 0 ? item.gallery_urls : [''],
      tags: item.tags.length > 0 ? item.tags : [''],
      category: item.category,
      client: item.client,
      year: item.year,
      duration: item.duration,
      team_size: item.team_size,
      live_url: item.live_url || '',
      github_url: item.github_url || '',
      challenge: item.challenge,
      solution: item.solution,
      features: item.features.length > 0 ? item.features : [''],
      technologies: {
        frontend: item.technologies.frontend?.length > 0 ? item.technologies.frontend : [''],
        backend: item.technologies.backend?.length > 0 ? item.technologies.backend : [''],
        deployment: item.technologies.deployment?.length > 0 ? item.technologies.deployment : [''],
        tools: item.technologies.tools?.length > 0 ? item.technologies.tools : [''],
      },
      results: item.results.length > 0 ? item.results : [{ metric: '', value: '', description: '' }],
      testimonial: item.testimonial,
      gradient: item.gradient,
      featured: item.featured,
      seo_title: item.seo_title || '',
      seo_description: item.seo_description || '',
      seo_keywords: item.seo_keywords?.length > 0 ? item.seo_keywords : [''],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Portfolio item deleted successfully');
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast.error('Failed to delete portfolio item');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      long_description: '',
      image_url: '',
      gallery_urls: [''],
      tags: [''],
      category: '',
      client: '',
      year: new Date().getFullYear().toString(),
      duration: '',
      team_size: '',
      live_url: '',
      github_url: '',
      challenge: '',
      solution: '',
      features: [''],
      technologies: {
        frontend: [''],
        backend: [''],
        deployment: [''],
        tools: [''],
      },
      results: [{ metric: '', value: '', description: '' }],
      testimonial: {
        content: '',
        author: '',
        role: '',
        avatar: '',
      },
      gradient: 'from-blue-500 to-cyan-500',
      featured: false,
      seo_title: '',
      seo_description: '',
      seo_keywords: [''],
    });
  };

  const openAddDialog = () => {
    setEditingItem(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const addArrayField = (field: string, subField?: string) => {
    if (subField) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field as keyof typeof formData],
          [subField]: [...(formData[field as keyof typeof formData] as any)[subField], '']
        }
      });
    } else if (field === 'results') {
      setFormData({
        ...formData,
        results: [...formData.results, { metric: '', value: '', description: '' }]
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...(formData[field as keyof typeof formData] as string[]), '']
      });
    }
  };

  const removeArrayField = (field: string, index: number, subField?: string) => {
    if (subField) {
      const newArray = (formData[field as keyof typeof formData] as any)[subField].filter((_: any, i: number) => i !== index);
      setFormData({
        ...formData,
        [field]: {
          ...formData[field as keyof typeof formData],
          [subField]: newArray.length > 0 ? newArray : ['']
        }
      });
    } else if (field === 'results') {
      const newArray = formData.results.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        results: newArray.length > 0 ? newArray : [{ metric: '', value: '', description: '' }]
      });
    } else {
      const newArray = (formData[field as keyof typeof formData] as string[]).filter((_, i) => i !== index);
      setFormData({
        ...formData,
        [field]: newArray.length > 0 ? newArray : ['']
      });
    }
  };

  const updateArrayField = (field: string, index: number, value: string | object, subField?: string, resultField?: string) => {
    if (subField) {
      const newArray = [...(formData[field as keyof typeof formData] as any)[subField]];
      newArray[index] = value;
      setFormData({
        ...formData,
        [field]: {
          ...formData[field as keyof typeof formData],
          [subField]: newArray
        }
      });
    } else if (field === 'results' && resultField) {
      const newArray = [...formData.results];
      newArray[index] = { ...newArray[index], [resultField]: value };
      setFormData({
        ...formData,
        results: newArray
      });
    } else {
      const newArray = [...(formData[field as keyof typeof formData] as string[])];
      newArray[index] = value as string;
      setFormData({
        ...formData,
        [field]: newArray
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Management</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage your portfolio projects and case studies</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Portfolio Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? 'Update portfolio item information' : 'Add a new portfolio item to showcase your work'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="basic" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="tech">Tech</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="Web Development"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client">Client *</Label>
                      <Input
                        id="client"
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        placeholder="Company Name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year *</Label>
                      <Input
                        id="year"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="4 months"
                      />
                    </div>
                    <div>
                      <Label htmlFor="team_size">Team Size</Label>
                      <Input
                        id="team_size"
                        value={formData.team_size}
                        onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github_url">GitHub URL</Label>
                      <Input
                        id="github_url"
                        type="url"
                        value={formData.github_url}
                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                        placeholder="https://github.com/user/repo"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured">Featured Project</Label>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
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

                  <div>
                    <Label htmlFor="image_url">Main Image URL *</Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div>
                    <Label>Gallery URLs</Label>
                    {formData.gallery_urls.map((url, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          type="url"
                          value={url}
                          onChange={(e) => updateArrayField('gallery_urls', index, e.target.value)}
                          placeholder="https://example.com/image.jpg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('gallery_urls', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField('gallery_urls')}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Gallery Image
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor="challenge">Challenge *</Label>
                    <Textarea
                      id="challenge"
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="solution">Solution *</Label>
                    <Textarea
                      id="solution"
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="tech" className="space-y-4">
                  <div>
                    <Label>Tags</Label>
                    {formData.tags.map((tag, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={tag}
                          onChange={(e) => updateArrayField('tags', index, e.target.value)}
                          placeholder="React"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('tags', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField('tags')}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tag
                    </Button>
                  </div>

                  <div>
                    <Label>Features</Label>
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateArrayField('features', index, e.target.value)}
                          placeholder="Advanced inventory management"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(formData.technologies).map(([category, techs]) => (
                      <div key={category}>
                        <Label className="capitalize">{category} Technologies</Label>
                        {techs.map((tech, index) => (
                          <div key={index} className="flex gap-2 mt-2">
                            <Input
                              value={tech}
                              onChange={(e) => updateArrayField('technologies', index, e.target.value, category)}
                              placeholder="React"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeArrayField('technologies', index, category)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayField('technologies', category)}
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add {category}
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="results" className="space-y-4">
                  <div>
                    <Label>Results</Label>
                    {formData.results.map((result, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 p-4 border rounded-lg">
                        <div>
                          <Label>Metric</Label>
                          <Input
                            value={result.metric}
                            onChange={(e) => updateArrayField('results', index, e.target.value, undefined, 'metric')}
                            placeholder="Sales Increase"
                          />
                        </div>
                        <div>
                          <Label>Value</Label>
                          <Input
                            value={result.value}
                            onChange={(e) => updateArrayField('results', index, e.target.value, undefined, 'value')}
                            placeholder="300%"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Input
                            value={result.description}
                            onChange={(e) => updateArrayField('results', index, e.target.value, undefined, 'description')}
                            placeholder="Increase in online sales"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('results', index)}
                          className="mt-2"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField('results')}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Result
                    </Button>
                  </div>

                  <div className="space-y-4 p-4 border rounded-lg">
                    <Label>Testimonial</Label>
                    <div>
                      <Label htmlFor="testimonial_content">Content</Label>
                      <Textarea
                        id="testimonial_content"
                        value={formData.testimonial.content}
                        onChange={(e) => setFormData({
                          ...formData,
                          testimonial: { ...formData.testimonial, content: e.target.value }
                        })}
                        rows={3}
                        placeholder="The platform exceeded our expectations..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="testimonial_author">Author</Label>
                        <Input
                          id="testimonial_author"
                          value={formData.testimonial.author}
                          onChange={(e) => setFormData({
                            ...formData,
                            testimonial: { ...formData.testimonial, author: e.target.value }
                          })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="testimonial_role">Role</Label>
                        <Input
                          id="testimonial_role"
                          value={formData.testimonial.role}
                          onChange={(e) => setFormData({
                            ...formData,
                            testimonial: { ...formData.testimonial, role: e.target.value }
                          })}
                          placeholder="CEO, Company Name"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="testimonial_avatar">Avatar URL</Label>
                      <Input
                        id="testimonial_avatar"
                        type="url"
                        value={formData.testimonial.avatar}
                        onChange={(e) => setFormData({
                          ...formData,
                          testimonial: { ...formData.testimonial, avatar: e.target.value }
                        })}
                        placeholder="https://example.com/avatar.jpg"
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
          <CardTitle>Portfolio Items</CardTitle>
          <CardDescription>
            {portfolioItems.length} portfolio item{portfolioItems.length !== 1 ? 's' : ''} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : portfolioItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No portfolio items found. Add your first project to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-12 h-8 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.client}</TableCell>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>
                        {item.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(item.id)}
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