"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Package, Truck, Users, MapPin, Clock, TrendingUp, Target, DollarSign } from "lucide-react"

const wholesaleOrders = [
  {
    id: "WO-2025-0847",
    variant: "Air Dream Edition",
    units: 5,
    deliveryDate: "July 15, 2025",
    status: "In Production",
  },
  { id: "WO-2025-0846", variant: "Air Touring", units: 8, deliveryDate: "June 28, 2025", status: "Ready to Ship" },
  { id: "WO-2025-0845", variant: "Air Pure", units: 12, deliveryDate: "June 20, 2025", status: "In Transit" },
]

const vehiclePipeline = [
  { stage: "In Production", count: 23, color: "bg-blue-500" },
  { stage: "Ready to Ship", count: 8, color: "bg-yellow-500" },
  { stage: "In Transit", count: 47, color: "bg-orange-500" },
  { stage: "Ready for Pickup", count: 12, color: "bg-green-500" },
  { stage: "PDI Complete", count: 34, color: "bg-purple-500" },
]

const priorityActions = [
  {
    title: "12 Vehicles Ready for Pickup",
    description: "Tilburg Port - Pickup window expires in 2 days",
    action: "Schedule",
    urgent: true,
  },
  {
    title: "Forecast Submission Due",
    description: "Q3 2025 volume forecast due June 15",
    action: "Submit",
    urgent: false,
  },
  {
    title: "Custom Clearance Documents",
    description: "5 shipments pending documentation",
    action: "Upload",
    urgent: true,
  },
  { title: "Agent Compensation", description: "3 pending commission invoices", action: "Review", urgent: false },
]

const customerHandovers = [
  { vin: "LU1234567890", variant: "Air Dream Edition", customer: "J. Smith", status: "Delivered" },
  { vin: "LU1234567891", variant: "Air Touring", customer: "M. Johnson", status: "Scheduled" },
  { vin: "LU1234567892", variant: "Air Pure", customer: "A. Wilson", status: "PDI Pending" },
  { vin: "LU1234567893", variant: "Air Dream Edition", customer: "R. Brown", status: "Delivered" },
]

export default function ImporterPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            Partner Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back. Here's an overview of your operations and key metrics.</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wholesale Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 vs forecast</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicles in Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">ETA: 3-7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready for Pickup</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">At Tilburg Port</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Handovers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Wholesale Orders</TabsTrigger>
          <TabsTrigger value="pipeline">Vehicle Pipeline</TabsTrigger>
          <TabsTrigger value="actions">Priority Actions</TabsTrigger>
          <TabsTrigger value="handovers">Customer Handovers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Wholesale Orders</CardTitle>
              <CardDescription>Orders placed against Lucid inventory and production plans</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Details</TableHead>
                    <TableHead>Trim/Variant</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wholesaleOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.variant} ({order.units} units)
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{order.variant}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === "Ready to Ship" ? "default" : "secondary"}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Track
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button variant="outline">View All Orders</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Pipeline</CardTitle>
              <CardDescription>Vehicles in various stages of delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehiclePipeline.map((stage) => (
                  <div key={stage.stage} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                      <span className="font-medium">{stage.stage}</span>
                    </div>
                    <div className="text-2xl font-bold">{stage.count} units</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Priority Actions</CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priorityActions.map((action, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 border rounded-lg ${action.urgent ? "border-red-200 bg-red-50" : ""}`}
                  >
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {action.urgent && <Clock className="h-4 w-4 text-red-500" />}
                        {action.title}
                      </div>
                      <div className="text-sm text-muted-foreground">{action.description}</div>
                    </div>
                    <Button variant={action.urgent ? "default" : "outline"} size="sm">
                      {action.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="handovers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Handovers</CardTitle>
              <CardDescription>Recent customer delivery activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerHandovers.map((handover) => (
                  <div key={handover.vin} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">VIN: {handover.vin}</div>
                      <div className="text-sm text-muted-foreground">
                        {handover.variant} - Customer: {handover.customer}
                      </div>
                    </div>
                    <Badge variant={handover.status === "Delivered" ? "default" : "secondary"}>{handover.status}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline">Manage Handovers</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On-time Delivery</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.5%</div>
                <p className="text-xs text-muted-foreground">-1.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5.0</div>
                <p className="text-xs text-muted-foreground">+0.2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Agent Productivity</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.3</div>
                <p className="text-xs text-muted-foreground">units/month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue YTD</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.4M</div>
                <p className="text-xs text-muted-foreground">+15.3% vs target</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4">
            <Button variant="outline">View Analytics</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
