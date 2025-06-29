'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  FolderOpen, 
  FileText, 
  Mail, 
  LogOut,
  BarChart3,
  TrendingUp,
  Eye,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { teamMembersService, servicesService, portfolioService, blogService, contactService } from '@/lib/firestore';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    teamMembers: 0,
    services: 0,
    portfolio: 0,
    blogPosts: 0,
    contactSubmissions: 0,
    newContacts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [teamMembers, services, portfolio, blogPosts, contacts] = await Promise.all([
          teamMembersService.getAll(),
          servicesService.getAll(),
          portfolioService.getAll(),
          blogService.getAll(),
          contactService.getAll(),
        ]);

        setStats({
          teamMembers: teamMembers.length,
          services: services.length,
          portfolio: portfolio.length,
          blogPosts: blogPosts.length,
          contactSubmissions: contacts.length,
          newContacts: contacts.filter(c => c.status === 'new').length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    {
      title: 'Team Members',
      description: 'Manage team members and their information',
      icon: Users,
      href: '/admin/team',
      count: stats.teamMembers,
      color: 'bg-blue-500',
    },
    {
      title: 'Services',
      description: 'Manage services and offerings',
      icon: Briefcase,
      href: '/admin/services',
      count: stats.services,
      color: 'bg-green-500',
    },
    {
      title: 'Portfolio',
      description: 'Manage portfolio projects and case studies',
      icon: FolderOpen,
      href: '/admin/portfolio',
      count: stats.portfolio,
      color: 'bg-purple-500',
    },
    {
      title: 'Blog Posts',
      description: 'Manage blog content and articles',
      icon: FileText,
      href: '/admin/blog',
      count: stats.blogPosts,
      color: 'bg-orange-500',
    },
    {
      title: 'Contact Submissions',
      description: 'View and manage contact form submissions',
      icon: Mail,
      href: '/admin/contacts',
      count: stats.contactSubmissions,
      badge: stats.newContacts > 0 ? stats.newContacts : undefined,
      color: 'bg-red-500',
    },
  ];

  const quickStats = [
    {
      title: 'Total Views',
      value: '12,345',
      change: '+12%',
      icon: Eye,
      color: 'text-blue-600',
    },
    {
      title: 'Engagement Rate',
      value: '68%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'New Messages',
      value: stats.newContacts.toString(),
      change: 'Today',
      icon: MessageSquare,
      color: 'text-purple-600',
    },
    {
      title: 'Content Items',
      value: (stats.services + stats.portfolio + stats.blogPosts).toString(),
      change: 'Total',
      icon: BarChart3,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {stat.change}
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} href={item.href}>
                <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${item.color} text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{item.count}</Badge>
                        {item.badge && (
                          <Badge variant="destructive">{item.badge}</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  New contact submission received
                </span>
                <span className="text-gray-400 text-xs">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Blog post published
                </span>
                <span className="text-gray-400 text-xs">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Portfolio project updated
                </span>
                <span className="text-gray-400 text-xs">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}