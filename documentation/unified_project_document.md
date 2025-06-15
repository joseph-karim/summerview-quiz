# Unified Project Documentation

## Project Requirements

### 1. Project Overview

The PRP Hair Window Finder is an interactive web application designed to help people discover whether they’re good candidates for PRP (Platelet-Rich Plasma) hair restoration. Instead of feeling like a medical form, it guides users through a friendly, media-rich quiz that captures their hair condition, history, and emotional goals. Based on their answers, it gives personalized advice, educational resources, and directs qualified leads toward a free consultation.

We measure success by engagement and conversion. We aim for at least a 65% quiz completion rate and a 20% conversion of quiz takers into booked consultations. By educating users empathetically and capturing accurate data, we reduce unfit bookings, improve clinic efficiency, and build trust. Every detail—from GIFs and progress bars to testimonials—reinforces the brand’s expertise and care.

### 2. In-Scope vs. Out-of-Scope

**In-Scope (Version 1):**

- Fully interactive, seven-step quiz with rich media (GIFs, sliders, videos)
- Onboarding screen explaining quiz purpose and consent capture
- Three result pathways (Ideal, Partial Fit, Not a Fit) with tailored content
- Embedded booking integration via Wix Bookings, prefilled form fields
- Admin dashboard for editing quiz logic via JSON schema and media assets
- Analytics tracking of every interaction through PostHog
- Lead routing to patient portals and external services (Zapier → HubSpot/Mailchimp/Google Sheets)
- Basic responsiveness and accessibility best practices

**Out-of-Scope (Deferred):**

- AI-powered assistant for live help during quiz
- Post-quiz personalized PDF report emailed to users
- Scalp photo upload and clinician image analysis
- Natural language open-text question handling with NLU
- Multi-language support (English only in v1)
- Full HIPAA or GDPR compliance beyond basic consent capture

### 3. User Flow

A typical user arrives at the landing page, sees a clear value proposition in a beauty-quiz style, and clicks “Start Quiz.” They read a one-screen onboarding message about what the quiz will and won’t do, tick a consent checkbox, and begin the first of seven interactive steps. Each step uses friendly visuals and keeps questions simple, with a progress bar providing positive feedback.

At the end, they enter their email and phone number, agree to follow-up contact, and instantly receive a personalized result page. If they qualify, they watch a short testimonial video and hit “Book Consult,” which opens an embedded scheduler. If they need more review or options, they get a guide download and alternative CTAs. Behind the scenes, every action is tracked, and leads are sent to the appropriate systems.

### 4. Core Features

- Interactive Quiz Experience: Seven dynamic steps with GIFs, sliders, videos, avatar selectors, and a hair-strand progress bar. Consent capture for follow-up.
- Result Pathways: Three tailored outcomes with headlines, videos or downloads, interactive timelines, and a single clear CTA per path.
- Booking Integration: Seamless embed of Wix Bookings, prefilled user data, and time-zone aware scheduling.
- Admin Dashboard: Custom-coded interface for editing question branching (JSON schema), updating media, and viewing analytics.
- Analytics & Lead Routing: PostHog event tracking for quiz steps, video plays, guide downloads, and consult bookings. Zapier connectors push leads to HubSpot, Mailchimp, and Google Sheets.
- Trust Builders: Plain-language reassurances, demographic-matched testimonials, and credibility badges.

### 5. Tech Stack & Tools

- Frontend: Next.js with React and TypeScript for SSR/SEO, Tailwind CSS + shadcn/ui for styling, Framer Motion for animations.
- Backend: Node.js with Express (or Fastify), PostgreSQL for data storage, custom APIs (REST) for quiz logic and lead routing.
- Hosting & Deployment: Vercel for frontend, serverless functions or Railway for backend, GitHub Actions for CI/CD.
- Integrations: Wix Bookings embed, PostHog for analytics, Zapier for CRM syncing, Wistia/Loom for video hosting.
- Authentication: Simple admin login system protecting dashboard (no user auth for quiz takers).

### 6. Non-Functional Requirements

- Performance: First contentful paint under 1s on mobile, lazy load media assets, code splitting.
- Security: No PII stored client-side; user contact stored securely in backend. Admin dashboard protected by strong passwords and HTTPS.
- Accessibility: Follow WCAG basics—keyboard navigable, readable contrast ratios, alt text on images.
- Scalability: Serverless functions auto-scale, database can handle up to thousands of quiz attempts per hour.

### 7. Constraints & Assumptions

- We assume all quiz takers speak English and do not create user accounts, so state is held in session/local storage.
- No dedicated CMS; all content updates go through the custom dashboard interfacing with our JSON schema store.
- Patient portals will handle any sensitive health info and compliance requirements.
- Video assets will be hosted on Wistia or Loom with embed codes provided ahead of time.

