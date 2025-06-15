# PRP Hair Window Finder: Backend Structure Document

## 1. Backend Architecture

Overall, the backend is a Node.js application built with the Express framework. We follow a clear, modular structure so that the code is easy to read, maintain, and scale:

- **Design Patterns & Folder Structure**
  - Model-View-Controller (MVC) split:  
    • **Models** define data shapes and database interactions  
    • **Controllers** receive HTTP requests, call services, and return responses  
    • **Services** hold business logic (quiz evaluation, integrations, analytics)  
  - **Middleware** for cross-cutting concerns (authentication, logging, error handling)  
  - **Routes** grouped by feature: `/quiz`, `/admin`, `/integrations`, `/auth`, `/analytics`
- **Scalability**  
  • Stateless Express app: any instance can handle any request  
  • Deployed behind a load balancer, autoscaling based on CPU and memory usage  
- **Maintainability**  
  • Separate modules for quiz logic, admin tools, integrations, analytics  
  • JSON-based quiz schema allows non-developers to update questions and routing rules in the admin UI  
- **Performance**  
  • Connection pooling for database queries  
  • In-memory caching (Redis) for frequently read data (quiz content, testimonials)  
  • CDN (Vercel/Cloudflare) for static assets and media

## 2. Database Management

We use PostgreSQL through Supabase, a managed service that handles hosting, backups, and connection security.

- **Type**: Relational (SQL)
- **Key Practices**
  - **Logical separation**: different schemas or tables for quiz content, user sessions, admin settings, testimonial mappings  
  - **No PII stored**: email and phone opt-ins are handed off to the patient portal; our DB only holds anonymized session IDs and quiz responses  
  - **Versioned migrations** using a tool like Flyway or Knex to track schema changes  
  - **Backups & Point-in-Time Recovery** managed by Supabase

## 3. Database Schema

### High-Level Overview (Human-Readable)

- **Sessions**: one row per quiz attempt (start and end timestamps, status)
- **Quiz Questions**: ID, text prompt, type (multiple choice, slider, image selector), media URL
- **Quiz Options**: linked to a question, includes label, value, optional media or score impact
- **Quiz Logic Rules**: JSON blob per rule set; defines conditionals (e.g. if time since onset > 2 years and pattern == diffuse, route to “Partial Fit”)
- **Quiz Results**: outcome type (Ideal, Partial, Unfit), timestamp, any supplemental data (e.g. recommended guide URL)
- **Admin Content**: editable text blocks and CTAs for each result pathway
- **Testimonials**: mapping of demographic labels to video URLs

### SQL Schema (PostgreSQL)

```sql
-- Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at TIMESTAMP NOT NULL DEFAULT now(),
  completed_at TIMESTAMP,
  status VARCHAR(20) NOT NULL  -- e.g. 'in_progress', 'completed'
);

-- Questions
CREATE TABLE quiz_questions (
  id SERIAL PRIMARY KEY,
  prompt TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  media_url TEXT
);

-- Options
CREATE TABLE quiz_options (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES quiz_questions(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT,
  media_url TEXT
);

-- Logic Rules
CREATE TABLE quiz_logic (
  id SERIAL PRIMARY KEY,
  rule_set_name TEXT NOT NULL,
  rules_json JSONB NOT NULL,  -- array of conditional rules
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Results
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  outcome_type VARCHAR(20) NOT NULL, -- 'Ideal','Partial','Unfit'
  details JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Admin Content
CREATE TABLE admin_content (
  key TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Testimonials
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  demographic_label TEXT NOT NULL,
  video_url TEXT NOT NULL
);
```  

## 4. API Design and Endpoints

We expose a RESTful API under `/api`. All endpoints return JSON and use standard HTTP status codes.

Public / Quiz Flow

- **GET /api/quiz/questions**  
  Returns the full list of questions and options for the quiz (caches for 1 hour).
- **POST /api/quiz/answer**  
  Records a single answer in the current session (requires session_id).  
  Body: `{ session_id, question_id, selected_value }`
- **POST /api/quiz/complete**  
  Triggers logic evaluation and returns the result pathway.  
  Body: `{ session_id }`  
  Response: `{ outcome_type, content, next_steps }`

Admin (Protected via Clerk Auth Middleware)

