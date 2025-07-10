import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Star, Users, Clock, Award, ArrowRight } from 'lucide-react';
import CTA from '@/components/sections/CTA';
import { servicesService } from '@/lib/database';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const service = await servicesService.getBySlug(params.slug);
    
    if (!service) {
      return {
        title: 'Service Not Found',
      };
    }

    return {
      title: service.seoTitle || `${service.title} Services - Professional ${service.title} Solutions`,
      description: service.seoDescription || service.description,
      keywords: service.seoKeywords?.length ? service.seoKeywords : [service.title.toLowerCase(), 'professional services', 'digital agency', ...service.technologies.map(tech => tech.toLowerCase())],
      openGraph: {
        title: service.ogTitle || `${service.title} Services - Devskrew`,
        description: service.ogDescription || service.description,
        images: service.ogImage ? [service.ogImage] : undefined,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Service Not Found',
    };
  }
}

export default async function ServiceDetail({ params }: Props) {
  let service;
  
  try {
    service = await servicesService.getBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  if (!service) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/services">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {service.title}
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {service.longDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{service.deliveryTime}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  <span>Starting at {service.startingPrice}</span>
                </div>
              </div>
              
              <Button size="lg" asChild className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="relative group">
                <div className={`absolute -inset-4 bg-gradient-to-r ${service.gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  {service.featuredImage && (
                    <div className="mb-6">
                      <img
                        src={service.featuredImage}
                        alt={service.title}
                        className="w-full h-48 object-cover rounded-2xl"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h3>
                  <ul className="space-y-3">
                    {service.features.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Technologies {" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                We Use
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We work with the latest and most reliable technologies to deliver exceptional results.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {service.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-lg px-6 py-3 rounded-xl">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}