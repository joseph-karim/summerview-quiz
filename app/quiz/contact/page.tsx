"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useQuizStore } from '@/lib/quiz-store'
import { QuizProgress } from '@/components/quiz/quiz-progress'
import { Shield, Mail, Phone, ArrowRight, CheckCircle } from 'lucide-react'
import { validateEmail, validatePhone } from '@/lib/validation'

export default function ContactCapturePage() {
  const router = useRouter()
  const { answers, getResult } = useQuizStore()
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    emailConsent: false,
    phoneConsent: false,
    privacyConsent: false
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!formData.emailConsent && !formData.phoneConsent) {
      newErrors.consent = 'Please select at least one contact preference'
    }
    
    if (!formData.privacyConsent) {
      newErrors.privacy = 'Please agree to the privacy terms to continue'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Store contact info and quiz responses
      const quizData = {
        answers,
        contact: {
          email: formData.email,
          phone: formData.phone,
          emailConsent: formData.emailConsent,
          phoneConsent: formData.phoneConsent
        },
        timestamp: new Date().toISOString()
      }
      
      // TODO: Submit to backend API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      // Determine result type and redirect
      const resultType = getResult()
      router.push(`/quiz/results/${resultType}`)
      
    } catch (error) {
      console.error('Error submitting quiz:', error)
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Almost Done!</h1>
            <p className="text-sm text-gray-600">Just need your contact info to show your results</p>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <QuizProgress currentStep={8} totalSteps={8} />

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Great! We've analyzed your responses
            </h1>
            <p className="text-lg text-gray-600">
              Enter your contact information below to receive your personalized PRP candidacy results
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>Email Address *</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>Phone Number *</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Privacy and Consent */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Your Privacy is Protected</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      We only use your contact information to send you personalized results and follow-up 
                      information about hair restoration options. You can unsubscribe anytime.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="email-consent" 
                          checked={formData.emailConsent}
                          onCheckedChange={(checked) => handleInputChange('emailConsent', checked as boolean)}
                        />
                        <label 
                          htmlFor="email-consent" 
                          className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                        >
                          <strong>Yes, email me my results</strong> and educational content about hair restoration options
                        </label>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="phone-consent" 
                          checked={formData.phoneConsent}
                          onCheckedChange={(checked) => handleInputChange('phoneConsent', checked as boolean)}
                        />
                        <label 
                          htmlFor="phone-consent" 
                          className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                        >
                          <strong>I'm open to a follow-up call</strong> to discuss my hair restoration options (optional)
                        </label>
                      </div>
                      
                      {errors.consent && (
                        <p className="text-sm text-red-600">{errors.consent}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Agreement */}
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="privacy-consent" 
                  checked={formData.privacyConsent}
                  onCheckedChange={(checked) => handleInputChange('privacyConsent', checked as boolean)}
                />
                <label 
                  htmlFor="privacy-consent" 
                  className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                >
                  I agree to the privacy policy and consent to the collection and use of my information as described. *
                </label>
              </div>
              {errors.privacy && (
                <p className="text-sm text-red-600">{errors.privacy}</p>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 py-4 text-lg font-semibold"
                >
                  {isSubmitting ? 'Processing...' : 'Show My Results'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                {errors.submit && (
                  <p className="text-sm text-red-600 mt-2 text-center">{errors.submit}</p>
                )}
              </div>
            </form>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Secure & Confidential</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}