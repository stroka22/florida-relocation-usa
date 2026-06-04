import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://floridarelocationusa.com'

// Static pages
const staticPages = [
  '',
  '/cities',
  '/neighborhoods',
  '/schools',
  '/counties',
  '/agents',
  '/consultation',
  '/lifestyle/retirement',
  '/lifestyle/golf',
  '/lifestyle/waterfront',
  '/lifestyle/families',
  '/resources/cost-of-living',
  '/resources/moving-guide',
  '/resources/market',
  '/resources/weather',
  '/about',
  '/contact',
  '/for-agents',
  '/advertise',
  '/privacy',
  '/terms',
]

// Mock data - will be replaced with Supabase queries
const mockCities = [
  'tampa',
  'sarasota',
  'naples',
  'orlando',
  'jacksonville',
  'miami',
  'st-petersburg',
  'clearwater',
  'fort-lauderdale',
  'venice',
  'lakeland',
  'gainesville',
  'tallahassee',
  'pensacola',
  'fort-myers',
]

const mockNeighborhoods = [
  'lakewood-ranch',
  'nocatee',
  'fishhawk-ranch',
  'wellen-park',
  'starkey-ranch',
  'celebration',
  'the-villages',
  'ave-maria',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: Fetch from Supabase when configured
  // const supabase = await createClient()
  // const { data: cities } = await supabase.from('cities').select('slug, updated_at').eq('is_published', true)
  // const { data: neighborhoods } = await supabase.from('neighborhoods').select('slug, updated_at').eq('is_published', true)
  // const { data: schools } = await supabase.from('schools').select('slug, updated_at').eq('is_published', true)
  // const { data: articles } = await supabase.from('articles').select('slug, updated_at').eq('is_published', true)

  const sitemap: MetadataRoute.Sitemap = []

  // Static pages
  staticPages.forEach((page) => {
    sitemap.push({
      url: `${SITE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1 : 0.8,
    })
  })

  // City pages
  mockCities.forEach((city) => {
    sitemap.push({
      url: `${SITE_URL}/cities/${city}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })

  // Neighborhood pages
  mockNeighborhoods.forEach((neighborhood) => {
    sitemap.push({
      url: `${SITE_URL}/neighborhoods/${neighborhood}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  return sitemap
}
