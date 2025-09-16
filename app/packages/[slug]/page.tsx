"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Share2, Camera, Music, Wand2, Palette } from "lucide-react"
import Link from "next/link"

// Import new components
import HeroVideoCard from "@/components/package-details/HeroVideoCard"
import RatingStatsCard from "@/components/package-details/RatingStatsCard"
import ActivitiesIncludedSection from "@/components/package-details/ActivitiesIncludedSection"
import AddOnsSection from "@/components/package-details/AddOnsSection"
import ThemeSelection from "@/components/package-details/ThemeSelection"
import BookingForm from "@/components/package-details/BookingForm"
import MobileThemeSelection from "@/components/package-details/MobileThemeSelection"
import MobileBookingForm from "@/components/package-details/MobileBookingForm"
import ImageGalleryModal from "@/components/ui/image-gallery-modal"

const packages = {
  basic: {
    title: "Basic Package",
    subtitle: "Perfect for Intimate Celebrations",
    price: "₹15,000",
    originalPrice: "₹20,000",
    savings: "₹5,000",
    description:
      "Start your celebration with our Basic Fun Party Package, featuring essential decorations and entertainment options perfect for intimate gatherings and budget-conscious celebrations.",
    heroImage: "/colorful-balloons-party-decoration.jpg",
    features: [
      "Perfect for 15-20 guests",
      "3-Hour Duration",
      "1-Hour Setup",
    ],
    included:[
      "Venue Decoration & Setup",
      "Professional Cleanup Service",
      "Party Coordination",
      "Return Gifts for all Guests",
      "Photography Session",
      "Birthday Cake Cutting Ceremony"
    ],
    themes: [
      {
        id: "simple-balloons",
        category: "Classic",
        title: "Simple Balloon Setup",
        description: "Colorful balloon arrangements to brighten up your space.",
        image: "/colorful-balloons-party-decoration.jpg",
      },
      {
        id: "basic-games",
        category: "Entertainment",
        title: "Basic Party Games",
        description: "Fun interactive games suitable for all ages.",
        image: "/children-playing-party-games.jpg",
      },
      {
        id: "photo-booth-fun",
        category: "Memories",
        title: "Photo Booth Fun",
        description: "Props and backdrops for cute, memorable pictures.",
        image: "/simple-photo-booth-party.jpg",
      },
    ],
    activities: [
      {
        id: "entertainment-coordinator",
        name: "Game Coordinator",
        description: "Professional Entertainment Coordinator",
        icon: "🎮",
        included: true,
        image: "/party-host-entertaining-children-games.jpg",
      },
      {
        id: "plantable-gifts",
        name: "Plantable Return Gifts",
        description: "Eco-friendly take-home presents",
        icon: "🌱",
        included: true,
        image: "/natural-biodegradable-party-decorations.jpg",
      },
      {
        id: "paper-decor",
        name: "Paper Decor Crew",
        description: "Sustainable decoration setup",
        icon: "🎨",
        included: true,
        image: "/natural-biodegradable-party-decorations.jpg",
      },
       {
        id: "photo-booth",
        name: "Photo Booth",
        description: "Eco-friendly photo booth setup",
        icon: "📸",
        included: true,
        image: "/simple-photo-booth-party.jpg",
      },  
    ],
    addOns: [
      {
      id: "photography",
      name: "Professional Photography",
      description: "Professional service included",
      icon: Camera,
      price: 2000,
    },
    {
      id: "dj-music",
      name: "DJ & Music",
      description: "Professional service included",
      icon: Music,
      price: 2000,
    },
    {
      id: "magic-show",
      name: "Magic Show",
      description: "Professional service included",
      icon: Wand2,
      price: 2000,
    },
    {
      id: "face-painting",
      name: "Face Painting",
      description: "Professional service included",
      icon: Palette,
      price: 2000,
    },
    ],
  },
  premium: {
    title: "Premium Package",
    subtitle: "The Ultimate Birthday Experience",
    price: "₹25,000",
    originalPrice: "₹28,000",
    savings: "₹3,000",
    description:
      "Dive into the ultimate birthday celebration with our Premium Fun Party Package, designed to offer an unforgettable experience with top-tier entertainment and customizable themes.",
    heroImage: "/party-host-entertaining-children-games.jpg",
    features: [
      "Perfect for 45-50 guests",
      "4-Hour Duration",
      "2-Hour Setup",
    ],
    included:[
      "Venue Decoration & Setup",
      "Professional Cleanup Service",
      "Premium Themes and Decorations",
      "Return Gifts for all Guests",
      "Photography Session",
      "Videography Session",
      "Exclusive Themed Cake"
    ],
    themes: [
      {
        id: "master-game-host",
        category: "Interactive",
        title: "Master Game Host",
        description: "Engaging games for all ages, keeping the energy high with interactive fun.",
        image: "/party-host-entertaining-children-games.jpg",
      },
      {
        id: "superhero-city",
        category: "Themed",
        title: "Superhero City",
        description: "Transform your space into a superhero adventure zone.",
        image: "/superhero-themed-party-decorations.jpg",
      },
      {
        id: "space-adventure",
        category: "Fantasy",
        title: "Space Adventure",
        description: "Planets, rockets, and galaxy backdrops for an out-of-this-world party.",
        image: "/space-themed-party-decorations-planets.jpg",
      },
    ],
    activities: [
      {
        id: "water-sport",
        name: "Water Sports",
        description: "Inflatable Pool with some floaties",
        icon: "🎮",
        included: true,
        image: "/party-host-entertaining-children-games.jpg",
      },
      {
        id: "return-gift",
        name: "Customized Return Gifts",
        description: "Customized take-home presents",
        icon: "🌱",
        included: true,
        image: "/natural-biodegradable-party-decorations.jpg",
      },
      {
        id: "theme-decor",
        name: "Theme Decor Crew",
        description: "Basic decoration setup",
        icon: "🎨",
        included: true,
        image: "/natural-biodegradable-party-decorations.jpg",
      },
       {
        id: "photo-booth",
        name: "Photo Booth",
        description: "Basic photo booth setup",
        icon: "📸",
        included: true,
        image: "/simple-photo-booth-party.jpg",
      },  
    ],
    addOns: [
      {
      id: "photography",
      name: "Professional Photography",
      description: "Professional service included",
      icon: Camera,
      price: 2000,
    },
    {
      id: "dj-music",
      name: "DJ & Music",
      description: "Professional service included",
      icon: Music,
      price: 2000,
    },
    {
      id: "magic-show",
      name: "Magic Show",
      description: "Professional service included",
      icon: Wand2,
      price: 2000,
    },
    {
      id: "mascot",
      name: "Custom Mascot",
      description: "Professional service included",
      icon: Wand2,
      price: 2000,
    },
    {
      id: "puppet-show",
      name: "Puppet Show",
      description: "Professional service included",
      icon: Wand2,
      price: 2000,
    },
    {
      id: "face-painting",
      name: "Face Painting",
      description: "Professional service included",
      icon: Palette,
      price: 2000,
    },
    ],
  },
  "eco-friendly": {
    title: "Eco-Friendly Package",
    subtitle: "Celebrate Sustainably",
    price: "₹18,000",
    originalPrice: "₹25,000",
    savings: "₹7,000",
    description:
      "Celebrate responsibly with our Eco-Friendly Party Package, featuring sustainable decorations and environmentally conscious entertainment options.",
    heroImage: "/eco-friendly-birthday-party-with-natural-decoratio.jpg",
    features: ["Perfect for 25-30 guests", "3-Hour Duration", "1 Hour Setup"],
    included:[
      "Venue Decoration & Setup",
      "Professional Cleanup Service",
      "Eco-Friendly Return Gifts",
      "Biodegradable Decorations",
      "Organic Treats & Snacks",
      "Eco-Friendly Photo Booth",
    ],
    themes: [
      {
        id: "natural-decorations",
        category: "Sustainable",
        title: "Natural Decorations",
        description: "Beautiful biodegradable decorations made from natural materials.",
        image: "/natural-biodegradable-party-decorations.jpg",
      },
      {
        id: "recycled-crafts",
        category: "Creative",
        title: "Recycled Crafts Party",
        description: "Fun DIY activities using recycled materials to spark creativity.",
        image: "/children-doing-recycled-crafts-at-party.jpg",
      },
      {
        id: "nature-explorer",
        category: "Outdoor",
        title: "Nature Explorer",
        description: "Enchanted forest vibes with earthy tones and leafy accents.",
        image: "/enchanted-forest-party-theme-decorations.jpg",
      },
    ],
    activities: [
      {
        id: "disco-night",
        name: "Disco Night",
        description: "Discoball with music and light show",
        icon: "🎮",
        included: true,
        image: "/party-host-entertaining-children-games.jpg",
      },
      {
        id: "exclusive-gifts",
        name: "Premium Return Gifts",
        description: "Premium take-home presents",
        icon: "🌱",
        included: true,
        image: "/natural-biodegradable-party-decorations.jpg",
      },
      {
        id: "custom-decor",
        name: "Premium Decoration Crew",
        description: "Premium decoration setup",
        icon: "🎨",
        included: true,
        image: "/natural-biodegradable-party-decorations.jpg",
      },
       {
        id: "photo-booth",
        name: "Exclusive Photo Booth",
        description: "Premium photo booth setup",
        icon: "📸",
        included: true,
        image: "/simple-photo-booth-party.jpg",
      },  
    ],
    addOns: [
      {
      id: "photography",
      name: "Professional Photography",
      description: "Professional service included",
      icon: Camera,
      price: 2000,
    },
    {
      id: "dj-music",
      name: "DJ & Music",
      description: "Professional service included",
      icon: Music,
      price: 2000,
    },
    {
      id: "puppet-show",
      name: "Puppet Show",
      description: "Professional service included",
      icon: Wand2,
      price: 2000,
    },
    {
      id: "face-decoration",
      name: "Face Decoration",
      description: "Professional service included",
      icon: Palette,
      price: 2000,
    },
    ],
  },
}

