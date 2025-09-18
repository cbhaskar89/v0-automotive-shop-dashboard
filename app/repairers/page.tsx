"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getMockRepairers, kpisForRepairer, aggregateKPIs } from "@/lib/data"

export default function RepairersPage() {
  const repairers = getMockRepairers()
  const per = repairers.map((r) => ({ r, k: kpisForRepairer(r.id) }))
  const agg = aggregateKPIs(per.map((x) => x.k))

  return (
    <>
      <header className="flex items-center gap-2 border-b bg-muted/40 h-14">
        <SidebarTrigger />
        <div className="ml-2 font-semibold">Authorized Repairers (5)</div>
      </header>
      <main className="py-4 grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <KPICard label="Pending Orders" value={agg.pendingOrders} />
          <KPICard label="Past Due Invoices" value={agg.pastDueInvoices} />
          <KPICard label="Open Returns" value={agg.openReturns} />
          <KPICard label="Recall Flags" value={agg.recallFlags} />
          <KPICard label="Backorders" value={agg.backorders} />
          <KPICard label="Avg ETA (days)" value={agg.avgEtaDays} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Repairer Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Pending Orders</TableHead>
                  <TableHead className="text-right">Past Due</TableHead>
                  <TableHead className="text-right">Open Returns</TableHead>
                  <TableHead className="text-right">Backorders</TableHead>
                  <TableHead className="text-right">Avg ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {per.map(({ r, k }) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>
                      {r.city}, {r.country}
                    </TableCell>
                    <TableCell className="text-right">{k.pendingOrders}</TableCell>
                    <TableCell className="text-right">{k.pastDueInvoices}</TableCell>
                    <TableCell className="text-right">{k.openReturns}</TableCell>
                    <TableCell className="text-right">{k.backorders}</TableCell>
                    <TableCell className="text-right">{k.avgEtaDays}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  )
}

function KPICard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-xl font-semibold mt-1">{value}</div>
      </CardContent>
    </Card>
  )
}
