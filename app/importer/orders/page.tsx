"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  Filter,
  Settings,
  Plus,
  FileText,
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertTriangle,
  Truck,
  Package,
  Receipt,
  Users,
  Download,
  Printer,
  Building2,
  CreditCard,
} from "lucide-react"

const mockOrders = [
  {
    id: "BULK-7830",
    bulkOrderRef: "BULK-7830",
    totalQuantity: 25,
    units: [
      { vehicle: "Air Pure - Quantum Grey", quantity: 10, configuration: "Pure RWD" },
      { vehicle: "Air Touring - Stellar White", quantity: 8, configuration: "Touring AWD" },
      { vehicle: "Air Pure - Zenith Red", quantity: 7, configuration: "Pure RWD" },
    ],
    orderDate: "Dec 15, 2024",
    priority: "High",
    avatar: "AM",
    invoices: [],
  },
  {
    id: "BULK-7831",
    bulkOrderRef: "BULK-7831",
    totalQuantity: 18,
    units: [
      { vehicle: "Air Grand Touring - Dream Silver", quantity: 12, configuration: "GT AWD" },
      { vehicle: "Air Sapphire - Cosmos Silver", quantity: 6, configuration: "Sapphire AWD" },
    ],
    orderDate: "Dec 12, 2024",
    priority: "Medium",
    avatar: "EM",
    invoices: [],
  },
  {
    id: "BULK-7832",
    bulkOrderRef: "BULK-7832",
    totalQuantity: 30,
    units: [
      { vehicle: "Air Pure - Infinite Black", quantity: 15, configuration: "Pure RWD" },
      { vehicle: "Air Touring - Quantum Grey", quantity: 10, configuration: "Touring AWD" },
      { vehicle: "Air Pure - Stellar White", quantity: 5, configuration: "Pure RWD" },
    ],
    orderDate: "Dec 10, 2024",
    priority: "Low",
    avatar: "MG",
    invoices: [],
  },
  {
    id: "BULK-7820",
    bulkOrderRef: "BULK-7820",
    totalQuantity: 20,
    units: [
      { vehicle: "Air Touring - Zenith Red", quantity: 12, configuration: "Touring AWD", status: "In Production" },
      { vehicle: "Air Pure - Quantum Grey", quantity: 8, configuration: "Pure RWD", status: "Scheduled" },
    ],
    productionStart: "Jan 5, 2025",
    progress: "75%",
    avatar: "PA",
    invoices: [
      {
        id: "INV-7820-01",
        amount: "$1,200,000",
        status: "Pending",
        invoiceDate: "Dec 20, 2024",
        dueDate: "Jan 19, 2025",
        paymentTerms: "Net 30",
        currency: "USD",
        poNumber: "PO-2024-7820",
        items: [
          {
            description: "Lucid Air Touring - Zenith Red",
            vin: "LUJA23456789012345",
            quantity: 12,
            unitPrice: "$89,500.00",
            vatRate: "21%",
            total: "$1,074,000.00",
          },
        ],
        subtotal: "$1,074,000.00",
        vat: "$225,540.00",
        total: "$1,299,540.00",
      },
    ],
  },
  {
    id: "BULK-7821",
    bulkOrderRef: "BULK-7821",
    totalQuantity: 18,
    units: [
      { vehicle: "Air Pure - Stellar White", quantity: 10, configuration: "Pure RWD", status: "In Production" },
      { vehicle: "Air Touring - Cosmos Silver", quantity: 8, configuration: "Touring AWD", status: "In Production" },
    ],
    productionStart: "Jan 8, 2025",
    progress: "60%",
    avatar: "LC",
    invoices: [],
  },
  {
    id: "BULK-7825",
    bulkOrderRef: "BULK-7825",
    totalQuantity: 12,
    units: [
      { vehicle: "Air Pure - Quantum Grey", quantity: 7, configuration: "Pure RWD", adjustmentType: "Color Change" },
      { vehicle: "Air Touring - Stellar White", quantity: 5, configuration: "Touring AWD", adjustmentType: "None" },
    ],
    adjustmentType: "Configuration Changes",
    requestDate: "Dec 10, 2024",
    avatar: "MA",
    invoices: [],
  },
  {
    id: "BULK-7815",
    bulkOrderRef: "BULK-7815",
    totalQuantity: 14,
    units: [
      { vehicle: "Air Pure - Stellar White", quantity: 8, configuration: "Pure RWD", status: "Shipped" },
      { vehicle: "Air Touring - Zenith Red", quantity: 6, configuration: "Touring AWD", status: "In Transit" },
    ],
    trackingNumber: "LC123456789",
    estimatedDelivery: "Dec 22, 2024",
    avatar: "CM",
    invoices: [
      {
        id: "INV-7815-01",
        amount: "$800,000",
        status: "Paid",
        invoiceDate: "Dec 10, 2024",
        dueDate: "Jan 9, 2025",
        paymentTerms: "Net 30",
        currency: "USD",
        poNumber: "PO-2024-7815",
        paymentDate: "Dec 15, 2024",
        paymentMethod: "Bank Transfer",
        paymentReference: "TXN-789456123",
        items: [
          {
            description: "Lucid Air Pure - Stellar White",
            vin: "LUJA23456789012346",
            quantity: 8,
            unitPrice: "$75,000.00",
            vatRate: "21%",
            total: "$600,000.00",
          },
        ],
        subtotal: "$600,000.00",
        vat: "$126,000.00",
        total: "$726,000.00",
      },
      {
        id: "INV-7815-02",
        amount: "$600,000",
        status: "Pending",
        invoiceDate: "Dec 12, 2024",
        dueDate: "Jan 11, 2025",
        paymentTerms: "Net 30",
        currency: "USD",
        poNumber: "PO-2024-7815",
        items: [
          {
            description: "Lucid Air Touring - Zenith Red",
            vin: "LUJA23456789012347",
            quantity: 6,
            unitPrice: "$89,500.00",
            vatRate: "21%",
            total: "$537,000.00",
          },
        ],
        subtotal: "$537,000.00",
        vat: "$112,770.00",
        total: "$649,770.00",
      },
    ],
  },
  {
    id: "BULK-7810",
    bulkOrderRef: "BULK-7810",
    totalQuantity: 22,
    units: [
      { vehicle: "Air Pure - Quantum Grey", quantity: 12, configuration: "Pure RWD", status: "Delivered" },
      { vehicle: "Air Touring - Stellar White", quantity: 10, configuration: "Touring AWD", status: "Delivered" },
    ],
    deliveryDate: "Dec 15, 2024",
    satisfaction: "5/5",
    avatar: "PN",
    invoices: [
      {
        id: "INV-7810-01",
        amount: "$1,200,000",
        status: "Paid",
        invoiceDate: "Nov 20, 2024",
        dueDate: "Dec 20, 2024",
        paymentTerms: "Net 30",
        currency: "USD",
        poNumber: "PO-2024-7810",
        paymentDate: "Dec 18, 2024",
        paymentMethod: "Bank Transfer",
        paymentReference: "TXN-789456124",
        items: [
          {
            description: "Lucid Air Pure - Quantum Grey",
            vin: "LUJA23456789012348",
            quantity: 12,
            unitPrice: "$75,000.00",
            vatRate: "21%",
            total: "$900,000.00",
          },
        ],
        subtotal: "$900,000.00",
        vat: "$189,000.00",
        total: "$1,089,000.00",
      },
      {
        id: "INV-7810-02",
        amount: "$1,000,000",
        status: "Paid",
        invoiceDate: "Nov 25, 2024",
        dueDate: "Dec 25, 2024",
        paymentTerms: "Net 30",
        currency: "USD",
        poNumber: "PO-2024-7810",
        paymentDate: "Dec 20, 2024",
        paymentMethod: "Bank Transfer",
        paymentReference: "TXN-789456125",
        items: [
          {
            description: "Lucid Air Touring - Stellar White",
            vin: "LUJA23456789012349",
            quantity: 10,
            unitPrice: "$89,500.00",
            vatRate: "21%",
            total: "$895,000.00",
          },
        ],
        subtotal: "$895,000.00",
        vat: "$187,950.00",
        total: "$1,082,950.00",
      },
    ],
  },
  {
    id: "BULK-7811",
    bulkOrderRef: "BULK-7811",
    totalQuantity: 16,
    units: [
      {
        vehicle: "Air Dream Edition - Cosmos Silver",
        quantity: 6,
        configuration: "Dream Edition",
        status: "Delivered",
      },
      { vehicle: "Air Touring - Zenith Red", quantity: 10, configuration: "Touring AWD", status: "Delivered" },
    ],
    deliveryDate: "Dec 12, 2024",
    satisfaction: "4/5",
    avatar: "EA",
    invoices: [
      {
        id: "INV-7811-01",
        amount: "$900,000",
        status: "Paid",
        invoiceDate: "Nov 15, 2024",
        dueDate: "Dec 15, 2024",
        paymentTerms: "Net 30",
        currency: "USD",
        poNumber: "PO-2024-7811",
        paymentDate: "Dec 17, 2024",
        paymentMethod: "Bank Transfer",
        paymentReference: "TXN-789456126",
        items: [
          {
            description: "Lucid Air Dream Edition - Cosmos Silver",
            vin: "LUJA23456789012350",
            quantity: 6,
            unitPrice: "$150,000.00",
            vatRate: "21%",
            total: "$900,000.00",
          },
        ],
        subtotal: "$900,000.00",
        vat: "$189,000.00",
        total: "$1,089,000.00",
      },
      {
        id: "INV-7811-02",
        amount: "$1,000,000",
        status: "Paid",
        invoiceDate: "Nov 20, 2024",
        dueDate: "Dec 20, 2024",
        paymentTerms: "Net 30",
        currency: "USD",
        poNumber: "PO-2024-7811",
        paymentDate: "Dec 19, 2024",
        paymentMethod: "Bank Transfer",
        paymentReference: "TXN-789456127",
        items: [
          {
            description: "Lucid Air Touring - Zenith Red",
            vin: "LUJA23456789012351",
            quantity: 10,
            unitPrice: "$89,500.00",
            vatRate: "21%",
            total: "$895,000.00",
          },
        ],
        subtotal: "$895,000.00",
        vat: "$187,950.00",
        total: "$1,082,950.00",
      },
    ],
  },
]

