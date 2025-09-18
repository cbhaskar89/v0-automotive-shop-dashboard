"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Download,
  Filter,
  Calendar,
  User,
  Wrench,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  MessageSquare,
  Send,
} from "lucide-react"

const mockCases = [
  {
    caseNumber: "FSE-2024-001",
    vin: "LUCID001234567890",
    carModel: "Air Grand Touring",
    escalationType: "Field Service Engineering",
    status: "Open",
    owner: "John Smith",
    supportType: "Diagnostics Assistance",
    dateCreated: "2024-01-15",
    priority: "High",
    description: "Battery thermal management system diagnostic issue",
    progress: 25,
    estimatedResolution: "2024-01-25",
    assignedTechnician: "Dr. Sarah Wilson",
    customerName: "Michael Johnson",
    mileageIn: "15,234",
    mileageOut: "15,234",
    symptoms: "Vehicle displays battery temperature warning intermittently during charging cycles",
    diagnosticSteps: [
      { step: "Initial diagnostic scan completed", completed: true, date: "2024-01-15" },
      { step: "Battery thermal sensors inspection", completed: true, date: "2024-01-16" },
      { step: "Cooling system pressure test", completed: false, date: null },
      { step: "Software calibration update", completed: false, date: null },
    ],
    notes: [
      {
        date: "2024-01-15",
        author: "John Smith",
        note: "Customer reports warning appears during fast charging sessions",
      },
      {
        date: "2024-01-16",
        author: "Dr. Sarah Wilson",
        note: "Thermal sensor readings within normal range, investigating cooling pump",
      },
    ],
    attachments: ["diagnostic_report_001.pdf", "thermal_readings.xlsx", "customer_complaint.jpg"],
    chatter: [
      {
        id: 1,
        sender: "John Smith",
        role: "Case Owner",
        message:
          "Hi team, customer is experiencing intermittent battery temperature warnings during fast charging. This is affecting their daily commute. Any initial thoughts?",
        timestamp: "2024-01-15 09:30 AM",
        isOwner: true,
      },
      {
        id: 2,
        sender: "Dr. Sarah Wilson",
        role: "Lucid Technician",
        message:
          "Thanks for the detailed report, John. I've reviewed the initial diagnostics. The thermal sensors appear to be functioning within normal parameters. Let me run some additional tests on the cooling system.",
        timestamp: "2024-01-15 11:45 AM",
        isOwner: false,
      },
      {
        id: 3,
        sender: "John Smith",
        role: "Case Owner",
        message:
          "Appreciate the quick response! Customer mentioned the issue is more frequent when ambient temperature is above 85°F. Could this be related to the cooling pump performance?",
        timestamp: "2024-01-15 02:15 PM",
        isOwner: true,
      },
      {
        id: 4,
        sender: "Dr. Sarah Wilson",
        role: "Lucid Technician",
        message:
          "That's a great observation! High ambient temperatures could indeed stress the cooling system. I'm scheduling a cooling system pressure test for tomorrow. Will keep you updated on the findings.",
        timestamp: "2024-01-16 08:20 AM",
        isOwner: false,
      },
      {
        id: 5,
        sender: "Mark Rodriguez",
        role: "Lucid Field Engineer",
        message:
          "I've seen similar cases in the Southwest region. Sarah, when you run the pressure test, also check the coolant flow rate at the battery pack inlet. We found some blockages in similar cases.",
        timestamp: "2024-01-16 10:30 AM",
        isOwner: false,
      },
    ],
  },
  {
    caseNumber: "FSE-2024-002",
    vin: "LUCID001234567891",
    carModel: "Air Pure",
    escalationType: "Parts Analysis",
    status: "In Progress",
    owner: "Sarah Johnson",
    supportType: "Parts Analysis",
    dateCreated: "2024-01-14",
    priority: "Medium",
    description: "Door handle mechanism failure analysis",
    progress: 60,
    estimatedResolution: "2024-01-22",
    assignedTechnician: "Mark Thompson",
    customerName: "Lisa Chen",
    mileageIn: "8,567",
    mileageOut: "8,567",
    symptoms: "Driver side door handle intermittently fails to extend when approached",
    diagnosticSteps: [
      { step: "Visual inspection of door handle mechanism", completed: true, date: "2024-01-14" },
      { step: "Electrical continuity test", completed: true, date: "2024-01-15" },
      { step: "Proximity sensor calibration", completed: true, date: "2024-01-16" },
      { step: "Replacement part installation", completed: false, date: null },
    ],
    notes: [
      { date: "2024-01-14", author: "Sarah Johnson", note: "Handle mechanism shows signs of wear on actuator spring" },
      {
        date: "2024-01-16",
        author: "Mark Thompson",
        note: "Proximity sensor functioning correctly, issue isolated to mechanical components",
      },
    ],
    attachments: ["handle_inspection.pdf", "electrical_test_results.pdf"],
  },
  {
    caseNumber: "FSE-2024-003",
    vin: "LUCID001234567892",
    carModel: "Air Sapphire",
    escalationType: "FHM Alerts",
    status: "Resolved",
    owner: "Mike Davis",
    supportType: "FHM Alerts",
    dateCreated: "2024-01-13",
    priority: "Low",
    description: "Fleet health monitoring alert investigation",
    progress: 100,
    estimatedResolution: "2024-01-13",
    assignedTechnician: "Dr. Mike Davis",
    customerName: "John Doe",
    mileageIn: "12,345",
    mileageOut: "12,345",
    symptoms: "FHM alert triggered for engine oil level",
    diagnosticSteps: [
      { step: "Check engine oil level", completed: true, date: "2024-01-13" },
      { step: "Engine oil change", completed: true, date: "2024-01-13" },
    ],
    notes: [
      { date: "2024-01-13", author: "Mike Davis", note: "Engine oil level was low, changed oil as per FHM alert" },
    ],
    attachments: ["engine_oil_change_report.pdf"],
  },
  {
    caseNumber: "FSE-2024-004",
    vin: "LUCID001234567893",
    carModel: "Air Touring",
    escalationType: "Warranty Alignment",
    status: "Open",
    owner: "Lisa Chen",
    supportType: "Warranty Alignment",
    dateCreated: "2024-01-12",
    priority: "High",
    description: "Warranty coverage verification for drivetrain components",
    progress: 0,
    estimatedResolution: "2024-01-20",
    assignedTechnician: "Dr. Lisa Chen",
    customerName: "Robert Brown",
    mileageIn: "9,876",
    mileageOut: "9,876",
    symptoms: "Customer reports drivetrain component failure",
    diagnosticSteps: [],
    notes: [],
    attachments: [],
  },
  {
    caseNumber: "FSE-2024-005",
    vin: "LUCID001234567894",
    carModel: "Gravity SUV",
    escalationType: "Diagnostics Assistance",
    status: "In Progress",
    owner: "Robert Wilson",
    supportType: "Diagnostics Assistance",
    dateCreated: "2024-01-11",
    priority: "Medium",
    description: "HVAC system performance diagnostic support",
    progress: 40,
    estimatedResolution: "2024-01-18",
    assignedTechnician: "Dr. Robert Wilson",
    customerName: "Emily White",
    mileageIn: "11,234",
    mileageOut: "11,234",
    symptoms: "HVAC system not cooling properly",
    diagnosticSteps: [
      { step: "Initial HVAC diagnostic scan", completed: true, date: "2024-01-11" },
      { step: "Thermostat inspection", completed: false, date: null },
    ],
    notes: [
      { date: "2024-01-11", author: "Robert Wilson", note: "HVAC system scan indicates possible thermostat issue" },
    ],
    attachments: ["hvac_diagnostic_scan.pdf"],
  },
]

