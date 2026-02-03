export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface Host {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    bio?: string
    profile_photo?: CosmicFile
    location?: string
    years_hosting?: number
    superhost?: boolean
  }
}

export interface PropertyType {
  key: string
  value: string
}

export interface Property {
  id: string
  slug: string
  title: string
  metadata: {
    title: string
    description?: string
    property_type?: PropertyType
    location: string
    price_per_night: number
    max_guests?: number
    bedrooms?: number
    bathrooms?: number
    featured_image?: CosmicFile
    gallery?: CosmicFile[]
    amenities?: string[]
    host?: Host
  }
}

export interface RatingType {
  key: string
  value: string
}

export interface Testimonial {
  id: string
  slug: string
  title: string
  metadata: {
    guest_name: string
    guest_photo?: CosmicFile
    rating?: RatingType
    review: string
    property?: Property
    stay_date?: string
  }
}