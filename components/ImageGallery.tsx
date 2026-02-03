'use client'

import { useState } from 'react'
import { CosmicFile } from '@/types'

interface ImageGalleryProps {
  images: (CosmicFile | undefined)[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const validImages = images.filter((img): img is CosmicFile => Boolean(img))

  if (validImages.length === 0) return null

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden bg-gray-100">
        <img
          src={`${validImages[selectedIndex].imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
          alt={`${title} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
          width={1600}
          height={800}
        />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden ${
                index === selectedIndex 
                  ? 'ring-2 ring-primary-500 ring-offset-2' 
                  : 'opacity-70 hover:opacity-100'
              } transition-all`}
            >
              <img
                src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}