"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import ImageGalleryModal from "@/components/ui/image-gallery-modal"
import Toast from "@/components/ui/toast"

interface GalleryImage {
  src: string
  alt: string
  package: string
  category?: string
}

const galleryImages: GalleryImage[] = [
  // Basic Package Images
  {
    src: "/colorful-balloons-party-decoration.jpg",
    alt: "Colorful balloon party decorations",
    package: "Basic Package",
    category: "Decorations"
  },
  {
    src: "/simple-photo-booth-party.jpg",
    alt: "Simple photo booth setup",
    package: "Basic Package",
    category: "Photo Booth"
  },
  {
    src: "/gallery2.PNG",
    alt: "Basic party setup",
    package: "Basic Package",
    category: "Party Setup"
  },
  {
    src: "/hero3.PNG",
    alt: "Basic celebration moments",
    package: "Basic Package",
    category: "Celebration"
  },

  // Premium Package Images
  {
    src: "/party-setup.jpg",
    alt: "Premium party setup",
    package: "Premium Package",
    category: "Party Setup"
  },
  {
    src: "/party-host-entertaining-children-games.jpg",
    alt: "Professional party entertainment",
    package: "Premium Package",
    category: "Entertainment"
  },
  {
    src: "/professional-party-photographer.jpg",
    alt: "Professional photography session",
    package: "Premium Package",
    category: "Photography"
  },
  {
    src: "/hero2.PNG",
    alt: "Premium party decorations",
    package: "Premium Package",
    category: "Decorations"
  },
  {
    src: "/gallery4.PNG",
    alt: "Premium celebration setup",
    package: "Premium Package",
    category: "Party Setup"
  },
  {
    src: "/gallery3.PNG",
    alt: "Premium themed decorations",
    package: "Premium Package",
    category: "Themed Decor"
  },

  // Eco-Friendly Package Images
  {
    src: "/eco-friendly-birthday-party-with-natural-decoratio.jpg",
    alt: "Eco-friendly party with natural decorations",
    package: "Eco-Friendly Package",
    category: "Natural Decorations"
  },
  {
    src: "/natural-biodegradable-party-decorations.jpg",
    alt: "Biodegradable party decorations",
    package: "Eco-Friendly Package",
    category: "Sustainable Decor"
  },
  {
    src: "/children-doing-recycled-crafts-at-party.jpg",
    alt: "Children doing recycled crafts activity",
    package: "Eco-Friendly Package",
    category: "Eco Activities"
  },
  {
    src: "/organic-healthy-party-treats-and-snacks.jpg",
    alt: "Organic healthy party treats and snacks",
    package: "Eco-Friendly Package",
    category: "Organic Food"
  },
  {
    src: "/eco-friendly-party-cleanup-service.jpg",
    alt: "Eco-friendly party cleanup service",
    package: "Eco-Friendly Package",
    category: "Cleanup Service"
  },
  {
    src: "/enchanted-forest-party-theme-decorations.jpg",
    alt: "Enchanted forest theme decorations",
    package: "Eco-Friendly Package",
    category: "Nature Theme"
  },

  // Additional General Images
  {
    src: "/balloon-artist-making-animals.jpg",
    alt: "Balloon artist entertainment",
    package: "Premium Package",
    category: "Entertainment"
  },
  {
    src: "/party-catering-food-spread.jpg",
    alt: "Party catering food spread",
    package: "Premium Package",
    category: "Catering"
  },
  {
    src: "/videographer-filming-party.jpg",
    alt: "Professional videography service",
    package: "Premium Package",
    category: "Videography"
  },
  {
    src: "/party-costume-characters.jpg",
    alt: "Themed costume characters",
    package: "Premium Package",
    category: "Costumes"
  }
]

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All")
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [toastMessage, setToastMessage] = useState<string>("") 
  const [showToast, setShowToast] = useState(false)

  const packages = ["All", "Basic Package", "Premium Package", "Eco-Friendly Package"]
  
  const filteredImages = selectedFilter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.package === selectedFilter)

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  const handleImageHover = (image: GalleryImage) => {
    setToastMessage(`${image.package} - ${image.category || 'Gallery'}`)
    setShowToast(true)
  }

  const handleImageLeave = () => {
    setShowToast(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Gallery
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Explore our amazing birthday party celebrations and get inspired for your special day
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {packages.map((pkg) => (
            <button
              key={pkg}
              onClick={() => setSelectedFilter(pkg)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedFilter === pkg
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pkg}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredImages.map((image, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-purple-200"
              onClick={() => openModal(index)}
              onMouseEnter={() => {
                setHoveredImage(`${index}-${image.package}`)
                handleImageHover(image)
              }}
              onMouseLeave={() => {
                setHoveredImage(null)
                handleImageLeave()
              }}
            >
              <div className="aspect-square relative">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                
                {/* View Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                {/* Package Badge - Always visible on mobile, hover on desktop */}
                <div className="absolute top-3 left-3">
                  <span className={`
                    inline-block px-3 py-1 rounded-full text-xs font-semibold text-white transition-all duration-300 shadow-md
                    ${image.package === "Basic Package" ? "bg-teal-500" : 
                      image.package === "Premium Package" ? "bg-amber-500" : "bg-blue-500"}
                    md:opacity-0 md:group-hover:opacity-100 opacity-100
                  `}>
                    {image.package}
                  </span>
                </div>

                {/* Category Badge */}
                {image.category && (
                  <div className="absolute bottom-3 right-3 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300">
                    <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-white/90 text-gray-700 shadow-sm">
                      {image.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Tooltip for Desktop */}
              {hoveredImage === `${index}-${image.package}` && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg border border-gray-700 hidden md:block">
                  <div className="text-center">
                    <div className="font-semibold">{image.package}</div>
                    {image.category && (
                      <div className="text-xs text-gray-300 mt-1">{image.category}</div>
                    )}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
            <p className="text-gray-500">Try selecting a different package filter</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-lg">
            Showing <span className="font-semibold text-purple-600">{filteredImages.length}</span> images
            {selectedFilter !== "All" && (
              <span> from <span className="font-semibold">{selectedFilter}</span></span>
            )}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Click on any image to view in fullscreen gallery mode
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        type="info"
        duration={2000}
      />

      {/* Image Gallery Modal */}
      <ImageGalleryModal 
        images={filteredImages.map(img => img.src)}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={selectedImageIndex}
      />
    </div>
  )
}