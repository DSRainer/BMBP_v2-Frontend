"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height (assuming it's the first section)
      const heroSection = document.querySelector('section')
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        const scrollPosition = window.scrollY
        
        // Show the button after scrolling past the hero section
        setIsVisible(scrollPosition > heroHeight)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Check initial scroll position
    handleScroll()

    // Cleanup event listener
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = "9833142424"
    const message = encodeURIComponent("Hey, I would like to Enquiry about your Packages & Services")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    
    window.open(whatsappUrl, '_blank')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-3 lg:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>
    </div>
  )
}