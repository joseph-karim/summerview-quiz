export interface QuizOption {
  label: string
  value: string
  description?: string
  image?: string
  avatar?: string
}

export interface QuizMedia {
  type: 'image' | 'video' | 'gif'
  url: string
  alt?: string
}

export interface QuizQuestion {
  id: number
  title: string
  subtitle?: string
  type: 'multiple-choice' | 'slider' | 'avatar-select' | 'text'
  options?: QuizOption[]
  media?: QuizMedia
  optional?: boolean
  sliderMin?: number
  sliderMax?: number
  sliderLabel?: string
}

export interface QuizResult {
  type: 'ideal' | 'partial' | 'unfit'
  title: string
  subtitle: string
  description: string
  media?: QuizMedia
  cta: {
    text: string
    action: 'book' | 'download' | 'learn'
    url?: string
  }
  additionalResources?: {
    title: string
    description: string
    url: string
  }[]
}