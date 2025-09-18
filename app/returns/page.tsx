"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ClaimTypeSelection } from "@/components/returns/claim-type-selection"
import { OrderClaimFlow } from "@/components/returns/order-claim-flow"
import { Camera, CheckCircle, AlertTriangle, DollarSign, ChevronLeft } from "lucide-react"
import { BuyBackFlow } from "@/components/returns/buyback-flow"

export default function ReturnsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = React.useState("new-claim")
  const [currentStep, setCurrentStep] = React.useState<"question" | "order-claim" | "quality-claim" | "buyback-claim">(
    "question",
  )
  const [claimType, setClaimType] = React.useState<"order" | "quality" | "buyback" | null>(null)
  const [submittedClaims, setSubmittedClaims] = React.useState<any[]>([])

  const handleClaimTypeSelect = (type: "order" | "quality" | "buyback") => {
    setClaimType(type)
    if (type === "order") {
      setCurrentStep("order-claim")
    } else if (type === "quality") {
      setCurrentStep("quality-claim")
    } else if (type === "buyback") {
      setCurrentStep("buyback-claim")
    }
  }

  const handleClaimSubmit = (claimData: any) => {
    const newClaim = {
      id: `CLM-${Math.floor(Math.random() * 90000 + 10000)}`,
      type: claimType,
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
      ...claimData,
    }
    setSubmittedClaims((prev) => [...prev, newClaim])
    setActiveTab("status-tracking")

    toast({
      title: "Claim submitted successfully",
      description: `Claim ID: ${newClaim.id}. You can track the status in the Status Tracking tab.`,
    })
  }

  const resetFlow = () => {
    setCurrentStep("question")
    setClaimType(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Returns Management</h1>
          <p className="text-muted-foreground">File return claims and track their status</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-claim">New Claim</TabsTrigger>
          <TabsTrigger value="status-tracking">Status Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="new-claim" className="space-y-6">
          <div className="flex items-center justify-between">
            {currentStep !== "question" && (
              <Button variant="outline" onClick={resetFlow}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Start New Claim
              </Button>
            )}
          </div>

          {currentStep === "question" && <ClaimTypeSelection onSelect={handleClaimTypeSelect} />}

          {currentStep === "order-claim" && <OrderClaimFlow onSubmit={handleClaimSubmit} onBack={resetFlow} />}

          {currentStep === "quality-claim" && <QualityClaimFlow onSubmit={handleClaimSubmit} onBack={resetFlow} />}

          {currentStep === "buyback-claim" && <BuyBackFlow onSubmit={handleClaimSubmit} onBack={resetFlow} />}
        </TabsContent>

        <TabsContent value="status-tracking">
          <ClaimStatusTracking claims={submittedClaims} onNewClaim={() => setActiveTab("new-claim")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function QualityClaimFlow({ onSubmit, onBack }: { onSubmit: (data: any) => void; onBack: () => void }) {
  const [selectedAlert, setSelectedAlert] = React.useState<any>(null)
  const [stockQuantity, setStockQuantity] = React.useState(0)
  const [notes, setNotes] = React.useState("")

  const qualityAlerts = [
    {
      alertId: "QA-2024-001",
      partNumber: "BRK-PAD-001",
      description: "High Performance Brake Pad Set",
      issueDate: "2024-01-20",
      severity: "High",
      reason: "Potential premature wear under extreme conditions",
    },
    {
      alertId: "QA-2024-002",
      partNumber: "AIR-FLT-205",
      description: "Engine Air Filter",
      issueDate: "2024-01-22",
      severity: "Medium",
      reason: "Manufacturing defect affecting filtration efficiency",
    },
  ]

  const handleSubmit = () => {
    const claimData = {
      alertId: selectedAlert.alertId,
      partNumber: selectedAlert.partNumber,
      stockQuantity,
      notes,
    }
    onSubmit(claimData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Active Quality Alerts</CardTitle>
          <CardDescription>Select a quality alert to file a return claim</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {qualityAlerts.map((alert) => (
              <div
                key={alert.alertId}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAlert?.alertId === alert.alertId
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="font-medium">{alert.partNumber}</span>
                      <Badge variant={alert.severity === "High" ? "destructive" : "secondary"}>{alert.severity}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{alert.description}</div>
                    <div className="text-sm text-muted-foreground">Issue: {alert.reason}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedAlert && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Quality Alert Claim</CardTitle>
            <CardDescription>Report the stock quantity you currently hold for this flagged part</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Current Stock Quantity *</Label>
              <Input
                type="number"
                min={0}
                placeholder="Enter quantity you have in stock"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Math.max(0, Number(e.target.value) || 0))}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Enter the total quantity of this part you currently have in your inventory
              </p>
            </div>

            <div>
              <Label>Additional Notes</Label>
              <Textarea
                placeholder="Any additional information about your stock or the quality issue..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Next Steps</AlertTitle>
              <AlertDescription>
                After submitting your stock quantity, Car Company will review and approve your claim. You will then
                receive instructions to either return the parts or scrap them at your facility.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={stockQuantity === 0}>
                Submit Stock Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ClaimStatusTracking({ claims, onNewClaim }: { claims: any[]; onNewClaim: () => void }) {
  const [selectedClaim, setSelectedClaim] = React.useState<any>(null)
  const [scrapProof, setScrapProof] = React.useState<any[]>([])
  const [labelGenerated, setLabelGenerated] = React.useState<string | null>(null)
  const [returnInitiated, setReturnInitiated] = React.useState(false)
  const { toast } = useToast()

  const allClaims = [
    {
      id: "CLM-90557",
      type: "order",
      status: "approved",
      disposition: "scrap",
      submittedDate: "2024-01-10",
      orderNumber: "ORD-2024-001",
      totalParts: 3,
      approvedDate: "2024-01-15",
    },
    {
      id: "CLM-20616",
      type: "order",
      status: "approved",
      disposition: "return",
      submittedDate: "2024-01-12",
      orderNumber: "ORD-2024-005",
      totalParts: 5,
      approvedDate: "2024-01-18",
    },
    {
      id: "CLM-39936",
      type: "order",
      status: "approved",
      disposition: "return",
      submittedDate: "2024-01-20",
      orderNumber: "ORD-2024-008",
      totalParts: 7,
      approvedDate: "2024-01-25",
    },
    ...claims,
  ]

  const handleScrapSubmission = () => {
    if (scrapProof.length > 0) {
      setSelectedClaim({ ...selectedClaim, status: "scrap-submitted" })
    }
  }

  const handleGenerateLabel = () => {
    const trackingNumber = `LBL-${Math.floor(Math.random() * 900000 + 100000)}`
    setLabelGenerated(trackingNumber)
    toast({
      title: "Shipping Label Generated",
      description: `Label ${trackingNumber} has been created. You can now initiate the return.`,
    })
  }

  const handleInitiateReturn = () => {
    setReturnInitiated(true)
    setSelectedClaim({ ...selectedClaim, status: "return-initiated" })
    toast({
      title: "Return Initiated",
      description: "Return has been started. Parts are ready for pickup.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Claim Status Tracking</CardTitle>
          <CardDescription>View and manage your submitted claims</CardDescription>
        </CardHeader>
        <CardContent>
          {allClaims.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No claims submitted yet</p>
              <Button onClick={onNewClaim}>Submit Your First Claim</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {allClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedClaim(claim)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{claim.id}</div>
                      <div className="text-sm text-muted-foreground">
                        Type: {claim.type === "order" ? "Order Claim" : "Quality Alert"} | Submitted:{" "}
                        {claim.submittedDate}
                      </div>
                      {claim.orderNumber && (
                        <div className="text-sm text-muted-foreground">
                          Order: {claim.orderNumber} | Parts: {claim.totalParts}
                        </div>
                      )}
                    </div>
                    <Badge
                      variant={
                        claim.status === "pending" ? "secondary" : claim.status === "approved" ? "default" : "default"
                      }
                      className={claim.status === "approved" ? "bg-green-100 text-green-800" : ""}
                    >
                      {claim.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedClaim && (
        <Card>
          <CardHeader>
            <CardTitle>Claim Details - {selectedClaim.id}</CardTitle>
            <CardDescription>Review disposition and take required actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Badge className={selectedClaim.status === "approved" ? "bg-green-100 text-green-800 mt-1" : "mt-1"}>
                  {selectedClaim.status.replace("-", " ")}
                </Badge>
              </div>
              <div>
                <Label>Disposition</Label>
                <div className="mt-1">
                  {selectedClaim.disposition ? (
                    <Badge variant={selectedClaim.disposition === "scrap" ? "destructive" : "default"}>
                      {selectedClaim.disposition}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">Pending review</span>
                  )}
                </div>
              </div>
            </div>

            {selectedClaim.status === "approved" && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Claim Approved</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your claim has been approved for {selectedClaim.disposition}.
                  {selectedClaim.approvedDate && ` Approved on ${selectedClaim.approvedDate}.`}
                  {selectedClaim.disposition === "scrap" &&
                    " You may proceed with scrapping the parts and submit proof below."}
                </AlertDescription>
              </Alert>
            )}

            {selectedClaim.disposition === "scrap" &&
              (selectedClaim.status === "approved" || selectedClaim.status === "disposition-assigned") &&
              selectedClaim.status !== "scrap-submitted" && (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Approved for Scrap</AlertTitle>
                    <AlertDescription>
                      You may scrap these parts at your facility. Please submit proof of scrap to receive credit.
                    </AlertDescription>
                  </Alert>

                  <div>
                    <Label>Proof of Scrap *</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">Upload photos showing parts have been scrapped</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) {
                            const files = Array.from(e.target.files).map((file) => ({
                              name: file.name,
                              url: URL.createObjectURL(file),
                            }))
                            setScrapProof(files)
                          }
                        }}
                        className="hidden"
                        id="scrap-upload"
                      />
                      <Button variant="outline" onClick={() => document.getElementById("scrap-upload")?.click()}>
                        Upload Proof
                      </Button>
                    </div>

                    {scrapProof.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {scrapProof.map((proof, index) => (
                          <img
                            key={index}
                            src={proof.url || "/placeholder.svg"}
                            alt={proof.name}
                            className="w-full h-20 object-cover rounded border"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <Button onClick={handleScrapSubmission} disabled={scrapProof.length === 0}>
                    Submit Scrap Proof
                  </Button>
                </div>
              )}

            {selectedClaim.disposition === "return" &&
              (selectedClaim.status === "approved" || selectedClaim.status === "disposition-assigned") && (
                <div className="space-y-4">
                  <Alert className="border-blue-200 bg-blue-50">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">Approved for Return</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      Your claim has been approved for return to Car Company. A shipping label will be generated for you
                      to return the parts.
                    </AlertDescription>
                  </Alert>

                  {!labelGenerated ? (
                    <Button className="w-full" onClick={handleGenerateLabel}>
                      Generate Shipping Label
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Shipping Label Generated</AlertTitle>
                        <AlertDescription className="text-green-700">
                          Label Number: <strong>{labelGenerated}</strong>
                          <br />
                          Please print the label and attach it to your return package.
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full bg-transparent">
                          Download Label (PDF)
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          Print Label
                        </Button>
                      </div>

                      {!returnInitiated ? (
                        <Button className="w-full" onClick={handleInitiateReturn}>
                          Initiate Return Process
                        </Button>
                      ) : (
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertTitle>Return Initiated</AlertTitle>
                          <AlertDescription>
                            Return process has been started. Parts are ready for pickup. Tracking: {labelGenerated}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </div>
              )}

            {selectedClaim.status === "scrap-submitted" && (
              <Alert>
                <DollarSign className="h-4 w-4" />
                <AlertTitle>Scrap Proof Submitted</AlertTitle>
                <AlertDescription>
                  Your scrap proof has been submitted. Credit will be processed within 5-7 business days.
                </AlertDescription>
              </Alert>
            )}

            {selectedClaim.status === "return-initiated" && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Return In Progress</AlertTitle>
                <AlertDescription>
                  Your return has been initiated and is ready for pickup. Credit will be processed once parts are
                  received and verified.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
