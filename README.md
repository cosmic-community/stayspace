# StaySpace - Vacation Rental Platform

![StaySpace](https://imgix.cosmicjs.com/7d6c97d0-0092-11f1-bc31-2f0ace4efed3-photo-1499793983690-e29da59ef1c2-1770076459022.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, Airbnb-inspired vacation rental platform built with Next.js 16 and Cosmic CMS. Browse stunning properties, discover trusted hosts, and read real guest testimonials.

## Features

- 🏠 **Property Listings** - Browse vacation rentals with rich details, galleries, and amenities
- 👤 **Host Profiles** - View host information, experience, and Superhost status
- ⭐ **Guest Reviews** - Read authentic testimonials with star ratings
- 🔍 **Property Filtering** - Filter by property type (House, Apartment, Cabin, Villa, Condo)
- 📱 **Fully Responsive** - Beautiful experience on all devices
- ⚡ **Server-Side Rendering** - Fast, SEO-optimized pages with Next.js 16
- 🎨 **Modern Design** - Clean, minimal UI with Inter font and smooth animations

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6981383ef078ef3755fe48a4&clone_repository=69813b88f078ef3755fe48d0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a complete content model for: Airbnb clone with properties, hosts, and testimonials
>
> Use the install_content_model action to create ALL object types AND demo content in one step. Include:
> 1. All necessary object types with appropriate metafields
> 2. 2-3 demo objects for each type with realistic content
> 3. Unsplash image URLs for thumbnails and file metafields (use real URLs like https://images.unsplash.com/photo-...)
>
> Remember to create types that are referenced by others FIRST (e.g., categories and authors before blog posts)."

### Code Generation Prompt

> "Next.js, modern, minimal, inter font, responsive"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com/) - Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [React 19](https://react.dev/) - UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the Airbnb clone content model

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stayspace
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Properties with Host Data
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: properties } = await cosmic.objects
  .find({ type: 'properties' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Property by Slug
```typescript
const { object: property } = await cosmic.objects
  .findOne({ type: 'properties', slug: 'oceanfront-beach-house' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Testimonials for a Property
```typescript
const { objects: testimonials } = await cosmic.objects
  .find({ 
    type: 'testimonials',
    'metadata.property': propertyId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three interconnected content types:

### Hosts 👤
- Name, bio, and profile photo
- Location and years of hosting experience
- Superhost status indicator

### Properties 🏠
- Title, description, and featured image
- Property type, location, and pricing
- Bedrooms, bathrooms, and max guests
- Photo gallery and amenities checklist
- Connected host relationship

### Testimonials ⭐
- Guest name and photo
- Star rating (1-5)
- Review text and stay date
- Connected property relationship

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to a Git repository
2. Import the project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables

Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key (optional for read-only apps)

## License

MIT License - feel free to use this project for your own vacation rental platform!

<!-- README_END -->