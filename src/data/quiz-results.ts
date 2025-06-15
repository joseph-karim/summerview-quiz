import { CheckCircle, AlertTriangle, Info, Calendar, Download, Star, Heart, Clock, Shield } from 'lucide-react'

export const resultData = {
  ideal: {
    title: "You're Likely a Great Candidate for PRP! ✅",
    subtitle: "Good news – you appear to be an ideal candidate for PRP hair restoration. Because you still have active follicles in the areas you're concerned about, PRP can likely help thicken and strengthen your hair.",
    description: "You're catching this at the right time – early intervention means we can boost those struggling follicles before they're gone. PRP will use your own platelets to stimulate growth – no drugs or surgery needed.",
    backgroundColor: "bg-gradient-to-br from-summerview-tan/20 to-summerview-teal/20",
    icon: CheckCircle,
    iconBg: "bg-summerview-teal",
    iconColor: "text-summerview-white",
    keyPoints: [
      {
        title: "Optimal Timing",
        description: "You're in the ideal window for PRP treatment – early intervention yields best results",
        icon: Clock
      },
      {
        title: "Natural Healing",
        description: "PRP uses your own blood platelets to stimulate hair growth naturally",
        icon: Shield
      },
      {
        title: "Proven Results",
        description: "In studies, patients with early hair loss saw increased density within 3-6 months",
        icon: Star
      }
    ],
    treatmentInfo: {
      title: "What to Expect",
      description: "Optimal results typically require 3-4 monthly sessions, then occasional maintenance. Most people start to see improvement after the second session, with significant gains by month 6.",
      timeline: [
        { month: 1, milestone: "First treatment session" },
        { month: 2, milestone: "Initial improvements may be visible" },
        { month: 3, milestone: "Noticeable hair thickening begins" },
        { month: 6, milestone: "Significant density improvements" }
      ]
    },
    testimonial: {
      quote: "I was losing hair at 32 and PRP helped me get my hairline back. The process was easier than I expected.",
      author: "Mike, 35",
      beforeAfter: "/images/testimonial-mike-before-after.jpg"
    },
    cta: {
      title: "Ready to Take Action?",
      description: "Schedule a free 15-minute consult with our hair restoration specialist to confirm your candidacy and get personalized treatment planning.",
      primaryText: "Book Your Free Consultation",
      primaryAction: "book",
      secondaryText: "Call (555) 123-4567",
      urgencyNote: "Quiz takers get a free scalp analysis with their consult"
    },
    additionalResources: [
      {
        title: "PRP Treatment Guide",
        description: "Comprehensive guide covering the entire PRP process, what to expect, and aftercare",
        buttonText: "Download PDF",
        icon: Download,
        url: "/resources/prp-treatment-guide.pdf"
      },
      {
        title: "Patient Success Stories",
        description: "Watch real patients share their PRP journey and results",
        buttonText: "Watch Videos",
        icon: Star,
        url: "/success-stories"
      }
    ]
  },
  partial: {
    title: "You Might Be a Candidate – Let's Investigate Further 🔍",
    subtitle: "It looks like PRP could help you, but we'd need a closer look to be sure.",
    description: "Based on your responses, PRP may still stimulate growth, but results vary more when follicles have been inactive for longer periods. We consider factors like underlying conditions or medications that might affect treatment success.",
    backgroundColor: "bg-gradient-to-br from-summerview-tan/30 to-summerview-gray/30",
    icon: AlertTriangle,
    iconBg: "bg-summerview-tan",
    iconColor: "text-summerview-brown",
    keyPoints: [
      {
        title: "Professional Evaluation Needed",
        description: "A scalp examination can determine if you have enough active follicles for PRP",
        icon: Clock
      },
      {
        title: "Honest Assessment",
        description: "We'll be upfront – if PRP isn't likely to help, we'll guide you to other options",
        icon: Shield
      },
      {
        title: "Customized Approach",
        description: "Your treatment plan will be tailored to your specific hair loss pattern and goals",
        icon: Star
      }
    ],
    evaluationInfo: {
      title: "What We'll Assess",
      description: "Our hair restoration physician can examine your scalp (checking for signs of active vs. dormant follicles) and pinpoint the cause of your thinning.",
      assessmentPoints: [
        "Scalp health and follicle activity",
        "Hair loss pattern and progression",
        "Medical history and medications",
        "Realistic outcome expectations"
      ]
    },
    testimonial: {
      quote: "I wasn't sure if PRP would work because my hair thinning had been going on for 5+ years. After an exam, we discovered I still had many miniaturized hairs. I tried PRP and saw measurable thickening in 6 months.",
      author: "Jane, 42",
      beforeAfter: "/images/testimonial-jane-before-after.jpg"
    },
    cta: {
      title: "Get a Professional Hair Evaluation",
      description: "During your visit, the doctor will assess your hair follicles up close and outline a personalized plan – whether that's PRP or another solution.",
      primaryText: "Schedule a Free Hair & Scalp Analysis",
      primaryAction: "book",
      secondaryText: "Get Hair Health Guide",
      urgencyNote: "Free consultation, no obligation"
    },
    additionalResources: [
      {
        title: "Hair Health Assessment Guide",
        description: "Complete guide to understanding your hair loss patterns and treatment options",
        buttonText: "Download Guide",
        icon: Download,
        url: "/resources/hair-health-guide.pdf"
      },
      {
        title: "Photo Analysis Service",
        description: "Submit photos for preliminary review by our hair restoration specialists",
        buttonText: "Upload Photos",
        icon: Calendar,
        url: "/photo-analysis"
      }
    ]
  },
  unfit: {
    title: "PRP May Not Be The Right Solution for You ❌",
    subtitle: "Thank you for taking the quiz. Based on your answers, we want to be upfront: PRP isn't likely to give you the results you want.",
    description: "PRP works by reviving weakened hair follicles, but it can't create new ones. Since it sounds like the affected area has no active follicles left or other factors are present, even aggressive PRP therapy wouldn't yield significant regrowth. The good news: there are other options we recommend for your situation.",
    backgroundColor: "bg-gradient-to-br from-summerview-gray/40 to-summerview-teal/20",
    icon: Info,
    iconBg: "bg-summerview-brown",
    iconColor: "text-summerview-white",
    alternativeOptions: [
      {
        title: "Hair Transplant Surgery",
        description: "Today's transplants are very advanced and can produce natural results by moving healthy hair to bald areas. We can refer you to a trusted transplant surgeon if you're interested.",
        icon: Heart
      },
      {
        title: "Medical Therapy",
        description: "Medications like finasteride (for men) or low-level laser therapy might help retain and improve the hair you do have. They won't create new hair on a completely bald scalp, but could strengthen surrounding areas.",
        icon: Shield
      },
      {
        title: "Cosmetic Solutions",
        description: "Some patients use SMP (scalp micropigmentation) or hair systems to restore the appearance of fullness. While not hair growth, these can cosmetically cover thinning areas.",
        icon: Star
      }
    ],
    supportMessage: {
      title: "We're Here to Help",
      description: "We understand hair loss can be tough. Our goal is to help you find the right solution – even if it's not with us. We'd be happy to connect you with specialists we trust."
    },
    cta: {
      title: "Don't Give Up – You Have Options",
      description: "Download our guide to explore alternative treatments that may be more suitable for your specific needs.",
      primaryText: "Download '5 Options If PRP Isn't Right For You'",
      primaryAction: "download",
      secondaryText: "Contact Us for Other Options",
      urgencyNote: "Free guide with honest recommendations"
    },
    additionalResources: [
      {
        title: "5 Alternatives to PRP",
        description: "Detailed guide covering hair transplants, medications, and other effective options",
        buttonText: "Download Guide",
        icon: Download,
        url: "/resources/prp-alternatives-guide.pdf"
      },
      {
        title: "Hair Transplant Consultation",
        description: "Connect with our partner clinics for surgical hair restoration options",
        buttonText: "Learn More",
        icon: Heart,
        url: "/transplant-partners"
      },
      {
        title: "General Hair Loss Counseling",
        description: "Get professional guidance on all available treatment options",
        buttonText: "Book Session",
        icon: Calendar,
        url: "/hair-counseling"
      }
    ]
  }
}