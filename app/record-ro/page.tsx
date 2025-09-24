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
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Upload,
  X,
  Plus,
  Trash2,
  Send,
  CheckCircle,
  AlertTriangle,
  Car,
  Wrench,
  ClipboardList,
  PenTool,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface Part {
  id: string
  name: string
  quantity: number
}

interface Labor {
  id: string
  type: string
  hours: number
}

export default function RecordROPage() {
  // General Information (Upper Section)
  const [vin, setVin] = useState("")
  const [softwareVersion, setSoftwareVersion] = useState("")
  const [odometerIn, setOdometerIn] = useState("")
  const [odometerOut, setOdometerOut] = useState("")
  const [faultCodes, setFaultCodes] = useState("")
  const [diagnosticFile, setDiagnosticFile] = useState<File | null>(null)
  const [repairStartDate, setRepairStartDate] = useState("")
  const [repairEndDate, setRepairEndDate] = useState("")
  const [mobileService, setMobileService] = useState(false)
  const [signatureFile, setSignatureFile] = useState<File | null>(null)

  const [claimType, setClaimType] = useState<"claims-eligible" | "non-claims-eligible" | null>(null)
  const [isClaimsEligibleOpen, setIsClaimsEligibleOpen] = useState(false)
  const [isNonClaimsEligibleOpen, setIsNonClaimsEligibleOpen] = useState(false)

  // Claims Eligible specific fields
  const [jobCode, setJobCode] = useState("")

  // Common fields for both claim types
  const [selectedParts, setSelectedParts] = useState<Part[]>([])
  const [laborEntries, setLaborEntries] = useState<Labor[]>([])
  const [cause, setCause] = useState("")
  const [correction, setCorrection] = useState("")
  const [customerConcern, setCustomerConcern] = useState("")

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [generatedROId, setGeneratedROId] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Dummy data
  const vinOptions = ["5UXTA6C07N9B12345", "5YJSA1E26HF000002", "5YJSA1E26HF000003"]
  const jobCodeOptions = [
    "JC001 - Battery Replacement",
    "JC002 - Brake System Repair",
    "JC003 - Software Update",
    "JC004 - Charging System Repair",
    "JC005 - HVAC System Service",
  ]
  const partsOptions = ["Battery Pack", "Brake Pads", "Air Filter", "Windshield Wipers"]
  const laborTypes = ["Diagnostic", "Repair", "Replacement", "Inspection"]

  const handleClaimTypeSelect = (type: "claims-eligible" | "non-claims-eligible") => {
    setClaimType(type)
    if (type === "claims-eligible") {
      setIsClaimsEligibleOpen(true)
      setIsNonClaimsEligibleOpen(false)
    } else {
      setIsNonClaimsEligibleOpen(true)
      setIsClaimsEligibleOpen(false)
    }
  }

  const addPart = () => {
    const newPart: Part = {
      id: Date.now().toString(),
      name: "",
      quantity: 1,
    }
    setSelectedParts([...selectedParts, newPart])
  }

  const removePart = (id: string) => {
    setSelectedParts(selectedParts.filter((part) => part.id !== id))
  }

  const updatePart = (id: string, field: keyof Part, value: string | number) => {
    setSelectedParts(selectedParts.map((part) => (part.id === id ? { ...part, [field]: value } : part)))
  }

  const addLabor = () => {
    const newLabor: Labor = {
      id: Date.now().toString(),
      type: "",
      hours: 0,
    }
    setLaborEntries([...laborEntries, newLabor])
  }

  const removeLabor = (id: string) => {
    setLaborEntries(laborEntries.filter((labor) => labor.id !== id))
  }

  const updateLabor = (id: string, field: keyof Labor, value: string | number) => {
    setLaborEntries(laborEntries.map((labor) => (labor.id === id ? { ...labor, [field]: value } : labor)))
  }

  const handleDiagnosticFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
        setErrors({ ...errors, diagnosticFile: "Please upload a PDF or image file" })
        return
      }
      setDiagnosticFile(file)
      setErrors({ ...errors, diagnosticFile: "" })
    }
  }

  const handleSignatureFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        setErrors({ ...errors, signatureFile: "Please upload an image or PDF file" })
        return
      }
      setSignatureFile(file)
      setErrors({ ...errors, signatureFile: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // General Information validation
    if (!vin) newErrors.vin = "VIN is required"
    if (!softwareVersion) newErrors.softwareVersion = "Software version is required"
    if (!odometerIn) newErrors.odometerIn = "Odometer IN is required"
    if (!odometerOut) newErrors.odometerOut = "Odometer OUT is required"
    if (odometerIn && odometerOut && Number.parseInt(odometerIn) >= Number.parseInt(odometerOut)) {
      newErrors.odometerOut = "Odometer OUT must be greater than Odometer IN"
    }
    if (!repairStartDate) newErrors.repairStartDate = "Repair start date is required"
    if (!repairEndDate) newErrors.repairEndDate = "Repair end date is required"
    if (repairStartDate && repairEndDate && new Date(repairStartDate) > new Date(repairEndDate)) {
      newErrors.repairEndDate = "Repair end date must be after start date"
    }

    if (!claimType) newErrors.claimType = "Please select a claim type"
    if (claimType === "claims-eligible" && !jobCode)
      newErrors.jobCode = "Job code is required for claims eligible repairs"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    // Generate RO ID
    const roId = `RO-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
    setGeneratedROId(roId)
    setShowSuccessModal(true)

    // Reset form after delay
    setTimeout(() => {
      setVin("")
      setSoftwareVersion("")
      setOdometerIn("")
      setOdometerOut("")
      setFaultCodes("")
      setDiagnosticFile(null)
      setRepairStartDate("")
      setRepairEndDate("")
      setMobileService(false)
      setSignatureFile(null)
      setClaimType(null)
      setJobCode("")
      setSelectedParts([])
      setLaborEntries([])
      setCause("")
      setCorrection("")
      setCustomerConcern("")
      setIsClaimsEligibleOpen(false)
      setIsNonClaimsEligibleOpen(false)
      setErrors({})
    }, 2000)
  }

  const PartsSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Consumed / Causal Parts</h4>
        <Button onClick={addPart} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Part
        </Button>
      </div>

      {selectedParts.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          <Wrench className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No parts added yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedParts.map((part) => (
            <div key={part.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <Select value={part.name} onValueChange={(value) => updatePart(part.id, "name", value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select part" />
                </SelectTrigger>
                <SelectContent>
                  {partsOptions.map((partOption) => (
                    <SelectItem key={partOption} value={partOption}>
                      {partOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                min="1"
                placeholder="Qty"
                value={part.quantity}
                onChange={(e) => updatePart(part.id, "quantity", Number.parseInt(e.target.value) || 1)}
                className="w-20"
              />
              <Button
                onClick={() => removePart(part.id)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const LaborSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Labor</h4>
        <Button onClick={addLabor} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Labor
        </Button>
      </div>

      {laborEntries.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No labor entries added yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {laborEntries.map((labor) => (
            <div key={labor.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <Select value={labor.type} onValueChange={(value) => updateLabor(labor.id, "type", value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select labor type" />
                </SelectTrigger>
                <SelectContent>
                  {laborTypes.map((laborType) => (
                    <SelectItem key={laborType} value={laborType}>
                      {laborType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                min="0"
                step="0.5"
                placeholder="Hours"
                value={labor.hours}
                onChange={(e) => updateLabor(labor.id, "hours", Number.parseFloat(e.target.value) || 0)}
                className="w-24"
              />
              <Button
                onClick={() => removeLabor(labor.id)}
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const RepairDetailsSection = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cause">Cause</Label>
        <Textarea
          id="cause"
          placeholder="Battery degraded, not holding charge"
          value={cause}
          onChange={(e) => setCause(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="correction">Correction</Label>
        <Textarea
          id="correction"
          placeholder="Replaced battery with OEM unit"
          value={correction}
          onChange={(e) => setCorrection(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerConcern">Customer Concern</Label>
        <Textarea
          id="customerConcern"
          placeholder="Vehicle not starting reliably"
          value={customerConcern}
          onChange={(e) => setCustomerConcern(e.target.value)}
          rows={3}
        />
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Record RO</h1>
          <p className="text-muted-foreground">Comprehensive repair order documentation and tracking</p>
        </div>
        <Badge variant="outline" className="text-sm">
          Repairer View
        </Badge>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              General Information
            </CardTitle>
            <CardDescription>Vehicle and repair order details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vin">VIN *</Label>
                <Select value={vin} onValueChange={setVin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select VIN" />
                  </SelectTrigger>
                  <SelectContent>
                    {vinOptions.map((vinOption) => (
                      <SelectItem key={vinOption} value={vinOption}>
                        {vinOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.vin && <p className="text-sm text-red-500">{errors.vin}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="softwareVersion">Software Version *</Label>
                <Input
                  id="softwareVersion"
                  placeholder="v2025.09.1"
                  value={softwareVersion}
                  onChange={(e) => setSoftwareVersion(e.target.value)}
                />
                {errors.softwareVersion && <p className="text-sm text-red-500">{errors.softwareVersion}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="odometerIn">Odometer IN *</Label>
                <Input
                  id="odometerIn"
                  type="number"
                  placeholder="10000"
                  value={odometerIn}
                  onChange={(e) => setOdometerIn(e.target.value)}
                />
                {errors.odometerIn && <p className="text-sm text-red-500">{errors.odometerIn}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="odometerOut">Odometer OUT *</Label>
                <Input
                  id="odometerOut"
                  type="number"
                  placeholder="10250"
                  value={odometerOut}
                  onChange={(e) => setOdometerOut(e.target.value)}
                />
                {errors.odometerOut && <p className="text-sm text-red-500">{errors.odometerOut}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="faultCodes">Fault Codes & Diagnostic Codes</Label>
              <Textarea
                id="faultCodes"
                placeholder="Enter fault codes (e.g., P0300, B1234, U0101)"
                value={faultCodes}
                onChange={(e) => setFaultCodes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosticFile">Diagnostic Report (Optional)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <Label htmlFor="diagnosticFile" className="cursor-pointer">
                    <span className="text-sm font-medium">Upload PDF or Image</span>
                    <Input
                      id="diagnosticFile"
                      type="file"
                      accept=".pdf,image/*"
                      onChange={handleDiagnosticFileUpload}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">PDF or image files only</p>
                </div>

                {diagnosticFile && (
                  <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-800">{diagnosticFile.name}</span>
                      <Button
                        onClick={() => setDiagnosticFile(null)}
                        size="sm"
                        variant="ghost"
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {errors.diagnosticFile && <p className="text-sm text-red-500 mt-2">{errors.diagnosticFile}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="repairStartDate">Repair Start Date *</Label>
                <Input
                  id="repairStartDate"
                  type="date"
                  value={repairStartDate}
                  onChange={(e) => setRepairStartDate(e.target.value)}
                />
                {errors.repairStartDate && <p className="text-sm text-red-500">{errors.repairStartDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="repairEndDate">Repair End Date *</Label>
                <Input
                  id="repairEndDate"
                  type="date"
                  value={repairEndDate}
                  onChange={(e) => setRepairEndDate(e.target.value)}
                />
                {errors.repairEndDate && <p className="text-sm text-red-500">{errors.repairEndDate}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobileService"
                checked={mobileService}
                onCheckedChange={(checked) => setMobileService(checked as boolean)}
              />
              <Label htmlFor="mobileService">Mobile Service</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signatureFile">Customer Acknowledgement</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <div className="text-center">
                  <PenTool className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <Label htmlFor="signatureFile" className="cursor-pointer">
                    <span className="text-sm font-medium">Upload Signature</span>
                    <Input
                      id="signatureFile"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleSignatureFileUpload}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">Image or PDF files only</p>
                </div>

                {signatureFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">{signatureFile.name}</span>
                      </div>
                      <Button
                        onClick={() => setSignatureFile(null)}
                        size="sm"
                        variant="ghost"
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {errors.signatureFile && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-800">{errors.signatureFile}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Claim Type Selection</CardTitle>
            <CardDescription>Select the appropriate claim type for this repair order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errors.claimType && <p className="text-sm text-red-500">{errors.claimType}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant={claimType === "claims-eligible" ? "default" : "outline"}
                onClick={() => handleClaimTypeSelect("claims-eligible")}
                className="h-auto p-4 flex flex-col items-start"
              >
                <span className="font-medium">Claims Eligible</span>
                <span className="text-sm text-muted-foreground mt-1">
                  Repair covered under warranty or service campaign
                </span>
              </Button>

              <Button
                variant={claimType === "non-claims-eligible" ? "default" : "outline"}
                onClick={() => handleClaimTypeSelect("non-claims-eligible")}
                className="h-auto p-4 flex flex-col items-start"
              >
                <span className="font-medium">Non-Claims Eligible</span>
                <span className="text-sm text-muted-foreground mt-1">Customer pay or out-of-warranty repair</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {claimType === "claims-eligible" && (
          <Collapsible open={isClaimsEligibleOpen} onOpenChange={setIsClaimsEligibleOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      Claims Eligible Details
                    </div>
                    {isClaimsEligibleOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </CardTitle>
                  <CardDescription>Job codes, parts, labor, and repair details for warranty claims</CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobCode">Job Code *</Label>
                    <Select value={jobCode} onValueChange={setJobCode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job code" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobCodeOptions.map((code) => (
                          <SelectItem key={code} value={code}>
                            {code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.jobCode && <p className="text-sm text-red-500">{errors.jobCode}</p>}
                  </div>

                  <PartsSection />
                  <LaborSection />

                  <div>
                    <h4 className="font-medium mb-4">Repair Details (3C's)</h4>
                    <RepairDetailsSection />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {claimType === "non-claims-eligible" && (
          <Collapsible open={isNonClaimsEligibleOpen} onOpenChange={setIsNonClaimsEligibleOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5" />
                      Non-Claims Eligible Details
                    </div>
                    {isNonClaimsEligibleOpen ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </CardTitle>
                  <CardDescription>Parts, labor, and repair details for customer pay repairs</CardDescription>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  <PartsSection />
                  <LaborSection />

                  <div>
                    <h4 className="font-medium mb-4">Repair Details (3C's)</h4>
                    <RepairDetailsSection />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

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
                  <strong>VIN:</strong> {vin}
                </p>
                <p>
                  <strong>Software Version:</strong> {softwareVersion}
                </p>
                <p>
                  <strong>Odometer:</strong> {odometerIn} → {odometerOut}
                </p>
                <p>
                  <strong>Claim Type:</strong>{" "}
                  {claimType === "claims-eligible" ? "Claims Eligible" : "Non-Claims Eligible"}
                </p>
                {claimType === "claims-eligible" && jobCode && (
                  <p>
                    <strong>Job Code:</strong> {jobCode}
                  </p>
                )}
                <p>
                  <strong>Parts:</strong> {selectedParts.length} items
                </p>
                <p>
                  <strong>Labor Entries:</strong> {laborEntries.length} entries
                </p>
                <p>
                  <strong>Mobile Service:</strong> {mobileService ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSuccessModal(false)}>
                Close
              </Button>
              <Button onClick={() => setShowSuccessModal(false)}>Record Another RO</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
