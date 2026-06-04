import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Home, GraduationCap, Users, FileText, TrendingUp } from 'lucide-react'

async function getStats() {
  const supabase = await createClient()
  
  const [cities, neighborhoods, schools, agents, leads] = await Promise.all([
    supabase.from('cities').select('id', { count: 'exact', head: true }),
    supabase.from('neighborhoods').select('id', { count: 'exact', head: true }),
    supabase.from('schools').select('id', { count: 'exact', head: true }),
    supabase.from('agents').select('id', { count: 'exact', head: true }),
    supabase.from('leads').select('id', { count: 'exact', head: true }),
  ])

  return {
    cities: cities.count || 0,
    neighborhoods: neighborhoods.count || 0,
    schools: schools.count || 0,
    agents: agents.count || 0,
    leads: leads.count || 0,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { title: 'Cities', value: stats.cities, icon: MapPin, href: '/admin/cities', color: 'text-blue-600' },
    { title: 'Neighborhoods', value: stats.neighborhoods, icon: Home, href: '/admin/neighborhoods', color: 'text-green-600' },
    { title: 'Schools', value: stats.schools, icon: GraduationCap, href: '/admin/schools', color: 'text-purple-600' },
    { title: 'Agents', value: stats.agents, icon: Users, href: '/admin/agents', color: 'text-orange-600' },
    { title: 'Leads', value: stats.leads, icon: FileText, href: '/admin/leads', color: 'text-red-600' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to FloridaRelocationUSA admin</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/admin/generate" className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <div className="font-medium">Generate City Content</div>
              <div className="text-sm text-muted-foreground">Use AI to create content for new cities</div>
            </a>
            <a href="/admin/cities" className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <div className="font-medium">Add New City</div>
              <div className="text-sm text-muted-foreground">Manually add a city to the database</div>
            </a>
            <a href="/admin/neighborhoods" className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <div className="font-medium">Add Neighborhood</div>
              <div className="text-sm text-muted-foreground">Add master-planned communities</div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">No leads yet. They will appear here once visitors submit forms.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
