import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface QuizSession {
  id: string
  answers: Record<number, string>
  result_type: 'ideal' | 'partial' | 'unfit'
  created_at: string
  completed_at?: string
}

export interface QuizContact {
  id: string
  session_id: string
  name?: string
  email: string
  phone?: string
  consent_marketing: boolean
  created_at: string
}

export interface CaseStudyDB {
  id: string
  persona: string
  name: string
  age: number
  headline: string
  summary: string
  statistic_value: string
  statistic_label: string
  statistic_source: string
  image_url?: string
  pdf_url?: string
  created_at: string
}

// Helper functions for quiz data
export async function createQuizSession(answers: Record<number, string>, resultType: 'ideal' | 'partial' | 'unfit') {
  const { data, error } = await supabase
    .from('quiz_sessions')
    .insert({
      answers,
      result_type: resultType,
      completed_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function saveQuizContact(sessionId: string, contact: {
  name?: string
  email: string
  phone?: string
  consent_marketing: boolean
}) {
  const { data, error } = await supabase
    .from('quiz_contacts')
    .insert({
      session_id: sessionId,
      ...contact
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getCaseStudies() {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}