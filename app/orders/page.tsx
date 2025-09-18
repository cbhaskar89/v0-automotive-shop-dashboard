"use client"

import * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Search,
  Scan,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  ShoppingCart,
  Zap,
  Eye,
  Wrench,
} from "lucide-react"

const PartSearch = React.lazy(() =>
  import("@/components/parts/part-search").catch(() => ({ default: () => <div>Loading...</div> })),
)
const CartDrawer = React.lazy(() =>
  import("@/components/parts/cart-drawer").catch(() => ({ default: () => <div>Loading...</div> })),
)
const EPC3DCatalog = React.lazy(() =>
  import("@/components/parts/epc-3d-catalog").catch(() => ({ default: () => <div>Loading...</div> })),
)
const BulkUpload = React.lazy(() =>
  import("@/components/parts/bulk-upload").catch(() => ({ default: () => <div>Loading...</div> })),
)
const CarPartsCatalog = React.lazy(() =>
  import("@/components/parts/car-parts-catalog").catch(() => ({ default: () => <div>Loading...</div> })),
)

let getMockPartsByVIN: any = () => []
let getMockPartsCatalog: any = () => []
let useToast: any = () => ({ toast: () => {} })

try {
  const dataModule = require("@/lib/data")
  getMockPartsByVIN = dataModule.getMockPartsByVIN || (() => [])
  getMockPartsCatalog = dataModule.getMockPartsCatalog || (() => [])
} catch (error) {
  console.error("Data import error:", error)
}

try {
  const toastModule = require("@/hooks/use-toast")
  useToast = toastModule.useToast || (() => ({ toast: () => {} }))
} catch (error) {
  console.error("Toast import error:", error)
}

interface CartItem {
  part: any
  qty: number
}

