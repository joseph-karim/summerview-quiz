"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { X, ArrowRight, Shield, Clock, Heart } from 'lucide-react'
import Link from 'next/link'

interface QuizOnboardingProps {
  open: boolean
  onClose: () => void
}

export function QuizOnboarding({ open, onClose }: QuizOnboardingProps) {
  const [emailConsent, setEmailConsent] = useState(false)
  const [phoneConsent, setPhoneConsent] = useState(false)

  const canProceed = emailConsent || phoneConsent

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 bg-white rounded-2xl overflow-hidden">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <DialogTitle asChild>
                <h2 className="text-2xl font-bold mb-2">Ready to Start Your Hair Journey?</h2>
              </DialogTitle>
              <p className="text-blue-100">Let's find out if PRP is right for you</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Progress Preview */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Your 7-Step Journey (60 seconds)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">1</div>
                  <span className="text-gray-600">Hair concerns & patterns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">2</div>
                  <span className="text-gray-600">Age group selection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">3</div>
                  <span className="text-gray-600">Hair loss timeline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">4</div>
                  <span className="text-gray-600">Medical conditions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">5</div>
                  <span className="text-gray-600">Emotional impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">6</div>
                  <span className="text-gray-600">Lifestyle factors</span>
                </div>
                <div className="flex items-center space-x-2 sm:col-span-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">7</div>
                  <span className="text-gray-600">Treatment goals & expectations</span>
                </div>
              </div>
            </div>

            {/* Privacy & Consent */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Your Privacy Matters</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We only use your contact information to send you personalized results and follow-up information about hair restoration options. You can unsubscribe anytime.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="email-consent" 
                        checked={emailConsent}
                        onCheckedChange={(checked) => setEmailConsent(checked as boolean)}
                      />
                      <label 
                        htmlFor="email-consent" 
                        className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                      >
                        Yes, I'd like to receive my personalized quiz results and educational content about hair restoration via email.
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="phone-consent" 
                        checked={phoneConsent}
                        onCheckedChange={(checked) => setPhoneConsent(checked as boolean)}
                      />
                      <label 
                        htmlFor="phone-consent" 
                        className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                      >
                        I'm open to a follow-up call to discuss my hair restoration options (optional).
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Maybe Later
              </Button>
              
              <Link href="/quiz/1" className="flex-1">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                  disabled={!canProceed}
                >
                  Let's Go
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {canProceed ? null : (
              <p className="text-xs text-gray-500 text-center mt-3">
                Please select at least one consent option to continue
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}