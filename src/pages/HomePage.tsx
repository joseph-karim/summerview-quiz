import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PlayCircle, Download, ArrowRight, ExternalLink, Shield, Activity, Brain, Droplets, Zap, Calendar, ChevronRight } from 'lucide-react'
import { QuizOnboarding } from '@/components/quiz/quiz-onboarding'
import { caseStudies } from '@/data/case-studies'
import { evidenceHighlights } from '@/data/evidence-highlights'

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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-summerview-white via-summerview-tan/10 to-summerview-teal/10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-summerview-black mb-6 leading-tight">
                See thicker, fuller hair in the mirror by this summer—<br className="hidden lg:block" />
                using your own cells.
              </h1>
              
              <p className="text-xl lg:text-2xl text-summerview-dark-gray mb-6 font-lato">
                2-minute PRP Candidacy Quiz → Instant personalised plan → Free MD consult
              </p>
              
              <div className="max-w-3xl mx-auto mb-8">
                <p className="text-lg text-summerview-dark-gray font-lato leading-relaxed">
                  <strong>No drugs. No surgery. No guess-work.</strong> Our evidence-backed process shows whether your follicles are still alive—and how to wake them up before it's too late.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white px-8 py-4 text-lg font-semibold font-poppins rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setShowOnboarding(true)}
                >
                  Start the 2-minute Quiz
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm text-summerview-dark-gray">
                <button className="hover:text-summerview-teal transition-colors flex items-center">
                  <PlayCircle className="w-4 h-4 mr-1" />
                  Watch 60-sec explainer
                </button>
                <span className="text-summerview-gray">•</span>
                <button 
                  onClick={() => scrollToSection('case-studies')}
                  className="hover:text-summerview-teal transition-colors flex items-center"
                >
                  View patient results
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reality Check Strip */}
      <section className="bg-summerview-red/5 py-12 border-y border-summerview-red/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl lg:text-3xl font-playfair font-bold text-summerview-black text-center mb-8">
              "Every day a shrinking follicle goes untreated, you lose more ground."
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              <Card className="p-6 bg-white border-summerview-gray">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-summerview-red mb-2">68%</div>
                  <p className="text-sm text-summerview-dark-gray">of post-partum mums report visible scalp within 4 months</p>
                </div>
                <div className="border-t border-summerview-gray pt-4">
                  <p className="text-sm text-summerview-dark-gray">
                    <strong>Why it matters:</strong> Diffuse telogen effluvium can snowball—PRP can shorten recovery if caught early.
                  </p>
                  <a href="https://health.harvard.edu" className="text-xs text-summerview-teal hover:underline mt-2 inline-block">
                    health.harvard.edu →
                  </a>
                </div>
              </Card>
              
              <Card className="p-6 bg-white border-summerview-gray">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-summerview-red mb-2">24</div>
                  <p className="text-sm text-summerview-dark-gray">months until men reach 'point of no return' after crown thinning starts</p>
                </div>
                <div className="border-t border-summerview-gray pt-4">
                  <p className="text-sm text-summerview-dark-gray">
                    <strong>Why it matters:</strong> Past that, follicles often miniaturise beyond rescue.
                  </p>
                  <a href="https://pmc.ncbi.nlm.nih.gov" className="text-xs text-summerview-teal hover:underline mt-2 inline-block">
                    pmc.ncbi.nlm.nih.gov →
                  </a>
                </div>
              </Card>
              
              <Card className="p-6 bg-white border-summerview-gray">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-summerview-red mb-2">+24</div>
                  <p className="text-sm text-summerview-dark-gray">hairs/cm² gained by early-action PRP users at 16 weeks</p>
                </div>
                <div className="border-t border-summerview-gray pt-4">
                  <p className="text-sm text-summerview-dark-gray">
                    <strong>Why it matters:</strong> Objective regrowth, not just "looks better."
                  </p>
                  <a href="https://pmc.ncbi.nlm.nih.gov" className="text-xs text-summerview-teal hover:underline mt-2 inline-block">
                    pmc.ncbi.nlm.nih.gov →
                  </a>
                </div>
              </Card>
            </div>
            
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-summerview-dark-gray mb-6">
                Putting treatment off doesn't just pause progress—it silently converts living follicles into scar-like tissue PRP can't revive. 
                Take two minutes now to see if you're still in the save-zone.
              </p>
              <Button 
                className="bg-summerview-red hover:bg-summerview-red/90 text-white"
                onClick={() => setShowOnboarding(true)}
              >
                Take the 2-minute Check
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Discovery Story */}
      <section className="bg-summerview-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-playfair font-bold text-summerview-black text-center mb-12">
              "Healing sports injuries showed us how to rescue hair."
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-5xl font-bold text-summerview-teal mb-2">2006</div>
                  <h3 className="font-semibold text-summerview-black mb-2">Sideline surprise</h3>
                  <p className="text-sm text-summerview-dark-gray">
                    Orthopaedic surgeons noticed elite athletes' ligaments healed 40% faster after platelet-rich plasma (PRP) injections.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl font-bold text-summerview-brown mb-2">2009</div>
                  <h3 className="font-semibold text-summerview-black mb-2">Dermatology asks "what if?"</h3>
                  <p className="text-sm text-summerview-dark-gray">
                    Early scalp trials hinted that the same growth factors (PDGF, VEGF, IGF-1) could jump-start dormant follicles.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl font-bold text-summerview-tan mb-2">2025</div>
                  <h3 className="font-semibold text-summerview-black mb-2">40+ studies later</h3>
                  <p className="text-sm text-summerview-dark-gray">
                    Meta-analysis of 13 RCTs confirms statistically significant density gains in androgenetic alopecia when PRP is used before total follicle death.
                  </p>
                </div>
              </div>
              
              <Card className="p-6 bg-summerview-teal/10 border-summerview-teal">
                <p className="text-center text-summerview-dark-gray">
                  <strong className="text-summerview-black">Take-home:</strong> PRP isn't snake oil—it's autologous tissue engineering. 
                  The only catch? Timing. Late-stage shiny scalp = transplant territory.
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <a href="https://pubmed.ncbi.nlm.nih.gov" className="text-sm text-summerview-teal hover:underline">
                    pubmed.ncbi.nlm.nih.gov →
                  </a>
                  <a href="https://pmc.ncbi.nlm.nih.gov" className="text-sm text-summerview-teal hover:underline">
                    pmc.ncbi.nlm.nih.gov →
                  </a>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Process */}
      <section className="py-16 bg-gradient-to-br from-summerview-gray/20 to-summerview-tan/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl font-playfair font-bold text-summerview-black text-center mb-12">
              How It Works
            </h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-summerview-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Droplets className="w-8 h-8 text-summerview-teal" />
                  </div>
                  <div className="text-2xl font-bold text-summerview-teal mb-2">1</div>
                  <h3 className="font-semibold text-summerview-black mb-2">Draw 10ml blood</h3>
                  <p className="text-sm text-summerview-dark-gray mb-2">Same as routine lab work</p>
                  <p className="text-xs text-summerview-brown font-semibold">2 min</p>
                </Card>
                
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-summerview-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-summerview-brown" />
                  </div>
                  <div className="text-2xl font-bold text-summerview-brown mb-2">2</div>
                  <h3 className="font-semibold text-summerview-black mb-2">Spin @ 1,500g</h3>
                  <p className="text-sm text-summerview-dark-gray mb-2">Centrifuge isolates platelet concentrate</p>
                  <p className="text-xs text-summerview-brown font-semibold">8 min</p>
                </Card>
                
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-summerview-tan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-summerview-tan" />
                  </div>
                  <div className="text-2xl font-bold text-summerview-tan mb-2">3</div>
                  <h3 className="font-semibold text-summerview-black mb-2">Activate & micro-inject</h3>
                  <p className="text-sm text-summerview-dark-gray mb-2">Calcium chloride + derma-needle fan over thinning zones</p>
                  <p className="text-xs text-summerview-brown font-semibold">12 min</p>
                </Card>
                
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-summerview-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-summerview-red" />
                  </div>
                  <div className="text-2xl font-bold text-summerview-red mb-2">4</div>
                  <h3 className="font-semibold text-summerview-black mb-2">Growth cycle</h3>
                  <p className="text-sm text-summerview-dark-gray mb-2">Platelets release cytokines → thicker shafts, longer anagen phase</p>
                  <p className="text-xs text-summerview-brown font-semibold">3-6 mo</p>
                </Card>
              </div>
              
              <div className="mt-8 p-4 bg-summerview-white rounded-lg text-center">
                <p className="text-sm text-summerview-dark-gray">
                  <strong>Comfort note:</strong> Most clients rate discomfort 2-3/10 and drive home within the hour. 
                  Mild redness resolves in 24h. 
                  <a href="https://health.harvard.edu" className="text-summerview-teal hover:underline ml-1">
                    health.harvard.edu →
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Carousel */}
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

      {/* Offer Box */}
      <section className="py-16 bg-gradient-to-br from-summerview-teal/10 to-summerview-tan/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white shadow-xl border-2 border-summerview-teal">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-playfair font-bold text-summerview-black mb-4">
                    Special Offer: 30% Off PRP Packages
                  </h2>
                  <p className="text-lg text-summerview-dark-gray">
                    Book by Jan 31st for 2025's best rates
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-summerview-gray/10 rounded-lg">
                    <div className="text-2xl font-bold text-summerview-black mb-2">£1,199</div>
                    <div className="text-lg font-semibold mb-2">Single Session</div>
                    <p className="text-sm text-summerview-dark-gray">Try PRP risk-free</p>
                  </div>
                  
                  <div className="text-center p-4 bg-summerview-teal/20 rounded-lg border-2 border-summerview-teal">
                    <div className="text-sm font-bold text-summerview-teal mb-1">MOST POPULAR</div>
                    <div className="text-2xl font-bold text-summerview-black mb-2">£2,999</div>
                    <div className="text-lg font-semibold mb-2">3-Session Package</div>
                    <p className="text-sm text-summerview-dark-gray">Save £598 (30% off)</p>
                  </div>
                  
                  <div className="text-center p-4 bg-summerview-gray/10 rounded-lg">
                    <div className="text-2xl font-bold text-summerview-black mb-2">£3,999</div>
                    <div className="text-lg font-semibold mb-2">4 Sessions + Maintenance</div>
                    <p className="text-sm text-summerview-dark-gray">Best long-term value</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-summerview-brown hover:bg-summerview-brown/90 text-white"
                    onClick={() => setShowOnboarding(true)}
                  >
                    Check Your Candidacy First
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <p className="text-sm text-summerview-dark-gray mt-3">
                    *Must be deemed suitable candidate after consultation
                  </p>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof Strip */}
      <section className="py-8 bg-summerview-brown text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <p className="text-sm">PRP treatments</p>
            </div>
            <div className="text-3xl">•</div>
            <div>
              <div className="text-3xl font-bold">94%</div>
              <p className="text-sm">Patient satisfaction</p>
            </div>
            <div className="text-3xl">•</div>
            <div>
              <div className="text-3xl font-bold">Dr. Khan</div>
              <p className="text-sm">Hair restoration specialist</p>
            </div>
            <div className="text-3xl">•</div>
            <div>
              <div className="text-3xl font-bold">CQC</div>
              <p className="text-sm">Registered clinic</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-summerview-black text-center mb-12">
              "If hair medication failed you, PRP might be your 'second chance'."
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-summerview-dark-gray mb-6">
                Let's be honest: You've probably tried minoxidil. Maybe finasteride. Possibly every vitamin on Amazon. 
                And if you're reading this, they likely disappointed you.
              </p>
              
              <p className="text-summerview-dark-gray mb-6">
                Here's why PRP is different: It doesn't rely on your hormones or your genetics playing nice. 
                Instead, it delivers a concentrated dose of your own growth factors directly to struggling follicles—like 
                giving a dying plant superfood instead of regular water.
              </p>
              
              <Card className="p-6 bg-summerview-tan/10 border-summerview-tan mb-6">
                <h3 className="font-semibold text-summerview-black mb-3">The science, simplified:</h3>
                <ul className="space-y-2 text-summerview-dark-gray">
                  <li>• Platelets contain 30+ growth factors (PDGF, VEGF, IGF-1, etc.)</li>
                  <li>• When activated, they trigger stem cells in your follicle bulge</li>
                  <li>• This extends the anagen (growth) phase from 2-3 years to 4-6 years</li>
                  <li>• Result: Thicker shafts, less shedding, more coverage</li>
                </ul>
              </Card>
              
              <p className="text-summerview-dark-gray mb-6">
                The catch? It only works if you still have follicles to save. Once they're scarred over 
                (that shiny scalp look), even PRP can't bring them back. That's why timing matters.
              </p>
              
              <div className="text-center">
                <Button
                  variant="outline"
                  className="border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-white"
                  onClick={() => setShowOnboarding(true)}
                >
                  Find Out If You Still Have Time
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal */}
      <section className="py-16 bg-gradient-to-br from-summerview-gray/20 to-summerview-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 text-summerview-teal mx-auto mb-6" />
            <h2 className="text-3xl font-playfair font-bold text-summerview-black mb-6">
              Our "No False Hope" Promise
            </h2>
            <p className="text-lg text-summerview-dark-gray mb-8">
              After your consultation, if we don't believe PRP can help you achieve meaningful results, 
              we'll tell you honestly—and refer you to alternatives. No pressure, no false promises.
            </p>
            
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="font-semibold text-summerview-black mb-4">What's included in your free consultation:</h3>
              <ul className="space-y-3 text-left text-summerview-dark-gray">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-summerview-teal mr-2 flex-shrink-0 mt-0.5" />
                  <span>Microscopic follicle analysis to determine viability</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-summerview-teal mr-2 flex-shrink-0 mt-0.5" />
                  <span>Honest assessment of expected results based on your pattern</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-summerview-teal mr-2 flex-shrink-0 mt-0.5" />
                  <span>Personalized treatment timeline and cost breakdown</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-summerview-teal mr-2 flex-shrink-0 mt-0.5" />
                  <span>Alternative recommendations if PRP isn't suitable</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Clinic Credentials */}
      <section className="py-16 bg-summerview-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-summerview-black text-center mb-12">
              Why Summerview for Your PRP Journey
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="font-semibold text-summerview-black mb-4">Medical Excellence</h3>
                <ul className="space-y-3 text-summerview-dark-gray">
                  <li>• Dr. Samina Khan: 15+ years in aesthetic medicine</li>
                  <li>• 500+ PRP procedures performed</li>
                  <li>• Advanced Angel PRP system (3x platelet concentration)</li>
                  <li>• CQC registered & fully insured</li>
                </ul>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold text-summerview-black mb-4">Patient-First Approach</h3>
                <ul className="space-y-3 text-summerview-dark-gray">
                  <li>• No-pressure consultations</li>
                  <li>• Transparent pricing (no hidden fees)</li>
                  <li>• Flexible payment plans available</li>
                  <li>• Aftercare support included</li>
                </ul>
              </Card>
            </div>
            
            <div className="mt-8 p-6 bg-summerview-teal/10 rounded-lg text-center">
              <p className="text-summerview-dark-gray">
                <strong className="text-summerview-black">Location:</strong> Colnbrook, near Heathrow • 
                Easy access from London, Reading, and the M25 • Free parking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Close */}
      <section className="py-16 bg-gradient-to-br from-summerview-tan/20 to-summerview-gray/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold text-summerview-black mb-6">
              Every Month You Wait = More Follicles Lost Forever
            </h2>
            <p className="text-lg text-summerview-dark-gray mb-8">
              Take 2 minutes now to see if you're still in the window where PRP can help. 
              It's free, instant, and could save your hair.
            </p>
            
            <Button
              size="lg"
              className="bg-summerview-red hover:bg-summerview-red/90 text-white"
              onClick={() => setShowOnboarding(true)}
            >
              Take the Quiz Before It's Too Late
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-sm text-summerview-dark-gray mt-4">
              Join 500+ patients who found their path forward
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Footer */}
      <footer className="py-8 bg-summerview-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm space-y-2">
            <p>© 2025 Summerview Medical Ltd. All rights reserved.</p>
            <p>
              Medical Disclaimer: Individual results vary. This website provides general information about PRP hair restoration 
              and does not constitute medical advice. A consultation is required to determine candidacy.
            </p>
            <p>CQC Provider ID: 1-9376542891 | ICO Registration: ZA807142</p>
          </div>
        </div>
      </footer>

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