import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  MapPin, Users, Home, DollarSign, GraduationCap, Briefcase, 
  Heart, Sun, Cloud, Droplets, Star, ChevronRight, Play,
  CheckCircle2, XCircle, Building2, Car, Bike, Train, Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'

// Mock data - will be replaced with Supabase queries
const tampaData = {
  id: '1',
  name: 'Tampa',
  slug: 'tampa',
  county: 'Hillsborough',
  tagline: 'Where Business Meets Beach',
  overview: `Tampa is a vibrant Gulf Coast city that perfectly blends urban sophistication with Florida\'s natural beauty. As the economic hub of Florida\'s west coast, Tampa offers a thriving job market, world-class dining, professional sports, and easy access to some of the state\'s most beautiful beaches.

The city has experienced tremendous growth in recent years, attracting young professionals, families, and retirees alike. With neighborhoods ranging from historic Ybor City to the upscale Westchase, Tampa offers something for everyone. The city\'s cultural scene includes museums, performing arts, and a growing culinary landscape that rivals much larger cities.

Tampa\'s strategic location provides quick access to Orlando\'s theme parks, Clearwater\'s pristine beaches, and St. Petersburg\'s arts district. The Tampa International Airport is consistently rated one of the best in the nation, making travel convenient for residents and visitors.`,
  
  population: 392890,
  medianHomePrice: 425000,
  medianRent: 1850,
  medianIncome: 58256,
  unemploymentRate: 3.2,
  costOfLivingIndex: 103.5,
  
  walkabilityScore: 48,
  bikeScore: 55,
  transitScore: 32,
  crimeIndex: 72,
  
  weatherSummary: 'Tampa enjoys a humid subtropical climate with hot summers and mild winters. The city averages 244 sunny days per year.',
  avgHighSummer: 91,
  avgLowWinter: 52,
  annualRainfall: 46.3,
  
  pros: [
    'No state income tax',
    'Thriving job market with Fortune 500 companies',
    'Access to world-class beaches',
    'Growing food and cultural scene',
    'Professional sports teams (Bucs, Lightning, Rays)',
    'Tampa International Airport rated #1 in US',
    'Lower cost of living than Miami',
    'Year-round outdoor activities',
  ],
  cons: [
    'Hot and humid summers',
    'Hurricane season (June-November)',
    'Traffic congestion during rush hours',
    'Limited public transportation',
    'Property insurance costs rising',
  ],
  
  lifestyleTags: ['Urban', 'Waterfront', 'Growing', 'Business Hub', 'Sports', 'Dining'],
  bestFor: ['Young Professionals', 'Families', 'Business Owners', 'Sports Fans', 'Foodies'],
  
  heroImageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80',
  galleryImages: [
    'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&q=80',
  ],
  
  faq: [
    {
      question: 'Is Tampa a good place to raise a family?',
      answer: 'Yes, Tampa is excellent for families. The city offers top-rated schools in areas like South Tampa, Westchase, and New Tampa, along with numerous parks, family-friendly attractions like Busch Gardens, and safe suburban neighborhoods.',
    },
    {
      question: 'What is the job market like in Tampa?',
      answer: 'Tampa has a diverse and growing job market. Major industries include finance, healthcare, technology, and tourism. The city is home to several Fortune 500 companies and has seen significant growth in tech startups.',
    },
    {
      question: 'How does Tampa compare to Miami?',
      answer: 'Tampa offers a lower cost of living, less traffic, and a more laid-back atmosphere than Miami. While Miami has a more vibrant nightlife, Tampa provides better value and is often preferred by families and those seeking work-life balance.',
    },
    {
      question: 'What are the best neighborhoods in Tampa?',
      answer: 'Popular neighborhoods include South Tampa (Hyde Park, Palma Ceia), Westchase, New Tampa, Davis Islands, Seminole Heights, and Water Street Tampa. Each offers different lifestyles and price points.',
    },
  ],
  
  neighborhoodHighlights: [
    { name: 'South Tampa', type: 'Urban', priceRange: '$600K-$2M+' },
    { name: 'Westchase', type: 'Suburban', priceRange: '$400K-$800K' },
    { name: 'New Tampa', type: 'Suburban', priceRange: '$350K-$700K' },
    { name: 'Davis Islands', type: 'Waterfront', priceRange: '$700K-$3M+' },
  ],
  
  topSchools: [
    { name: 'Plant High School', rating: 9, type: 'High School' },
    { name: 'Coleman Middle School', rating: 8, type: 'Middle School' },
    { name: 'Gorrie Elementary', rating: 9, type: 'Elementary' },
    { name: 'Berkeley Preparatory', rating: 10, type: 'Private K-12' },
  ],
}

