import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { MapPin, Home, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export const metadata: Metadata = {
  title: 'Florida Neighborhoods & Communities - Master-Planned, Golf, Retirement',
  description: 'Explore Florida neighborhoods and master-planned communities. Find retirement communities, golf communities, waterfront living, and family-friendly neighborhoods.',
}

async function getNeighborhoods() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('neighborhoods')
    .select(`
      *,
      city:cities(name, slug)
    `)
    .eq('is_published', true)
    .order('name')
  return data || []
}

const typeLabels: Record<string, string> = {
  master_planned: 'Master-Planned',
  traditional: 'Traditional',
  retirement: '55+ Retirement',
  golf: 'Golf Community',
  waterfront: 'Waterfront',
  luxury: 'Luxury',
  historic: 'Historic',
  suburban: 'Suburban',
}

export default async function NeighborhoodsPage() {
  const neighborhoods = await getNeighborhoods()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-white/15 text-white border-white/20">
              {neighborhoods.length}+ Communities
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Florida Neighborhoods
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Discover master-planned communities, retirement villages, golf communities, and family-friendly neighborhoods across Florida.
            </p>
            
            <div className="flex gap-3 max-w-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search neighborhoods..." 
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

      {/* Categories */}
      <section className="bg-muted py-6 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="cursor-pointer">All</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Master-Planned</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">55+ Retirement</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Golf</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Waterfront</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Luxury</Badge>
          </div>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {neighborhoods.length === 0 ? (
            <div className="text-center py-16">
              <Home className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We&apos;re adding Florida&apos;s best neighborhoods. Check back soon or explore our cities in the meantime.
              </p>
              <Button asChild className="mt-6">
                <Link href="/cities">Explore Cities</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhoods.map((n: any) => (
                <Link key={n.id} href={`/neighborhoods/${n.slug}`} className="group">
                  <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                      {n.hero_image_url ? (
                        <img
                          src={n.hero_image_url}
                          alt={n.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Home className="h-12 w-12 text-muted-foreground/30" />
                        </div>
                      )}
                      <Badge className="absolute top-4 left-4">
                        {typeLabels[n.type] || n.type}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {n.name}
                        </h2>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {n.city?.name || 'Florida'}
                        </p>
                      </div>
                      
                      {n.tagline && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{n.tagline}</p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Homes</span>
                          <p className="font-semibold">{n.total_homes?.toLocaleString() || '-'}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price Range</span>
                          <p className="font-semibold text-primary">
                            {n.min_home_price && n.max_home_price 
                              ? `$${(n.min_home_price/1000).toFixed(0)}K - $${(n.max_home_price/1000).toFixed(0)}K`
                              : '-'
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Need Help Finding the Right Community?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Our Florida relocation experts can help match you with the perfect neighborhood based on your lifestyle, budget, and priorities.
          </p>
          <Button asChild size="lg">
            <Link href="/consultation">Get Free Guidance</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
