-- FloridaRelocationUSA.com Database Schema
-- Comprehensive Florida Relocation Platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

-- ============================================
-- GEOGRAPHIC ENTITIES
-- ============================================

-- Counties
CREATE TABLE counties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  population INTEGER,
  median_income INTEGER,
  cost_of_living_index DECIMAL(5,2),
  property_tax_rate DECIMAL(5,4),
  meta_title TEXT,
  meta_description TEXT,
  hero_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cities
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  county_id UUID REFERENCES counties(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  overview TEXT,
  
  -- Demographics
  population INTEGER,
  median_home_price INTEGER,
  median_rent INTEGER,
  median_income INTEGER,
  unemployment_rate DECIMAL(4,2),
  cost_of_living_index DECIMAL(5,2),
  
  -- Livability Scores
  walkability_score INTEGER CHECK (walkability_score BETWEEN 0 AND 100),
  bike_score INTEGER CHECK (bike_score BETWEEN 0 AND 100),
  transit_score INTEGER CHECK (transit_score BETWEEN 0 AND 100),
  crime_index DECIMAL(5,2),
  
  -- Weather
  weather_summary TEXT,
  avg_high_summer INTEGER,
  avg_low_winter INTEGER,
  annual_rainfall DECIMAL(5,2),
  
  -- Content
  pros TEXT[],
  cons TEXT[],
  lifestyle_tags TEXT[],
  best_for TEXT[],
  faq JSONB,
  
  -- Media
  hero_image_url TEXT,
  gallery_images TEXT[],
  video_url TEXT,
  
  -- Location
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  schema_markup JSONB,
  
  -- Status
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Neighborhoods
CREATE TABLE neighborhoods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT CHECK (type IN ('master_planned', 'traditional', 'retirement', 'golf', 'waterfront', 'luxury', 'historic', 'suburban')),
  tagline TEXT,
  overview TEXT,
  
  -- Community Details
  year_established INTEGER,
  total_homes INTEGER,
  min_home_price INTEGER,
  max_home_price INTEGER,
  median_home_price INTEGER,
  
  -- Fees
  hoa_fee_min INTEGER,
  hoa_fee_max INTEGER,
  has_cdd BOOLEAN DEFAULT FALSE,
  cdd_fee INTEGER,
  
  -- Housing
  home_styles TEXT[],
  lot_sizes TEXT,
  builder_names TEXT[],
  
  -- Amenities & Lifestyle
  amenities TEXT[],
  
  -- Schools
  school_district TEXT,
  elementary_school TEXT,
  middle_school TEXT,
  high_school TEXT,
  
  -- Nearby
  nearby_shopping TEXT[],
  nearby_dining TEXT[],
  nearby_healthcare TEXT[],
  commute_times JSONB,
  
  -- Content
  pros TEXT[],
  cons TEXT[],
  best_for TEXT[],
  faq JSONB,
  
  -- Media
  hero_image_url TEXT,
  gallery_images TEXT[],
  video_url TEXT,
  virtual_tour_url TEXT,
  
  -- Location
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  schema_markup JSONB,
  
  -- Status
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schools
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id UUID REFERENCES cities(id) ON DELETE SET NULL,
  neighborhood_id UUID REFERENCES neighborhoods(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT CHECK (type IN ('elementary', 'middle', 'high', 'k8', 'k12', 'charter', 'private', 'magnet')),
  grade_range TEXT,
  district TEXT,
  
  -- Contact
  address TEXT,
  phone TEXT,
  website TEXT,
  
  -- Stats
  enrollment INTEGER,
  student_teacher_ratio DECIMAL(4,1),
  
  -- Ratings (1-10 scale)
  overall_rating DECIMAL(3,1) CHECK (overall_rating BETWEEN 0 AND 10),
  academic_rating DECIMAL(3,1) CHECK (academic_rating BETWEEN 0 AND 10),
  test_scores_rating DECIMAL(3,1) CHECK (test_scores_rating BETWEEN 0 AND 10),
  college_readiness DECIMAL(3,1) CHECK (college_readiness BETWEEN 0 AND 10),
  
  -- Programs
  athletics TEXT[],
  extracurriculars TEXT[],
  
  -- Content
  overview TEXT,
  pros TEXT[],
  cons TEXT[],
  
  -- Media
  hero_image_url TEXT,
  gallery_images TEXT[],
  
  -- Location
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AGENT/REALTOR SYSTEM
-- ============================================

CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID, -- Link to auth.users when auth is set up
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  license_number TEXT,
  brokerage TEXT,
  
  -- Profile
  bio TEXT,
  tagline TEXT,
  specializations TEXT[],
  years_experience INTEGER,
  total_sales INTEGER,
  languages TEXT[],
  certifications TEXT[],
  
  -- Media
  avatar_url TEXT,
  cover_image_url TEXT,
  video_intro_url TEXT,
  
  -- Links
  website TEXT,
  social_links JSONB,
  
  -- Subscription
  is_verified BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium', 'elite')),
  subscription_expires_at TIMESTAMPTZ,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent Sponsorships (City/Neighborhood placements)
CREATE TABLE agent_sponsorships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  sponsorship_type TEXT NOT NULL CHECK (sponsorship_type IN ('city', 'neighborhood', 'county', 'school_district')),
  entity_id UUID NOT NULL,
  entity_name TEXT NOT NULL,
  position INTEGER DEFAULT 1,
  price_monthly INTEGER,
  starts_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(sponsorship_type, entity_id, position)
);

-- ============================================
-- LEAD MANAGEMENT
-- ============================================

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_page TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('contact_form', 'consultation', 'mortgage_quote', 'relocation_request', 'community_info', 'school_info')),
  
  -- Contact Info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  
  -- Preferences
  moving_timeline TEXT,
  budget_range TEXT,
  family_size INTEGER,
  interests TEXT[],
  preferred_areas TEXT[],
  
  -- Assignment
  assigned_agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'nurturing', 'converted', 'lost')),
  notes TEXT,
  
  -- Tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTENT MANAGEMENT
