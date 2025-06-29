'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { servicesService, Service } from '@/lib/firestore';
import { toast } from 'sonner';
import ServiceForm from '@/components/admin/ServiceForm';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const servicesList = await servicesService.getAll();
      setServices(servicesList);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await servicesService.delete(id);
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingService(null);
    fetchServices();
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                Services
              </h1>
              <Badge variant="secondary">{services.length}</Badge>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {service.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{service.startingPrice}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Features:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {service.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{service.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Technologies:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {service.technologies.slice(0, 4).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {service.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <div className="flex items-center space-x-2">
                      <Link href={`/services/${service.slug}`} target="_blank">
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(service.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No services found matching your search.' : 'No services yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <ServiceForm
          service={editingService}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}