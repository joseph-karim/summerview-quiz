# Frontend Guideline Document

This document outlines the frontend setup for the PRP Hair Window Finder project. It explains the architecture, design rules, technologies, and workflows so that any team member can pick up development without ambiguity.

## 1. Frontend Architecture

### Overview
- **Framework:** React with Next.js (Vercel deployment) for server-side rendering (SSR) and static-site generation (SSG).  
- **Language:** TypeScript for type safety and clear contracts.  
- **Styling:** Tailwind CSS + Shadcn UI for utility classes and accessible component primitives.  
- **Animation:** Framer Motion for fluid micro-interactions and animated quiz transitions.  

### Scalability & Maintainability
- **Modular Pages & Layouts:** Next.js file-based routing with shared Layouts ensures consistent headers, footers, and admin wrappers.  
- **Component Library:** Shadcn UI extends Tailwind’s design system, promoting reuse and reducing CSS drift.  
- **Custom CMS & Admin UI:** Built as a set of Next.js pages under `/admin`, backed by JSON-schema logic editor. This keeps content logic decoupled from core quiz code.  
- **CI/CD Pipeline:** GitHub Actions runs linting, type checks, and tests on each push, and deploys to Vercel when main is updated.  

### Performance
- Server rendering critical quiz pages for SEO and initial load.  
- Static export where possible (landing, result pages).  
- Image and asset optimization via Next.js Image component and in-build compression.  

## 2. Design Principles

### Key Principles
1. **Usability:** Simple question flow, clear progress bar, and large, tappable targets.  
2. **Accessibility:** All interactive elements keyboard-navigable; ARIA labels on images, form inputs, slideshow controls; color contrast meets WCAG AA.  
3. **Responsiveness:** Mobile-first approach—layouts adapt from 320px up to 1440px.  
4. **Trust & Empathy:** Plain-language copy, clinical badge visuals, real-user testimonials with demographic labels.  

### Application in UI
- **Progress Feedback:** Animated progress bar with checkpoint rewards uses Framer Motion for delight.  
- **Error Handling:** Inline validation and friendly prompts (e.g., “Oops, looks like that’s not a valid email”).  
- **Visual Hierarchy:** Clear primary CTAs (e.g., “Book Your Consult”) in accent color; secondary buttons in outlined style.  

## 3. Styling and Theming

### CSS Methodology
- **Utility-First:** Tailwind CSS for rapid prototyping and consistent design tokens.  
- **Component Primitives:** Shadcn UI enriches Tailwind with ready-to-use components (Buttons, Modals, Tabs) that follow best accessibility practices.  

### Theming
- **Single Theme:** No runtime theme switching; global theme defined in `tailwind.config.js`.  
- **Design Tokens:** Colors, spacing, and typography stored as Tailwind variables.  

### Visual Style
- **Design Style:** Modern flat design with subtle glassmorphism on modals and cards (20% white overlay, 200px blur).  
- **Glassmorphism Use Case:** Result modals and testimonial overlays to impart depth without heavy shadows.  

### Color Palette (Summerview Medical)
- **Primary:** #0052CC (Deep Blue)  
- **Secondary:** #FFDD57 (Warm Yellow)  
- **Accent:** #38BDF8 (Sky Blue)  
- **Neutral Light:** #F9FAFB  
- **Neutral Dark:** #1F2937  
- **Success:** #10B981 (Green)  
- **Warning:** #F59E0B (Amber)  
- **Error:** #EF4444 (Red)  

### Typography
- **Font Family:** Inter (sans-serif)  
- **Headings:** 700 weight  
- **Body:** 400 weight  
- **Scale:** 16px base, scale ratio 1.25 (20px, 24px, 30px…)  

## 4. Component Structure

### Organization
- **`/components`** folder for shared UI pieces (Buttons, Cards, Modals, QuizStep, AvatarSelector).  
- **`/features`** folder for domain-specific sets (quiz logic, result display, admin dashboard, analytics panel).  
- **`/layouts`** for page wrappers (MainLayout, AdminLayout).  

