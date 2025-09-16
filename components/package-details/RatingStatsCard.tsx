import { Card } from "@/components/ui/card"
import { Star, Users, Calendar, MapPin } from "lucide-react"

interface RatingStatsCardProps {
  price: string
  originalPrice?: string
  savings?: string
}

export default function RatingStatsCard({ price, originalPrice, savings }: RatingStatsCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Price header */}
      <div className="bg-gradient-to-r from-fuchsia-500 to-amber-500 p-6 text-white text-center">
        <div className="text-3xl font-extrabold tracking-tight">
          {price || "₹18,000"}
        </div>
        <div className="mt-1 flex items-center justify-center gap-2 text-sm">
          {originalPrice && (
            <span className="line-through/80 line-through opacity-90">{originalPrice}</span>
          )}
          {savings && (
            <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
              Save {savings}
            </span>
          )}
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
  )
}