"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Download,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  User,
  Database,
  Shield,
  Eye,
  ExternalLink,
  Clock,
} from "lucide-react"

const vehicles = [
  {
    vin: "5UXTA6C07N9B12345",
    model: "Air Dream Edition - Infinite Black",
    status: "active",
    plan: "Premium Connected",
    usage: "2.3 GB",
    provider: "Orange",
    lastSync: "1/15/2024",
  },
  {
    vin: "5UXTA6C07N9B67890",
    model: "Air Touring - Stellar White",
    status: "pending",
    plan: "Standard Connected",
    usage: "0 GB",
    provider: "Orange",
    lastSync: "Not activated",
  },
]

const stats = [
  { title: "Total Vehicles", value: "1,247", change: "+23 this month" },
  { title: "Connected Vehicles", value: "1,156", change: "92.7% connectivity rate" },
  { title: "Lucid IDs Assigned", value: "1,203", change: "96.5% assignment rate" },
  { title: "Data Requests", value: "2,847", change: "Today's API requests" },
]

export default function VehicleManagementPage() {
  const [selectedTab, setSelectedTab] = useState("connectivity")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Management</h1>
          <p className="text-muted-foreground">
            Manage vehicle connectivity, Lucid ID assignments, and access vehicle data through Garage integration.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>Activate eSIM</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Input placeholder="Filter vehicles..." className="max-w-sm" />
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="connectivity">Connectivity Management</TabsTrigger>
          <TabsTrigger value="lucid-id">Lucid ID Administration</TabsTrigger>
          <TabsTrigger value="data-access">Vehicle Data Access</TabsTrigger>
        </TabsList>

        <TabsContent value="connectivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orange Connectivity Management</CardTitle>
              <CardDescription>Manage eSIM activation and connectivity services via Orange integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">1,156</div>
                    <div className="text-sm text-muted-foreground">Active Connections</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="font-medium">67</div>
                    <div className="text-sm text-muted-foreground">Pending Activation</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <WifiOff className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-medium">24</div>
                    <div className="text-sm text-muted-foreground">Connection Issues</div>
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle Details</TableHead>
                    <TableHead>Connectivity Status</TableHead>
                    <TableHead>Plan & Usage</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.vin}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{vehicle.vin}</div>
                          <div className="text-sm text-muted-foreground">{vehicle.model}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {vehicle.status === "active" ? (
                            <Wifi className="h-4 w-4 text-green-500" />
                          ) : (
                            <WifiOff className="h-4 w-4 text-yellow-500" />
                          )}
                          <Badge variant={vehicle.status === "active" ? "default" : "secondary"}>
                            {vehicle.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{vehicle.plan}</div>
                          <div className="text-sm text-muted-foreground">{vehicle.usage}</div>
                        </div>
                      </TableCell>
                      <TableCell>{vehicle.provider}</TableCell>
                      <TableCell>{vehicle.lastSync}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          {vehicle.status === "active" ? "Manage" : "Activate"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lucid-id" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <div>
                <h2 className="text-xl font-semibold">Lucid ID Administration</h2>
                <p className="text-sm text-muted-foreground">
                  Manage customer Lucid IDs and vehicle associations with CRM sync
                </p>
              </div>
            </div>
            <Button>
              <User className="h-4 w-4 mr-2" />
              Assign Lucid ID
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">1,203</div>
                    <div className="text-sm text-muted-foreground">Assigned Lucid IDs</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold">44</div>
                    <div className="text-sm text-muted-foreground">Pending Assignment</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">1,156</div>
                    <div className="text-sm text-muted-foreground">CRM Synced</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle & Customer</TableHead>
                    <TableHead>Lucid ID</TableHead>
                    <TableHead>Access Rights</TableHead>
                    <TableHead>CRM Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                          <Database className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">5UXTA6C07N9B12345</div>
                          <div className="text-sm text-muted-foreground">Michael Thompson</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">LID-789456123</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Full Access</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        Synced
                      </Badge>
                    </TableCell>
                    <TableCell>Jan 15, 2024</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                          <Database className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">5UXTA6C07N9B67890</div>
                          <div className="text-sm text-muted-foreground">Sarah Johnson</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">LID-456789012</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Full Access</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        Synced
                      </Badge>
                    </TableCell>
                    <TableCell>Jan 15, 2024</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-access" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <div>
                <h2 className="text-xl font-semibold">Vehicle Data Access</h2>
                <p className="text-sm text-muted-foreground">
                  Secure, tokenized access to detailed VIN-specific vehicle data with audit trails
                </p>
              </div>
            </div>
            <Button>
              <Database className="h-4 w-4 mr-2" />
              Request Data Access
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm text-muted-foreground">Vehicles Available</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-muted-foreground">Active Access Tokens</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 text-blue-500">📊</div>
                  <div>
                    <div className="text-2xl font-bold">2,847</div>
                    <div className="text-sm text-muted-foreground">API Requests Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-muted-foreground">Audit Coverage</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Data Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle Details</TableHead>
                    <TableHead>Software Version</TableHead>
                    <TableHead>Last Data Sync</TableHead>
                    <TableHead>Data Categories</TableHead>
                    <TableHead>Access Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                          <Database className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">5UXTA6C07N9B12345</div>
                          <div className="text-sm text-muted-foreground">Air Dream Edition - Michael Thompson</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>2.1.47</TableCell>
                    <TableCell>2024-01-20 14:30</TableCell>
                    <TableCell>
                      <Badge variant="outline">6 categories</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        Available
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                          <Database className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">5UXTA6C07N9B67890</div>
                          <div className="text-sm text-muted-foreground">Air Touring - Sarah Johnson</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>2.1.45</TableCell>
                    <TableCell>2024-01-19 09:15</TableCell>
                    <TableCell>
                      <Badge variant="outline">6 categories</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        Available
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Data Access Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Build Configuration Data</div>
                    <div className="text-sm text-muted-foreground">
                      VIN: 5UXTA6C07N9B12345 • Requested by: Service Team
                    </div>
                    <div className="text-sm text-muted-foreground">Purpose: Warranty claim verification</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">Approved</Badge>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Diagnostic & Health Data</div>
                    <div className="text-sm text-muted-foreground">
                      VIN: 5UXTA6C07N9B67890 • Requested by: Technical Support
                    </div>
                    <div className="text-sm text-muted-foreground">Purpose: Remote diagnostic analysis</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Pending</Badge>
                  <span className="text-sm text-muted-foreground">1 hour ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
