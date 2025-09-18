"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle } from "lucide-react"

export default function QualityAlertsPage() {
  const { toast } = useToast()
  const [selectedAlert, setSelectedAlert] = React.useState<any>(null)
  const [stockQuantity, setStockQuantity] = React.useState(0)
  const [notes, setNotes] = React.useState("")
  const [submittedReports, setSubmittedReports] = React.useState<any[]>([])

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
    {
      alertId: "QA-2024-003",
      partNumber: "OIL-FLT-100",
      description: "Oil Filter Cartridge",
      issueDate: "2024-01-25",
      severity: "High",
      reason: "Seal integrity issues causing potential leaks",
    },
  ]

  const handleSubmit = () => {
    const reportData = {
      id: `QAR-${Math.floor(Math.random() * 90000 + 10000)}`,
      alertId: selectedAlert.alertId,
      partNumber: selectedAlert.partNumber,
      stockQuantity,
      notes,
      submittedDate: new Date().toISOString().split("T")[0],
      status: "pending",
    }

    setSubmittedReports((prev) => [...prev, reportData])
    setSelectedAlert(null)
    setStockQuantity(0)
    setNotes("")

    toast({
      title: "Stock Report Submitted",
      description: `Report ID: ${reportData.id}. Car Company will review and provide disposition instructions.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quality Alerts</h1>
          <p className="text-muted-foreground">Manage quality alerts and report stock quantities for flagged parts</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Quality Alerts</CardTitle>
          <CardDescription>Parts flagged by Car Company for quality issues</CardDescription>
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
                    <div className="text-sm text-muted-foreground">Alert Date: {alert.issueDate}</div>
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
            <CardTitle>Submit Stock Report</CardTitle>
            <CardDescription>Report the stock quantity you currently hold for this flagged part</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-800">Quality Alert: {selectedAlert.partNumber}</AlertTitle>
              <AlertDescription className="text-orange-700">{selectedAlert.reason}</AlertDescription>
            </Alert>

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
                After submitting your stock quantity, Car Company will review and approve your report. You will then
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

      {submittedReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Submitted Reports</CardTitle>
            <CardDescription>Track your submitted quality alert reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submittedReports.map((report) => (
                <div key={report.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{report.id}</div>
                      <div className="text-sm text-muted-foreground">
                        Part: {report.partNumber} | Stock Reported: {report.stockQuantity} units
                      </div>
                      <div className="text-sm text-muted-foreground">Submitted: {report.submittedDate}</div>
                    </div>
                    <Badge variant="secondary">{report.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
