"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, CheckCircle, Upload, X, FileText, ImageIcon, File } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock VIN data with auto-population
const mockVINData = {
  "5YJ3E1EA4NF123456": {
    model: "Air Pure",
    warrantyExpiry: "2027-03-15",
    homologationCountry: "Germany",
    year: "2023",
  },
  "5YJ3E1EA5NF234567": {
    model: "Air Touring",
    warrantyExpiry: "2028-01-20",
    homologationCountry: "Netherlands",
    year: "2024",
  },
  "5YJ3E1EA6NF345678": {
    model: "Air Grand Touring",
    warrantyExpiry: "2027-11-10",
    homologationCountry: "Belgium",
    year: "2023",
  },
  "5YJ3E1EA7NF456789": {
    model: "Air Sapphire",
    warrantyExpiry: "2028-05-25",
    homologationCountry: "Norway",
    year: "2024",
  },
  "5YJ3E1EA8NF567890": {
    model: "Gravity SUV",
    warrantyExpiry: "2028-08-12",
    homologationCountry: "Sweden",
    year: "2024",
  },
}

export default function TechnicalEscalationPage() {
  const [selectedVIN, setSelectedVIN] = useState("")
  const [dateReceived, setDateReceived] = useState<Date>()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fseId, setFseId] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    carModel: "",
    mileageIn: "",
    mileageOut: "",
    caseOwner: "AutoMax Repair Center", // Auto-populated with logged-in repairer name
    technician: "",
    preDiagnostics: "",
    escalationType: "",
    warrantyExpiry: "",
    homologationCountry: "",
  })

  const handleVINSelect = (vin: string) => {
    setSelectedVIN(vin)
    const vinData = mockVINData[vin as keyof typeof mockVINData]
    if (vinData) {
      setFormData((prev) => ({
        ...prev,
        carModel: vinData.model,
        warrantyExpiry: vinData.warrantyExpiry,
        homologationCountry: vinData.homologationCountry,
      }))
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateFSEId = () => {
    const prefix = "FSE"
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${prefix}-${timestamp}-${random}`
  }

  const handleSubmit = () => {
    const generatedFSEId = generateFSEId()
    setFseId(generatedFSEId)
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFseId("")
    setSelectedVIN("")
    setDateReceived(undefined)
    setUploadedFiles([])
    setFormData({
      subject: "",
      description: "",
      carModel: "",
      mileageIn: "",
      mileageOut: "",
      caseOwner: "AutoMax Repair Center", // Keep auto-populated value on reset
      technician: "",
      preDiagnostics: "",
      escalationType: "",
      warrantyExpiry: "",
      homologationCountry: "",
    })
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).filter((file) => {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return false
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "video/mp4",
        "video/quicktime",
        "video/x-msvideo",
      ]

      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported.`)
        return false
      }

      return true
    })

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (file.type === "application/pdf") return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (isSubmitted) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Technical Escalation Submitted</h2>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h3 className="text-2xl font-semibold text-green-700">Escalation Successfully Submitted!</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-600 mb-2">Your FSE ID:</p>
                <p className="text-xl font-mono font-bold text-green-800">{fseId}</p>
              </div>
              <p className="text-muted-foreground">
                Your technical escalation has been submitted to the Field Service Engineering team. Please save your FSE
                ID for future reference.
              </p>
              <div className="flex justify-center space-x-4 pt-4">
                <Button variant="outline" onClick={resetForm}>
                  Create New Escalation
                </Button>
                <Button onClick={() => window.print()}>Print FSE ID</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Technical FSE Escalation</h2>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Technical Support Escalation Form</CardTitle>
          <CardDescription>Submit technical escalation cases to Lucid's Field Service Engineering team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief description of the issue"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
              />
            </div>

            {/* VIN Selection with Auto-suggest */}
            <div className="space-y-2">
              <Label htmlFor="vin">VIN</Label>
              <Select value={selectedVIN} onValueChange={handleVINSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Search and select VIN" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(mockVINData).map((vin) => (
                    <SelectItem key={vin} value={vin}>
                      {vin}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Car Model (Auto-populated) */}
            <div className="space-y-2">
              <Label htmlFor="carModel">Car Model</Label>
              <Select value={formData.carModel} onValueChange={(value) => handleInputChange("carModel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Lucid model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Air Pure">Air Pure</SelectItem>
                  <SelectItem value="Air Touring">Air Touring</SelectItem>
                  <SelectItem value="Air Grand Touring">Air Grand Touring</SelectItem>
                  <SelectItem value="Air Sapphire">Air Sapphire</SelectItem>
                  <SelectItem value="Gravity SUV">Gravity SUV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Car Received */}
            <div className="space-y-2">
              <Label>Date Car Received</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateReceived && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateReceived ? format(dateReceived, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateReceived} onSelect={setDateReceived} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Mileage In */}
            <div className="space-y-2">
              <Label htmlFor="mileageIn">Mileage In</Label>
              <Input
                id="mileageIn"
                type="number"
                placeholder="Enter mileage when received"
                value={formData.mileageIn}
                onChange={(e) => handleInputChange("mileageIn", e.target.value)}
              />
            </div>

            {/* Mileage Out */}
            <div className="space-y-2">
              <Label htmlFor="mileageOut">Mileage Out</Label>
              <Input
                id="mileageOut"
                type="number"
                placeholder="Enter mileage when completed"
                value={formData.mileageOut}
                onChange={(e) => handleInputChange("mileageOut", e.target.value)}
              />
            </div>

            {/* Case Owner */}
            <div className="space-y-2">
              <Label htmlFor="caseOwner">Case Owner</Label>
              <Input id="caseOwner" value={formData.caseOwner} disabled className="bg-muted" />
            </div>

            {/* Technical Escalation Support Type */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="escalationType">Technical Escalation Support Type</Label>
              <Select
                value={formData.escalationType}
                onValueChange={(value) => handleInputChange("escalationType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select escalation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="field-service-engineering">Field Service Engineering</SelectItem>
                  <SelectItem value="fhm-alerts">FHM Alerts</SelectItem>
                  <SelectItem value="diagnostics-assistance">Diagnostics Assistance</SelectItem>
                  <SelectItem value="parts-analysis">Parts Analysis</SelectItem>
                  <SelectItem value="warranty-alignment">Warranty Alignment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Auto-populated fields */}
            {formData.warrantyExpiry && (
              <div className="space-y-2">
                <Label>Warranty Expiry (Auto-populated)</Label>
                <Input value={formData.warrantyExpiry} disabled className="bg-muted" />
              </div>
            )}

            {formData.homologationCountry && (
              <div className="space-y-2">
                <Label>Homologation Country (Auto-populated)</Label>
                <Input value={formData.homologationCountry} disabled className="bg-muted" />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the technical issue"
              className="min-h-[100px]"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          {/* Pre-diagnostics Performed */}
          <div className="space-y-2">
            <Label htmlFor="preDiagnostics">Pre-diagnostics Performed</Label>
            <Textarea
              id="preDiagnostics"
              placeholder="Describe any diagnostic steps already performed"
              className="min-h-[100px]"
              value={formData.preDiagnostics}
              onChange={(e) => handleInputChange("preDiagnostics", e.target.value)}
            />
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                "hover:border-primary hover:bg-primary/5",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to select files</p>
              <p className="text-xs text-muted-foreground mb-4">
                Supported formats: Images, PDF, Documents, Videos (Max 10MB each)
              </p>
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt,.mp4,.mov,.avi"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                Select Files
              </Button>
            </div>

            {/* Display uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</Label>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file)}
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)} • {file.type}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline">Save as Draft</Button>
            <Button onClick={handleSubmit}>Submit Escalation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
