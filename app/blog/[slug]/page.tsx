import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import CTA from '@/components/sections/CTA';
import { blogService } from '@/lib/database';
import Image from 'next/image';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await blogService.getBySlug(params.slug);    
    if (!post || !post.published) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: post.seo_title || `${post.title}`,
      description: post.seo_description || post.excerpt,
      keywords: post.seo_keywords?.length ? post.seo_keywords : [post.category.toLowerCase(), 'blog', 'insights'],
      openGraph: {
        title: post.og_title || post.title,
        description: post.og_description || post.excerpt,
        images: post.og_image ? [post.og_image] : [post.image_url],
        type: 'article',
        publishedTime: post.published_at,
        authors: [post.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.image_url],
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function BlogPost({ params }: Props) {
  let post;
  
  try {
    post = await blogService.getBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  if (!post || !post.published) {
    notFound();
  }

  const publishedDate = post.published_at ? new Date(post.published_at) : null;

  return (
    <TracingBeam className="px-6">
      <div>
      {/* Hero Section */}
      <section className="py-32  dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
          
          <div className="text-center mb-12">
            <Badge className="mb-6">{post.category}</Badge>
            <h1 className="text-4xl sm:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>
            
            <div className="flex items-center justify-center space-x-6 text-gray-600 dark:text-gray-300 mb-8">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {publishedDate?.toLocaleDateString() || new Date(post.created_at!).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.read_time}
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative group">
              <div className={`absolute -inset-4 bg-gradient-to-r ${post.gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
              <Image src={post.image_url}
                alt={post.title}
                className="relative rounded-3xl shadow-2xl w-full h-64 sm:h-96 object-cover"
                height={2000}
                width={2000}/>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </div>
            
            <div 
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
           <div className="">
            <hr />
            <h2 className="text-2xl font-bold mb-3 mt-6">FAQs</h2>
            {post.faqs && post.faqs.length > 0 && (
         <>
          <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    {post.faqs.map((faq, index)=>(

    <>
    <AccordionTrigger key={index}>{index+1}{". "}{faq.question}</AccordionTrigger>
    <AccordionContent>
      {faq.answer}
    </AccordionContent>
    </>
    ))}
  </AccordionItem>
</Accordion>
         </>
)}
           </div>
        </div>
       

      </section>

      {/* <CTA /> */}
    </div>
    </TracingBeam>
  );
}