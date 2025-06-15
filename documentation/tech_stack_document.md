# Tech Stack Document

This document explains the technologies chosen for the PRP Hair Window Finder web app in simple, everyday language. It covers why each tool was picked and how it helps deliver a friendly, reliable, and scalable quiz experience.

## 1. Frontend Technologies

We’ve picked modern, widely adopted tools to build a fast, interactive user interface that feels like a beauty quiz rather than a medical form.

- **Next.js (React + SSR/SSG)**  
  Utilized for page routing, server-side rendering (for SEO), and static-site generation (for speed). Next.js makes pages load quickly, which helps keep users engaged.

- **React + TypeScript**  
  React lets us build reusable UI pieces (components) for quiz steps, result pages, and the admin dashboard. TypeScript adds type checking, catching mistakes early and making the code more reliable.

- **Tailwind CSS + shadcn/ui**  
  Tailwind CSS provides a utility-first approach to styling (think small, reusable style classes) so we can design directly in our markup. We augment it with shadcn/ui components—prebuilt, accessible building blocks (buttons, cards, dialogs) that match our style guide.

- **Framer Motion**  
  Used for smooth animations and transitions (e.g., progress bar filling, question fades). It makes interactions feel polished and delightful.

## 2. Backend Technologies

Our backend handles quiz logic, data storage, and the custom admin area where nontechnical team members can update questions and media.

- **Supabase (PostgreSQL + Auth)**  
  A managed, open-source backend-as-a-service built on PostgreSQL. We store quiz responses, configuration JSON, and admin user accounts here. Supabase also handles authentication securely.

- **Node.js + Express**  
  Powers any custom API endpoints we need (for example, to fetch quiz logic, push results to the Medical Wellness Portal, or prefill booking forms). Express provides a lightweight, familiar framework for building these REST endpoints.

- **Custom Admin Dashboard**  
  Built on the same Next.js/React stack, this dashboard allows content updates (branching logic, images, videos, CTAs) without touching code. It uses Clerk Auth (see below) to control who can log in and make changes.

- **Clerk Auth**  
  Manages secure, password-based access for our admin users. Clerk ensures only authorized team members can edit quiz content and view analytics.

## 3. Infrastructure and Deployment

We’ve chosen cloud platforms and workflows aimed at reliability, easy updates, and minimal downtime.

- **Vercel**  
  Hosts our Next.js frontend and serverless functions (the Express endpoints can run as Vercel Functions). Vercel auto-deploys whenever we push to the `main` branch.

- **GitHub + GitHub Actions**  
  Our source code lives in GitHub. GitHub Actions run automated tests and linting on every pull request, then deploy to a staging environment for QA. Merged changes go live to production.

- **Environment Variables & Secrets**  
  Stored securely in Vercel’s dashboard (API keys, database URLs, Clerk credentials). This keeps sensitive data out of the codebase.

## 4. Third-Party Integrations

We integrate a few trusted services to extend functionality without reinventing the wheel.

- **Wix Bookings (embedded)**  
  The quiz result page embeds a Wix Bookings iframe for consult scheduling. We prefill user name, email, phone, and quiz outcome tier to reduce friction.

- **PostHog**  
  Tracks every meaningful interaction: quiz step completion, video plays, guide downloads, booking clicks, and more. PostHog gives us clear funnels and heatmaps to spot drop-offs and optimize the quiz.

- **Video Hosting (e.g., Wistia or Loom)**  
  Testimonial videos are hosted on a video platform that supports muted autoplay, captions, and view tracking. Embeds load quickly via that platform’s CDN.

- **Summerview Medical Wellness Portal API**  
  Upon quiz completion, we send non-PII data (quiz tier, timestamp, contact opt-in) to the clinic’s secure portal for follow-up. This happens over HTTPS using their existing API.

## 5. Security and Performance Considerations

Keeping users’ trust and delivering a smooth experience are top priorities.

- **Data Privacy**  
  We do **not** store sensitive health details or raw PII on our servers. Only email/phone are captured (with explicit consent) and passed along to the medical portal. All transport is over HTTPS.

- **Authentication & Access Control**  
  Clerk Auth ensures only approved staff can access the admin dashboard. We rely on role-based rules (editor vs. admin) to limit permissions.

- **Encryption**  
  Supabase encrypts data at rest. All connections (frontend ↔ backend ↔ third parties) use TLS for data in transit.

- **Performance Optimizations**  
  • **Image & Video Lazy Loading:** We load media only when it’s about to appear on screen.  
  • **Responsive Formats:** We serve the right image/video size for each device.  
  • **Code Splitting:** Next.js automatically splits our JavaScript so only the code needed for each page loads.  
  • **CDN Delivery:** Static assets are served via Vercel’s global CDN and the video host’s CDN.

- **Accessibility & Readability**  
  We follow general good practices: sufficient color contrast, semantic HTML, keyboard navigation, and ARIA labels for interactive elements. This makes the quiz usable by everyone.

## 6. Conclusion and Tech Stack Summary

By combining Next.js, React, Tailwind CSS, and Supabase with specialized tools like Framer Motion, PostHog, and Wix Bookings, we’ve built a user-friendly, secure, and scalable quiz platform that meets both marketing and operational needs:

- Fast, engaging frontend with rich media and smooth animations
- Flexible, low-maintenance backend powered by Supabase and lightweight APIs
- Reliable deployment and version control via Vercel and GitHub Actions
- Seamless scheduling via Wix Bookings and data collection for follow-up
- Robust analytics to continuously improve conversion rates
- Strong security and privacy measures aligned with best practices

This tech stack aligns with our goals: guiding users through an empathetic, beauty-quiz–style experience, qualifying leads accurately, and delivering high-quality candidates to the clinic’s consult pipeline—all while making content updates easy for the non-technical team.