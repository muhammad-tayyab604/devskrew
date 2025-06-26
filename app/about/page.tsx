import { Metadata } from 'next';
import { Users, Target, Award, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CTA from '@/components/sections/CTA';
import { AnimatedTeamMembers } from '@/components/ui/animated-testimonials';
import { TeamCarousel } from '@/components/sections/TeamCarousel';

export const metadata: Metadata = {
  title: 'About Us - Our Story, Mission & Team',
  description: 'Learn about Devskrew\'s journey, our mission to transform businesses through digital innovation, and meet the talented team behind our success.',
  keywords: ['about digital agency', 'company story', 'team', 'mission', 'values', 'digital transformation'],
  openGraph: {
    title: 'About Devskrew - Our Story & Mission',
    description: 'Discover our journey and meet the team transforming businesses through digital innovation.',
    images: ['/og-about.jpg'],
  },
};

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on delivering measurable results that drive business growth and success.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our success. We work closely with you to understand and exceed your expectations.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from design to development to delivery.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We\'re passionate about digital innovation and helping businesses thrive in the digital age.',
    gradient: 'from-orange-500 to-red-500',
  },
];

export default function About() {
  return (
    <div className="">
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
                About us
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Our {" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're a passionate team of digital innovators dedicated to helping businesses 
              thrive in the ever-evolving digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Building Digital Excellence Since 2020
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Founded with a vision to bridge the gap between technology and business success, 
                  Devskrew has grown from a small startup to a trusted partner for companies 
                  worldwide. Our journey began with a simple belief: that every business deserves 
                  access to cutting-edge digital solutions.
                </p>
                <p>
                  Today, we're proud to work with businesses of all sizes, from ambitious startups 
                  to established enterprises, helping them navigate the digital transformation journey 
                  with confidence and success.
                </p>
                <p>
                  Our team combines technical expertise with creative vision to deliver solutions 
                  that not only meet your needs but exceed your expectations. We believe in building 
                  long-term partnerships based on trust, transparency, and results.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <img
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                  alt="Team collaboration"
                  className="relative rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Our {" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              These core values guide everything we do and define how we work with our clients and each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="group relative overflow-hidden border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${value.gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <CardHeader className="relative text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative text-center">
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Meet Our {" "}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The talented individuals who make the magic happen behind the scenes.
            </p>
          </div>

          <TeamCarousel  />
        </div>
      </section>

      <CTA />
    </div>
  );
}