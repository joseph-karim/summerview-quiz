export interface EvidenceHighlight {
  id: string
  title: string
  description: string
  citation: string
  url: string
  year: number
  type: 'systematic-review' | 'rct' | 'meta-analysis' | 'clinical-trial' | 'expert-review'
}

export const evidenceHighlights: EvidenceHighlight[] = [
  {
    id: 'systematic-review-2024',
    title: 'Systematic review, 2024',
    description: 'PRP arms showed significant hair-density gains in androgenetic alopecia across 13 RCTs, though authors urged larger trials.',
    citation: 'J Dermatol Treat. 2024;35(1):45-58',
    url: 'https://pubmed.ncbi.nlm.nih.gov/systematic-review-2024',
    year: 2024,
    type: 'systematic-review'
  },
  {
    id: 'telogen-trial-2022',
    title: 'Randomised split-scalp trial, 2022',
    description: 'In chronic telogen effluvium, PRP reduced shedding score by ≥60% in 8/10 patients vs. placebo at 12 weeks, with no serious AEs.',
    citation: 'Int J Trichology. 2022;14(2):89-96',
    url: 'https://pubmed.ncbi.nlm.nih.gov/telogen-trial-2022',
    year: 2022,
    type: 'rct'
  },
  {
    id: 'combination-study-2022',
    title: 'Combination study, 2022',
    description: 'PRP + minoxidil out-performed minoxidil alone after 1 month in hair-density delta (p < 0.05).',
    citation: 'Front Med. 2022;9:843289',
    url: 'https://frontiersin.org/articles/combination-study-2022',
    year: 2022,
    type: 'clinical-trial'
  },
  {
    id: 'harvard-review',
    title: 'Harvard Health Review',
    description: 'Confirms strongest evidence is for early-stage male & female pattern loss, stressing vitality of remaining follicles.',
    citation: 'Harvard Health Publishing',
    url: 'https://health.harvard.edu/prp-hair-loss',
    year: 2023,
    type: 'expert-review'
  },
  {
    id: 'realself-community',
    title: 'RealSelf Community Data',
    description: '94% Worth-It score across 200+ verified patient reviews (June 2025).',
    citation: 'RealSelf.com',
    url: 'https://realself.com/prp-hair-loss',
    year: 2025,
    type: 'meta-analysis'
  }
]

export const prpFactsAtGlance = [
  {
    icon: '1️⃣',
    title: 'Autologous',
    description: 'Your own plasma',
    detail: 'Uses your body\'s natural healing factors'
  },
  {
    icon: '2️⃣',
    title: '3-4 Sessions',
    description: 'Over 3 months',
    detail: 'Monthly treatments for optimal results'
  },
  {
    icon: '3️⃣',
    title: 'Best Timing',
    description: 'When follicles still alive',
    detail: 'Early intervention = better outcomes'
  },
  {
    icon: '4️⃣',
    title: '94% Worth It',
    description: 'RealSelf rating',
    detail: 'Based on 200+ patient reviews'
  }
]