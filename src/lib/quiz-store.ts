import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface QuizState {
  answers: Record<number, string>
  currentStep: number
  setAnswer: (step: number, answer: string) => void
  setCurrentStep: (step: number) => void
  resetQuiz: () => void
  getResult: () => 'ideal' | 'partial' | 'unfit'
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      answers: {},
      currentStep: 1,
      setAnswer: (step, answer) =>
        set((state) => ({
          answers: { ...state.answers, [step]: answer }
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetQuiz: () => set({ answers: {}, currentStep: 1 }),
      getResult: () => {
        const answers = get().answers
        // Simple logic for demo - can be made more sophisticated
        const concerns = answers[1]
        const timeline = answers[3]
        const goals = answers[7]
        
        // Ideal candidates: early intervention, motivated
        if (concerns?.includes('diffuse') && timeline?.includes('recent') && goals?.includes('prevent')) {
          return 'ideal'
        }
        // Partial fit: some concerns but treatable
        if (concerns && timeline && goals) {
          return 'partial'
        }
        // Not a fit: advanced loss or unrealistic expectations
        return 'unfit'
      }
    }),
    {
      name: 'quiz-storage'
    }
  )
)