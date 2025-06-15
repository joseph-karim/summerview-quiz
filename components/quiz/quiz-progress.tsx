"use client"

import { motion } from 'framer-motion'

interface QuizProgressProps {
  currentStep: number
  totalSteps: number
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="bg-summerview-white/80 backdrop-blur-sm border-b border-summerview-gray">
      <div className="container mx-auto px-4 py-4">
        <div className="relative">
          {/* Background */}
          <div className="w-full h-3 bg-summerview-gray rounded-full overflow-hidden">
            {/* Hair strand pattern background */}
            <div className="absolute inset-0 opacity-20">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 12"
                className="h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="hair-pattern"
                    x="0"
                    y="0"
                    width="20"
                    height="12"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M2,6 Q6,2 10,6 Q14,10 18,6"
                      stroke="rgb(134, 185, 184)"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hair-pattern)" />
              </svg>
            </div>
            
            {/* Progress fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-summerview-brown to-summerview-teal relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-30">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              
              {/* Hair strand effect */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 12"
                className="h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="hair-progress-pattern"
                    x="0"
                    y="0"
                    width="15"
                    height="12"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M2,6 Q5,3 8,6 Q11,9 14,6"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="0.5"
                      fill="none"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hair-progress-pattern)" />
              </svg>
            </motion.div>
          </div>
          
          {/* Progress text */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium font-poppins text-summerview-dark-gray">
              {Math.round(progress)}% Complete
            </span>
            <span className="text-sm text-summerview-dark-gray font-lato">
              {currentStep} of {totalSteps}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}