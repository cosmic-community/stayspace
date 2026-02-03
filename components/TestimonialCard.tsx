import Link from 'next/link'
import { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
  showProperty?: boolean
}

export default function TestimonialCard({ testimonial, showProperty = true }: TestimonialCardProps) {
  const { metadata } = testimonial

  const renderStars = (rating: string) => {
    const numStars = parseInt(rating, 10)
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < numStars ? 'text-yellow-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {metadata.guest_photo ? (
          <img
            src={`${metadata.guest_photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
            alt={metadata.guest_name}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            width={48}
            height={48}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{metadata.guest_name}</h3>
          {metadata.stay_date && (
            <p className="text-sm text-gray-500">
              {new Date(metadata.stay_date).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          )}
        </div>
        {metadata.rating && renderStars(metadata.rating.key)}
      </div>

      {/* Review */}
      <p className="text-gray-600 mb-4 line-clamp-4">
        {metadata.review}
      </p>

      {/* Property Link */}
      {showProperty && metadata.property && (
        <Link 
          href={`/properties/${metadata.property.slug}`}
          className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {metadata.property.title}
        </Link>
      )}
    </div>
  )
}