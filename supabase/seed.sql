-- Seed Data for FloridaRelocationUSA.com
-- Run this in Supabase SQL Editor

-- Insert Counties
INSERT INTO counties (name, slug, population, median_income, cost_of_living_index) VALUES
('Hillsborough', 'hillsborough', 1459762, 62000, 103.5),
('Sarasota', 'sarasota', 434006, 65000, 108.2),
('Collier', 'collier', 393258, 75000, 115.5),
('Orange', 'orange', 1425851, 58000, 102.8),
('Duval', 'duval', 995567, 55000, 96.5),
('Miami-Dade', 'miami-dade', 2716940, 52000, 122.4),
('Pinellas', 'pinellas', 974996, 54000, 101.2),
('Broward', 'broward', 1944375, 58000, 118.3),
('Lee', 'lee', 760822, 56000, 102.0),
('Polk', 'polk', 725046, 48000, 94.5)
ON CONFLICT (slug) DO NOTHING;

-- Insert Tampa
INSERT INTO cities (
  county_id, name, slug, tagline, overview, population, median_home_price, median_rent, median_income,
  unemployment_rate, cost_of_living_index, walkability_score, bike_score, transit_score, crime_index,
  weather_summary, avg_high_summer, avg_low_winter, annual_rainfall,
  pros, cons, lifestyle_tags, best_for, hero_image_url, latitude, longitude, is_featured, is_published, faq
) VALUES (
  (SELECT id FROM counties WHERE slug = 'hillsborough'),
  'Tampa', 'tampa', 'Where Business Meets Beach',
  'Tampa is a vibrant Gulf Coast city that perfectly blends urban sophistication with Florida''s natural beauty. As the economic hub of Florida''s west coast, Tampa offers a thriving job market, world-class dining, professional sports, and easy access to some of the state''s most beautiful beaches.

The city has experienced tremendous growth in recent years, attracting young professionals, families, and retirees alike. With neighborhoods ranging from historic Ybor City to the upscale Westchase, Tampa offers something for everyone.',
  392890, 425000, 1850, 58256, 3.2, 103.5, 48, 55, 32, 72,
  'Tampa enjoys a humid subtropical climate with hot summers and mild winters. The city averages 244 sunny days per year.',
  91, 52, 46.3,
  ARRAY['No state income tax', 'Thriving job market', 'Access to beaches', 'Growing food scene', 'Pro sports teams', 'Top-rated airport'],
  ARRAY['Hot humid summers', 'Hurricane season', 'Traffic congestion', 'Limited transit'],
  ARRAY['Urban', 'Waterfront', 'Growing', 'Business Hub', 'Sports'],
  ARRAY['Young Professionals', 'Families', 'Business Owners', 'Sports Fans'],
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80',
  27.9506, -82.4572, true, true,
  '[{"question": "Is Tampa good for families?", "answer": "Yes, Tampa offers excellent schools, safe neighborhoods, and family-friendly activities."}]'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Insert Sarasota
INSERT INTO cities (
  county_id, name, slug, tagline, overview, population, median_home_price, median_rent, median_income,
  unemployment_rate, cost_of_living_index, walkability_score, bike_score, transit_score, crime_index,
  weather_summary, avg_high_summer, avg_low_winter, annual_rainfall,
  pros, cons, lifestyle_tags, best_for, hero_image_url, latitude, longitude, is_featured, is_published, faq
) VALUES (
  (SELECT id FROM counties WHERE slug = 'sarasota'),
  'Sarasota', 'sarasota', 'Cultural Coast Living',
  'Sarasota is a sophisticated coastal city known for its world-class arts scene, stunning beaches, and upscale lifestyle. Located on Florida''s Gulf Coast, Sarasota offers a perfect blend of cultural refinement and natural beauty.',
  57738, 525000, 2100, 56000, 3.0, 108.2, 42, 58, 18, 68,
  'Sarasota enjoys a tropical climate with warm winters and hot summers. Average of 251 sunny days per year.',
  90, 53, 53.2,
  ARRAY['World-class beaches', 'Vibrant arts scene', 'Excellent restaurants', 'Great healthcare', 'Safe neighborhoods'],
  ARRAY['Higher cost of living', 'Seasonal traffic', 'Hot summers', 'Limited transit'],
  ARRAY['Arts', 'Beaches', 'Retirement', 'Upscale', 'Cultural'],
  ARRAY['Retirees', 'Art Enthusiasts', 'Beach Lovers', 'Families'],
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=80',
  27.3364, -82.5307, true, true,
  '[{"question": "Is Sarasota good for retirement?", "answer": "Yes, Sarasota is one of the top retirement destinations with excellent healthcare, culture, and beaches."}]'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Insert Naples
INSERT INTO cities (
  county_id, name, slug, tagline, overview, population, median_home_price, median_rent, median_income,
  unemployment_rate, cost_of_living_index, walkability_score, bike_score, transit_score, crime_index,
  weather_summary, avg_high_summer, avg_low_winter, annual_rainfall,
  pros, cons, lifestyle_tags, best_for, hero_image_url, latitude, longitude, is_featured, is_published, faq
) VALUES (
  (SELECT id FROM counties WHERE slug = 'collier'),
  'Naples', 'naples', 'Paradise on the Gulf',
  'Naples is one of Florida''s most prestigious coastal communities, known for its pristine beaches, world-class golf courses, and luxurious lifestyle. Located on the Gulf of Mexico in Southwest Florida.',
  22088, 875000, 2800, 85000, 2.8, 115.5, 35, 45, 12, 82,
  'Naples has a tropical climate with warm, dry winters and hot, wet summers. Averages 264 sunny days per year.',
  91, 55, 54.0,
  ARRAY['Pristine beaches', 'World-class golf', 'Upscale shopping', 'Excellent healthcare', 'Very safe'],
  ARRAY['High cost of living', 'Hot summers', 'Seasonal crowds', 'Limited transit'],
  ARRAY['Luxury', 'Golf', 'Beaches', 'Retirement', 'Upscale'],
  ARRAY['Retirees', 'Golf Enthusiasts', 'Luxury Seekers', 'Nature Lovers'],
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
  26.1420, -81.7948, true, true,
  '[{"question": "Is Naples expensive?", "answer": "Yes, Naples has one of the highest costs of living in Florida with median home prices around $875K."}]'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Insert Orlando
INSERT INTO cities (
  county_id, name, slug, tagline, overview, population, median_home_price, median_rent, median_income,
  unemployment_rate, cost_of_living_index, walkability_score, bike_score, transit_score, crime_index,
  weather_summary, avg_high_summer, avg_low_winter, annual_rainfall,
  pros, cons, lifestyle_tags, best_for, hero_image_url, latitude, longitude, is_featured, is_published, faq
) VALUES (
  (SELECT id FROM counties WHERE slug = 'orange'),
  'Orlando', 'orlando', 'The City Beautiful',
  'Orlando is a dynamic, fast-growing metropolitan area known worldwide for its theme parks, but offering so much more for residents including a thriving tech hub, healthcare center, and diverse community.',
  307573, 385000, 1750, 52000, 3.5, 102.8, 42, 48, 28, 65,
  'Orlando has a humid subtropical climate with hot, humid summers and mild winters. Averages 233 sunny days per year.',
  92, 50, 50.7,
  ARRAY['World-class entertainment', 'Strong job market', 'Diverse community', 'More affordable', 'Many lakes'],
  ARRAY['Hot summers', 'Tourist traffic', 'Hurricane risk', 'Sprawling layout'],
  ARRAY['Theme Parks', 'Families', 'Jobs', 'Diverse', 'Growing'],
  ARRAY['Families', 'Young Professionals', 'Tech Workers', 'Entertainment Industry'],
  'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=1920&q=80',
  28.5383, -81.3792, true, true,
  '[{"question": "Is Orlando just for tourists?", "answer": "No, Orlando has a thriving local economy in tech, healthcare, and aerospace beyond tourism."}]'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Insert Jacksonville
INSERT INTO cities (
  county_id, name, slug, tagline, overview, population, median_home_price, median_rent, median_income,
  unemployment_rate, cost_of_living_index, walkability_score, bike_score, transit_score, crime_index,
  weather_summary, avg_high_summer, avg_low_winter, annual_rainfall,
  pros, cons, lifestyle_tags, best_for, hero_image_url, latitude, longitude, is_featured, is_published, faq
) VALUES (
  (SELECT id FROM counties WHERE slug = 'duval'),
  'Jacksonville', 'jacksonville', 'Bold City Living',
  'Jacksonville is the largest city by area in the continental United States, offering an incredible diversity of neighborhoods, beaches, and lifestyle options at an affordable price.',
  949611, 315000, 1450, 55000, 3.8, 96.5, 26, 42, 15, 58,
  'Jacksonville has a humid subtropical climate with hot summers and mild winters. Averages 221 sunny days per year.',
  92, 44, 52.4,
  ARRAY['Very affordable', 'Miles of beaches', 'Large job market', 'Diverse neighborhoods', 'No state income tax'],
  ARRAY['Sprawling city', 'Higher crime areas', 'Hot summers', 'Limited transit'],
  ARRAY['Affordable', 'Growing', 'Military', 'Beaches', 'Diverse'],
  ARRAY['First-time Buyers', 'Military Families', 'Young Professionals', 'Budget-Conscious'],
  'https://images.unsplash.com/photo-1619017098958-f0fce4e3a39b?w=1920&q=80',
  30.3322, -81.6557, false, true,
  '[{"question": "Is Jacksonville affordable?", "answer": "Yes, Jacksonville has one of the lowest costs of living among major Florida cities."}]'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Insert Miami
INSERT INTO cities (
  county_id, name, slug, tagline, overview, population, median_home_price, median_rent, median_income,
  unemployment_rate, cost_of_living_index, walkability_score, bike_score, transit_score, crime_index,
  weather_summary, avg_high_summer, avg_low_winter, annual_rainfall,
  pros, cons, lifestyle_tags, best_for, hero_image_url, latitude, longitude, is_featured, is_published, faq
) VALUES (
  (SELECT id FROM counties WHERE slug = 'miami-dade'),
  'Miami', 'miami', 'The Magic City',
  'Miami is an international metropolis known for its stunning beaches, vibrant nightlife, diverse culture, and global business connections. The gateway to Latin America.',
  442241, 595000, 2500, 44000, 4.2, 122.4, 78, 65, 57, 52,
  'Miami has a tropical monsoon climate with hot, humid summers and warm, dry winters. Year-round warm temperatures.',
  91, 60, 61.9,
  ARRAY['World-famous beaches', 'International culture', 'Excellent nightlife', 'Gateway to Latin America', 'Year-round warmth'],
  ARRAY['Very high cost of living', 'Traffic congestion', 'Hurricane risk', 'High insurance'],
  ARRAY['International', 'Nightlife', 'Beach', 'Urban', 'Luxury'],
  ARRAY['International Business', 'Nightlife Enthusiasts', 'Beach Lovers', 'Latin Culture'],
  'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1920&q=80',
  25.7617, -80.1918, false, true,
  '[{"question": "Is Miami expensive?", "answer": "Yes, Miami has one of the highest costs of living in Florida with median homes around $595K."}]'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Insert St. Petersburg
INSERT INTO cities (
  county_id, name, slug, tagline, overview, population, median_home_price, median_rent, median_income,
  unemployment_rate, cost_of_living_index, walkability_score, bike_score, transit_score, crime_index,
  weather_summary, avg_high_summer, avg_low_winter, annual_rainfall,
  pros, cons, lifestyle_tags, best_for, hero_image_url, latitude, longitude, is_featured, is_published, faq
) VALUES (
  (SELECT id FROM counties WHERE slug = 'pinellas'),
  'St. Petersburg', 'st-petersburg', 'The Sunshine City',
  'St. Petersburg has transformed into one of Florida''s most dynamic cities, known for its thriving arts scene, craft breweries, and beautiful waterfront with a walkable downtown.',
  258308, 395000, 1800, 54000, 3.3, 101.2, 52, 62, 25, 62,
  'St. Petersburg holds the Guinness World Record for consecutive sunny days (768). Average of 361 days with sunshine per year.',
  90, 54, 46.3,
  ARRAY['Most sunny days in US', 'Thriving arts scene', 'Walkable downtown', 'Beautiful waterfront', 'Great beer scene'],
  ARRAY['Rising prices', 'Traffic to Tampa', 'Hot summers', 'Limited parking'],
  ARRAY['Arts', 'Waterfront', 'Downtown', 'Progressive', 'Sunny'],
  ARRAY['Art Lovers', 'Young Professionals', 'LGBTQ+ Community', 'Beer Enthusiasts'],
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80',
  27.7676, -82.6403, false, true,
  '[{"question": "Is St. Pete walkable?", "answer": "Yes, downtown St. Petersburg is one of the most walkable areas in Florida."}]'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Insert Fort Myers
INSERT INTO cities (
  county_id, name, slug, tagline, overview, population, median_home_price, median_rent, median_income,
  unemployment_rate, cost_of_living_index, walkability_score, bike_score, transit_score, crime_index,
  weather_summary, avg_high_summer, avg_low_winter, annual_rainfall,
  pros, cons, lifestyle_tags, best_for, hero_image_url, latitude, longitude, is_featured, is_published, faq
) VALUES (
  (SELECT id FROM counties WHERE slug = 'lee'),
  'Fort Myers', 'fort-myers', 'City of Palms',
  'Fort Myers is a growing Southwest Florida city offering a more affordable alternative to nearby Naples while providing excellent beaches, outdoor recreation, and a revitalizing downtown.',
  92245, 355000, 1600, 48000, 3.6, 102.0, 32, 40, 12, 55,
  'Fort Myers has a tropical climate with warm winters and hot, rainy summers. Averages 265 sunny days per year.',
  92, 54, 55.8,
  ARRAY['More affordable than Naples', 'Beautiful beaches', 'Growing job market', 'Historic downtown', 'Island access'],
  ARRAY['Hot summers', 'Hurricane exposure', 'Sprawling layout', 'Tourist traffic'],
  ARRAY['Growing', 'Affordable', 'Beach', 'Historic', 'Family'],
  ARRAY['Retirees', 'Families', 'Beach Lovers', 'Value Seekers'],
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
  26.6406, -81.8723, false, true,
  '[{"question": "How did Hurricane Ian affect Fort Myers?", "answer": "Fort Myers was impacted by Hurricane Ian in 2022 but has been rebuilding with improved infrastructure."}]'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Verify data
SELECT 'Counties inserted:' as info, count(*) as count FROM counties
UNION ALL
SELECT 'Cities inserted:' as info, count(*) as count FROM cities;
