import Link from 'next/link'
import { Mail, Phone, MapPin, Globe, Video, Briefcase, MessageCircle, Camera } from 'lucide-react'

const footerLinks = {
  explore: [
    { name: 'Cities', href: '/cities' },
    { name: 'Neighborhoods', href: '/neighborhoods' },
    { name: 'Schools', href: '/schools' },
    { name: 'Counties', href: '/counties' },
  ],
  lifestyle: [
    { name: 'Retirement Communities', href: '/lifestyle/retirement' },
    { name: 'Golf Communities', href: '/lifestyle/golf' },
    { name: 'Waterfront Living', href: '/lifestyle/waterfront' },
    { name: 'Family-Friendly Areas', href: '/lifestyle/families' },
  ],
  resources: [
    { name: 'Cost of Living Calculator', href: '/resources/cost-of-living' },
    { name: 'Moving to Florida Guide', href: '/resources/moving-guide' },
    { name: 'Real Estate Market', href: '/resources/market' },
    { name: 'Weather & Hurricane Guide', href: '/resources/weather' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'For Agents', href: '/for-agents' },
    { name: 'Advertise', href: '/advertise' },
  ],
}

const popularCities = [
  'Tampa', 'Sarasota', 'Naples', 'Orlando', 'Jacksonville',
  'Miami', 'St. Petersburg', 'Fort Lauderdale', 'Clearwater', 'Venice'
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {/* Brand column */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold tracking-tight text-primary">Florida</span>
                <span className="text-xl font-light tracking-tight text-foreground">Relocation</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                Your comprehensive guide to relocating anywhere in Florida. Discover cities, neighborhoods, schools, and connect with local experts.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                  <Camera className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                  <Video className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                  <Briefcase className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Explore</h3>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lifestyle */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Lifestyle</h3>
              <ul className="space-y-3">
                {footerLinks.lifestyle.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Cities */}
        <div className="border-t py-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Popular Florida Cities</h3>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city) => (
              <Link
                key={city}
                href={`/cities/${city.toLowerCase().replace(' ', '-')}`}
                className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} FloridaRelocationUSA.com. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
