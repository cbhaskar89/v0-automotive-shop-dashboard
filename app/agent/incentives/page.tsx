"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Percent,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
} from "lucide-react"

const mockDiscounts = [
  {
    id: "DISC-001",
    name: "Q1 2025 Launch Promotion",
    type: "Lucid-led",
    amount: "$2,500",
    percentage: null,
    eligibility: "All Air Models",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    status: "Active",
    appliedOrders: 47,
    totalSavings: "$117,500",
    description: "Promotional discount for Q1 launch campaign",
  },
  {
    id: "DISC-002",
    name: "Agent Loyalty Reward",
    type: "Agent-led",
    amount: "$1,500",
    percentage: null,
    eligibility: "Repeat Customers",
    startDate: "2025-01-15",
    endDate: "2025-12-31",
    status: "Active",
    appliedOrders: 23,
    totalSavings: "$34,500",
    description: "Loyalty discount for returning customers",
  },
  {
    id: "DISC-003",
    name: "First Time Buyer Incentive",
    type: "Lucid-led",
    amount: null,
    percentage: "3%",
    eligibility: "New Customers",
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    status: "Active",
    appliedOrders: 89,
    totalSavings: "$267,000",
    description: "Percentage-based discount for first-time Lucid buyers",
  },
  {
    id: "DISC-004",
    name: "Holiday Special 2024",
    type: "Agent-led",
    amount: "$1,000",
    percentage: null,
    eligibility: "Air Pure & Touring",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    status: "Expired",
    appliedOrders: 156,
    totalSavings: "$156,000",
    description: "Holiday season promotional discount",
  },
]

export default function IncentivesDiscountsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    return type === "Lucid-led" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800"
  }

  const filteredDiscounts = mockDiscounts.filter((discount) => {
    const matchesSearch =
      discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || discount.type.toLowerCase().includes(filterType.toLowerCase())
    const matchesStatus = filterStatus === "all" || discount.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Incentives & Discounts</h1>
        <p className="text-muted-foreground">
          Manage Lucid-led and Agent-led discounts with clear attribution for compensation and audit purposes
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Discounts</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Currently available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$575K</div>
            <p className="text-xs text-muted-foreground">YTD customer savings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders with Discounts</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">315</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Discount Value</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,825</div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Discount Library</TabsTrigger>
          <TabsTrigger value="apply">Apply Discounts</TabsTrigger>
          <TabsTrigger value="reporting">Compensation Reporting</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Discount Library</CardTitle>
                  <CardDescription>
                    Manage library of Lucid-led and Agent-led discounts with eligibility rules and ownership tags
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Discount
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Discount</DialogTitle>
                      <DialogDescription>
                        Set up a new discount with eligibility rules and attribution
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="discount-name">Discount Name</Label>
                          <Input id="discount-name" placeholder="Enter discount name" />
                        </div>
                        <div>
                          <Label htmlFor="discount-type">Discount Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lucid-led">Lucid-led</SelectItem>
                              <SelectItem value="agent-led">Agent-led</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="discount-amount">Fixed Amount ($)</Label>
                          <Input id="discount-amount" type="number" placeholder="0" />
                        </div>
                        <div>
                          <Label htmlFor="discount-percentage">Percentage (%)</Label>
                          <Input id="discount-percentage" type="number" placeholder="0" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="eligibility">Eligibility Rules</Label>
                        <Textarea id="eligibility" placeholder="Define eligibility criteria..." />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="start-date">Start Date</Label>
                          <Input id="start-date" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="end-date">End Date</Label>
                          <Input id="end-date" type="date" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-apply" />
                        <Label htmlFor="auto-apply">Auto-apply when eligible</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Create Discount</Button>
                        <Button variant="outline">Save as Draft</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search discounts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="lucid">Lucid-led</SelectItem>
                    <SelectItem value="agent">Agent-led</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Discount ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Eligibility</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Orders</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDiscounts.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell className="font-medium">{discount.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{discount.name}</div>
                          <div className="text-sm text-muted-foreground">{discount.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(discount.type)}>{discount.type}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{discount.amount || discount.percentage}</TableCell>
                      <TableCell>{discount.eligibility}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{discount.startDate}</div>
                          <div className="text-muted-foreground">to {discount.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(discount.status)}>{discount.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{discount.appliedOrders} orders</div>
                          <div className="text-muted-foreground">{discount.totalSavings} saved</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apply Discounts to Orders</CardTitle>
              <CardDescription>
                Apply eligible discounts during order placement with clear attribution for compensation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Order Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Order ID</Label>
                    <Input placeholder="Enter order ID or search..." />
                  </div>
                  <div>
                    <Label>Customer Name</Label>
                    <Input placeholder="Customer name" />
                  </div>
                  <div>
                    <Label>Vehicle Model</Label>
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
                    <Label>Base Price</Label>
                    <Input placeholder="$139,000" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Available Discounts</h3>
                <div className="space-y-3">
                  {mockDiscounts
                    .filter((d) => d.status === "Active")
                    .map((discount) => (
                      <div key={discount.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <input type="checkbox" className="rounded" />
                          <div>
                            <div className="font-medium">{discount.name}</div>
                            <div className="text-sm text-muted-foreground">{discount.description}</div>
                            <Badge className={getTypeColor(discount.type)} size="sm">
                              {discount.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">-{discount.amount || discount.percentage}</div>
                          <div className="text-sm text-muted-foreground">{discount.eligibility}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span className="font-semibold">$139,000</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-green-600">
                    <span>Q1 Launch Promotion (Lucid-led):</span>
                    <span>-$2,500</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Agent Loyalty Reward (Agent-led):</span>
                    <span>-$1,500</span>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Final Price:</span>
                  <span>$135,000</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Savings: $4,000 | Agent Attribution: $1,500 | Lucid Attribution: $2,500
                </div>
              </div>

              <Button className="w-full">Apply Selected Discounts</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compensation Reporting</CardTitle>
              <CardDescription>
                Track applied discounts with attribution for compensation and performance analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Agent-led Discounts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">$45,500</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Lucid-led Discounts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">$89,200</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Commission Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">+$2,275</div>
                      <p className="text-xs text-muted-foreground">Additional earnings</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>
                Complete log of all applied discounts with attribution for audit and compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    timestamp: "2025-01-15 14:30:22",
                    action: "Discount Applied",
                    orderId: "RO-2025-001",
                    discount: "Agent Loyalty Reward",
                    amount: "$1,500",
                    attribution: "Agent-led",
                    agent: "John Smith (AGT-001)",
                  },
                  {
                    timestamp: "2025-01-15 14:30:18",
                    action: "Discount Applied",
                    orderId: "RO-2025-001",
                    discount: "Q1 Launch Promotion",
                    amount: "$2,500",
                    attribution: "Lucid-led",
                    agent: "System Auto-Apply",
                  },
                  {
                    timestamp: "2025-01-14 16:45:11",
                    action: "Discount Created",
                    orderId: "-",
                    discount: "Valentine's Special",
                    amount: "$1,000",
                    attribution: "Agent-led",
                    agent: "Sarah Johnson (AGT-002)",
                  },
                ].map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                        {entry.action === "Discount Applied" ? (
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Plus className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {entry.action}: {entry.discount}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {entry.orderId !== "-" && `Order: ${entry.orderId} | `}
                          Agent: {entry.agent}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">{entry.amount}</div>
                      <div className="text-sm text-muted-foreground">{entry.attribution}</div>
                      <div className="text-xs text-muted-foreground">{entry.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
