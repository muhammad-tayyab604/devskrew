'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, FolderOpen, MessageSquare, FileText, TrendingUp } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface Stats {
  teamMembers: number;
  services: number;
  portfolioItems: number;
  contactSubmissions: number;
  blogPosts: number;
  newContacts: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    teamMembers: 0,
    services: 0,
    portfolioItems: 0,
    contactSubmissions: 0,
    blogPosts: 0,
    newContacts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      fetchStats();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchStats = async () => {
    if (!supabase) return;

    try {
      const [
        teamResult,
        servicesResult,
        portfolioResult,
        contactsResult,
        blogResult,
        newContactsResult
      ] = await Promise.all([
        supabase.from('team_members').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('portfolio').select('id', { count: 'exact' }),
        supabase.from('contact_submissions').select('id', { count: 'exact' }),
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase
          .from('contact_submissions')
          .select('id', { count: 'exact' })
          .eq('status', 'new')
      ]);

      setStats({
        teamMembers: teamResult.count || 0,
        services: servicesResult.count || 0,
        portfolioItems: portfolioResult.count || 0,
        contactSubmissions: contactsResult.count || 0,
        blogPosts: blogResult.count || 0,
        newContacts: newContactsResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Team Members',
      value: stats.teamMembers,
      icon: Users,
      description: 'Active team members',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Services',
      value: stats.services,
      icon: Briefcase,
      description: 'Available services',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Portfolio Items',
      value: stats.portfolioItems,
      icon: FolderOpen,
      description: 'Completed projects',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Contact Submissions',
      value: stats.contactSubmissions,
      icon: MessageSquare,
      description: 'Total inquiries',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Blog Posts',
      value: stats.blogPosts,
      icon: FileText,
      description: 'Published articles',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'New Contacts',
      value: stats.newContacts,
      icon: TrendingUp,
      description: 'Unread inquiries',
      gradient: 'from-teal-500 to-blue-500',
    },
  ];

  if (!isSupabaseConfigured()) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-full">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Configure Supabase to view statistics
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="group relative overflow-hidden border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}