"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Trash2, Plus, DollarSign, AlertTriangle } from "lucide-react"

interface BuyBackPart {
  id: string
  partNumber: string
  description: string
  quantity: number
  condition: string
  notes: string
}

export function BuyBackFlow({ onSubmit, onBack }: { onSubmit: (data: any) => void; onBack: () => void }) {
  const [parts, setParts] = React.useState<BuyBackPart[]>([
    {
      id: "1",
      partNumber: "",
      description: "",
      quantity: 0,
      condition: "",
      notes: "",
    },
  ])

  const [contactInfo, setContactInfo] = React.useState({
    reason: "",
    additionalNotes: "",
  })

  const addPart = () => {
    const newPart: BuyBackPart = {
      id: Date.now().toString(),
      partNumber: "",
      description: "",
      quantity: 0,
      condition: "",
      notes: "",
    }
    setParts([...parts, newPart])
  }

  const removePart = (id: string) => {
    if (parts.length > 1) {
      setParts(parts.filter((part) => part.id !== id))
    }
  }

  const updatePart = (id: string, field: keyof BuyBackPart, value: any) => {
    setParts(parts.map((part) => (part.id === id ? { ...part, [field]: value } : part)))
  }

  const handleSubmit = () => {
    const validParts = parts.filter((part) => part.partNumber && part.quantity > 0 && part.condition)

    if (validParts.length === 0) {
      return
    }

    const buybackData = {
      parts: validParts,
      reason: contactInfo.reason,
      additionalNotes: contactInfo.additionalNotes,
      estimatedShippingFee: validParts.length * 15, // $15 per part estimated
    }

    onSubmit(buybackData)
  }

  const isFormValid = parts.some((part) => part.partNumber && part.quantity > 0 && part.condition) && contactInfo.reason

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>BuyBack Request</CardTitle>
          <CardDescription>
            Submit parts you no longer need for potential buyback. Shipping fees will apply for approved requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <DollarSign className="h-4 w-4" />
            <AlertTitle>Shipping Fee Notice</AlertTitle>
            <AlertDescription>
              If your buyback request is approved, shipping fees will be deducted from the buyback amount. Estimated
              shipping fee: $15 per part.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Parts for BuyBack</Label>
              <Button type="button" variant="outline" size="sm" onClick={addPart}>
                <Plus className="h-4 w-4 mr-2" />
                Add Part
              </Button>
            </div>

            {parts.map((part, index) => (
              <Card key={part.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label>Part Number *</Label>
                    <Input
                      placeholder="Enter part number"
                      value={part.partNumber}
                      onChange={(e) => updatePart(part.id, "partNumber", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Input
                      placeholder="Part description"
                      value={part.description}
                      onChange={(e) => updatePart(part.id, "description", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Quantity *</Label>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      value={part.quantity || ""}
                      onChange={(e) => updatePart(part.id, "quantity", Math.max(1, Number(e.target.value) || 0))}
                    />
                  </div>

                  <div>
                    <Label>Condition *</Label>
                    <Select value={part.condition} onValueChange={(value) => updatePart(part.id, "condition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New - Unopened</SelectItem>
                        <SelectItem value="like-new">Like New - Opened but unused</SelectItem>
                        <SelectItem value="good">Good - Lightly used</SelectItem>
                        <SelectItem value="fair">Fair - Used with minor wear</SelectItem>
                        <SelectItem value="damaged">Damaged - Has defects</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label>Notes</Label>
                    <Input
                      placeholder="Additional notes about this part"
                      value={part.notes}
                      onChange={(e) => updatePart(part.id, "notes", e.target.value)}
                    />
                  </div>

                  {parts.length > 1 && (
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePart(part.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <Label>Reason for BuyBack *</Label>
              <Select
                value={contactInfo.reason}
                onValueChange={(value) => setContactInfo({ ...contactInfo, reason: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overstocked">Overstocked - No longer needed</SelectItem>
                  <SelectItem value="wrong-order">Wrong parts ordered</SelectItem>
                  <SelectItem value="project-cancelled">Project cancelled</SelectItem>
                  <SelectItem value="customer-cancelled">Customer order cancelled</SelectItem>
                  <SelectItem value="business-closure">Business closure/downsizing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Additional Notes</Label>
              <Textarea
                placeholder="Any additional information about your buyback request..."
                value={contactInfo.additionalNotes}
                onChange={(e) => setContactInfo({ ...contactInfo, additionalNotes: e.target.value })}
              />
            </div>
          </div>

          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertTitle className="text-orange-800">Review Process</AlertTitle>
            <AlertDescription className="text-orange-700">
              Your buyback request will be reviewed by Car Company. Approval depends on part condition, current demand,
              and market value. Processing time is typically 5-10 business days.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!isFormValid}>
              Submit BuyBack Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
