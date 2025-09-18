"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ShoppingCart, Calendar, DollarSign, Percent } from "lucide-react"

const mockRetailOrders = [
  {
    id: "RO-2025-001",
    customerName: "Michael Johnson",
    customerEmail: "michael.j@email.com",
    vehicle: "Air Dream Edition",
    configuration: 'Stealth Look, 21" wheels',
    orderDate: "2025-01-15",
    deliveryDate: "2025-04-15",
    totalPrice: "$139,000",
    discountsApplied: ["Agent Loyalty: $2,000", "Lucid Promo: $1,500"],
    status: "Confirmed",
    agentId: "AGT-001",
  },
  {
    id: "RO-2025-002",
    customerName: "Lisa Wang",
    customerEmail: "lisa.wang@email.com",
    vehicle: "Air Touring",
    configuration: 'Glass Canopy, 19" wheels',
    orderDate: "2025-01-12",
    deliveryDate: "2025-05-20",
    totalPrice: "$107,400",
    discountsApplied: ["First Time Buyer: $1,000"],
    status: "In Production",
    agentId: "AGT-001",
  },
]

export default function RetailOrdersPage() {
  const [selectedTab, setSelectedTab] = useState("place")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "in production":
        return "bg-yellow-100 text-yellow-800"
      case "ready for delivery":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Retail Orders</h1>
        <p className="text-muted-foreground">Place and manage retail customer orders using the D2C OMS</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.4M</div>
            <p className="text-xs text-muted-foreground">YTD revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$97,600</div>
            <p className="text-xs text-muted-foreground">Per customer order</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="place">Place Order</TabsTrigger>
          <TabsTrigger value="manage">Manage Orders</TabsTrigger>
          <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="place" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Place New Retail Order</CardTitle>
              <CardDescription>Create customer orders with access to D2C OMS and discount application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customer Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Customer Name</label>
                    <Input placeholder="Enter customer name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="customer@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Registration Area</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select territory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown District</SelectItem>
                        <SelectItem value="suburban-north">Suburban North</SelectItem>
                        <SelectItem value="suburban-south">Suburban South</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Vehicle Configuration</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Model</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="air-dream">Air Dream Edition</SelectItem>
                        <SelectItem value="air-touring">Air Touring</SelectItem>
                        <SelectItem value="air-pure">Air Pure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Exterior Color</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stellar-white">Stellar White</SelectItem>
                        <SelectItem value="infinite-black">Infinite Black</SelectItem>
                        <SelectItem value="cosmos-silver">Cosmos Silver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Interior</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interior" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mojave">Mojave</SelectItem>
                        <SelectItem value="tahoe">Tahoe</SelectItem>
                        <SelectItem value="santa-cruz">Santa Cruz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Wheels</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select wheels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="19-inch">19" Aero Range</SelectItem>
                        <SelectItem value="20-inch">20" Performance</SelectItem>
                        <SelectItem value="21-inch">21" Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pricing & Discounts</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span className="font-semibold">$139,000</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-green-600">
                      <span>Agent Loyalty Discount:</span>
                      <span>-$2,000</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Lucid Promotion:</span>
                      <span>-$1,500</span>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Price:</span>
                    <span>$135,500</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Percent className="h-4 w-4 mr-2" />
                  Apply Additional Discounts
                </Button>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Place Order
                </Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Orders</CardTitle>
              <CardDescription>Track and manage retail customer orders placed through your agency</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRetailOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.vehicle}</div>
                          <div className="text-sm text-muted-foreground">{order.configuration}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell className="font-semibold">{order.totalPrice}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
              <CardDescription>Real-time tracking of customer order progress and delivery status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search by Order ID, Customer Name, or VIN..." />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in-production">In Production</SelectItem>
                    <SelectItem value="quality-check">Quality Check</SelectItem>
                    <SelectItem value="shipping">Shipping</SelectItem>
                    <SelectItem value="ready-delivery">Ready for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export Report</Button>
              </div>

              <div className="space-y-4">
                {mockRetailOrders.map((order) => (
                  <Card key={order.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {order.customerName} • {order.vehicle}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>

                      {/* Progress Timeline */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Order Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {order.status === "Confirmed" ? "25%" : order.status === "In Production" ? "60%" : "100%"}{" "}
                            Complete
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width:
                                order.status === "Confirmed"
                                  ? "25%"
                                  : order.status === "In Production"
                                    ? "60%"
                                    : "100%",
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Timeline Steps */}
                      <div className="grid grid-cols-5 gap-4 mb-6">
                        <div className="text-center">
                          <div
                            className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm ${
                              true ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            ✓
                          </div>
                          <div className="text-xs font-medium">Order Placed</div>
                          <div className="text-xs text-muted-foreground">
                            {order.status === "Confirmed" ? "Jan 15, 2025" : "Pending"}
                          </div>
                        </div>
                        <div className="text-center">
                          <div
                            className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm ${
                              order.status !== "Confirmed" ? "bg-green-500" : "bg-blue-500"
                            }`}
                          >
                            {order.status !== "Confirmed" ? "✓" : "2"}
                          </div>
                          <div className="text-xs font-medium">Production Started</div>
                          <div className="text-xs text-muted-foreground">
                            {order.status !== "Confirmed" ? "Jan 20, 2025" : "Pending"}
                          </div>
                        </div>
                        <div className="text-center">
                          <div
                            className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm ${
                              order.status === "In Production" ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          >
                            3
                          </div>
                          <div className="text-xs font-medium">Quality Check</div>
                          <div className="text-xs text-muted-foreground">Pending</div>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm bg-gray-300">
                            4
                          </div>
                          <div className="text-xs font-medium">Shipping</div>
                          <div className="text-xs text-muted-foreground">Pending</div>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm bg-gray-300">
                            5
                          </div>
                          <div className="text-xs font-medium">Delivered</div>
                          <div className="text-xs text-muted-foreground">Est. {order.deliveryDate}</div>
                        </div>
                      </div>

                      {/* Order Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">VIN</div>
                          <div className="text-sm">5UXTA6C07N9B{Math.floor(Math.random() * 90000) + 10000}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Production Location</div>
                          <div className="text-sm">Casa Grande, AZ</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Estimated Delivery</div>
                          <div className="text-sm">{order.deliveryDate}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Delivery Method</div>
                          <div className="text-sm">Home Delivery</div>
                        </div>
                      </div>

                      {/* Recent Updates */}
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">Recent Updates</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Vehicle entered production phase</span>
                            <span className="text-muted-foreground">2 days ago</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span>Order confirmed and payment processed</span>
                            <span className="text-muted-foreground">1 week ago</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          View Full Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact Customer
                        </Button>
                        <Button size="sm" variant="outline">
                          Update Status
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm text-muted-foreground">Orders in Production</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">Ready for Delivery</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">89</div>
                    <div className="text-sm text-muted-foreground">Avg Days to Delivery</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-muted-foreground">On-Time Delivery Rate</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
