import { Code, Palette, Search, Megaphone, Smartphone, BarChart, Globe, Shield, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { services } from '@/data/ServiceData';


type Props = { limit?: number };


export function ServicesCards({ limit }: Props){

   const list = typeof limit === 'number'
    ? services.slice(0, limit)
    : services;

return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {list.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className={`group relative overflow-hidden border-0 bg-gradient-to-br ${service.bgGradient} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
                  <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Starting at</p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.startingPrice}</p>
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
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 mt-2 flex-shrink-0`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button asChild className="w-full group/btn">
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
)
}