import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const counties = [
  { name: 'Hillsborough', slug: 'hillsborough', population: 1459762, median_income: 62000, cost_of_living_index: 103.5 },
  { name: 'Sarasota', slug: 'sarasota', population: 434006, median_income: 65000, cost_of_living_index: 108.2 },
  { name: 'Collier', slug: 'collier', population: 393258, median_income: 75000, cost_of_living_index: 115.5 },
  { name: 'Orange', slug: 'orange', population: 1425851, median_income: 58000, cost_of_living_index: 102.8 },
  { name: 'Duval', slug: 'duval', population: 995567, median_income: 55000, cost_of_living_index: 96.5 },
  { name: 'Miami-Dade', slug: 'miami-dade', population: 2716940, median_income: 52000, cost_of_living_index: 122.4 },
  { name: 'Pinellas', slug: 'pinellas', population: 974996, median_income: 54000, cost_of_living_index: 101.2 },
  { name: 'Broward', slug: 'broward', population: 1944375, median_income: 58000, cost_of_living_index: 118.3 },
  { name: 'Lee', slug: 'lee', population: 760822, median_income: 56000, cost_of_living_index: 102.0 },
  { name: 'Polk', slug: 'polk', population: 725046, median_income: 48000, cost_of_living_index: 94.5 },
]