### Reuse & Composition
- **Atomic Components:** Buttons, Inputs, Headings.  
- **Molecules:** FormGroup (Label + Input + ErrorText), ProgressBar.  
- **Organisms:** QuizStep (question + media), ResultScreen (message + CTA + resources).  

### Benefits
- **Maintainability:** Changing a Button style in one place updates everywhere.  
- **Readability:** Clear separation of concerns—presentation vs. business logic.  

## 5. State Management

### Approach
- **React Context + useReducer:** Manages quiz state (current step, answers, progress).  
- **Local State:** Component-level state for UI toggles, modals, animations.  
- **Data Fetching:** Next.js Server Functions or client-side fetch with SWR for CMS content and booking data.  

### Sharing State
1. **QuizContext:** Wraps quiz pages, exposes `dispatch` and `state` for steps, answers, completion.  
2. **Auth Context (Clerk):** Provides user identity for admin routes.  
3. **Analytics Hook:** Wraps PostHog calls, logs events on step complete, CTA click, iframe load.  

## 6. Routing and Navigation

### Library
- **Next.js Router:** File-based routing.  

### Structure
- `/` – Landing page with quiz start.  
- `/quiz/[step]` – Dynamic routes for each quiz step (1–7).  
- `/result/[type]` – Result types: `ideal`, `partial`, `unfit`.  
- `/admin/*` – Protected CMS and analytics dashboards.  
- `/booking` – Embedded Wix Bookings iframe with prefilled query params.  

### Navigation Patterns
- **Client-side Transitions:** Next.js `<Link>` for instant page switches.  
- **Scroll Restoration:** Built-in in Next.js; custom hook for smooth scroll on quiz step change.  

## 7. Performance Optimization

### Key Strategies
1. **Code Splitting:** Next.js automatically splits by page; dynamic imports for heavy components (e.g., video player, Framer Motion variants).  
2. **Lazy Loading:** GIFs and videos load only when the quiz step is active.  
3. **Image Optimization:** `next/image` with responsive sizes and lazy loading.  
4. **Asset Minification:** Tailwind’s purge removes unused CSS. JS minified by Vercel build.  
5. **Preconnect & Preload:** Fonts and analytics endpoints preconnected for faster initial paint.  

### Impact on UX
- Faster Time To Interactive (TTI) on mobile networks.  
- Reduced bundle size—only required code shipped per page.  

## 8. Testing and Quality Assurance

### Testing Layers
- **Unit Tests:** Jest + React Testing Library for components and utility functions.  
- **Integration Tests:** Verify quiz flow logic, JSON-schema branching, and result routing.  
- **End-to-End (E2E):** Cypress tests for key user journeys—quiz completion, booking integration, admin updates.  

### Tooling & Coverage
- **Linting:** ESLint with TypeScript rules, Prettier for code style.  
- **Type Checks:** `tsc --noEmit` in CI.  
- **Coverage Reports:** 80% coverage threshold enforced.  
- **Accessibility Testing:** axe-core run in CI for critical pages.  

## 9. Conclusion and Overall Frontend Summary

This guideline ensures a unified, high-quality frontend for the PRP Hair Window Finder:

- **Architecture:** Next.js + React + TypeScript for performance and scalability.  
- **Design:** Usable, accessible, responsive, and empathetic UI guided by Summerview Medical branding.  
- **Styling:** Tailwind CSS + Shadcn UI with a modern flat/glassmorphism style.  
- **Components:** Atomic design enabling reuse and clear separation.  
- **State & Routing:** Context API for quiz state; Next.js routing for smooth navigation.  
- **Performance:** Lazy loading, code splitting, image optimization, and Vercel’s build pipeline.  
- **Testing:** Comprehensive unit, integration, and E2E suites to safeguard quality.  

By following these guidelines, the team can deliver an engaging, fast, and reliable quiz experience that drives high completion and conversion rates while upholding the brand’s standards and user trust.