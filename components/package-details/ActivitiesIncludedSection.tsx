import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface Activity {
  id: string
  name: string
  description?: string
  icon: string
  included: boolean
  image: string
}

interface ActivitiesIncludedSectionProps {
  activities: Activity[]
  included: string[]
}

export default function ActivitiesIncludedSection({ activities, included }: ActivitiesIncludedSectionProps) {
  return (
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
                    {activity.description && (
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    )}
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
          {included.map((item, index) => (
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
  )
}