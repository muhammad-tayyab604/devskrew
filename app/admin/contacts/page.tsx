'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowLeft, Mail, Phone, Building, DollarSign, Calendar, Eye, Archive, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { contactService, ContactSubmission } from '@/lib/firestore';
import { toast } from 'sonner';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const contactsList = await contactService.getAll();
      setContacts(contactsList);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: ContactSubmission['status']) => {
    try {
      await contactService.update(id, { status });
      toast.success('Status updated successfully');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return;

    try {
      await contactService.delete(id);
      toast.success('Contact deleted successfully');
      fetchContacts();
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'read': return 'bg-yellow-500';
      case 'replied': return 'bg-green-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Contact Submissions
              </h1>
              <Badge variant="secondary">{contacts.length}</Badge>
              {contacts.filter(c => c.status === 'new').length > 0 && (
                <Badge variant="destructive">
                  {contacts.filter(c => c.status === 'new').length} new
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      <Badge 
                        className={`${getStatusColor(contact.status)} text-white`}
                      >
                        {contact.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {contact.email}
                      </div>
                      {contact.company && (
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {contact.company}
                        </div>
                      )}
                      {contact.service && (
                        <div className="flex items-center">
                          <Badge variant="outline">{contact.service}</Badge>
                        </div>
                      )}
                      {contact.budget && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {contact.budget}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {contact.createdAt?.toDate().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Select
                      value={contact.status}
                      onValueChange={(value) => handleStatusUpdate(contact.id!, value as ContactSubmission['status'])}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(contact.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                  {contact.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'No contacts found matching your filters.' 
                : 'No contact submissions yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">{selectedContact.name}</CardTitle>
                  <CardDescription>{selectedContact.email}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedContact(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {selectedContact.company && (
                  <div>
                    <Label className="text-sm font-medium">Company</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedContact.company}
                    </p>
                  </div>
                )}
                {selectedContact.service && (
                  <div>
                    <Label className="text-sm font-medium">Service</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedContact.service}
                    </p>
                  </div>
                )}
                {selectedContact.budget && (
                  <div>
                    <Label className="text-sm font-medium">Budget</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedContact.budget}
                    </p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={`${getStatusColor(selectedContact.status)} text-white`}>
                    {selectedContact.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Message</Label>
                <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Submitted</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedContact.createdAt?.toDate().toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}