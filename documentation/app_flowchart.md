flowchart TD
  LP[Landing Page] --> SQ[Start Quiz]
  SQ --> Q1[Step 1 Hair Concerns]
  Q1 --> Q2[Step 2 Age Group]
  Q2 --> Q3[Step 3 Hair Loss History]
  Q3 --> Q4[Step 4 Medical Conditions]
  Q4 --> Q5[Step 5 Emotional Impact]
  Q5 --> Q6[Step 6 Lifestyle Factors]
  Q6 --> Q7[Step 7 Treatment Goals]
  Q7 --> LI[Lead Info and Consent]
  LI --> DN{Evaluate Responses}
  DN -->|Ideal Fit| RF[Ideal Fit Result]
  DN -->|Partial Fit| RP[Partial Fit Result]
  DN -->|Not a Fit| RN[Not a Fit Result]
  RF --> BI[Book Consult via Wix]
  RP --> BI
  RN --> ED[Educational Resources]
  BI --> WP[Sends Data to Wellness Portal]
  BI --> GS[Sends Data to Google Sheets]
  ED --> SB[Suggest Alternatives and Resources]
  subgraph Admin Flow
    AD[Admin Dashboard]
    AD --> ML[Manage Quiz Logic]
    AD --> MC[Manage Content]
    AD --> AN[View Analytics]
  end