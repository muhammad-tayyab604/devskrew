'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { X, Plus, Trash2 } from 'lucide-react';
import { blogService, BlogPost } from '@/lib/database';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import ImageUpload from '@/components/ui/image-upload';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogFormProps {
  post?: BlogPost | null;
  onClose: () => void;
}

export default function BlogForm({ post, onClose }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image_url: post?.image_url || '',
    author: post?.author || '',
    category: post?.category || '',
    read_time: post?.read_time || '',
    gradient: post?.gradient || 'from-blue-500 to-cyan-500',
    published: post?.published || false,
    seo_title: post?.seo_title || '',
    seo_description: post?.seo_description || '',
    seo_keywords: post?.seo_keywords || [''],
    // OpenGraph fields
    og_title: post?.og_title || '',
    og_description: post?.og_description || '',
    og_image: post?.og_image || '',
  });
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        seo_keywords: formData.seo_keywords.filter(k => k.trim() !== ''),
      };

      if (post?.id) {
        await blogService.update(post.id, cleanedData);
        toast.success('Blog post updated successfully');
      } else {
        await blogService.create(cleanedData);
        toast.success('Blog post created successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && !post) {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
  };

  const handleArrayChange = (field: 'seo_keywords', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'seo_keywords') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'seo_keywords', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Quill editor configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'link', 'image', 'video',
    'align', 'blockquote', 'code-block', 'color', 'background'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {post ? 'Edit Blog Post' : 'Add Blog Post'}
              </CardTitle>
              <CardDescription>
                {post ? 'Update blog post information' : 'Create a new blog post'}
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
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
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleChange('excerpt', e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => handleChange('image_url', url)}
                  bucket="images"
                  folder="featured-images"
                  label="Featured Image"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleChange('author', e.target.value)}
                      required
                    />
                  </div>
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
                    <Label htmlFor="read_time">Read Time *</Label>
                    <Input
                      id="read_time"
                      value={formData.read_time}
                      onChange={(e) => handleChange('read_time', e.target.value)}
                      placeholder="5 min read"
                      required
                    />
                  </div>
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
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => handleChange('published', checked)}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <div>
                  <Label htmlFor="content">Content *</Label>
                  <div className="mt-2">
                    {mounted && (
                      <ReactQuill
                        theme="snow"
                        value={formData.content}
                        onChange={(content) => handleChange('content', content)}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Write your blog content here..."
                        style={{ height: '400px', marginBottom: '50px' }}
                      />
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-16 space-y-1">
                    <p><strong>Rich Text Editor:</strong> Use the toolbar above to format your content.</p>
                    <p><strong>Features:</strong> Headers, Bold, Italic, Lists, Links, Images, Code blocks, and more.</p>
                    <p><strong>Media:</strong> You can insert images and videos directly into your content.</p>
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
                    <ImageUpload
                      value={formData.og_image}
                      onChange={(url) => handleChange('og_image', url)}
                      bucket="blog"
                      folder="og-images"
                      label="OpenGraph Image"
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
                {loading ? 'Saving...' : post ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}