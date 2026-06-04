import { Metadata } from 'next'
import { CheckCircle2, Phone, Mail, Clock, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LeadForm } from '@/components/forms/lead-form'

export const metadata: Metadata = {
  title: 'Free Relocation Consultation - Florida Relocation USA',
  description: 'Schedule a free consultation with a Florida relocation expert. Get personalized guidance on cities, neighborhoods, schools, and real estate.',
}

const benefits = [
  'Personalized city and neighborhood recommendations',
  'School district analysis for families',
  'Cost of living comparison',
  'Connection with top local real estate agents',
  'Insider tips on the best communities',
  'No obligation, completely free',
]

const stats = [
  { icon: Users, value: '10,000+', label: 'Families Helped' },
  { icon: Clock, value: '24-48 hrs', label: 'Response Time' },
  { icon: Phone, value: '100%', label: 'Free Service' },
]

export default function ConsultationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Free Service
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Your Florida Relocation Starts Here
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Get personalized guidance from Florida experts who will help you find the perfect city, neighborhood, and home for your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted py-8 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <stat.icon className="h-6 w-6 text-primary mb-2" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                What You Will Get
              </h2>
              <p className="text-muted-foreground mb-8">
                Our Florida relocation experts have helped thousands of families find their perfect place in the Sunshine State. Here&apos;s what we&apos;ll help you with:
              </p>
              
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Submit Your Information</h4>
                      <p className="text-sm text-muted-foreground">Tell us about your relocation goals and timeline.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Speak With an Expert</h4>
                      <p className="text-sm text-muted-foreground">We&apos;ll call you within 24-48 hours to discuss your needs.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Get Matched</h4>
                      <p className="text-sm text-muted-foreground">We&apos;ll connect you with the perfect local agent for your area.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Request Your Free Consultation</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll be in touch within 24-48 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LeadForm
                    sourceType="consultation"
                    sourcePage="/consultation"
                    showTimeline={true}
                    showBudget={true}
                    showInterests={true}
                    showMessage={true}
                    submitText="Request Consultation"
                  />
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Prefer to talk now?
                </p>
                <div className="flex items-center justify-center gap-6">
                  <a href="tel:1-800-555-0123" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                    <Phone className="h-4 w-4" />
                    1-800-555-0123
                  </a>
                  <a href="mailto:hello@floridarelocationusa.com" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                    <Mail className="h-4 w-4" />
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            Trusted by Thousands of Families
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The team helped us find the perfect neighborhood in Tampa for our family. We couldn't be happier!",
                name: 'Sarah M.',
                location: 'Moved from New York',
              },
              {
                quote: "As retirees, we had specific needs. They understood exactly what we were looking for in Naples.",
                name: 'Robert & Linda K.',
                location: 'Moved from Michigan',
              },
              {
                quote: "The local agent they connected us with knew Sarasota inside and out. Smooth process from start to finish.",
                name: 'James T.',
                location: 'Moved from California',
              },
            ].map((testimonial, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
