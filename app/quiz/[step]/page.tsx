"use client"

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { QuizStep } from '@/components/quiz/quiz-step'
import { QuizProgress } from '@/components/quiz/quiz-progress'
import { useQuizStore } from '@/lib/quiz-store'
import { quizQuestions } from '@/data/quiz-questions'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function QuizStepPage() {
  const params = useParams()
  const router = useRouter()
  const step = parseInt(params.step as string)
  const { answers, setAnswer } = useQuizStore()
  
  const currentQuestion = quizQuestions[step - 1]
  const totalSteps = quizQuestions.length

  useEffect(() => {
    // Redirect if invalid step
    if (step < 1 || step > totalSteps) {
      router.push('/quiz/1')
    }
  }, [step, totalSteps, router])

  const handleAnswer = (answer: string) => {
    setAnswer(step, answer)
    
    // Navigate to next step or results
    if (step < totalSteps) {
      router.push(`/quiz/${step + 1}`)
    } else {
      // Quiz completed, go to data capture
      router.push('/quiz/contact')
    }
  }

  const handleBack = () => {
    if (step === 1) {
      router.push('/')
    } else {
      router.push(`/quiz/${step - 1}`)
    }
  }

  const handleSkip = () => {
    if (currentQuestion.optional) {
      handleAnswer('skipped')
    }
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-summerview-white to-summerview-gray">
      {/* Header */}
      <header className="bg-summerview-white/80 backdrop-blur-sm border-b border-summerview-gray sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center space-x-2 text-summerview-brown hover:text-summerview-brown hover:bg-summerview-tan/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-lato">Back</span>
            </Button>
            
            <div className="text-sm text-summerview-dark-gray font-lato">
              Step {step} of {totalSteps}
            </div>
            
            {currentQuestion.optional && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-summerview-dark-gray hover:text-summerview-brown hover:bg-summerview-tan/20 font-lato"
              >
                Skip
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <QuizProgress currentStep={step} totalSteps={totalSteps} />

      {/* Quiz Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuizStep
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswer={answers[step]}
          />
        </motion.div>
      </main>
    </div>
  )
}