import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Plus } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface AddOn {
  id: string
  name: string
  description: string
  icon: LucideIcon | string
  price: number
}

interface AddOnsSectionProps {
  addOns: AddOn[]
  selectedAddOns: string[]
  onToggleAddOn: (addOnId: string) => void
}

export default function AddOnsSection({ addOns, selectedAddOns, onToggleAddOn }: AddOnsSectionProps) {
  return (
    <Card className="sm:col-span-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Optional Add-ons</h3>
        <span className="text-sm text-muted-foreground">{addOns.length} available</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addOns.map((addon) => (
          <Card key={addon.id} className="p-4 border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {typeof addon.icon === 'string' ? (
                    <span className="text-2xl">{addon.icon}</span>
                  ) : (
                    <addon.icon className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground">{addon.name}</h4>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-semibold">+₹{addon.price?.toLocaleString()}</span>
                <Button 
                  size="sm" 
                  variant={selectedAddOns.includes(addon.id) ? "default" : "outline"}
                  onClick={() => onToggleAddOn(addon.id)}
                >
                  {selectedAddOns.includes(addon.id) ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}