// app/hosts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getHostBySlug, getPropertiesByHostId } from '@/lib/cosmic'
import PropertyCard from '@/components/PropertyCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function HostPage({ params }: PageProps) {
  const { slug } = await params
  const host = await getHostBySlug(slug)

  if (!host) {
    notFound()
  }

  const properties = await getPropertiesByHostId(host.id)
  const { metadata } = host

  return (
    <div className="container-custom py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-700">Home</Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-900 font-medium">{metadata.name}</li>
        </ol>
      </nav>

      {/* Host Profile */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-12">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {metadata.profile_photo ? (
                <img
                  src={`${metadata.profile_photo.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                  alt={metadata.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
                  width={160}
                  height={160}
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {metadata.name}
                </h1>
                {metadata.superhost && (
                  <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Superhost
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                {metadata.location && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {metadata.location}
                  </span>
                )}
                {metadata.years_hosting && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {metadata.years_hosting} years hosting
                  </span>
                )}
              </div>

              {metadata.bio && (
                <p className="text-gray-600 max-w-2xl">
                  {metadata.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Host's Properties */}
      {properties.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {metadata.name}&apos;s Listings ({properties.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} showHost={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}