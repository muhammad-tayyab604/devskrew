'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { teamMembersService, TeamMember } from '@/lib/database';
import { toast } from 'sonner';
import ImageUpload from '@/components/ui/image-upload';

interface TeamMemberFormProps {
  member?: TeamMember | null;
  onClose: () => void;
}

export default function TeamMemberForm({ member, onClose }: TeamMemberFormProps) {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    designation: member?.designation || '',
    bio: member?.bio || '',
    image_url: member?.image_url || '',
    linkedin_url: member?.linkedin_url || '',
    twitter_url: member?.twitter_url || '',
  });
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (member?.id) {
        await teamMembersService.update(member?.id, formData);
        toast.success('Team member updated successfully');
      } else {
        await teamMembersService.create(formData);
        toast.success('Team member created successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save team member');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {member ? 'Edit Team Member' : 'Add Team Member'}
              </CardTitle>
              <CardDescription>
                {member ? 'Update team member information' : 'Add a new team member to your team'}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows={4}
                required
              />
            </div>

            <ImageUpload
              value={formData.image_url}
              onChange={(url) => handleChange('image_url', url)}
              bucket="images"
              folder="avatars"
              label="Profile Image"
              required
            />            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => handleChange('linkedin_url', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="twitter_url">Twitter URL</Label>
                <Input
                  id="twitter_url"
                  type="url"
                  value={formData.twitter_url}
                  onChange={(e) => handleChange('twitter_url', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : member ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}