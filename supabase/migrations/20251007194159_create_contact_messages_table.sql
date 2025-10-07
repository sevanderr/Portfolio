/*
  # Create Contact Messages Table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `name` (text, required) - Sender's name
      - `email` (text, required) - Sender's email address
      - `subject` (text, optional) - Message subject
      - `message` (text, required) - The actual message content
      - `created_at` (timestamptz) - Timestamp when message was received
      - `read` (boolean) - Whether the message has been read
      - `replied` (boolean) - Whether the message has been replied to

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for public insert (anyone can send a message)
    - Add policy for authenticated admin to read messages
    
  3. Notes
    - Messages can be submitted by anyone (no authentication required)
    - Only authenticated users can view messages (for portfolio owner)
    - Includes read/replied status for message management
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false,
  replied boolean DEFAULT false
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
