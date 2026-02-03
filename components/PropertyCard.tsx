import Link from 'next/link'
import { Property } from '@/types'

interface PropertyCardProps {
  property: Property
  showHost?: boolean
}

export default function PropertyCard({ property, showHost = true }: PropertyCardProps) {
  const { metadata } = property

  return (
    <Link 
      href={`/properties/${property.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {metadata.featured_image ? (
          <img
            src={`${metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={300}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {metadata.property_type && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-md">
            {metadata.property_type.value}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {metadata.location}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {metadata.bedrooms && (
            <span>{metadata.bedrooms} bed{metadata.bedrooms > 1 ? 's' : ''}</span>
          )}
          {metadata.bathrooms && (
            <span>{metadata.bathrooms} bath{metadata.bathrooms > 1 ? 's' : ''}</span>
          )}
          {metadata.max_guests && (
            <span>{metadata.max_guests} guest{metadata.max_guests > 1 ? 's' : ''}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-gray-900">${metadata.price_per_night}</span>
            <span className="text-sm text-gray-500">/ night</span>
          </div>
          
          {showHost && metadata.host && (
            <div className="flex items-center gap-2">
              {metadata.host.metadata?.profile_photo ? (
                <img
                  src={`${metadata.host.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={metadata.host.metadata.name}
                  className="w-6 h-6 rounded-full object-cover"
                  width={24}
                  height={24}
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              {metadata.host.metadata?.superhost && (
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}