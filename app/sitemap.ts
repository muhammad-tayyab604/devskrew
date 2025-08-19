// app/sitemap.ts
import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase"; // make sure this is your server-side supabase client

// allowed sitemap change frequency literals
type ChangeFreq =
  | "daily"
  | "weekly"
  | "monthly"
  | "always"
  | "hourly"
  | "yearly"
  | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://devskrew.com";

  // fetch tables in parallel
  const [
    { data: blogData, error: blogError },
    { data: servicesData, error: servicesError },
    { data: portfolioData, error: portfolioError },
  ] = await Promise.all([
    supabase.from("blog_posts").select("slug, updated_at"),
    supabase.from("services").select("slug, updated_at"),
    supabase.from("portfolio").select("slug, updated_at"),
  ]);

  // log any Supabase errors for debugging (optional)
  if (blogError) console.error("Supabase (blog_posts) error:", blogError);
  if (servicesError) console.error("Supabase (services) error:", servicesError);
  if (portfolioError) console.error("Supabase (portfolio) error:", portfolioError);

  // helper to map rows to sitemap entries
  const toEntry = (path: string, row: any, freq: ChangeFreq, priority = 0.6) => ({
    url: `${baseUrl}/${path}/${row.slug}`,
    lastModified: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
    changeFrequency: freq,
    priority,
  });

  const blogUrls = (blogData ?? []).map((r: any) => toEntry("blog", r, "weekly", 0.7));
  const serviceUrls = (servicesData ?? []).map((r: any) => toEntry("services", r, "monthly", 0.8));
  const portfolioUrls = (portfolioData ?? []).map((r: any) => toEntry("portfolio", r, "monthly", 0.8));

  const staticUrls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date().toISOString(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString(), changeFrequency: "monthly", priority: 0.8 },
  ];

  // final sitemap cast to MetadataRoute.Sitemap for TS safety
  return [...staticUrls, ...blogUrls, ...serviceUrls, ...portfolioUrls] as MetadataRoute.Sitemap;
}
