import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Eye, MapPin } from 'lucide-react'

async function getNeighborhoods() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('neighborhoods')
    .select(`
      *,
      city:cities(name)
    `)
    .order('name')
  return data || []
}

export default async function AdminNeighborhoodsPage() {
  const neighborhoods = await getNeighborhoods()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Neighborhoods</h1>
          <p className="text-muted-foreground">{neighborhoods.length} neighborhoods in database</p>
        </div>
        <Button asChild>
          <Link href="/admin/neighborhoods/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Neighborhood
          </Link>
        </Button>
      </div>

      {neighborhoods.length === 0 ? (
        <Card className="p-12 text-center">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="text-lg font-medium mb-2">No neighborhoods yet</h3>
          <p className="text-muted-foreground mb-4">Add your first neighborhood to get started</p>
          <Button asChild>
            <Link href="/admin/neighborhoods/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Neighborhood
            </Link>
          </Button>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Neighborhood</th>
                    <th className="text-left p-4 font-medium">City</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Price Range</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {neighborhoods.map((n: any) => (
                    <tr key={n.id} className="hover:bg-muted/30">
                      <td className="p-4">
                        <div className="font-medium">{n.name}</div>
                        <div className="text-sm text-muted-foreground">{n.tagline}</div>
                      </td>
                      <td className="p-4">{n.city?.name || '-'}</td>
                      <td className="p-4">
                        <Badge variant="outline">{n.type || '-'}</Badge>
                      </td>
                      <td className="p-4">
                        {n.min_home_price && n.max_home_price 
                          ? `$${(n.min_home_price/1000).toFixed(0)}K - $${(n.max_home_price/1000).toFixed(0)}K`
                          : '-'
                        }
                      </td>
                      <td className="p-4">
                        {n.is_published ? (
                          <Badge variant="default">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button asChild size="sm" variant="ghost">
                            <Link href={`/neighborhoods/${n.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button asChild size="sm" variant="ghost">
                            <Link href={`/admin/neighborhoods/${n.id}`}>
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
      )}
    </div>
  )
}
