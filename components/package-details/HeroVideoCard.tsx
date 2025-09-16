"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Users, Calendar } from "lucide-react"
import VideoModal from "@/components/ui/video-modal"

interface HeroVideoCardProps {
  title: string
  heroImage: string
}

export default function HeroVideoCard({ title, heroImage }: HeroVideoCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const handlePlayVideo = () => {
    setIsVideoOpen(true)
  }

  return (
    <>
      <Card className="sm:col-span-2 overflow-hidden">
        <div className="relative h-96 bg-gradient-to-r from-emerald-600 to-emerald-700">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImage}')` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <Button 
              size="lg" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 mb-4 transition-all duration-300 hover:scale-105"
              onClick={handlePlayVideo}
            >
              <Play className="w-6 h-6 mr-2" />
              Watch Experience Video
            </Button>
            <div className="text-white text-center">
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Perfect for 15-30 Kids
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  4-6 hours Duration
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </>
  )
}