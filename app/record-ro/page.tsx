"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Upload, X, Plus, Trash2, Send, Download, CheckCircle, AlertTriangle } from "lucide-react"

interface Part {
  id: string
  partNumber: string
  description: string
  quantity: number
  unitPrice: number
}

export default function RecordROPage() {
  const [serviceType, setServiceType] = useState("")
  const [serviceStartDate, setServiceStartDate] = useState("")
  const [serviceEndDate, setServiceEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [parts, setParts] = useState<Part[]>([])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [generatedROId, setGeneratedROId] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Mock parts catalog for auto-suggestions
  const partsCatalog = [
    { number: "LUC-1001-AX", description: "Brake Pad Set Front", price: 180.0 },
    { number: "LUC-2002-BX", description: "Air Filter Assembly", price: 65.0 },
    { number: "LUC-3003-CX", description: "Cabin Air Filter", price: 45.0 },
    { number: "LUC-4004-DX", description: "Wiper Blade Set", price: 85.0 },
    { number: "LUC-5005-EX", description: "Tire Pressure Sensor", price: 120.0 },
    { number: "LUC-6006-FX", description: "Door Handle Assembly", price: 275.0 },
    { number: "LUC-7007-GX", description: "Headlight Bulb", price: 95.0 },
    { number: "LUC-8008-HX", description: "Battery 12V", price: 220.0 },
  ]

  const serviceTypes = [
    { value: "maintenance", label: "Routine Maintenance" },
    { value: "repair", label: "General Repair" },
    { value: "inspection", label: "Safety Inspection" },
    { value: "diagnostic", label: "Diagnostic Service" },
    { value: "bodywork", label: "Body Work" },
    { value: "electrical", label: "Electrical Service" },
  ]

  const addPart = () => {
    const newPart: Part = {
      id: Date.now().toString(),
      partNumber: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
    }
    setParts([...parts, newPart])
  }

  const removePart = (id: string) => {
    setParts(parts.filter((part) => part.id !== id))
  }

  const updatePart = (id: string, field: keyof Part, value: string | number) => {
    setParts(
      parts.map((part) => {
        if (part.id === id) {
          const updatedPart = { ...part, [field]: value }

          // Auto-fill description and price when part number is selected
          if (field === "partNumber" && typeof value === "string") {
            const catalogPart = partsCatalog.find((p) => p.number === value)
            if (catalogPart) {
              updatedPart.description = catalogPart.description
              updatedPart.unitPrice = catalogPart.price
            }
          }

          return updatedPart
        }
        return part
      }),
    )
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
        setErrors({ ...errors, file: "Please upload an Excel file (.xlsx or .xls)" })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, file: "File size must be less than 5MB" })
        return
      }

      setUploadedFile(file)
      setErrors({ ...errors, file: "" })

      // Mock parsing of Excel file to populate parts
      setTimeout(() => {
        const mockPartsFromExcel: Part[] = [
          {
            id: "excel-1",
            partNumber: "LUC-1001-AX",
            description: "Brake Pad Set Front",
            quantity: 2,
            unitPrice: 180.0,
          },
          {
            id: "excel-2",
            partNumber: "LUC-3003-CX",
            description: "Cabin Air Filter",
            quantity: 1,
            unitPrice: 45.0,
          },
        ]
        setParts(mockPartsFromExcel)
      }, 1000)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!serviceType) newErrors.serviceType = "Service type is required"
    if (!serviceStartDate) newErrors.serviceStartDate = "Service start date is required"
    if (!serviceEndDate) newErrors.serviceEndDate = "Service end date is required"
    if (serviceStartDate && serviceEndDate && new Date(serviceStartDate) > new Date(serviceEndDate)) {
      newErrors.serviceEndDate = "Service end date must be after start date"
    }
    if (!description.trim()) newErrors.description = "Description is required"
    if (parts.length === 0) newErrors.parts = "At least one part is required"

    parts.forEach((part, index) => {
      if (!part.partNumber) newErrors[`part-${index}-number`] = "Part number is required"
      if (part.quantity <= 0) newErrors[`part-${index}-quantity`] = "Quantity must be greater than 0"
      if (part.unitPrice < 0) newErrors[`part-${index}-price`] = "Price cannot be negative"
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    // Generate RO ID
    const roId = `RO-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
    setGeneratedROId(roId)
    setShowSuccessModal(true)

    // Reset form
    setTimeout(() => {
      setServiceType("")
      setServiceStartDate("")
      setServiceEndDate("")
      setDescription("")
      setParts([])
      setUploadedFile(null)
      setErrors({})
    }, 2000)
  }

  const calculateTotal = () => {
    return parts.reduce((total, part) => total + part.quantity * part.unitPrice, 0)
  }

  const downloadTemplate = () => {
    // Mock download of Excel template
    const link = document.createElement("a")
    link.href = "/templates/record-ro-template.xlsx"
    link.download = "Record_RO_Template.xlsx"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Record RO</h1>
          <p className="text-muted-foreground">Capture non-warranty repair orders and service records</p>
        </div>
        <Badge variant="outline" className="text-sm">
          Non-Warranty Services
        </Badge>
      </div>

      <div className="grid gap-6">
        {/* Service Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Service Information
            </CardTitle>
            <CardDescription>Basic service details and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.serviceType && <p className="text-sm text-red-500">{errors.serviceType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceStartDate">Service Start Date *</Label>
                <Input
                  id="serviceStartDate"
                  type="date"
                  value={serviceStartDate}
                  onChange={(e) => setServiceStartDate(e.target.value)}
                />
                {errors.serviceStartDate && <p className="text-sm text-red-500">{errors.serviceStartDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceEndDate">Service End Date *</Label>
                <Input
                  id="serviceEndDate"
                  type="date"
                  value={serviceEndDate}
                  onChange={(e) => setServiceEndDate(e.target.value)}
                />
                {errors.serviceEndDate && <p className="text-sm text-red-500">{errors.serviceEndDate}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Service Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the service performed, issues found, and work completed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Parts Used */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Parts Used
              </div>
              <Button onClick={addPart} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Part
              </Button>
            </CardTitle>
            <CardDescription>List all parts used in this service</CardDescription>
          </CardHeader>
          <CardContent>
            {parts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No parts added yet</p>
                <p className="text-sm">Add parts manually or upload an Excel file</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Part Number</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parts.map((part, index) => (
                      <TableRow key={part.id}>
                        <TableCell>
                          <Select
                            value={part.partNumber}
                            onValueChange={(value) => updatePart(part.id, "partNumber", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select part" />
                            </SelectTrigger>
                            <SelectContent>
                              {partsCatalog.map((catalogPart) => (
                                <SelectItem key={catalogPart.number} value={catalogPart.number}>
                                  {catalogPart.number}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors[`part-${index}-number`] && (
                            <p className="text-xs text-red-500 mt-1">{errors[`part-${index}-number`]}</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Input
                            value={part.description}
                            onChange={(e) => updatePart(part.id, "description", e.target.value)}
                            placeholder="Part description"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={part.quantity}
                            onChange={(e) => updatePart(part.id, "quantity", Number.parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                          {errors[`part-${index}-quantity`] && (
                            <p className="text-xs text-red-500 mt-1">{errors[`part-${index}-quantity`]}</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={part.unitPrice}
                            onChange={(e) => updatePart(part.id, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                            className="w-24"
                          />
                          {errors[`part-${index}-price`] && (
                            <p className="text-xs text-red-500 mt-1">{errors[`part-${index}-price`]}</p>
                          )}
                        </TableCell>
                        <TableCell>${(part.quantity * part.unitPrice).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => removePart(part.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Parts Cost</p>
                    <p className="text-2xl font-bold">${calculateTotal().toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}

            {errors.parts && <p className="text-sm text-red-500 mt-2">{errors.parts}</p>}
          </CardContent>
        </Card>

        {/* Excel Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Excel Upload
            </CardTitle>
            <CardDescription>Upload parts list using our Excel template format</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button onClick={downloadTemplate} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
              <span className="text-sm text-muted-foreground">Use our template to ensure proper formatting</span>
            </div>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <Label htmlFor="excel-upload" className="cursor-pointer">
                    <span className="text-sm font-medium">Click to upload Excel file</span>
                    <Input
                      id="excel-upload"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground">Supports .xlsx and .xls files up to 5MB</p>
                </div>
              </div>

              {uploadedFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">{uploadedFile.name}</span>
                    </div>
                    <Button
                      onClick={() => setUploadedFile(null)}
                      size="sm"
                      variant="ghost"
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    File uploaded successfully. Parts have been populated below.
                  </p>
                </div>
              )}

              {errors.file && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-800">{errors.file}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="min-w-32">
            <Send className="h-4 w-4 mr-2" />
            Submit RO
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              RO Recorded Successfully
            </DialogTitle>
            <DialogDescription>
              Your repair order has been recorded and assigned ID: <strong>{generatedROId}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">RO Summary</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Service Type:</strong> {serviceTypes.find((t) => t.value === serviceType)?.label}
                </p>
                <p>
                  <strong>Service Period:</strong> {serviceStartDate} to {serviceEndDate}
                </p>
                <p>
                  <strong>Parts Count:</strong> {parts.length} items
                </p>
                <p>
                  <strong>Total Cost:</strong> ${calculateTotal().toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSuccessModal(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowSuccessModal(false)
                  // Reset form for new RO
                }}
              >
                Record Another RO
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
