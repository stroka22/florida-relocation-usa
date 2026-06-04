import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Eye } from 'lucide-react'
import type { City } from '@/lib/supabase/types'

async function getCities(): Promise<City[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('cities')
    .select('*')
    .order('name')
  return (data as City[]) || []
}

export default async function AdminCitiesPage() {
  const cities = await getCities()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Cities</h1>
          <p className="text-muted-foreground">{cities.length} cities in database</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/generate">
              <Plus className="h-4 w-4 mr-2" />
              AI Generate
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/cities/new">
              <Plus className="h-4 w-4 mr-2" />
              Add City
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">City</th>
                  <th className="text-left p-4 font-medium">Population</th>
                  <th className="text-left p-4 font-medium">Median Home</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cities.map((city) => (
                  <tr key={city.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <div className="font-medium">{city.name}</div>
                      <div className="text-sm text-muted-foreground">{city.tagline}</div>
                    </td>
                    <td className="p-4">
                      {city.population?.toLocaleString() || '-'}
                    </td>
                    <td className="p-4">
                      {city.median_home_price ? `$${city.median_home_price.toLocaleString()}` : '-'}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {city.is_published ? (
                          <Badge variant="default">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                        {city.is_featured && (
                          <Badge variant="outline">Featured</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/cities/${city.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/admin/cities/${city.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
