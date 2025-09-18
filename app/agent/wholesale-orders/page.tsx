"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
} from "lucide-react"

const mockOrders = [
  {
    id: "BULK-A830",
    bulkOrderRef: "BULK-A830",
    totalQuantity: 25,
    units: [
      { vehicle: "Air Pure - Quantum Grey", quantity: 10, configuration: "Pure RWD" },
      { vehicle: "Air Touring - Stellar White", quantity: 8, configuration: "Touring AWD" },
      { vehicle: "Air Pure - Zenith Red", quantity: 7, configuration: "Pure RWD" },
    ],
    orderDate: "Dec 15, 2024",
    priority: "High",
    avatar: "DC",
    invoices: [],
  },
  {
    id: "BULK-A831",
    bulkOrderRef: "BULK-A831",
    totalQuantity: 18,
    units: [
      { vehicle: "Air Grand Touring - Dream Silver", quantity: 12, configuration: "GT AWD" },
      { vehicle: "Air Sapphire - Cosmos Silver", quantity: 6, configuration: "Sapphire AWD" },
    ],
    orderDate: "Dec 12, 2024",
    priority: "Medium",
    avatar: "FL",
    invoices: [],
  },
  {
    id: "BULK-A832",
    bulkOrderRef: "BULK-A832",
    totalQuantity: 30,
    units: [
      { vehicle: "Air Pure - Infinite Black", quantity: 15, configuration: "Pure RWD" },
      { vehicle: "Air Touring - Quantum Grey", quantity: 10, configuration: "Touring AWD" },
      { vehicle: "Air Pure - Stellar White", quantity: 5, configuration: "Pure RWD" },
    ],
    orderDate: "Dec 10, 2024",
    priority: "Low",
    avatar: "TM",
    invoices: [],
  },
  {
    id: "BULK-A820",
    bulkOrderRef: "BULK-A820",
    totalQuantity: 20,
    units: [
      { vehicle: "Air Touring - Zenith Red", quantity: 12, configuration: "Touring AWD", status: "In Production" },
      { vehicle: "Air Pure - Quantum Grey", quantity: 8, configuration: "Pure RWD", status: "Scheduled" },
    ],
    productionStart: "Jan 5, 2025",
    progress: "75%",
    avatar: "CA",
    invoices: [
      {
        id: "INV-A820-01",
        amount: "$1,200,000",
        status: "Pending",
        invoiceDate: "Dec 20, 2024",
        dueDate: "Jan 19, 2025",
        paymentTerms: "Net 30",
        currency: "USD",
        poNumber: "PO-2024-A820",
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
    id: "BULK-A821",
    bulkOrderRef: "BULK-A821",
    totalQuantity: 18,
    units: [
      { vehicle: "Air Pure - Stellar White", quantity: 10, configuration: "Pure RWD", status: "In Production" },
      { vehicle: "Air Touring - Cosmos Silver", quantity: 8, configuration: "Touring AWD", status: "In Production" },
    ],
    productionStart: "Jan 8, 2025",
    progress: "60%",
    avatar: "DS",
    invoices: [],
  },
  {
    id: "BULK-A825",
    bulkOrderRef: "BULK-A825",
    totalQuantity: 12,
    units: [
      { vehicle: "Air Pure - Quantum Grey", quantity: 7, configuration: "Pure RWD", adjustmentType: "Color Change" },
      { vehicle: "Air Touring - Stellar White", quantity: 5, configuration: "Touring AWD", adjustmentType: "None" },
    ],
    adjustmentType: "Configuration Changes",
    requestDate: "Dec 10, 2024",
    avatar: "JW",
    invoices: [],
  },
  {
    id: "BULK-A815",
    bulkOrderRef: "BULK-A815",
    totalQuantity: 14,
    units: [
      { vehicle: "Air Pure - Stellar White", quantity: 8, configuration: "Pure RWD", status: "Shipped" },
      { vehicle: "Air Touring - Zenith Red", quantity: 6, configuration: "Touring AWD", status: "In Transit" },
    ],
    trackingNumber: "LC123456789",
    estimatedDelivery: "Dec 22, 2024",
    avatar: "RM",
    invoices: [
      {
        id: "INV-A815-01",
        amount: "$800,000",
        status: "Paid",
        invoiceDate: "Dec 10, 2024",
        dueDate: "Jan 9, 2025",
        paymentTerms: "Net 30",
        currency: "USD",
        poNumber: "PO-2024-A815",
        paymentDate: "Dec 15, 2024",
        paymentMethod: "Bank Transfer",
        paymentReference: "TXN-A89456123",
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
    ],
  },
  {
    id: "BULK-A810",
    bulkOrderRef: "BULK-A810",
    totalQuantity: 22,
    units: [
      { vehicle: "Air Pure - Quantum Grey", quantity: 12, configuration: "Pure RWD", status: "Delivered" },
      { vehicle: "Air Touring - Stellar White", quantity: 10, configuration: "Touring AWD", status: "Delivered" },
    ],
    deliveryDate: "Dec 15, 2024",
    satisfaction: "5/5",
    avatar: "KL",
    invoices: [
      {
        id: "INV-A810-01",
        amount: "$1,200,000",
        status: "Paid",
        invoiceDate: "Nov 20, 2024",
        dueDate: "Dec 20, 2024",
        paymentTerms: "Net 30",
        currency: "USD",
        poNumber: "PO-2024-A810",
        paymentDate: "Dec 18, 2024",
        paymentMethod: "Bank Transfer",
        paymentReference: "TXN-A89456124",
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
    ],
  },
]

const mockKanbanOrders = {
  pending: mockOrders.filter(
    (order) => order.id.includes("A830") || order.id.includes("A831") || order.id.includes("A832"),
  ),
  confirmed: mockOrders.filter((order) => order.id.includes("A820") || order.id.includes("A821")),
  adjustments: mockOrders.filter((order) => order.id.includes("A825")),
  inTransit: mockOrders.filter((order) => order.id.includes("A815")),
  delivered: mockOrders.filter((order) => order.id.includes("A810")),
}

export default function WholesaleOrderManagementPage() {
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
        <h1 className="text-3xl font-bold tracking-tight text-black">Wholesale Order Management</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage wholesale bulk orders through their complete lifecycle for agent customers.
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
            onClick={() => router.push("/agent/wholesale-orders/new")}
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

          {/* ... existing invoice dialog content ... */}
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

          {/* ... existing order dialog content ... */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
