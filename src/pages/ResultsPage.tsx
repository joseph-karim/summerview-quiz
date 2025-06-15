import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Calendar, Phone, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resultData } from '@/data/quiz-results'
import { WixBookingEmbed } from '@/components/booking/wix-booking-embed'
import { InteractiveTimeline } from '@/components/ui/interactive-timeline'
import { useState } from 'react'
import { useQuizStore } from '@/lib/quiz-store'
import { getCaseStudyByPersona } from '@/data/case-studies'

export default function ResultsPage() {
  const params = useParams()
  const resultType = params.type as 'ideal' | 'partial' | 'unfit'
  const [showBooking, setShowBooking] = useState(false)
  const answers = useQuizStore((state) => state.answers)
  
  const result = resultData[resultType]
  
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-summerview-red/20 to-summerview-gray/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair font-bold text-summerview-black mb-4">Invalid Result Type</h1>
          <Link to="/">
            <Button className="bg-summerview-brown text-summerview-white hover:bg-summerview-brown/90">Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Get persona-specific content
  const persona = answers[6]
  // const goal = answers[5] // Reserved for future use

  const handlePrimaryAction = () => {
    if (result.cta.primaryAction === 'book') {
      setShowBooking(true)
    } else if (result.cta.primaryAction === 'download') {
      // Trigger download
      window.open(result.additionalResources?.[0]?.url || '#', '_blank')
    }
  }

  return (
    <div className={`min-h-screen ${result.backgroundColor}`}>
      {/* Header */}
      <header className="bg-summerview-white/80 backdrop-blur-sm border-b border-summerview-gray sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 relative">
                <img
                  src="https://static.wixstatic.com/media/edd959_b50bb85146a648cd82548c2db7101568~mv2.jpg"
                  alt="Summerview Medical Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-playfair font-bold text-summerview-black">Summerview Medical</span>
                <p className="text-sm text-summerview-dark-gray font-lato">PRP Hair Restoration</p>
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
              {/* Personalize title with name if available */}
              {persona && getCaseStudyByPersona(persona) 
                ? result.title.replace('You\'re', `${getCaseStudyByPersona(persona)?.name}, You're`)
                : result.title}
            </h1>
            <p className="text-xl text-summerview-dark-gray max-w-3xl mx-auto leading-relaxed font-lato mb-4">
              {result.subtitle}
            </p>
            {'description' in result && (
              <p className="text-lg text-summerview-dark-gray max-w-2xl mx-auto leading-relaxed font-lato">
                {result.description}
              </p>
            )}
          </div>

          {/* Result-Specific Content */}
          <div className="space-y-8">
            {/* Key Points (for all result types) */}
            {'keyPoints' in result && result.keyPoints && (
              <Card className="p-8 border-summerview-gray">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {result.keyPoints.map((point, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-16 h-16 ${result.iconBg}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <point.icon className={`w-8 h-8 ${result.iconColor}`} />
                      </div>
                      <h3 className="font-poppins font-semibold text-summerview-black mb-2">{point.title}</h3>
                      <p className="text-sm text-summerview-dark-gray font-lato">{point.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Ideal Candidate Content */}
            {resultType === 'ideal' && (
              <>
                {/* Treatment Info */}
                {'treatmentInfo' in result && result.treatmentInfo && (
                  <Card className="p-8 border-summerview-gray">
                    <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-4 text-center">
                      {result.treatmentInfo.title}
                    </h2>
                    <p className="text-summerview-dark-gray font-lato mb-6 text-center max-w-2xl mx-auto">
                      {result.treatmentInfo.description}
                    </p>
                    <InteractiveTimeline />
                  </Card>
                )}

                {/* Testimonial */}
                {'testimonial' in result && result.testimonial && (
                  <Card className="p-8 border-summerview-gray">
                    <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                      Real Results from Real Patients
                    </h2>
                    <div className="max-w-2xl mx-auto">
                      <blockquote className="text-lg text-summerview-dark-gray font-lato italic mb-4 text-center">
                        "{result.testimonial.quote}"
                      </blockquote>
                      <p className="text-center font-poppins font-semibold text-summerview-black">
                        — {result.testimonial.author}
                      </p>
                    </div>
                  </Card>
                )}
              </>
            )}

            {/* Partial Fit Content */}
            {resultType === 'partial' && (
              <>
                {/* Evaluation Info */}
                {'evaluationInfo' in result && result.evaluationInfo && (
                  <Card className="p-8 border-summerview-gray">
                    <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-4 text-center">
                      {result.evaluationInfo.title}
                    </h2>
                    <p className="text-summerview-dark-gray font-lato mb-6 text-center max-w-2xl mx-auto">
                      {result.evaluationInfo.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      {result.evaluationInfo.assessmentPoints.map((point, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-summerview-teal mt-0.5" />
                          <span className="text-summerview-dark-gray font-lato">{point}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Testimonial */}
                {'testimonial' in result && result.testimonial && (
                  <Card className="p-8 border-summerview-gray bg-summerview-tan/10">
                    <div className="max-w-2xl mx-auto">
                      <blockquote className="text-lg text-summerview-dark-gray font-lato italic mb-4 text-center">
                        "{result.testimonial.quote}"
                      </blockquote>
                      <p className="text-center font-poppins font-semibold text-summerview-black">
                        — {result.testimonial.author}
                      </p>
                    </div>
                  </Card>
                )}
              </>
            )}

            {/* Not a Fit Content */}
            {resultType === 'unfit' && (
              <>
                {/* Alternative Options */}
                {'alternativeOptions' in result && result.alternativeOptions && (
                  <Card className="p-8 border-summerview-gray">
                    <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                      Recommended Alternatives
                    </h2>
                    <div className="space-y-6">
                      {result.alternativeOptions.map((option, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-summerview-gray/20 rounded-lg">
                          <div className="w-12 h-12 bg-summerview-brown/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <option.icon className="w-6 h-6 text-summerview-brown" />
                          </div>
                          <div>
                            <h3 className="font-poppins font-semibold text-summerview-black mb-2">{option.title}</h3>
                            <p className="text-summerview-dark-gray font-lato">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Support Message */}
                {'supportMessage' in result && result.supportMessage && (
                  <Card className="p-8 border-summerview-gray bg-summerview-teal/10">
                    <div className="text-center">
                      <h3 className="text-xl font-poppins font-bold text-summerview-black mb-3">
                        {result.supportMessage.title}
                      </h3>
                      <p className="text-summerview-dark-gray font-lato max-w-2xl mx-auto">
                        {result.supportMessage.description}
                      </p>
                    </div>
                  </Card>
                )}
              </>
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
                  onClick={handlePrimaryAction}
                  className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white flex-1 font-poppins"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {result.cta.primaryText}
                </Button>
                
                <Button variant="outline" className="flex-1 border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white font-poppins">
                  <Phone className="w-4 h-4 mr-2" />
                  {result.cta.secondaryText}
                </Button>
              </div>
              
              {'urgencyNote' in result.cta && result.cta.urgencyNote && (
                <div className="mt-6 text-summerview-dark-gray font-lato">
                  <Badge variant="outline" className="border-summerview-teal text-summerview-teal">
                    {result.cta.urgencyNote}
                  </Badge>
                </div>
              )}
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
                        <Button 
                          onClick={() => window.open(resource.url || '#', '_blank')}
                          variant="outline" 
                          size="sm" 
                          className="border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white font-poppins"
                        >
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
              <span>94% of RealSelf users say PRP hair treatment is "Worth It" • Board certified professionals</span>
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