// app/properties/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getPropertyBySlug, getTestimonialsByPropertyId } from '@/lib/cosmic'
import ImageGallery from '@/components/ImageGallery'
import TestimonialCard from '@/components/TestimonialCard'
import AmenityBadge from '@/components/AmenityBadge'
import HostCard from '@/components/HostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  const testimonials = await getTestimonialsByPropertyId(property.id)
  const { metadata } = property

  const allImages = [
    metadata.featured_image,
    ...(metadata.gallery || [])
  ].filter(Boolean)

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-700">Home</Link>
          </li>
          <li className="mx-2">/</li>
          <li>
            <Link href="/properties" className="hover:text-gray-700">Properties</Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-900 font-medium truncate">{property.title}</li>
        </ol>
      </nav>

      {/* Gallery */}
      {allImages.length > 0 && (
        <ImageGallery images={allImages} title={property.title} />
      )}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Title and Location */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              {metadata.property_type && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {metadata.property_type.value}
                </span>
              )}
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {metadata.location}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {property.title}
            </h1>
          </div>

          {/* Property Details */}
          <div className="flex flex-wrap gap-6 py-6 border-y border-gray-200 mb-8">
            {metadata.max_guests && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-gray-700">{metadata.max_guests} guests</span>
              </div>
            )}
            {metadata.bedrooms && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-gray-700">{metadata.bedrooms} bedroom{metadata.bedrooms > 1 ? 's' : ''}</span>
              </div>
            )}
            {metadata.bathrooms && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                <span className="text-gray-700">{metadata.bathrooms} bathroom{metadata.bathrooms > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {metadata.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this place</h2>
              <div className="prose prose-gray max-w-none">
                <ReactMarkdown>{metadata.description}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Amenities */}
          {metadata.amenities && metadata.amenities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {metadata.amenities.map((amenity) => (
                  <AmenityBadge key={amenity} amenity={amenity} />
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {testimonials.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Guest Reviews ({testimonials.length})
              </h2>
              <div className="space-y-6">
                {testimonials.map((testimonial) => (
                  <TestimonialCard 
                    key={testimonial.id} 
                    testimonial={testimonial}
                    showProperty={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Price Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${metadata.price_per_night}
                </span>
                <span className="text-gray-500">/ night</span>
              </div>
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Reserve Now
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                You won&apos;t be charged yet
              </p>
            </div>

            {/* Host Card */}
            {metadata.host && (
              <HostCard host={metadata.host} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}