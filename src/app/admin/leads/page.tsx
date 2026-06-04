import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Mail, Phone, Calendar } from 'lucide-react'

async function getLeads() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)
  return data || []
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  nurturing: 'bg-purple-100 text-purple-800',
  converted: 'bg-emerald-100 text-emerald-800',
  lost: 'bg-gray-100 text-gray-800',
}

export default async function AdminLeadsPage() {
  const leads = await getLeads()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">{leads.length} leads captured</p>
        </div>
      </div>

      {leads.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
          <h3 className="text-lg font-medium mb-2">No leads yet</h3>
          <p className="text-muted-foreground">Leads will appear here when visitors submit forms on your site</p>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Contact</th>
                    <th className="text-left p-4 font-medium">Source</th>
                    <th className="text-left p-4 font-medium">Timeline</th>
                    <th className="text-left p-4 font-medium">Budget</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {leads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-muted/30">
                      <td className="p-4">
                        <div className="font-medium">{lead.first_name} {lead.last_name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {lead.phone}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{lead.source_type}</div>
                        <div className="text-xs text-muted-foreground">{lead.source_page}</div>
                      </td>
                      <td className="p-4 text-sm">{lead.moving_timeline || '-'}</td>
                      <td className="p-4 text-sm">{lead.budget_range || '-'}</td>
                      <td className="p-4">
                        <Badge className={statusColors[lead.status] || ''}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString()}
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