### 8. Known Issues & Potential Pitfalls

- Heavy media could slow down mobile experiences—mitigation: lazy loading, responsive image formats.
- Users may skip optional steps—solution: gently remind of benefits and keep optional labels clear.
- Quiz logic complexity in JSON schema could become hard to manage—plan to document schema structure and provide schema validation.
- Booking embed might conflict with mobile viewports—test on real devices and adjust CSS accordingly.

## App Flow Document

### Onboarding and Sign-In/Sign-Up

When a first-time visitor lands on the PRP Hair Window Finder, they see a bold “Start Quiz” button in the hero section explaining it’s a 60-second beauty quiz. There’s no sign-in for end users. When they click that button, a full-screen overlay briefly explains what the quiz covers and asks them to consent to follow-up via email or phone. They tick a checkbox, click “Let’s Go,” and the first quiz question appears. Admin users who manage content access a separate protected login page to reach the dashboard.

### Main Dashboard or Home Page

Quiz takers don’t have a personal dashboard—they are led directly from onboarding into the quiz flow. Admins who sign in see a left sidebar listing “Quiz Logic,” “Media Library,” “Analytics,” and “Settings.” The main area displays the JSON schema editor or analytics graphs. Admins can navigate between editing questions, uploading videos, and viewing funnel drop-off without leaving the dashboard.

### Detailed Feature Flows and Page Transitions

Quiz participants move through seven sequential screens. Each screen fades in with a short GIF or video, a question prompt, and selection controls (buttons, sliders, or avatar thumbnails). A hair-strand progress bar gradually fills at the top. Optional steps show a “Skip” link in the corner. After the seventh question, the screen transitions to an email/phone entry form with microcopy explaining follow-up. Upon submission, the results engine fetches the appropriate pathway and slides in the personalized result page.

Admins editing quiz logic select “Quiz Logic” from the sidebar, modify branching conditions in a code editor pane, and click “Save.” They then click “Media Library,” upload new videos or images, and assign them to question IDs. Switching to “Analytics” shows event charts; clicking a chart link drills into step-by-step metrics.

### Settings and Account Management

Quiz takers have no settings page. Admins click “Settings” in the dashboard sidebar to update their password, configure PostHog API keys, and set lead-routing endpoints. Changes take effect after hitting “Save” and automatically deploy to staging. A “Back to Dashboard” link returns them to the main admin view.

### Error States and Alternate Paths

If the quiz fails to load media, a placeholder graphic appears with an explanatory message and a “Retry” button. If network connectivity drops mid-quiz, an offline banner prompts users to reconnect, and their answers up to that point are saved in local storage. On booking embed failures, users see a fallback link to schedule via email. Admin API errors show a standard modal with error details and a retry option.

### Conclusion and Overall App Journey

From the moment someone clicks “Start Quiz” to booking a consultation, the experience feels supportive and clear. Users answer simple prompts, enjoy engaging visuals, and receive immediate, personalized guidance. Admins can update content, review analytics, and route leads without touching code. The tight feedback loop of quiz data → result pathways → booking ensures each visitor moves swiftly to the next best step.

## Tech Stack Document

### Frontend Technologies

- Next.js & React with TypeScript: Server-side rendering for SEO and a smooth single-page feel.
- Tailwind CSS & shadcn/ui: Utility-first styling with a ready component library for consistent UI.
- Framer Motion: Fluid animations and transitions to make the quiz feel lively.
- Axios or Fetch API: For talking to our backend quiz and lead-routing endpoints.

### Backend Technologies

- Node.js with Express: Lightweight API server handling quiz logic, lead capture, and admin updates.
- PostgreSQL: Reliable relational database storing quiz responses, contact info, and JSON schema.
- REST API: Simple JSON-based endpoints for quiz steps, result computation, and admin operations.

### Infrastructure and Deployment

- Vercel: Hosts frontend and serverless functions, auto-deploys on GitHub push.
- Railway or Render: Optional backend hosting if not using Vercel Functions, supports auto-scaling.
- GitHub Actions: Runs tests and lints code, deploys to staging on pull request merges, and to production on main branch.

### Third-Party Integrations

- Wix Bookings Embed: In-app scheduling without users leaving the quiz.
- PostHog: Tracks every quiz event, video play, and guide download for funnel analysis.
- Zapier: Moves new leads into HubSpot, Mailchimp, or Google Sheets automatically.
- Wistia/Loom: Hosts testimonial videos with embed codes and view tracking.

### Security and Performance Considerations

- HTTPS everywhere: All traffic encrypted to protect user data in transit.
- Admin authentication: Password-protected dashboard with rate limiting on login attempts.
- Lazy loading: Media and non-critical scripts load only when needed.
- Caching & CDN: Static assets served via CDN for fast global delivery.

