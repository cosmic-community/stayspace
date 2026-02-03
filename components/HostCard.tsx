import Link from 'next/link'
import { Host } from '@/types'

interface HostCardProps {
  host: Host
}

export default function HostCard({ host }: HostCardProps) {
  const { metadata } = host

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        {metadata.profile_photo ? (
          <img
            src={`${metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={metadata.name}
            className="w-14 h-14 rounded-full object-cover"
            width={56}
            height={56}
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
            <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900">Hosted by {metadata.name}</h3>
          {metadata.superhost && (
            <span className="inline-flex items-center gap-1 text-sm text-yellow-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Superhost
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        {metadata.years_hosting && (
          <p>{metadata.years_hosting} years hosting</p>
        )}
        {metadata.location && (
          <p>Lives in {metadata.location}</p>
        )}
      </div>

      {metadata.bio && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {metadata.bio}
        </p>
      )}

      <Link
        href={`/hosts/${host.slug}`}
        className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        View profile
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}