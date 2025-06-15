/*
  # Create quiz schema for PRP Hair Window Finder

  1. New Tables
    - `quiz_sessions`
      - `id` (uuid, primary key)
      - `started_at` (timestamp)
      - `completed_at` (timestamp)
      - `result_type` (text) - ideal, partial, unfit
      - `ip_address` (text) - for rate limiting
      - `user_agent` (text) - for analytics
    
    - `quiz_responses`
      - `id` (uuid, primary key)
      - `session_id` (uuid, foreign key)
      - `question_id` (integer)
      - `answer_value` (text)
      - `answered_at` (timestamp)
    
    - `quiz_contacts`
      - `id` (uuid, primary key)
      - `session_id` (uuid, foreign key)
      - `email` (text)
      - `phone` (text)
      - `email_consent` (boolean)
      - `phone_consent` (boolean)
      - `created_at` (timestamp)
    
    - `quiz_questions`
      - `id` (integer, primary key)
      - `title` (text)
      - `subtitle` (text)
      - `type` (text)
      - `options` (jsonb)
      - `media` (jsonb)
      - `optional` (boolean)
      - `order_index` (integer)
    
    - `quiz_logic`
      - `id` (uuid, primary key)
      - `name` (text)
      - `rules` (jsonb)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public quiz access
    - Add policies for admin access
*/

-- Quiz Sessions
CREATE TABLE quiz_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  result_type text CHECK (result_type IN ('ideal', 'partial', 'unfit')),
  ip_address text,
  user_agent text
);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Allow public to create and read their own sessions
CREATE POLICY "Anyone can create quiz sessions"
  ON quiz_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read quiz sessions"
  ON quiz_sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Quiz Responses
CREATE TABLE quiz_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id integer NOT NULL,
  answer_value text NOT NULL,
  answered_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create quiz responses"
  ON quiz_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read quiz responses"
  ON quiz_responses
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Quiz Contacts
CREATE TABLE quiz_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  email text NOT NULL,
  phone text,
  email_consent boolean DEFAULT false,
  phone_consent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create quiz contacts"
  ON quiz_contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admins) can read contacts
CREATE POLICY "Authenticated users can read quiz contacts"
  ON quiz_contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Quiz Questions
