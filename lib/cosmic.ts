import { createBucketClient } from '@cosmicjs/sdk'
import { Property, Host, Testimonial } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Property[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch properties')
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'properties', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content'])
      .depth(1)
    return response.object as Property
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch property')
  }
}

export async function getHosts(): Promise<Host[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'hosts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Host[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch hosts')
  }
}

export async function getHostBySlug(slug: string): Promise<Host | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'hosts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object as Host
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch host')
  }
}

export async function getPropertiesByHostId(hostId: string): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties', 'metadata.host': hostId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Property[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch host properties')
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Testimonial[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch testimonials')
  }
}

export async function getTestimonialsByPropertyId(propertyId: string): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials', 'metadata.property': propertyId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Testimonial[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch property testimonials')
  }
}