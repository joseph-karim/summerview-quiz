import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { QuizQuestion } from '@/types/quiz'
import { useState } from 'react'

interface QuizStepProps {
  question: QuizQuestion
  onAnswer: (answer: string) => void
  currentAnswer?: string
}

export function QuizStep({ question, onAnswer, currentAnswer }: QuizStepProps) {
  const [sliderValue, setSliderValue] = useState([50])

  const handleSliderAnswer = () => {
    onAnswer(sliderValue[0].toString())
  }

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options?.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-6 cursor-pointer transition-all duration-200 border-2 hover:border-summerview-teal ${
                    currentAnswer === option.value ? 'border-summerview-brown bg-summerview-tan/10' : 'border-summerview-gray'
                  }`}
                  onClick={() => onAnswer(option.value)}
                >
                  {option.image && (
                    <div className="mb-4 relative h-32 w-full rounded-lg overflow-hidden">
                      <img
                        src={option.image}
                        alt={option.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-poppins font-semibold text-summerview-black mb-2">{option.label}</h3>
                  {option.description && (
                    <p className="text-sm text-summerview-dark-gray font-lato">{option.description}</p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )

      case 'slider':
        return (
          <div className="max-w-md mx-auto">
            <Card className="p-8 border-summerview-gray">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-summerview-teal mb-2 font-poppins">
                    {sliderValue[0]}
                  </div>
                  <p className="text-sm text-summerview-dark-gray font-lato">{question.sliderLabel}</p>
                </div>
                
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  min={question.sliderMin || 0}
                  max={question.sliderMax || 100}
                  step={1}
                  className="w-full [&_[role=slider]]:bg-summerview-brown [&_[role=slider]]:border-summerview-brown"
                />
                
                <div className="flex justify-between text-xs text-summerview-dark-gray font-lato">
                  <span>{question.sliderMin || 0}</span>
                  <span>{question.sliderMax || 100}</span>
                </div>
                
                <Button
                  onClick={handleSliderAnswer}
                  className="w-full bg-summerview-brown hover:bg-summerview-brown/90 text-summerview-white font-poppins"
                >
                  Continue
                </Button>
              </div>
            </Card>
          </div>
        )

      case 'avatar-select':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {question.options?.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all duration-200 border-2 hover:border-summerview-teal text-center ${
                    currentAnswer === option.value ? 'border-summerview-brown bg-summerview-tan/10' : 'border-summerview-gray'
                  }`}
                  onClick={() => onAnswer(option.value)}
                >
                  {option.avatar && (
                    <div className="mb-3 relative h-16 w-16 mx-auto rounded-full overflow-hidden">
                      <img
                        src={option.avatar}
                        alt={option.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-medium text-summerview-black text-sm font-poppins">{option.label}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        )

      default:
        return (
          <div className="text-center">
            <p className="text-summerview-dark-gray font-lato">Question type not implemented</p>
          </div>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-summerview-black mb-4">
          {question.title}
        </h1>
        {question.subtitle && (
          <p className="text-lg text-summerview-dark-gray max-w-2xl mx-auto font-lato">
            {question.subtitle}
          </p>
        )}
      </motion.div>

      {question.media && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          {question.media.type === 'video' ? (
            <video
              src={question.media.url}
              autoPlay
              muted
              loop
              className="max-w-md rounded-lg shadow-lg"
            />
          ) : (
            <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden shadow-lg">
              <img
                src={question.media.url}
                alt="Question media"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {renderQuestionContent()}
      </motion.div>
    </div>
  )
}