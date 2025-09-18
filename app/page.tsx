"use client"

import * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import RepairerSwitcher from "@/components/repairer-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bell, Package, Receipt, Truck, AlertTriangle, Timer, TrendingUp, TrendingDown } from "lucide-react"
import { getMockRepairers, kpisForRepairer, aggregateKPIs } from "@/lib/data"
import { OrderStatusModal } from "@/components/order-status-modal"
import { useRouter } from "next/navigation"

export default function Page() {
  const repairers = getMockRepairers()
  const [current, setCurrent] = React.useState<string>("all")
  const kpis = current === "all" ? aggregateKPIs(repairers.map((r) => kpisForRepairer(r.id))) : kpisForRepairer(current)

  const [showOrderStatus, setShowOrderStatus] = React.useState(false)
  const router = useRouter()

  const handleQualityAlertsClick = () => {
    router.push("/returns?tab=quality-alerts")
  }

  return (
    <>
      <header className="flex items-center gap-2 border-b bg-muted/40 h-14">
        <SidebarTrigger />
        <div className="ml-2 font-semibold">Shop Health</div>
        <div className="ml-auto flex items-center gap-2">
          <RepairerSwitcher repairers={repairers} value={current} onChange={setCurrent} allowAll />
          <Button variant="outline" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="py-4 grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div onClick={() => setShowOrderStatus(true)} className="cursor-pointer">
            <StatCard
              label="Pending Orders"
              value={kpis.pendingOrders}
              icon={<Package className="h-4 w-4" />}
              trend="+8%"
              trendUp
            />
          </div>
          <StatCard
            label="Past Due Invoices"
            value={kpis.pastDueInvoices}
            icon={<Receipt className="h-4 w-4" />}
            trend="-12%"
          />
          <StatCard
            label="Open Returns/RMAs"
            value={kpis.openReturns}
            icon={<Truck className="h-4 w-4" />}
            trend="+3%"
            trendUp
          />
          <div onClick={handleQualityAlertsClick} className="cursor-pointer">
            <StatCard
              label="Quality Alerts"
              value={kpis.recallFlags}
              icon={<AlertTriangle className="h-4 w-4" />}
              trend="0%"
            />
          </div>
          <StatCard
            label="Parts on Backorder"
            value={kpis.backorders}
            icon={<Timer className="h-4 w-4" />}
            trend="+2%"
            trendUp
          />
          <StatCard label="Avg ETA (days)" value={kpis.avgEtaDays} icon={<Timer className="h-4 w-4" />} trend="-5%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Order Activity (30 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <MiniTrend data={[10, 12, 8, 14, 16, 12, 18, 22, 20, 24, 21, 26, 30]} />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Invoice Aging</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <Bar label="0-30" value={kpis.aging["0-30"]} />
                <Bar label="31-60" value={kpis.aging["31-60"]} />
                <Bar label="61+" value={kpis.aging["61+"]} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {kpis.alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <Badge variant={a.type === "warning" ? "secondary" : "outline"}>{a.type.toUpperCase()}</Badge>
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.detail}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <OrderStatusModal open={showOrderStatus} onOpenChange={setShowOrderStatus} />
      </main>
    </>
  )
}

function StatCard(props: {
  label: string
  value: number | string
  icon: React.ReactNode
  trend: string
  trendUp?: boolean
}) {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">{props.label}</div>
          {props.icon}
        </div>
        <div className="text-xl font-semibold mt-1">{props.value}</div>
        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {props.trendUp ? (
            <TrendingUp className="h-3 w-3 text-green-600" />
          ) : (
            <TrendingDown className="h-3 w-3 text-muted-foreground" />
          )}
          <span>{props.trend}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function MiniTrend({ data }: { data: number[] }) {
  const max = Math.max(...data)
  return (
    <div className="h-24 w-full grid items-end gap-1 grid-cols-13">
      {data.map((v, i) => (
        <div
          key={i}
          className="bg-primary/60 rounded-sm"
          style={{ height: `${(v / max) * 100}%` }}
          aria-label={`Bar ${i + 1}: ${v}`}
        />
      ))}
      <Separator className="mt-2" />
    </div>
  )
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid gap-1">
      <div className="text-xs">{label}</div>
      <div className="h-16 w-full bg-muted rounded">
        <div
          className="h-full bg-primary rounded"
          style={{ width: `${Math.min(100, value)}%` }}
          aria-label={`${label} percent`}
        />
      </div>
      <div className="text-xs text-muted-foreground">{value}%</div>
    </div>
  )
}