-- ============================================

CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT CHECK (category IN ('relocation', 'cost_of_living', 'real_estate', 'lifestyle', 'schools', 'retirement', 'employment', 'healthcare', 'weather', 'guide')),
  tags TEXT[],
  author_name TEXT,
  
  -- Media
  hero_image_url TEXT,
  
  -- Relations
  related_city_ids UUID[],
  related_neighborhood_ids UUID[],
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  schema_markup JSONB,
  
  -- Status
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media Library
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('city', 'neighborhood', 'school', 'article', 'agent')),
  entity_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video', 'virtual_tour')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  alt_text TEXT,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  is_hero BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER FEATURES (Future)
-- ============================================

CREATE TABLE user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('city', 'neighborhood', 'school', 'article')),
  entity_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  criteria JSONB NOT NULL,
  notifications_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AI CONTENT GENERATION
-- ============================================

CREATE TABLE content_generation_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('city', 'neighborhood', 'school', 'article')),
  entity_id UUID NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('overview', 'pros_cons', 'faq', 'meta', 'social', 'video_script')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  prompt TEXT,
  result TEXT,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_cities_county ON cities(county_id);
CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_cities_featured ON cities(is_featured) WHERE is_published = TRUE;
CREATE INDEX idx_cities_search ON cities USING gin(to_tsvector('english', name || ' ' || COALESCE(tagline, '') || ' ' || COALESCE(overview, '')));

CREATE INDEX idx_neighborhoods_city ON neighborhoods(city_id);
CREATE INDEX idx_neighborhoods_slug ON neighborhoods(slug);
CREATE INDEX idx_neighborhoods_type ON neighborhoods(type);
CREATE INDEX idx_neighborhoods_featured ON neighborhoods(is_featured) WHERE is_published = TRUE;
CREATE INDEX idx_neighborhoods_search ON neighborhoods USING gin(to_tsvector('english', name || ' ' || COALESCE(tagline, '') || ' ' || COALESCE(overview, '')));

CREATE INDEX idx_schools_city ON schools(city_id);
CREATE INDEX idx_schools_neighborhood ON schools(neighborhood_id);
CREATE INDEX idx_schools_slug ON schools(slug);
CREATE INDEX idx_schools_type ON schools(type);
CREATE INDEX idx_schools_rating ON schools(overall_rating DESC);

CREATE INDEX idx_agents_email ON agents(email);
CREATE INDEX idx_agents_active ON agents(is_active) WHERE is_active = TRUE;

CREATE INDEX idx_agent_sponsorships_agent ON agent_sponsorships(agent_id);
CREATE INDEX idx_agent_sponsorships_entity ON agent_sponsorships(sponsorship_type, entity_id);
CREATE INDEX idx_agent_sponsorships_active ON agent_sponsorships(is_active) WHERE is_active = TRUE;

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_agent ON leads(assigned_agent_id);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published ON articles(published_at DESC) WHERE is_published = TRUE;

CREATE INDEX idx_media_entity ON media(entity_type, entity_id);
CREATE INDEX idx_media_hero ON media(entity_type, entity_id) WHERE is_hero = TRUE;

CREATE INDEX idx_content_queue_status ON content_generation_queue(status);
CREATE INDEX idx_content_queue_entity ON content_generation_queue(entity_type, entity_id);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER counties_updated_at BEFORE UPDATE ON counties FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER cities_updated_at BEFORE UPDATE ON cities FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER neighborhoods_updated_at BEFORE UPDATE ON neighborhoods FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER saved_searches_updated_at BEFORE UPDATE ON saved_searches FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE counties ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generation_queue ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published cities" ON cities FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can read published neighborhoods" ON neighborhoods FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can read published schools" ON schools FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can read published articles" ON articles FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Public can read counties" ON counties FOR SELECT USING (TRUE);
CREATE POLICY "Public can read active agents" ON agents FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read active sponsorships" ON agent_sponsorships FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read media" ON media FOR SELECT USING (TRUE);

-- Allow anonymous lead submission
CREATE POLICY "Anyone can create leads" ON leads FOR INSERT WITH CHECK (TRUE);
