"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, CheckCircle, Clock, AlertCircle, ExternalLink } from "lucide-react"
import { getMockOrders } from "@/lib/data"
import type { Order } from "@/lib/types"

interface OrderStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const statusConfig = {
  Processing: { icon: Clock, color: "bg-yellow-500", variant: "secondary" as const },
  "Awaiting Shipment": { icon: Package, color: "bg-blue-500", variant: "default" as const },
  Shipped: { icon: Truck, color: "bg-purple-500", variant: "default" as const },
  "In Transit": { icon: Truck, color: "bg-orange-500", variant: "default" as const },
  Delivered: { icon: CheckCircle, color: "bg-green-500", variant: "default" as const },
  Backordered: { icon: AlertCircle, color: "bg-red-500", variant: "destructive" as const },
}

export function OrderStatusModal({ open, onOpenChange }: OrderStatusModalProps) {
  const orders = getMockOrders()
  const pendingOrders = orders.filter((order) => order.status !== "Delivered" && order.status !== "Backordered")

  const groupedOrders = orders.reduce(
    (acc, order) => {
      if (!acc[order.status]) acc[order.status] = []
      acc[order.status].push(order)
      return acc
    },
    {} as Record<string, Order[]>,
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Status Overview</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Orders ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="status">By Status</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4">
              {pendingOrders.map((order) => (
                <OrderCard key={order.orderId} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Est. Delivery</TableHead>
                  <TableHead>Tracking</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>{order.itemCount}</TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{order.estimatedDelivery || "TBD"}</TableCell>
                    <TableCell>
                      {order.trackingNumber ? (
                        <Button variant="ghost" size="sm" className="h-auto p-0">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {order.trackingNumber.slice(-6)}
                        </Button>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="status" className="space-y-4">
            <div className="grid gap-4">
              {Object.entries(groupedOrders).map(([status, statusOrders]) => (
                <Card key={status}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <StatusBadge status={status as Order["status"]} />
                      <span className="text-sm text-muted-foreground">({statusOrders.length} orders)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {statusOrders.map((order) => (
                        <div key={order.orderId} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <div className="font-medium">{order.orderId}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.orderDate} • {order.itemCount} items • ${order.totalAmount.toFixed(2)}
                            </div>
                          </div>
                          {order.trackingNumber && (
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Track
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {status}
    </Badge>
  )
}

function OrderCard({ order }: { order: Order }) {
  const config = statusConfig[order.status]
  const Icon = config.icon

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{order.orderId}</CardTitle>
          <StatusBadge status={order.status} />
        </div>
        <div className="text-sm text-muted-foreground">
          Ordered: {order.orderDate} • {order.itemCount} items • ${order.totalAmount.toFixed(2)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Estimated Delivery</div>
              <div className="text-muted-foreground">{order.estimatedDelivery || "TBD"}</div>
            </div>
            {order.trackingNumber && (
              <div>
                <div className="font-medium">Tracking Number</div>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {order.trackingNumber}
                </Button>
              </div>
            )}
          </div>

          <div>
            <div className="font-medium text-sm mb-2">Parts Ordered</div>
            <div className="space-y-1">
              {order.parts.map((part, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>
                    {part.partNumber} - {part.description}
                  </span>
                  <span>
                    Qty: {part.quantity} × ${part.unitPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
