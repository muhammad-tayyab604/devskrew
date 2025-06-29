'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { X, Plus, Trash2, Bold, Italic, Underline, List, Link2, Image, Code } from 'lucide-react';
import { blogService, BlogPost } from '@/lib/firestore';
import { toast } from 'sonner';

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
    imageUrl: post?.imageUrl || '',
    author: post?.author || '',
    category: post?.category || '',
    readTime: post?.readTime || '',
    gradient: post?.gradient || 'from-blue-500 to-cyan-500',
    published: post?.published || false,
    seoTitle: post?.seoTitle || '',
    seoDescription: post?.seoDescription || '',
    seoKeywords: post?.seoKeywords || [''],
    // OpenGraph fields
    ogTitle: post?.ogTitle || '',
    ogDescription: post?.ogDescription || '',
    ogImage: post?.ogImage || '',
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
        seoKeywords: formData.seoKeywords.filter(k => k.trim() !== ''),
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

  const handleArrayChange = (field: 'seoKeywords', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'seoKeywords') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'seoKeywords', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Rich text editor functions
  const insertFormatting = (tag: string, placeholder: string = '') => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const textToInsert = selectedText || placeholder;

    let formattedText = '';
    switch (tag) {
      case 'bold':
        formattedText = `<strong>${textToInsert}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${textToInsert}</em>`;
        break;
      case 'underline':
        formattedText = `<u>${textToInsert}</u>`;
        break;
      case 'h2':
        formattedText = `<h2>${textToInsert || 'Heading 2'}</h2>`;
        break;
      case 'h3':
        formattedText = `<h3>${textToInsert || 'Heading 3'}</h3>`;
        break;
      case 'ul':
        formattedText = `<ul>\n  <li>${textToInsert || 'List item'}</li>\n</ul>`;
        break;
      case 'ol':
        formattedText = `<ol>\n  <li>${textToInsert || 'List item'}</li>\n</ol>`;
        break;
      case 'link':
        formattedText = `<a href="https://example.com">${textToInsert || 'Link text'}</a>`;
        break;
      case 'image':
        formattedText = `<img src="https://example.com/image.jpg" alt="${textToInsert || 'Image description'}" />`;
        break;
      case 'code':
        formattedText = `<code>${textToInsert || 'code'}</code>`;
        break;
      case 'blockquote':
        formattedText = `<blockquote>${textToInsert || 'Quote text'}</blockquote>`;
        break;
      default:
        formattedText = textToInsert;
    }

    const newContent = 
      textarea.value.substring(0, start) + 
      formattedText + 
      textarea.value.substring(end);

    setFormData(prev => ({ ...prev, content: newContent }));

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

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

                <div>
                  <Label htmlFor="imageUrl">Featured Image URL *</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => handleChange('imageUrl', e.target.value)}
                    required
                  />
                </div>

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
                    <Label htmlFor="readTime">Read Time *</Label>
                    <Input
                      id="readTime"
                      value={formData.readTime}
                      onChange={(e) => handleChange('readTime', e.target.value)}
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
                  
                  {/* Rich Text Editor Toolbar */}
                  <div className="border rounded-t-lg p-2 bg-gray-50 dark:bg-gray-800 flex flex-wrap gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('bold')}
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('italic')}
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('underline')}
                      title="Underline"
                    >
                      <Underline className="h-4 w-4" />
                    </Button>
                    
                    <div className="w-px h-6 bg-gray-300 mx-1" />
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('h2')}
                      title="Heading 2"
                    >
                      H2
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('h3')}
                      title="Heading 3"
                    >
                      H3
                    </Button>
                    
                    <div className="w-px h-6 bg-gray-300 mx-1" />
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('ul')}
                      title="Bullet List"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('ol')}
                      title="Numbered List"
                    >
                      1.
                    </Button>
                    
                    <div className="w-px h-6 bg-gray-300 mx-1" />
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('link')}
                      title="Link"
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('image')}
                      title="Image"
                    >
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('code')}
                      title="Code"
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => insertFormatting('blockquote')}
                      title="Quote"
                    >
                      "
                    </Button>
                  </div>
                  
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    rows={20}
                    className="font-mono rounded-t-none border-t-0"
                    placeholder="Write your blog content here. Use the toolbar above to format your text."
                    required
                  />
                  <div className="text-sm text-gray-500 mt-2 space-y-1">
                    <p><strong>Rich Text Editor:</strong> Use the toolbar above to format your content.</p>
                    <p><strong>Supported tags:</strong> &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;u&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;a&gt;, &lt;img&gt;, &lt;code&gt;, &lt;blockquote&gt;</p>
                    <p><strong>Line breaks:</strong> Will be converted to &lt;br&gt; tags automatically.</p>
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
                {loading ? 'Saving...' : post ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}