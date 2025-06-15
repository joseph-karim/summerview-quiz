import { QuizQuestion } from '@/types/quiz'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: "Where are you noticing hair loss?",
    subtitle: "Use visual options to help identify your primary area of hair thinning",
    type: "avatar-select",
    eduNugget: "Follicles visible? Great – PRP can feed them back to health. Bald-shiny areas usually need transplant.",
    options: [
      {
        label: "Crown/Vertex Thinning",
        value: "crown",
        description: "Thinning at the crown is often genetic (AGA). PRP can stimulate these follicles if treated early.",
        image: "/images/crown-thinning.jpg",
        avatar: "/images/crown-icon.svg"
      },
      {
        label: "Receding Hairline/Temples",
        value: "hairline",
        description: "Hairline recession is usually hormonal (DHT-driven). PRP may help strengthen and thicken follicles along the hairline before they miniaturize completely.",
        image: "/images/hairline-recession.jpg",
        avatar: "/images/hairline-icon.svg"
      },
      {
        label: "Diffuse Overall Thinning",
        value: "diffuse",
        description: "Diffuse shedding (hair falling out all over) can be temporary (e.g. postpartum or stress). PRP might aid recovery by nourishing tired follicles.",
        image: "/images/diffuse-thinning.jpg",
        avatar: "/images/diffuse-icon.svg"
      },
      {
        label: "Bald Patches",
        value: "patches",
        description: "Isolated bald spots may be due to scarring or autoimmune causes – PRP is generally less effective here.",
        image: "/images/bald-patches.jpg",
        avatar: "/images/patches-icon.svg"
      }
    ]
  },
  {
    id: 2,
    title: "When did you first notice the thinning?",
    subtitle: "The sooner you address hair loss, the better your outcome",
    type: "multiple-choice",
    eduNugget: "Studies show < 12-month loss responds best (average +20 hairs/cm²). Don't miss that window.",
    options: [
      {
        label: "Within the last 6 months",
        value: "under_6_months",
        description: "You're in the ideal window for intervention – PRP is most effective in early-stage thinning."
      },
      {
        label: "6–12 months ago",
        value: "6_to_12_months",
        description: "Recent onset within a year suggests active follicles that can respond well to PRP."
      },
      {
        label: "1–2 years ago",
        value: "1_to_2_years",
        description: "Still within a reasonable timeframe – many follicles may be salvageable."
      },
      {
        label: "Over 2 years ago",
        value: "over_2_years",
        description: "Long-standing hair loss may indicate some follicles have become dormant or lost – results may be less pronounced."
      }
    ]
  },
  {
    id: 3,
    title: "Has it been getting worse recently?",
    subtitle: "Understanding progression helps determine the urgency of treatment",
    type: "multiple-choice",
    eduNugget: "An active shed = follicles still alive. Stopping the cascade early prevents permanent miniaturisation.",
    options: [
      {
        label: "Yes, it's accelerating",
        value: "accelerating",
        description: "Active worsening means you're in a phase where intervention can have a big impact. PRP can help slow down or halt the progression."
      },
      {
        label: "Somewhat worse",
        value: "somewhat_worse",
        description: "Gradual progression indicates ongoing follicle stress that PRP may help address."
      },
      {
        label: "No, it's stable or slowing",
        value: "stable",
        description: "Stable loss means PRP may focus on regrowth of what was lost rather than stopping current shedding."
      }
    ]
  },
  {
    id: 4,
    title: "What have you tried already?",
    subtitle: "This helps us understand your treatment journey",
    type: "multiple-choice",
    eduNugget: "PRP can pair synergistically with minoxidil/finasteride and sometimes rescues 'vitamin-only' non-responders.",
    options: [
      {
        label: "Nothing yet",
        value: "nothing",
        description: "No worries – PRP can be a first-line treatment, especially if you prefer a more natural approach before medications."
      },
      {
        label: "Minoxidil/Rogaine",
        value: "minoxidil",
        description: "Many try topical solutions first. PRP works at a deeper level using your body's growth factors."
      },
      {
        label: "Biotin or hair vitamins",
        value: "vitamins",
        description: "Supplements can help, but often aren't enough for genetic hair loss. PRP targets the issue more directly."
      },
      {
        label: "Prescription medications",
        value: "prescription",
        description: "If medications haven't given desired results, PRP offers a drug-free alternative approach."
      },
      {
        label: "Special shampoos",
        value: "shampoos",
        description: "Topical products have limitations. PRP delivers growth factors directly to follicles."
      },
      {
        label: "Multiple treatments",
        value: "multiple",
        description: "You've tried various approaches – PRP could be the solution that finally targets the issue at the source."
      }
    ]
  },
  {
    id: 5,
    title: "What's your main goal with hair restoration?",
    subtitle: "Your goals help us tailor our approach",
    type: "multiple-choice",
    eduNugget: "PRP strengthens existing follicles and can thicken hair – it's especially effective for prevention and early-stage regrowth.",
    options: [
      {
        label: "Stop any further hair loss",
        value: "stop_loss",
        description: "Smart goal – PRP's primary benefit is strengthening existing follicles to slow down shedding."
      },
      {
        label: "Regrow thicker, fuller hair",
        value: "regrow",
        description: "Studies show increases in hair density and thickness within 3–6 months of PRP therapy."
      },
      {
        label: "Improve my hairline or crown coverage",
        value: "specific_area",
        description: "PRP can target specific areas by reviving miniaturized hairs over several months."
      },
      {
        label: "Avoid surgery or long-term medications",
        value: "natural",
        description: "PRP offers a drug-free, non-surgical solution using your body's own healing factors."
      },
      {
        label: "Restore my confidence in my appearance",
        value: "confidence",
        description: "We understand – improving your hair can significantly boost self-esteem and quality of life."
      }
    ]
  },
  {
    id: 6,
    title: "Which description fits you best?",
    subtitle: "This helps us personalize your recommendations",
    type: "avatar-select",
    eduNugget: "personaDynamic",
    options: [
      {
        label: "Postpartum Mom",
        value: "postpartum",
        description: "Hair shed after having a baby",
        avatar: "/images/avatar-postpartum.svg"
      },
      {
        label: "Man under 50 with early thinning",
        value: "male_early",
        description: "Noticing crown or hairline changes",
        avatar: "/images/avatar-male-young.svg"
      },
      {
        label: "Stressed or high-pressure lifestyle",
        value: "stressed",
        description: "Recent stress-related hair changes",
        avatar: "/images/avatar-stressed.svg"
      },
      {
        label: "Woman 40+ with thinning hair",
        value: "female_mature",
        description: "Hormonal or age-related changes",
        avatar: "/images/avatar-female-mature.svg"
      },
      {
        label: "None of these/Other",
        value: "other",
        description: "Different situation than above",
        avatar: "/images/avatar-other.svg"
      }
    ]
  },
  {
    id: 7,
    title: "Are you open to PRP treatments if you're a candidate?",
    subtitle: "This helps us provide the most relevant information",
    type: "multiple-choice",
    eduNugget: "PRP is a commitment – typically 3-4 sessions over 3 months, then maintenance. But it's drug-free and uses your body's own healing factors.",
    options: [
      {
        label: "Yes, I'm interested in trying PRP",
        value: "yes",
        description: "Great! We'll show you personalized recommendations and next steps."
      },
      {
        label: "Maybe – I need to know more",
        value: "maybe",
        description: "Understandable – we'll provide detailed information to help you decide."
      },
      {
        label: "Not right now",
        value: "no",
        description: "That's okay – we'll share alternative options and resources for your consideration."
      }
    ]
  }
]