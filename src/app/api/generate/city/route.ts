import { NextRequest, NextResponse } from 'next/server'
import { generateCityContent, generateSocialContent, generateVideoScript, generateImagePrompts } from '@/lib/ai/content-generator'

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, county, population, medianHomePrice, generateAll = false } = body

    if (!name) {
      return NextResponse.json(
        { error: 'City name is required' },
        { status: 400 }
      )
    }

    console.log(`Generating content for city: ${name}`)

    // Generate main content
    const content = await generateCityContent({
      name,
      county,
      population,
      medianHomePrice,
    })

    let additionalContent = {}

    // If requested, generate all supporting content
    if (generateAll) {
      const [social, video, images] = await Promise.all([
        generateSocialContent('city', name, content.overview),
        generateVideoScript('city', name, content.overview),
        generateImagePrompts('city', name, content.lifestyleTags),
      ])

      additionalContent = {
        social,
        video,
        images,
      }
    }

    return NextResponse.json({
      success: true,
      city: name,
      content,
      ...additionalContent,
    })
  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
