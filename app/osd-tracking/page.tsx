"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, FileText, CheckCircle, XCircle, Clock, AlertTriangle, Eye, Package } from "lucide-react"

export default function OSDTrackingPage() {
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

  const getPartStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge variant="default" className="bg-green-600 text-xs">
            Approved
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="destructive" className="text-xs">
            Rejected
          </Badge>
        )
      case "Under Review":
        return (
          <Badge variant="secondary" className="text-xs">
            Under Review
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">OS&D Claim Tracking</h1>
        <p className="text-muted-foreground">Track the status and approval results of your OS&D claims</p>
      </div>

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
