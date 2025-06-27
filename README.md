# Devskrew - Digital Agency Website with Admin Panel

A modern, responsive digital agency website built with Next.js 13, TypeScript, Tailwind CSS, and Supabase. Features a comprehensive admin panel for content management.

## Features

### Frontend
- **Modern Design**: Beautiful, responsive design with dark/light mode support
- **Performance Optimized**: Built with Next.js 13 App Router for optimal performance
- **SEO Friendly**: Comprehensive SEO optimization with meta tags and structured data
- **Responsive**: Mobile-first design that works on all devices
- **Animations**: Smooth animations and micro-interactions using Framer Motion

### Admin Panel
- **Team Management**: Add, edit, and manage team members with social links
- **Services CRUD**: Complete service management with SEO optimization
- **Portfolio Management**: Showcase projects with detailed case studies
- **Contact Management**: Handle contact form submissions with status tracking
- **Blog Management**: Create and publish blog posts with SEO features
- **Dashboard Analytics**: Overview of all content and submissions

### Technical Features
- **Database**: Supabase for real-time data management
- **Authentication**: Secure admin authentication
- **File Upload**: Image management for all content types
- **SEO**: Dynamic meta tags, sitemaps, and structured data
- **Performance**: Optimized images, lazy loading, and caching

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd devskrew-website
npm install
```

### 2. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Go to SQL Editor and run the migration file: `supabase/migrations/001_initial_schema.sql`

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Configuration
ADMIN_SECRET_KEY=your_admin_secret_key
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

### 4. Run the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

### 5. Access Admin Panel
Visit `http://localhost:3000/admin` and use the password `admin123` to access the admin panel.

## Admin Panel Usage

### Team Management
- Add team members with photos, bios, and social links
- Reorder team members with the order index
- Edit or remove team members as needed

### Services Management
- Create detailed service pages with features and technologies
- Set pricing and delivery timeframes
- Add SEO metadata for better search visibility
- Organize services with categories and tags

### Portfolio Management
- Showcase projects with detailed case studies
- Add project galleries and technical details
- Include client testimonials and results
- Mark projects as featured for homepage display

### Contact Management
- View all contact form submissions
- Track status (new, read, replied, archived)
- Respond to inquiries and manage follow-ups
- Export contact data for CRM integration

### Blog Management
- Create and edit blog posts with rich content
- Schedule posts or save as drafts
- Add SEO metadata and featured images
- Organize posts by categories and tags

## Database Schema

The application uses the following main tables:
- `team_members`: Team member information and social links
- `services`: Service offerings with detailed descriptions
- `portfolio`: Project case studies and portfolios
- `blog_posts`: Blog articles and content
- `contact_submissions`: Contact form submissions and inquiries

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

## Customization

### Styling
- Modify `tailwind.config.ts` for custom design tokens
- Update `app/globals.css` for global styles
- Customize components in the `components` directory

### Content
- Update company information in layout files
- Modify hero sections and call-to-action components
- Customize email templates and contact forms

### SEO
- Update `app/layout.tsx` for global SEO settings
- Modify individual page metadata
- Configure sitemap generation in `next-sitemap.config.js`

## Support

For support and questions:
- Check the documentation in the `docs` folder
- Review the component examples in `components`
- Contact the development team for custom modifications

## License

This project is proprietary software. All rights reserved.