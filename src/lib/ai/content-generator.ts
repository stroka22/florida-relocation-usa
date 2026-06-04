import OpenAI from 'openai'

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured')
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

export interface CityData {
  name: string
  county?: string
  population?: number
  medianHomePrice?: number
}

export interface NeighborhoodData {
  name: string
  city: string
  type?: string
  medianHomePrice?: number
  amenities?: string[]
}

export interface GeneratedContent {
  overview: string
  pros: string[]
  cons: string[]
  bestFor: string[]
  faq: Array<{ question: string; answer: string }>
  metaTitle: string
  metaDescription: string
  lifestyleTags: string[]
}

export async function generateCityContent(city: CityData): Promise<GeneratedContent> {
  const prompt = `You are an expert on Florida real estate and relocation. Generate comprehensive, SEO-optimized content for ${city.name}, Florida.

City Info:
- Name: ${city.name}
- County: ${city.county || 'Unknown'}
- Population: ${city.population?.toLocaleString() || 'Unknown'}
- Median Home Price: ${city.medianHomePrice ? `$${city.medianHomePrice.toLocaleString()}` : 'Unknown'}

Generate the following in JSON format:
{
  "overview": "A 3-4 paragraph comprehensive overview of the city, covering lifestyle, economy, culture, and what makes it unique. Write in an engaging, informative tone for people considering relocation.",
  "pros": ["Array of 6-8 specific advantages of living in this city"],
  "cons": ["Array of 4-5 honest challenges or considerations"],
  "bestFor": ["Array of 4-6 types of people/lifestyles this city suits best"],
  "faq": [
    {"question": "Question 1", "answer": "Detailed answer 1"},
    {"question": "Question 2", "answer": "Detailed answer 2"},
    {"question": "Question 3", "answer": "Detailed answer 3"},
    {"question": "Question 4", "answer": "Detailed answer 4"}
  ],
  "metaTitle": "SEO-optimized title under 60 characters",
  "metaDescription": "Compelling meta description under 160 characters",
  "lifestyleTags": ["Array of 5-8 relevant lifestyle tags like Urban, Waterfront, Family-Friendly, etc."]
}

Important:
- Be accurate and honest about the city
- Focus on relocation-relevant information
- Include specific details when possible
- Write for someone considering moving to Florida
- Ensure all content is unique and engaging`

  const openai = getOpenAIClient()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  const content = JSON.parse(response.choices[0].message.content || '{}')
  return content as GeneratedContent
}

export async function generateNeighborhoodContent(neighborhood: NeighborhoodData): Promise<GeneratedContent> {
  const prompt = `You are an expert on Florida real estate and master-planned communities. Generate comprehensive, SEO-optimized content for ${neighborhood.name} in ${neighborhood.city}, Florida.

Neighborhood Info:
- Name: ${neighborhood.name}
- City: ${neighborhood.city}
- Type: ${neighborhood.type || 'Unknown'}
- Median Home Price: ${neighborhood.medianHomePrice ? `$${neighborhood.medianHomePrice.toLocaleString()}` : 'Unknown'}
- Key Amenities: ${neighborhood.amenities?.join(', ') || 'Unknown'}

Generate the following in JSON format:
{
  "overview": "A 2-3 paragraph overview of the neighborhood/community, covering lifestyle, amenities, housing, and what makes it special.",
  "pros": ["Array of 5-7 specific advantages of living in this community"],
  "cons": ["Array of 3-4 honest considerations"],
  "bestFor": ["Array of 4-5 types of people/lifestyles this community suits"],
  "faq": [
    {"question": "Question about the community", "answer": "Detailed answer"},
    {"question": "Question about amenities", "answer": "Detailed answer"},
    {"question": "Question about schools", "answer": "Detailed answer"}
  ],
  "metaTitle": "SEO-optimized title under 60 characters",
  "metaDescription": "Compelling meta description under 160 characters",
  "lifestyleTags": ["Array of 4-6 relevant tags"]
}

Focus on community features, lifestyle, and what residents love about living there.`

  const openai = getOpenAIClient()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  const content = JSON.parse(response.choices[0].message.content || '{}')
  return content as GeneratedContent
}

export async function generateVideoScript(
  entityType: 'city' | 'neighborhood',
  entityName: string,
  overview: string
): Promise<{
  shortScript: string
  longScript: string
  sceneOutline: string[]
  voiceoverText: string
}> {
  const prompt = `Create video scripts for a ${entityType} tour video about ${entityName}, Florida.

Overview context:
${overview}

Generate in JSON format:
{
  "shortScript": "60-second social media video script (for Instagram/TikTok/YouTube Shorts)",
  "longScript": "5-7 minute YouTube video script with intro, main content sections, and call-to-action",
  "sceneOutline": ["Array of 8-12 scene descriptions for B-roll footage"],
  "voiceoverText": "Clean voiceover narration text without stage directions"
}

Make the content engaging, informative, and inspiring for people considering relocation.`

  const openai = getOpenAIClient()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}

export async function generateSocialContent(
  entityType: 'city' | 'neighborhood',
  entityName: string,
  overview: string
): Promise<{
  facebookPost: string
  instagramCaption: string
  linkedinPost: string
  twitterThread: string[]
  pinterestDescription: string
}> {
  const prompt = `Create social media content for ${entityName}, Florida (${entityType}).

Context:
${overview.slice(0, 500)}

Generate in JSON format:
{
  "facebookPost": "Engaging Facebook post with emojis (300-500 characters)",
  "instagramCaption": "Instagram caption with hashtags (up to 2200 characters)",
  "linkedinPost": "Professional LinkedIn post about relocating (200-400 characters)",
  "twitterThread": ["Array of 3-5 tweets that form a thread (each under 280 chars)"],
  "pinterestDescription": "Pinterest pin description (200-300 characters)"
}

Include relevant hashtags, calls-to-action, and make content shareable.`

  const openai = getOpenAIClient()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}

export async function generateImagePrompts(
  entityType: 'city' | 'neighborhood',
  entityName: string,
  tags: string[]
): Promise<{
  heroPrompt: string
  featuredPrompts: string[]
  socialPrompts: string[]
}> {
  const prompt = `Create AI image generation prompts for ${entityName}, Florida (${entityType}).

Lifestyle tags: ${tags.join(', ')}

Generate in JSON format:
{
  "heroPrompt": "Detailed prompt for a hero/banner image - photorealistic, stunning Florida scenery related to this location",
  "featuredPrompts": ["Array of 4-6 prompts for featured images showing different aspects of life in this area"],
  "socialPrompts": ["Array of 3-4 prompts optimized for social media sharing"]
}

Prompts should be detailed, specify photorealistic style, beautiful lighting, and capture the essence of Florida living.`

  const openai = getOpenAIClient()
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}
