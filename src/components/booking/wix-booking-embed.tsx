import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, Calendar, ExternalLink } from 'lucide-react'
import { useQuizStore } from '@/lib/quiz-store'

interface WixBookingEmbedProps {
  open: boolean
  onClose: () => void
  resultType: 'ideal' | 'partial' | 'unfit'
}

export function WixBookingEmbed({ open, onClose, resultType }: WixBookingEmbedProps) {
  const { answers } = useQuizStore()
  const [isLoading, setIsLoading] = useState(true)

  // In a real implementation, this would be your actual Wix Bookings URL
  const getBookingUrl = () => {
    const baseUrl = "https://www.wixbookings.com/book-now/your-booking-id"
    const params = new URLSearchParams({
      quizResult: resultType,
      concern: answers[1] || '',
      timeline: answers[3] || '',
      goal: answers[7] || '',
      prefill: 'true'
    })
    return `${baseUrl}?${params.toString()}`
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleExternalBooking = () => {
    window.open(getBookingUrl(), '_blank')
    onClose()
  }

  useEffect(() => {
    if (open) {
      setIsLoading(true)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6" />
              <div>
                <DialogTitle className="text-lg font-semibold">Book Your Consultation</DialogTitle>
                <p className="text-blue-100 text-sm">Free • No obligation • 30 minutes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="relative h-96 md:h-[600px]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading booking calendar...</p>
                </div>
              </div>
            )}
            
            {/* Fallback booking options */}
            <div className="p-8 space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Schedule Your Free Consultation
                </h3>
                <p className="text-gray-600">
                  Choose your preferred way to book your appointment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6 text-center">
                  <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Online Booking</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Book instantly using our online calendar system
                  </p>
                  <Button 
                    onClick={handleExternalBooking}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Booking Calendar
                  </Button>
                </div>

                <div className="border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Call to Book</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Speak directly with our scheduling team
                  </p>
                  <Button variant="outline" className="w-full">
                    <a href="tel:+15551234567" className="flex items-center justify-center w-full">
                      Call (555) 123-4567
                    </a>
                  </Button>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">What to Expect</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Scalp Analysis</p>
                      <p className="text-gray-600">Professional evaluation of your hair and scalp</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Treatment Plan</p>
                      <p className="text-gray-600">Personalized recommendations based on your goals</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Next Steps</p>
                      <p className="text-gray-600">Clear timeline and pricing information</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}