"use client"

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Calendar, Download, Phone, Mail, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { resultData } from '@/data/quiz-results'
import { WixBookingEmbed } from '@/components/booking/wix-booking-embed'
import { TestimonialVideo } from '@/components/ui/testimonial-video'
import { InteractiveTimeline } from '@/components/ui/interactive-timeline'
import { useState } from 'react'
import Image from 'next/image'

export default function ResultsPage() {
  const params = useParams()
  const resultType = params.type as 'ideal' | 'partial' | 'unfit'
  const [showBooking, setShowBooking] = useState(false)
  
  const result = resultData[resultType]
  
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-summerview-red/20 to-summerview-gray/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair font-bold text-summerview-black mb-4">Invalid Result Type</h1>
          <Link href="/">
            <Button className="bg-summerview-brown text-summerview-white hover:bg-summerview-brown/90">Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${result.backgroundColor}`}>
      {/* Header */}
      <header className="bg-summerview-white/80 backdrop-blur-sm border-b border-summerview-gray sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 relative">
                <Image
                  src="https://static.wixstatic.com/media/edd959_b50bb85146a648cd82548c2db7101568~mv2.jpg"
                  alt="Summerview Medical Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-playfair font-bold text-summerview-black">Summerview Medical</span>
                <p className="text-sm text-summerview-dark-gray font-lato">PRP Hair Window Finder</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-summerview-teal text-summerview-white">
              Quiz Complete
            </Badge>
          </div>
        </div>
      </header>

      {/* Results Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Result Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`w-20 h-20 ${result.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <result.icon className={`w-10 h-10 ${result.iconColor}`} />
            </motion.div>
            
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-summerview-black mb-4">
              {result.title}
            </h1>
            <p className="text-xl text-summerview-dark-gray max-w-3xl mx-auto leading-relaxed font-lato">
              {result.subtitle}
            </p>
          </div>

          {/* Result-Specific Content */}
          <div className="space-y-8">
            {/* Ideal Candidate Content */}
            {resultType === 'ideal' && (
              <>
                {/* Testimonial Video */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    See Results from Someone Like You
                  </h2>
                  <TestimonialVideo
                    videoUrl="/videos/testimonial-ideal.mp4"
                    thumbnail="/images/testimonial-thumb.jpg"
                    name="Sarah M."
                    age={35}
                    description="Postpartum Mom • 4 Months Results"
                  />
                </Card>

                {/* Interactive Timeline */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Your PRP Journey: What to Expect
                  </h2>
                  <InteractiveTimeline />
                </Card>
              </>
            )}

            {/* Partial Fit Content */}
            {resultType === 'partial' && (
              <Card className="p-8 border-summerview-gray">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-4">
                      Let's Explore Your Options
                    </h2>
                    <p className="text-summerview-dark-gray font-lato mb-6">
                      You might be in the early stages of hair loss. A scalp analysis can help 
                      determine if PRP is right for you, or if other treatments would be more effective.
                    </p>
                    <ul className="space-y-3 text-summerview-dark-gray font-lato">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-summerview-teal mt-0.5" />
                        <span>Comprehensive scalp analysis</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-summerview-teal mt-0.5" />
                        <span>Alternative treatment options</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-summerview-teal mt-0.5" />
                        <span>Personalized treatment plan</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="bg-summerview-tan/20 rounded-2xl p-6">
                      <Download className="w-12 h-12 text-summerview-brown mx-auto mb-4" />
                      <h3 className="font-poppins font-semibold text-summerview-black mb-2">Free Hair Health Guide</h3>
                      <p className="text-sm text-summerview-dark-gray font-lato mb-4">
                        Download our comprehensive guide to understanding hair loss and treatment options
                      </p>
                      <Button variant="outline" className="w-full border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white">
                        Download Guide
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Not a Fit Content */}
            {resultType === 'unfit' && (
              <Card className="p-8 border-summerview-gray">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-4">
                    Don't Worry - You Have Options
                  </h2>
                  <p className="text-summerview-dark-gray max-w-2xl mx-auto font-lato">
                    While PRP might not be the right approach for you right now, there are still 
                    effective paths forward for your hair restoration journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-summerview-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-summerview-brown" />
                    </div>
                    <h3 className="font-poppins font-semibold text-summerview-black mb-2">5 Alternatives to PRP</h3>
                    <p className="text-sm text-summerview-dark-gray font-lato mb-4">
                      Comprehensive guide to other effective treatments
                    </p>
                    <Button variant="outline" size="sm" className="border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white">Download</Button>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-summerview-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-summerview-teal" />
                    </div>
                    <h3 className="font-poppins font-semibold text-summerview-black mb-2">Hair Transplant Consultation</h3>
                    <p className="text-sm text-summerview-dark-gray font-lato mb-4">
                      Explore surgical options with our partners
                    </p>
                    <Button variant="outline" size="sm" className="border-summerview-teal text-summerview-teal hover:bg-summerview-teal hover:text-summerview-white">Learn More</Button>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-summerview-tan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-summerview-brown" />
                    </div>
                    <h3 className="font-poppins font-semibold text-summerview-black mb-2">Diagnostic Session</h3>
                    <p className="text-sm text-summerview-dark-gray font-lato mb-4">
                      Get a professional evaluation of your options
                    </p>
                    <Button variant="outline" size="sm" className="border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white">Schedule</Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Call to Action */}
            <Card className="p-8 text-center bg-summerview-tan/10 border-summerview-tan">
              <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-4">
                {result.cta.title}
              </h2>
              <p className="text-summerview-dark-gray font-lato mb-6 max-w-2xl mx-auto">
                {result.cta.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button
                  onClick={() => setShowBooking(true)}
                  className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white flex-1 font-poppins"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {result.cta.primaryText}
                </Button>
                
                <Button variant="outline" className="flex-1 border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white font-poppins">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </div>
              
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-summerview-dark-gray font-lato">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-summerview-teal" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-summerview-teal" />
                  <span>No obligation</span>
                </div>
              </div>
            </Card>

            {/* Additional Resources */}
            {result.additionalResources && (
              <Card className="p-8 border-summerview-gray">
                <h2 className="text-xl font-poppins font-bold text-summerview-black mb-6">Additional Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.additionalResources.map((resource, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-summerview-gray/30 rounded-lg">
                      <div className="w-10 h-10 bg-summerview-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-5 h-5 text-summerview-teal" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-poppins font-semibold text-summerview-black mb-1">{resource.title}</h3>
                        <p className="text-sm text-summerview-dark-gray font-lato mb-3">{resource.description}</p>
                        <Button variant="outline" size="sm" className="border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white font-poppins">
                          {resource.buttonText}
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-summerview-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-summerview-dark-gray font-lato">
              <CheckCircle className="w-4 h-4 text-summerview-teal" />
              <span>3,200+ successful PRP treatments • Board certified professionals</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Booking Modal */}
      <WixBookingEmbed
        open={showBooking}
        onClose={() => setShowBooking(false)}
        resultType={resultType}
      />
    </div>
  )
}