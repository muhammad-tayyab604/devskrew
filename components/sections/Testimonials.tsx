'use client';

import React, { useState, useEffect } from "react";
import Marquee from "../ui/marquee";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { Sparkles, MessageSquare } from "lucide-react";
import { testimonialsService, Testimonial } from '@/lib/firestore';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsList = await testimonialsService.getFeatured();
        setTestimonials(testimonialsList);
        console.log('====================================');
        console.log(testimonialsList);
        console.log('====================================');
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center py-12">
      <div className="h-full w-full">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-700/50 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Testimonials
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              What Our Clients
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
        </div>

        {testimonials.length > 0 ? (
          <div className="relative">
            <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-gradient-to-r from-background to-transparent" />
            <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-gradient-to-l from-background to-transparent" />
            <Marquee pauseOnHover className="[--duration:20s]">
              <TestimonialList testimonials={testimonials} />
            </Marquee>
            <Marquee pauseOnHover reverse className="mt-0 [--duration:20s]">
              <TestimonialList testimonials={testimonials} />
            </Marquee>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Testimonials Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We're gathering feedback from our amazing clients. Check back soon to see what they have to say about working with us.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TestimonialList = ({ testimonials }: { testimonials: Testimonial[] }) =>
  testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="min-w-96 max-w-sm bg-accent rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            {testimonial.avatar ? (
              <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
            ) : (
              <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
            <p className="text-xs text-gray-400">{testimonial.company}</p>
          </div>
        </div>
        <div className="flex">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
        </div>
      </div>
      <p className="mt-5 text-[17px]">{testimonial.content}</p>
    </div>
  ));