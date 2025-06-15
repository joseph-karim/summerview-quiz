import { CheckCircle, AlertTriangle, Info, Calendar, Download, Phone, Mail, Star, Heart } from 'lucide-react'

export const resultData = {
  ideal: {
    title: "You're in the PRP Window! 🎉",
    subtitle: "Based on your responses, you appear to be an excellent candidate for PRP hair restoration. Your timing and hair condition suggest optimal potential for success.",
    backgroundColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    cta: {
      title: "Ready to Start Your Hair Restoration Journey?",
      description: "Schedule your free consultation to discuss your personalized PRP treatment plan with our board-certified specialists.",
      primaryText: "Book Free Consultation",
      secondaryText: "Call (555) 123-4567"
    },
    additionalResources: [
      {
        title: "PRP Treatment Guide",
        description: "Comprehensive guide covering the entire PRP process, what to expect, and aftercare",
        buttonText: "Download PDF",
        icon: Download
      },
      {
        title: "Patient Success Stories",
        description: "Watch real patients share their PRP journey and results",
        buttonText: "Watch Videos",
        icon: Star
      }
    ]
  },
  partial: {
    title: "You Might Be a Good Candidate",
    subtitle: "Your responses suggest PRP could be beneficial, but we'd like to evaluate your specific situation more closely to ensure the best treatment approach.",
    backgroundColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
    icon: AlertTriangle,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    cta: {
      title: "Let's Determine Your Best Path Forward",
      description: "Schedule a consultation for a thorough scalp analysis and personalized treatment recommendations.",
      primaryText: "Schedule Analysis",
      secondaryText: "Get Hair Health Guide"
    },
    additionalResources: [
      {
        title: "Hair Health Assessment",
        description: "Complete guide to understanding your hair loss patterns and treatment options",
        buttonText: "Download Guide",
        icon: Download
      },
      {
        title: "Photo Analysis Service",
        description: "Submit photos for preliminary review by our hair restoration specialists",
        buttonText: "Upload Photos",
        icon: Calendar
      }
    ]
  },
  unfit: {
    title: "Let's Explore Your Best Options",
    subtitle: "While PRP may not be the ideal solution for your current situation, there are several effective alternatives that could be perfect for your hair restoration goals.",
    backgroundColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    icon: Info,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    cta: {
      title: "Don't Give Up - You Have Great Options",
      description: "Schedule a comprehensive consultation to explore alternative treatments that may be more suitable for your specific needs.",
      primaryText: "Explore Alternatives",
      secondaryText: "Download Options Guide"
    },
    additionalResources: [
      {
        title: "5 Alternatives to PRP",
        description: "Detailed guide covering hair transplants, topical treatments, and other effective options",
        buttonText: "Download Guide",
        icon: Download
      },
      {
        title: "Hair Transplant Consultation",
        description: "Connect with our partner clinics for surgical hair restoration options",
        buttonText: "Learn More",
        icon: Heart
      },
      {
        title: "Diagnostic Session",
        description: "Get a professional evaluation to determine your best treatment path",
        buttonText: "Book Session",
        icon: Calendar
      }
    ]
  }
}