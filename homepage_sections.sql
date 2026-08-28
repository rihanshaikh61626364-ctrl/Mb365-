CREATE TABLE homepage_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type TEXT NOT NULL CHECK (section_type IN ('bestselling', 'featured')),
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(section_type, book_id)
);

ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to homepage_sections"
ON homepage_sections FOR SELECT
USING (true);

CREATE POLICY "Allow admin full access to homepage_sections"
ON homepage_sections FOR ALL
USING (auth.role() = 'authenticated');
