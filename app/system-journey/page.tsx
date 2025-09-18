"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Package,
  Database,
  Truck,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  Bell,
  Users,
  Shield,
  Settings,
  User,
} from "lucide-react"

const userRoles = [
  {
    role: "Shop Admin",
    permissions: ["Create Orders", "Approve Returns", "Manage Users", "View All Data", "Financial Access"],
    canCreateOrders: true,
    color: "bg-red-500",
    icon: Shield,
  },
  {
    role: "Parts Manager",
    permissions: ["Create Orders", "Manage Inventory", "Process Returns", "View Reports"],
    canCreateOrders: true,
    color: "bg-blue-500",
    icon: Settings,
  },
  {
    role: "Technician",
    permissions: ["Create Orders", "View Order Status", "Submit Returns"],
    canCreateOrders: true,
    color: "bg-green-500",
    icon: User,
  },
  {
    role: "Parts Clerk",
    permissions: ["View Orders", "Update Order Status", "Basic Returns"],
    canCreateOrders: false,
    color: "bg-yellow-500",
    icon: Package,
  },
]

const journeySteps = [
  {
    id: 1,
    title: "Order Creation",
    system: "Partner Portal",
    description: "Authorized personnel create parts orders through Partner Portal",
    authorizedRoles: ["Shop Admin", "Parts Manager", "Technician"],
    systemCallouts: [
      "Real-time parts catalog integration",
      "VIN-based part lookup via EPC",
      "Pricing engine with discount calculation",
      "MOQ validation and cart management",
    ],
    details: [
      "User authentication and role verification",
      "Parts selection from integrated catalog",
      "Cart checkout with pricing validation",
      "Order confirmation with unique Order ID",
    ],
    icon: Package,
    color: "bg-blue-500",
    status: "completed",
  },
  {
    id: 2,
    title: "SAP Transmission",
    system: "API Gateway → SAP ERP",
    description: "Order data transmitted to SAP for validation and processing",
    authorizedRoles: ["System Automated"],
    systemCallouts: [
      "Secure API authentication",
      "Data transformation and mapping",
      "Real-time inventory availability check",
      "Pricing validation against SAP master data",
    ],
    details: [
      "Order payload encrypted and transmitted",
      "SAP receives and validates order structure",
      "Parts availability verified against inventory",
      "Customer credit limit and terms checked",
    ],
    icon: Database,
    color: "bg-orange-500",
    status: "processing",
  },
  {
    id: 3,
    title: "Warehouse Fulfillment",
    system: "SAP Warehouse Management",
    description: "Parts picked, packed, and prepared for shipment",
    authorizedRoles: ["Warehouse Staff"],
    systemCallouts: [
      "Automated pick list generation",
      "Barcode scanning for accuracy",
      "Quality control checkpoints",
      "Packaging optimization algorithms",
    ],
    details: [
      "Pick list generated and sent to warehouse",
      "Parts physically located and picked",
      "Quality inspection and packaging",
      "Shipping documentation prepared",
    ],
    icon: Package,
    color: "bg-yellow-500",
    status: "pending",
  },
  {
    id: 4,
    title: "Logistics Coordination",
    system: "SAP → Carrier Integration",
    description: "Shipment coordinated with logistics partners",
    authorizedRoles: ["Logistics Team"],
    systemCallouts: [
      "Multi-carrier rate comparison",
      "Automated carrier selection",
      "Real-time tracking number generation",
      "EDI integration with shipping partners",
    ],
    details: [
      "Optimal carrier selected based on cost/speed",
      "Shipping labels generated automatically",
      "Tracking number assigned and recorded",
      "Pickup scheduled with carrier",
    ],
    icon: Truck,
    color: "bg-green-500",
    status: "pending",
  },
  {
    id: 5,
    title: "Customer Notification",
    system: "SAP → Partner Portal → Customer",
    description: "Invoice generated and tracking details provided",
    authorizedRoles: ["All Authorized Users"],
    systemCallouts: [
      "Automated invoice generation in SAP",
      "Real-time portal synchronization",
      "Multi-channel notification system",
      "Payment processing integration",
    ],
    details: [
      "Invoice automatically generated upon shipment",
      "Tracking information synchronized to portal",
      "Email and SMS notifications sent",
      "Payment wallet auto-charge (if enabled)",
    ],
    icon: FileText,
    color: "bg-purple-500",
    status: "pending",
  },
]