const mockKanbanOrders = {
  pending: mockOrders.filter(
    (order) => order.id.includes("7830") || order.id.includes("7831") || order.id.includes("7832"),
  ),
  confirmed: mockOrders.filter((order) => order.id.includes("7820") || order.id.includes("7821")),
  adjustments: mockOrders.filter((order) => order.id.includes("7825")),
  inTransit: mockOrders.filter((order) => order.id.includes("7815")),
  delivered: mockOrders.filter((order) => order.id.includes("7810") || order.id.includes("7811")),
}

export default function OrderManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false)
  const [activeInvoiceTab, setActiveInvoiceTab] = useState("invoice-details")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const router = useRouter()

  const handleInvoiceClick = (invoice: any) => {
    setSelectedInvoice(invoice)
    setShowInvoiceDialog(true)
  }

  const handleOrderDetailsClick = (order: any) => {
    setSelectedOrder(order)
    setShowOrderDialog(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getColumnIcon = (column: string) => {
    switch (column) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "adjustments":
        return <AlertTriangle className="h-4 w-4" />
      case "inTransit":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <Package className="h-4 w-4" />
      default:
        return <ShoppingCart className="h-4 w-4" />
    }
  }

  const getColumnColor = (column: string) => {
    switch (column) {
      case "pending":
        return "border-t-orange-500 bg-orange-50"
      case "confirmed":
        return "border-t-blue-500 bg-blue-50"
      case "adjustments":
        return "border-t-yellow-500 bg-yellow-50"
      case "inTransit":
        return "border-t-purple-500 bg-purple-50"
      case "delivered":
        return "border-t-green-500 bg-green-50"
      default:
        return "border-t-gray-500 bg-gray-50"
    }
  }

  const renderOrderCard = (order: any, column: string) => (
    <Card key={order.id} className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{order.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-sm">{order.bulkOrderRef}</div>
            </div>
          </div>
          {order.priority && (
            <Badge variant="outline" className={`text-xs ${getPriorityColor(order.priority)}`}>
              {order.priority}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{order.totalQuantity} total units</span>
          </div>

          <div className="space-y-1">
            {order.units.slice(0, 2).map((unit: any, index: number) => (
              <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                <div className="font-medium">{unit.vehicle}</div>
                <div className="text-muted-foreground">
                  {unit.configuration} • Qty: {unit.quantity}
                </div>
              </div>
            ))}
            {order.units.length > 2 && (
              <div className="text-xs text-muted-foreground text-center py-1">+{order.units.length - 2} more units</div>
            )}
          </div>

          {order.invoices.length > 0 && (
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center gap-1 mb-1">
                <Receipt className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Invoices ({order.invoices.length})</span>
              </div>
              {order.invoices.map((invoice: any, index: number) => (
                <div
                  key={index}
                  className="text-xs bg-blue-50 p-2 rounded mb-1 cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => handleInvoiceClick(invoice)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{invoice.id}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        invoice.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground">{invoice.amount}</div>
                </div>
              ))}
            </div>
          )}

          {column === "pending" && <div className="text-xs text-muted-foreground">Order Date: {order.orderDate}</div>}

          {column === "confirmed" && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Production: {order.productionStart}</div>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: order.progress }}></div>
                </div>
                <span className="text-xs text-muted-foreground">{order.progress}</span>
              </div>
            </div>
          )}

          {column === "adjustments" && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Type: {order.adjustmentType}</div>
              <div className="text-xs text-muted-foreground">Requested: {order.requestDate}</div>
            </div>
          )}

          {column === "inTransit" && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground font-mono">{order.trackingNumber}</div>
              <div className="text-xs text-muted-foreground">ETA: {order.estimatedDelivery}</div>
            </div>
          )}

          {column === "delivered" && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Delivered: {order.deliveryDate}</div>
              <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">
                ⭐ {order.satisfaction}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 mt-3">
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => handleOrderDetailsClick(order)}>
            <Eye className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
            <FileText className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black">Bulk Order Management</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage bulk orders with child orders and invoices through their complete lifecycle.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search orders..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Order Suggestions
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/importer/orders/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 h-[calc(100vh-300px)]">
        {Object.entries(mockKanbanOrders).map(([column, orders]) => (
          <div key={column} className="flex flex-col">
            <Card className={`border-t-4 ${getColumnColor(column)} mb-4`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold capitalize">
                  {getColumnIcon(column)}
                  {column === "inTransit" ? "In Transit" : column}
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {orders.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>

            <div className="flex-1 overflow-y-auto space-y-2">
              {orders.map((order) => renderOrderCard(order, column))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Invoice Details - {selectedInvoice?.id}</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedInvoice && (
            <Tabs value={activeInvoiceTab} onValueChange={setActiveInvoiceTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="invoice-details">Invoice Details</TabsTrigger>
                <TabsTrigger value="payment-options">Payment Options</TabsTrigger>
                <TabsTrigger value="payment-history">Payment History</TabsTrigger>
              </TabsList>

              <TabsContent value="invoice-details" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-2 space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">{selectedInvoice.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">Generated from Bulk Order</p>
                          </div>
                          <Badge
                            variant="secondary"
                            className={
                              selectedInvoice.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {selectedInvoice.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <h4 className="font-semibold mb-2">Bill To:</h4>
                            <div className="text-sm space-y-1">
                              <div className="font-medium">Belgium Auto Imports B.V.</div>
                              <div>Industrieweg 123</div>
                              <div>2030 Antwerp, Belgium</div>
                              <div>VAT: BE0123456789</div>
                              <div>Contact: John Doe</div>
                              <div>john.doe@belgiumimports.com</div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Invoice Details:</h4>
                            <div className="text-sm space-y-1">
                              <div className="flex justify-between">
                                <span>Invoice Date:</span>
                                <span>{selectedInvoice.invoiceDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Due Date:</span>
                                <span>{selectedInvoice.dueDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Payment Terms:</span>
                                <span>{selectedInvoice.paymentTerms}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Currency:</span>
                                <span>{selectedInvoice.currency}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>PO Number:</span>
                                <span>{selectedInvoice.poNumber}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold mb-4">Order Items</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Description</th>
                                  <th className="text-center py-2">Quantity</th>
                                  <th className="text-right py-2">Unit Price</th>
                                  <th className="text-right py-2">VAT Rate</th>
                                  <th className="text-right py-2">Total</th>
                                </tr>
                              </thead>
                              <tbody className="text-sm">
                                {selectedInvoice.items.map((item: any, index: number) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-3">
                                      <div className="font-medium">{item.description}</div>
                                      <div className="text-muted-foreground">VIN: {item.vin}</div>
                                    </td>
                                    <td className="text-center py-3">{item.quantity}</td>
                                    <td className="text-right py-3">{item.unitPrice}</td>
                                    <td className="text-right py-3">{item.vatRate}</td>
                                    <td className="text-right py-3">{item.total}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="mt-4 space-y-2 text-right">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>{selectedInvoice.subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>VAT:</span>
                              <span>{selectedInvoice.vat}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                              <span>Total:</span>
                              <span>{selectedInvoice.total}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                          Payment Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <Badge
                            variant="secondary"
                            className={
                              selectedInvoice.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {selectedInvoice.status === "Paid" ? "Paid in Full" : "Pending Payment"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span className="font-medium">{selectedInvoice.total}</span>
                        </div>
                        {selectedInvoice.paymentDate && (
                          <>
                            <div className="flex justify-between">
                              <span>Payment Date:</span>
                              <span>{selectedInvoice.paymentDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Payment Method:</span>
                              <span>{selectedInvoice.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Reference:</span>
                              <span>{selectedInvoice.paymentReference}</span>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <FileText className="mr-2 h-5 w-5" />
                          Documents
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Complete payment audit trail for this invoice</p>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          Certificate of Conformity
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          Customs Clearance
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          Delivery Receipt
                        </Button>
                        {selectedInvoice.status === "Paid" && (
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Download className="mr-2 h-4 w-4" />
                            Proof of Payment
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment-options" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building2 className="mr-2 h-5 w-5" />
                        Bank Transfer
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Direct bank transfer for wholesale orders</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Account Name:</span>
                          <span>Lucid Group Netherlands B.V.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">IBAN:</span>
                          <span>NL91 ABNA 0417 1643 00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">BIC/SWIFT:</span>
                          <span>ABNANL2A</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Bank:</span>
                          <span>ABN AMRO Bank N.V.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Reference:</span>
                          <span>{selectedInvoice.id}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Financing Options
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Partner financing programs available</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Partner Rate Financing</h4>
                          <Badge variant="secondary">2.9% APR</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Special financing rates for certified partners
                        </p>
                      </div>
                      <Button className="w-full">Apply for Financing</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="payment-history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <p className="text-sm text-muted-foreground">Complete payment audit trail for this invoice</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {selectedInvoice.status === "Paid" && selectedInvoice.paymentDate && (
                        <div className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Payment Received</h4>
                              <div className="text-right">
                                <div className="font-medium">{selectedInvoice.total}</div>
                                <div className="text-sm text-muted-foreground">{selectedInvoice.paymentDate}</div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Bank transfer completed successfully</p>
                            <div className="mt-2 text-sm space-y-1">
                              <div>
                                <strong>Reference:</strong> {selectedInvoice.paymentReference}
                              </div>
                              <div>
                                <strong>Method:</strong> {selectedInvoice.paymentMethod}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Invoice Generated</h4>
                            <div className="text-right">
                              <div className="font-medium">{selectedInvoice.total}</div>
                              <div className="text-sm text-muted-foreground">{selectedInvoice.invoiceDate}</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Invoice created and sent to partner</p>
                          <div className="mt-2 text-sm space-y-1">
                            <div>
                              <strong>Due Date:</strong> {selectedInvoice.dueDate}
                            </div>
                            <div>
                              <strong>Terms:</strong> {selectedInvoice.paymentTerms}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Order Details - {selectedOrder?.bulkOrderRef}</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Order
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Order Summary</span>
                      {selectedOrder.priority && (
                        <Badge variant="outline" className={getPriorityColor(selectedOrder.priority)}>
                          {selectedOrder.priority} Priority
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-semibold mb-2">Customer Information:</h4>
                        <div className="text-sm space-y-1">
                          <div className="font-medium">{selectedOrder.customer}</div>
                          <div>Order Reference: {selectedOrder.bulkOrderRef}</div>
                          <div>Total Units: {selectedOrder.totalQuantity}</div>
                          <div>Unit Types: {selectedOrder.units.length}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Order Timeline:</h4>
                        <div className="text-sm space-y-1">
                          {selectedOrder.orderDate && (
                            <div className="flex justify-between">
                              <span>Order Date:</span>
                              <span>{selectedOrder.orderDate}</span>
                            </div>
                          )}
                          {selectedOrder.productionStart && (
                            <div className="flex justify-between">
                              <span>Production Start:</span>
                              <span>{selectedOrder.productionStart}</span>
                            </div>
                          )}
                          {selectedOrder.estimatedDelivery && (
                            <div className="flex justify-between">
                              <span>Est. Delivery:</span>
                              <span>{selectedOrder.estimatedDelivery}</span>
                            </div>
                          )}
                          {selectedOrder.deliveryDate && (
                            <div className="flex justify-between">
                              <span>Delivered:</span>
                              <span>{selectedOrder.deliveryDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedOrder.progress && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Production Progress</span>
                          <span className="text-sm text-muted-foreground">{selectedOrder.progress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: selectedOrder.progress }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="mr-2 h-5 w-5" />
                      Order Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center">
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        {selectedOrder.id.includes("7830") || selectedOrder.id.includes("7831")
                          ? "Pending"
                          : selectedOrder.id.includes("7820") || selectedOrder.id.includes("7821")
                            ? "Confirmed"
                            : selectedOrder.id.includes("7825")
                              ? "Adjustments"
                              : selectedOrder.id.includes("7815")
                                ? "In Transit"
                                : "Delivered"}
                      </Badge>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Tracking Number</div>
                        <div className="font-mono text-sm">{selectedOrder.trackingNumber}</div>
                      </div>
                    )}
                    {selectedOrder.satisfaction && (
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                        <div className="text-lg">⭐ {selectedOrder.satisfaction}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Unit Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Unit Details</CardTitle>
                  <p className="text-sm text-muted-foreground">Detailed breakdown of all units in this bulk order</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Vehicle Model</th>
                          <th className="text-left py-2">Configuration</th>
                          <th className="text-center py-2">Quantity</th>
                          <th className="text-left py-2">Status</th>
                          {selectedOrder.units.some((unit: any) => unit.adjustmentType) && (
                            <th className="text-left py-2">Adjustments</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {selectedOrder.units.map((unit: any, index: number) => (
                          <tr key={index} className="border-b">
                            <td className="py-3">
                              <div className="font-medium">{unit.vehicle}</div>
                            </td>
                            <td className="py-3">{unit.configuration}</td>
                            <td className="text-center py-3">
                              <Badge variant="outline">{unit.quantity}</Badge>
                            </td>
                            <td className="py-3">
                              {unit.status && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                  {unit.status}
                                </Badge>
                              )}
                            </td>
                            {selectedOrder.units.some((u: any) => u.adjustmentType) && (
                              <td className="py-3">
                                {unit.adjustmentType && (
                                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                                    {unit.adjustmentType}
                                  </Badge>
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Invoices Summary */}
              {selectedOrder.invoices.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Receipt className="mr-2 h-5 w-5" />
                      Associated Invoices ({selectedOrder.invoices.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {selectedOrder.invoices.map((invoice: any, index: number) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleInvoiceClick(invoice)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{invoice.id}</div>
                            <Badge
                              variant="outline"
                              className={
                                invoice.status === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {invoice.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>Amount: {invoice.amount}</div>
                            <div>Due: {invoice.dueDate}</div>
                            {invoice.paymentDate && <div>Paid: {invoice.paymentDate}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