const cities = [
  {
    name: 'Tampa',
    slug: 'tampa',
    county_slug: 'hillsborough',
    tagline: 'Where Business Meets Beach',
    overview: `Tampa is a vibrant Gulf Coast city that perfectly blends urban sophistication with Florida's natural beauty. As the economic hub of Florida's west coast, Tampa offers a thriving job market, world-class dining, professional sports, and easy access to some of the state's most beautiful beaches.

The city has experienced tremendous growth in recent years, attracting young professionals, families, and retirees alike. With neighborhoods ranging from historic Ybor City to the upscale Westchase, Tampa offers something for everyone. The city's cultural scene includes museums, performing arts, and a growing culinary landscape that rivals much larger cities.

Tampa's strategic location provides quick access to Orlando's theme parks, Clearwater's pristine beaches, and St. Petersburg's arts district. The Tampa International Airport is consistently rated one of the best in the nation, making travel convenient for residents and visitors.`,
    population: 392890,
    median_home_price: 425000,
    median_rent: 1850,
    median_income: 58256,
    unemployment_rate: 3.2,
    cost_of_living_index: 103.5,
    walkability_score: 48,
    bike_score: 55,
    transit_score: 32,
    crime_index: 72,
    weather_summary: 'Tampa enjoys a humid subtropical climate with hot summers and mild winters. The city averages 244 sunny days per year.',
    avg_high_summer: 91,
    avg_low_winter: 52,
    annual_rainfall: 46.3,
    pros: ['No state income tax', 'Thriving job market with Fortune 500 companies', 'Access to world-class beaches', 'Growing food and cultural scene', 'Professional sports teams (Bucs, Lightning, Rays)', 'Tampa International Airport rated #1 in US', 'Lower cost of living than Miami', 'Year-round outdoor activities'],
    cons: ['Hot and humid summers', 'Hurricane season (June-November)', 'Traffic congestion during rush hours', 'Limited public transportation', 'Property insurance costs rising'],
    lifestyle_tags: ['Urban', 'Waterfront', 'Growing', 'Business Hub', 'Sports', 'Dining'],
    best_for: ['Young Professionals', 'Families', 'Business Owners', 'Sports Fans', 'Foodies'],
    hero_image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80',
    latitude: 27.9506,
    longitude: -82.4572,
    is_featured: true,
    is_published: true,
  },
  {
    name: 'Sarasota',
    slug: 'sarasota',
    county_slug: 'sarasota',
    tagline: 'Cultural Coast Living',
    overview: `Sarasota is a sophisticated coastal city known for its world-class arts scene, stunning beaches, and upscale lifestyle. Located on Florida's Gulf Coast, Sarasota offers a perfect blend of cultural refinement and natural beauty that attracts retirees, artists, and families seeking a high quality of life.

The city boasts the famous Siesta Key Beach, consistently ranked among the best beaches in America. Beyond the beaches, Sarasota offers the Ringling Museum, a vibrant downtown with boutique shopping and fine dining, and numerous performing arts venues including the Sarasota Opera and Sarasota Ballet.

Sarasota's real estate market features everything from historic bungalows to luxury waterfront estates. The city's excellent schools, safe neighborhoods, and abundance of outdoor activities make it ideal for families, while its cultural amenities and healthcare facilities attract active retirees.`,
    population: 57738,
    median_home_price: 525000,
    median_rent: 2100,
    median_income: 56000,
    unemployment_rate: 3.0,
    cost_of_living_index: 108.2,
    walkability_score: 42,
    bike_score: 58,
    transit_score: 18,
    crime_index: 68,
    weather_summary: 'Sarasota enjoys a tropical climate with warm winters and hot summers. Average of 251 sunny days per year.',
    avg_high_summer: 90,
    avg_low_winter: 53,
    annual_rainfall: 53.2,
    pros: ['World-class beaches (Siesta Key, Lido Key)', 'Vibrant arts and culture scene', 'Excellent restaurants and dining', 'Great healthcare facilities', 'Safe, family-friendly neighborhoods', 'No state income tax', 'Beautiful natural environment'],
    cons: ['Higher cost of living', 'Seasonal traffic from tourists', 'Hot and humid summers', 'Limited public transportation', 'Hurricane risk'],
    lifestyle_tags: ['Arts', 'Beaches', 'Retirement', 'Upscale', 'Cultural', 'Coastal'],
    best_for: ['Retirees', 'Art Enthusiasts', 'Beach Lovers', 'Families', 'Healthcare Workers'],
    hero_image_url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=80',
    latitude: 27.3364,
    longitude: -82.5307,
    is_featured: true,
    is_published: true,
  },
  {
    name: 'Naples',
    slug: 'naples',
    county_slug: 'collier',
    tagline: 'Paradise on the Gulf',
    overview: `Naples is one of Florida's most prestigious coastal communities, known for its pristine beaches, world-class golf courses, and luxurious lifestyle. Located on the Gulf of Mexico in Southwest Florida, Naples attracts affluent retirees, executives, and families seeking an upscale environment.

The city features miles of sugar-white beaches, designer shopping on Fifth Avenue South, and over 90 championship golf courses in the surrounding area. Naples consistently ranks among America's happiest and healthiest cities, with excellent healthcare facilities and an abundance of outdoor activities.

Despite its reputation for luxury, Naples offers diverse neighborhoods at various price points. From the exclusive Port Royal and Aqualane Shores to more accessible communities in North Naples, the area provides options for different lifestyles and budgets.`,
    population: 22088,
    median_home_price: 875000,
    median_rent: 2800,
    median_income: 85000,
    unemployment_rate: 2.8,
    cost_of_living_index: 115.5,
    walkability_score: 35,
    bike_score: 45,
    transit_score: 12,
    crime_index: 82,
    weather_summary: 'Naples has a tropical climate with warm, dry winters and hot, wet summers. Averages 264 sunny days per year.',
    avg_high_summer: 91,
    avg_low_winter: 55,
    annual_rainfall: 54.0,
    pros: ['Pristine beaches and natural beauty', 'World-class golf courses', 'Upscale shopping and dining', 'Excellent healthcare (NCH)', 'Very safe community', 'No state income tax', 'Active lifestyle opportunities'],
    cons: ['High cost of living', 'Very hot and humid summers', 'Seasonal population swings', 'Limited public transportation', 'Hurricane exposure', 'Can feel isolated'],
    lifestyle_tags: ['Luxury', 'Golf', 'Beaches', 'Retirement', 'Upscale', 'Coastal'],
    best_for: ['Retirees', 'Golf Enthusiasts', 'Luxury Seekers', 'Nature Lovers', 'Healthcare Access'],
    hero_image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    latitude: 26.1420,
    longitude: -81.7948,
    is_featured: true,
    is_published: true,
  },
  {
    name: 'Orlando',
    slug: 'orlando',
    county_slug: 'orange',
    tagline: 'The City Beautiful',
    overview: `Orlando is a dynamic, fast-growing metropolitan area known worldwide for its theme parks, but offering so much more for residents. The city has evolved into a major tech hub, healthcare center, and diverse community that attracts families, young professionals, and entrepreneurs.

Beyond Disney World and Universal Studios, Orlando offers a thriving downtown with trendy neighborhoods, a growing food scene, and abundant outdoor recreation around its many lakes. The city's diverse population creates a rich cultural tapestry with international cuisine and events.

Orlando's economy extends well beyond tourism, with major employers in aerospace, simulation technology, healthcare, and film production. The area's relatively affordable housing compared to coastal Florida cities, combined with no state income tax, makes it attractive for young families and career-focused individuals.`,
    population: 307573,
    median_home_price: 385000,
    median_rent: 1750,
    median_income: 52000,
    unemployment_rate: 3.5,
    cost_of_living_index: 102.8,
    walkability_score: 42,
    bike_score: 48,
    transit_score: 28,
    crime_index: 65,
    weather_summary: 'Orlando has a humid subtropical climate with hot, humid summers and mild winters. Averages 233 sunny days per year.',
    avg_high_summer: 92,
    avg_low_winter: 50,
    annual_rainfall: 50.7,
    pros: ['World-class theme parks and entertainment', 'Strong job market in tech and healthcare', 'Diverse, international community', 'More affordable than coastal cities', 'Many lakes and outdoor activities', 'No state income tax', 'Growing food and arts scene'],
    cons: ['Hot and humid summers', 'Heavy tourist traffic', 'Hurricane risk', 'Sprawling layout requires car', 'Can feel crowded in tourist areas'],
    lifestyle_tags: ['Theme Parks', 'Families', 'Jobs', 'Diverse', 'Growing', 'Entertainment'],
    best_for: ['Families', 'Young Professionals', 'Tech Workers', 'Entertainment Industry', 'Theme Park Enthusiasts'],
    hero_image_url: 'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=1920&q=80',
    latitude: 28.5383,
    longitude: -81.3792,
    is_featured: true,
    is_published: true,
  },
  {
    name: 'Jacksonville',
    slug: 'jacksonville',
    county_slug: 'duval',
    tagline: 'Bold City Living',
    overview: `Jacksonville is the largest city by area in the continental United States, offering an incredible diversity of neighborhoods, beaches, and lifestyle options. Located in Northeast Florida, Jacksonville provides a more affordable alternative to South Florida while still offering urban amenities and beach access.

The city features 22 miles of beaches, a revitalizing downtown, and distinct neighborhoods from the historic Riverside/Avondale to the beach communities of Atlantic Beach and Neptune Beach. Jacksonville's economy is anchored by finance, healthcare, logistics, and a significant military presence.

Jacksonville offers something increasingly rare in Florida: affordability. The cost of living remains below the national average, making homeownership achievable for many. The city's ongoing investment in downtown development and the arts is creating new energy and opportunities.`,
    population: 949611,
    median_home_price: 315000,
    median_rent: 1450,
    median_income: 55000,
    unemployment_rate: 3.8,
    cost_of_living_index: 96.5,
    walkability_score: 26,
    bike_score: 42,
    transit_score: 15,
    crime_index: 58,
    weather_summary: 'Jacksonville has a humid subtropical climate with hot summers and mild winters. Averages 221 sunny days per year.',
    avg_high_summer: 92,
    avg_low_winter: 44,
    annual_rainfall: 52.4,
    pros: ['Very affordable cost of living', 'Miles of beaches', 'Large job market', 'Diverse neighborhoods', 'No state income tax', 'Strong military presence', 'Growing downtown scene'],
    cons: ['Sprawling city requires car', 'Higher crime in some areas', 'Hot and humid summers', 'Less developed public transit', 'Can feel spread out'],
    lifestyle_tags: ['Affordable', 'Growing', 'Military', 'Beaches', 'Urban', 'Diverse'],
    best_for: ['First-time Homebuyers', 'Military Families', 'Young Professionals', 'Beach Lovers', 'Budget-Conscious'],
    hero_image_url: 'https://images.unsplash.com/photo-1619017098958-f0fce4e3a39b?w=1920&q=80',
    latitude: 30.3322,
    longitude: -81.6557,
    is_featured: false,
    is_published: true,
  },
  {
    name: 'Miami',
    slug: 'miami',
    county_slug: 'miami-dade',
    tagline: 'The Magic City',
    overview: `Miami is an international metropolis known for its stunning beaches, vibrant nightlife, diverse culture, and global business connections. As the gateway to Latin America, Miami offers a unique blend of American and Latin cultures that creates an exciting, cosmopolitan atmosphere.

The city features world-famous South Beach, the trendy Wynwood Arts District, upscale Brickell, and diverse neighborhoods like Little Havana and Coconut Grove. Miami's economy thrives on international trade, finance, tourism, and increasingly, technology startups.

While Miami offers an unparalleled lifestyle, it comes with a premium price tag. The city's real estate market is among the most expensive in Florida, and the overall cost of living reflects its status as a global destination. However, for those seeking a truly international, always-exciting urban environment, Miami delivers.`,
    population: 442241,
    median_home_price: 595000,
    median_rent: 2500,
    median_income: 44000,
    unemployment_rate: 4.2,
    cost_of_living_index: 122.4,
    walkability_score: 78,
    bike_score: 65,
    transit_score: 57,
    crime_index: 52,
    weather_summary: 'Miami has a tropical monsoon climate with hot, humid summers and warm, dry winters. Year-round warm temperatures.',
    avg_high_summer: 91,
    avg_low_winter: 60,
    annual_rainfall: 61.9,
    pros: ['World-famous beaches', 'Vibrant international culture', 'Excellent nightlife and dining', 'Gateway to Latin America', 'Year-round warm weather', 'Strong job market', 'Public transit options'],
    cons: ['Very high cost of living', 'Significant traffic congestion', 'Hurricane risk', 'High property insurance', 'Can be touristy', 'Income disparity'],
    lifestyle_tags: ['International', 'Nightlife', 'Beach', 'Urban', 'Luxury', 'Cultural'],
    best_for: ['International Business', 'Nightlife Enthusiasts', 'Beach Lovers', 'Latin Culture', 'Fashion/Entertainment'],
    hero_image_url: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1920&q=80',
    latitude: 25.7617,
    longitude: -80.1918,
    is_featured: false,
    is_published: true,
  },
  {
    name: 'St. Petersburg',
    slug: 'st-petersburg',
    county_slug: 'pinellas',
    tagline: 'The Sunshine City',
    overview: `St. Petersburg has transformed from a quiet retirement town into one of Florida's most dynamic cities, known for its thriving arts scene, craft breweries, and beautiful waterfront. Located on a peninsula between Tampa Bay and the Gulf of Mexico, St. Pete offers an urban lifestyle with easy beach access.

The city's revitalized downtown features the world-renowned Dalí Museum, numerous galleries, trendy restaurants, and a walkable layout rare in Florida. St. Pete has been recognized for its LGBTQ+ friendliness and progressive culture while maintaining its historic charm.

St. Petersburg's real estate market has grown significantly, but still offers better value than many comparable coastal cities. The city attracts young professionals, artists, retirees, and families drawn to its unique combination of culture, beaches, and community feel.`,
    population: 258308,
    median_home_price: 395000,
    median_rent: 1800,
    median_income: 54000,
    unemployment_rate: 3.3,
    cost_of_living_index: 101.2,
    walkability_score: 52,
    bike_score: 62,
    transit_score: 25,
    crime_index: 62,
    weather_summary: 'St. Petersburg holds the Guinness World Record for consecutive sunny days (768). Average of 361 days with sunshine per year.',
    avg_high_summer: 90,
    avg_low_winter: 54,
    annual_rainfall: 46.3,
    pros: ['Most sunny days in US', 'Thriving arts and culture scene', 'Walkable downtown', 'Beautiful waterfront', 'Great craft beer scene', 'LGBTQ+ friendly', 'Close to beaches'],
    cons: ['Rising real estate prices', 'Traffic to Tampa', 'Hot and humid summers', 'Limited parking downtown', 'Hurricane risk'],
    lifestyle_tags: ['Arts', 'Waterfront', 'Downtown', 'Progressive', 'Sunny', 'Walkable'],
    best_for: ['Art Lovers', 'Young Professionals', 'LGBTQ+ Community', 'Beer Enthusiasts', 'Urban Lifestyle'],
    hero_image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80',
    latitude: 27.7676,
    longitude: -82.6403,
    is_featured: false,
    is_published: true,
  },
  {
    name: 'Fort Myers',
    slug: 'fort-myers',
    county_slug: 'lee',
    tagline: 'City of Palms',
    overview: `Fort Myers is a growing Southwest Florida city that offers a more affordable alternative to nearby Naples while providing excellent beaches, outdoor recreation, and a revitalizing downtown. Known as the City of Palms for its beautiful palm-lined streets, Fort Myers blends small-town charm with modern amenities.

The city features a historic downtown with the winter estates of Thomas Edison and Henry Ford, plus easy access to beautiful beaches on Sanibel and Fort Myers Beach. The area has experienced significant growth, attracting families and retirees seeking value and quality of life.

Fort Myers offers diverse neighborhoods from waterfront communities to family-friendly suburbs. The area's economy has grown beyond tourism to include healthcare, education, and technology, providing year-round employment opportunities.`,
    population: 92245,
    median_home_price: 355000,
    median_rent: 1600,
    median_income: 48000,
    unemployment_rate: 3.6,
    cost_of_living_index: 102.0,
    walkability_score: 32,
    bike_score: 40,
    transit_score: 12,
    crime_index: 55,
    weather_summary: 'Fort Myers has a tropical climate with warm winters and hot, rainy summers. Averages 265 sunny days per year.',
    avg_high_summer: 92,
    avg_low_winter: 54,
    annual_rainfall: 55.8,
    pros: ['More affordable than Naples', 'Beautiful beaches nearby', 'Growing job market', 'Historic downtown', 'Access to islands (Sanibel, Captiva)', 'No state income tax', 'Year-round warm weather'],
    cons: ['Hot and humid summers', 'Hurricane exposure (Ian 2022)', 'Sprawling layout', 'Tourist traffic in season', 'Limited public transit'],
    lifestyle_tags: ['Growing', 'Affordable', 'Beach', 'Historic', 'Family', 'Retirement'],
    best_for: ['Retirees', 'Families', 'Beach Lovers', 'Value Seekers', 'Snowbirds'],
    hero_image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    latitude: 26.6406,
    longitude: -81.8723,
    is_featured: false,
    is_published: true,
  },
]