const sampleOrder = {
  orderId: "ORD-2024-001234",
  submittedBy: "John Smith (Parts Manager)",
  submittedDate: "2024-01-15 10:30 AM",
  currentStep: 2,
  estimatedDelivery: "2024-01-22",
  trackingNumber: "1Z999AA1234567890",
  invoiceNumber: "INV-2024-001234",
  parts: [
    { partNumber: "BRK-001", description: "Brake Pad Set", quantity: 2, price: 89.99 },
    { partNumber: "FLT-002", description: "Oil Filter", quantity: 1, price: 24.99 },
  ],
  totalAmount: 204.97,
}

export default function SystemJourneyPage() {
  const [selectedStep, setSelectedStep] = useState(1)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-gray-400" />
      default:
        return <Info className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-orange-100 text-orange-800"
      case "pending":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System & User Journey</h1>
        <p className="text-muted-foreground mt-2">
          Complete parts ordering workflow with user roles and system integrations
        </p>
      </div>

      <Tabs defaultValue="journey" className="space-y-6">
        <TabsList>
          <TabsTrigger value="journey">Order Journey</TabsTrigger>
          <TabsTrigger value="roles">User Roles</TabsTrigger>
          <TabsTrigger value="example">Live Example</TabsTrigger>
          <TabsTrigger value="integration">System Integration</TabsTrigger>
          <TabsTrigger value="returns">Returns Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Parts Ordering Journey</CardTitle>
              <CardDescription>End-to-end process with user roles and system callouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Road Background */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-orange-500 via-yellow-500 via-green-500 to-purple-500 opacity-20"></div>

                {journeySteps.map((step, index) => {
                  const Icon = step.icon
                  const isLast = index === journeySteps.length - 1

                  return (
                    <div key={step.id} className="relative mb-12">
                      {/* Road Segment */}
                      <div className="flex items-start">
                        {/* Step Marker */}
                        <div className="relative z-10">
                          <div
                            className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg border-4 border-white`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          {/* Step Number */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                            {step.id}
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="ml-6 flex-1">
                          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-bold text-xl text-gray-900">{step.title}</h3>
                                <p className="text-sm text-gray-600 font-medium">{step.system}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(step.status)}
                                <Badge variant="outline" className={getStatusColor(step.status)}>
                                  {step.status}
                                </Badge>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-700 mb-4">{step.description}</p>

                            {/* Authorized Roles */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Authorized Roles
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {step.authorizedRoles.map((role, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {role}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* System Callouts */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                System Callouts
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {step.systemCallouts.map((callout, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    {callout}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Details Button */}
                            <Button
                              variant={selectedStep === step.id ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedStep(step.id)}
                              className="mt-2"
                            >
                              View Technical Details
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Road Arrow */}
                      {!isLast && (
                        <div className="flex justify-center mt-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <div className="w-8 h-0.5 bg-gray-300"></div>
                            <ArrowRight className="h-5 w-5" />
                            <div className="w-8 h-0.5 bg-gray-300"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Technical Details Panel */}
              {selectedStep && (
                <Card className="mt-8 border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-500" />
                      Technical Details: {journeySteps[selectedStep - 1]?.title}
                    </CardTitle>
                    <CardDescription>{journeySteps[selectedStep - 1]?.system}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {journeySteps[selectedStep - 1]?.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Roles & Permissions</CardTitle>
              <CardDescription>Access levels and capabilities for different shop personnel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userRoles.map((roleData, index) => {
                  const RoleIcon = roleData.icon
                  return (
                    <Card key={index} className="border-2">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${roleData.color} flex items-center justify-center text-white`}
                          >
                            <RoleIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{roleData.role}</CardTitle>
                            <Badge variant={roleData.canCreateOrders ? "default" : "secondary"} className="text-xs">
                              {roleData.canCreateOrders ? "Can Create Orders" : "View Only"}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-semibold text-sm mb-3">Permissions:</h4>
                        <ul className="space-y-2">
                          {roleData.permissions.map((permission, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {permission}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="example" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Order Example</CardTitle>
              <CardDescription>Real-time tracking of order {sampleOrder.orderId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Order ID</p>
                  <p className="text-lg font-mono">{sampleOrder.orderId}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Submitted By</p>
                  <p className="text-sm">{sampleOrder.submittedBy}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Submitted</p>
                  <p className="text-sm">{sampleOrder.submittedDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Est. Delivery</p>
                  <p className="text-lg">{sampleOrder.estimatedDelivery}</p>
                </div>
              </div>

              {/* Current Status */}
              <div className="border rounded-lg p-4 bg-orange-50">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold">Current Status: SAP Processing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your order is being processed in our SAP system. Parts availability is being verified and pricing is
                  being finalized.
                </p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-2">
                  {sampleOrder.parts.map((part, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{part.partNumber}</p>
                        <p className="text-sm text-muted-foreground">{part.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Qty: {part.quantity}</p>
                        <p className="text-sm text-muted-foreground">${part.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t mt-3">
                  <p className="font-semibold">Total Amount</p>
                  <p className="font-semibold text-lg">${sampleOrder.totalAmount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Part Master Integration - Material Master Sync
              </CardTitle>
              <CardDescription>SAP Material Master synchronization with Partner Portal Parts Catalog</CardDescription>
            </CardHeader>

            {/* Integration Flow */}
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Periodic Sync Process
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white mx-auto mb-2">
                      <Database className="h-6 w-6" />
                    </div>
                    <h4 className="font-medium text-sm">SAP Material Master</h4>
                    <p className="text-xs text-gray-600 mt-1">Source system with complete parts data</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-2">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                    <h4 className="font-medium text-sm">Sync Engine</h4>
                    <p className="text-xs text-gray-600 mt-1">Filters & transforms data</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-2">
                      <Package className="h-6 w-6" />
                    </div>
                    <h4 className="font-medium text-sm">Partner Portal</h4>
                    <p className="text-xs text-gray-600 mt-1">Customer-facing catalog</p>
                  </div>
                </div>
              </div>

              {/* Sync Criteria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sync Criteria</CardTitle>
                    <CardDescription>What gets synchronized from SAP</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Service BOMs only (released status)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Parts with "Use" status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Parts with "Phase Out" status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Excludes discontinued parts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Excludes development parts</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sync Schedule</CardTitle>
                    <CardDescription>Automated synchronization timing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Daily sync at 2:00 AM UTC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Delta updates every 4 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Emergency sync on-demand</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Sync failure notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Success confirmation logs</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Mapping */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Mapping & Transformation</CardTitle>
                  <CardDescription>How SAP data becomes Partner Portal catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-blue-900">SAP Material Master Fields</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          Material Number (MATNR)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          Material Description (MAKTX)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          Plant Status (MMSTA)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          BOM Usage (STLAN)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          Unit of Measure (MEINS)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          Minimum Order Qty (MINBE)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          Net Weight (NTGEW)
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          Price Conditions (KONP)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-purple-900">Partner Portal Catalog Fields</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-purple-400" />
                          Part Number
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-purple-400" />
                          Part Description
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-purple-400" />
                          Availability Status
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-purple-400" />
                          Service BOM Category
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-purple-400" />
                          Unit of Measure
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-purple-400" />
                          Minimum Order Quantity
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-purple-400" />
                          Weight & Dimensions
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-purple-400" />
                          Pricing & Discounts
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Use Status</p>
                        <p className="text-xs text-gray-600">Active parts available for order</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-yellow-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Phase Out</p>
                        <p className="text-xs text-gray-600">Limited availability, order soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Service BOM</p>
                        <p className="text-xs text-gray-600">Released for service operations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* System Integration Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Partner Portal</CardTitle>
                <CardDescription>Customer-facing ordering system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Parts catalog browsing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">VIN-based part lookup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Real-time pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Order status tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Invoice management</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SAP ERP Integration</CardTitle>
                <CardDescription>Backend fulfillment system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Order processing automation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Inventory management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Pricing & discount engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Shipping coordination</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Invoice generation</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Flow</CardTitle>
                <CardDescription>Information synchronization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Order data: Portal → SAP</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Status updates: SAP → Portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Tracking info: Logistics → Portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Invoices: SAP → Portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Notifications: Portal → User</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Automated customer updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Order confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Processing updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Shipment notifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Delivery confirmations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Invoice availability</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="returns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-red-600" />
                Returns Process Flow Chart
              </CardTitle>
              <CardDescription>
                Complete returns workflow from Partner Portal through SAP approval and back
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Returns Flow Road */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-orange-500 via-yellow-500 via-green-500 to-blue-500 opacity-20"></div>

                {/* Step 1: Return Initiation */}
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <Package className="h-6 w-6" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="bg-white border-2 border-red-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-gray-900">Return Initiation</h3>
                            <p className="text-sm text-gray-600 font-medium">Partner Portal</p>
                          </div>
                          <Badge className="bg-red-100 text-red-800">User Action</Badge>
                        </div>
                        <p className="text-gray-700 mb-4">
                          User initiates return request in Partner Portal with required documentation
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Return Types</h4>
                            <ul className="space-y-1 text-xs">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Recall Returns
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Warranty Returns
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Damaged Parts (OS&D)
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Overstock Returns
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Required Documentation</h4>
                            <ul className="space-y-1 text-xs">
                              <li className="flex items-center gap-2">
                                <FileText className="h-3 w-3 text-blue-500" />
                                Order/Shipment Numbers
                              </li>
                              <li className="flex items-center gap-2">
                                <FileText className="h-3 w-3 text-blue-500" />
                                Part Numbers & Quantities
                              </li>
                              <li className="flex items-center gap-2">
                                <FileText className="h-3 w-3 text-blue-500" />
                                Reason Codes
                              </li>
                              <li className="flex items-center gap-2">
                                <FileText className="h-3 w-3 text-blue-500" />
                                Photo Evidence (if required)
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                      <ArrowRight className="h-5 w-5" />
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Proof Submission */}
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="bg-white border-2 border-orange-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-gray-900">Proof Submission</h3>
                            <p className="text-sm text-gray-600 font-medium">Partner Portal → SAP</p>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">Documentation</Badge>
                        </div>
                        <p className="text-gray-700 mb-4">User submits required proof and initiates approval request</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Proof Requirements</h4>
                            <ul className="space-y-1 text-xs">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Scrap Documentation (Recalls)
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Damage Photos (OS&D)
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Claim Numbers (Warranty)
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Return Justification (Overstock)
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-2">System Actions</h4>
                            <ul className="space-y-1 text-xs">
                              <li className="flex items-center gap-2">
                                <ArrowRight className="h-3 w-3 text-blue-500" />
                                Generate Return Request ID
                              </li>
                              <li className="flex items-center gap-2">
                                <ArrowRight className="h-3 w-3 text-blue-500" />
                                Validate Documentation
                              </li>
                              <li className="flex items-center gap-2">
                                <ArrowRight className="h-3 w-3 text-blue-500" />
                                Submit to SAP Workflow
                              </li>
                              <li className="flex items-center gap-2">
                                <ArrowRight className="h-3 w-3 text-blue-500" />
                                Send Confirmation to User
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                      <ArrowRight className="h-5 w-5" />
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                    </div>
                  </div>
                </div>

                {/* Step 3: SAP Review Process */}
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <Database className="h-6 w-6" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="bg-white border-2 border-yellow-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-gray-900">SAP Approval Process</h3>
                            <p className="text-sm text-gray-600 font-medium">SAP ERP System</p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Review Process</Badge>
                        </div>
                        <p className="text-gray-700 mb-4">
                          Automotive company reviews and approves/rejects return request in SAP
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Review Criteria</h4>
                            <ul className="space-y-1 text-xs">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Documentation Completeness
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Return Policy Compliance
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Part Condition Assessment
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Credit Amount Calculation
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Approval Outcomes</h4>
                            <ul className="space-y-1 text-xs">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Approved - Full Credit
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Approved - Partial Credit
                              </li>
                              <li className="flex items-center gap-2">
                                <AlertCircle className="h-3 w-3 text-red-500" />
                                Rejected - Policy Violation
                              </li>
                              <li className="flex items-center gap-2">
                                <Clock className="h-3 w-3 text-orange-500" />
                                Pending - More Info Needed
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                      <ArrowRight className="h-5 w-5" />
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Shipment Label Generation */}
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <Truck className="h-6 w-6" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="bg-white border-2 border-green-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-gray-900">Shipment Label Generation</h3>
                            <p className="text-sm text-gray-600 font-medium">SAP → Partner Portal</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Approved</Badge>
                        </div>
                        <p className="text-gray-700 mb-4">
                          Once approved, shipment label generated and return process initiated
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Label Generation</h4>
                            <ul className="space-y-1 text-xs">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                RMA Number Assignment
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Prepaid Shipping Label
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Return Instructions
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Packaging Requirements
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Portal Updates</h4>
                            <ul className="space-y-1 text-xs">
                              <li className="flex items-center gap-2">
                                <Bell className="h-3 w-3 text-blue-500" />
                                Approval Notification
                              </li>
                              <li className="flex items-center gap-2">
                                <Bell className="h-3 w-3 text-blue-500" />
                                Label Download Link
                              </li>
                              <li className="flex items-center gap-2">
                                <Bell className="h-3 w-3 text-blue-500" />
                                Return Status Update
                              </li>
                              <li className="flex items-center gap-2">
                                <Bell className="h-3 w-3 text-blue-500" />
                                Credit Amount Confirmation
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                      <ArrowRight className="h-5 w-5" />
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                    </div>
                  </div>
                </div>

                {/* Step 5: Credit Memo Generation */}
                <div className="relative mb-12">
                  <div className="flex items-start">
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg border-4 border-white">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                        5
                      </div>
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="bg-white border-2 border-blue-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-gray-900">Credit Memo & Documentation</h3>
                            <p className="text-sm text-gray-600 font-medium">SAP → Partner Portal Billing</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">Complete</Badge>
                        </div>
                        <p className="text-gray-700 mb-4">
                          Credit memo generated in SAP and reference document visible in Partner Portal billing section
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">SAP Processing</h4>
                            <ul className="space-y-1 text-xs">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Credit Memo Creation
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Account Credit Application
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Financial Document Generation
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                Audit Trail Creation
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Portal Visibility</h4>
                            <ul className="space-y-1 text-xs">
                              <li className="flex items-center gap-2">
                                <FileText className="h-3 w-3 text-blue-500" />
                                Credit Memo in Billing Section
                              </li>
                              <li className="flex items-center gap-2">
                                <FileText className="h-3 w-3 text-blue-500" />
                                Return Reference Document
                              </li>
                              <li className="flex items-center gap-2">
                                <FileText className="h-3 w-3 text-blue-500" />
                                Transaction History
                              </li>
                              <li className="flex items-center gap-2">
                                <FileText className="h-3 w-3 text-blue-500" />
                                Downloadable PDF
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Types Summary */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-red-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <h4 className="font-semibold text-sm">Recall Returns</h4>
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li>• Scrap documentation required</li>
                      <li>• Photo proof mandatory</li>
                      <li>• Automatic approval</li>
                      <li>• Full credit guaranteed</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-sm">Warranty Returns</h4>
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li>• Claim number required</li>
                      <li>• VIN validation needed</li>
                      <li>• Pre-approved parts only</li>
                      <li>• Standard processing time</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Package className="h-4 w-4 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-sm">Damaged (OS&D)</h4>
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li>• 48-hour window</li>
                      <li>• Photo evidence required</li>
                      <li>• Shipment verification</li>
                      <li>• Fast-track approval</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-yellow-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Truck className="h-4 w-4 text-yellow-600" />
                      </div>
                      <h4 className="font-semibold text-sm">Overstock</h4>
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li>• Prior approval required</li>
                      <li>• Restocking fee may apply</li>
                      <li>• Multiple orders supported</li>
                      <li>• Reason code mandatory</li>
                    </ul>
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
