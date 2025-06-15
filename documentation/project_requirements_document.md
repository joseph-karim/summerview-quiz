# Project Requirements Document (PRD)

## 1. Project Overview

We’re building the **PRP Hair Window Finder**, an interactive web quiz that feels more like a beauty quiz than a clinical form. Users answer seven visually rich, bite-sized questions—images, sliders, short videos and avatar pickers—to discover if they’re in the “ideal window” for PRP hair restoration. At the end, they get personalized guidance and an easy path to schedule a free consult.

This tool solves two core problems: it qualifies leads so clinics spend time on ready-to-book patients, and it educates prospective clients with empathy and credibility. Success means at least a 65% quiz completion rate, over 20% of completions converting to booked consults, under 40% bounce on the landing page, and an average time-on-page above 1.5 minutes.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (Version 1.0)

*   **Landing Page & Onboarding**\
    Hero section, privacy reassurance, “Start Quiz” overlay with consent checkbox.

*   **Seven-Step Quiz Engine**\
    Adaptive question flow (condition type, timing, goals), progress bar, skip-optional links.

*   **Rich Media Elements**\
    GIFs, before/after images, 8s explainer videos, avatar selectors.

*   **Data Capture & Consent**\
    Email & phone form with clear privacy microcopy and consent checkboxes.

*   **Three Result Pathways**

    1.  *Ideal Candidate*: 30s demographic-matched testimonial video, interactive 0–6-month timeline, “Book Consult” CTA
    2.  *Partial Fit*: Hair health guide download, scalp-scan recommendation, photo submission option
    3.  *Not a Fit (Now)*: “5 Alternatives to PRP” guide, transplant/topical referrals, diagnostic session CTA

*   **Booking Integration**\
    Embedded Wix Bookings iframe, prefilled form fields, in-quiz scheduling.

*   **Admin Dashboard (Custom-Code)**\
    JSON-based logic editor, copy/media updater, video mapping settings.

*   **Analytics & Lead Routing**\
    PostHog event tracking (quiz steps, video plays, downloads, bookings), push leads (name, email, phone, quiz tier) to patient portals or Google Sheets.

### Out-of-Scope (Later Phases)

*   Multiple-language support
*   AI-powered live assistant or open-text analysis
*   Scalp-photo upload and automated image review
*   Full CMS (we’ll maintain a custom admin panel instead)
*   HIPAA-level PII storage (we rely on existing patient portals for secure data)

## 3. User Flow

A new visitor lands on a warm, approachable hero section explaining “Take our 60-second beauty quiz” with a “Start Quiz” button. Scrolling down, they see privacy reassurances and a brief outline of what to expect. Clicking “Start Quiz” brings up a full-screen onboarding overlay that clarifies scope (“This quiz will help you see if PRP is right for you—no medical advice given”) and asks for consent to follow up via email/phone.

Once they tap “Let’s Go,” the seven‐step quiz begins. Each step fills a soft hair-strand progress bar and uses engaging visuals: first identifying hair condition with GIFs and images, then timing sliders and two brief explainer videos, followed by emotional-goal selection and an optional free-text reflection. After the final question, a smooth transition reveals contact fields and consent checkboxes. Upon submission, the system quickly calculates the result tier and displays one of three tailored pages—complete with videos, guides and a clear “Book Consult” button. That CTA opens a pre-populated Wix Bookings widget to secure the appointment.

## 4. Core Features

*   **Quiz Engine & Logic**\
    • Seven dynamic steps driven by an editable JSON schema\
    • Branching based on hair condition, onset timing, and goals
*   **Rich Media Presentation**\
    • GIFs, before/after images, avatar pickers, short autoplay videos\
    • Framer Motion transitions for smooth animations
*   **Progress & Engagement**\
    • Hair-strand progress bar with fill animations\
    • “Skip optional” links to reduce friction
