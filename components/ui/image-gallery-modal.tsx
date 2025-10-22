"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageGalleryModalProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export default function ImageGalleryModal({ 
  images, 
  isOpen, 
  onClose, 
  initialIndex = 0 
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
        aria-label="Close gallery"
      />
      
      {/* Modal content */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Close button */}
        <Button
          onClick={onClose}
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 border-white/20 text-white"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border-white/20 text-white hidden sm:flex"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={goToNext}
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border-white/20 text-white hidden sm:flex"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Main image */}
        <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Mobile navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              onClick={goToNext}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Thumbnail navigation (desktop only) */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex gap-2 max-w-md overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-white scale-110' 
                    : 'border-white/30 hover:border-white/60'
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}