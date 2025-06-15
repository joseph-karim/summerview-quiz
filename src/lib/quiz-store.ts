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
        
        // Extract all answers
        const hairLossArea = answers[1] // crown, hairline, diffuse, patches
        const timeline = answers[2] // under_6_months, 6_to_12_months, 1_to_2_years, over_2_years
        const progression = answers[3] // accelerating, somewhat_worse, stable
        // const previousTreatments = answers[4] // Reserved for future use
        // const goals = answers[5] // Reserved for future use
        const persona = answers[6]
        const openToPRP = answers[7] // yes, maybe, no
        
        // NOT FIT criteria
        if (
          // Bald patches often indicate no active follicles
          hairLossArea === 'patches' ||
          // Very long-term stable loss (no active follicles)
          (timeline === 'over_2_years' && progression === 'stable') ||
          // Not interested in PRP at all
          openToPRP === 'no'
        ) {
          return 'unfit'
        }
        
        // STRONG FIT criteria
        if (
          // Recent onset (ideal window)
          (timeline === 'under_6_months' || timeline === '6_to_12_months') &&
          // Active hair loss (good time to intervene)
          (progression === 'accelerating' || progression === 'somewhat_worse') &&
          // Interested in PRP
          (openToPRP === 'yes' || openToPRP === 'maybe') &&
          // Not bald patches
          hairLossArea !== 'patches'
        ) {
          return 'ideal'
        }
        
        // Additional STRONG FIT scenarios
        if (
          // Postpartum women with diffuse thinning (classic telogen effluvium)
          (persona === 'postpartum' && hairLossArea === 'diffuse') ||
          // Early intervention cases (1-2 years) with active loss
          (timeline === '1_to_2_years' && progression === 'accelerating' && openToPRP === 'yes')
        ) {
          return 'ideal'
        }
        
        // Everyone else is POSSIBLE FIT
        // This includes:
        // - Longer timeline but still some activity
        // - Stable loss but within reasonable timeframe
        // - "Maybe" interest in PRP
        // - Mixed indicators
        return 'partial'
      }
    }),
    {
      name: 'quiz-storage'
    }
  )
)