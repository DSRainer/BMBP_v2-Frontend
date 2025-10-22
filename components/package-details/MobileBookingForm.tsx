import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"
import { Star, MapPin, Users } from "lucide-react"
import React, { useState } from "react"

interface Theme {
  id: string
  title: string
  image: string
}

interface AddOn {
  id: string
  name: string
  price: number
  icon?: any
}

interface MobileBookingFormProps {
  title: string
  subtitle: string
  price: string
  selectedTheme: string
  selectedAddOns: string[]
  themes: Theme[]
  addOns: AddOn[]
  getSelectedThemeData: () => Theme | undefined
  getSelectedAddOnsData: () => AddOn[]
  calculateTotalPrice: () => number
}

export default function MobileBookingForm({
  title,
  subtitle,
  price,
  selectedTheme,
  selectedAddOns,
  themes,
  addOns,
  getSelectedThemeData,
  getSelectedAddOnsData,
  calculateTotalPrice
}: MobileBookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [location, setLocation] = useState('')
  const [expectedGuests, setExpectedGuests] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // Validation handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow letters, spaces, and common name characters
    const nameRegex = /^[a-zA-Z\s.'\-]*$/
    if (nameRegex.test(value)) {
      setFullName(value)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and limit to 10 digits
    const phoneRegex = /^[0-9]*$/
    if (phoneRegex.test(value) && value.length <= 10) {
      setPhoneNumber(value)
    }
  }

  // WhatsApp message handler
  const handleWhatsAppMessage = () => {
    const selectedThemeData = getSelectedThemeData() || themes[0]
    const selectedAddOnsData = getSelectedAddOnsData()
    
    const message = `🎉 Birthday Party Booking Inquiry 🎉\n\n` +
       `📞 I'm interested in booking this package. Please share more details and confirm availability! \n` + 
      `📋 *Package Details:*\n` +
      `• Package: ${title}\n` +
      `• Description: ${subtitle}\n` +
      `• Base Price: ${price}\n\n` +
      `👤 *Customer Information:*\n` +
      `• Name: ${fullName || 'Not provided'}\n` +
      `• Phone: ${phoneNumber || 'Not provided'}\n` +
      `• Event Date: ${selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'}\n` +
      `• Location: ${location || 'Not provided'}\n` +
      `• Expected Guests: ${expectedGuests || 'Not specified'}\n\n` +
      `🎨 *Theme Selection:*\n` +
      `• ${selectedThemeData?.title || 'Default Theme'}\n\n` +
      (selectedAddOnsData.length > 0 ? 
        `🎁 *Add-ons (${selectedAddOnsData.length}):*\n` +
        selectedAddOnsData.map(addon => `• ${addon.name} - ₹${addon.price?.toLocaleString()}`).join('\n') + '\n\n'
        : '') +
      `💰 *Pricing Summary:*\n` +
      `• Base Package: ${price}\n` +
      (selectedAddOnsData.length > 0 ? 
        `• Add-ons Total: ₹${selectedAddOnsData.reduce((total, addon) => total + (addon.price || 0), 0).toLocaleString()}\n`
        : '') +
      `• *Total Estimate: ₹${calculateTotalPrice().toLocaleString()}*\n\n`
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/919833142424?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!fullName || !phoneNumber) {
      setSubmitMessage('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    setSubmitMessage('')
    
    try {
      const selectedThemeData = getSelectedThemeData() || themes[0]
      const selectedAddOnsData = getSelectedAddOnsData()
      
      // Transform add-ons data to ensure icon is a string
      const serializedAddOns = selectedAddOnsData.map(addon => ({
        ...addon,
        icon: typeof addon.icon === 'string' ? addon.icon : 
              typeof addon.icon === 'object' ? addon.icon.displayName || 'unknown' :
              String(addon.icon)
      }))
      
      const bookingData = {
        fullName,
        phoneNumber,
        eventDate: selectedDate?.toISOString(),
        location,
        expectedGuests,
        packageTitle: title,
        packageSubtitle: subtitle,
        basePrice: price.replace(/[^\d]/g, ''), // Remove currency symbols
        selectedTheme: selectedThemeData,
        selectedActivities: [], // This would come from props if available
        selectedAddOns: serializedAddOns,
        basePackagePrice: price.replace(/[^\d]/g, ''),
        addOnsTotal: selectedAddOnsData.reduce((total, addon) => total + (addon.price || 0), 0),
        totalPrice: calculateTotalPrice(),
        notes: `Mobile booking submitted via website form`
      }
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitMessage('Booking submitted successfully! We will contact you soon.')
        // Reset form
        setFullName('')
        setPhoneNumber('')
        setLocation('')
        setExpectedGuests('')
        setSelectedDate(undefined)
      } else {
        setSubmitMessage(result.error || 'Failed to submit booking. Please try again.')
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      setSubmitMessage('Failed to submit booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="lg:hidden p-4">
      <Card className="p-6 bg-white">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">4.9/5</span>
          </div>
          <h2 className="text-xl font-bold text-card-foreground mb-1">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
            <Input 
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleNameChange}
              className="w-full"
              title="Only letters and spaces are allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
            <Input 
              type="tel"
              placeholder="9876543210"
              value={phoneNumber}
              onChange={handlePhoneChange}
              maxLength={10}
              className="w-full"
              title="Enter 10-digit phone number (numbers only)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Event Date</label>
            <DatePicker 
              date={selectedDate}
              onDateChange={setSelectedDate}
              placeholder="Select event date"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Location</label>
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Enter your city or venue" 
                className="pl-10" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Expected Guests</label>
            <div className="relative">
              <select 
                className="w-full px-10 py-2 border border-input rounded-md bg-background text-foreground"
                value={expectedGuests}
                onChange={(e) => setExpectedGuests(e.target.value)}
              >
                <option value="">Select number of guests</option>
                <option value="10-15 guests">10-15 guests</option>
                <option value="15-25 guests">15-25 guests</option>
                <option value="25-35 guests">25-35 guests</option>
              </select>
              <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </form>

        {/* Mobile Selected Theme & Add-ons Display */}
        <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="text-sm font-semibold text-purple-700 mb-3">Your Selections</h3>
          
          {/* Selected Theme */}
          <div className="mb-3">
            <div className="text-xs text-muted-foreground mb-1">Theme:</div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md overflow-hidden">
                <img
                  src={getSelectedThemeData()?.image || themes[0]?.image || "/placeholder.svg"}
                  alt="Selected theme"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {getSelectedThemeData()?.title || themes[0]?.title || "Default Theme"}
              </span>
            </div>
          </div>

          {/* Selected Add-ons */}
          {selectedAddOns.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Add-ons ({selectedAddOns.length}):</div>
              <div className="space-y-1">
                {getSelectedAddOnsData().map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{addon.name}</span>
                    <span className="font-medium">+₹{addon.price?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-foreground">Base package</span>
            <span className="font-semibold">{price}</span>
          </div>
          {selectedAddOns.length > 0 && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-foreground">Add-ons ({selectedAddOns.length})</span>
              <span className="font-semibold">+₹{getSelectedAddOnsData().reduce((total, addon) => total + (addon.price || 0), 0).toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-foreground">Total estimate</span>
            <span className="text-primary">₹{calculateTotalPrice().toLocaleString()}</span>
          </div>
        </div>

        {submitMessage && (
          <div className={`mb-4 p-3 rounded-md text-sm ${
            submitMessage.includes('successfully') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {submitMessage}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !fullName || !phoneNumber}
          className="w-full mb-4 text-white border-0 shadow-lg"
          style={{
            background: "linear-gradient(to right, #ec4899, #f97316)",
            color: "white",
          }}
          onClick={handleSubmit}
        >
          {isSubmitting ? 'Submitting...' : 'Book Now →'}
        </Button>

        <div className="text-center">
          <Button 
            variant="link" 
            className="text-foreground"
            onClick={handleWhatsAppMessage}
          >
            Message Now ✨
          </Button>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-current rounded-full" />
            </div>
            <span>Free cancellation up to 48 hours</span>
          </div>
        </div>
      </Card>
    </div>
  )
}