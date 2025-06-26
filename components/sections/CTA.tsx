import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Sparkles, Zap } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-200">
              Ready to Transform Your Business?
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Let's Create
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Partner with us to build digital experiences that captivate your audience, 
            drive meaningful engagement, and deliver exceptional results for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button size="lg" asChild className="text-lg px-10 py-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 rounded-2xl border-2 border-white/30 text-gray-700 dark:text-gray-50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 group">
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Schedule a Call
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-blue-200">
              <Zap className="h-5 w-5 text-blue-400" />
              <span className="font-medium">Free Consultation</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-blue-200">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="font-medium">No Commitment</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-blue-200">
              <ArrowRight className="h-5 w-5 text-pink-400" />
              <span className="font-medium">Quick Response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}