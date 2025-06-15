import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock, PlayCircle, Download, ArrowRight, ExternalLink, Shield, Activity, Brain } from 'lucide-react'
import { QuizOnboarding } from '@/components/quiz/quiz-onboarding'
import { caseStudies } from '@/data/case-studies'
import { evidenceHighlights, prpFactsAtGlance } from '@/data/evidence-highlights'

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-summerview-white to-summerview-gray">
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
                <h1 className="text-xl font-playfair font-bold text-summerview-black">Summerview Medical</h1>
                <p className="text-sm text-summerview-dark-gray font-lato">PRP Hair Restoration</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => scrollToSection('evidence')}
                className="text-summerview-brown hover:text-summerview-brown/80"
              >
                Research
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => scrollToSection('case-studies')}
                className="text-summerview-brown hover:text-summerview-brown/80"
              >
                Case Studies
              </Button>
              <Button className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white">
                Book Consult
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Value-First */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-summerview-black mb-6">
              Could PRP Restart Your Hair Growth?
            </h1>
            <p className="text-2xl text-summerview-dark-gray mb-2 font-lato">
              2-min quiz + instant personalised plan
            </p>
            
            {/* Video Thumbnail */}
            <div className="relative max-w-2xl mx-auto my-8 rounded-xl overflow-hidden shadow-2xl cursor-pointer group">
              <img 
                src="/images/prp-explainer-thumb.jpg" 
                alt="60-second PRP explainer video"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="bg-white/90 rounded-full p-6 group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-12 h-12 text-summerview-brown" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-lato font-semibold">60-second explainer</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white px-8 py-4 text-lg font-semibold font-poppins rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setShowOnboarding(true)}
              >
                Start the Quiz
                <Clock className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-summerview-teal text-summerview-teal hover:bg-summerview-teal hover:text-white px-8 py-4 text-lg font-semibold font-poppins rounded-xl"
                onClick={() => scrollToSection('case-studies')}
              >
                View Case Studies
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRP at a Glance - 4 Rapid Facts */}
      <section className="bg-summerview-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-playfair font-bold text-summerview-black text-center mb-12">
              PRP at a Glance
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {prpFactsAtGlance.map((fact, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-summerview-gray">
                  <div className="text-4xl mb-4">{fact.icon}</div>
                  <h3 className="font-poppins font-bold text-summerview-black mb-2">{fact.title}</h3>
                  <p className="text-summerview-dark-gray font-lato mb-2">{fact.description}</p>
                  <p className="text-sm text-summerview-brown font-lato">{fact.detail}</p>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button
                variant="ghost"
                className="text-summerview-teal hover:text-summerview-teal/80"
                onClick={() => scrollToSection('evidence')}
              >
                Learn the science
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Persona Case-Study Grid */}
      <section id="case-studies" className="py-16 bg-gradient-to-br from-summerview-gray/20 to-summerview-tan/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl font-playfair font-bold text-summerview-black text-center mb-4">
              Real Patients, Real Results
            </h2>
            <p className="text-lg text-summerview-dark-gray text-center mb-12 max-w-2xl mx-auto font-lato">
              See how PRP helped patients like you achieve their hair restoration goals
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {caseStudies.map((study) => (
                <Card key={study.id} className="overflow-hidden hover:shadow-xl transition-shadow border-summerview-gray">
                  <div className="relative h-48">
                    <img 
                      src={study.visual.thumbnail} 
                      alt={study.headline}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-summerview-brown text-white px-3 py-1 rounded-full text-sm font-lato">
                      {study.statistic.value} {study.statistic.label}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-poppins font-bold text-summerview-black mb-2">
                      {study.name} • {study.headline}
                    </h3>
                    <p className="text-summerview-dark-gray font-lato mb-4 text-sm">
                      {study.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-summerview-brown font-lato">
                        {study.protocol?.sessions} sessions over {study.protocol?.interval}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-summerview-teal hover:text-summerview-teal/80"
                      >
                        Read full story
                        <ExternalLink className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research & Evidence Section */}
      <section id="evidence" className="py-16 bg-summerview-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-playfair font-bold text-summerview-black text-center mb-4">
              Clinical Evidence at a Glance
            </h2>
            <p className="text-lg text-summerview-dark-gray text-center mb-12 max-w-2xl mx-auto font-lato">
              Peer-reviewed research supporting PRP for hair restoration
            </p>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {evidenceHighlights.map((highlight, index) => (
                <Card key={highlight.id} className="p-6 hover:shadow-md transition-shadow border-summerview-gray">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-summerview-teal/20 rounded-full flex items-center justify-center">
                        <span className="text-summerview-teal font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-poppins font-semibold text-summerview-black mb-1">
                        {highlight.title}
                      </h4>
                      <p className="text-summerview-dark-gray font-lato mb-2">
                        {highlight.description}
                      </p>
                      <a 
                        href={highlight.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-summerview-teal hover:text-summerview-teal/80 font-lato inline-flex items-center"
                      >
                        {highlight.citation}
                        <ExternalLink className="ml-1 w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white">
                <Download className="mr-2 w-4 h-4" />
                Download Full Bibliography (PDF)
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Quiz Embed Section */}
      <section className="py-16 bg-gradient-to-br from-summerview-tan/20 to-summerview-gray/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-playfair font-bold text-summerview-black mb-4">
              Ready to Find Your PRP Window?
            </h2>
            <p className="text-lg text-summerview-dark-gray mb-8 max-w-2xl mx-auto font-lato">
              Our personalized quiz takes just 2 minutes and provides instant recommendations based on your unique situation
            </p>
            
            <div className="bg-summerview-white rounded-2xl p-8 max-w-2xl mx-auto shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Brain className="w-8 h-8 text-summerview-teal mx-auto mb-2" />
                  <h4 className="font-poppins font-semibold text-summerview-black mb-1">Smart Analysis</h4>
                  <p className="text-sm text-summerview-dark-gray font-lato">AI-powered recommendations</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-summerview-brown mx-auto mb-2" />
                  <h4 className="font-poppins font-semibold text-summerview-black mb-1">100% Private</h4>
                  <p className="text-sm text-summerview-dark-gray font-lato">Your data stays secure</p>
                </div>
                <div className="text-center">
                  <Activity className="w-8 h-8 text-summerview-red mx-auto mb-2" />
                  <h4 className="font-poppins font-semibold text-summerview-black mb-1">Instant Results</h4>
                  <p className="text-sm text-summerview-dark-gray font-lato">Get your plan immediately</p>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white w-full font-poppins text-lg"
                onClick={() => setShowOnboarding(true)}
              >
                Start Your Personalized Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ / Compliance Section */}
      <section className="py-16 bg-summerview-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-summerview-black text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-poppins font-semibold text-summerview-black mb-2">
                    How does PRP work for hair loss?
                  </h3>
                  <p className="text-summerview-dark-gray font-lato">
                    We draw a small sample of your blood, concentrate the platelets, and inject them into your scalp where hair is thinning. The growth factors in platelets stimulate hair follicles to regenerate.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-poppins font-semibold text-summerview-black mb-2">
                    Is PRP safe?
                  </h3>
                  <p className="text-summerview-dark-gray font-lato">
                    Because it's your own blood product, there's minimal risk of reaction. At worst, you might have some scalp soreness or redness for a day or two.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-poppins font-semibold text-summerview-black mb-2">
                    How many sessions do I need?
                  </h3>
                  <p className="text-summerview-dark-gray font-lato">
                    Optimal results typically require 3-4 monthly sessions, then occasional maintenance. Most people start to see improvement after the second session.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-poppins font-semibold text-summerview-black mb-2">
                    When will I see results?
                  </h3>
                  <p className="text-summerview-dark-gray font-lato">
                    Initial improvements may be visible at 2 months, with significant gains typically seen by month 6. Results vary based on individual factors.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-poppins font-semibold text-summerview-black mb-2">
                    Who is the best candidate?
                  </h3>
                  <p className="text-summerview-dark-gray font-lato">
                    PRP works best for early-stage thinning when follicles are still active. It's not effective for completely bald areas or scarring alopecia.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-poppins font-semibold text-summerview-black mb-2">
                    What about side effects?
                  </h3>
                  <p className="text-summerview-dark-gray font-lato">
                    Side effects are minimal since we use your own blood. Some patients experience mild scalp tenderness, swelling, or headache that resolves within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-summerview-gray/20 rounded-lg">
              <p className="text-sm text-summerview-dark-gray font-lato text-center">
                <strong>Medical Disclaimer:</strong> Results vary from person to person. PRP works best in appropriate candidates; 
                a consultation will determine if it's likely to help in your case. This information is for educational purposes 
                and does not constitute medical advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-summerview-white/95 backdrop-blur-sm border-t border-summerview-gray p-4 z-30 md:hidden">
        <Button 
          className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white w-full font-poppins"
          onClick={() => setShowOnboarding(true)}
        >
          Start Quiz • Get Your Plan
        </Button>
      </div>

      {/* Onboarding Modal */}
      <QuizOnboarding 
        open={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </div>
  )
}