"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ArrowLeft,
  User,
  Edit,
  MapPin,
  ChevronDown,
  ChevronRight,
  Building,
  Car,
  FileText,
  Activity,
} from "lucide-react"

interface Lead {
  id: string
  customerName: string
  email: string
  phone: string
  status: string
  leadSource: string
  leadCaptureForm: string
  priority: string
  lastSalesInteraction: string
  futureActivityDate: string
  generalNotes: string
  contactingStampDate: string
  engagedStampDate: string
  closedStampDate: string
  daysInOpenStatus: number
  daysInContactingStatus: number
  daysInEngagedStatus: number
  currentPromotion: string
  referredBy: string
  referralDate: string
  referralStatus: string
  leadType: string
  leadConversionDateTime: string
  leaseManagement: string
  leadSourcePlatform: string
  leadCaptureUser: string
  reEngagementDate: string
  closeReason: string
  lucidVehicleEPP: string
  activeLead: boolean
  firstCompletedTestDriveDate: string
  studioOwnership: string
  caseOrigin: string
  decisionMakers: string
  preferredContactMethod: string
  interestedModel: string
  interestedVehicleCondition: string
  makeOfCurrentCar: string
  modelOfCurrentCar: string
  evOwnership: string
  objections: string
  importantFeatures: string
  streetAddress: string
  city: string
  stateProvince: string
  zipCode: string
  country: string
  dma: string
  leadCycleMarket: string
  leadCreatedDate: string
  createdBy: string
  recordType: string
  lastModifiedBy: string
}

