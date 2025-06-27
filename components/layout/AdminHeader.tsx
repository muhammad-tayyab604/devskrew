'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Briefcase, 
  FolderOpen, 
  MessageSquare, 
  FileText, 
  LogOut,
  BarChart3,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { useAdminAuth } from '@/lib/admin-auth';
import { isSupabaseConfigured } from '@/lib/supabase';
import TeamManagement from './TeamManagement';
import ServicesManagement from './ServicesManagement';
import PortfolioManagement from './PortfolioManagement';
import ContactManagement from './ContactManagement';
import BlogManagement from './BlogManagement';
import AdminStats from './AdminStats';

export function AdminHeader(){
  return(
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Settings className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
  )
}