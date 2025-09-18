"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Upload,
  Package,
  AlertCircle,
  FileText,
  Camera,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  Eye,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { getMockOrders } from "@/lib/data"
import type { Order } from "@/lib/types"

export default function OrderAcknowledgmentPage() {
  const [activeTab, setActiveTab] = useState("orders-claims")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [acknowledgmentData, setAcknowledgmentData] = useState({
    receivedDate: "",
    receivedBy: "",
    condition: "Good",
    notes: "",
    podFiles: [] as File[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOSDClaim, setShowOSDClaim] = useState(false)
  const [ordersWithPOD, setOrdersWithPOD] = useState<Array<Order & { podAddedAt: Date }>>([])
  const [searchFilter, setSearchFilter] = useState("")
  const router = useRouter()

  const orders = getMockOrders()
  const deliveredOrders = orders.filter((order) => order.status === "Delivered")
  const inTransitOrders = orders.filter((order) => order.status === "In Transit" || order.status === "Shipped")

  const deliveredOrdersWithoutPOD = deliveredOrders.filter(
    (order) => !ordersWithPOD.some((podOrder) => podOrder.orderId === order.orderId),
  )

  const allOrders = [...inTransitOrders, ...deliveredOrdersWithoutPOD, ...ordersWithPOD]
  const filteredOrders = allOrders.filter((order) => order.orderId.toLowerCase().includes(searchFilter.toLowerCase()))

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAcknowledgmentData((prev) => ({
      ...prev,
      podFiles: [...prev.podFiles, ...files],
    }))
  }

  const removeFile = (index: number) => {
    setAcknowledgmentData((prev) => ({
      ...prev,
      podFiles: prev.podFiles.filter((_, i) => i !== index),
    }))
  }

  const handlePODSubmission = async () => {
    if (!selectedOrder) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setOrdersWithPOD((prev) => [...prev, { ...selectedOrder, podAddedAt: new Date() }])

    setAcknowledgmentData({
      receivedDate: "",
      receivedBy: "",
      condition: "Good",
      notes: "",
      podFiles: [],
    })

    setSelectedOrder(null)
    setIsSubmitting(false)
  }

  const handleOSDClaimSubmit = (claimData: any) => {
    console.log("[v0] OS&D Claim submitted:", claimData)
    setShowOSDClaim(false)
    alert(`OS&D Claim submitted successfully! Claim ID: CLM-${Date.now().toString().slice(-5)}`)
  }

  const startOSDClaim = (order: Order) => {
    setSelectedOrder(order)
    setShowOSDClaim(true)
  }

  const isOSDClaimAvailable = (podAddedAt: Date) => {
    const now = new Date()
    const hoursDiff = (now.getTime() - podAddedAt.getTime()) / (1000 * 60 * 60)
    return hoursDiff <= 48
  }

  const getRemainingTime = (podAddedAt: Date) => {
    const now = new Date()
    const hoursDiff = (now.getTime() - podAddedAt.getTime()) / (1000 * 60 * 60)
    const remainingHours = Math.max(0, 48 - hoursDiff)

    if (remainingHours > 24) {
      return `${Math.floor(remainingHours / 24)} day(s) ${Math.floor(remainingHours % 24)} hour(s)`
    } else {
      return `${Math.floor(remainingHours)} hour(s)`
    }
  }

  const getOrderStatus = (order: any) => {
    if ("podAddedAt" in order) {
      return "POD Added"
    }
    return order.status
  }

  const getOrderAction = (order: any) => {
    if ("podAddedAt" in order) {
      const canFileOSD = isOSDClaimAvailable(order.podAddedAt)
      if (canFileOSD) {
        return (
          <Button size="sm" variant="outline" onClick={() => startOSDClaim(order)}>
            <AlertCircle className="h-4 w-4 mr-1" />
            File OS&D Claim
          </Button>
        )
      } else {
        return <span className="text-xs text-muted-foreground">OS&D claim period expired</span>
      }
    } else if (order.status === "Delivered") {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
              <FileText className="h-4 w-4 mr-1" />
              Add POD
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Proof of Delivery - {order.orderId}</DialogTitle>
            </DialogHeader>
            <PODForm
              order={order}
              data={acknowledgmentData}
              setData={setAcknowledgmentData}
              onFileUpload={handleFileUpload}
              onRemoveFile={removeFile}
              onSubmit={handlePODSubmission}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      )
    } else {
      return (
        <Badge variant="secondary" className="text-xs">
          {order.status}
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">OS&D Management</h1>
        <p className="text-muted-foreground">Add proof of delivery, file OS&D claims, and track claim status</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders-claims">Orders & Claims</TabsTrigger>
          <TabsTrigger value="claim-tracking">Claim Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="orders-claims" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                All Orders
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by Order#..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* ... existing orders table code ... */}
              {filteredOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No orders found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Tracking</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>OS&D Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => {
                      const status = getOrderStatus(order)
                      const hasPOD = "podAddedAt" in order
                      const canFileOSD = hasPOD ? isOSDClaimAvailable(order.podAddedAt) : false
                      const remainingTime = hasPOD ? getRemainingTime(order.podAddedAt) : null

                      return (
                        <TableRow key={order.orderId}>
                          <TableCell className="font-medium">{order.orderId}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                status === "POD Added"
                                  ? "default"
                                  : status === "Delivered"
                                    ? "default"
                                    : status === "Shipped"
                                      ? "default"
                                      : "secondary"
                              }
                              className={
                                status === "POD Added" ? "bg-green-600" : status === "Delivered" ? "bg-green-600" : ""
                              }
                            >
                              {status === "POD Added" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.itemCount}</TableCell>
                          <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
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
                          <TableCell>
                            {hasPOD
                              ? order.podAddedAt.toLocaleDateString()
                              : order.estimatedDelivery || order.orderDate}
                          </TableCell>
                          <TableCell>
                            {hasPOD ? (
                              canFileOSD ? (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-orange-500" />
                                  <span className="text-xs text-orange-600">{remainingTime} left</span>
                                </div>
                              ) : (
                                <Badge variant="secondary">Expired</Badge>
                              )
                            ) : (
                              "—"
                            )}
                          </TableCell>
                          <TableCell>{getOrderAction(order)}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claim-tracking">
          <OSDClaimTracking />
        </TabsContent>
      </Tabs>

      {/* ... existing dialogs and components ... */}
      <Dialog open={showOSDClaim} onOpenChange={setShowOSDClaim}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>File OS&D Claim - {selectedOrder?.orderId}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <OSDClaimForm
              order={selectedOrder}
              onSubmit={handleOSDClaimSubmit}
              onCancel={() => setShowOSDClaim(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface PODFormProps {
  order: Order
  data: any
  setData: (data: any) => void
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (index: number) => void
  onSubmit: () => void
  isSubmitting: boolean
}

function PODForm({ order, data, setData, onFileUpload, onRemoveFile, onSubmit, isSubmitting }: PODFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Order Date:</span> {order.orderDate}
            </div>
            <div>
              <span className="font-medium">Total Amount:</span> ${order.totalAmount.toFixed(2)}
            </div>
            <div>
              <span className="font-medium">Items:</span> {order.itemCount}
            </div>
            <div>
              <span className="font-medium">Tracking:</span> {order.trackingNumber || "N/A"}
            </div>
          </div>

          <div className="mt-4">
            <div className="font-medium text-sm mb-2">Parts Ordered:</div>
            <div className="space-y-1">
              {order.parts.map((part, idx) => (
                <div key={idx} className="flex justify-between text-sm bg-muted/50 p-2 rounded">
                  <span>
                    {part.partNumber} - {part.description}
                  </span>
                  <span>Qty: {part.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="receivedDate">Date Received *</Label>
            <Input
              id="receivedDate"
              type="date"
              value={data.receivedDate}
              onChange={(e) => setData({ ...data, receivedDate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="receivedBy">Received By *</Label>
            <Input
              id="receivedBy"
              placeholder="Enter name of person who received"
              value={data.receivedBy}
              onChange={(e) => setData({ ...data, receivedBy: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <select
            id="condition"
            className="w-full p-2 border rounded-md"
            value={data.condition}
            onChange={(e) => setData({ ...data, condition: e.target.value })}
          >
            <option value="Good">Good - All items received in perfect condition</option>
            <option value="Damaged">Damaged - Some items received with damage</option>
            <option value="Incomplete">Incomplete - Missing items from order</option>
            <option value="Wrong Items">Wrong Items - Incorrect parts received</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Add any additional notes about the delivery..."
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Proof of Delivery (POD) *</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
            <div className="text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm text-muted-foreground mb-2">
                Upload delivery receipts, photos, or signed documents
              </div>
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={onFileUpload}
                className="hidden"
                id="pod-upload"
              />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="pod-upload" className="cursor-pointer">
                  <Camera className="h-4 w-4 mr-1" />
                  Choose Files
                </label>
              </Button>
              <div className="text-xs text-muted-foreground mt-1">Supported: Images, PDF, DOC (Max 10MB each)</div>
            </div>
          </div>

          {data.podFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files ({data.podFiles.length})</Label>
              <div className="space-y-2">
                {data.podFiles.map((file: File, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => onRemoveFile(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {data.condition !== "Good" && (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-yellow-800">Condition Issue Detected</div>
              <div className="text-yellow-700">
                You can file an OS&D claim after adding POD to report damaged, missing, or incorrect items.
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            onClick={onSubmit}
            disabled={!data.receivedDate || !data.receivedBy || data.podFiles.length === 0 || isSubmitting}
            className="min-w-32"
          >
            {isSubmitting ? (
              "Adding POD..."
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Add POD
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface OSDClaimFormProps {
  order: Order
  onSubmit: (data: any) => void
  onCancel: () => void
}

function OSDClaimForm({ order, onSubmit, onCancel }: OSDClaimFormProps) {
  const [selectedParts, setSelectedParts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [documentation, setDocumentation] = useState<any[]>([])
  const [partDocumentation, setPartDocumentation] = useState<Record<string, any[]>>({})
  const partsPerPage = 10

  const filteredParts = order.parts.filter(
    (part: any) =>
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const paginatedParts = filteredParts.slice((currentPage - 1) * partsPerPage, currentPage * partsPerPage)
  const totalPages = Math.ceil(filteredParts.length / partsPerPage)

  const updatePartClaim = (partNumber: string, field: string, value: any) => {
    setSelectedParts((prev) => {
      const existing = prev.find((p) => p.partNumber === partNumber)
      if (existing) {
        return prev.map((p) => (p.partNumber === partNumber ? { ...p, [field]: value } : p))
      } else {
        const part = order.parts.find((p: any) => p.partNumber === partNumber)
        return [...prev, { ...part, returnQty: 0, reason: "", notes: "", [field]: value }]
      }
    })
  }

  const getPartClaim = (partNumber: string) => {
    return selectedParts.find((p) => p.partNumber === partNumber) || {}
  }

  const handlePartFileUpload = (partNumber: string, files: FileList | null) => {
    if (!files) return
    const newDocs = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "document",
    }))
    setPartDocumentation((prev) => ({
      ...prev,
      [partNumber]: [...(prev[partNumber] || []), ...newDocs],
    }))
  }

  const removePartDoc = (partNumber: string, index: number) => {
    setPartDocumentation((prev) => ({
      ...prev,
      [partNumber]: (prev[partNumber] || []).filter((_, i) => i !== index),
    }))
  }

  const isFormValid = () => {
    const validParts = selectedParts.filter((p) => p.returnQty > 0 && p.reason)
    return validParts.length > 0 && validParts.every((p) => (partDocumentation[p.partNumber] || []).length > 0)
  }

  const handleSubmit = () => {
    const claimData = {
      orderNumber: order.orderId,
      parts: selectedParts.filter((p) => p.returnQty > 0),
      partDocumentation,
      totalParts: selectedParts.filter((p) => p.returnQty > 0).length,
      claimType: "OS&D",
    }
    onSubmit(claimData)
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <div className="font-medium text-amber-800">OS&D Claim Notice</div>
            <div className="text-amber-700">
              Claims submitted after 48 hours of delivery need additional justification.
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Order:</span> {order.orderId}
              </div>
              <div>
                <span className="font-medium">Order Date:</span> {order.orderDate}
              </div>
              <div>
                <span className="font-medium">Total Parts:</span> {order.parts.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Parts with Issues</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search parts by number or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              Showing {filteredParts.length} of {order.parts.length} parts
            </div>
          </div>

          <div className="space-y-4">
            {paginatedParts.map((part: any) => {
              const claim = getPartClaim(part.partNumber)
              const partDocs = partDocumentation[part.partNumber] || []
              const hasClaimQty = (claim.returnQty || 0) > 0

              return (
                <div key={part.partNumber} className="border rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="font-semibold text-base">{part.partNumber}</div>
                      <div className="text-sm text-muted-foreground">{part.description}</div>
                      <div className="text-sm font-medium">Ordered Quantity: {part.quantity} units</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`qty-${part.partNumber}`} className="text-sm font-medium">
                        Claim Quantity
                      </Label>
                      <Input
                        id={`qty-${part.partNumber}`}
                        type="number"
                        min={0}
                        max={part.quantity}
                        value={claim.returnQty || 0}
                        onChange={(e) =>
                          updatePartClaim(
                            part.partNumber,
                            "returnQty",
                            Math.min(part.quantity, Math.max(0, Number(e.target.value) || 0)),
                          )
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`reason-${part.partNumber}`} className="text-sm font-medium">
                        Type of Defect <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={claim.reason || ""}
                        onValueChange={(v) => updatePartClaim(part.partNumber, "reason", v)}
                      >
                        <SelectTrigger id={`reason-${part.partNumber}`} className="w-full">
                          <SelectValue placeholder="Select defect type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="damage-total-loss">Damage - Total loss</SelectItem>
                          <SelectItem value="damage-usable">Damage - Usable</SelectItem>
                          <SelectItem value="quality-issue">Quality Issue</SelectItem>
                          <SelectItem value="mislabeling">Mislabeling</SelectItem>
                          <SelectItem value="overage">Overage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor={`notes-${part.partNumber}`} className="text-sm font-medium">
                        Additional Notes
                      </Label>
                      <Input
                        id={`notes-${part.partNumber}`}
                        placeholder="Describe the issue in detail..."
                        value={claim.notes || ""}
                        onChange={(e) => updatePartClaim(part.partNumber, "notes", e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {hasClaimQty && (
                    <div className="border-t pt-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-semibold">Documentation for {part.partNumber}</Label>
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      </div>

                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="text-center space-y-3">
                          <Camera className="h-8 w-8 mx-auto text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Upload photos and documents for this part
                            </p>
                            <p className="text-xs text-muted-foreground">Photos, Videos, Documents (Max 10MB each)</p>
                          </div>
                          <input
                            type="file"
                            multiple
                            accept="image/*,video/*,.pdf,.doc,.docx"
                            onChange={(e) => handlePartFileUpload(part.partNumber, e.target.files)}
                            className="hidden"
                            id={`part-upload-${part.partNumber}`}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById(`part-upload-${part.partNumber}`)?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Files
                          </Button>
                        </div>
                      </div>

                      {partDocs.length > 0 && (
                        <div className="space-y-3">
                          <div className="text-sm font-medium">Uploaded Files ({partDocs.length})</div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {partDocs.map((doc, index) => (
                              <div
                                key={index}
                                className="relative group border rounded-lg p-2 hover:shadow-sm transition-shadow"
                              >
                                {doc.type === "image" ? (
                                  <img
                                    src={doc.url || "/placeholder.svg"}
                                    alt={doc.name}
                                    className="w-full h-20 object-cover rounded"
                                  />
                                ) : (
                                  <div className="h-20 flex items-center justify-center bg-gray-50 rounded">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                  </div>
                                )}
                                <div className="text-xs truncate mt-2 px-1" title={doc.name}>
                                  {doc.name}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removePartDoc(part.partNumber, index)}
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {hasClaimQty && partDocs.length === 0 && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                          <span className="text-sm text-red-700 font-medium">
                            Documentation is required for this part before submission
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!isFormValid()} className="min-w-32">
              Submit OS&D Claim
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function OSDClaimTracking() {
  const [searchFilter, setSearchFilter] = useState("")
  const [selectedClaim, setSelectedClaim] = useState<any>(null)

  // Mock OS&D claims data with per-line approval status
  const osdClaims = [
    {
      claimId: "CLM-90557",
      orderNumber: "ORD-2024-001",
      submittedDate: "2024-01-15",
      status: "Approved",
      totalParts: 3,
      approvedParts: 3,
      rejectedParts: 0,
      disposition: "Return",
      estimatedCredit: 450.0,
      parts: [
        {
          partNumber: "BRK-001",
          description: "Brake Pad Set",
          claimQty: 2,
          defectType: "Damage - Total loss",
          status: "Approved",
          disposition: "Return",
          credit: 180.0,
          reviewNotes: "Damage confirmed through photos. Approved for return.",
        },
        {
          partNumber: "FLT-002",
          description: "Oil Filter",
          claimQty: 1,
          defectType: "Quality Issue",
          status: "Approved",
          disposition: "Return",
          credit: 45.0,
          reviewNotes: "Quality defect verified. Return approved.",
        },
        {
          partNumber: "SPK-003",
          description: "Spark Plug Set",
          claimQty: 4,
          defectType: "Mislabeling",
          status: "Approved",
          disposition: "Return",
          credit: 225.0,
          reviewNotes: "Mislabeling confirmed. Return approved.",
        },
      ],
    },
    {
      claimId: "CLM-20616",
      orderNumber: "ORD-2024-002",
      submittedDate: "2024-01-18",
      status: "Partially Approved",
      totalParts: 4,
      approvedParts: 2,
      rejectedParts: 2,
      disposition: "Mixed",
      estimatedCredit: 125.0,
      parts: [
        {
          partNumber: "TIR-001",
          description: "Tire Set",
          claimQty: 4,
          defectType: "Damage - Usable",
          status: "Approved",
          disposition: "Return",
          credit: 125.0,
          reviewNotes: "Minor damage confirmed. Return approved with partial credit.",
        },
        {
          partNumber: "BAT-002",
          description: "Battery",
          claimQty: 1,
          defectType: "Quality Issue",
          status: "Rejected",
          disposition: "N/A",
          credit: 0,
          reviewNotes: "Insufficient evidence of quality defect. Additional documentation required.",
        },
        {
          partNumber: "WIP-003",
          description: "Wiper Blades",
          claimQty: 2,
          defectType: "Overage",
          status: "Approved",
          disposition: "Keep",
          credit: 0,
          reviewNotes: "Overage confirmed. Customer may keep excess parts.",
        },
        {
          partNumber: "AIR-004",
          description: "Air Filter",
          claimQty: 1,
          defectType: "Damage - Total loss",
          status: "Rejected",
          disposition: "N/A",
          credit: 0,
          reviewNotes: "Damage appears to be post-delivery. Claim rejected.",
        },
      ],
    },
    {
      claimId: "CLM-39936",
      orderNumber: "ORD-2024-008",
      submittedDate: "2024-01-20",
      status: "Under Review",
      totalParts: 7,
      approvedParts: 0,
      rejectedParts: 0,
      disposition: "Pending",
      estimatedCredit: 0,
      parts: [
        {
          partNumber: "ENG-001",
          description: "Engine Component",
          claimQty: 1,
          defectType: "Quality Issue",
          status: "Under Review",
          disposition: "Pending",
          credit: 0,
          reviewNotes: "Review in progress. Additional technical assessment required.",
        },
        {
          partNumber: "TRN-002",
          description: "Transmission Part",
          claimQty: 2,
          defectType: "Damage - Total loss",
          status: "Under Review",
          disposition: "Pending",
          credit: 0,
          reviewNotes: "Damage assessment in progress.",
        },
        {
          partNumber: "SUS-003",
          description: "Suspension Kit",
          claimQty: 4,
          defectType: "Mislabeling",
          status: "Under Review",
          disposition: "Pending",
          credit: 0,
          reviewNotes: "Verification of labeling issue in progress.",
        },
      ],
    },
  ]

  const filteredClaims = osdClaims.filter(
    (claim) =>
      claim.claimId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      claim.orderNumber.toLowerCase().includes(searchFilter.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      case "Partially Approved":
        return (
          <Badge className="bg-yellow-600">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Partially Approved
          </Badge>
        )
      case "Under Review":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            OS&D Claims
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Claim ID or Order#..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredClaims.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No OS&D claims found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Order#</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Parts</TableHead>
                  <TableHead>Estimated Credit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.claimId}>
                    <TableCell className="font-medium">{claim.claimId}</TableCell>
                    <TableCell>{claim.orderNumber}</TableCell>
                    <TableCell>{claim.submittedDate}</TableCell>
                    <TableCell>{getStatusBadge(claim.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Total: {claim.totalParts}</div>
                        {claim.status !== "Under Review" && (
                          <div className="text-xs text-muted-foreground">
                            Approved: {claim.approvedParts} | Rejected: {claim.rejectedParts}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{claim.estimatedCredit > 0 ? `$${claim.estimatedCredit.toFixed(2)}` : "—"}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedClaim(claim)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>OS&D Claim Details - {claim.claimId}</DialogTitle>
                          </DialogHeader>
                          {selectedClaim && <ClaimDetailsView claim={selectedClaim} />}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ClaimDetailsView({ claim }: { claim: any }) {
  const getPartStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Approved</span>
      case "Rejected":
        return <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">Rejected</span>
      case "Under Review":
        return <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">Under Review</span>
      default:
        return <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">{status}</span>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Claim Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Claim ID:</span> {claim.claimId}
            </div>
            <div>
              <span className="font-medium">Order:</span> {claim.orderNumber}
            </div>
            <div>
              <span className="font-medium">Submitted:</span> {claim.submittedDate}
            </div>
            <div>
              <span className="font-medium">Status:</span> {claim.status}
            </div>
          </div>

          {claim.estimatedCredit > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-medium text-green-800">Estimated Credit: ${claim.estimatedCredit.toFixed(2)}</div>
              <div className="text-sm text-green-700">Credit will be processed after return completion</div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Part-by-Part Review Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {claim.parts.map((part: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="font-semibold">{part.partNumber}</div>
                    <div className="text-sm text-muted-foreground">{part.description}</div>
                    <div className="text-sm">
                      <span className="font-medium">Claim Qty:</span> {part.claimQty} |
                      <span className="font-medium ml-2">Defect:</span> {part.defectType}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    {getPartStatusBadge(part.status)}
                    {part.credit > 0 && (
                      <div className="text-sm font-medium text-green-600">Credit: ${part.credit.toFixed(2)}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Disposition:</span> {part.disposition}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Review Notes:</span>
                    <div className="mt-1 p-2 bg-muted/50 rounded text-sm">{part.reviewNotes}</div>
                  </div>
                </div>

                {part.status === "Approved" && part.disposition === "Return" && (
                  <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-700">
                      Return shipping label will be generated once all approvals are complete
                    </span>
                  </div>
                )}

                {part.status === "Rejected" && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-700">
                      This part claim was rejected. You may submit additional documentation if available.
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {claim.status === "Approved" && (
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Claim approved - return process initiated</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Shipping label will be sent via email</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Credit memo will be generated after return receipt</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