export default function FSECaseSearchPage() {
  const [searchFilters, setSearchFilters] = useState({
    caseNumber: "",
    vin: "",
    carModel: "",
    escalationType: "",
    status: "",
    owner: "",
    supportType: "",
    dateFrom: "",
    dateTo: "",
  })

  const [filteredCases, setFilteredCases] = useState(mockCases)
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [showCaseDetails, setShowCaseDetails] = useState(false)
  const [newMessage, setNewMessage] = useState("")

  const handleCaseClick = (caseItem: any) => {
    setSelectedCase(caseItem)
    setShowCaseDetails(true)
  }

  const handleSearch = () => {
    const filtered = mockCases.filter((caseItem) => {
      return (
        (!searchFilters.caseNumber ||
          caseItem.caseNumber.toLowerCase().includes(searchFilters.caseNumber.toLowerCase())) &&
        (!searchFilters.vin || caseItem.vin.toLowerCase().includes(searchFilters.vin.toLowerCase())) &&
        (!searchFilters.carModel || caseItem.carModel === searchFilters.carModel) &&
        (!searchFilters.escalationType || caseItem.escalationType === searchFilters.escalationType) &&
        (!searchFilters.status || caseItem.status === searchFilters.status) &&
        (!searchFilters.owner || caseItem.owner.toLowerCase().includes(searchFilters.owner.toLowerCase())) &&
        (!searchFilters.supportType || caseItem.supportType === searchFilters.supportType)
      )
    })
    setFilteredCases(filtered)
  }

  const handleReset = () => {
    setSearchFilters({
      caseNumber: "",
      vin: "",
      carModel: "",
      escalationType: "",
      status: "",
      owner: "",
      supportType: "",
      dateFrom: "",
      dateTo: "",
    })
    setFilteredCases(mockCases)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge variant="destructive">{status}</Badge>
      case "In Progress":
        return <Badge variant="default">{status}</Badge>
      case "Resolved":
        return <Badge variant="secondary">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
            {priority}
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="default" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            {priority}
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            {priority}
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedCase) return

    const newChatMessage = {
      id: (selectedCase.chatter?.length || 0) + 1,
      sender: "John Smith", // Current logged-in user (case owner)
      role: "Case Owner",
      message: newMessage.trim(),
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      isOwner: true,
    }

    const updatedCase = {
      ...selectedCase,
      chatter: [...(selectedCase.chatter || []), newChatMessage],
    }
    setSelectedCase(updatedCase)

    const updatedCases = mockCases.map((c) => (c.caseNumber === selectedCase.caseNumber ? updatedCase : c))
    setFilteredCases(updatedCases)

    setNewMessage("")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">FSE Case Search</h2>
          <p className="text-muted-foreground">Search and filter technical escalation cases</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search Filters
          </CardTitle>
          <CardDescription>Use the filters below to search for specific FSE cases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="caseNumber">Case Number</Label>
              <Input
                id="caseNumber"
                placeholder="Enter case number..."
                value={searchFilters.caseNumber}
                onChange={(e) => setSearchFilters({ ...searchFilters, caseNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vin">VIN</Label>
              <Input
                id="vin"
                placeholder="Enter VIN..."
                value={searchFilters.vin}
                onChange={(e) => setSearchFilters({ ...searchFilters, vin: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carModel">Car Model</Label>
              <Select
                value={searchFilters.carModel}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, carModel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select car model" />
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="escalationType">Escalation Type</Label>
              <Select
                value={searchFilters.escalationType}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, escalationType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select escalation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Field Service Engineering">Field Service Engineering</SelectItem>
                  <SelectItem value="FHM Alerts">FHM Alerts</SelectItem>
                  <SelectItem value="Diagnostics Assistance">Diagnostics Assistance</SelectItem>
                  <SelectItem value="Parts Analysis">Parts Analysis</SelectItem>
                  <SelectItem value="Warranty Alignment">Warranty Alignment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={searchFilters.status}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Input
                id="owner"
                placeholder="Enter owner name..."
                value={searchFilters.owner}
                onChange={(e) => setSearchFilters({ ...searchFilters, owner: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supportType">Support Type</Label>
              <Select
                value={searchFilters.supportType}
                onValueChange={(value) => setSearchFilters({ ...searchFilters, supportType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select support type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Field Service Engineering">Field Service Engineering</SelectItem>
                  <SelectItem value="FHM Alerts">FHM Alerts</SelectItem>
                  <SelectItem value="Diagnostics Assistance">Diagnostics Assistance</SelectItem>
                  <SelectItem value="Parts Analysis">Parts Analysis</SelectItem>
                  <SelectItem value="Warranty Alignment">Warranty Alignment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFrom">Date From</Label>
              <Input
                id="dateFrom"
                type="date"
                value={searchFilters.dateFrom}
                onChange={(e) => setSearchFilters({ ...searchFilters, dateFrom: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">Date To</Label>
              <Input
                id="dateTo"
                type="date"
                value={searchFilters.dateTo}
                onChange={(e) => setSearchFilters({ ...searchFilters, dateTo: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Cases
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Search Results ({filteredCases.length} cases found)</span>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case Number</TableHead>
                  <TableHead>VIN</TableHead>
                  <TableHead>Car Model</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Support Type</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem) => (
                  <TableRow key={caseItem.caseNumber}>
                    <TableCell className="font-medium">
                      <button
                        onClick={() => handleCaseClick(caseItem)}
                        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {caseItem.caseNumber}
                      </button>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{caseItem.vin}</TableCell>
                    <TableCell>{caseItem.carModel}</TableCell>
                    <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                    <TableCell>{getPriorityBadge(caseItem.priority)}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {caseItem.owner}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        {caseItem.supportType}
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {caseItem.dateCreated}
                    </TableCell>
                    <TableCell className="max-w-xs truncate" title={caseItem.description}>
                      {caseItem.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showCaseDetails} onOpenChange={setShowCaseDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Case Details - {selectedCase?.caseNumber}
            </DialogTitle>
            <DialogDescription>Comprehensive case information and current progress status</DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Case Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      {getStatusBadge(selectedCase.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Priority:</span>
                      {getPriorityBadge(selectedCase.priority)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Owner:</span>
                      <span className="text-sm">{selectedCase.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Assigned Technician:</span>
                      <span className="text-sm">{selectedCase.assignedTechnician}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Support Type:</span>
                      <span className="text-sm">{selectedCase.supportType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Est. Resolution:</span>
                      <span className="text-sm flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedCase.estimatedResolution}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Vehicle Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">VIN:</span>
                      <span className="text-sm font-mono">{selectedCase.vin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Model:</span>
                      <span className="text-sm">{selectedCase.carModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Customer:</span>
                      <span className="text-sm">{selectedCase.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Mileage In:</span>
                      <span className="text-sm">{selectedCase.mileageIn} miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Mileage Out:</span>
                      <span className="text-sm">{selectedCase.mileageOut} miles</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Case Progress ({selectedCase.progress}%)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={selectedCase.progress} className="mb-4" />
                  <div className="space-y-3">
                    {selectedCase.diagnosticSteps?.map((step: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={`text-sm ${step.completed ? "text-green-700" : "text-gray-600"}`}>
                          {step.step}
                        </span>
                        {step.date && <span className="text-xs text-gray-500 ml-auto">{step.date}</span>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Issue Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Reported Symptoms:</Label>
                    <p className="text-sm text-gray-700 mt-1">{selectedCase.symptoms}</p>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium">Case Description:</Label>
                    <p className="text-sm text-gray-700 mt-1">{selectedCase.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Case Communication & Chatter
                  </CardTitle>
                  <CardDescription>Real-time communication between case owner and Lucid technicians</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
                    {selectedCase.chatter?.map((message: any) => (
                      <div key={message.id} className={`flex ${message.isOwner ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.isOwner ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-sm font-medium ${message.isOwner ? "text-blue-100" : "text-gray-900"}`}
                            >
                              {message.sender}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                message.isOwner
                                  ? "bg-blue-500 text-blue-100"
                                  : message.role === "Lucid Technician"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {message.role}
                            </span>
                          </div>
                          <p className={`text-sm ${message.isOwner ? "text-white" : "text-gray-700"}`}>
                            {message.message}
                          </p>
                          <span className={`text-xs mt-2 block ${message.isOwner ? "text-blue-200" : "text-gray-500"}`}>
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message to the Lucid technical team..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[80px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="self-end">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>

                  {selectedCase.notes && selectedCase.notes.length > 0 && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Legacy Case Notes:</Label>
                        <div className="space-y-3">
                          {selectedCase.notes.map((note: any, index: number) => (
                            <div key={index} className="border-l-4 border-gray-300 pl-4 py-2 bg-gray-50 rounded-r">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-700">{note.author}</span>
                                <span className="text-xs text-gray-500">{note.date}</span>
                              </div>
                              <p className="text-sm text-gray-600">{note.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {selectedCase.attachments && selectedCase.attachments.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Attachments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedCase.attachments.map((attachment: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{attachment}</span>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
