'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface PropertyFilterProps {
  propertyTypes: string[]
  currentType?: string
}

export default function PropertyFilter({ propertyTypes, currentType }: PropertyFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilter = (type: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (type) {
      params.set('type', type)
    } else {
      params.delete('type')
    }
    router.push(`/properties?${params.toString()}`)
  }

  const typeKeyMap: Record<string, string> = {
    'House': 'house',
    'Apartment': 'apartment',
    'Cabin': 'cabin',
    'Villa': 'villa',
    'Condo': 'condo',
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleFilter(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !currentType 
            ? 'bg-gray-900 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {propertyTypes.map((type) => (
        <button
          key={type}
          onClick={() => handleFilter(typeKeyMap[type] || type.toLowerCase())}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentType === (typeKeyMap[type] || type.toLowerCase())
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  )
}