'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Loader2, Sparkles, Check, Copy } from 'lucide-react'

const floridaCities = [
  { name: 'Pensacola', county: 'Escambia', population: 54312 },
  { name: 'Tallahassee', county: 'Leon', population: 196169 },
  { name: 'Gainesville', county: 'Alachua', population: 141085 },
  { name: 'Ocala', county: 'Marion', population: 63591 },
  { name: 'Daytona Beach', county: 'Volusia', population: 72647 },
  { name: 'Palm Bay', county: 'Brevard', population: 119760 },
  { name: 'Melbourne', county: 'Brevard', population: 86220 },
  { name: 'Port St. Lucie', county: 'St. Lucie', population: 231790 },
  { name: 'West Palm Beach', county: 'Palm Beach', population: 117415 },
  { name: 'Boca Raton', county: 'Palm Beach', population: 99805 },
  { name: 'Delray Beach', county: 'Palm Beach', population: 69451 },
  { name: 'Coral Springs', county: 'Broward', population: 134394 },
  { name: 'Hollywood', county: 'Broward', population: 153627 },
  { name: 'Pembroke Pines', county: 'Broward', population: 171178 },
  { name: 'Cape Coral', county: 'Lee', population: 204510 },
  { name: 'Bonita Springs', county: 'Lee', population: 57755 },
  { name: 'Bradenton', county: 'Manatee', population: 59439 },
  { name: 'Winter Haven', county: 'Polk', population: 51420 },
  { name: 'Kissimmee', county: 'Osceola', population: 79226 },
  { name: 'Clermont', county: 'Lake', population: 43021 },
  { name: 'The Villages', county: 'Sumter', population: 79077 },
  { name: 'Wesley Chapel', county: 'Pasco', population: 68695 },
  { name: 'Land O Lakes', county: 'Pasco', population: 41108 },
  { name: 'New Port Richey', county: 'Pasco', population: 17422 },
  { name: 'Spring Hill', county: 'Hernando', population: 115211 },
]

export default function GeneratePage() {
  const [cityName, setCityName] = useState('')
  const [county, setCounty] = useState('')
  const [population, setPopulation] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!cityName) return
    
    setIsGenerating(true)
    setError('')
    setGeneratedContent(null)

    try {
      const response = await fetch('/api/generate/city', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cityName,
          county: county || undefined,
          population: population ? parseInt(population) : undefined,
          generateAll: true,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      setGeneratedContent(data)
    } catch (err) {
      setError('Failed to generate content. Make sure OpenAI API key is configured.')
    } finally {
      setIsGenerating(false)
    }
  }

  const selectCity = (city: typeof floridaCities[0]) => {
    setCityName(city.name)
    setCounty(city.county)
    setPopulation(city.population.toString())
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          AI Content Generator
        </h1>
        <p className="text-muted-foreground">Generate city content, social posts, and video scripts with AI</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate City Content</CardTitle>
              <CardDescription>Enter city details to generate content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>City Name *</Label>
                <Input 
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  placeholder="e.g., Pensacola"
                />
              </div>
              <div>
                <Label>County</Label>
                <Input 
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  placeholder="e.g., Escambia"
                />
              </div>
              <div>
                <Label>Population</Label>
                <Input 
                  type="number"
                  value={population}
                  onChange={(e) => setPopulation(e.target.value)}
                  placeholder="e.g., 54312"
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleGenerate}
                disabled={!cityName || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Select</CardTitle>
              <CardDescription>Cities not yet in database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                {floridaCities.map((city) => (
                  <Badge 
                    key={city.name}
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => selectCity(city)}
                  >
                    {city.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Content */}
        <div className="lg:col-span-2">
          {generatedContent ? (
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      Generated: {generatedContent.city}
                    </CardTitle>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(generatedContent, null, 2))}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Overview</Label>
                    <p className="text-sm text-muted-foreground mt-1">{generatedContent.content?.overview}</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Pros</Label>
                      <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                        {generatedContent.content?.pros?.map((pro: string, i: number) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Cons</Label>
                      <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                        {generatedContent.content?.cons?.map((con: string, i: number) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Best For</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {generatedContent.content?.bestFor?.map((tag: string, i: number) => (
                        <Badge key={i} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Lifestyle Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {generatedContent.content?.lifestyleTags?.map((tag: string, i: number) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Meta Title</Label>
                    <p className="text-sm text-muted-foreground mt-1">{generatedContent.content?.metaTitle}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Meta Description</Label>
                    <p className="text-sm text-muted-foreground mt-1">{generatedContent.content?.metaDescription}</p>
                  </div>
                </CardContent>
              </Card>

              {generatedContent.social && (
                <Card>
                  <CardHeader>
                    <CardTitle>Social Media Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Instagram</Label>
                      <Textarea 
                        value={generatedContent.social.instagramCaption} 
                        readOnly 
                        className="mt-1 text-sm"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Facebook</Label>
                      <Textarea 
                        value={generatedContent.social.facebookPost} 
                        readOnly 
                        className="mt-1 text-sm"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {generatedContent.video && (
                <Card>
                  <CardHeader>
                    <CardTitle>Video Script</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Short Form (60s)</Label>
                      <Textarea 
                        value={generatedContent.video.shortScript} 
                        readOnly 
                        className="mt-1 text-sm"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Voiceover</Label>
                      <Textarea 
                        value={generatedContent.video.voiceoverText} 
                        readOnly 
                        className="mt-1 text-sm"
                        rows={6}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Select a city and click Generate to create content</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
