import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface TestimonialVideoProps {
  videoUrl: string
  thumbnail: string
  name: string
  age: number
  description: string
}

export function TestimonialVideo({ thumbnail, name, age, description }: TestimonialVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showVideo, setShowVideo] = useState(false)

  const handlePlay = () => {
    setShowVideo(true)
    setIsPlaying(true)
  }

  return (
    <Card className="overflow-hidden">
      {!showVideo ? (
        // Thumbnail view
        <div className="relative">
          <div className="relative aspect-video">
            <img
              src={thumbnail}
              alt={`${name} testimonial`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={handlePlay}
                size="lg"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/50 rounded-full w-16 h-16 p-0"
              >
                <Play className="w-6 h-6 ml-1" />
              </Button>
            </div>

            {/* Patient info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <div className="text-white">
                <h3 className="font-semibold text-lg">{name}, {age}</h3>
                <p className="text-white/80 text-sm">{description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Video view
        <div className="relative">
          <div className="relative aspect-video bg-black">
            {/* Placeholder video element - in real implementation, use actual video */}
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8" />
                </div>
                <p className="text-lg font-semibold mb-2">Video Player</p>
                <p className="text-white/80 text-sm">
                  In a real implementation, this would be an actual video player
                </p>
              </div>
            </div>

            {/* Video controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="text-sm">
                  <span className="font-semibold">{name}, {age}</span>
                  <span className="text-white/80 ml-2">• {description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}