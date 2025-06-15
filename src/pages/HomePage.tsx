import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle, Users, Award, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QuizOnboarding } from '@/components/quiz/quiz-onboarding'

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

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
                <p className="text-sm text-summerview-dark-gray font-lato">PRP Hair Window Finder</p>
              </div>
            </div>
            <Link to="/admin">
              <Button variant="outline" size="sm" className="border-summerview-brown text-summerview-brown hover:bg-summerview-brown hover:text-summerview-white">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-summerview-tan/20 text-summerview-brown px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span className="font-lato">Clinically-backed • 3,200+ Sessions Performed • Board Certified</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-summerview-black mb-6">
              Discover Your{' '}
              <span className="text-summerview-teal brand-heading">
                PRP Hair Window
              </span>
            </h1>
            
            <p className="text-xl text-summerview-dark-gray mb-8 max-w-2xl mx-auto leading-relaxed font-lato">
              Take our 60-second beauty quiz to see if you're in the ideal window for PRP hair restoration. 
              No pressure. No commitment. Just honest answers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white px-8 py-4 text-lg font-semibold font-poppins rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setShowOnboarding(true)}
              >
                Start Quiz
                <Clock className="ml-2 w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-2 text-summerview-dark-gray">
                <CheckCircle className="w-5 h-5 text-summerview-teal" />
                <span className="font-lato">Takes 60 seconds</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-summerview-tan/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-summerview-brown" />
            </div>
            <h3 className="font-poppins font-semibold text-summerview-black mb-2">Trusted by 3,200+</h3>
            <p className="text-summerview-dark-gray font-lato">Patients have chosen our PRP treatment</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-summerview-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-summerview-teal" />
            </div>
            <h3 className="font-poppins font-semibold text-summerview-black mb-2">Science-Backed</h3>
            <p className="text-summerview-dark-gray font-lato">FDA-approved platelet-rich plasma therapy</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-summerview-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-summerview-red" />
            </div>
            <h3 className="font-poppins font-semibold text-summerview-black mb-2">Board Certified</h3>
            <p className="text-summerview-dark-gray font-lato">Performed by certified medical professionals</p>
          </div>
        </motion.div>

        {/* What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-summerview-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border border-summerview-gray"
        >
          <h2 className="text-2xl font-poppins font-bold text-summerview-black mb-6 text-center">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-poppins font-semibold text-summerview-brown">✨ This quiz will help you:</h3>
              <ul className="space-y-2 text-summerview-dark-gray font-lato">
                <li>• Understand if PRP is right for your hair type</li>
                <li>• Learn about your hair restoration options</li>
                <li>• Get personalized recommendations</li>
                <li>• Schedule a free consultation if suitable</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-poppins font-semibold text-summerview-brown">🚫 This quiz won't:</h3>
              <ul className="space-y-2 text-summerview-dark-gray font-lato">
                <li>• Provide medical diagnosis</li>
                <li>• Guarantee treatment results</li>
                <li>• Share your data without consent</li>
                <li>• Pressure you into treatment</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Onboarding Modal */}
      <QuizOnboarding 
        open={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </div>
  )
}