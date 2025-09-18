"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Camera, FileText, Search, ChevronLeft, ChevronRight } from "lucide-react"

interface OrderClaimFlowProps {
  onSubmit: (data: any) => void
  onBack: () => void
}

export function OrderClaimFlow({ onSubmit, onBack }: OrderClaimFlowProps) {
  const [orderNumber, setOrderNumber] = React.useState("")
  const [orderData, setOrderData] = React.useState<any>(null)
  const [selectedParts, setSelectedParts] = React.useState<any[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [documentation, setDocumentation] = React.useState<any[]>([])
  const partsPerPage = 10

  const mockOrderData = {
    orderNumber: "ORD-2024-001",
    deliveryDate: "2024-01-15",
    shipmentNumber: "SHP-2024-001",
    parts: Array.from({ length: 45 }, (_, i) => ({
      partNumber: `PART-${String(i + 1).padStart(3, "0")}`,
      description: `Automotive Part ${i + 1} - ${["Engine", "Brake", "Suspension", "Electrical", "Body"][i % 5]} Component`,
      receivedQty: Math.floor(Math.random() * 20) + 1,
      unitPrice: Math.floor(Math.random() * 200) + 50,
      category: ["Engine", "Brake", "Suspension", "Electrical", "Body"][i % 5],
    })),
  }

  const handleOrderLookup = () => {
    if (orderNumber) {
      setOrderData(mockOrderData)
      setSelectedParts([])
    }
  }

  const filteredParts =
    orderData?.parts.filter(
      (part: any) =>
        part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.description.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  const paginatedParts = filteredParts.slice((currentPage - 1) * partsPerPage, currentPage * partsPerPage)
  const totalPages = Math.ceil(filteredParts.length / partsPerPage)

  const updatePartClaim = (partNumber: string, field: string, value: any) => {
    setSelectedParts((prev) => {
      const existing = prev.find((p) => p.partNumber === partNumber)
      if (existing) {
        return prev.map((p) => (p.partNumber === partNumber ? { ...p, [field]: value } : p))
      } else {
        const part = orderData.parts.find((p: any) => p.partNumber === partNumber)
        return [...prev, { ...part, returnQty: 0, reason: "", notes: "", [field]: value }]
      }
    })
  }

  const getPartClaim = (partNumber: string) => {
    return selectedParts.find((p) => p.partNumber === partNumber) || {}
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    const newDocs = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "document",
    }))
    setDocumentation((prev) => [...prev, ...newDocs])
  }

  const isFormValid = () => {
    return orderData && selectedParts.some((p) => p.returnQty > 0 && p.reason) && documentation.length > 0
  }

  const handleSubmit = () => {
    const claimData = {
      orderNumber: orderData.orderNumber,
      shipmentNumber: orderData.shipmentNumber,
      parts: selectedParts.filter((p) => p.returnQty > 0),
      documentation,
      totalParts: selectedParts.filter((p) => p.returnQty > 0).length,
    }
    onSubmit(claimData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
          <CardDescription>Enter the order number to retrieve parts information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="orderNumber">Order Number *</Label>
              <Input
                id="orderNumber"
                placeholder="Enter order number (e.g., ORD-2024-001)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleOrderLookup} disabled={!orderNumber}>
                <Search className="h-4 w-4 mr-2" />
                Lookup Order
              </Button>
            </div>
          </div>

          {orderData && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Order:</span> {orderData.orderNumber}
                </div>
                <div>
                  <span className="font-medium">Delivered:</span> {orderData.deliveryDate}
                </div>
                <div>
                  <span className="font-medium">Total Parts:</span> {orderData.parts.length}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {orderData && (
        <Card>
          <CardHeader>
            <CardTitle>Select Parts for Return</CardTitle>
            <CardDescription>Choose parts to return and specify quantities and reasons</CardDescription>
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
                Showing {filteredParts.length} of {orderData.parts.length} parts
              </div>
            </div>

            <div className="space-y-3">
              {paginatedParts.map((part: any) => {
                const claim = getPartClaim(part.partNumber)
                return (
                  <div key={part.partNumber} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{part.partNumber}</div>
                        <div className="text-sm text-muted-foreground">{part.description}</div>
                        <div className="text-sm">
                          Received: {part.receivedQty} units @ ${part.unitPrice}
                        </div>
                      </div>
                      <Badge variant="outline">{part.category}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <Label>Return Qty</Label>
                        <Input
                          type="number"
                          min={0}
                          max={part.receivedQty}
                          value={claim.returnQty || 0}
                          onChange={(e) =>
                            updatePartClaim(
                              part.partNumber,
                              "returnQty",
                              Math.min(part.receivedQty, Math.max(0, Number(e.target.value) || 0)),
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label>Type of Defect *</Label>
                        <Select
                          value={claim.reason || ""}
                          onValueChange={(v) => updatePartClaim(part.partNumber, "reason", v)}
                        >
                          <SelectTrigger>
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

                      <div className="md:col-span-2">
                        <Label>Notes</Label>
                        <Input
                          placeholder="Describe the issue..."
                          value={claim.notes || ""}
                          onChange={(e) => updatePartClaim(part.partNumber, "notes", e.target.value)}
                        />
                      </div>
                    </div>
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

            <div>
              <Label>Documentation *</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Upload photos and documents for each part</p>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                  Choose Files
                </Button>
              </div>

              {documentation.length > 0 && (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {documentation.map((doc, index) => (
                    <div key={index} className="relative group border rounded p-2">
                      {doc.type === "image" ? (
                        <img
                          src={doc.url || "/placeholder.svg"}
                          alt={doc.name}
                          className="w-full h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="h-16 flex items-center justify-center bg-gray-100 rounded">
                          <FileText className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                      <div className="text-xs truncate mt-1">{doc.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={!isFormValid()}>
                Submit Claim
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
