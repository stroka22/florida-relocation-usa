import { createClient } from '@/lib/supabase/server'
import type { City } from '@/lib/supabase/types'

export async function getCities(options?: { featured?: boolean; limit?: number }) {
  const supabase = await createClient()
  
  let query = supabase
    .from('cities')
    .select('*')
    .eq('is_published', true)
    .order('population', { ascending: false })

  if (options?.featured) {
    query = query.eq('is_featured', true)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching cities:', error)
    return []
  }

  return data as City[]
}

export async function getCityBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('cities')
    .select(`
      *,
      county:counties(name, slug)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching city:', error)
    return null
  }

  return data
}

export async function getAllCitySlugs(): Promise<string[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('cities')
    .select('slug')
    .eq('is_published', true)

  if (error) {
    console.error('Error fetching city slugs:', error)
    return []
  }

  return (data as { slug: string }[]).map(c => c.slug)
}
