import { getProperties } from '@/lib/cosmic'
import PropertyCard from '@/components/PropertyCard'
import PropertyFilter from '@/components/PropertyFilter'

interface SearchParams {
  type?: string
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const properties = await getProperties()
  
  const filteredProperties = params.type
    ? properties.filter(p => p.metadata?.property_type?.key === params.type)
    : properties

  const propertyTypes = [...new Set(properties.map(p => p.metadata?.property_type?.value).filter(Boolean))]

  return (
    <div className="container-custom py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Properties</h1>
        <p className="mt-2 text-gray-600">Find your perfect stay from our curated collection</p>
      </div>

      <PropertyFilter 
        propertyTypes={propertyTypes as string[]} 
        currentType={params.type} 
      />

      {filteredProperties.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}