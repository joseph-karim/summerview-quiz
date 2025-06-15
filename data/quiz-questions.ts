import { QuizQuestion } from '@/types/quiz'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: "What type of hair changes are you experiencing?",
    subtitle: "Select all that apply to your situation",
    type: "multiple-choice",
    options: [
      {
        label: "Thinning all over (diffuse)",
        value: "diffuse",
        description: "Hair feels thinner throughout, less density overall",
        image: "/images/hair-diffuse.jpg"
      },
      {
        label: "Receding hairline",
        value: "receding",
        description: "Hairline moving back, temples thinning",
        image: "/images/hair-receding.jpg"
      },
      {
        label: "Crown thinning",
        value: "crown",
        description: "Thinning at the top/back of head",
        image: "/images/hair-crown.jpg"
      },
      {
        label: "Patchy hair loss",
        value: "patchy",
        description: "Circular bald spots or uneven loss",
        image: "/images/hair-patchy.jpg"
      }
    ]
  },
  {
    id: 2,
    title: "What's your age group?",
    subtitle: "This helps us understand your hair restoration timeline",
    type: "avatar-select",
    options: [
      {
        label: "20-29",
        value: "20s",
        avatar: "/images/avatar-20s.jpg"
      },
      {
        label: "30-39",
        value: "30s",
        avatar: "/images/avatar-30s.jpg"
      },
      {
        label: "40-49",
        value: "40s",
        avatar: "/images/avatar-40s.jpg"
      },
      {
        label: "50+",
        value: "50plus",
        avatar: "/images/avatar-50plus.jpg"
      }
    ]
  },
  {
    id: 3,
    title: "When did you first notice hair changes?",
    subtitle: "Timing is crucial for PRP effectiveness",
    type: "multiple-choice",
    options: [
      {
        label: "Within the last 6 months",
        value: "recent",
        description: "Early intervention often yields best results"
      },
      {
        label: "6 months to 2 years ago",
        value: "moderate",
        description: "Still in a good window for treatment"
      },
      {
        label: "2-5 years ago",
        value: "established",
        description: "May require combined approaches"
      },
      {
        label: "More than 5 years ago",
        value: "longterm",
        description: "Advanced planning may be needed"
      }
    ]
  },
  {
    id: 4,
    title: "Any of these medical conditions?",
    subtitle: "Some conditions may affect PRP candidacy",
    type: "multiple-choice",
    optional: true,
    options: [
      {
        label: "None of these apply",
        value: "none",
        description: "Great! No medical barriers"
      },
      {
        label: "Autoimmune conditions",
        value: "autoimmune",
        description: "May require additional evaluation"
      },
      {
        label: "Blood disorders",
        value: "blood",
        description: "Could affect platelet function"
      },
      {
        label: "Recent pregnancy/breastfeeding",
        value: "pregnancy",
        description: "Timing considerations may apply"
      }
    ]
  },
  {
    id: 5,
    title: "How is hair loss affecting you emotionally?",
    subtitle: "Understanding your motivation helps us provide better support",
    type: "slider",
    sliderMin: 1,
    sliderMax: 10,
    sliderLabel: "Impact Level (1 = minimal, 10 = significant)"
  },
  {
    id: 6,
    title: "Which lifestyle factors apply to you?",
    subtitle: "These can influence treatment planning",
    type: "multiple-choice",
    options: [
      {
        label: "High stress lifestyle",
        value: "stress",
        description: "Work, family, or life pressures"
      },
      {
        label: "Active/athletic",
        value: "active",
        description: "Regular exercise, sports activities"
      },
      {
        label: "Frequent travel",
        value: "travel",
        description: "May affect treatment scheduling"
      },
      {
        label: "None of the above",
        value: "none",
        description: "Standard approach works well"
      }
    ]
  },
  {
    id: 7,
    title: "What's your primary goal?",
    subtitle: "This helps us recommend the right approach",
    type: "multiple-choice",
    options: [
      {
        label: "Stop further hair loss",
        value: "prevent",
        description: "Maintain what you have"
      },
      {
        label: "Regrow lost hair",
        value: "regrow",
        description: "Reverse some of the loss"
      },
      {
        label: "Improve hair thickness",
        value: "thicken",
        description: "Make existing hair fuller"
      },
      {
        label: "Explore all options",
        value: "explore",
        description: "Want to learn about possibilities"
      }
    ]
  }
]