const OrdersPage = () => {
  const [mounted, setMounted] = React.useState(false)
  const toastHook = useToast()
  const toast = toastHook?.toast || (() => {})

  const [cart, setCart] = React.useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("order")
  const [vin, setVin] = React.useState("")
  const [vinValid, setVinValid] = React.useState<boolean | null>(null)
  const [vinParts, setVinParts] = React.useState<any[]>([])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const [placedOrders] = React.useState([
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "In Transit",
      items: 5,
      total: "$1,245.50",
      estimatedDelivery: "2024-01-18",
      trackingNumber: "1Z999AA1234567890",
      carrier: "FedEx",
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-12",
      status: "Delivered",
      items: 3,
      total: "$892.25",
      estimatedDelivery: "2024-01-15",
      trackingNumber: "1Z999AA1234567891",
      carrier: "UPS",
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-10",
      status: "Processing",
      items: 8,
      total: "$2,156.75",
      estimatedDelivery: "2024-01-20",
      trackingNumber: "Pending",
      carrier: "FedEx",
    },
  ])

  function addToCart(part: any, qty: number) {
    if (!mounted) return
    setCart((prev) => {
      const found = prev.find((p) => p.part.partNumber === part.partNumber)
      if (found) {
        return prev.map((p) => (p.part.partNumber === part.partNumber ? { ...p, qty: p.qty + qty } : p))
      }
      return [...prev, { part, qty }]
    })
  }

  function addBulkToCart(items: CartItem[]) {
    if (!mounted) return
    setCart((prev) => {
      const newCart = [...prev]
      items.forEach(({ part, qty }) => {
        const found = newCart.find((p) => p.part.partNumber === part.partNumber)
        if (found) {
          found.qty += qty
        } else {
          newCart.push({ part, qty })
        }
      })
      return newCart
    })
  }

  function removeFromCart(partNumber: string) {
    if (!mounted) return
    setCart((prev) => prev.filter((p) => p.part.partNumber !== partNumber))
  }

  function updateQty(partNumber: string, qty: number) {
    if (!mounted) return
    setCart((prev) => prev.map((p) => (p.part.partNumber === partNumber ? { ...p, qty } : p)))
  }

  async function onCheckout(payload: { items: CartItem[]; paymentType: string; shippingType: string; vin?: string }) {
    if (!mounted) return
    await new Promise((r) => setTimeout(r, 700))
    const orderId = Math.floor(Math.random() * 900000 + 100000).toString()

    try {
      if (toast && typeof toast === "function") {
        toast({
          title: "Order placed successfully",
          description: `Order #${orderId} confirmed. ETA: ${payload.shippingType === "Expedite" ? "2-3" : "5-7"} days.`,
        })
      }
    } catch (error) {
      console.error("Toast error:", error)
    }
    setCart([])
  }

  function openCart() {
    if (!mounted) return
    setCartOpen(true)
  }

  function validateVin(v: string) {
    if (!mounted) return
    const ok = /^[A-HJ-NPR-Z0-9]{17}$/i.test(v)
    setVinValid(ok)

    try {
      setVinParts(ok ? getMockPartsByVIN(v) : [])
    } catch (error) {
      console.error("VIN parts error:", error)
      setVinParts([])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge className="bg-accent text-accent-foreground">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      case "In Transit":
        return (
          <Badge className="bg-primary text-primary-foreground">
            <Truck className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      case "Processing":
        return (
          <Badge className="bg-chart-4 text-white">
            <Clock className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  let mockPartsCatalog: any[] = []
  try {
    mockPartsCatalog = getMockPartsCatalog() || []
  } catch (error) {
    console.error("Mock parts catalog error:", error)
    mockPartsCatalog = []
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Package className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="flex items-center gap-4 border-b bg-card/50 h-16 px-6">
        <SidebarTrigger />
        <div className="flex items-center gap-3">
          <Package className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-xl font-semibold text-foreground">Parts Order & Tracking</h1>
            <p className="text-sm text-muted-foreground">Streamlined automotive parts ordering system</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {cart.length > 0 && (
            <Badge className="bg-accent text-accent-foreground">
              <ShoppingCart className="h-3 w-3 mr-1" />
              {cart.length} items
            </Badge>
          )}
          <React.Suspense fallback={<div>Loading...</div>}>
            <CartDrawer
              items={cart}
              onRemove={removeFromCart}
              onUpdateQty={updateQty}
              onCheckout={onCheckout}
              vin={vinValid ? vin : undefined}
              open={cartOpen}
              onOpenChange={setCartOpen}
            />
          </React.Suspense>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/50">
            <TabsTrigger value="order" className="flex items-center gap-2 text-sm font-medium">
              <Package className="h-4 w-4" />
              Place Order
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2 text-sm font-medium">
              <Truck className="h-4 w-4" />
              Order Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="order" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Stock Orders</CardTitle>
                      <CardDescription className="text-xs">Bulk & catalog ordering</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                      <Scan className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">VIN-Based</CardTitle>
                      <CardDescription className="text-xs">Vehicle-specific parts</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-chart-2/10 rounded-lg group-hover:bg-chart-2/20 transition-colors">
                      <Eye className="h-5 w-5 text-chart-2" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">3D Catalog</CardTitle>
                      <CardDescription className="text-xs">Interactive visualization</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-chart-4/10 rounded-lg group-hover:bg-chart-4/20 transition-colors">
                      <Zap className="h-5 w-5 text-chart-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Quick Order</CardTitle>
                      <CardDescription className="text-xs">Fast reordering</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <Tabs defaultValue="stock" className="space-y-6">
              <TabsList className="bg-muted/50 h-11">
                <TabsTrigger value="stock" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Stock Order
                </TabsTrigger>
                <TabsTrigger value="vin" className="flex items-center gap-2">
                  <Scan className="h-4 w-4" />
                  VIN-based Order
                </TabsTrigger>
                <TabsTrigger value="3d" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  3D Catalog (EPC)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stock" className="space-y-6">
                <React.Suspense fallback={<div>Loading bulk upload...</div>}>
                  <BulkUpload onAddBulk={addBulkToCart} />
                </React.Suspense>

                <Tabs defaultValue="search" className="w-full">
                  <TabsList className="bg-muted/50">
                    <TabsTrigger value="search" className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Search Catalog
                    </TabsTrigger>
                    <TabsTrigger value="visual" className="flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      Visual Car Parts
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="search">
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Search className="h-5 w-5 text-primary" />
                          Browse Catalog
                        </CardTitle>
                        <CardDescription>
                          Search by category, part number, description, or vehicle model
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <React.Suspense fallback={<div>Loading part search...</div>}>
                          <PartSearch parts={mockPartsCatalog} onAdd={addToCart} />
                        </React.Suspense>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="visual">
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wrench className="h-5 w-5 text-accent" />
                          Visual Parts Selection
                        </CardTitle>
                        <CardDescription>Click on car parts to add them directly to your cart</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <React.Suspense fallback={<div>Loading car parts catalog...</div>}>
                          <CarPartsCatalog parts={mockPartsCatalog} onAdd={addToCart} />
                        </React.Suspense>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="vin" className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scan className="h-5 w-5 text-accent" />
                      Vehicle Identification
                    </CardTitle>
                    <CardDescription>Enter VIN to fetch vehicle genealogy and suggested parts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="vin" className="text-sm font-medium">
                          Enter VIN#
                        </Label>
                        <Input
                          id="vin"
                          placeholder="17-character VIN"
                          value={vin}
                          onChange={(e) => setVin(e.target.value.toUpperCase())}
                          onBlur={() => validateVin(vin)}
                          className="font-mono"
                        />
                        {vinValid === false && (
                          <div className="flex items-center gap-2 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            Invalid VIN format.
                          </div>
                        )}
                        {vinValid && (
                          <div className="flex items-center gap-2 text-sm text-accent">
                            <CheckCircle className="h-4 w-4" />
                            VIN validated. Showing suggested parts.
                          </div>
                        )}
                      </div>
                      <div className="flex items-end">
                        <Button onClick={() => validateVin(vin)} className="w-full">
                          <Scan className="h-4 w-4 mr-2" />
                          Validate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>VIN-specific Parts</CardTitle>
                    <CardDescription>Supersession and pricing shown based on genealogy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <React.Suspense fallback={<div>Loading VIN parts...</div>}>
                      <PartSearch parts={vinParts} onAdd={addToCart} />
                    </React.Suspense>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="3d" className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-chart-2" />
                      3D Parts Catalog
                    </CardTitle>
                    <CardDescription>Interactive 3D visualization powered by EPC (Cortona) integration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <React.Suspense fallback={<div>Loading 3D catalog...</div>}>
                      <EPC3DCatalog onAdd={addToCart} onOpenCart={openCart} />
                    </React.Suspense>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Order Tracking
                </CardTitle>
                <CardDescription>Track the status of your placed orders and delivery information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {placedOrders.map((order) => (
                    <Card
                      key={order.id}
                      className="border-l-4 border-l-primary/20 hover:border-l-primary transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                          </div>
                          <div className="text-right">{getStatusBadge(order.status)}</div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Items</p>
                            <p className="font-medium">{order.items} parts</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Total</p>
                            <p className="font-medium text-lg">{order.total}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Est. Delivery</p>
                            <p className="font-medium">{order.estimatedDelivery}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Carrier</p>
                            <p className="font-medium">{order.carrier}</p>
                          </div>
                        </div>

                        {order.trackingNumber !== "Pending" && (
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground">Tracking:</span>
                              <code className="text-sm bg-muted px-3 py-1 rounded font-mono">
                                {order.trackingNumber}
                              </code>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-primary hover:text-primary-foreground bg-transparent"
                            >
                              <Truck className="h-4 w-4 mr-2" />
                              Track Package
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

export default OrdersPage
