import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Check } from "lucide-react"

interface Theme {
  id: string
  category: string
  title: string
  description: string
  image: string
}

interface ThemeSelectionProps {
  themes: Theme[]
  selectedTheme: string
  onThemeSelect: (themeId: string) => void
  className?: string
}

export default function ThemeSelection({ themes, selectedTheme, onThemeSelect, className = "" }: ThemeSelectionProps) {
  const selectedThemeData = themes.find((t) => t.id === selectedTheme) || themes[0]
  
  return (
    <Card className={`p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-extrabold text-card-foreground">Choose Your Theme</h3>
        <p className="text-sm text-purple-600 mt-2">Select from {themes.length} beautiful themes included in your package</p>
      </div>
      
      {/* Main Theme Display */}
      <div className="relative mb-6">
        <div className="aspect-video bg-muted rounded-xl overflow-hidden">
          <img
            src={selectedThemeData?.image || "/placeholder.svg"}
            alt="Selected theme"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h4 className="text-2xl font-bold mb-2">{selectedThemeData?.title || "Theme"}</h4>
            <p className="text-white/90 text-sm">{selectedThemeData?.description || "Beautiful theme for your celebration"}</p>
            <Badge className="mt-2 bg-white/20 border-white/30 text-white">
              {selectedThemeData?.category || "Premium"}
            </Badge>
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
      
      {/* Theme Selection Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeSelect(theme.id)}
            className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
              selectedTheme === theme.id ? "border-purple-500 ring-2 ring-purple-200" : "border-gray-200"
            }`}
          >
            <img
              src={theme.image || "/placeholder.svg"}
              alt={theme.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-medium text-center px-1">{theme.title}</span>
            </div>
            {selectedTheme === theme.id && (
              <div className="absolute top-1 right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Selected Theme Info */}
      <Card className="p-4 bg-white/70 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img
                src={selectedThemeData?.image || "/placeholder.svg"}
                alt="Selected theme"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Currently selected theme:</div>
              <div className="font-semibold">{selectedThemeData?.title || "Default Theme"}</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            Customize
          </Button>
        </div>
      </Card>
    </Card>
  )
}