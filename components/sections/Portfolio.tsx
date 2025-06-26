import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight, Calendar, User } from 'lucide-react';
import { PortfolioCards } from '../Cards/PortfilioCards';

const projects = [
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'Modern e-commerce solution with advanced features and seamless user experience.',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Web Development',
    year: '2024',
    client: 'TechStart Inc.',
  },
  {
    id: 'brand-identity-design',
    title: 'Brand Identity Design',
    description: 'Complete brand identity and visual design system for a growing tech startup.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    tags: ['Branding', 'Logo Design', 'Typography', 'Color Theory'],
    category: 'Design',
    year: '2024',
    client: 'Creative Studio',
  },
  {
    id: 'mobile-banking-app',
    title: 'Mobile Banking App',
    description: 'Secure and intuitive mobile banking application with modern UI/UX design.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    tags: ['React Native', 'UI/UX', 'Security', 'Fintech'],
    category: 'Mobile Development',
    year: '2024',
    client: 'FinanceFlow',
  },
  {
    id: 'digital-marketing-campaign',
    title: 'Digital Marketing Campaign',
    description: 'Comprehensive digital marketing strategy that increased conversions by 300%.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    tags: ['SEO', 'Social Media', 'PPC', 'Analytics'],
    category: 'Marketing',
    year: '2024',
    client: 'GrowthCorp',
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS Dashboard',
    description: 'Complex data visualization dashboard for enterprise SaaS platform.',
    image: 'https://images.pexels.com/photos/3184336/pexels-photo-3184336.jpeg',
    tags: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
    category: 'Web Development',
    year: '2024',
    client: 'DataFlow',
  },
  {
    id: 'restaurant-website',
    title: 'Restaurant Website',
    description: 'Elegant restaurant website with online ordering and reservation system.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    tags: ['WordPress', 'PHP', 'MySQL', 'Responsive'],
    category: 'Web Development',
    year: '2024',
    client: 'Bistro Elite',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-700/50 mb-6">
            <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Our Work
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Featured {" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of successful projects and see how we've helped businesses achieve their digital goals.
          </p>
        </div>

        <PortfolioCards limit={6} />

        <div className="text-center">
          <Button size="lg" asChild className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="/portfolio">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}