### Conclusion and Overall Tech Stack Summary

This stack balances developer productivity, user experience, and scalability. Next.js and React ensure a modern UI, while Express and PostgreSQL handle data and logic reliably. Vercel’s serverless model simplifies deployment. Integrations like Wix Bookings and PostHog plug in seamlessly to cover scheduling and analytics. Overall, these choices support our goals of high performance, maintainability, and rapid iteration.

## Frontend Guidelines

### Frontend Architecture

Our frontend uses Next.js, which combines server-side rendering and client-side hydration. Pages and dynamic quiz screens live in the `app/` directory, with a shared layout and global CSS. We organize UI components under `components/ui`, keeping design tokens and common elements in one place. This setup lets us scale the quiz, reuse elements, and maintain good performance as features grow.

### Design Principles

We focus on usability, accessibility, and responsiveness. Every element is keyboard-navigable with clear focus states. We follow WCAG contrast ratios for text and backgrounds. The layout adapts from mobile to desktop seamlessly, and interactions—like selecting an avatar or moving a slider—work equally well on touch and mouse.

### Styling and Theming

We use Tailwind CSS for utility-first styling and maintain a custom theme in `tailwind.config.ts`. The color palette is drawn from Summerview Medical’s brand: whites, blacks, grays, browns, tans, teals, and reds. Typography combines Lato for body text, Poppins for headings, and Playfair Display for stylized titles. We follow a flat, clean aesthetic with occasional glassmorphism effects in modals to add depth harmoniously.

### Component Structure

Components are grouped by function: quiz controls, media displays, navigation, and layout. Each component lives in its own folder with a `.tsx` file, a CSS module if needed, and a test file. This promotes reusability and clarity. For example, `components/ui/ProgressBar` handles the hair-strand fill effect, while `components/quiz/QuestionSlide` composes controls and media.

### State Management

Quiz state lives in React context or a custom hook (`useQuizManager`), tracking current step, answers, and progress. We keep state local to the quiz flow and persist it in session storage so users can refresh without losing answers. Admin dashboard state is simpler, using React Query to fetch and cache JSON schema and analytics data.

### Routing and Navigation

Next.js file-based routing handles public quiz pages (`/quiz/[step]`) and admin pages (`/admin/[section]`). We use the built-in Link component for client-side transitions. Conditional guards redirect unauthorized users away from `/admin` routes.

### Performance Optimization

We enable dynamic imports for heavy components like video players. Media assets are lazy loaded with a small blurred placeholder. We use Next.js Image component for optimized, responsive images. Code splitting ensures only necessary code loads per route.

### Testing and Quality Assurance

We write unit tests with Jest and React Testing Library for components and hooks. End-to-end flows use Cypress to simulate a quiz run, consent capture, and booking embed. We enforce linting (ESLint) and formatting (Prettier) in CI to catch issues early.

### Conclusion and Overall Frontend Summary

This frontend architecture delivers a polished, fast, and accessible quiz experience. Our component-based structure, clear design system, and modern tooling let us iterate quickly while ensuring consistency. Users enjoy a delightful, trustworthy journey, and developers benefit from a well-organized codebase ready for future enhancements.

## Implementation Plan

1. **Setup & Scaffold**: Clone the starter kit repo, install dependencies, configure environment variables for Vercel, database, and PostHog.
2. **Design Finalization**: Import Figma prototype assets, define Tailwind theme colors and fonts.
3. **Quiz Engine Build**: Create question slide components, progress bar, and quiz context/hook. Wire up sample JSON schema.
4. **Media & Consent Flow**: Add onboarding overlay, consent checkboxes, and lazy-loaded media components (GIFs, videos).
5. **Result Paths**: Implement three result page templates, integrate video embeds, interactive timeline, and guide downloads.
6. **Booking Integration**: Embed Wix Bookings iframe, pass prefilled query parameters, handle booking confirmations.
7. **Admin Dashboard**: Build login page, JSON schema editor, media uploader, and analytics view using React Query.
8. **Backend APIs**: Develop Express endpoints for fetching quiz steps, computing results, logging responses, and lead routing via Zapier/webhooks.
9. **Testing & QA**: Write unit tests, run Cypress flows, test on multiple devices, and fix any layout or performance issues.
10. **Deployment & Monitoring**: Deploy to staging via GitHub Actions, invite QA testers, then deploy to production. Monitor performance, analytics, and error logs for first week.
11. **Post-Launch Tweaks**: Analyze PostHog data for drop-off points, A/B test intro headlines, and refine media loads.

This step-by-step plan ensures we deliver a polished, high-impact quiz app that meets business goals and delights users.