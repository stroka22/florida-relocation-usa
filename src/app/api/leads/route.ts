import { NextRequest, NextResponse } from 'next/server'
// import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { firstName, lastName, email, sourceType, sourcePage } = body
    
    if (!firstName || !lastName || !email || !sourceType || !sourcePage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get IP and user agent for tracking
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // For now, just log the lead (Supabase integration will be added when credentials are set)
    console.log('New Lead:', {
      ...body,
      ip_address: ip,
      user_agent: userAgent,
      created_at: new Date().toISOString(),
    })

    // TODO: Uncomment when Supabase is configured
    // const supabase = await createClient()
    // const { data, error } = await supabase.from('leads').insert({
    //   first_name: firstName,
    //   last_name: lastName,
    //   email,
    //   phone: body.phone || null,
    //   message: body.message || null,
    //   moving_timeline: body.movingTimeline || null,
    //   budget_range: body.budgetRange || null,
    //   interests: body.interests || null,
    //   preferred_areas: body.preferredAreas || null,
    //   source_type: sourceType,
    //   source_page: sourcePage,
    //   ip_address: ip,
    //   user_agent: userAgent,
    //   status: 'new',
    // }).select().single()
    //
    // if (error) {
    //   console.error('Database error:', error)
    //   return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    // }

    return NextResponse.json({ success: true, message: 'Lead received' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
