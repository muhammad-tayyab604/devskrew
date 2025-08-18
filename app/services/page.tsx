'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import CTA from '@/components/sections/CTA';
import { Sparkles, Code } from 'lucide-react';
import { servicesService, Service } from '@/lib/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CometCard } from '@/components/ui/comet-card';

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'We start by understanding your business goals, target audience, and project requirements through detailed consultation.',
  },
  {
    step: '02',
    title: 'Strategy & Design',
    description: 'Our team develops a comprehensive strategy and creates detailed designs that align with your vision and objectives.',
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'We build your solution using best practices and conduct thorough testing to ensure quality and performance.',
  },
  {
    step: '04',
    title: 'Launch & Optimization',
    description: 'We launch your project and provide ongoing optimization and support to ensure continued success.',
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesList = await servicesService.getAll();
        setServices(servicesList);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
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
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-700/50 mb-8">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Our Expertise
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Our {" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive digital solutions designed to transform your business 
              and drive measurable results in today's competitive landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {services.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <><CometCard key={service.id || index}>
                    <button
                      type="button"
                      className="my-10 flex w-[100%]]cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-background p-2 md:my-20 md:p-4"
                      aria-label="View invite F7RA"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "none",
                        opacity: 1,
                      }}
                    >
                      <div className="mx-2 flex-1">
                        {service.featured_image ? (
                        <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                          <img
                            loading="lazy"
                           src={service.featured_image}
                          alt={service.title}
                          className=" object-cover group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          } }
                            style={{
                              boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                              opacity: 1,
                            }} />
                        </div>
                        ):(<div className="aspect-video relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center rounded-t-2xl">
                        <div className="text-center">
                          <Sparkles className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-500 dark:text-gray-400 text-sm">No featured image</p>
                        </div>
                      </div>)}
                        
                      </div>
                      <CardHeader className="relative text-start">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <span className="text-white text-2xl">⚡</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Starting at</p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.starting_price}</p>
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3  text-start">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.features.slice(0, 4).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                              <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 mt-2 flex-shrink-0`} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3  text-start">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.slice(0, 4).map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {service.technologies.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{service.technologies.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button asChild className="w-full group/btn">
                        <Link href={`/services/${service.slug}`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </CardContent>
                    </button>
                  </CometCard></>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Services Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We're currently setting up our service offerings. Check back soon to discover how we can help transform your business.
              </p>
            </div>
          </div>
        )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Our {" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We follow a proven methodology to ensure your project is delivered on time, 
              within budget, and exceeds your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 dark:from-blue-700 dark:to-purple-700 transform translate-x-10" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}