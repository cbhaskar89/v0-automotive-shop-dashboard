"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Minus, Plus } from "lucide-react"

export default function NewOrderPage() {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedTrim, setSelectedTrim] = useState("")
  const [selectedVariant, setSelectedVariant] = useState("")
  const [selectedModelYear, setSelectedModelYear] = useState("")
  const [selectedOrderType, setSelectedOrderType] = useState("")
  const [selectedExteriorColor, setSelectedExteriorColor] = useState("")
  const [selectedInterior, setSelectedInterior] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [customerInfo, setCustomerInfo] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")

  const exteriorColors = [
    { name: "Cosmos Silver", color: "bg-gray-300", value: "cosmos-silver" },
    { name: "Stellar White", color: "bg-white border-2 border-gray-300", value: "stellar-white" },
    { name: "Quantum Grey", color: "bg-gray-600", value: "quantum-grey" },
    { name: "Infinite Black", color: "bg-black", value: "infinite-black" },
    { name: "Eureka Gold", color: "bg-yellow-500", value: "eureka-gold" },
  ]

  const interiorOptions = [
    { name: "Tahoe", description: "Premium leather", value: "tahoe" },
    { name: "Mojave", description: "Sustainable materials", value: "mojave" },
    { name: "Santa Cruz", description: "Luxury finish", value: "santa-cruz" },
  ]

  const handleSubmit = () => {
    // Handle order submission
    console.log("Order submitted")
    router.push("/importer/orders")
  }

  const handleSaveDraft = () => {
    // Handle save as draft
    console.log("Order saved as draft")
    router.push("/importer/orders")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">Create New Order</h1>
          <p className="text-muted-foreground mt-1">Configure and place a new vehicle order through OMS integration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Vehicle Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Vehicle Configuration</CardTitle>
              <p className="text-sm text-muted-foreground">Select the vehicle specifications for your order</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Trim Level and Variant */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Trim Level</label>
                  <Select value={selectedTrim} onValueChange={setSelectedTrim}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trim level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pure">Pure</SelectItem>
                      <SelectItem value="touring">Touring</SelectItem>
                      <SelectItem value="dream-edition">Dream Edition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Variant</label>
                  <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rwd">RWD</SelectItem>
                      <SelectItem value="awd">AWD</SelectItem>
                      <SelectItem value="range">Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Model Year and Order Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Model Year</label>
                  <Select value={selectedModelYear} onValueChange={setSelectedModelYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Order Type</label>
                  <Select value={selectedOrderType} onValueChange={setSelectedOrderType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="demo">Demo</SelectItem>
                      <SelectItem value="fleet">Fleet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Exterior Color */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-black">Exterior Color</label>
                <div className="grid grid-cols-2 gap-3">
                  {exteriorColors.map((color) => (
                    <div
                      key={color.value}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedExteriorColor === color.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedExteriorColor(color.value)}
                    >
                      <div className={`w-6 h-6 rounded-full ${color.color}`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{color.name}</div>
                      </div>
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex items-center justify-center">
                        {selectedExteriorColor === color.value && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interior */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Interior</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {interiorOptions.map((interior) => (
                <div
                  key={interior.value}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedInterior === interior.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedInterior(interior.value)}
                >
                  <div>
                    <div className="font-medium text-black">{interior.name}</div>
                    <div className="text-sm text-muted-foreground">{interior.description}</div>
                  </div>
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    {selectedInterior === interior.value && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Order Details</CardTitle>
              <p className="text-sm text-muted-foreground">Specify quantity and delivery preferences</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Quantity</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-20 text-center"
                      min="1"
                    />
                    <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">Desired Delivery Date</label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      placeholder="Select delivery date"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Customer Information (if retail)</label>
                <Textarea
                  placeholder="Enter customer details for retail orders..."
                  value={customerInfo}
                  onChange={(e) => setCustomerInfo(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Special Instructions</label>
                <Textarea
                  placeholder="Any special delivery or configuration notes..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Integration Status & Order Summary */}
        <div className="space-y-6">
          {/* Integration Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Integration Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">OMS Connection:</span>
                <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Inventory Check:</span>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Real-time</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pricing:</span>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Current</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
              <p className="text-sm text-muted-foreground">Review your order configuration</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trim:</span>
                  <span className="font-medium">{selectedTrim || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Variant:</span>
                  <span className="font-medium">{selectedVariant || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model Year:</span>
                  <span className="font-medium">{selectedModelYear || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{selectedOrderType || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Date:</span>
                  <span className="font-medium">{deliveryDate || "Not selected"}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Estimated Total:</span>
                  <span className="text-2xl font-bold">$0</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Final pricing will be confirmed by OMS</p>

                <div className="space-y-2">
                  <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
                    Submit Order to OMS
                  </Button>
                  <Button onClick={handleSaveDraft} variant="outline" className="w-full bg-transparent">
                    Save as Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