const mockCities: Record<string, typeof tampaData> = {
  tampa: tampaData,
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const city = mockCities[slug]
  
  if (!city) {
    return { title: 'City Not Found' }
  }

  return {
    title: `Moving to ${city.name}, Florida - Complete Relocation Guide`,
    description: `Discover everything about living in ${city.name}, FL. Population ${city.population.toLocaleString()}, median home price $${city.medianHomePrice.toLocaleString()}, schools, neighborhoods, cost of living, and more.`,
    openGraph: {
      title: `Moving to ${city.name}, Florida`,
      description: city.tagline,
      images: [city.heroImageUrl],
    },
  }
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params
  const city = mockCities[slug]
  
  if (!city) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${city.heroImageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        
        <div className="relative z-10 w-full pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/cities" className="hover:text-white">Cities</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">{city.name}</span>
            </nav>
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {city.lifestyleTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {city.name}, Florida
            </h1>
            <p className="text-xl text-white/90 mb-6">{city.tagline}</p>
            
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{city.population.toLocaleString()} population</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{city.county} County</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                <span>${city.medianHomePrice.toLocaleString()} median home</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-muted py-6 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <QuickStat icon={Home} label="Median Home" value={`$${(city.medianHomePrice / 1000).toFixed(0)}K`} />
            <QuickStat icon={DollarSign} label="Median Rent" value={`$${city.medianRent.toLocaleString()}/mo`} />
            <QuickStat icon={Briefcase} label="Unemployment" value={`${city.unemploymentRate}%`} />
            <QuickStat icon={DollarSign} label="Cost of Living" value={`${city.costOfLivingIndex}%`} subtext="of US avg" />
            <QuickStat icon={Sun} label="Sunny Days" value="244" subtext="per year" />
            <QuickStat icon={Shield} label="Safety Index" value={city.crimeIndex.toString()} subtext="/100" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  About {city.name}
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  {city.overview.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Tabs for different sections */}
              <Tabs defaultValue="living" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="living">Cost of Living</TabsTrigger>
                  <TabsTrigger value="neighborhoods">Neighborhoods</TabsTrigger>
                  <TabsTrigger value="schools">Schools</TabsTrigger>
                  <TabsTrigger value="weather">Weather</TabsTrigger>
                </TabsList>
                
                <TabsContent value="living" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cost of Living in {city.name}</CardTitle>
                      <CardDescription>
                        {city.name}&apos;s cost of living is {city.costOfLivingIndex > 100 ? `${(city.costOfLivingIndex - 100).toFixed(1)}% higher than` : `${(100 - city.costOfLivingIndex).toFixed(1)}% lower than`} the national average.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <CostItem label="Median Home Price" value={`$${city.medianHomePrice.toLocaleString()}`} />
                        <CostItem label="Median Rent (2BR)" value={`$${city.medianRent.toLocaleString()}/mo`} />
                        <CostItem label="Median Household Income" value={`$${city.medianIncome.toLocaleString()}`} />
                        <CostItem label="State Income Tax" value="0%" highlight />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="neighborhoods" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Popular Neighborhoods in {city.name}</CardTitle>
                      <CardDescription>
                        Explore the most sought-after areas to live in {city.name}.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {city.neighborhoodHighlights.map((n) => (
                          <Link 
                            key={n.name} 
                            href={`/neighborhoods/${n.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="p-4 rounded-lg border hover:border-primary hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">{n.name}</h4>
                              <Badge variant="outline">{n.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{n.priceRange}</p>
                          </Link>
                        ))}
                      </div>
                      <Button asChild variant="outline" className="mt-6">
                        <Link href={`/cities/${city.slug}/neighborhoods`}>
                          View All Neighborhoods
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="schools" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Schools in {city.name}</CardTitle>
                      <CardDescription>
                        Highly-rated public and private schools.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {city.topSchools.map((school) => (
                          <div key={school.name} className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <GraduationCap className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{school.name}</h4>
                                <p className="text-sm text-muted-foreground">{school.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-primary">{school.rating}</span>
                              <span className="text-sm text-muted-foreground">/10</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button asChild variant="outline" className="mt-6">
                        <Link href={`/cities/${city.slug}/schools`}>
                          View All Schools
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="weather" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weather in {city.name}</CardTitle>
                      <CardDescription>{city.weatherSummary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-3 gap-6">
                        <div className="text-center p-4 rounded-lg bg-muted">
                          <Sun className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                          <p className="text-2xl font-bold">{city.avgHighSummer}&deg;F</p>
                          <p className="text-sm text-muted-foreground">Avg Summer High</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted">
                          <Cloud className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                          <p className="text-2xl font-bold">{city.avgLowWinter}&deg;F</p>
                          <p className="text-sm text-muted-foreground">Avg Winter Low</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted">
                          <Droplets className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                          <p className="text-2xl font-bold">{city.annualRainfall}&quot;</p>
                          <p className="text-sm text-muted-foreground">Annual Rainfall</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Pros and Cons */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                      Pros of Living in {city.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {city.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-red-200 bg-red-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      <XCircle className="h-5 w-5" />
                      Cons of Living in {city.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {city.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <XCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Livability Scores */}
              <Card>
                <CardHeader>
                  <CardTitle>Livability Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-4 gap-6">
                    <ScoreCircle icon={Car} label="Walk Score" value={city.walkabilityScore} />
                    <ScoreCircle icon={Bike} label="Bike Score" value={city.bikeScore} />
                    <ScoreCircle icon={Train} label="Transit Score" value={city.transitScore} />
                    <ScoreCircle icon={Shield} label="Safety Index" value={city.crimeIndex} />
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Frequently Asked Questions About {city.name}
                </h2>
                <Accordion className="w-full">
                  {city.faq.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent CTA */}
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle>Find a {city.name} Expert</CardTitle>
                  <CardDescription>
                    Connect with a local real estate agent who specializes in {city.name}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full">
                    <Link href={`/agents?city=${city.slug}`}>Find an Agent</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/consultation">Free Consultation</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Best For */}
              <Card>
                <CardHeader>
                  <CardTitle>{city.name} is Best For</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {city.bestFor.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href={`/resources/cost-of-living?city=${city.slug}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <DollarSign className="h-4 w-4" />
                    Cost of Living Calculator
                  </Link>
                  <Link href={`/resources/moving-guide`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Building2 className="h-4 w-4" />
                    Moving to Florida Guide
                  </Link>
                  <Link href={`/resources/weather`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Sun className="h-4 w-4" />
                    Florida Weather Guide
                  </Link>
                </CardContent>
              </Card>

              {/* Video Placeholder */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center relative">
                  <img
                    src={city.heroImageUrl}
                    alt={`${city.name} video thumbnail`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <Button size="lg" variant="secondary" className="relative">
                    <Play className="h-5 w-5 mr-2" />
                    Watch City Tour
                  </Button>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Take a virtual tour of {city.name} and discover what makes it special.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready to Move to {city.name}?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Let us connect you with a local expert who can guide you through every step of your relocation to {city.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/consultation">Schedule Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href={`/agents?city=${city.slug}`}>Find a {city.name} Agent</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function QuickStat({ icon: Icon, label, value, subtext }: { icon: typeof Home; label: string; value: string; subtext?: string }) {
  return (
    <div className="text-center">
      <Icon className="h-5 w-5 mx-auto text-primary mb-1" />
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{subtext || label}</p>
    </div>
  )
}

function CostItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-semibold ${highlight ? 'text-green-600' : ''}`}>{value}</span>
    </div>
  )
}

function ScoreCircle({ icon: Icon, label, value }: { icon: typeof Car; label: string; value: number }) {
  const getColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }
  
  return (
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-2">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-muted"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${(value / 100) * 226} 226`}
            className={getColor(value)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${getColor(value)}`}>{value}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
    </div>
  )
}
