import Link from 'next/link'
import { getProperties, getTestimonials } from '@/lib/cosmic'
import PropertyCard from '@/components/PropertyCard'
import TestimonialCard from '@/components/TestimonialCard'

export default async function HomePage() {
  const properties = await getProperties()
  const testimonials = await getTestimonials()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url(${properties[0]?.metadata?.featured_image?.imgix_url}?w=1920&h=800&fit=crop&auto=format,compress)`
          }}
        />
        <div className="relative container-custom py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find your perfect getaway
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Discover unique places to stay from local hosts around the world. 
              From beach houses to mountain cabins, find your next adventure.
            </p>
            <Link 
              href="/properties"
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
            >
              Explore Properties
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container-custom py-16 md:py-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="mt-2 text-gray-600">Handpicked places for an unforgettable stay</p>
          </div>
          <Link 
            href="/properties" 
            className="hidden sm:inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link 
            href="/properties" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all properties
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Guest Reviews</h2>
              <p className="mt-2 text-gray-600">See what our guests have to say about their stays</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container-custom py-16 md:py-24">
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready for your next adventure?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our collection of unique properties and find the perfect place for your next vacation.
          </p>
          <Link 
            href="/properties"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 font-medium rounded-lg transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  )
}