- **GET /api/admin/logic**  
  Fetches current quiz logic JSON.  
- **PUT /api/admin/logic**  
  Uploads a new JSON schema of logic rules (validates format).
- **GET /api/admin/content**  
  Lists editable content blocks and CTAs.
- **PUT /api/admin/content/:key**  
  Updates a specific content block.
- **GET /api/admin/analytics**  
  Pulls completion rates, drop-off points, popular answers from our data store or PostHog.

Integrations

- **POST /api/integrations/patient-portal**  
  Pushes a summary of a completed quiz (no PII) to the Wellness Patient Portal.
- **POST /api/integrations/google-sheets**  
  Appends a row for each completed quiz for offline review.
- **Webhook /api/webhooks/wix-bookings**
  Receives booking confirmations or failures from Wix, triggers follow-up logic.

## 5. Hosting Solutions

- **Backend (Node.js / Express)**: AWS Elastic Beanstalk (Dockerized) or AWS Fargate  
  • Auto-scaling groups adjust based on traffic  
  • Managed load balancing (ALB)  
- **Database**: Supabase-hosted PostgreSQL (automated backups, point-in-time recovery)  
- **Frontend**: Vercel (Next.js) with built-in CDN  
- **CDN**: Vercel + optional Cloudflare in front  

Benefits:
- Pay-as-you-go scaling  
- High availability SLAs  
- Reduced ops overhead (managed services for DB and CI/CD)

## 6. Infrastructure Components

- **Load Balancer (ALB)**: Distributes HTTP traffic across multiple Node.js instances
- **Caching Layer (Redis)**: Stores quiz questions, options, and logic JSON to reduce DB hits
- **Content Delivery Network (CDN)**: Serves static assets (images, videos) at the edge
- **Message Queue (SQS or RabbitMQ)**: Optional for handling spikes in integration calls (e.g. patient portal pushes)
- **Environment Configuration**: Secrets and API keys managed via AWS Secrets Manager or Vercel Environment Variables

These components work together to deliver fast page loads, consistent quiz performance, and reliable communication with external services.

## 7. Security Measures

- **Authentication**: Clerk Auth issues JWTs. Express middleware verifies tokens and user roles.
- **Authorization**: Role checks (admin vs public) guard protected endpoints.
- **Transport Security**: TLS/HTTPS enforced everywhere.
- **Data Encryption**: Supabase encrypts data at rest; all network traffic is encrypted in transit.
- **Rate Limiting & Throttling**: `express-rate-limit` protects public endpoints from abuse.
- **Input Validation**: Joi or Zod validate all incoming requests, including the admin’s JSON schema.
- **Security Headers**: Helmet middleware adds CSP, XSS protection, and HSTS.
- **PII Handling**: We deliberately avoid storing personal contact data; that lives in the patient portal under its own compliance framework.

## 8. Monitoring and Maintenance

- **Performance Monitoring**: AWS CloudWatch tracks CPU, memory, latency.  
- **Error Tracking**: Sentry captures uncaught exceptions and stack traces.  
- **User Analytics**: PostHog collects funnel data, button clicks, drop-off points.  
- **Alerts & Notifications**: CloudWatch alarms (high error rate, CPU spikes), PagerDuty or Slack notifications.  
- **CI/CD**: GitHub Actions automates tests, linting, and deploys on merge to main  
- **Database Migrations**: Automated on deploy via migration tool; backups tested quarterly  
- **Dependency Updates**: Dependabot or Renovate handles library updates; QA validates changes in a staging environment

## 9. Conclusion and Overall Backend Summary

The PRP Hair Window Finder backend uses a clean, modular Express app, managed PostgreSQL, and a suite of AWS services to provide a reliable, scalable, and maintainable platform. Key highlights:

- JSON-driven quiz engine editable via admin UI  
- Seamless integrations with Wix Bookings, Google Sheets, and patient portal  
- Robust security practices (Clerk Auth, encryption, rate limits)  
- Real-time analytics and error monitoring (PostHog, Sentry)  
- Managed hosting for zero-downtime deployments and automatic scaling  

This setup aligns perfectly with the project goals: a media-rich, interactive quiz experience that qualifies leads accurately, educates users, and drives consult bookings—all backed by an infrastructure built for performance and reliability.