*   **Consent & Data Capture**\
    • Email/phone form with microcopy and checkboxes\
    • No PII stored in our DB—patient portal handles secure storage
*   **Result Pathways**\
    • Ideal, Partial, Not-Fit tiers with custom headlines, videos, CTAs\
    • Downloadable guides and referral options
*   **Booking Integration**\
    • Wix Bookings iframe, prefill fields (name, email, phone, tier)\
    • Timezone-aware slot display
*   **Admin Dashboard (Custom-Coded)**\
    • JSON logic editor for question branching and result mapping\
    • Media & copy updates without redeploy
*   **Analytics & Lead Routing**\
    • PostHog captures quiz progress, video plays, guide downloads, booking events\
    • Push leads to patient portals or Google Sheets via API/webhooks
*   **Branding & Trust Builders**\
    • Summerview Medical color palette, fonts, badge visuals\
    • Plain-language reassurance (“No pressure. Just honest answers.”)

## 5. Tech Stack & Tools

*   **Frontend**\
    • Next.js (React + Server-Side Rendering for SEO)\
    • TypeScript for type safety\
    • Tailwind CSS + shadcn/ui for styling\
    • Framer Motion for animations
*   **Backend**\
    • Node.js with Express for API endpoints\
    • PostgreSQL for minimal response logging (no PII)
*   **Third-Party Services**\
    • Wix Bookings API (embedded appointment scheduling)\
    • PostHog for event analytics and funnel tracking\
    • Vercel for CI/CD, staging & production hosting
*   **Developer Tools**\
    • Bolt for rapid project scaffolding and best-practice setup\
    • Cursor IDE extension for AI-powered coding suggestions

## 6. Non-Functional Requirements

*   **Performance:**\
    • First-contentful paint < 2 seconds on mobile\
    • Lazy-load images and videos; use responsive formats (WebP/AVIF)
*   **Security & Privacy:**\
    • No sensitive health or PII stored locally\
    • Consent checkboxes and clear privacy notice
*   **Compliance:**\
    • GDPR-style consent (region-agnostic privacy best practice)\
    • No medical claims—disclaimer on non-diagnostic nature
*   **Usability & Accessibility:**\
    • WCAG 2.1 AA contrast ratios\
    • Semantic HTML, keyboard navigation, alt text on images\
    • Form labels and ARIA roles as needed

## 7. Constraints & Assumptions

*   **Wix Bookings** must provide a stable embedding API and allow prefilled fields.
*   **PostHog** account and event-tracking scripts are available at launch.
*   **No content CMS**—we assume admins will update quiz logic and media via our custom interface.
*   **English only** in V1. Future i18n not planned now.
*   **Brand assets** (colors, fonts, logo) are as provided and remain unchanged.
*   **Patient portals** handle secure storage of PII and HIPAA concerns; we only forward leads.

## 8. Known Issues & Potential Pitfalls

*   **Mid-Quiz Drop-Off:**\
    Users may abandon on step 4–5. Mitigate with motivating copy, visible progress bar, and optional “Skip” links.
*   **Media Load Speed:**\
    Rich images/videos can slow mobile. Use lazy-loading, optimized formats, and CDN delivery via Vercel.
*   **Third-Party Uptime:**\
    Dependence on Wix Bookings uptime and API limits. Build fallback (e.g., “Book by phone” link) if schedule widget fails.
*   **Logic Misconfiguration:**\
    Incorrect JSON schema updates could break quiz flow. Enforce schema validation in the admin UI.
*   **Consent Clarity:**\
    Misunderstanding of data use. Keep microcopy simple: “We’ll only use this to follow up about your results.”
*   **Analytics Gaps:**\
    Missing event fires if network issues occur. Use client-side retries or batch uploads to PostHog.

This PRD captures every detail—user journey, features, tools, security, constraints, and known pitfalls—so that follow-up documents (Tech Stack, Frontend Guidelines, Backend Structure, etc.) can be built without questions.
