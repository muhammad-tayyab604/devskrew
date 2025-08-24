'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github, Calendar, User, ArrowRight, Sparkles, FolderOpen, Check } from 'lucide-react';
import CTA from '@/components/sections/CTA';
import { portfolioService, Portfolio } from '@/lib/database';
import { CometCard } from '@/components/ui/comet-card';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import Image from 'next/image';

export default function PortfolioClient() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsList = await portfolioService.getAll();
        setProjects(projectsList);
        setFeaturedProjects(projectsList.filter(project => project.featured));
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
                Our Work
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Our {" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore our featured projects and case studies showcasing how we've helped 
              businesses achieve their digital transformation goals.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <BackgroundBeamsWithCollision>
      {featuredProjects.length > 0 && (
        <section className="py-32 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Featured {" "}
                </span>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Our most impactful projects that demonstrate our expertise and commitment to excellence.
              </p>
            </div>
          
            <div className="space-y-2">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center border border-1 p-8 rounded-lg ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <Badge className="mb-6">{project.category}</Badge>
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="mb-8">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-4">Key Results:</h4>
                      <ul className="space-y-3">
                        {project.results.slice(0, 3).map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                            <Check/> <div className={`w-2 h-2 bg-gradient-to-r ${project.gradient} rounded-full mr-4`} />
                            {result.metric}: {result.value}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button asChild>
                        <Link href={`/portfolio/${project.slug}`}>
                          View Case Study
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      {project.live_url && (
                        <Button variant="outline" asChild>
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="relative group">
                      <div className={`absolute -inset-4 bg-gradient-to-r ${project.gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                      <Image
                      height={2000}
                      width={2000}
                        src={project.featured_image || project.image_url}
                        alt={project.title}
                        className="relative rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                       onError={(e) => {
  e.currentTarget.src =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
}}

                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      </BackgroundBeamsWithCollision>

      {/* All Projects Grid */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                All {" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Browse through our complete portfolio of successful projects across various industries and technologies.
            </p>
          </div>
          
          {projects.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 justify-center items-center">
                        {projects.map((project, index) => (
                          
                          <><CometCard>
                            <button
                              type="button"
                              className="my-10 flex w-[100%] cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-background p-2 md:my-20 md:p-4 "
                              aria-label="View invite F7RA"
                              style={{
                                transformStyle: "preserve-3d",
                                transform: "none",
                                opacity: 1,
                              }}
                            >
                              <div className="mx-2 flex-1">
                                {project.featured_image ? (
                                  <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                                    <Image
                                    height={2000}
                                    width={2000}
                                      loading="lazy"
                                     src={project.featured_image || project.image_url}
                                  alt={project.title}
                                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
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
                              <div className="absolute top-4 left-4">
                                  <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                                    {project.category}
                                  </Badge>
                                </div>
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                                  <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white" asChild>
                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  </Button>
                                </div>
                                <CardContent className="text-start relative p-6 space-y-4">
                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                  <div className="flex items-center">
                                    <User className="h-3 w-3 mr-1" />
                                    {project.client}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {project.year}
                                  </div>
                                </div>
          
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    {project.description}
                                  </p>
                                </div>
          
                                <div className="flex flex-wrap gap-2">
                                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                                    <Badge key={tagIndex} variant="outline" className="text-xs border-gray-200 dark:border-gray-700">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {project.tags.length > 3 && (
                                    <Badge variant="outline" className="text-xs border-gray-200 dark:border-gray-700">
                                      +{project.tags.length - 3}
                                    </Badge>
                                  )}
                                </div>
          
                                <Button asChild variant="ghost" className="w-full justify-between group/btn hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl">
                                  <Link href={`/portfolio/${project.slug}`}>
                                    View Case Study
                                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                  </Link>
                                </Button>
                              </CardContent>
                            </button>
                          </CometCard></>
                        ))}
                      </div>
          
                      <div className="text-center">
                        <Button size="lg" asChild className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                          <Link href="/portfolio">
                            View All Projects
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <div className="max-w-md mx-auto">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FolderOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Portfolio Coming Soon
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          We're currently curating our best work to showcase here. Check back soon to see our amazing projects and case studies.
                        </p>
                      </div>
                    </div>
                  )}
        </div>
      </section>

      <CTA />
    </div>
  );
}