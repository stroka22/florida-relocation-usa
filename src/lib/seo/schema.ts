import type { City, Neighborhood, School, Agent, Article } from '@/lib/supabase/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://floridarelocationusa.com'
const SITE_NAME = 'Florida Relocation USA'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'The most comprehensive Florida relocation platform. Explore cities, neighborhoods, schools, and connect with local experts.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-555-0123',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://facebook.com/floridarelocationusa',
      'https://instagram.com/floridarelocationusa',
      'https://youtube.com/@floridarelocationusa',
      'https://twitter.com/flrelocateusa',
    ],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateCitySchema(city: Partial<City>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'City',
    name: city.name,
    url: `${SITE_URL}/cities/${city.slug}`,
    description: city.overview?.slice(0, 300),
    image: city.hero_image_url,
    geo: city.latitude && city.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: city.latitude,
      longitude: city.longitude,
    } : undefined,
    containedInPlace: {
      '@type': 'State',
      name: 'Florida',
      containedInPlace: {
        '@type': 'Country',
        name: 'United States',
      },
    },
  }
}

export function generateNeighborhoodSchema(neighborhood: Partial<Neighborhood>, cityName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: neighborhood.name,
    url: `${SITE_URL}/neighborhoods/${neighborhood.slug}`,
    description: neighborhood.overview?.slice(0, 300),
    image: neighborhood.hero_image_url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    geo: neighborhood.latitude && neighborhood.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: neighborhood.latitude,
      longitude: neighborhood.longitude,
    } : undefined,
    amenityFeature: neighborhood.amenities?.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
    })),
  }
}

export function generateSchoolSchema(school: Partial<School>) {
  const schoolType = school.type === 'private' ? 'PrivateSchool' : 'PublicSchool'
  
  return {
    '@context': 'https://schema.org',
    '@type': schoolType,
    name: school.name,
    url: `${SITE_URL}/schools/${school.slug}`,
    description: school.overview?.slice(0, 300),
    image: school.hero_image_url,
    address: school.address ? {
      '@type': 'PostalAddress',
      streetAddress: school.address,
      addressRegion: 'FL',
      addressCountry: 'US',
    } : undefined,
    telephone: school.phone,
    aggregateRating: school.overall_rating ? {
      '@type': 'AggregateRating',
      ratingValue: school.overall_rating,
      bestRating: 10,
      worstRating: 1,
    } : undefined,
  }
}

export function generateAgentSchema(agent: Partial<Agent>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: `${agent.first_name} ${agent.last_name}`,
    url: `${SITE_URL}/agents/${agent.id}`,
    description: agent.bio?.slice(0, 300),
    image: agent.avatar_url,
    email: agent.email,
    telephone: agent.phone,
    worksFor: agent.brokerage ? {
      '@type': 'RealEstateAgency',
      name: agent.brokerage,
    } : undefined,
  }
}

export function generateArticleSchema(article: Partial<Article>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.meta_description,
    image: article.hero_image_url,
    url: `${SITE_URL}/articles/${article.slug}`,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Organization',
      name: article.author_name || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function generateLocalBusinessSchema(business: {
  name: string
  description: string
  address: string
  city: string
  phone: string
  image?: string
  priceRange?: string
  rating?: number
  reviewCount?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    image: business.image,
    telephone: business.phone,
    priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    aggregateRating: business.rating ? {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount || 1,
    } : undefined,
  }
}
