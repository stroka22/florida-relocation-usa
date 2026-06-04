'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

const exploreLinks = [
  { title: 'Cities', href: '/cities', description: 'Explore Florida cities and find your perfect match' },
  { title: 'Neighborhoods', href: '/neighborhoods', description: 'Discover master-planned communities and neighborhoods' },
  { title: 'Schools', href: '/schools', description: 'Research schools and educational opportunities' },
  { title: 'Counties', href: '/counties', description: 'Compare Florida counties by lifestyle and cost' },
]

const lifestyleLinks = [
  { title: 'Retirement Living', href: '/lifestyle/retirement', description: '55+ communities and retirement destinations' },
  { title: 'Golf Communities', href: '/lifestyle/golf', description: 'Premier golf course communities' },
  { title: 'Waterfront Living', href: '/lifestyle/waterfront', description: 'Beachfront and lakeside communities' },
  { title: 'Family-Friendly', href: '/lifestyle/families', description: 'Best areas for raising families' },
]

const resourceLinks = [
  { title: 'Cost of Living', href: '/resources/cost-of-living', description: 'Compare costs across Florida' },
  { title: 'Moving Guide', href: '/resources/moving-guide', description: 'Your complete Florida relocation checklist' },
  { title: 'Real Estate Market', href: '/resources/market', description: 'Current housing market trends' },
  { title: 'Weather Guide', href: '/resources/weather', description: 'Florida climate and hurricane info' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-primary">Florida</span>
              <span className="text-xl font-light tracking-tight text-foreground">Relocation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {exploreLinks.map((item) => (
                      <ListItem key={item.title} href={item.href} title={item.title}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Lifestyle</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {lifestyleLinks.map((item) => (
                      <ListItem key={item.title} href={item.href} title={item.title}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {resourceLinks.map((item) => (
                      <ListItem key={item.title} href={item.href} title={item.title}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/agents" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Find an Agent
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </Button>

            <Button asChild className="hidden sm:flex">
              <Link href="/consultation">Free Consultation</Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Explore</h3>
                    {exploreLinks.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block px-2 py-2 text-lg hover:text-primary transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Lifestyle</h3>
                    {lifestyleLinks.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block px-2 py-2 text-lg hover:text-primary transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Resources</h3>
                    {resourceLinks.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block px-2 py-2 text-lg hover:text-primary transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                  <div className="pt-4 space-y-3">
                    <Button asChild className="w-full">
                      <Link href="/consultation">Free Consultation</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/agents">Find an Agent</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function ListItem({
  className,
  title,
  children,
  href,
}: { className?: string; title: string; children: React.ReactNode; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  )
}
