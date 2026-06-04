import Link from 'next/link'
import { ArrowRight, MapPin, GraduationCap, Home, Users, Sun, DollarSign, Building, Heart, Star, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const featuredCities = [
  {
    name: 'Tampa',
    slug: 'tampa',
    tagline: 'Where Business Meets Beach',
    population: '392,890',
    medianPrice: '$425,000',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    tags: ['Urban', 'Waterfront', 'Growing'],
  },
  {
    name: 'Sarasota',
    slug: 'sarasota',
    tagline: 'Cultural Coast Living',
    population: '57,738',
    medianPrice: '$525,000',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    tags: ['Arts', 'Beaches', 'Retirement'],
  },
  {
    name: 'Naples',
    slug: 'naples',
    tagline: 'Paradise on the Gulf',
    population: '22,088',
    medianPrice: '$875,000',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tags: ['Luxury', 'Golf', 'Beaches'],
  },
  {
    name: 'Orlando',
    slug: 'orlando',
    tagline: 'The City Beautiful',
    population: '307,573',
    medianPrice: '$385,000',
    image: 'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=800&q=80',
    tags: ['Theme Parks', 'Families', 'Jobs'],
  },
]

const featuredNeighborhoods = [
  {
    name: 'Lakewood Ranch',
    city: 'Sarasota',
    slug: 'lakewood-ranch',
    type: 'Master-Planned',
    homes: '35,000+',
    priceRange: '$400K - $2M+',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    name: 'Nocatee',
    city: 'Jacksonville',
    slug: 'nocatee',
    type: 'Master-Planned',
    homes: '20,000+',
    priceRange: '$350K - $1.5M',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    name: 'Fishhawk Ranch',
    city: 'Tampa',
    slug: 'fishhawk-ranch',
    type: 'Master-Planned',
    homes: '8,500+',
    priceRange: '$400K - $1M',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  },
]

const lifestyleCategories = [
  {
    title: 'Retirement Living',
    description: 'Discover 55+ communities with world-class amenities',
    icon: Heart,
    href: '/lifestyle/retirement',
    count: '200+',
  },
  {
    title: 'Golf Communities',
    description: 'Premier communities with championship courses',
    icon: Star,
    href: '/lifestyle/golf',
    count: '150+',
  },
  {
    title: 'Waterfront Living',
    description: 'Beach, river, and lakefront properties',
    icon: Sun,
    href: '/lifestyle/waterfront',
    count: '100+',
  },
  {
    title: 'Family-Friendly',
    description: 'Top-rated schools and family amenities',
    icon: Users,
    href: '/lifestyle/families',
    count: '300+',
  },
]

const stats = [
  { label: 'Cities Covered', value: '400+' },
  { label: 'Neighborhoods', value: '2,500+' },
  { label: 'Schools Ranked', value: '4,000+' },
  { label: 'Local Experts', value: '500+' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1605106702734-205df224ecce?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            The #1 Florida Relocation Resource
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Find Your Perfect Place
            <span className="block text-florida-gold">in Florida</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Explore cities, neighborhoods, and schools. Compare costs, discover lifestyle communities, and connect with local experts who know Florida best.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-2xl">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search cities, neighborhoods, or zip codes..." 
                  className="pl-12 h-12 border-0 bg-transparent text-lg focus-visible:ring-0"
                />
              </div>
              <Button size="lg" className="h-12 px-8 text-base">
                Explore
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/cities/tampa" className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1">
              <ChevronRight className="h-4 w-4" /> Tampa
            </Link>
            <Link href="/cities/sarasota" className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1">
              <ChevronRight className="h-4 w-4" /> Sarasota
            </Link>
            <Link href="/cities/naples" className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1">
              <ChevronRight className="h-4 w-4" /> Naples
            </Link>
            <Link href="/cities/orlando" className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1">
              <ChevronRight className="h-4 w-4" /> Orlando
            </Link>
            <Link href="/lifestyle/retirement" className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1">
              <ChevronRight className="h-4 w-4" /> 55+ Communities
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Featured Cities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Popular Florida Destinations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From vibrant urban centers to tranquil coastal towns, discover the Florida cities that match your lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCities.map((city) => (
              <Link key={city.slug} href={`/cities/${city.slug}`} className="group">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                      <p className="text-sm text-white/80">{city.tagline}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Population</span>
                        <p className="font-semibold">{city.population}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-muted-foreground">Median Home</span>
                        <p className="font-semibold text-primary">{city.medianPrice}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
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

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/cities">
                Explore All Cities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lifestyle Categories */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Lifestyle</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Find Your Florida Lifestyle
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you are retiring, raising a family, or seeking adventure, Florida has the perfect community for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifestyleCategories.map((category) => (
              <Link key={category.title} href={category.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{category.count}</span>
                      <span className="text-sm text-muted-foreground">communities</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Neighborhoods */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Featured Communities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Top-Rated Neighborhoods
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore Florida&apos;s most sought-after master-planned communities and neighborhoods.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredNeighborhoods.map((neighborhood) => (
              <Link key={neighborhood.slug} href={`/neighborhoods/${neighborhood.slug}`} className="group">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={neighborhood.image}
                      alt={neighborhood.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4">{neighborhood.type}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {neighborhood.name}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {neighborhood.city}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Homes</span>
                        <p className="font-semibold">{neighborhood.homes}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price Range</span>
                        <p className="font-semibold text-primary">{neighborhood.priceRange}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/neighborhoods">
                Explore All Neighborhoods
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Florida Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">Why Florida?</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                The Sunshine State Awaits
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Florida offers more than beautiful beaches. With no state income tax, a booming job market, world-class healthcare, and year-round sunshine, it&apos;s no wonder millions choose to call Florida home.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">No State Income Tax</h3>
                    <p className="text-sm text-primary-foreground/80">Keep more of what you earn</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <Sun className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Year-Round Sunshine</h3>
                    <p className="text-sm text-primary-foreground/80">Average 230+ sunny days</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Growing Economy</h3>
                    <p className="text-sm text-primary-foreground/80">Top 15 global economies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <Home className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Homestead Exemption</h3>
                    <p className="text-sm text-primary-foreground/80">Save on property taxes</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/resources/moving-guide">
                    Read Our Moving Guide
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=800&q=80"
                alt="Florida Lifestyle"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-foreground p-6 rounded-xl shadow-xl max-w-xs">
                <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
                <p className="text-sm text-muted-foreground">
                  People move to Florida every day, making it the fastest-growing state in the US.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-muted rounded-3xl p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Ready to Start Your Florida Journey?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              Connect with a local Florida expert who can guide you through every step of your relocation. Free, no-obligation consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/consultation">
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/agents">
                  Find a Local Agent
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