// Mock data for demonstration
const mockLead: Lead = {
  id: "1",
  customerName: "Jennifer Rodriguez",
  email: "jennifer.rodriguez@email.com",
  phone: "+1 555-0287",
  status: "Contacting",
  leadSource: "Website",
  leadCaptureForm: "Lucid Web Trade-In",
  priority: "High",
  lastSalesInteraction: "6/30/2025 5:34 AM",
  futureActivityDate: "7/5/2025",
  generalNotes: "Interested in Model S, currently drives Honda Civic. Looking for test drive availability next week.",
  contactingStampDate: "6/30/2025",
  engagedStampDate: "",
  closedStampDate: "",
  daysInOpenStatus: 2,
  daysInContactingStatus: 5,
  daysInEngagedStatus: 0,
  currentPromotion: "Summer Sales Event",
  referredBy: "Sarah Mitchell",
  referralDate: "6/28/2025",
  referralStatus: "Active",
  leadType: "Sales",
  leadConversionDateTime: "6/30/2025 5:34 AM",
  leaseManagement: "Standard",
  leadSourcePlatform: "Website",
  leadCaptureUser: "Lucid Motors 3",
  reEngagementDate: "7/10/2025",
  closeReason: "",
  lucidVehicleEPP: "Standard",
  activeLead: true,
  firstCompletedTestDriveDate: "",
  studioOwnership: "Downtown Studio",
  caseOrigin: "Web",
  decisionMakers: "Jennifer Rodriguez, Partner",
  preferredContactMethod: "Email",
  interestedModel: "Air Pure",
  interestedVehicleCondition: "New",
  makeOfCurrentCar: "Honda",
  modelOfCurrentCar: "Civic",
  evOwnership: "No",
  objections: "Price concerns, charging infrastructure",
  importantFeatures: "Range, luxury features, safety",
  streetAddress: "123 Main Street",
  city: "San Francisco",
  stateProvince: "California",
  zipCode: "94102",
  country: "US",
  dma: "San Francisco, CA",
  leadCycleMarket: "North America",
  leadCreatedDate: "6/30/2025 5:34 AM",
  createdBy: "Lucid Motors 3",
  recordType: "Active Lead",
  lastModifiedBy: "Lucid Motors 3",
}

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [lead] = useState<Lead>(mockLead)
  const [isEditing, setIsEditing] = useState(false)
  const [openSections, setOpenSections] = useState({
    situation: true,
    statusProgression: true,
    promotions: false,
    captureSystem: false,
    nextSteps: false,
    purchaseProfile: false,
    address: false,
    systemInfo: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-gray-100 text-gray-800"
      case "Contacting":
        return "bg-blue-100 text-blue-800"
      case "Engaged":
        return "bg-green-100 text-green-800"
      case "Order Commit":
        return "bg-purple-100 text-purple-800"
      case "Handoff":
        return "bg-orange-100 text-orange-800"
      case "Unresponsive":
        return "bg-red-100 text-red-800"
      case "Closed":
        return "bg-emerald-100 text-emerald-800"
      case "Expired":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Leads
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Lead: {lead.customerName}</h1>
              <p className="text-muted-foreground">
                {lead.email} • {lead.phone} • {lead.leadSource} • {lead.leadCaptureForm}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Payment Estimate
          </Button>
          <Button size="sm" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Save Changes" : "Edit Lead"}
          </Button>
        </div>
      </div>

      {/* Lead Status Pipeline */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Lead Status Pipeline</h3>
            <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto">
            {[
              { status: "Open", abbrev: "O", active: lead.status === "Open" },
              { status: "Contacting", abbrev: "C", active: lead.status === "Contacting" },
              { status: "Engaged", abbrev: "E", active: lead.status === "Engaged" },
              { status: "Order Commit", abbrev: "OC", active: lead.status === "Order Commit" },
              { status: "Handoff", abbrev: "H", active: lead.status === "Handoff" },
              { status: "Unresponsive", abbrev: "U", active: lead.status === "Unresponsive" },
              { status: "Closed", abbrev: "CL", active: lead.status === "Closed" },
              { status: "Expired", abbrev: "EX", active: lead.status === "Expired" },
            ].map((item, index) => (
              <div key={item.status} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    item.active ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {item.abbrev}
                </div>
                <span className={`ml-2 text-sm ${item.active ? "font-medium" : "text-muted-foreground"}`}>
                  {item.status}
                </span>
                {index < 7 && <div className="w-8 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Situation */}
          <Card>
            <Collapsible open={openSections.situation} onOpenChange={() => toggleSection("situation")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Situation
                    </CardTitle>
                    {openSections.situation ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div>
                    <Label>General Notes</Label>
                    {isEditing ? (
                      <Textarea value={lead.generalNotes} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm">{lead.generalNotes}</p>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Lead Status Progression */}
          <Card>
            <Collapsible open={openSections.statusProgression} onOpenChange={() => toggleSection("statusProgression")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Lead Status Progression
                    </CardTitle>
                    {openSections.statusProgression ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Contacting Stamp Date</Label>
                      <p className="text-sm mt-1">{lead.contactingStampDate}</p>
                    </div>
                    <div>
                      <Label>Days in Open Status</Label>
                      <p className="text-sm mt-1">{lead.daysInOpenStatus}</p>
                    </div>
                    <div>
                      <Label>Engaged Stamp Date</Label>
                      <p className="text-sm mt-1">{lead.engagedStampDate || "Not yet engaged"}</p>
                    </div>
                    <div>
                      <Label>Days in Contacting Status</Label>
                      <p className="text-sm mt-1">{lead.daysInContactingStatus}</p>
                    </div>
                    <div>
                      <Label>Closed Stamp Date</Label>
                      <p className="text-sm mt-1">{lead.closedStampDate || "Not closed"}</p>
                    </div>
                    <div>
                      <Label>Days in Engaged Status</Label>
                      <p className="text-sm mt-1">{lead.daysInEngagedStatus}</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Purchase Profile */}
          <Card>
            <Collapsible open={openSections.purchaseProfile} onOpenChange={() => toggleSection("purchaseProfile")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      Purchase Profile
                    </CardTitle>
                    {openSections.purchaseProfile ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Decision Maker(s)</Label>
                      <p className="text-sm mt-1">{lead.decisionMakers}</p>
                    </div>
                    <div>
                      <Label>Preferred Contact Method</Label>
                      <p className="text-sm mt-1">{lead.preferredContactMethod}</p>
                    </div>
                    <div>
                      <Label>Interested Model</Label>
                      <p className="text-sm mt-1">{lead.interestedModel}</p>
                    </div>
                    <div>
                      <Label>Interested Vehicle Condition</Label>
                      <p className="text-sm mt-1">{lead.interestedVehicleCondition}</p>
                    </div>
                    <div>
                      <Label>Make of Current Car</Label>
                      <p className="text-sm mt-1">{lead.makeOfCurrentCar}</p>
                    </div>
                    <div>
                      <Label>Model of Current Car</Label>
                      <p className="text-sm mt-1">{lead.modelOfCurrentCar}</p>
                    </div>
                    <div>
                      <Label>EV Ownership</Label>
                      <p className="text-sm mt-1">{lead.evOwnership}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Objections</Label>
                    <p className="text-sm mt-1">{lead.objections}</p>
                  </div>
                  <div>
                    <Label>Important Features</Label>
                    <p className="text-sm mt-1">{lead.importantFeatures}</p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Key Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Key Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Next Steps</Label>
                <p className="text-sm mt-1">Follow up call scheduled for Friday</p>
              </div>
            </CardContent>
          </Card>

          {/* Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Lead Name</Label>
                  <p className="text-sm mt-1">{lead.customerName}</p>
                </div>
                <div>
                  <Label>Region</Label>
                  <p className="text-sm mt-1">North America</p>
                </div>
                <div>
                  <Label>First Name</Label>
                  <p className="text-sm mt-1">{lead.customerName.split(" ")[0]}</p>
                </div>
                <div>
                  <Label>Owner</Label>
                  <p className="text-sm mt-1">{lead.createdBy}</p>
                </div>
                <div>
                  <Label>Last Name</Label>
                  <p className="text-sm mt-1">{lead.customerName.split(" ")[1]}</p>
                </div>
                <div>
                  <Label>Account</Label>
                  <p className="text-sm mt-1">{lead.customerName}</p>
                </div>
                <div>
                  <Label>Primary Email</Label>
                  <p className="text-sm mt-1">{lead.email}</p>
                </div>
                <div>
                  <Label>Contact</Label>
                  <p className="text-sm mt-1">{lead.customerName}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-sm mt-1">{lead.phone}</p>
                </div>
                <div>
                  <Label>Lead Status</Label>
                  <p className="text-sm mt-1">{lead.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <Collapsible open={openSections.address} onOpenChange={() => toggleSection("address")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Address Information
                    </CardTitle>
                    {openSections.address ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Street Address</Label>
                      <p className="text-sm mt-1">{lead.streetAddress}</p>
                    </div>
                    <div>
                      <Label>City</Label>
                      <p className="text-sm mt-1">{lead.city}</p>
                    </div>
                    <div>
                      <Label>State/Province</Label>
                      <p className="text-sm mt-1">{lead.stateProvince}</p>
                    </div>
                    <div>
                      <Label>Country</Label>
                      <p className="text-sm mt-1">{lead.country}</p>
                    </div>
                    <div>
                      <Label>Zip Code</Label>
                      <p className="text-sm mt-1">{lead.zipCode}</p>
                    </div>
                    <div>
                      <Label>DMA</Label>
                      <p className="text-sm mt-1">{lead.dma}</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* System Information */}
          <Card>
            <Collapsible open={openSections.systemInfo} onOpenChange={() => toggleSection("systemInfo")}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      System Information
                    </CardTitle>
                    {openSections.systemInfo ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Lead Created Date</Label>
                      <p className="text-sm mt-1">{lead.leadCreatedDate}</p>
                    </div>
                    <div>
                      <Label>Created By</Label>
                      <p className="text-sm mt-1">{lead.createdBy}</p>
                    </div>
                    <div>
                      <Label>Record Type</Label>
                      <p className="text-sm mt-1">{lead.recordType}</p>
                    </div>
                    <div>
                      <Label>Last Modified By</Label>
                      <p className="text-sm mt-1">{lead.lastModifiedBy}</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>
      </div>
    </div>
  )
}