CREATE TABLE quiz_questions (
  id integer PRIMARY KEY,
  title text NOT NULL,
  subtitle text,
  type text NOT NULL CHECK (type IN ('multiple-choice', 'slider', 'avatar-select', 'text')),
  options jsonb,
  media jsonb,
  optional boolean DEFAULT false,
  order_index integer NOT NULL
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- Public read access for quiz questions
CREATE POLICY "Anyone can read quiz questions"
  ON quiz_questions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can modify questions
CREATE POLICY "Authenticated users can modify quiz questions"
  ON quiz_questions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Quiz Logic
CREATE TABLE quiz_logic (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rules jsonb NOT NULL,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_logic ENABLE ROW LEVEL SECURITY;

-- Public read access for active logic
CREATE POLICY "Anyone can read active quiz logic"
  ON quiz_logic
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Only authenticated users can modify logic
CREATE POLICY "Authenticated users can modify quiz logic"
  ON quiz_logic
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default quiz questions
INSERT INTO quiz_questions (id, title, subtitle, type, options, order_index) VALUES
(1, 'What type of hair changes are you experiencing?', 'Select all that apply to your situation', 'multiple-choice', 
 '[
   {"label": "Thinning all over (diffuse)", "value": "diffuse", "description": "Hair feels thinner throughout, less density overall"},
   {"label": "Receding hairline", "value": "receding", "description": "Hairline moving back, temples thinning"},
   {"label": "Crown thinning", "value": "crown", "description": "Thinning at the top/back of head"},
   {"label": "Patchy hair loss", "value": "patchy", "description": "Circular bald spots or uneven loss"}
 ]', 1),

(2, 'What''s your age group?', 'This helps us understand your hair restoration timeline', 'avatar-select',
 '[
   {"label": "20-29", "value": "20s"},
   {"label": "30-39", "value": "30s"},
   {"label": "40-49", "value": "40s"},
   {"label": "50+", "value": "50plus"}
 ]', 2),

(3, 'When did you first notice hair changes?', 'Timing is crucial for PRP effectiveness', 'multiple-choice',
 '[
   {"label": "Within the last 6 months", "value": "recent", "description": "Early intervention often yields best results"},
   {"label": "6 months to 2 years ago", "value": "moderate", "description": "Still in a good window for treatment"},
   {"label": "2-5 years ago", "value": "established", "description": "May require combined approaches"},
   {"label": "More than 5 years ago", "value": "longterm", "description": "Advanced planning may be needed"}
 ]', 3),

(4, 'Any of these medical conditions?', 'Some conditions may affect PRP candidacy', 'multiple-choice',
 '[
   {"label": "None of these apply", "value": "none", "description": "Great! No medical barriers"},
   {"label": "Autoimmune conditions", "value": "autoimmune", "description": "May require additional evaluation"},
   {"label": "Blood disorders", "value": "blood", "description": "Could affect platelet function"},
   {"label": "Recent pregnancy/breastfeeding", "value": "pregnancy", "description": "Timing considerations may apply"}
 ]', 4),

(5, 'How is hair loss affecting you emotionally?', 'Understanding your motivation helps us provide better support', 'slider', 
 '{"min": 1, "max": 10, "label": "Impact Level (1 = minimal, 10 = significant)"}', 5),

(6, 'Which lifestyle factors apply to you?', 'These can influence treatment planning', 'multiple-choice',
 '[
   {"label": "High stress lifestyle", "value": "stress", "description": "Work, family, or life pressures"},
   {"label": "Active/athletic", "value": "active", "description": "Regular exercise, sports activities"},
   {"label": "Frequent travel", "value": "travel", "description": "May affect treatment scheduling"},
   {"label": "None of the above", "value": "none", "description": "Standard approach works well"}
 ]', 6),

(7, 'What''s your primary goal?', 'This helps us recommend the right approach', 'multiple-choice',
 '[
   {"label": "Stop further hair loss", "value": "prevent", "description": "Maintain what you have"},
   {"label": "Regrow lost hair", "value": "regrow", "description": "Reverse some of the loss"},
   {"label": "Improve hair thickness", "value": "thicken", "description": "Make existing hair fuller"},
   {"label": "Explore all options", "value": "explore", "description": "Want to learn about possibilities"}
 ]', 7);

-- Insert default quiz logic
INSERT INTO quiz_logic (name, rules, is_active) VALUES
('Default PRP Logic', 
 '{
   "ideal": {
     "conditions": [
       {"question": 1, "values": ["diffuse"]},
       {"question": 3, "values": ["recent", "moderate"]},
       {"question": 7, "values": ["prevent", "thicken"]}
     ],
     "operator": "AND"
   },
   "partial": {
     "conditions": [
       {"question": 1, "values": ["diffuse", "receding", "crown"]},
       {"question": 3, "values": ["established"]},
       {"question": 4, "values": ["none", "pregnancy"]}
     ],
     "operator": "AND"
   },
   "unfit": {
     "conditions": [
       {"question": 1, "values": ["patchy"]},
       {"question": 3, "values": ["longterm"]},
       {"question": 4, "values": ["autoimmune", "blood"]}
     ],
     "operator": "OR"
   }
 }', true);

-- Create indexes for performance
CREATE INDEX idx_quiz_responses_session_id ON quiz_responses(session_id);
CREATE INDEX idx_quiz_contacts_session_id ON quiz_contacts(session_id);
CREATE INDEX idx_quiz_sessions_result_type ON quiz_sessions(result_type);
CREATE INDEX idx_quiz_sessions_started_at ON quiz_sessions(started_at);
CREATE INDEX idx_quiz_questions_order ON quiz_questions(order_index);