async function seed() {
  console.log('Starting seed...')

  // Insert counties
  console.log('Inserting counties...')
  const { data: insertedCounties, error: countiesError } = await supabase
    .from('counties')
    .upsert(counties, { onConflict: 'slug' })
    .select()

  if (countiesError) {
    console.error('Error inserting counties:', countiesError)
    return
  }
  console.log(`Inserted ${insertedCounties?.length} counties`)

  // Get county IDs
  const { data: countyData } = await supabase.from('counties').select('id, slug')
  const countyMap = new Map(countyData?.map(c => [c.slug, c.id]))

  // Insert cities with county references
  console.log('Inserting cities...')
  const citiesWithCountyIds = cities.map(city => {
    const { county_slug, ...cityData } = city
    return {
      ...cityData,
      county_id: countyMap.get(county_slug),
      faq: [
        { question: `Is ${city.name} a good place to live?`, answer: `${city.name} offers ${city.best_for.slice(0, 3).join(', ').toLowerCase()} a great quality of life with ${city.pros.slice(0, 2).join(' and ').toLowerCase()}.` },
        { question: `What is the cost of living in ${city.name}?`, answer: `${city.name}'s cost of living index is ${city.cost_of_living_index}, which is ${city.cost_of_living_index > 100 ? 'above' : 'below'} the national average. Median home prices are around $${city.median_home_price.toLocaleString()}.` },
        { question: `What are the best neighborhoods in ${city.name}?`, answer: `${city.name} offers diverse neighborhoods for different lifestyles and budgets. Contact a local expert for personalized recommendations based on your needs.` },
      ]
    }
  })

  const { data: insertedCities, error: citiesError } = await supabase
    .from('cities')
    .upsert(citiesWithCountyIds, { onConflict: 'slug' })
    .select()

  if (citiesError) {
    console.error('Error inserting cities:', citiesError)
    return
  }
  console.log(`Inserted ${insertedCities?.length} cities`)

  console.log('Seed completed successfully!')
}

seed().catch(console.error)
