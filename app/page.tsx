"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Image from "next/image"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeFilter, setActiveFilter] = useState("All")
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    location: '',
    guests: '',
    budget: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // Validation handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow letters, spaces, and common name characters
    const nameRegex = /^[a-zA-Z\s.'\-]*$/
    if (nameRegex.test(value)) {
      setFormData(prev => ({ ...prev, name: value }))
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and limit to 10 digits
    const phoneRegex = /^[0-9]*$/
    if (phoneRegex.test(value) && value.length <= 10) {
      setFormData(prev => ({ ...prev, phone: value }))
    }
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      setSubmitMessage('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    setSubmitMessage('')
    
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitMessage('Thank you for your inquiry! We will contact you soon.')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          location: '',
          guests: '',
          budget: '',
          specialRequests: ''
        })
      } else {
        setSubmitMessage(result.error || 'Failed to submit enquiry. Please try again.')
      }
    } catch (error) {
      console.error('Enquiry submission error:', error)
      setSubmitMessage('Failed to submit enquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const heroSlides = [
    {
      title: "Perfect Party Planning",
      subtitle: "Make birthday celebrations memorable",
      backgroundImage: "/hero-background-parallax.jpg",
      mainImage: "/hero-background-parallax.jpg",
    },
    {
      title: "Magical Birthday Experiences",
      subtitle: "Creating unforgettable moments for your special day",
      backgroundImage: "/red-luxury-party-tent-outdoor.jpg",
      mainImage: "/red-luxury-party-tent-outdoor.jpg",
    },
    {
      title: "Stress-Free Celebrations",
      subtitle: "Let us handle everything while you enjoy the party",
      backgroundImage: "/hero3.PNG",
      mainImage: "/hero3.PNG",
    },
  ]

  const addOnExperiences = [
    {
      id: 1,
      title: "Professional Photography",
      description: "Capture every magical moment with our expert photographers",
      category: "Photography",
      price: "₹2,500",
      image: "/professional-party-photographer.jpg",
    },
    {
      id: 2,
      title: "Magic Show",
      description: "Enchant your guests with amazing magic tricks and illusions",
      category: "Entertainment",
      price: "₹3,000",
      image: "/magician-performing-at-party.jpg",
    },
    {
      id: 3,
      title: "Face Painting",
      description: "Transform kids into their favorite characters with colorful face art",
      category: "Entertainment",
      price: "₹1,500",
      image: "/face-painting-at-children-party.jpg",
    },
    {
      id: 4,
      title: "DJ & Music",
      description: "Keep the party alive with professional DJ and sound system",
      category: "Entertainment",
      price: "₹4,000",
      image: "/dj-playing-music-at-party.jpg",
    },
    {
      id: 5,
      title: "Balloon Sculptor",
      description: "Create amazing balloon animals and shapes for endless fun",
      category: "Entertainment",
      price: "₹1,200",
      image: "/balloon-artist-making-animals.jpg",
    },
    {
      id: 6,
      title: "Catering Service",
      description: "Delicious food and snacks to keep your guests satisfied",
      category: "Catering",
      price: "₹150/person",
      image: "/party-catering-food-spread.jpg",
    },
    {
      id: 7,
      title: "Videography",
      description: "Professional video coverage to preserve your special moments",
      category: "Photography",
      price: "₹5,000",
      image: "/videographer-filming-party.jpg",
    },
    {
      id: 8,
      title: "Themed Costumes",
      description: "Character costumes and props to match your party theme",
      category: "Decorations",
      price: "₹800",
      image: "/party-costume-characters.jpg",
    },
  ]

  const filterCategories = ["All", "Entertainment", "Photography", "Catering", "Decorations"]

  const filteredExperiences =
    activeFilter === "All" ? addOnExperiences : addOnExperiences.filter((exp) => exp.category === activeFilter)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Global Navbar is rendered in Root Layout */}

      {/* Hero Section - Fullscreen Carousel */}
      <section 
        className="relative px-6 overflow-hidden min-h-[400px] flex items-center cursor-pointer" 
        onClick={scrollToContact}
      >
        {/* Background carousel layers */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
            aria-hidden={currentSlide !== index}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />

        {/* Social Media Icons */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
          <a
            href="https://www.instagram.com/bookmybirthdayparty"
            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group"
          >
            <svg className="w-5 h-5 text-white group-hover:text-yellow-300" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
              <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/bookmybirthdayparty"
            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group"
          >
            <svg className="w-5 h-5 text-white group-hover:text-yellow-300" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
              <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z"></path>
            </svg>  
          </a>
          <a
            href="https://www.youtube.com/bookmybirthdayparty"
            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group"
          >
            <svg className="w-5 h-5 text-white group-hover:text-yellow-300" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
              <path d="M 24.402344 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.402344 16.898438 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.902344 40.5 17.898438 41 24.5 41 C 31.101563 41 37.097656 40.5 40.597656 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.097656 35.5 C 45.5 33 46 29.402344 46.097656 24.902344 C 46.097656 20.402344 45.597656 16.800781 45.097656 14.300781 C 44.699219 12.101563 42.800781 10.5 40.597656 10 C 37.097656 9.5 31 9 24.402344 9 Z M 24.402344 11 C 31.601563 11 37.398438 11.597656 40.199219 12.097656 C 41.699219 12.5 42.898438 13.5 43.097656 14.800781 C 43.699219 18 44.097656 21.402344 44.097656 24.902344 C 44 29.199219 43.5 32.699219 43.097656 35.199219 C 42.800781 37.097656 40.800781 37.699219 40.199219 37.902344 C 36.597656 38.601563 30.597656 39.097656 24.597656 39.097656 C 18.597656 39.097656 12.5 38.699219 9 37.902344 C 7.5 37.5 6.300781 36.5 6.101563 35.199219 C 5.300781 32.398438 5 28.699219 5 25 C 5 20.398438 5.402344 17 5.800781 14.902344 C 6.101563 13 8.199219 12.398438 8.699219 12.199219 C 12 11.5 18.101563 11 24.402344 11 Z M 19 17 L 19 33 L 33 25 Z M 21 20.402344 L 29 25 L 21 29.597656 Z"></path>
            </svg>
          </a>
        </div>

        <div className="max-w-7xl mx-auto flex items-center relative z-10 w-full">
          <div className="flex-1 max-w-2xl md:ml-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Birthday chaos? Not on our watch.
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
              From themed décor and entertainment to clean-up, we handle it all so you can enjoy the moment.
            </p>
            <Button 
              onClick={(e) => {
                e.stopPropagation() // Prevent hero section click
                const element = document.getElementById('packages')
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  })
                }
              }}
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-none text-lg font-semibold transition-all duration-300 cursor-pointer"
            >
              Let's Plan a Party
            </Button>
          </div>
        </div>
      </section>

      {/* Planning Difficulties Section */}
      <section 
        className="px-6 py-16 bg-white relative"
        style={{
          backgroundImage: 'url("/bg.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/60" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Challenges in planning a birthday party
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 items-start">
            {/* Choosing decorations */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <svg className="h-16 w-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Balloons */}
                  <circle cx="25" cy="35" r="8" fill="#FF6B6B" stroke="#E74C3C" strokeWidth="1.5"/>
                  <circle cx="45" cy="28" r="9" fill="#4ECDC4" stroke="#26D0CE" strokeWidth="1.5"/>
                  <circle cx="65" cy="32" r="8" fill="#FFE66D" stroke="#FFC107" strokeWidth="1.5"/>
                  <circle cx="80" cy="38" r="7" fill="#A8E6CF" stroke="#52C41A" strokeWidth="1.5"/>
                  
                  {/* Balloon strings */}
                  <line x1="25" y1="43" x2="25" y2="65" stroke="#666" strokeWidth="1"/>
                  <line x1="45" y1="37" x2="45" y2="65" stroke="#666" strokeWidth="1"/>
                  <line x1="65" y1="40" x2="65" y2="65" stroke="#666" strokeWidth="1"/>
                  <line x1="80" y1="45" x2="80" y2="65" stroke="#666" strokeWidth="1"/>
                  
                  {/* Party banner */}
                  <path d="M15 70 L85 70 L85 75 L80 80 L75 75 L70 80 L65 75 L60 80 L55 75 L50 80 L45 75 L40 80 L35 75 L30 80 L25 75 L20 80 L15 75 Z" fill="#FF9FF3" stroke="#E91E63" strokeWidth="1"/>
                  
                  {/* Party confetti */}
                  <circle cx="20" cy="20" r="2" fill="#FF6B6B"/>
                  <circle cx="75" cy="15" r="1.5" fill="#4ECDC4"/>
                  <circle cx="85" cy="25" r="2" fill="#FFE66D"/>
                  <circle cx="10" cy="50" r="1.5" fill="#A8E6CF"/>
                  <circle cx="90" cy="55" r="2" fill="#FF9FF3"/>
                  
                  {/* Streamers */}
                  <path d="M10 10 Q15 15 20 10 T30 15" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M70 12 Q75 17 80 12 T90 17" fill="none" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-base md:text-lg font-medium text-gray-800">Choosing decorations</div>
            </div>

            {/* Finding the right venue */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <svg className="h-16 w-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Main venue building */}
                  <rect x="20" y="40" width="60" height="40" rx="3" fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5"/>
                  <rect x="25" y="45" width="50" height="30" rx="2" fill="#BBDEFB" stroke="#1565C0" strokeWidth="1"/>
                  
                  {/* Building roof */}
                  <path d="M15 40 L50 25 L85 40 Z" fill="#F44336" stroke="#D32F2F" strokeWidth="1.5"/>
                  
                  {/* Windows */}
                  <rect x="30" y="50" width="8" height="8" fill="#FFE082" stroke="#F57F17" strokeWidth="1"/>
                  <rect x="42" y="50" width="8" height="8" fill="#FFE082" stroke="#F57F17" strokeWidth="1"/>
                  <rect x="54" y="50" width="8" height="8" fill="#FFE082" stroke="#F57F17" strokeWidth="1"/>
                  <rect x="66" y="50" width="8" height="8" fill="#FFE082" stroke="#F57F17" strokeWidth="1"/>
                  
                  {/* Door */}
                  <rect x="45" y="65" width="10" height="15" rx="1" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
                  <circle cx="52" cy="72" r="1" fill="#FFD54F"/>
                  
                  {/* Location pin */}
                  <path d="M50 15 C55 15 59 19 59 24 C59 29 50 40 50 40 S41 29 41 24 C41 19 45 15 50 15 Z" fill="#FF5722" stroke="#D84315" strokeWidth="1.5"/>
                  <circle cx="50" cy="24" r="4" fill="#FFFFFF" stroke="#FF5722" strokeWidth="1"/>
                  
                  {/* Trees around venue */}
                  <circle cx="10" cy="65" r="6" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1"/>
                  <rect x="8" y="71" width="4" height="8" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
                  
                  <circle cx="90" cy="65" r="6" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1"/>
                  <rect x="88" y="71" width="4" height="8" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
                  
                  {/* Search/magnifying elements */}
                  <circle cx="75" cy="25" r="8" fill="none" stroke="#9C27B0" strokeWidth="2"/>
                  <path d="M81 31 L87 37" stroke="#9C27B0" strokeWidth="2" strokeLinecap="round"/>
                  
                  {/* Question marks for searching */}
                  <text x="20" y="25" fill="#FF9800" fontSize="8" fontWeight="bold">?</text>
                  <text x="80" y="55" fill="#FF9800" fontSize="8" fontWeight="bold">?</text>
                  
                  {/* Ground/grass */}
                  <rect x="0" y="80" width="100" height="20" fill="#8BC34A" stroke="none"/>
                  
                  {/* Small decorative elements */}
                  <circle cx="15" cy="85" r="1" fill="#FFEB3B"/>
                  <circle cx="25" cy="87" r="1" fill="#FFEB3B"/>
                  <circle cx="75" cy="85" r="1" fill="#FFEB3B"/>
                  <circle cx="85" cy="87" r="1" fill="#FFEB3B"/>
                </svg>
              </div>
              <div className="text-base md:text-lg font-medium text-gray-800">Finding the right venue</div>
            </div>

            {/* Managing setup */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <svg className="h-16 w-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Person figure */}
                  <circle cx="50" cy="25" r="8" fill="#FFB74D" stroke="#F57C00" strokeWidth="1.5"/>
                  <rect x="45" y="33" width="10" height="15" rx="2" fill="#2196F3" stroke="#1976D2" strokeWidth="1"/>
                  <rect x="42" y="48" width="5" height="12" rx="1" fill="#4CAF50" stroke="#388E3C" strokeWidth="1"/>
                  <rect x="53" y="48" width="5" height="12" rx="1" fill="#4CAF50" stroke="#388E3C" strokeWidth="1"/>
                  
                  {/* Arms */}
                  <rect x="40" y="35" width="4" height="10" rx="1" fill="#FFB74D" stroke="#F57C00" strokeWidth="1"/>
                  <rect x="56" y="35" width="4" height="10" rx="1" fill="#FFB74D" stroke="#F57C00" strokeWidth="1"/>
                  
                  {/* Tools and setup items */}
                  {/* Ladder */}
                  <rect x="15" y="30" width="3" height="35" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
                  <rect x="22" y="30" width="3" height="35" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
                  <rect x="15" y="35" width="10" height="2" fill="#8D6E63"/>
                  <rect x="15" y="42" width="10" height="2" fill="#8D6E63"/>
                  <rect x="15" y="49" width="10" height="2" fill="#8D6E63"/>
                  <rect x="15" y="56" width="10" height="2" fill="#8D6E63"/>
                  
                  {/* Toolbox */}
                  <rect x="70" y="55" width="18" height="8" rx="1" fill="#F44336" stroke="#D32F2F" strokeWidth="1"/>
                  <rect x="72" y="50" width="14" height="5" rx="1" fill="#757575" stroke="#424242" strokeWidth="1"/>
                  <circle cx="74" cy="52" r="1" fill="#FFD54F"/>
                  <circle cx="78" cy="52" r="1" fill="#FFD54F"/>
                  <circle cx="82" cy="52" r="1" fill="#FFD54F"/>
                  
                  {/* Table */}
                  <rect x="30" y="65" width="25" height="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
                  <rect x="32" y="68" width="2" height="8" fill="#8D6E63"/>
                  <rect x="51" y="68" width="2" height="8" fill="#8D6E63"/>
                  
                  {/* Setup items on table */}
                  <circle cx="38" cy="63" r="2" fill="#E91E63"/>
                  <rect x="43" y="61" width="3" height="4" fill="#9C27B0"/>
                  <circle cx="49" cy="63" r="1.5" fill="#00BCD4"/>
                  
                  {/* Motion lines */}
                  <path d="M62 38 L66 34" stroke="#FFC107" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M64 40 L68 36" stroke="#FFC107" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M66 42 L70 38" stroke="#FFC107" strokeWidth="2" strokeLinecap="round"/>
                  
                  {/* Setup progress indicator */}
                  <circle cx="85" cy="20" r="3" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1"/>
                  <path d="M83 20 L84.5 21.5 L87 18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-base md:text-lg font-medium text-gray-800">Managing setup</div>
            </div>

            {/* Post-party cleaning */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <svg viewBox="0 0 72 72" id="emoji" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="color"> <path fill="#f1b31c" d="M20.6736,59.9844c1.2983-1.388,3.5826-3.6053,4.8424-4.9521-1.4537.886-4.2076,3.37-5.6142,4.2624A46.0024,46.0024,0,0,1,14.41,54.5235a23.6424,23.6424,0,0,0,9.05-4.15,29.78,29.78,0,0,1-10.084,2.9036,47.9434,47.9434,0,0,1-3.4267-5.45c7.1521,1.9446,14.9291-.92,19.73-5.92,1.2414.7174,2.835,1.59,4.1359,2.2474a3.2052,3.2052,0,0,1,1.6174,1.9094c1.7464,4.6657.728,8.7784-2.4318,12.475-1.3221,1.5467-3.2938,3.9123-5.0353,4.9607A33.9572,33.9572,0,0,1,20.6736,59.9844Z"></path> <path fill="#a57939" d="M36.41,39.1206l-2.5918-1.5c.684-1.1936,1.3464-2.3568,2.0156-3.516Q43.0888,21.5374,50.3463,8.9716c.0989-.1713.1948-.3449.3033-.51A1.4973,1.4973,0,0,1,53.234,9.9742c-.81,1.4511-1.6532,2.8832-2.484,4.3224Q44.3857,25.322,38.02,36.347C37.4975,37.2525,36.9705,38.1556,36.41,39.1206Z"></path> <path fill="#92d3f5" d="M35.17,44.2183,30.05,41.2608c.5348-.9183,1.0216-1.82,1.5756-2.6789a.9318.9318,0,0,1,1.31-.3181q1.7127.9444,3.3875,1.9568a.9384.9384,0,0,1,.377,1.2973C36.2334,42.4269,35.696,43.3,35.17,44.2183Z"></path> </g> <g id="line"> <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.6736,59.9844c1.2983-1.388,3.5826-3.6053,4.8424-4.9521-1.4537.886-4.2076,3.37-5.6142,4.2624A46.0024,46.0024,0,0,1,14.41,54.5235a23.6424,23.6424,0,0,0,9.05-4.15,29.78,29.78,0,0,1-10.084,2.9036,47.9434,47.9434,0,0,1-3.4267-5.45c7.1521,1.9446,14.9291-.92,19.73-5.92,1.2414.7174,2.835,1.59,4.1359,2.2474a3.2052,3.2052,0,0,1,1.6174,1.9094c1.7464,4.6657.728,8.7784-2.4318,12.475-1.3221,1.5467-3.2938,3.9123-5.0353,4.9607A33.9572,33.9572,0,0,1,20.6736,59.9844Z"></path> <path fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2" d="M36.41,39.1206l-2.5918-1.5c.684-1.1936,1.3464-2.3568,2.0156-3.516Q43.0888,21.5374,50.3463,8.9716c.0989-.1713.1948-.3449.3033-.51A1.4973,1.4973,0,0,1,53.234,9.9742c-.81,1.4511-1.6532,2.8832-2.484,4.3224Q44.3857,25.322,38.02,36.347C37.4975,37.2525,36.9705,38.1556,36.41,39.1206Z"></path> <path fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2" d="M35.17,44.2183,30.05,41.2608c.5348-.9183,1.0216-1.82,1.5756-2.6789a.9318.9318,0,0,1,1.31-.3181q1.7127.9444,3.3875,1.9568a.9384.9384,0,0,1,.377,1.2973C36.2334,42.4269,35.696,43.3,35.17,44.2183Z"></path> <circle cx="33.0575" cy="63.3582" r="1.4081"></circle> <circle cx="36.2993" cy="59.2947" r="1.1846"></circle> <circle cx="36.2993" cy="62.2939" r="0.9413"></circle> </g> </g>
                </svg>
              </div>
              <div className="text-base md:text-lg font-medium text-gray-800">Post-party cleaning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section (Redesigned) */}
      <section 
        className="px-6 py-20 bg-white-200 relative"
        style={{
          backgroundImage: 'url("/bg.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/60" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose <span className="bg-gradient-to-r from-fuchsia-500 to-amber-500 bg-clip-text text-transparent">BookMyBirthdayParty?</span>
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            We make party planning effortless with our comprehensive services and attention to detail
          </p>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center mb-16">
            <div>
              <img
                src="/why_us3.jpeg"
                alt="Planning and coordination"
                className="w-full max-w-md mx-auto md:max-w-none rounded-2xl shadow-sm object-cover h-64 md:h-80"
              />
            </div>
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-rose-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20l-7-6 7-6 7 6-7 6z" />
                    <path d="M5 8l7-6 7 6" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                  Seamless Planning & Coordination
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We handle every detail, from concept to cleanup, ensuring a smooth and stress-free experience. Our expert
                planners coordinate all vendors and activities so you can simply enjoy the celebration.
              </p>
            </div>
          </div>

          {/* Row 2 (image right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center mb-16">
            <div className="order-2 md:order-1">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-rose-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12h8M12 8v8" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                  Unforgettable & Unique Experiences
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                From dazzling magic shows to interactive game hosts and custom decorations, we craft personalized
                celebrations that match your child’s dreams and create lasting memories for everyone.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/golden-party-decorations-celebration-ready.jpg"
                alt="Unique birthday experiences"
                className="w-full max-w-md mx-auto md:max-w-none rounded-2xl shadow-sm object-cover h-64 md:h-80"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <img
                src="/atmospheric-party-background.jpg"
                alt="Transparent pricing and value"
                className="w-full max-w-md mx-auto md:max-w-none rounded-2xl shadow-sm object-cover h-64 md:h-80"
              />
            </div>
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-rose-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 000-7.8z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                  Transparent Pricing & Value
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Enjoy clear, upfront pricing with no hidden fees. Our customizable packages are designed for various
                budgets, delivering exceptional value without compromising on quality or fun.
              </p>
            </div>
          </div>
        </div>

      {/* Company Value Section */}
        <div className="max-w-6xl mx-auto opacity-80">
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-2xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M22.53 2.53033C22.8229 2.23743 22.8229 1.76256 22.53 1.46967C22.2371 1.17678 21.7622 1.17678 21.4693 1.46967L19.0674 3.87162C19.2692 4.01476 19.4617 4.17674 19.6425 4.35756C19.8232 4.53824 19.985 4.7306 20.1281 4.93221L22.53 2.53033Z" fill="#1C274C"></path> <path opacity="0.5" d="M2.44853 11.4112L3.18962 12.6294C5.22275 15.9716 8.02819 18.777 11.3703 20.8102L12.5886 21.5514C14.4872 22.5205 16.9425 21.8979 18.0027 19.8899C18.5037 18.941 18.9798 17.8776 19.2819 16.8209C19.7699 15.1139 19.9408 13.5611 19.9945 12.4895C20.0266 11.8492 20.0426 11.529 19.8902 11.1334C19.7378 10.7378 19.4738 10.4738 18.9456 9.9457L14.1203 5.12119C13.6288 4.62976 13.383 4.38404 13.0133 4.23177C12.6435 4.07951 12.3489 4.08069 11.7597 4.08306C10.6466 4.08753 8.97556 4.20429 7.17896 4.71789C6.12226 5.01998 5.05883 5.49608 4.11001 5.99706C2.10201 7.05728 1.47943 9.51262 2.44853 11.4112Z" fill="#1C274C"></path> <path d="M19.6426 4.35756C17.9067 2.62162 15.0922 2.62175 13.3562 4.35764L13.3184 4.39549C13.5498 4.55102 13.774 4.77521 14.1201 5.12119L18.9454 9.9457C19.2472 10.2475 19.4628 10.463 19.6205 10.6662L19.6427 10.644C21.3786 8.90807 21.3785 6.09349 19.6426 4.35756Z" fill="#1C274C"></path> </g></svg> 
              </div>
              <h3 className="text-xl font-extrabold text-black mb-2">Complete Cleanup</h3>
              <p className="text-gray-600 leading-relaxed">
                We handle all the post-party cleanup so you can focus on enjoying the memories
              </p>
            </div>


            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="a"></g> <g id="b"></g> <g id="c"></g> <g id="d"> <path d="M15.38,57.49l10.23-8.11-.33-5.52-.6-4.34-5.4-.78-4.3,17.85c-.05,.35,.1,.7,.39,.9h0Z" fill="#0acffb" id="e"></path> <path d="M5.11,25.88l13.04,7.2,2.98-1.99,3.36-3-.35-4.28-18.3,1.43c-.35,.06-.64,.31-.73,.65Z" fill="#6df4c0" id="f"></path> <path d="M19.29,38.75l6,5.11,5.88-3.16,.83-6.08-4.88-4.62-5.98,1.09L5.11,25.88c-.12,.33-.04,.7,.21,.95l13.97,11.91Z" fill="#9af6d3" id="g"></path> <path d="M48.64,57.53l-2.7-9.24-7.23-4.43-3.87-.82-2.85,4.94,15.65,9.61c.32,.18,.71,.16,1-.06h0Z" fill="#fdda5c" id="h"></path> <path d="M44.71,38.75l.12-5.4-1.96-2.26-5.39-1.48-5.47,5.01,1.28,6.31,5.43,2.94,9.93,13.67c.3-.21,.44-.58,.37-.93l-4.3-17.85Z" fill="#fce87b" id="i"></path> <path d="M58.93,25.87l-10.23,.78-5.84,4.44,1.85,7.66,13.97-11.91c.27-.24,.37-.62,.25-.97h0Z" fill="#d6b1ed" id="j"></path> <path d="M39.85,23.81c-3.16-3.56-5.62-2.78-7.85-.61l-2.78,5.56,2.78,5.86,10.86-3.53,16.07-5.22c-.11-.35-.41-.6-.77-.63l-18.3-1.43Z" fill="#e5c9f3" id="k"></path> <path d="M32,6.35l-2.58,12.54,2.58,4.32,7.85,.61-7.01-16.97c-.16-.31-.49-.51-.84-.49h0Z" fill="#fd91ba" id="l"></path> <path d="M31.65,6.35c-.22,.09-.4,.27-.49,.49l-7.01,16.97-3.01,7.28,10.86,3.53V6.35c-.12-.02-.23-.02-.35,0h0Z" fill="#ffa6c5" id="m"></path> <path d="M32,47.98l6.71-4.12-6.71-9.24-6.71,9.24-9.9,13.63c.28,.22,.66,.25,.97,.1l15.65-9.61Z" fill="#62d9fa" id="n"></path> <path d="M58.93,25.87l-15.14,9.05-.92-3.83,16.07-5.22Z" fill="#ca96e5" id="o"></path> <path d="M48.64,57.53l-13.29-11.61,3.36-2.06,9.93,13.67Z" fill="#f8c228" id="p"></path> <path d="M15.36,57.53l6.93-16.22,3,2.55-9.93,13.67Z" fill="#00bff8" id="q"></path> <path d="M5.07,25.87l17.57,1.58-1.5,3.64L5.07,25.87Z" fill="#3aedbc" id="r"></path> <path d="M32,6.3l3.93,17.2-3.93-.3V6.3Z" fill="#fc76a8" id="s"></path> <path d="M58.24,24.24l-17.69-1.38-6.78-16.4c-.4-.97-1.53-1.44-2.5-1.04-.47,.2-.84,.56-1.04,1.04l-6.78,16.4-17.69,1.38c-.51,.04-.97,.28-1.31,.66-.33,.39-.49,.88-.45,1.39,.04,.5,.28,.98,.67,1.31l13.5,11.51-4.16,17.25c-.25,1.03,.39,2.06,1.41,2.31,.49,.12,1.02,.03,1.45-.23l15.12-9.29,15.12,9.29c.92,.56,2.09,.26,2.63-.63,.27-.44,.35-.95,.23-1.45l-4.16-17.25,13.5-11.51c.8-.68,.9-1.89,.21-2.7-.33-.38-.8-.63-1.31-.67Zm-2.92,1.76l-22.32,7.25v-8.97l22.32,1.71Zm-17.01-3.31l-5.31-.41V9.84l5.31,12.85Zm-7.31-12.85v23.41l-8.53-2.77,2.6-6.28,5.93-14.35Zm-10.43,20.02l-11.83-3.84,13.86-1.08-2.03,4.92Zm-12.5-1.96l22.31,7.25-5.27,7.25L8.07,27.89Zm11.81,12.67l4.05,3.46-7.31,10.06,3.26-13.52Zm-1.67,14.74l13.79-18.98,5.27,7.25-19.06,11.73Zm20.24-10.11l7.31,10.06-11.85-7.27,4.54-2.79Zm8.96,8.93l-13.79-18.98,8.53-2.77,5.27,21.75Zm-2.11-17.2l-1.25-5.18,11.82-3.84-10.58,9.02Z"></path> </g> <g id="t"></g> <g id="u"></g> <g id="v"></g> <g id="w"></g> <g id="x"></g> <g id="y"></g> <g id="a`"></g> <g id="aa"></g> <g id="ab"></g> <g id="ac"></g> <g id="ad"></g> <g id="ae"></g> <g id="af"></g> <g id="ag"></g> <g id="ah"></g> <g id="ai"></g> <g id="aj"></g> <g id="ak"></g> <g id="al"></g> <g id="am"></g> <g id="an"></g> <g id="ao"></g> <g id="ap"></g> <g id="aq"></g> <g id="ar"></g> <g id="as"></g> <g id="at"></g> <g id="au"></g> <g id="av"></g> <g id="aw"></g> <g id="ax"></g> <g id="ay"></g> <g id="b`"></g> <g id="ba"></g> <g id="bb"></g> <g id="bc"></g> <g id="bd"></g> <g id="be"></g> <g id="bf"></g> <g id="bg"></g> <g id="bh"></g> <g id="bi"></g> <g id="bj"></g> <g id="bk"></g> <g id="bl"></g> <g id="bm"></g> </g></svg>
              </div>
              <h3 className="text-xl font-extrabold text-black mb-2">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                High-quality decorations and materials that create stunning party atmospheres
              </p>
            </div>


            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-pink-100 rounded-2xl flex items-center justify-center">
                
              </div>
              <h3 className="text-xl font-extrabold text-black mb-2">Customizable Themes</h3>
              <p className="text-gray-600 leading-relaxed">Personalized decorations and themes tailored to your unique vision</p>
            </div>
            
          </div>
        </div>
      </section>
      {/* Packages Section */}
      <section 
        id="packages" 
        className="px-6 py-16 bg-gray-50 relative"
        style={{
          backgroundImage: 'url("/bg.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gray-50/60" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <Link href="/packages/basic" className="block">
              <Card className="relative overflow-hidden rounded-3xl border-0 shadow-lg h-[600px] hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/colorful-balloons-party-decoration.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-teal-900/70 to-teal-800/80" />

                <CardContent className="relative z-10 p-8 h-full flex flex-col text-white">
                  <div className="mb-6">
                    <div
                      className="text-sm font-medium text-teal-200 mb-2"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                    >
                      Basic Package
                    </div>
                    <h3 className="text-2xl font-bold mb-4" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                      Perfect for Intimate Celebrations
                    </h3>
                    <div className="text-5xl font-bold mb-2" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                      ₹15,000
                    </div>
                    <div className="text-teal-200 text-sm" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                      Starting Price
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-teal-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Basic Decorations & Setup</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-teal-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Basic Party Coordination</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-teal-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Complete Cleanup Service</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-teal-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Perfect for 10-15 Guests</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-teal-200 hover:bg-teal-100 text-teal-900 font-semibold py-3 rounded-full transition-all duration-200">
                      View Details →
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        const element = document.getElementById('contact')
                        if (element) {
                          element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                          })
                        }
                      }}
                      variant="outline"
                      className="w-full border-2 border-teal-200 text-teal-200 hover:bg-teal-200 hover:text-teal-900 font-semibold py-3 rounded-full bg-transparent transition-all duration-200 cursor-pointer"
                    >
                      Book a Call →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Premium Package */}
            <Link href="/packages/premium" className="block">
              <Card className="relative overflow-hidden rounded-3xl border-0 shadow-lg h-[600px] hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/party-setup.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 to-amber-800/80" />

                <CardContent className="relative z-10 p-8 h-full flex flex-col text-white">
                  <div className="mb-6">
                    <div
                      className="text-sm font-medium text-amber-200 mb-2"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                    >
                      Premium Package
                    </div>
                    <h3 className="text-2xl font-bold mb-4" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                      Exclusive Celebration with Style
                    </h3>
                    <div className="text-5xl font-bold mb-2" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                      ₹25,000
                    </div>
                    <div className="text-amber-200 text-sm" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                      Starting Price
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Premium Decorations & Themes</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Professional Entertainment</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Photography Session Included</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Perfect for 20-30 guests</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-amber-200 hover:bg-amber-100 text-amber-900 font-semibold py-3 rounded-full transition-all duration-200">
                      View Details →
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        const element = document.getElementById('contact')
                        if (element) {
                          element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                          })
                        }
                      }}
                      variant="outline"
                      className="w-full border-2 border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-amber-900 font-semibold py-3 rounded-full bg-transparent transition-all duration-200 cursor-pointer"
                    >
                      Book a Call →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Eco-Friendly Package */}
            <Link href="/packages/eco-friendly" className="block">
              <Card className="relative overflow-hidden rounded-3xl border-0 shadow-lg h-[600px] hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/eco-friendly-birthday-party-with-natural-decoratio.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-800/80" />

                <CardContent className="relative z-10 p-8 h-full flex flex-col text-white">
                  <div className="mb-6">
                    <div
                      className="text-sm font-medium text-blue-200 mb-2"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                    >
                      Eco-Friendly Package
                    </div>
                    <h3 className="text-2xl font-bold mb-4" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                      Sustainable celebrations with Style
                    </h3>
                    <div className="text-5xl font-bold mb-2" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                      ₹18,000
                    </div>
                    <div className="text-blue-200 text-sm" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                      Starting Price
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Biodegradable Decorations</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Organic Party Treats</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Eco-Friendly Cleanup</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Perfect for 15-25 guests</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-blue-200 hover:bg-blue-100 text-blue-900 font-semibold py-3 rounded-full transition-all duration-200">
                      View Details →
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        const element = document.getElementById('contact')
                        if (element) {
                          element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                          })
                        }
                      }}
                      variant="outline"
                      className="w-full border-2 border-blue-200 text-blue-200 hover:bg-blue-200 hover:text-blue-900 font-semibold py-3 rounded-full bg-transparent transition-all duration-200 cursor-pointer"
                    >
                      Book a Call →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Add-on Filters Section */}
      <section 
        className="px-6 py-16 bg-white relative"
        style={{
          backgroundImage: 'url("/bg.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/60" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Enhance Your Experience</h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Add special touches to make your celebration even more memorable
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filterCategories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={`rounded-full px-6 py-2 transition-all duration-200 ${
                  activeFilter === category
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-gray-300 bg-transparent hover:border-purple-300 hover:text-purple-600"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredExperiences.map((experience) => (
              <Card
                key={experience.id}
                className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:border-purple-200"
              >
                <CardContent className="p-0">
                  <img
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {experience.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{experience.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{experience.description}</p>
                    {/* <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-full font-semibold">
                      Add to Package
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (Redesigned) */}
      <section 
        id="contact" 
        className="px-6 py-20 bg-white relative"
        style={{
          backgroundImage: 'url("/bg.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/60" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center leading-tight mb-3">
            Let's plan your <span className="bg-gradient-to-r from-fuchsia-500 to-amber-500 bg-clip-text text-transparent">perfect party</span>
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Tell us about your vision, and we'll create a customized proposal that brings your child's birthday dreams to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Left: Quote Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-7">
              <div className="text-left mb-5">
                <h3 className="text-xl font-semibold text-gray-900">Get Your Free Quote</h3>
              </div>

              <form onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <Input 
                    placeholder="Enter your full name" 
                    className="w-full" 
                    value={formData.name}
                    onChange={handleNameChange}
                    title="Only letters and spaces are allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <Input 
                    placeholder="your@email.com" 
                    type="email" 
                    className="w-full" 
                    value={formData.email}
                    onChange={handleInputChange('email')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <Input 
                    placeholder="9876543210" 
                    type="tel" 
                    className="w-full" 
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    title="Enter 10-digit phone number (numbers only)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                  <Input 
                    type="date" 
                    className="w-full" 
                    value={formData.eventDate}
                    onChange={handleInputChange('eventDate')}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location/City *</label>
                  <select 
                    className="w-full h-11 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.location}
                    onChange={handleInputChange('location')}
                  >
                    <option value="">Select your city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Guests *</label>
                  <select 
                    className="w-full h-11 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.guests}
                    onChange={handleInputChange('guests')}
                  >
                    <option value="">Select range</option>
                    <option value="Under 10">Under 10</option>
                    <option value="10 - 20">10 - 20</option>
                    <option value="20 - 40">20 - 40</option>
                    <option value="40 - 60">40 - 60</option>
                    <option value="60+">60+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range *</label>
                  <select 
                    className="w-full h-11 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.budget}
                    onChange={handleInputChange('budget')}
                  >
                    <option value="">Select budget</option>
                    <option value="₹10k - ₹15k">₹10k - ₹15k</option>
                    <option value="₹15k - ₹25k">₹15k - ₹25k</option>
                    <option value="₹25k - ₹40k">₹25k - ₹40k</option>
                    <option value="₹40k+">₹40k+</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    placeholder="Tell us about your child's interests, theme preferences, or any special requirements..."
                    className="w-full h-28 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.specialRequests}
                    onChange={handleInputChange('specialRequests')}
                  />
                </div>
              </div>

              {submitMessage && (
                <div className={`mb-4 p-3 rounded-md text-sm ${
                  submitMessage.includes('Thank you') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              <div className="mt-6">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl font-semibold text-white bg-gradient-to-r from-fuchsia-500 to-amber-500 hover:from-fuchsia-600 hover:to-amber-600"
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
                </Button>
              </div>
              </form>
            </div>

            {/* Right: Contact Cards */}
            <div className="space-y-4">
              {/* Call */}
              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.09 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.66 12.66 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.66 12.66 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Call Us</div>
                  <div className="font-medium text-gray-900">+91 98331 42424</div>
                  <div className="text-xs text-gray-500">Mon-Sat, 9 AM - 8 PM</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v16H4z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email Us</div>
                  <div className="font-medium text-gray-900">party@bookmybirthdayparty.com</div>
                  <div className="text-xs text-gray-500">We reply within 2 hours</div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-6.5 8-12a8 8 0 10-16 0c0 5.5 8 12 8 12z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Service Areas</div>
                  <div className="font-medium text-gray-900">Mumbai, Delhi, Bangalore</div>
                  <div className="text-xs text-gray-500">Expanding to more cities</div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">WhatsApp</div>
                  <div className="font-medium text-gray-900">+91 98331 42424</div>
                  <div className="text-xs text-gray-500">Quick responses guaranteed</div>
                </div>
              </div>

              {/* Quick Response Note */}
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">
                <div className="text-sm font-semibold text-gray-900 mb-1">Quick Response Guarantee</div>
                <p className="text-sm text-gray-600">
                  We understand birthday planning is time-sensitive. We guarantee a response within 2 hours during
                  business hours, and within 6 hours on weekends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-start gap-1 mb-4 md:mb-0">
            <Image
              src="/logo.png"
              alt="BookMyBirthdayParty"
              width={160}
              height={35}
              className="h-6 w-auto sm:h-8 object-contain"
              priority
            />
            <span className="text-xs text-gray-500 mt-0.5">Celebrate Life!</span>
          </div>
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
              Support
            </a>
          </div>
          <div className="text-gray-500 text-sm">© 2025 BookMyBirthdayParty. All Rights Reserved.</div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  )
}