export default function PackageDetailsV2({ params }: { params: { slug: string } }) {
  const packageData = packages[params.slug as keyof typeof packages]
  const [selectedTheme, setSelectedTheme] = useState(packageData?.themes?.[0]?.id || "")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [guestCount, setGuestCount] = useState(15)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Helper functions for add-on management
  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    )
  }

  const getSelectedAddOnsData = () => {
    return (packageData?.addOns || []).filter(addon => selectedAddOns.includes(addon.id))
  }

  const getSelectedThemeData = () => {
    return (packageData?.themes || []).find(theme => theme.id === selectedTheme)
  }

  const calculateTotalPrice = () => {
    const basePrice = parseInt(packageData?.price?.replace(/[^0-9]/g, '') || '0')
    const addOnsTotal = getSelectedAddOnsData().reduce((total, addon) => total + (addon.price || 0), 0)
    return basePrice + addOnsTotal
  }

  const galleryImages = [
    "/gallery2.PNG",
    "/natural-biodegradable-party-decorations.jpg",
    "/hero3.PNG",
    "/hero2.PNG",
    "/gallery4.PNG",
    "/party-setup.jpg",
    "/gallery3.PNG",
    "/professional-party-photographer.jpg"
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const openGalleryModal = (index: number) => {
    setSelectedImageIndex(index)
    setIsGalleryModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">{packageData.title}</h1>
                <Badge className="bg-primary text-primary-foreground">Popular Choice</Badge>
              </div>
              <p className="text-muted-foreground">{packageData.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-end">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Left Content - Scrollable */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-min">
            {/* Hero Video Card - Spans 2 columns */}
            <HeroVideoCard title={packageData.title} heroImage={packageData.heroImage} />

            {/* Rating & Stats Card - 1 column */}
            <RatingStatsCard 
              price={packageData.price} 
              originalPrice={packageData.originalPrice} 
              savings={packageData.savings} 
            />

            {/* Image Gallery Card - 1 column */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-3 text-card-foreground">Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 h-full">
                {galleryImages.slice(0, 4).map((image, index) => (
                  <div 
                    key={index} 
                    className="aspect-square bg-muted rounded-lg overflow-hidden relative group cursor-pointer"
                    onClick={() => openGalleryModal(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                    {index === 3 && galleryImages.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">+{galleryImages.length - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Pre-selected Activities & What's Included - Spans 2 columns */}
            <ActivitiesIncludedSection 
              activities={packageData?.activities || []} 
              included={packageData?.included || packageData?.features || []} 
            />

            {/* Optional Add-ons Card - Spans 2 columns */}
            <AddOnsSection 
              addOns={packageData?.addOns || []} 
              selectedAddOns={selectedAddOns} 
              onToggleAddOn={toggleAddOn} 
            />

            {/* About Package - 1 column */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">About {packageData.title}</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                {packageData.description}
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Perfect For:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Ages 3-12 Years</li>
                    <li>• Indoor & Outdoor Venues</li>
                    <li>• Weekend Celebrations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Duration:</h4>
                  <ul className="space-y-1 text-xm text-muted-foreground">
                    <li>• 4-6 Hours Experience</li>
                    <li>• 2-Hour Setup</li>
                    <li>• Complete Cleanup</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Desktop Theme Selection - Spans 2 columns */}
            <ThemeSelection 
              themes={packageData.themes || []} 
              selectedTheme={selectedTheme} 
              onThemeSelect={setSelectedTheme} 
              className="hidden lg:block sm:col-span-2" 
            />

            {/* Desktop Safety Standards - Spans 2 columns */}
            <Card className="hidden lg:block sm:col-span-2 p-6 bg-emerald-50 border-emerald-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-card-foreground">Safety & Hygiene Standards</h3>
                <p className="text-sm text-emerald-600 mt-1">Your child's safety is our top priority</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/70 rounded-lg p-4 border border-emerald-200">
                  <h4 className="font-bold mb-4 text-lg text-card-foreground flex items-center">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                    Safety First
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                      <span className="leading-relaxed">All Staff Background Verified</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                      <span className="leading-relaxed">Child Safety Protocols Followed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                      <span className="leading-relaxed">First-Aid Trained Supervisors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                      <span className="leading-relaxed">Non-Toxic Materials Used Only</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/70 rounded-lg p-4 border border-emerald-200">
                  <h4 className="font-bold mb-4 text-lg text-card-foreground flex items-center">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                    Hygiene Standards
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                      <span className="leading-relaxed">Sanitized Equipment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                      <span className="leading-relaxed">Individual Activity Kits</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                      <span className="leading-relaxed">Food Safety Compliance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                      <span className="leading-relaxed">Clean & Safe Children Playing Area</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Desktop How It Works - Spans 2 columns */}
            <Card className="hidden lg:block sm:col-span-2 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-card-foreground">How It Works</h3>
                <p className="text-sm text-blue-600 mt-2">Simple 3-step process to perfect party</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 rounded-xl p-4 border border-blue-200 shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg mb-4">
                      1
                    </div>
                    <h4 className="font-bold mb-2 text-lg text-card-foreground">Book Package</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Choose your preferred date, location, and themes. Get instant confirmation within 2 hours with detailed planning and coordination.
                    </p>
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl p-4 border border-blue-200 shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg mb-4">
                      2
                    </div>
                    <h4 className="font-bold mb-2 text-lg text-card-foreground">Customize</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our experienced coordinator will call you to finalize themes, activities, special dietary requirements, and any custom requests for your event.
                    </p>
                  </div>
                </div>
                <div className="bg-white/80 rounded-xl p-4 border border-blue-200 shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg mb-4">
                      3
                    </div>
                    <h4 className="font-bold mb-2 text-lg text-card-foreground">Enjoy</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Sit back and relax! We handle everything from venue setup to complete cleanup. You focus on creating magical memories with your loved ones.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border border-blue-200">
                <div className="flex items-center justify-center text-sm text-blue-700 font-semibold">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                  Professional service guaranteed at every step
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - Sticky (Desktop) */}
        <div className="hidden lg:block w-96 bg-sidebar border-l border-sidebar-border sticky top-4 self-start">
          <BookingForm 
            title={packageData.title}
            subtitle={packageData.subtitle}
            price={packageData.price}
            selectedTheme={selectedTheme}
            selectedAddOns={selectedAddOns}
            themes={packageData.themes || []}
            addOns={packageData.addOns || []}
            getSelectedThemeData={getSelectedThemeData}
            getSelectedAddOnsData={getSelectedAddOnsData}
            calculateTotalPrice={calculateTotalPrice}
            className=""
          />
        </div>
      </div>
      
      {/* Mobile Theme Selection - Full Width */}
      <MobileThemeSelection 
        themes={packageData.themes || []} 
        selectedTheme={selectedTheme} 
        onThemeSelect={setSelectedTheme} 
      />
      
      {/* Mobile Safety Standards - Full Width */}
      <div className="lg:hidden px-0">
        <div className="w-full bg-emerald-50 border-t border-b border-emerald-200 py-6">
          <div className="px-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-extrabold text-card-foreground">Safety & Hygiene Standards</h3>
              <p className="text-sm text-emerald-600 mt-1">Your child's safety is our top priority</p>
            </div>
            <div className="space-y-6">
              <div className="bg-white/70 rounded-lg p-4 border border-emerald-200">
                <h4 className="font-bold mb-4 text-lg text-card-foreground flex items-center">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                  Safety First
                </h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                    <span className="leading-relaxed">All Staff Background Verified</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                    <span className="leading-relaxed">Child Safety Protocols Followed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                    <span className="leading-relaxed">First-Aid Trained Supervisors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                    <span className="leading-relaxed">Non-Toxic Materials Used Only</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/70 rounded-lg p-4 border border-emerald-200">
                <h4 className="font-bold mb-4 text-lg text-card-foreground flex items-center">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                  Hygiene Standards
                </h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                    <span className="leading-relaxed">Sanitized Equipment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                    <span className="leading-relaxed">Individual Activity Kits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                    <span className="leading-relaxed">Food Safety Compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 font-bold flex-shrink-0 text-base">✔️</span>
                    <span className="leading-relaxed">Clean & Safe Children Playing Area</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile How It Works - Full Width */}
      <div className="lg:hidden px-0">
        <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-b border-blue-200 py-6">
          <div className="px-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-extrabold text-card-foreground">How It Works</h3>
              <p className="text-sm text-blue-600 mt-2">Simple 3-step process to perfect party</p>
            </div>
            <div className="space-y-6">
              <div className="bg-white/80 rounded-xl p-4 border border-blue-200 shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-2 text-lg text-card-foreground">Book Package</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Choose your preferred date, location, and themes. Get instant confirmation within 2 hours with detailed planning and coordination.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-blue-200 shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-2 text-lg text-card-foreground">Customize</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our experienced coordinator will call you to finalize themes, activities, special dietary requirements, and any custom requests for your event.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-blue-200 shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-2 text-lg text-card-foreground">Enjoy</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Sit back and relax! We handle everything from venue setup to complete cleanup. You focus on creating magical memories with your loved ones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border border-blue-200">
              <div className="flex items-center justify-center text-sm text-blue-700 font-semibold">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                Professional service guaranteed at every step
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Booking Form - Last Component */}
      <MobileBookingForm 
        title={packageData.title}
        subtitle={packageData.subtitle}
        price={packageData.price}
        selectedTheme={selectedTheme}
        selectedAddOns={selectedAddOns}
        themes={packageData.themes || []}
        addOns={packageData.addOns || []}
        getSelectedThemeData={getSelectedThemeData}
        getSelectedAddOnsData={getSelectedAddOnsData}
        calculateTotalPrice={calculateTotalPrice}
      />

      {/* Image Gallery Modal */}
      <ImageGalleryModal 
        images={galleryImages}
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        initialIndex={selectedImageIndex}
      />
    </div>
  )
}