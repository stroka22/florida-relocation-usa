import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Users, Home, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export const metadata: Metadata = {
  title: 'Florida Cities Guide - Explore All Florida Cities',
  description: 'Discover the best cities to live in Florida. Compare population, home prices, cost of living, schools, and lifestyle across all Florida cities.',
}

// Mock data - will be replaced with Supabase
const allCities = [
  {
    name: 'Tampa',
    slug: 'tampa',
    county: 'Hillsborough',
    population: 392890,
    medianHomePrice: 425000,
    tags: ['Urban', 'Waterfront', 'Growing'],
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
  },
  {
    name: 'Sarasota',
    slug: 'sarasota',
    county: 'Sarasota',
    population: 57738,
    medianHomePrice: 525000,
    tags: ['Arts', 'Beaches', 'Retirement'],
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
  },
  {
    name: 'Naples',
    slug: 'naples',
    county: 'Collier',
    population: 22088,
    medianHomePrice: 875000,
    tags: ['Luxury', 'Golf', 'Beaches'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
  {
    name: 'Orlando',
    slug: 'orlando',
    county: 'Orange',
    population: 307573,
    medianHomePrice: 385000,
    tags: ['Theme Parks', 'Families', 'Jobs'],
    image: 'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=800&q=80',
  },
  {
    name: 'Jacksonville',
    slug: 'jacksonville',
    county: 'Duval',
    population: 949611,
    medianHomePrice: 315000,
    tags: ['Affordable', 'Growing', 'Military'],
    image: 'https://images.unsplash.com/photo-1619017098958-f0fce4e3a39b?w=800&q=80',
  },
  {
    name: 'Miami',
    slug: 'miami',
    county: 'Miami-Dade',
    population: 442241,
    medianHomePrice: 595000,
    tags: ['International', 'Nightlife', 'Beach'],
    image: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=800&q=80',
  },
  {
    name: 'St. Petersburg',
    slug: 'st-petersburg',
    county: 'Pinellas',
    population: 258308,
    medianHomePrice: 395000,
    tags: ['Arts', 'Waterfront', 'Downtown'],
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
  },
  {
    name: 'Fort Lauderdale',
    slug: 'fort-lauderdale',
    county: 'Broward',
    population: 182437,
    medianHomePrice: 475000,
    tags: ['Beach', 'Boating', 'Nightlife'],
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&q=80',
  },
  {
    name: 'Clearwater',
    slug: 'clearwater',
    county: 'Pinellas',
    population: 117292,
    medianHomePrice: 365000,
    tags: ['Beach', 'Tourism', 'Family'],
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
  },
  {
    name: 'Venice',
    slug: 'venice',
    county: 'Sarasota',
    population: 25463,
    medianHomePrice: 485000,
    tags: ['Retirement', 'Beach', 'Quaint'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    name: 'Fort Myers',
    slug: 'fort-myers',
    county: 'Lee',
    population: 92245,
    medianHomePrice: 355000,
    tags: ['Growing', 'Affordable', 'Beach'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    name: 'Lakeland',
    slug: 'lakeland',
    county: 'Polk',
    population: 112641,
    medianHomePrice: 295000,
    tags: ['Affordable', 'Central', 'Growing'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  },
]

export default function CitiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              {allCities.length}+ Cities
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Explore Florida Cities
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              From vibrant metros to quiet beach towns, find the Florida city that matches your lifestyle, budget, and dreams.
            </p>
            
            {/* Search */}
            <div className="flex gap-3 max-w-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search cities..." 
                  className="pl-12 h-12 bg-white text-foreground"
                />
              </div>
              <Button variant="secondary" size="lg" className="h-12">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-muted py-6 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-6 justify-center text-center">
            <div>
              <p className="text-2xl font-bold">{allCities.length}+</p>
              <p className="text-sm text-muted-foreground">Cities Covered</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div>
              <p className="text-2xl font-bold">67</p>
              <p className="text-sm text-muted-foreground">Counties</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div>
              <p className="text-2xl font-bold">22M+</p>
              <p className="text-sm text-muted-foreground">Population</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div>
              <p className="text-2xl font-bold">$0</p>
              <p className="text-sm text-muted-foreground">State Income Tax</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCities.map((city) => (
              <Link key={city.slug} href={`/cities/${city.slug}`} className="group">
                <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-xl font-bold text-white mb-1">{city.name}</h2>
                      <p className="text-sm text-white/80 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {city.county} County
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between text-sm mb-3">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{city.population.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-primary">
                        <Home className="h-4 w-4" />
                        <span>${(city.medianHomePrice / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {city.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Not Sure Which City is Right for You?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Our Florida relocation experts can help you find the perfect city based on your lifestyle, budget, and priorities.
          </p>
          <Button asChild size="lg">
            <Link href="/consultation">Get Free Guidance</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
