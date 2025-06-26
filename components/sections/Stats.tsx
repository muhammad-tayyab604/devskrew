'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const stats = [
  { number: 150, suffix: '+', label: 'Projects Completed', gradient: 'from-blue-400 to-cyan-400' },
  { number: 95, suffix: '%', label: 'Client Satisfaction', gradient: 'from-purple-400 to-pink-400' },
  { number: 50, suffix: '+', label: 'Team Members', gradient: 'from-green-400 to-emerald-400' },
  { number: 5, suffix: 'Y', label: 'Years of Experience', gradient: 'from-orange-400 to-red-400' },
];

export default function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                {/* Glow Effect */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                    <AnimatedNumber
                      value={stat.number}
                      suffix={stat.suffix}
                      isVisible={inView}
                      delay={index * 100}
                    />
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({ value, suffix, isVisible, delay }: { 
  value: number; 
  suffix: string; 
  isVisible: boolean; 
  delay: number; 
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const step = value / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
          current += step;
          if (current >= value) {
            setCount(value);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }, 16);

        return () => clearInterval(counter);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, value, delay]);

  return <span>{count}{suffix}</span>;
}