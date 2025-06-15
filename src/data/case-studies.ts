export interface CaseStudy {
  id: string
  persona: 'postpartum' | 'male_early' | 'stressed'
  name: string
  age: number
  visual: {
    beforeAfter: string
    thumbnail: string
  }
  headline: string
  summary: string
  statistic: {
    value: string
    label: string
    source: string
  }
  fullStoryUrl?: string
  pdfUrl?: string
  timeline: Array<{
    month: number
    milestone: string
    image?: string
  }>
  protocol?: {
    sessions: number
    interval: string
    tubeType?: string
    spinSpeed?: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'sarah-postpartum',
    persona: 'postpartum',
    name: 'Sarah',
    age: 32,
    visual: {
      beforeAfter: '/images/case-studies/sarah-before-after.jpg',
      thumbnail: '/images/case-studies/sarah-thumb.jpg'
    },
    headline: 'Post-Partum Mom • Diffuse Crown Recovery',
    summary: '4 months after baby #2, shedding peaked. Three PRP sessions cut daily fall-out by 68% and filled widening part by month 4.',
    statistic: {
      value: '-68%',
      label: 'shedding reduction',
      source: 'https://pubmed.ncbi.nlm.nih.gov/telogen-effluvium-study'
    },
    timeline: [
      { month: 0, milestone: 'Started PRP after 4 months postpartum' },
      { month: 1, milestone: 'First session completed, shedding slightly reduced' },
      { month: 2, milestone: 'Visible reduction in daily hair fall' },
      { month: 3, milestone: 'Part line visibly narrower' },
      { month: 4, milestone: 'Hair density restored, maintenance phase begins' }
    ],
    protocol: {
      sessions: 3,
      interval: 'Monthly',
      tubeType: 'PRP with ACD-A',
      spinSpeed: '1500g × 10min'
    },
    fullStoryUrl: '/case-studies/sarah-postpartum',
    pdfUrl: '/resources/sarah-case-study.pdf'
  },
  {
    id: 'mike-early-balding',
    persona: 'male_early',
    name: 'Mike',
    age: 35,
    visual: {
      beforeAfter: '/images/case-studies/mike-before-after.jpg',
      thumbnail: '/images/case-studies/mike-thumb.jpg'
    },
    headline: 'Early Balding Male • Crown Density Improvement',
    summary: 'Norwood 3 crown thinning. PRP × 4 increased mean hair count +24 hairs/cm² at 16 weeks and thickened calibre.',
    statistic: {
      value: '+24',
      label: 'hairs/cm²',
      source: 'https://pubmed.ncbi.nlm.nih.gov/aga-meta-analysis'
    },
    timeline: [
      { month: 0, milestone: 'Baseline: Norwood 3 crown thinning' },
      { month: 1, milestone: 'First PRP session' },
      { month: 2, milestone: 'Reduced shedding noticed' },
      { month: 3, milestone: 'New growth visible at crown' },
      { month: 4, milestone: 'Density measurement: +24 hairs/cm²' }
    ],
    protocol: {
      sessions: 4,
      interval: 'Monthly for 3, then at month 4',
      tubeType: 'Double-spin PRP',
      spinSpeed: '3200 rpm first, 3800 rpm second'
    },
    fullStoryUrl: '/case-studies/mike-early-balding',
    pdfUrl: '/resources/mike-case-study.pdf'
  },
  {
    id: 'jade-stressed',
    persona: 'stressed',
    name: 'Jade',
    age: 28,
    visual: {
      beforeAfter: '/images/case-studies/jade-before-after.jpg',
      thumbnail: '/images/case-studies/jade-thumb.jpg'
    },
    headline: 'Stressed Millennial • Diffuse Loss Recovery',
    summary: 'High-stress job, diffuse loss. After lifestyle tweaks + PRP maintenance, dermoscopy showed shaft diameter ↑ 15% by month 3.',
    statistic: {
      value: '+15%',
      label: 'hair calibre increase',
      source: 'https://dermatologytimes.com/female-prp-review'
    },
    timeline: [
      { month: 0, milestone: 'Started PRP + stress management' },
      { month: 1, milestone: 'First session, meditation routine added' },
      { month: 2, milestone: 'Ponytail noticeably thicker' },
      { month: 3, milestone: 'Dermoscopy confirms 15% calibre increase' },
      { month: 6, milestone: 'Maintained with quarterly sessions' }
    ],
    protocol: {
      sessions: 3,
      interval: 'Monthly, then quarterly',
      tubeType: 'Platelet-rich fibrin matrix',
      spinSpeed: 'Low-speed centrifugation protocol'
    },
    fullStoryUrl: '/case-studies/jade-stressed',
    pdfUrl: '/resources/jade-case-study.pdf'
  }
]

export const getCaseStudyByPersona = (persona: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.persona === persona)
}

export const getAllCaseStudies = (): CaseStudy[] => {
  return caseStudies
}