"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Play,
  Heart,
  Share2,
  Calendar,
  MapPin,
  Users,
  Star,
  Check,
  Plus,
  Camera,
  Music,
  Wand2,
  Palette,
} from "lucide-react"
import Link from "next/link"

export default function PackageDetailsV2() {
  const [selectedTheme, setSelectedTheme] = useState("garden-party")
  const [guestCount, setGuestCount] = useState(15)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const themes = [
    {
      id: "garden-party",
      name: "Garden Party",
      description: "Natural beauty with sustainable decor",
      image: "/eco-friendly-birthday-party-with-natural-decoratio.jpg",
      isActive: true,
    },
    {
      id: "forest-friends",
      name: "Forest Friends",
      description: "Woodland adventure theme",
      image: "/enchanted-forest-party-decorations.jpg",
      isActive: false,
    },
    {
      id: "ocean-explorer",
      name: "Ocean Explorer",
      description: "Underwater adventure experience",
      image: "/party-setup.jpg",
      isActive: false,
    },
  ]

  const activities = [
    {
      id: "game-host",
      name: "Game Host",
      description: "Professional entertainment coordinator",
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
      image: "/children-doing-recycled-crafts-at-party.jpg",
    },
    {
      id: "cleanup",
      name: "Professional Cleanup",
      description: "Complete post-party cleaning service",
      icon: "🧹",
      included: true,
      image: "/eco-friendly-party-cleanup-service.jpg",
    },
  ]

  const addOns = [
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
  ]

  const galleryImages = [
    "/eco-friendly-birthday-party-with-natural-decoratio.jpg",
    "/natural-biodegradable-party-decorations.jpg",
    "/children-doing-recycled-crafts-at-party.jpg",
    "/organic-healthy-party-treats-and-snacks.jpg",
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
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
                <h1 className="text-xl font-bold text-foreground">Eco-Friendly Package</h1>
                <Badge className="bg-primary text-primary-foreground">Popular Choice</Badge>
              </div>
              <p className="text-muted-foreground">Celebrate sustainably with Mother Earth</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
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
            <Card className="sm:col-span-2 overflow-hidden">
              <div className="relative h-96 bg-gradient-to-r from-emerald-600 to-emerald-700">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('/eco-friendly-birthday-party-with-natural-decoratio.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30 mb-4">
                    <Play className="w-6 h-6 mr-2" />
                    Watch Experience Video
                  </Button>
                  <div className="text-white text-center">
                    <h2 className="text-3xl font-bold mb-2">Celebrate sustainably with Mother Earth</h2>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Perfect for 15-30 kids
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        4-6 hours duration
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Rating & Stats Card - 1 column (Redesigned) */}
            <Card className="overflow-hidden">
              {/* Price header */}
              <div className="bg-gradient-to-r from-fuchsia-500 to-amber-500 p-6 text-white text-center">
                <div className="text-3xl font-extrabold tracking-tight">
                  ₹18,000
                </div>
                <div className="mt-1 flex items-center justify-center gap-2 text-sm">
                  <span className="line-through/80 line-through opacity-90">₹25,000</span>
                  <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
                      Save ₹7,000
                  </span>
                </div>
                <div className="text-white/90 text-xs mt-2">Starting price</div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Rating row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="font-semibold">4.9/5</span>
                    <span className="text-xs text-muted-foreground">(150+ reviews)</span>
                  </div>
                  <div className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-medium w-max">
                    Best Value
                  </div>
                </div>

                {/* Stats chips */}
                <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-3">
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-3">
                    <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Bookings</div>
                      <div className="text-sm font-semibold">150+ families</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Response</div>
                      <div className="text-sm font-semibold">Within 2 hours</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 col-span-2 sm:col-span-1">
                    <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Service</div>
                      <div className="text-sm font-semibold">Multi-city</div>
                    </div>
                  </div>
                </div>

                {/* Popularity bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Popularity</span>
                    <span>High</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-500" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Image Gallery Card - 1 column */}
            <Card className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 h-full">
                {galleryImages.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Pre-selected Activities & What's Included - Spans 2 columns */}
            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Pre-selected Activities</h3>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <Card key={activity.id} className="p-3 bg-emerald-50 border-emerald-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm">
                            {activity.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{activity.name}</h4>
                          </div>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Included
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
                <Card className="mt-4 p-3 bg-emerald-50 border-emerald-200">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-medium">All activities above are included at no extra cost</span>
                    </div>
                  </div>
                </Card>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">What's Included</h3>
                <div className="text-lg font-medium space-y-3">
                  {[
                    "Venue Decoration & Setup",
                    "Professional Cleanup Service",
                    "Party Coordination",
                    "Return Gifts for all Kids",
                    "Photography Session",
                    "Birthday Cake Cutting Ceremony",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-lg text-card-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Optional Add-ons Card - Spans 2 columns */}
            <Card className="sm:col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Optional Add-ons</h3>
                <span className="text-sm text-muted-foreground">4 available</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {addOns.map((addon) => (
                  <Card key={addon.id} className="p-4 border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <addon.icon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-card-foreground">{addon.name}</h4>
                          <p className="text-sm text-muted-foreground">{addon.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-semibold">+₹{addon.price.toLocaleString()}</span>
                        <Button size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* About Package - 1 column */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">About Eco-Friendly Package</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Our eco-friendly package creates unforgettable birthday memories. Every detail is carefully curated for
                a seamless, magical experience.
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

            {/* Safety Standards - 1 column */}
            <Card className="p-6 bg-emerald-50 border-emerald-200">
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-xl font-extrabold text-card-foreground">Safety & Hygiene Standards</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-lg text-card-foreground">Safety First:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✔️ All Staff Background Verified</li>
                    <li>✔️ Child Safety Protocols Followed</li>
                    <li>✔️ First-Aid Trained Supervisors</li>
                    <li>✔️ Non-Toxic Materials Used Only</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg text-card-foreground">Hygiene Standards:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✔️ Sanitized Equipment</li>
                    <li>✔️ Individual Activity Kits</li>
                    <li>✔️ Food Safety Compliance</li>
                    <li>✔️ Clean & Safe Children Playing Area</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Theme Selection - Spans 2 columns */}
            <Card className="col-span-2 p-6">
              <div className="relative mb-6">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={themes.find((t) => t.id === selectedTheme)?.image || "/placeholder.svg"}
                    alt="Selected theme"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{themes.find((t) => t.id === selectedTheme)?.name}</h3>
                    <p className="text-white/90">{themes.find((t) => t.id === selectedTheme)?.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-4 right-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Eco-Friendly Package Themes (3)</h4>
                  <span className="text-sm text-muted-foreground">1 of 3</span>
                </div>
                <div className="flex gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedTheme === theme.id ? "border-primary" : "border-border"
                      }`}
                    >
                      <img
                        src={theme.image || "/placeholder.svg"}
                        alt={theme.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{theme.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Card className="p-4 bg-muted">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        src={themes.find((t) => t.id === selectedTheme)?.image || "/placeholder.svg"}
                        alt="Selected theme"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Currently selected theme:</div>
                      <div className="font-semibold">{themes.find((t) => t.id === selectedTheme)?.name}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Customize
                  </Button>
                </div>
              </Card>
            </Card>

            {/* How It Works - spans 2 on large screens */}
            <Card className="p-6 lg:col-span-2 sm:col-span-1">
              <h3 className="text-xl font-extrabold mb-6">How It Works</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-lg">Book Package</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose date, location, themes. Confirm within 2 hours.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-lg">Customize</h4>
                    <p className="text-sm text-muted-foreground">
                      Coordinator calls to finalize themes and activities.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-lg">Enjoy</h4>
                    <p className="text-sm text-muted-foreground">We handle everything. You focus on memories!</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Empty space for visual balance */}
            
          </div>
          {/* Mobile Booking Form */}
          <div className="lg:hidden">
            <Card className="p-4">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.9/5</span>
                </div>
                <h2 className="text-lg font-bold text-card-foreground mb-1">Eco-Friendly Package</h2>
                <p className="text-muted-foreground text-sm">Celebrate sustainably with Mother Earth</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Date</label>
                  <div className="relative">
                    <Input type="text" placeholder="dd/mm/yyyy" className="pl-10" />
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <div className="relative">
                    <Input type="text" placeholder="Enter your city or venue" className="pl-10" />
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Expected Guests</label>
                  <div className="relative">
                    <select className="w-full px-10 py-2 border border-input rounded-md bg-input text-foreground">
                      <option>Select number of guests</option>
                      <option>10-15 guests</option>
                      <option>15-25 guests</option>
                      <option>25-35 guests</option>
                    </select>
                    <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span>Base package</span>
                  <span className="font-semibold">₹18,000</span>
                </div>
                <div className="flex justify-between items-center text-base font-bold">
                  <span>Total estimate</span>
                  <span className="text-primary">₹18,000</span>
                </div>
              </div>

              <Button
                className="w-full mb-2 text-white border-0 shadow"
                style={{ background: "linear-gradient(to right, #ec4899, #f97316)", color: "white" }}
              >
                Book Now →
              </Button>
              <Button variant="link" className="w-full text-muted-foreground">Customize Package ✨</Button>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - Fixed (Desktop) */}
        <div className="hidden lg:block w-96 bg-sidebar border-l border-sidebar-border lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.9/5</span>
              </div>
              <h2 className="text-xl font-bold text-sidebar-foreground mb-1">Eco-Friendly Package</h2>
              <p className="text-sidebar-foreground">Celebrate sustainably with Mother Earth</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-sidebar-foreground mb-2">Event Date</label>
                <div className="relative">
                  <Input type="text" placeholder="dd/mm/yyyy" className="pl-10" />
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sidebar-foreground mb-2">Location</label>
                <div className="relative">
                  <Input type="text" placeholder="Enter your city or venue" className="pl-10" />
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sidebar-foreground mb-2">Expected Guests</label>
                <div className="relative">
                  <select className="w-full px-10 py-2 border border-input rounded-md bg-input text-foreground">
                    <option>Select number of guests</option>
                    <option>10-15 guests</option>
                    <option>15-25 guests</option>
                    <option>25-35 guests</option>
                  </select>
                  <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="border-t border-sidebar-border pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sidebar-foreground">Base package</span>
                <span className="font-semibold">₹18,000</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-sidebar-foreground">Total estimate</span>
                <span className="text-primary">₹18,000</span>
              </div>
            </div>

            <Button
              className="w-full mb-4 text-white border-0 shadow-lg"
              style={{
                background: "linear-gradient(to right, #ec4899, #f97316)",
                color: "white",
              }}
            >
              Book Now →
            </Button>

            <div className="text-center">
              <Button variant="link" className="text-sidebar-foreground">
                Customize Package ✨
              </Button>
            </div>

            <div className="mt-6 pt-4 border-t border-sidebar-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-current rounded-full" />
                </div>
                <span>Free cancellation up to 48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
