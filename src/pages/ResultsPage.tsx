import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Calendar, Phone, ArrowRight, TrendingUp, AlertCircle, Microscope, DollarSign, Syringe, Users, Sparkles, ChevronRight, Clock as ClockIcon, Shield as ShieldIcon, Baby, User, Heart, Download, Camera, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resultData } from '@/data/quiz-results'
import { WixBookingEmbed } from '@/components/booking/wix-booking-embed'
import { InteractiveTimeline } from '@/components/ui/interactive-timeline'
import { useState } from 'react'
import { useQuizStore } from '@/lib/quiz-store'

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
  const persona = answers[6] as string
  
  // Get persona details for personalization
  const personaDetails: Record<string, any> = {
    postpartum: {
      name: 'Sarah',
      age: '30-40',
      icon: Baby,
      tagline: 'Postpartum Mom',
      resultTitle: "You're in the Postpartum PRP Window",
      headline: "You're not alone — and yes, it can grow back.",
      primaryColor: 'summerview-teal'
    },
    male_early: {
      name: 'Mike',
      age: '35-50',
      icon: User,
      tagline: 'Early Stage Hair Loss',
      resultTitle: "You're Likely a Strong PRP Candidate",
      headline: "You've still got time — PRP can help protect and regrow.",
      primaryColor: 'summerview-brown'
    },
    stressed: {
      name: 'Jade',
      age: '25-35',
      icon: Heart,
      tagline: 'Stress-Related Shedding',
      resultTitle: "You're in the Stress Recovery Zone",
      headline: "Stress took its toll. PRP might give you the reset.",
      primaryColor: 'summerview-tan'
    },
    female_mature: {
      name: 'Linda',
      age: '40+',
      icon: Star,
      tagline: 'Hormonal Changes',
      resultTitle: "Hormonal Hair Loss Can Be Addressed",
      headline: "Menopause doesn't mean giving up on your hair.",
      primaryColor: 'summerview-teal'
    },
    other: {
      name: 'Patient',
      age: '',
      icon: Users,
      tagline: 'Hair Restoration Candidate',
      resultTitle: result.title,
      headline: result.subtitle,
      primaryColor: 'summerview-brown'
    }
  }
  
  const currentPersona = personaDetails[persona] || personaDetails.other

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
          {/* Personalized Result Header */}
          <div className="text-center mb-12">
            {/* Persona Identifier */}
            {persona && persona !== 'other' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <Badge className={`bg-${currentPersona.primaryColor}/20 text-${currentPersona.primaryColor} border-${currentPersona.primaryColor}`}>
                  <currentPersona.icon className="w-4 h-4 mr-1" />
                  {currentPersona.tagline}
                </Badge>
              </motion.div>
            )}
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`w-20 h-20 ${result.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <result.icon className={`w-10 h-10 ${result.iconColor}`} />
            </motion.div>
            
            {/* Personalized Title */}
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-summerview-black mb-4">
              {resultType === 'ideal' && persona !== 'other' 
                ? currentPersona.resultTitle
                : result.title}
            </h1>
            
            {/* Personalized Headline */}
            <p className="text-xl text-summerview-dark-gray max-w-3xl mx-auto leading-relaxed font-lato mb-4">
              {resultType === 'ideal' && persona !== 'other'
                ? currentPersona.headline
                : result.subtitle}
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
                {/* Educational Block */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Understanding Your Hair Loss
                  </h2>
                  
                  {persona === 'postpartum' && (
                    <div className="space-y-4">
                      <p className="text-lg text-summerview-dark-gray leading-relaxed">
                        The hair shedding you're experiencing is likely <strong>postpartum telogen effluvium</strong>. 
                        PRP is one of the most trusted options to help jumpstart regrowth — especially in the first 12 months after delivery.
                      </p>
                      <div className="p-6 bg-summerview-teal/10 rounded-lg">
                        <p className="text-summerview-dark-gray italic">
                          "This isn't just cosmetic — it's about feeling like yourself again."
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-4">
                          <div className="text-3xl font-bold text-summerview-teal mb-1">85%</div>
                          <p className="text-sm text-summerview-dark-gray">of postpartum women experience hair loss</p>
                        </div>
                        <div className="text-center p-4">
                          <div className="text-3xl font-bold text-summerview-teal mb-1">3-6</div>
                          <p className="text-sm text-summerview-dark-gray">months typical recovery with PRP</p>
                        </div>
                        <div className="text-center p-4">
                          <div className="text-3xl font-bold text-summerview-teal mb-1">68%</div>
                          <p className="text-sm text-summerview-dark-gray">reduction in shedding after treatment</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {persona === 'male_early' && (
                    <div className="space-y-4">
                      <p className="text-lg text-summerview-dark-gray leading-relaxed">
                        What you're experiencing is <strong>early-stage androgenetic alopecia</strong> — and that's exactly when PRP works best.
                      </p>
                      <div className="p-6 bg-summerview-brown/10 rounded-lg">
                        <p className="text-summerview-dark-gray font-semibold">
                          "Our goal isn't miracles. It's to keep what you have and regrow what's fading."
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="p-4 border border-summerview-gray rounded-lg">
                          <h4 className="font-semibold text-summerview-black mb-2">Why Now Matters</h4>
                          <ul className="space-y-2 text-sm text-summerview-dark-gray">
                            <li className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                              <span>Follicles are still active and salvageable</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                              <span>Can prevent further miniaturization</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                              <span>Better results than waiting until advanced loss</span>
                            </li>
                          </ul>
                        </div>
                        <div className="p-4 border border-summerview-gray rounded-lg">
                          <h4 className="font-semibold text-summerview-black mb-2">Expected Outcomes</h4>
                          <ul className="space-y-2 text-sm text-summerview-dark-gray">
                            <li className="flex items-start">
                              <TrendingUp className="w-4 h-4 text-summerview-brown mt-0.5 mr-2 flex-shrink-0" />
                              <span>30-40% increase in hair density</span>
                            </li>
                            <li className="flex items-start">
                              <TrendingUp className="w-4 h-4 text-summerview-brown mt-0.5 mr-2 flex-shrink-0" />
                              <span>Thicker, stronger existing hair</span>
                            </li>
                            <li className="flex items-start">
                              <TrendingUp className="w-4 h-4 text-summerview-brown mt-0.5 mr-2 flex-shrink-0" />
                              <span>Slower progression of hair loss</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {persona === 'stressed' && (
                    <div className="space-y-4">
                      <p className="text-lg text-summerview-dark-gray leading-relaxed">
                        If you've been losing hair after a period of intense stress, overtraining, or burnout — you're not alone. 
                        This is often a form of <strong>telogen effluvium</strong>.
                      </p>
                      <div className="p-6 bg-summerview-tan/10 rounded-lg">
                        <p className="text-summerview-dark-gray">
                          "PRP doesn't just slow the loss — it encourages recovery from within, using your body's own growth factors."
                        </p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-semibold text-summerview-black mb-3">Common Stress Triggers</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="text-center p-3 bg-summerview-gray/20 rounded-lg">
                            <p className="text-sm text-summerview-dark-gray">Work burnout</p>
                          </div>
                          <div className="text-center p-3 bg-summerview-gray/20 rounded-lg">
                            <p className="text-sm text-summerview-dark-gray">Major life change</p>
                          </div>
                          <div className="text-center p-3 bg-summerview-gray/20 rounded-lg">
                            <p className="text-sm text-summerview-dark-gray">Illness/recovery</p>
                          </div>
                          <div className="text-center p-3 bg-summerview-gray/20 rounded-lg">
                            <p className="text-sm text-summerview-dark-gray">Extreme dieting</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
                {/* Timeline Preview */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Your Expected Recovery Timeline
                  </h2>
                  
                  {persona === 'postpartum' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-summerview-teal/10 rounded-lg">
                          <div className="text-lg font-bold text-summerview-teal mb-2">Month 1</div>
                          <h4 className="font-semibold text-summerview-black mb-2">Less Shedding</h4>
                          <p className="text-sm text-summerview-dark-gray">Follicles stabilize, daily hair fall reduces significantly</p>
                        </div>
                        <div className="text-center p-6 bg-summerview-teal/10 rounded-lg">
                          <div className="text-lg font-bold text-summerview-teal mb-2">Month 3</div>
                          <h4 className="font-semibold text-summerview-black mb-2">Baby Hairs Appear</h4>
                          <p className="text-sm text-summerview-dark-gray">New growth visible along hairline and part</p>
                        </div>
                        <div className="text-center p-6 bg-summerview-teal/10 rounded-lg">
                          <div className="text-lg font-bold text-summerview-teal mb-2">Month 6</div>
                          <h4 className="font-semibold text-summerview-black mb-2">Noticeable Thickening</h4>
                          <p className="text-sm text-summerview-dark-gray">Fuller ponytail, less scalp showing through</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {persona === 'male_early' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-summerview-brown/10 rounded-lg">
                          <div className="text-lg font-bold text-summerview-brown mb-2">Month 1</div>
                          <h4 className="font-semibold text-summerview-black mb-2">Stabilization</h4>
                          <p className="text-sm text-summerview-dark-gray">Reduced daily shedding, scalp feels healthier</p>
                        </div>
                        <div className="text-center p-6 bg-summerview-brown/10 rounded-lg">
                          <div className="text-lg font-bold text-summerview-brown mb-2">Month 3</div>
                          <h4 className="font-semibold text-summerview-black mb-2">Texture Change</h4>
                          <p className="text-sm text-summerview-dark-gray">Visible baby hairs in temples/crown area</p>
                        </div>
                        <div className="text-center p-6 bg-summerview-brown/10 rounded-lg">
                          <div className="text-lg font-bold text-summerview-brown mb-2">Month 6</div>
                          <h4 className="font-semibold text-summerview-black mb-2">Improved Density</h4>
                          <p className="text-sm text-summerview-dark-gray">Fuller appearance where follicles are active</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {persona === 'stressed' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-summerview-tan/10 rounded-lg">
                          <div className="text-lg font-bold text-summerview-tan mb-2">Month 1</div>
                          <h4 className="font-semibold text-summerview-black mb-1">Less Hair Fall</h4>
                          <p className="text-xs text-summerview-dark-gray">Calmer scalp</p>
                        </div>
                        <div className="text-center p-4 bg-summerview-tan/10 rounded-lg">
                          <div className="text-lg font-bold text-summerview-tan mb-2">Month 2-3</div>
                          <h4 className="font-semibold text-summerview-black mb-1">Small Regrowth</h4>
                          <p className="text-xs text-summerview-dark-gray">Along part/hairline</p>
                        </div>
                        <div className="text-center p-4 bg-summerview-tan/10 rounded-lg">
                          <div className="text-lg font-bold text-summerview-tan mb-2">Month 4-6</div>
                          <h4 className="font-semibold text-summerview-black mb-1">Bounce Returns</h4>
                          <p className="text-xs text-summerview-dark-gray">Fuller ponytail</p>
                        </div>
                        <div className="text-center p-4 bg-summerview-tan/10 rounded-lg">
                          <div className="text-lg font-bold text-summerview-tan mb-2">Ongoing</div>
                          <h4 className="font-semibold text-summerview-black mb-1">Maintenance</h4>
                          <p className="text-xs text-summerview-dark-gray">Quarterly touch-ups</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(!persona || persona === 'other' || persona === 'female_mature') && (
                    <InteractiveTimeline />
                  )}
                </Card>
                
                {/* Why PRP Works for You */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Why PRP is Perfect for Your Situation
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-summerview-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Microscope className="w-5 h-5 text-summerview-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-summerview-black mb-1">Active Follicles Detected</h3>
                          <p className="text-sm text-summerview-dark-gray">Based on your timeline and progression, you likely have miniaturized follicles that can be revived with growth factors.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-summerview-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-5 h-5 text-summerview-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-summerview-black mb-1">Early Intervention Advantage</h3>
                          <p className="text-sm text-summerview-dark-gray">You're catching this early enough that PRP can prevent further miniaturization and strengthen existing hair.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-summerview-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-summerview-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-summerview-black mb-1">Similar Patient Success</h3>
                          <p className="text-sm text-summerview-dark-gray">Patients with your profile typically see 30-40% improvement in hair density after completing treatment.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-summerview-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-summerview-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-summerview-black mb-1">Natural & Drug-Free</h3>
                          <p className="text-sm text-summerview-dark-gray">PRP uses your body's own healing factors - no systemic medications or side effects to worry about.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Treatment Process Details */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Your PRP Treatment Journey
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-summerview-tan/10 rounded-lg">
                      <div className="w-16 h-16 bg-summerview-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Syringe className="w-8 h-8 text-summerview-brown" />
                      </div>
                      <h3 className="font-semibold text-summerview-black mb-2">Phase 1: Treatment</h3>
                      <p className="text-sm text-summerview-dark-gray">3-4 monthly sessions, 60 minutes each. We draw blood, separate platelets, and inject into thinning areas.</p>
                    </div>
                    <div className="text-center p-6 bg-summerview-tan/10 rounded-lg">
                      <div className="w-16 h-16 bg-summerview-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ClockIcon className="w-8 h-8 text-summerview-brown" />
                      </div>
                      <h3 className="font-semibold text-summerview-black mb-2">Phase 2: Growth</h3>
                      <p className="text-sm text-summerview-dark-gray">Months 3-6: New hair growth becomes visible. Existing hair thickens. Full results by month 6.</p>
                    </div>
                    <div className="text-center p-6 bg-summerview-tan/10 rounded-lg">
                      <div className="w-16 h-16 bg-summerview-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldIcon className="w-8 h-8 text-summerview-brown" />
                      </div>
                      <h3 className="font-semibold text-summerview-black mb-2">Phase 3: Maintenance</h3>
                      <p className="text-sm text-summerview-dark-gray">1-2 treatments per year to maintain results. Many patients combine with at-home care for best outcomes.</p>
                    </div>
                  </div>
                  <InteractiveTimeline />
                </Card>

                {/* What to Expect */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Realistic Expectations & Success Metrics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-summerview-black mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-summerview-teal mr-2" />
                        What PRP Can Do
                      </h3>
                      <ul className="space-y-3 text-sm text-summerview-dark-gray">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                          <span>Increase hair density by 30-40% in treated areas</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                          <span>Thicken existing hair shaft diameter</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                          <span>Reduce hair shedding significantly</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                          <span>Stimulate dormant follicles to re-enter growth phase</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-summerview-black mb-4 flex items-center">
                        <AlertCircle className="w-5 h-5 text-summerview-tan mr-2" />
                        What PRP Cannot Do
                      </h3>
                      <ul className="space-y-3 text-sm text-summerview-dark-gray">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-tan mt-0.5 mr-2 flex-shrink-0" />
                          <span>Create new follicles where none exist</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-tan mt-0.5 mr-2 flex-shrink-0" />
                          <span>Restore a juvenile hairline</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-tan mt-0.5 mr-2 flex-shrink-0" />
                          <span>Work on completely bald areas</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-tan mt-0.5 mr-2 flex-shrink-0" />
                          <span>Provide permanent results without maintenance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Investment & Value */}
                <Card className="p-8 border-summerview-gray bg-summerview-tan/10">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Investment & Value
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <DollarSign className="w-8 h-8 text-summerview-brown mx-auto mb-2" />
                      <h3 className="font-semibold text-summerview-black mb-1">Initial Series</h3>
                      <p className="text-2xl font-bold text-summerview-brown mb-1">$2,400-$3,600</p>
                      <p className="text-sm text-summerview-dark-gray">3-4 treatments</p>
                    </div>
                    <div className="text-center">
                      <DollarSign className="w-8 h-8 text-summerview-brown mx-auto mb-2" />
                      <h3 className="font-semibold text-summerview-black mb-1">Per Session</h3>
                      <p className="text-2xl font-bold text-summerview-brown mb-1">$600-$900</p>
                      <p className="text-sm text-summerview-dark-gray">Individual treatment</p>
                    </div>
                    <div className="text-center">
                      <DollarSign className="w-8 h-8 text-summerview-brown mx-auto mb-2" />
                      <h3 className="font-semibold text-summerview-black mb-1">Annual Maintenance</h3>
                      <p className="text-2xl font-bold text-summerview-brown mb-1">$1,200-$1,800</p>
                      <p className="text-sm text-summerview-dark-gray">1-2 sessions/year</p>
                    </div>
                  </div>
                  <div className="bg-summerview-white rounded-lg p-6">
                    <p className="text-center text-summerview-dark-gray mb-4">
                      <strong>Compare to alternatives:</strong> Hair transplant surgery costs $8,000-$20,000. Daily medications cost $600-$1,200/year forever with potential side effects.
                    </p>
                    <p className="text-center text-sm text-summerview-dark-gray">
                      Many practices offer payment plans. HSA/FSA eligible. Free consultation to discuss your specific investment.
                    </p>
                  </div>
                </Card>

                {/* Testimonial Match */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Real Results from Patients Like You
                  </h2>
                  
                  {persona === 'postpartum' && (
                    <div className="space-y-6">
                      <div className="max-w-2xl mx-auto">
                        <blockquote className="text-lg text-summerview-dark-gray font-lato italic mb-4 text-center">
                          "I did PRP 4 months after having my second baby. The shedding stopped. I felt normal again."
                        </blockquote>
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-12 h-12 bg-summerview-teal/20 rounded-full flex items-center justify-center">
                            <Baby className="w-6 h-6 text-summerview-teal" />
                          </div>
                          <p className="font-poppins font-semibold text-summerview-black">
                            — Aisha, 34, Toronto
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {persona === 'male_early' && (
                    <div className="space-y-6">
                      <div className="max-w-2xl mx-auto">
                        <blockquote className="text-lg text-summerview-dark-gray font-lato italic mb-4 text-center">
                          "Honestly? I wish I hadn't waited. I saw a difference by month three."
                        </blockquote>
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-12 h-12 bg-summerview-brown/20 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-summerview-brown" />
                          </div>
                          <p className="font-poppins font-semibold text-summerview-black">
                            — Carlos, 39, Financial Advisor
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {persona === 'stressed' && (
                    <div className="space-y-6">
                      <div className="max-w-2xl mx-auto">
                        <blockquote className="text-lg text-summerview-dark-gray font-lato italic mb-4 text-center">
                          "I'm a fitness coach — I thought it was just from tight buns. PRP gave me back my ponytail."
                        </blockquote>
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-12 h-12 bg-summerview-tan/20 rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-summerview-tan" />
                          </div>
                          <p className="font-poppins font-semibold text-summerview-black">
                            — Lina, 28, Wellness Coach
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(!persona || persona === 'other' || persona === 'female_mature') && 'testimonial' in result && result.testimonial && (
                    <div className="max-w-2xl mx-auto">
                      <blockquote className="text-lg text-summerview-dark-gray font-lato italic mb-4 text-center">
                        "{(result as any).testimonial.quote}"
                      </blockquote>
                      <p className="text-center font-poppins font-semibold text-summerview-black">
                        — {(result as any).testimonial.author}
                      </p>
                    </div>
                  )}
                </Card>
                
                {/* Visual Proof Block */}
                <Card className="p-8 border-summerview-gray bg-summerview-tan/5">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Before & After Results
                  </h2>
                  
                  {persona === 'postpartum' && (
                    <div className="space-y-4">
                      <p className="text-center text-summerview-dark-gray mb-6">
                        Before/after of hairline recovery in postpartum patients
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="bg-summerview-gray/20 rounded-lg p-8 h-48 flex items-center justify-center">
                            <Camera className="w-12 h-12 text-summerview-gray" />
                          </div>
                          <p className="mt-2 text-sm font-semibold text-summerview-dark-gray">Before: 3 months postpartum</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-summerview-teal/20 rounded-lg p-8 h-48 flex items-center justify-center">
                            <Sparkles className="w-12 h-12 text-summerview-teal" />
                          </div>
                          <p className="mt-2 text-sm font-semibold text-summerview-dark-gray">After: 6 months post-PRP</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {persona === 'male_early' && (
                    <div className="space-y-4">
                      <p className="text-center text-summerview-dark-gray mb-6">
                        Crown-to-crown before/after with density measurements
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="bg-summerview-gray/20 rounded-lg p-6 h-40 flex items-center justify-center">
                            <Camera className="w-10 h-10 text-summerview-gray" />
                          </div>
                          <p className="mt-2 text-xs font-semibold text-summerview-dark-gray">Before Treatment</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-summerview-brown/20 rounded-lg p-6 h-40 flex items-center justify-center">
                            <TrendingUp className="w-10 h-10 text-summerview-brown" />
                          </div>
                          <p className="mt-2 text-xs font-semibold text-summerview-dark-gray">3 Months Progress</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-summerview-teal/20 rounded-lg p-6 h-40 flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-summerview-teal" />
                          </div>
                          <p className="mt-2 text-xs font-semibold text-summerview-dark-gray">6 Months Result</p>
                        </div>
                      </div>
                      <div className="text-center mt-4 p-4 bg-summerview-brown/10 rounded-lg">
                        <p className="text-sm text-summerview-dark-gray">
                          <strong>Density increase:</strong> +35% in crown area
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {persona === 'stressed' && (
                    <div className="space-y-4">
                      <p className="text-center text-summerview-dark-gray mb-6">
                        Hairline close-up and ponytail volume comparison
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-center font-semibold text-summerview-black mb-3">Hairline Recovery</h4>
                          <div className="bg-summerview-gray/20 rounded-lg p-8 h-40 flex items-center justify-center">
                            <Camera className="w-10 h-10 text-summerview-gray" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-center font-semibold text-summerview-black mb-3">Ponytail Volume</h4>
                          <div className="bg-summerview-tan/20 rounded-lg p-8 h-40 flex items-center justify-center">
                            <Sparkles className="w-10 h-10 text-summerview-tan" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(!persona || persona === 'other' || persona === 'female_mature') && (
                    <div className="text-center py-8">
                      <Camera className="w-16 h-16 text-summerview-gray mx-auto mb-4" />
                      <p className="text-summerview-dark-gray">
                        Visual results vary by individual. During your consultation, we'll show you relevant before/after photos.
                      </p>
                    </div>
                  )}
                </Card>
              </>
            )}

            {/* Partial Fit Content */}
            {resultType === 'partial' && (
              <>
                {/* Why Further Evaluation is Needed */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Why You Need a Professional Assessment
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-summerview-tan/10 rounded-lg">
                      <h3 className="font-semibold text-summerview-black mb-3 flex items-center">
                        <AlertCircle className="w-5 h-5 text-summerview-tan mr-2" />
                        Factors That Need Evaluation
                      </h3>
                      <ul className="space-y-2 text-sm text-summerview-dark-gray">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-tan mt-0.5 mr-2 flex-shrink-0" />
                          <span>Length of hair loss (may affect follicle viability)</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-tan mt-0.5 mr-2 flex-shrink-0" />
                          <span>Current follicle activity levels</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-tan mt-0.5 mr-2 flex-shrink-0" />
                          <span>Underlying causes of hair loss</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-tan mt-0.5 mr-2 flex-shrink-0" />
                          <span>Response to previous treatments</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 bg-summerview-teal/10 rounded-lg">
                      <h3 className="font-semibold text-summerview-black mb-3 flex items-center">
                        <CheckCircle className="w-5 h-5 text-summerview-teal mr-2" />
                        Good Signs We'll Look For
                      </h3>
                      <ul className="space-y-2 text-sm text-summerview-dark-gray">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                          <span>Presence of miniaturized hairs (not completely bald)</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                          <span>Healthy donor areas for comparison</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                          <span>No scarring or permanent damage</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-summerview-teal mt-0.5 mr-2 flex-shrink-0" />
                          <span>Realistic expectations about outcomes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* What Happens During Evaluation */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Your Free Scalp Analysis Includes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-summerview-teal/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Microscope className="w-6 h-6 text-summerview-teal" />
                      </div>
                      <h4 className="font-semibold text-summerview-black mb-1">Microscopic Analysis</h4>
                      <p className="text-xs text-summerview-dark-gray">200x magnification to assess follicle health</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-summerview-teal/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-summerview-teal" />
                      </div>
                      <h4 className="font-semibold text-summerview-black mb-1">Pattern Assessment</h4>
                      <p className="text-xs text-summerview-dark-gray">Identify your specific hair loss type</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-summerview-teal/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-summerview-teal" />
                      </div>
                      <h4 className="font-semibold text-summerview-black mb-1">Density Mapping</h4>
                      <p className="text-xs text-summerview-dark-gray">Measure hair density in different areas</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-summerview-teal/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <ShieldIcon className="w-6 h-6 text-summerview-teal" />
                      </div>
                      <h4 className="font-semibold text-summerview-black mb-1">Custom Plan</h4>
                      <p className="text-xs text-summerview-dark-gray">Personalized treatment recommendations</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-summerview-tan/10 rounded-lg text-center">
                    <p className="text-sm text-summerview-dark-gray">
                      <strong>No obligation:</strong> If PRP isn't right for you, we'll honestly tell you and suggest alternatives. Our goal is to help you find the right solution.
                    </p>
                  </div>
                </Card>

                {/* Possible Outcomes */}
                <Card className="p-8 border-summerview-gray">
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">
                    Possible Outcomes After Your Evaluation
                  </h2>
                  <div className="space-y-4">
                    <div className="p-6 border-2 border-summerview-teal rounded-lg">
                      <h3 className="font-semibold text-summerview-black mb-2 flex items-center">
                        <CheckCircle className="w-5 h-5 text-summerview-teal mr-2" />
                        Scenario 1: You're a Good Candidate (60% likelihood)
                      </h3>
                      <p className="text-sm text-summerview-dark-gray mb-3">
                        We find active follicles and determine PRP can help. You might need a modified approach or combination therapy for best results.
                      </p>
                      <p className="text-sm font-semibold text-summerview-teal">
                        Expected results: 20-30% density improvement with proper treatment
                      </p>
                    </div>
                    <div className="p-6 border-2 border-summerview-tan rounded-lg">
                      <h3 className="font-semibold text-summerview-black mb-2 flex items-center">
                        <AlertCircle className="w-5 h-5 text-summerview-tan mr-2" />
                        Scenario 2: Alternative Treatment Needed (40% likelihood)
                      </h3>
                      <p className="text-sm text-summerview-dark-gray mb-3">
                        If follicles are too damaged or absent, we'll recommend other options like hair transplant, medications, or cosmetic solutions.
                      </p>
                      <p className="text-sm font-semibold text-summerview-tan">
                        We'll provide referrals to trusted specialists
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Testimonial */}
                {'testimonial' in result && result.testimonial && (
                  <Card className="p-8 border-summerview-gray bg-summerview-tan/10">
                    <div className="max-w-2xl mx-auto">
                      <blockquote className="text-lg text-summerview-dark-gray font-lato italic mb-4 text-center">
                        "{(result as any).testimonial.quote}"
                      </blockquote>
                      <p className="text-center font-poppins font-semibold text-summerview-black">
                        — {(result as any).testimonial.author}
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
              {persona === 'postpartum' && (
                <>
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-4">
                    Ready to Take Action?
                  </h2>
                  <p className="text-summerview-dark-gray font-lato mb-6 max-w-2xl mx-auto">
                    Schedule a free 15-minute consult with our hair restoration specialist to confirm your candidacy and get personalized treatment planning.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Button
                      onClick={handlePrimaryAction}
                      className="bg-summerview-teal hover:bg-summerview-teal/90 text-summerview-white flex-1 font-poppins"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Your Hair Recovery Consult
                    </Button>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-summerview-dark-gray mb-3">Not ready?</p>
                    <Button variant="link" className="text-summerview-teal hover:text-summerview-teal/80">
                      <Download className="w-4 h-4 mr-2" />
                      Get our free guide: "Postpartum Hair Loss Explained"
                    </Button>
                  </div>
                </>
              )}
              
              {persona === 'male_early' && (
                <>
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-4">
                    Don't Wait — Your Hair Won't
                  </h2>
                  <p className="text-summerview-dark-gray font-lato mb-6 max-w-2xl mx-auto">
                    We'll tell you honestly if PRP is right for your stage of hair loss.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Button
                      onClick={handlePrimaryAction}
                      className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white flex-1 font-poppins"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule a Scalp Assessment – Free
                    </Button>
                  </div>
                  <div className="mt-4 text-sm text-summerview-dark-gray">
                    <p>Or call directly: <strong>(555) 123-4567</strong></p>
                  </div>
                </>
              )}
              
              {persona === 'stressed' && (
                <>
                  <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-4">
                    Ready to Reset Your Hair Growth?
                  </h2>
                  <p className="text-summerview-dark-gray font-lato mb-6 max-w-2xl mx-auto">
                    Let's build your personalized regrowth plan.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Button
                      onClick={handlePrimaryAction}
                      className="bg-summerview-tan hover:bg-summerview-tan/90 text-summerview-white flex-1 font-poppins"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Build Your Regrowth Plan – Book Now
                    </Button>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-summerview-dark-gray mb-3">Still researching?</p>
                    <Button variant="link" className="text-summerview-tan hover:text-summerview-tan/80">
                      <Download className="w-4 h-4 mr-2" />
                      Download our PRP FAQ with 7 Case Studies
                    </Button>
                  </div>
                </>
              )}
              
              {(!persona || persona === 'other' || persona === 'female_mature') && (
                <>
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
                </>
              )}
              
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