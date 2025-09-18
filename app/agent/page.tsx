"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Star, TrendingUp, Calendar, CheckCircle, Clock } from "lucide-react"

const customerHandovers = [
  { vin: "LU1234567890", model: "Air Dream Edition", customer: "J. Smith", status: "Delivered", date: "2025-01-15" },
  { vin: "LU1234567891", model: "Air Touring", customer: "M. Johnson", status: "Scheduled", date: "2025-01-18" },
  { vin: "LU1234567892", model: "Air Pure", customer: "A. Wilson", status: "PDI Pending", date: "2025-01-20" },
  { vin: "LU1234567893", model: "Air Dream Edition", customer: "R. Brown", status: "Delivered", date: "2025-01-14" },
]

const performanceMetrics = [
  { title: "Customer Satisfaction", value: "4.8/5.0", change: "+0.2", icon: Star },
  { title: "Agent Productivity", value: "12.3 units/month", change: "+1.5", icon: TrendingUp },
  { title: "Delivery Success Rate", value: "96.7%", change: "+2.1%", icon: CheckCircle },
  { title: "Average Delivery Time", value: "3.2 days", change: "-0.5", icon: Clock },
]

const upcomingDeliveries = [
  { date: "Today", count: 3, customers: ["J. Smith", "M. Johnson", "A. Wilson"] },
  { date: "Tomorrow", count: 2, customers: ["R. Brown", "S. Davis"] },
  { date: "This Week", count: 8, customers: ["Multiple customers"] },
]

export default function AgentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Truck className="h-8 w-8" />
            Agent Dashboard
          </h1>
          <p className="text-muted-foreground">Manage customer handovers and track your sales performance</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="handovers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="handovers">Customer Handovers</TabsTrigger>
          <TabsTrigger value="schedule">Delivery Schedule</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="commission">Commission Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="handovers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Customer Handovers</CardTitle>
              <CardDescription>Recent customer delivery activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>VIN</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerHandovers.map((handover) => (
                    <TableRow key={handover.vin}>
                      <TableCell className="font-mono text-sm">{handover.vin}</TableCell>
                      <TableCell>{handover.model}</TableCell>
                      <TableCell>{handover.customer}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            handover.status === "Delivered"
                              ? "default"
                              : handover.status === "Scheduled"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {handover.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{handover.date}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          {handover.status === "Delivered" ? "View" : "Manage"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
              <CardDescription>Scheduled customer handovers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeliveries.map((delivery) => (
                  <div key={delivery.date} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {delivery.date}
                      </div>
                      <div className="text-sm text-muted-foreground">{delivery.customers.join(", ")}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{delivery.count}</div>
                      <div className="text-sm text-muted-foreground">deliveries</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Your performance metrics this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Vehicles Delivered</span>
                    <span className="font-bold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Satisfaction</span>
                    <span className="font-bold">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>On-time Deliveries</span>
                    <span className="font-bold">96.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Revenue Generated</span>
                    <span className="font-bold">$1.2M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievement Badges</CardTitle>
                <CardDescription>Your recent accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Top Performer - January 2025</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                    <Star className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">Customer Satisfaction Excellence</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <span className="text-sm">Sales Target Exceeded</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="commission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Summary</CardTitle>
              <CardDescription>Your earnings and pending payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$15,420</div>
                  <div className="text-sm text-muted-foreground">Earned This Month</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">$8,750</div>
                  <div className="text-sm text-muted-foreground">Pending Payment</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">$142,300</div>
                  <div className="text-sm text-muted-foreground">YTD Total</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
