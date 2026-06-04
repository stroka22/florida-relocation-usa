import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      name,
      slug,
      county_id,
      tagline,
      overview,
      population,
      median_home_price,
      median_rent,
      median_income,
      unemployment_rate,
      cost_of_living_index,
      walkability_score,
      bike_score,
      transit_score,
      crime_index,
      weather_summary,
      avg_high_summer,
      avg_low_winter,
      annual_rainfall,
      pros,
      cons,
      lifestyle_tags,
      best_for,
      faq,
      hero_image_url,
      latitude,
      longitude,
      meta_title,
      meta_description,
      is_featured,
      is_published,
    } = body

    const citySlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const { data, error } = await supabase
      .from('cities')
      .upsert({
        name,
        slug: citySlug,
        county_id,
        tagline,
        overview,
        population,
        median_home_price,
        median_rent,
        median_income,
        unemployment_rate,
        cost_of_living_index,
        walkability_score,
        bike_score,
        transit_score,
        crime_index,
        weather_summary,
        avg_high_summer,
        avg_low_winter,
        annual_rainfall,
        pros,
        cons,
        lifestyle_tags,
        best_for,
        faq,
        hero_image_url,
        latitude,
        longitude,
        meta_title,
        meta_description,
        is_featured: is_featured || false,
        is_published: is_published || false,
      }, { onConflict: 'slug' })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, city: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .order('name')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ cities: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
