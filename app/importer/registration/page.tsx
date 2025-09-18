"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Shield, CheckCircle, Clock, AlertTriangle, FileText, Plus } from "lucide-react"

export default function RegistrationWarrantyPage() {
  const [selectedVehicle, setSelectedVehicle] = useState("")

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Registration & Warranty</h1>
          <p className="text-muted-foreground">
            Manage vehicle registrations and warranty activations for customer and demo vehicles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Register Vehicle
        </Button>
      </div>

      <Tabs defaultValue="registration" className="space-y-6">
        <TabsList>
          <TabsTrigger value="registration">Vehicle Registration</TabsTrigger>
          <TabsTrigger value="warranty">Warranty Coverage</TabsTrigger>
          <TabsTrigger value="pending">Pending Activations</TabsTrigger>
        </TabsList>

        <TabsContent value="registration" className="space-y-6">
          {/* Registration KPIs */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Registered</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">Customer & Demo Vehicles</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">New Registrations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Registration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Awaiting Details</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Warranty Activated</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,824</div>
                <p className="text-xs text-muted-foreground">Auto-triggered</p>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Registration Form</CardTitle>
              <CardDescription>Input registration details to trigger warranty activation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="vin">Vehicle VIN</Label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select VIN" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5UXTA6C07N9B12345">5UXTA6C07N9B12345 - John Smith</SelectItem>
                      <SelectItem value="5UXTA6C07N9B67890">5UXTA6C07N9B67890 - Sarah Johnson</SelectItem>
                      <SelectItem value="5UXTA6C07N9B11111">5UXTA6C07N9B11111 - Demo Vehicle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-type">Vehicle Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer Vehicle</SelectItem>
                      <SelectItem value="demo">Demo Vehicle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="registration-date">Registration Date</Label>
                  <Input type="date" id="registration-date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration-number">Registration Number</Label>
                  <Input id="registration-number" placeholder="Enter registration number" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="registration-authority">Registration Authority</Label>
                  <Input id="registration-authority" placeholder="e.g., DVLA, DMV" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration-country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="nl">Netherlands</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any additional registration details..." />
              </div>

              <Button className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Register Vehicle & Activate Warranty
              </Button>
            </CardContent>
          </Card>

          {/* Recent Registrations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">John Smith</div>
                    <div className="text-sm text-muted-foreground">VIN: 5UXTA6C07N9B12345</div>
                    <div className="text-sm text-muted-foreground">Registered: 2024-01-20</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Customer</Badge>
                    <Badge className="bg-green-100 text-green-800">Warranty Active</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">VIN: 5UXTA6C07N9B67890</div>
                    <div className="text-sm text-muted-foreground">Registered: 2024-01-19</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Customer</Badge>
                    <Badge className="bg-green-100 text-green-800">Warranty Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warranty" className="space-y-6">
          {/* Warranty Coverage Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Warranties</CardTitle>
                <Shield className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,824</div>
                <p className="text-xs text-muted-foreground">Currently Covered</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">Within 30 Days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Claims This Month</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Warranty Claims</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coverage Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.2%</div>
                <p className="text-xs text-muted-foreground">Activation Success</p>
              </CardContent>
            </Card>
          </div>

          {/* Warranty Coverage Table */}
          <Card>
            <CardHeader>
              <CardTitle>Warranty Coverage by Vehicle</CardTitle>
              <CardDescription>View warranty status and coverage details for all registered vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">John Smith - Air Dream Edition</div>
                    <div className="text-sm text-muted-foreground">VIN: 5UXTA6C07N9B12345</div>
                    <div className="text-sm text-muted-foreground">Activated: 2024-01-20</div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <div className="text-sm text-muted-foreground">Expires: 2028-01-20</div>
                    <div className="text-sm font-medium">4 Years Remaining</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Sarah Johnson - Air Touring</div>
                    <div className="text-sm text-muted-foreground">VIN: 5UXTA6C07N9B67890</div>
                    <div className="text-sm text-muted-foreground">Activated: 2024-01-19</div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <div className="text-sm text-muted-foreground">Expires: 2028-01-19</div>
                    <div className="text-sm font-medium">4 Years Remaining</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Demo Vehicle - Air Pure</div>
                    <div className="text-sm text-muted-foreground">VIN: 5UXTA6C07N9B11111</div>
                    <div className="text-sm text-muted-foreground">Activated: 2024-01-15</div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-blue-100 text-blue-800">Demo Coverage</Badge>
                    <div className="text-sm text-muted-foreground">Expires: 2026-01-15</div>
                    <div className="text-sm font-medium">2 Years Remaining</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Warranty Activations</CardTitle>
              <CardDescription>Vehicles awaiting registration details for warranty activation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">VIN: 5UXTA6C07N9B22222</div>
                    <div className="text-sm text-muted-foreground">Delivered: 2024-01-18</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-orange-600">
                      Pending Registration
                    </Badge>
                    <Button size="sm">Register Now</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Demo Vehicle</div>
                    <div className="text-sm text-muted-foreground">VIN: 5UXTA6C07N9B33333</div>
                    <div className="text-sm text-muted-foreground">Assigned: 2024-01-17</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-orange-600">
                      Pending Registration
                    </Badge>
                    <Button size="sm">Register Now</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
