"use client"

import { ChartTooltip } from "@/components/ui/chart"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Camera,
  Video,
  FileImage,
  Plus,
  Upload,
  X,
  ChevronRight,
  Save,
  Send,
  Calculator,
  Trash2,
  Car,
  Search,
  AlertTriangle,
  Eye,
  ChevronLeft,
  ArrowUpDown,
  Download,
  Check,
  BarChart3,
  TrendingUp,
  Activity,
  Target,
  Zap,
  Brain,
  Filter,
} from "lucide-react"
import { AlertCircle } from "lucide-react" // Import AlertCircle
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Calendar, GitBranch, MapPin, RefreshCw, TrendingDown, MessageSquare } from "lucide-react"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: Record<string, { label: string; color: string }>
}

function ChartContainer({ className, config, children }: ChartContainerProps) {
  const cssVariables = Object.entries(config).reduce(
    (acc, [key, value]) => {
      acc[`--color-${key}`] = value.color
      return acc
    },
    {} as Record<string, string>,
  )

  return (
    <div className={cn("grid gap-2", className)} style={cssVariables}>
      {children}
    </div>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: string | number
}

function ChartTooltipContent({ active, payload, label }: ChartTooltipContentProps) {
  if (!active || !payload) {
    return null
  }
  return (
    <Card className="w-[200px]">
      <CardContent className="p-2">
        <p className="text-xs uppercase text-muted-foreground">{label}</p>
        <ul className="grid gap-1">
          {payload.map((item, index) => (
            <li key={index} className="flex items-center justify-between text-xs">
              <span className="capitalize">{item.dataKey}</span>
              <p className="font-medium">{item.value}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default function ClaimsPage() {
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams?.get("tab") || "create"
  const [activeTab, setActiveTab] = useState(tabFromUrl)

  useEffect(() => {
    const handleUrlChange = () => {
      const currentParams = new URLSearchParams(window.location.search)
      const currentTab = currentParams.get("tab") || "create"
      setActiveTab(currentTab)
    }

    const handleStorageChange = () => {
      handleUrlChange()
    }

    if (typeof window !== "undefined") {
      // Listen for URL changes
      window.addEventListener("popstate", handleUrlChange)
      window.addEventListener("storage", handleStorageChange)

      // Check for initial URL parameters
      const initialParams = new URLSearchParams(window.location.search)
      const initialTab = initialParams.get("tab") || "create"
      if (initialTab !== activeTab) {
        setActiveTab(initialTab)
      }

      const observer = new MutationObserver(() => {
        const currentParams = new URLSearchParams(window.location.search)
        const currentTab = currentParams.get("tab") || "create"
        if (currentTab !== activeTab) {
          setActiveTab(currentTab)
        }
      })

      observer.observe(document, { subtree: true, childList: true })

      return () => {
        window.removeEventListener("popstate", handleUrlChange)
        window.removeEventListener("storage", handleStorageChange)
        observer.disconnect()
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("popstate", handleUrlChange)
        window.removeEventListener("storage", handleStorageChange)
      }
    }
  }, [activeTab])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("tab", value)
      window.history.pushState({}, "", url.toString())

      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent("tabchange", { detail: { tab: value } }))
    }
  }

  const [showActionModal, setShowActionModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState<any>(null)
  const [actionResponse, setActionResponse] = useState("")
  const [actionFiles, setActionFiles] = useState<File[]>([])
  const [claimType, setClaimType] = useState("")
  const [claimTitle, setClaimTitle] = useState("")
  const [vin, setVin] = useState("")
  const [lucidId, setLucidId] = useState("")
  const [mileage, setMileage] = useState("")
  const [repairDate, setRepairDate] = useState("")
  const [claimDescription, setClaimDescription] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [parts, setParts] = useState<Array<{ id: string; partNumber: string; quantity: number; unitPrice: number }>>([])
  const [labor, setLabor] = useState<Array<{ id: string; laborCode: string; hours: number; hourlyRate: number }>>([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [generatedClaimId, setGeneratedClaimId] = useState("")
  const [isDraft, setIsDraft] = useState(false)
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showVinDetailsModal, setShowVinDetailsModal] = useState(false)
  const [selectedVinData, setSelectedVinData] = useState<any>(null)
  const [showPriorRepairsModal, setShowPriorRepairsModal] = useState(false)
  const [showServiceCampaignsModal, setShowServiceCampaignsModal] = useState(false)
  const [showActiveCasesModal, setShowActiveCasesModal] = useState(false)

  const [showVinDropdown, setShowVinDropdown] = useState(false)
  const [vinSearchTerm, setVinSearchTerm] = useState("")
  const [selectedActionClaim, setSelectedActionClaim] = useState<any>(null)
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null)

  const [escalatedClaims, setEscalatedClaims] = useState<Set<string>>(new Set())
  const [showEscalationSuccess, setShowEscalationSuccess] = useState(false)
  const [escalationMessage, setEscalationMessage] = useState("")

  const [isRedirecting, setIsRedirecting] = useState(false)
  const [redirectingClaimId, setRedirectingClaimId] = useState<string | null>(null)

  const [formData, setFormData] = useState<any>({})

  const [concern, setConcern] = useState("")
  const [cause, setCause] = useState("")
  const [correction, setCorrection] = useState("")

  const [fseCaseId, setFseCaseId] = useState("")
  const [showFseCaseDropdown, setShowFseCaseDropdown] = useState(false)
  const [fseCaseSearchTerm, setFseCaseSearchTerm] = useState("")

  const [actionSuccessMessage, setActionSuccessMessage] = useState<string>("")

  // FSE Case IDs from FSE Case Search page
  const fseCaseIds = ["FSE-2024-001", "FSE-2024-002", "FSE-2024-003", "FSE-2024-004", "FSE-2024-005"]

  const handleFseCaseInputChange = (value: string) => {
    setFseCaseId(value)
    setFseCaseSearchTerm(value)
    setShowFseCaseDropdown(value.length > 0)
  }

  const handleFseCaseSelect = (caseId: string) => {
    setFseCaseId(caseId)
    setShowFseCaseDropdown(false)
    setFseCaseSearchTerm("")
  }

  const vinToLucidIdMapping = {
    "5UXTA6C07N9B12345": "LUCID-0001",
    "5UXTA6C07N9B67890": "LUCID-0002",
    "5UXTA6C07N9B54321": "LUCID-0003",
    "5UXTA6C07N9B98765": "LUCID-0004",
    "5UXTA6C07N9B11111": "LUCID-0005",
  }

  const vinDatabase = {
    "5UXTA6C07N9B12345": {
      model: "Lucid Air Dream Edition",
      year: "2024",
      mileage: "12,450",
      warrantyStatus: "Active",
      batteryWarranty: "8 years / 100,000 miles",
      drivetrainWarranty: "4 years / 50,000 miles",
      infotainmentWarranty: "3 years / 36,000 miles",
      priorRepairs: [
        {
          id: "REP-001",
          date: "2024-01-15",
          description: "Battery cooling system maintenance",
          cost: "$450.00",
          status: "Completed",
        },
        {
          id: "REP-002",
          date: "2024-03-22",
          description: "Software update - infotainment system",
          cost: "$0.00",
          status: "Completed",
        },
        {
          id: "REP-003",
          date: "2024-05-10",
          description: "Door handle actuator replacement",
          cost: "$275.00",
          status: "Completed",
        },
      ],
      serviceCampaigns: [
        {
          id: "SC-2024-001",
          title: "Battery Management System Update",
          priority: "High",
          status: "Active",
          description: "Critical software update for battery management system to improve charging efficiency",
          deadline: "2024-12-31",
          dateIssued: "2024-01-05",
          affectedComponents: ["Battery Management System", "Charging Module"],
        },
        {
          id: "SC-2024-004",
          title: "DreamDrive Pro Calibration",
          priority: "Medium",
          status: "Active",
          description: "Sensor calibration update for enhanced autonomous driving features",
          deadline: "2025-01-15",
          dateIssued: "2024-02-10",
          affectedComponents: ["Front Radar", "Cameras"],
        },
      ],
      customerCareCases: [
        {
          caseNumber: "CASE-2024-001",
          subject: "Charging port issue",
          status: "Open",
          dateCreated: "2024-11-20",
          description: "Customer reports intermittent charging connection issues",
          owner: "John Doe",
          priority: "High",
        },
        {
          caseNumber: "CASE-2024-004",
          subject: "Glass roof noise complaint",
          status: "In Progress",
          dateCreated: "2024-11-18",
          description: "Wind noise from glass roof at highway speeds",
          owner: "Jane Smith",
          priority: "Medium",
        },
      ],
    },
    "5UXTA6C07N9B67890": {
      model: "Lucid Air Touring",
      year: "2024",
      mileage: "8,230",
      warrantyStatus: "Active",
      batteryWarranty: "8 years / 100,000 miles",
      drivetrainWarranty: "4 years / 50,000 miles",
      infotainmentWarranty: "3 years / 36,000 miles",
      priorRepairs: [
        {
          id: "REP-004",
          date: "2024-02-10",
          description: "Door handle sensor replacement",
          cost: "$320.00",
          status: "Completed",
        },
        {
          id: "REP-005",
          date: "2024-04-15",
          description: "Tire rotation and alignment",
          cost: "$180.00",
          status: "Completed",
        },
        {
          id: "REP-006",
          date: "2024-07-22",
          description: "12V battery replacement",
          cost: "$220.00",
          status: "Completed",
        },
      ],
      serviceCampaigns: [
        {
          id: "SC-2024-002",
          title: "Infotainment System Recall",
          priority: "Medium",
          status: "Active",
          description: "Software patch for infotainment system stability and performance improvements",
          deadline: "2024-11-30",
          dateIssued: "2024-03-01",
          affectedComponents: ["Infotainment System"],
        },
        {
          id: "SC-2024-005",
          title: "Air Suspension Firmware Update",
          priority: "Low",
          status: "Active",
          description: "Enhanced ride comfort and handling optimization",
          deadline: "2025-02-28",
          dateIssued: "2024-04-05",
          affectedComponents: ["Air Suspension System"],
        },
      ],
      customerCareCases: [
        {
          caseNumber: "CASE-2024-005",
          subject: "Infotainment screen flickering",
          status: "Open",
          dateCreated: "2024-11-22",
          description: "Intermittent screen flickering during startup",
          owner: "Bob Williams",
          priority: "Medium",
        },
      ],
    },
    "5UXTA6C07N9B54321": {
      model: "Lucid Air Pure",
      year: "2023",
      mileage: "25,680",
      warrantyStatus: "Active",
      batteryWarranty: "8 years / 100,000 miles",
      drivetrainWarranty: "4 years / 50,000 miles",
      infotainmentWarranty: "3 years / 36,000 miles",
      priorRepairs: [
        {
          id: "REP-007",
          date: "2023-12-05",
          description: "Brake pad replacement",
          cost: "$280.00",
          status: "Completed",
        },
        {
          id: "REP-008",
          date: "2024-01-18",
          description: "Air suspension calibration",
          cost: "$150.00",
          status: "Completed",
        },
        {
          id: "REP-009",
          date: "2024-06-12",
          description: "Cabin air filter replacement",
          cost: "$85.00",
          status: "Completed",
        },
        {
          id: "REP-010",
          date: "2024-09-08",
          description: "Software update - vehicle control unit",
          cost: "$0.00",
          status: "Completed",
        },
      ],
      serviceCampaigns: [
        {
          id: "SC-2024-003",
          title: "Air Suspension Software Update",
          priority: "Low",
          status: "Completed",
          description: "Performance optimization for air suspension system",
          deadline: "2024-10-15",
          dateIssued: "2024-05-15",
          affectedComponents: ["Air Suspension System"],
        },
        {
          id: "SC-2024-006",
          title: "Brake System Enhancement",
          priority: "Medium",
          status: "Active",
          description: "Brake pedal feel improvement through software calibration",
          deadline: "2024-12-15",
          dateIssued: "2024-06-20",
          affectedComponents: ["Brake Control Module"],
        },
      ],
      customerCareCases: [
        {
          caseNumber: "CASE-2024-006",
          subject: "Range estimation accuracy",
          status: "Open",
          dateCreated: "2024-11-19",
          description: "Customer reports range estimation inconsistencies",
          owner: "Alice Johnson",
          priority: "Low",
        },
      ],
    },
    "5UXTA6C07N9B98765": {
      model: "Lucid Air Grand Touring",
      year: "2024",
      mileage: "15,890",
      warrantyStatus: "Active",
      batteryWarranty: "8 years / 100,000 miles",
      drivetrainWarranty: "4 years / 50,000 miles",
      infotainmentWarranty: "3 years / 36,000 miles",
      priorRepairs: [
        {
          id: "REP-011",
          date: "2024-03-14",
          description: "Front camera calibration",
          cost: "$195.00",
          status: "Completed",
        },
        {
          id: "REP-012",
          date: "2024-08-20",
          description: "Wireless charging pad replacement",
          cost: "$340.00",
          status: "Completed",
        },
      ],
      serviceCampaigns: [
        {
          id: "SC-2024-007",
          title: "DreamDrive Pro Enhancement",
          priority: "High",
          status: "Active",
          description: "Advanced driver assistance system improvements and new features",
          deadline: "2024-12-20",
          dateIssued: "2024-07-01",
          affectedComponents: ["DreamDrive Pro System"],
        },
        {
          id: "SC-2024-008",
          title: "Charging System Optimization",
          priority: "Medium",
          status: "Active",
          description: "DC fast charging speed and efficiency improvements",
          deadline: "2025-01-31",
          dateIssued: "2024-08-15",
          affectedComponents: ["Charging System"],
        },
      ],
      customerCareCases: [
        {
          caseNumber: "CASE-2024-007",
          subject: "DreamDrive calibration issue",
          status: "Escalated",
          dateCreated: "2024-11-15",
          description: "Lane keeping assist not functioning properly after software update",
          owner: "David Lee",
          priority: "High",
        },
        {
          caseNumber: "CASE-2024-008",
          subject: "Wireless charging intermittent",
          status: "In Progress",
          dateCreated: "2024-11-21",
          description: "Phone charging stops randomly during drive",
          owner: "Emily Chen",
          priority: "Medium",
        },
      ],
    },
    "5UXTA6C07N9B11111": {
      model: "Lucid Air Sapphire",
      year: "2024",
      mileage: "5,420",
      warrantyStatus: "Active",
      batteryWarranty: "8 years / 100,000 miles",
      drivetrainWarranty: "4 years / 50,000 miles",
      infotainmentWarranty: "3 years / 36,000 miles",
      priorRepairs: [
        {
          id: "REP-013",
          date: "2024-10-05",
          description: "Performance mode calibration",
          cost: "$0.00",
          status: "Completed",
        },
      ],
      serviceCampaigns: [
        {
          id: "SC-2024-009",
          title: "Track Mode Enhancement",
          priority: "Low",
          status: "Active",
          description: "Performance optimization for track driving scenarios",
          deadline: "2025-03-15",
          dateIssued: "2024-09-01",
          affectedComponents: ["Track Mode System"],
        },
      ],
      customerCareCases: [],
    },
    "5UXTA6C07N9B22222": {
      model: "Lucid Air Dream Edition Range",
      year: "2023",
      mileage: "18,750",
      warrantyStatus: "Active",
      batteryWarranty: "8 years / 100,000 miles",
      drivetrainWarranty: "4 years / 50,000 miles",
      infotainmentWarranty: "3 years / 36,000 miles",
      priorRepairs: [
        {
          id: "REP-014",
          date: "2023-11-12",
          description: "Door seal replacement",
          cost: "$165.00",
          status: "Completed",
        },
        {
          id: "REP-015",
          date: "2024-02-28",
          description: "Ambient lighting module replacement",
          cost: "$290.00",
          status: "Completed",
        },
        {
          id: "REP-016",
          date: "2024-07-15",
          description: "Key fob battery replacement",
          cost: "$25.00",
          status: "Completed",
        },
      ],
      serviceCampaigns: [
        {
          id: "SC-2024-010",
          title: "Door Seal Improvement",
          priority: "Medium",
          status: "Completed",
          description: "Enhanced door seal design for better weather protection",
          deadline: "2024-09-30",
          dateIssued: "2024-08-01",
          affectedComponents: ["Door Seals"],
        },
      ],
      customerCareCases: [
        {
          caseNumber: "CASE-2024-009",
          subject: "Ambient lighting malfunction",
          status: "Open",
          dateCreated: "2024-11-17",
          description: "Interior ambient lighting not responding to settings",
          owner: "Michael Brown",
          priority: "Low",
        },
      ],
    },
    "5UXTA6C07N9B33333": {
      model: "Lucid Air Touring AWD",
      year: "2023",
      mileage: "32,100",
      warrantyStatus: "Out of Warranty - Drivetrain",
      batteryWarranty: "8 years / 100,000 miles",
      drivetrainWarranty: "Expired",
      infotainmentWarranty: "Expired",
      priorRepairs: [
        {
          id: "REP-017",
          date: "2023-08-22",
          description: "Motor mount replacement",
          cost: "$520.00",
          status: "Completed",
        },
        {
          id: "REP-018",
          date: "2023-12-10",
          description: "Infotainment system replacement",
          cost: "$1,250.00",
          status: "Completed",
        },
        {
          id: "REP-019",
          date: "2024-04-18",
          description: "Suspension strut replacement",
          cost: "$680.00",
          status: "Completed",
        },
        {
          id: "REP-020",
          date: "2024-09-25",
          description: "Brake rotor replacement",
          cost: "$450.00",
          status: "Completed",
        },
      ],
      serviceCampaigns: [
        {
          id: "SC-2024-011",
          title: "Motor Mount Reinforcement",
          priority: "High",
          status: "Completed",
          description: "Improved motor mount design for enhanced durability",
          deadline: "2024-06-30",
          dateIssued: "2024-05-01",
          affectedComponents: ["Motor Mounts"],
        },
      ],
      customerCareCases: [
        {
          caseNumber: "CASE-2024-010",
          subject: "Suspension noise complaint",
          status: "Open",
          dateCreated: "2024-11-14",
          description: "Unusual noise from front suspension over bumps",
          owner: "Sarah Davis",
          priority: "Medium",
        },
      ],
    },
  }

  const vinSuggestions = [
    "5UXTA6C07N9B12345",
    "5UXTA6C07N9B67890",
    "5UXTA6C07N9B54321",
    "5UXTA6C07N9B98765",
    "5UXTA6C07N9B11111",
  ]

  const lucidIdSuggestions = ["LUCID-0001", "LUCID-0002", "LUCID-0003", "LUCID-0004", "LUCID-0005"]

  const trackingClaims = [
    // Demo claims for escalation testing (all Under Review with different dates)
    {
      id: "CLM-2025-001",
      vin: "5UXTA6C07N9B12345",
      lucidId: "LID-789123",
      type: "Warranty",
      submissionDate: "2025-08-22", // Yesterday (1 day ago) - should be disabled
      status: "Under Review",
      amount: "$1,245.50",
      reviewer: "Sarah Chen",
    },
    {
      id: "CLM-2025-002",
      vin: "5UXTA6C07N9B12346",
      lucidId: "LID-789124",
      type: "Goodwill",
      submissionDate: "2025-08-21", // 2 days ago - should be disabled
      status: "Under Review",
      amount: "$890.00",
      reviewer: "Mike Johnson",
    },
    {
      id: "CLM-2025-003",
      vin: "5UXTA6C07N9B12347",
      lucidId: "LID-789125",
      type: "Warranty",
      submissionDate: "2025-08-20", // 3 days ago - should be disabled
      status: "Under Review",
      amount: "$2,150.75",
      reviewer: "Lisa Wang",
    },
    {
      id: "CLM-2025-004",
      vin: "5UXTA6C07N9B12348",
      lucidId: "LID-789126",
      type: "Recall",
      submissionDate: "2025-08-19", // 4 days ago - should be disabled
      status: "Under Review",
      amount: "$3,420.00",
      reviewer: "David Kim",
    },
    {
      id: "CLM-2025-005",
      vin: "5UXTA6C07N9B12349",
      lucidId: "LID-789127",
      type: "Warranty",
      submissionDate: "2025-08-16", // 7 days ago - should be enabled
      status: "Under Review",
      amount: "$4,250.00",
      reviewer: "Emma Rodriguez",
    },
    // Original claims with various statuses
    {
      id: "CLM-2025-006",
      vin: "5UXTA6C07N9B12350",
      lucidId: "LID-789128",
      type: "Goodwill",
      submissionDate: "2025-01-18",
      status: "Approved",
      amount: "$1,890.50",
      reviewer: "James Wilson",
    },
    {
      id: "CLM-2025-007",
      vin: "5UXTA6C07N9B12351",
      lucidId: "LID-789129",
      type: "Warranty",
      submissionDate: "2025-01-05",
      status: "Rejected",
      amount: "$4,250.00",
      reviewer: "Anna Martinez",
    },
    {
      id: "CLM-2025-008",
      vin: "5UXTA6C07N9B12352",
      lucidId: "LID-789130",
      type: "Campaign",
      submissionDate: "2025-01-14",
      status: "Info Required",
      amount: "$2,780.75",
      reviewer: "Robert Taylor",
    },
    {
      id: "CLM-2025-009",
      vin: "5UXTA6C07N9B12353",
      lucidId: "LID-789131",
      type: "Warranty",
      submissionDate: "2025-01-22",
      status: "Draft",
      amount: "$1,125.00",
      reviewer: "Not Assigned",
    },
    {
      id: "CLM-2025-010",
      vin: "5UXTA6C07N9B12354",
      lucidId: "LID-789132",
      type: "Goodwill",
      submissionDate: "2025-01-06",
      status: "Approved",
      amount: "$3,650.25",
      reviewer: "Michelle Brown",
    },
  ]

  const getEscalationTooltip = (claim: any) => {
    if (claim.status === "Rejected") {
      return "This claim cannot be escalated as it is rejected."
    }
    if (claim.status === "Info Required") {
      return "This claim cannot be escalated as OEM needs more information."
    }
    if (claim.status === "Approved") {
      return "This claim cannot be escalated as it has already been approved."
    }
    if (claim.status !== "Under Review") {
      return "This claim cannot be escalated, please contact Lucid administrator"
    }

    const submissionDate = new Date(claim.submissionDate)
    const today = new Date("2025-08-23")
    const daysDiff = Math.floor((today.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff < 5) {
      return "Only claims submitted for more than 5 days which are still under review can be escalated."
    }

    return ""
  }

  const canEscalateClaim = (claim: any) => {
    // Only "Under Review" claims can potentially be escalated
    if (claim.status !== "Under Review") {
      return false
    }

    const submissionDate = new Date(claim.submissionDate)
    const today = new Date("2025-08-23")
    const daysDiff = Math.floor((today.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24))

    return daysDiff >= 5
  }

  const handleEscalateClaim = (claimId: string) => {
    const claim = trackingClaims.find((c) => c.id === claimId)

    if (!claim) return

    if (escalatedClaims.has(claimId)) {
      setEscalationMessage("This claim has already been escalated")
      return
    }

    if (!canEscalateClaim(claim)) {
      setEscalationMessage("This claim cannot be escalated, please contact Lucid administrator")
      return
    }

    // Escalate the claim
    setEscalatedClaims((prev) => new Set([...prev, claimId]))
    setShowEscalationSuccess(true)
  }

  const handleVinSelect = (selectedVin: string) => {
    setVin(selectedVin)
    setVinSearchTerm(selectedVin)
    setShowVinDropdown(false)

    // Auto-fill corresponding Lucid ID
    const correspondingLucidId = vinToLucidIdMapping[selectedVin as keyof typeof vinToLucidIdMapping]
    if (correspondingLucidId) {
      setLucidId(correspondingLucidId)
    }

    const vinData = vinDatabase[selectedVin as keyof typeof vinDatabase]
    if (vinData) {
      setSelectedVinData(vinData)
      // Use setTimeout to ensure modal opens immediately after state update
      setTimeout(() => {
        setShowVinDetailsModal(true)
      }, 0)
    }
  }

  const handleVinInputChange = (value: string) => {
    setVin(value)
    setVinSearchTerm(value)
    setShowVinDropdown(value.length > 0)

    if (value.length === 17) {
      // Standard VIN length
      const vinData = vinDatabase[value as keyof typeof vinDatabase]
      if (vinData) {
        setSelectedVinData(vinData)
        // Use setTimeout to ensure modal opens immediately after state update
        setTimeout(() => {
          setShowVinDetailsModal(true)
        }, 0)
      }
    }
  }

  const [searchClaimId, setSearchClaimId] = useState("")
  const [showClaimSuggestions, setShowClaimSuggestions] = useState(false)

  // Mock Claim IDs for auto-suggestion
  const mockClaimIds = [
    "CLM-2024-001234",
    "CLM-2024-001235",
    "CLM-2024-001236",
    "CLM-2024-001237",
    "CLM-2024-001238",
    "CLM-2024-001239",
    "CLM-2024-001240",
    "CLM-2024-001241",
    "CLM-2024-001242",
    "CLM-2024-001243",
    "CLM-2024-001244",
    "CLM-2024-001245",
    "CLM-2024-001246",
    "CLM-2024-001247",
    "CLM-2024-001248",
    "CLM-2024-001249",
  ]

  // Filter Claim IDs based on search input
  const filteredClaimIds = mockClaimIds.filter((id) => id.toLowerCase().includes(searchClaimId.toLowerCase()))

  const partNumbers = [
    { number: "P001-ENGINE-OIL", description: "Engine Oil Filter", price: 45.99 },
    { number: "P002-BRAKE-PAD", description: "Front Brake Pads", price: 189.5 },
    { number: "P003-BATTERY", description: "12V Battery", price: 299.99 },
    { number: "P004-TIRE-SET", description: "Tire Set (4)", price: 899.99 },
    { number: "P005-HEADLIGHT", description: "LED Headlight Assembly", price: 450.0 },
  ]

  const laborCodes = [
    { code: "L001", description: "Engine Diagnostic", rate: 125.0 },
    { code: "L002", description: "Brake Service", rate: 95.0 },
    { code: "L003", description: "Electrical Repair", rate: 135.0 },
    { code: "L004", description: "Body Work", rate: 85.0 },
    { code: "L005", description: "Software Update", rate: 150.0 },
  ]

  const jobCodes = [
    { code: "J001", description: "Engine Repair" },
    { code: "J002", description: "Transmission Service" },
    { code: "J003", description: "Brake System Repair" },
    { code: "J004", description: "Electrical Diagnosis" },
    { code: "J005", description: "Body Panel Replacement" },
  ]

  const opCodes = [
    { code: "OP001", description: "Oil Change", laborTime: "0.5" },
    { code: "OP002", description: "Brake Pad Replacement", laborTime: "1.5" },
    { code: "OP003", description: "Battery Replacement", laborTime: "0.3" },
    { code: "OP004", description: "Tire Rotation", laborTime: "0.5" },
    { code: "OP005", description: "Engine Diagnostic", laborTime: "2.0" },
  ]

  const claims = [
    {
      id: "CLM-2024-001",
      vin: "5UXTA6C07N9B12345",
      status: "Approved",
      payType: "Warranty",
      amount: "$1,245.50",
      submittedDate: "2024-01-15",
      approvedDate: "2024-01-18",
      jobCode: "J001",
      description: "Engine oil leak repair",
    },
    {
      id: "CLM-2024-002",
      vin: "5UXTA6C07N9B67890",
      status: "Under Review",
      payType: "Goodwill",
      amount: "$892.30",
      submittedDate: "2024-01-20",
      approvedDate: null,
      jobCode: "J003",
      description: "Brake system malfunction",
    },
    {
      id: "CLM-2024-003",
      vin: "5UXTA6C07N9B54321",
      status: "Info Required",
      payType: "Campaign",
      amount: "$567.80",
      submittedDate: "2024-01-22",
      approvedDate: null,
      jobCode: "J004",
      description: "Software update required",
    },
  ]

  const actionsPending = [
    {
      id: "CLM-2024-001",
      vin: "5UXTA6C07N9B12345",
      lucidId: "LID-789123",
      claimType: "Warranty",
      submissionDate: "2024-01-15",
      pendingAction: "Upload part photo and cost breakdown",
      deadline: "2024-01-22",
      status: "Pending",
      daysOverdue: 0,
      requestedBy: "Lucid Technical Team",
      actionDetails:
        "Please provide high-resolution photos of the damaged battery pack and submit detailed cost breakdown for replacement parts.",
      actionType: "photo_upload",
    },
    {
      id: "CLM-2024-002",
      vin: "5UXTA6C07N9B67890",
      lucidId: "LID-456789",
      claimType: "Service Campaign",
      submissionDate: "2024-01-10",
      pendingAction: "Clarify repair description and timeline",
      deadline: "2024-01-18",
      status: "Overdue",
      daysOverdue: 3,
      requestedBy: "Lucid Quality Assurance",
      actionDetails:
        "The repair description is unclear. Please provide detailed steps taken and estimated completion timeline.",
      actionType: "text_response",
    },
    {
      id: "CLM-2024-003",
      vin: "5UXTA6C07N9B54321",
      lucidId: "LID-321654",
      claimType: "Goodwill",
      submissionDate: "2024-01-20",
      pendingAction: "Submit additional documentation",
      deadline: "2024-01-25",
      status: "Pending",
      daysOverdue: 0,
      requestedBy: "Lucid Customer Relations",
      actionDetails:
        "Please submit customer communication records and service history documentation to support goodwill claim.",
      actionType: "document_upload",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Info Required":
        return "bg-blue-100 text-blue-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Paid":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4" />
      case "Under Review":
        return <Clock className="h-4 w-4" />
      case "Info Required":
        return <AlertCircle className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      case "Paid":
        return <DollarSign className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const validateVinLucidIdMatch = () => {
    if (vin && lucidId) {
      const expectedLucidId = vinToLucidIdMapping[vin as keyof typeof vinToLucidIdMapping]
      if (expectedLucidId && expectedLucidId !== lucidId) {
        return `VIN mismatch: This VIN should be associated with ${expectedLucidId}`
      }
    }
    return null
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!claimType) newErrors.claimType = "Claim type is required"
    if (!claimTitle) newErrors.claimTitle = "Claim title is required"
    if (!vin) newErrors.vin = "VIN is required"
    if (!mileage) newErrors.mileage = "Mileage is required"
    if (!repairDate) newErrors.repairDate = "Repair date is required"
    if (!claimDescription) newErrors.claimDescription = "Claim description is required"

    const vinMismatchError = validateVinLucidIdMatch()
    if (vinMismatchError) {
      newErrors.lucidId = vinMismatchError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addPart = () => {
    const newPart = {
      id: Date.now().toString(),
      partNumber: "",
      quantity: 1,
      unitPrice: 0,
    }
    setParts([...parts, newPart])
  }

  const updatePart = (id: string, field: string, value: any) => {
    setParts(parts.map((part) => (part.id === id ? { ...part, [field]: value } : part)))
  }

  const removePart = (id: string) => {
    setParts(parts.filter((part) => part.id !== id))
  }

  const addLabor = () => {
    const newLabor = {
      id: Date.now().toString(),
      laborCode: "",
      hours: 1,
      hourlyRate: 0,
    }
    setLabor([...labor, newLabor])
  }

  const updateLabor = (id: string, field: string, value: any) => {
    setLabor(labor.map((l) => (l.id === id ? { ...l, [field]: value } : l)))
  }

  const removeLabor = (id: string) => {
    setLabor(labor.filter((l) => l.id !== id))
  }

  const calculatePartsTotal = () => {
    return parts.reduce((total, part) => total + part.quantity * part.unitPrice, 0)
  }

  const calculateLaborTotal = () => {
    return labor.reduce((total, l) => total + l.hours * l.hourlyRate, 0)
  }

  const calculateGrandTotal = () => {
    return calculatePartsTotal() + calculateLaborTotal()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((files) => files.filter((_, i) => i !== index))
  }

  const handleSaveAsDraft = () => {
    setIsDraft(true)
    setDraftSavedAt(new Date().toLocaleString())
    // In real app, save to backend/localStorage
  }

  const handleCreateAnotherClaim = () => {
    setShowSuccessModal(false)
    // Reset all form fields
    setClaimType("")
    setClaimTitle("")
    setVin("")
    setLucidId("")
    setMileage("")
    setRepairDate("")
    setClaimDescription("")
    setUploadedFiles([])
    setParts([])
    setLabor([])
    setErrors({})
    setGeneratedClaimId("")
  }

  const handleCloseAndRedirect = () => {
    setShowSuccessModal(false)
    window.location.href = "/assets"
  }

  const handleSubmitClaim = () => {
    if (!validateForm()) {
      return
    }

    const claimId = `CLM-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
    setGeneratedClaimId(claimId)
    setShowSuccessModal(true)
  }

  const handleActionSubmit = () => {
    // Handle action submission logic
    setShowActionModal(false)
    setActionResponse("")
    setActionFiles([])
    // Show success toast
  }

  const handleClaimOpen = async (claim: any) => {
    if (claim.status === "Draft") {
      // Redirect to Claim Creation tab with loading state
      setIsRedirecting(true)
      setRedirectingClaimId(claim.id)

      // Simulate loading and prefill draft data
      setTimeout(() => {
        setActiveTab("create")
        // Prefill form data for draft claim
        setFormData({
          claimType: claim.type,
          vin: claim.vin,
          lucidId: claim.lucidId,
          claimTitle: claim.title || "",
          repairDate: claim.repairDate || "",
          mileage: claim.mileage || "",
          claimDescription: claim.description || "",
          attachments: claim.attachments || [],
        })
        setParts(claim.parts || [{ partNumber: "", quantity: 1, unitPrice: 0, lineTotal: 0 }])
        setLabor(claim.labor || [{ laborCode: "", hours: 1, hourlyRate: 0, lineTotal: 0 }])

        setIsRedirecting(false)
        setRedirectingClaimId(null)
      }, 1000)
    } else {
      // Open claim detail modal for other statuses
      setSelectedClaimId(claim.id)
    }
  }

  const getTimelineStages = (status: string) => {
    const allStages = [
      { name: "Submitted", completed: true, date: "Jan 15, 2025" },
      { name: "Under Review", completed: false, date: "" },
      { name: "Info Required", completed: false, date: "" },
      { name: "Approved", completed: false, date: "" },
      { name: "Payment Processed", completed: false, date: "" },
    ]

    switch (status) {
      case "Under Review":
        return allStages.map((stage, index) => ({
          ...stage,
          completed: index <= 1,
          date: index === 1 ? "Jan 16, 2025" : stage.date,
        }))
      case "Info Required":
        return allStages.map((stage, index) => ({
          ...stage,
          completed: index <= 2,
          date: index === 2 ? "Jan 18, 2025" : index === 1 ? "Jan 16, 2025" : stage.date,
        }))
      case "Approved":
        return allStages.map((stage, index) => ({
          ...stage,
          completed: index <= 3,
          date: index === 3 ? "Jan 20, 2025" : index === 2 ? "Jan 18, 2025" : index === 1 ? "Jan 16, 2025" : stage.date,
        }))
      case "Rejected":
        return [
          { name: "Submitted", completed: true, date: "Jan 15, 2025" },
          { name: "Under Review", completed: true, date: "Jan 16, 2025" },
          { name: "Rejected", completed: true, date: "Jan 18, 2025" },
        ]
      default:
        return allStages
    }
  }

  const getReviewerNotes = (status: string) => {
    switch (status) {
      case "Under Review":
        return "Claim is currently being reviewed by our technical team. Initial assessment shows valid warranty coverage."
      case "Info Required":
        return "Additional documentation required: Please provide detailed photos of the damaged component and maintenance records for the past 6 months."
      case "Approved":
        return "Claim approved for warranty coverage. Payment will be processed within 5-7 business days."
      case "Rejected":
        return "Claim rejected due to damage being outside warranty coverage. Issue appears to be related to normal wear and tear."
      default:
        return "No reviewer notes available."
    }
  }

  const handleSubmitResponse = () => {
    setActionSuccessMessage("Response submitted successfully! Your submission has been sent to Lucid for review.")
    setTimeout(() => {
      setActionSuccessMessage("")
      setSelectedActionClaim(null)
    }, 3000)
  }

  const handleRequestExtension = () => {
    setActionSuccessMessage("Extension request sent to Lucid team. You will receive a response within 24 hours.")
    setTimeout(() => {
      setActionSuccessMessage("")
      setSelectedActionClaim(null)
    }, 3000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Claims Management</h2>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Claim Creation</TabsTrigger>
          <TabsTrigger value="tracking">Claim Tracking</TabsTrigger>
          <TabsTrigger value="actions-pending">Actions Pending</TabsTrigger>
          <TabsTrigger value="analytics">Claims Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card className="border border-slate-200 bg-white dark:bg-slate-900 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-4">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <div className="p-1.5 bg-white/10 rounded">
                  <FileText className="h-4 w-4" />
                </div>
                Claim Information
              </CardTitle>
              <CardDescription className="text-slate-300 text-sm">
                Basic information about your Lucid Motors warranty claim
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="claimType" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Claim Type *
                  </Label>
                  <Select value={claimType} onValueChange={setClaimType}>
                    <SelectTrigger
                      className={`h-10 border transition-colors ${errors.claimType ? "border-red-400 bg-red-50" : "border-slate-300 hover:border-slate-400 focus:border-slate-500"}`}
                    >
                      <SelectValue placeholder="Select claim type" />
                    </SelectTrigger>
                    <SelectContent className="border-slate-200">
                      <SelectItem value="warranty" className="hover:bg-slate-50">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                          Warranty Claim
                        </div>
                      </SelectItem>
                      <SelectItem value="goodwill" className="hover:bg-slate-50">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                          Goodwill Claim
                        </div>
                      </SelectItem>
                      <SelectItem value="recall" className="hover:bg-slate-50">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                          Recall Claim
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.claimType && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.claimType}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="claimTitle" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Claim Title *
                  </Label>
                  <Input
                    id="claimTitle"
                    value={claimTitle}
                    onChange={(e) => setClaimTitle(e.target.value)}
                    placeholder="Brief description of the issue"
                    className={`h-10 border transition-colors ${errors.claimTitle ? "border-red-400 bg-red-50" : "border-slate-300 hover:border-slate-400 focus:border-slate-500"}`}
                  />
                  {errors.claimTitle && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.claimTitle}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="fseCaseId" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    FSE Case ID
                  </Label>
                  <div className="relative">
                    <Input
                      id="fseCaseId"
                      value={fseCaseId}
                      onChange={(e) => handleFseCaseInputChange(e.target.value)}
                      onFocus={() => setShowFseCaseDropdown(fseCaseId.length > 0)}
                      placeholder="Select or type FSE Case ID"
                      className="h-10 border transition-colors border-slate-300 hover:border-slate-400 focus:border-slate-500 font-mono"
                    />
                    {showFseCaseDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded shadow-lg max-h-48 overflow-auto">
                        {fseCaseIds
                          .filter((caseId) => caseId.toLowerCase().includes(fseCaseSearchTerm.toLowerCase()))
                          .map((caseId) => (
                            <button
                              key={caseId}
                              type="button"
                              className="w-full px-3 py-2 text-left hover:bg-slate-50 focus:bg-slate-50 focus:outline-none border-b border-slate-100 last:border-b-0 transition-colors"
                              onClick={() => handleFseCaseSelect(caseId)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-sm">{caseId}</span>
                                <div className="p-0.5 bg-slate-100 rounded">
                                  <FileText className="h-3 w-3 text-slate-600" />
                                </div>
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                Technical Escalation Case
                              </div>
                            </button>
                          ))}
                        {fseCaseIds.filter((caseId) => caseId.toLowerCase().includes(fseCaseSearchTerm.toLowerCase()))
                          .length === 0 && (
                          <div className="px-3 py-2 text-sm text-slate-500">No matching FSE Case IDs found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="vin" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    VIN (Vehicle Identification Number) *
                  </Label>
                  <div className="relative">
                    <Input
                      id="vin"
                      value={vin}
                      onChange={(e) => handleVinInputChange(e.target.value)}
                      onFocus={() => setShowVinDropdown(vin.length > 0)}
                      placeholder="Enter VIN or select from suggestions"
                      className={`h-10 border transition-colors font-mono ${errors.vin ? "border-red-400 bg-red-50" : "border-slate-300 hover:border-slate-400 focus:border-slate-500"}`}
                    />
                    {showVinDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded shadow-lg max-h-48 overflow-auto">
                        {vinSuggestions
                          .filter((suggestion) => suggestion.toLowerCase().includes(vinSearchTerm.toLowerCase()))
                          .map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              className="w-full px-3 py-2 text-left hover:bg-slate-50 focus:bg-slate-50 focus:outline-none border-b border-slate-100 last:border-b-0 transition-colors"
                              onClick={() => handleVinSelect(suggestion)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-sm">{suggestion}</span>
                                <div className="p-0.5 bg-slate-100 rounded">
                                  <Car className="h-3 w-3 text-slate-600" />
                                </div>
                              </div>
                              {vinDatabase[suggestion as keyof typeof vinDatabase] && (
                                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                  {vinDatabase[suggestion as keyof typeof vinDatabase].model} (
                                  {vinDatabase[suggestion as keyof typeof vinDatabase].year})
                                </div>
                              )}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                  {errors.vin && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.vin}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lucidId" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Lucid ID
                  </Label>
                  <Input
                    id="lucidId"
                    value={lucidId}
                    onChange={(e) => setLucidId(e.target.value)}
                    onBlur={() => {
                      const vinMismatchError = validateVinLucidIdMatch()
                      if (vinMismatchError) {
                        setErrors((prev) => ({ ...prev, lucidId: vinMismatchError }))
                      } else {
                        setErrors((prev) => ({ ...prev, lucidId: "" }))
                      }
                    }}
                    placeholder="Enter Lucid ID"
                    className={`h-10 border transition-colors ${errors.lucidId ? "border-red-400 bg-red-50" : "border-slate-300 hover:border-slate-400 focus:border-slate-500"}`}
                    list="lucid-suggestions"
                  />
                  <datalist id="lucid-suggestions">
                    {lucidIdSuggestions.map((suggestion) => (
                      <option key={suggestion} value={suggestion} />
                    ))}
                  </datalist>
                  {errors.lucidId && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.lucidId}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="mileage" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Mileage *
                  </Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="Current vehicle mileage"
                    className={`h-10 border transition-colors ${errors.mileage ? "border-red-400 bg-red-50" : "border-slate-300 hover:border-slate-400 focus:border-slate-500"}`}
                  />
                  {errors.mileage && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.mileage}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="repairDate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Repair Date *
                  </Label>
                  <Input
                    id="repairDate"
                    type="date"
                    value={repairDate}
                    onChange={(e) => setRepairDate(e.target.value)}
                    className={`h-10 border transition-colors ${errors.repairDate ? "border-red-400 bg-red-50" : "border-slate-300 hover:border-slate-400 focus:border-slate-500"}`}
                  />
                  {errors.repairDate && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.repairDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="concern" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Concern
                  </Label>
                  <Textarea
                    id="concern"
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    placeholder="Describe the customer's concern or complaint..."
                    className="min-h-[80px] border transition-colors resize-none border-slate-300 hover:border-slate-400 focus:border-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cause" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Cause
                  </Label>
                  <Textarea
                    id="cause"
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                    placeholder="Identify the root cause of the issue..."
                    className="min-h-[80px] border transition-colors resize-none border-slate-300 hover:border-slate-400 focus:border-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="correction" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Correction
                  </Label>
                  <Textarea
                    id="correction"
                    value={correction}
                    onChange={(e) => setCorrection(e.target.value)}
                    placeholder="Detail the corrective action taken..."
                    className="min-h-[80px] border transition-colors resize-none border-slate-300 hover:border-slate-400 focus:border-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="claimDescription" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Claim Description *
                </Label>
                <Textarea
                  id="claimDescription"
                  value={claimDescription}
                  onChange={(e) => setClaimDescription(e.target.value)}
                  placeholder="Provide detailed explanation of the issue and repair performed..."
                  className={`min-h-[100px] border transition-colors resize-none ${errors.claimDescription ? "border-red-400 bg-red-50" : "border-slate-300 hover:border-slate-400 focus:border-slate-500"}`}
                />
                {errors.claimDescription && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />

                    {errors.claimDescription}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white dark:bg-slate-900 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-4">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <div className="p-1.5 bg-white/10 rounded">
                  <Calculator className="h-4 w-4" />
                </div>
                Parts & Labor
              </CardTitle>
              <CardDescription className="text-slate-300 text-sm">
                Add parts and labor costs for this claim
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                    Parts
                  </Label>
                  <Button onClick={addPart} size="sm" className="bg-slate-800 hover:bg-slate-900 text-white">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Part
                  </Button>
                </div>

                {parts.map((part) => (
                  <div
                    key={part.id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 border border-slate-200 rounded bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-slate-600">Part Number</Label>
                      <Select
                        value={part.partNumber || ""}
                        onValueChange={(value) => {
                          const selectedPart = partNumbers.find((p) => p.number === value)
                          updatePart(part.id, "partNumber", value)
                          if (selectedPart) {
                            updatePart(part.id, "unitPrice", selectedPart.price)
                          }
                        }}
                      >
                        <SelectTrigger className="h-9 border-slate-300 hover:border-slate-400">
                          <SelectValue placeholder="Select part" />
                        </SelectTrigger>
                        <SelectContent className="border-slate-200">
                          {partNumbers.map((p) => (
                            <SelectItem key={p.number} value={p.number} className="hover:bg-slate-50">
                              <div className="flex flex-col">
                                <span className="font-medium text-sm">{p.number}</span>
                                <span className="text-xs text-slate-500">{p.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-slate-600">Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        value={part.quantity}
                        onChange={(e) => updatePart(part.id, "quantity", Number.parseInt(e.target.value) || 1)}
                        className="h-9 border-slate-300 hover:border-slate-400 focus:border-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-slate-600">Unit Price</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={part.unitPrice}
                        onChange={(e) => updatePart(part.id, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                        className="h-9 border-slate-300 hover:border-slate-400 focus:border-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-slate-600">Line Total</Label>
                      <div className="h-9 px-3 py-2 bg-slate-200 border border-slate-300 rounded text-center text-sm font-medium text-slate-700">
                        ${(part.quantity * part.unitPrice).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-end">
                      <Button
                        onClick={() => removePart(part.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-slate-200"></div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                    Labor
                  </Label>
                  <Button onClick={addLabor} size="sm" className="bg-slate-800 hover:bg-slate-900 text-white">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Labor
                  </Button>
                </div>

                {labor.map((l) => (
                  <div
                    key={l.id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 border border-slate-200 rounded bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-slate-600">Labor Code</Label>
                      <Select
                        value={l.laborCode || ""}
                        onValueChange={(value) => {
                          const selectedLabor = laborCodes.find((lc) => lc.code === value)
                          updateLabor(l.id, "laborCode", value)
                          if (selectedLabor) {
                            updateLabor(l.id, "hourlyRate", selectedLabor.rate)
                          }
                        }}
                      >
                        <SelectTrigger className="h-9 border-slate-300 hover:border-slate-400">
                          <SelectValue placeholder="Select labor code" />
                        </SelectTrigger>
                        <SelectContent className="border-slate-200">
                          {laborCodes.map((lc) => (
                            <SelectItem key={lc.code} value={lc.code} className="hover:bg-slate-50">
                              <div className="flex flex-col">
                                <span className="font-medium text-sm">{lc.code}</span>
                                <span className="text-xs text-slate-500">{lc.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-slate-600">Hours</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={l.hours}
                        onChange={(e) => updateLabor(l.id, "hours", Number.parseFloat(e.target.value) || 0.1)}
                        className="h-9 border-slate-300 hover:border-slate-400 focus:border-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-slate-600">Hourly Rate</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={l.hourlyRate}
                        onChange={(e) => updateLabor(l.id, "hourlyRate", Number.parseFloat(e.target.value) || 0)}
                        className="h-9 border-slate-300 hover:border-slate-400 focus:border-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-slate-600">Line Total</Label>
                      <div className="h-9 px-3 py-2 bg-slate-200 border border-slate-300 rounded text-center text-sm font-medium text-slate-700">
                        ${(l.hours * l.hourlyRate).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-end">
                      <Button
                        onClick={() => removeLabor(l.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Card className="w-72 border border-slate-300 bg-slate-900 text-white">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300">Parts Total:</span>
                        <span className="font-medium">${calculatePartsTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300">Labor Total:</span>
                        <span className="font-medium">${calculateLaborTotal().toFixed(2)}</span>
                      </div>
                      <div className="w-full h-px bg-slate-600"></div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Grand Total:</span>
                        <span className="text-lg font-bold text-white">${calculateGrandTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white dark:bg-slate-900 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white py-4">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <div className="p-1.5 bg-white/10 rounded">
                  <Upload className="h-4 w-4" />
                </div>
                Attachments Upload
              </CardTitle>
              <CardDescription className="text-slate-300 text-sm">
                Upload supporting documents, images, and videos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="p-3 bg-slate-600 rounded-full mb-3 group-hover:bg-slate-700 transition-colors">
                      <Camera className="h-5 w-5 text-white" />
                    </div>
                    <Label htmlFor="photos" className="cursor-pointer font-medium text-slate-700 mb-1">
                      Upload Photos
                    </Label>
                    <Input
                      id="photos"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <p className="text-xs text-slate-500 text-center">Damage photos, repair proof</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="p-3 bg-slate-600 rounded-full mb-3 group-hover:bg-slate-700 transition-colors">
                      <Video className="h-5 w-5 text-white" />
                    </div>
                    <Label htmlFor="videos" className="cursor-pointer font-medium text-slate-700 mb-1">
                      Upload Videos
                    </Label>
                    <Input
                      id="videos"
                      type="file"
                      multiple
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <p className="text-xs text-slate-500 text-center">Installation proof</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="p-3 bg-slate-600 rounded-full mb-3 group-hover:bg-slate-700 transition-colors">
                      <FileImage className="h-5 w-5 text-white" />
                    </div>
                    <Label htmlFor="documents" className="cursor-pointer font-medium text-slate-700 mb-1">
                      Upload Documents
                    </Label>
                    <Input
                      id="documents"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <p className="text-xs text-slate-500 text-center">PDF, invoices, records</p>
                  </CardContent>
                </Card>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-base font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                    Uploaded Files ({uploadedFiles.length})
                  </Label>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-1.5 bg-slate-200 rounded">
                            <FileText className="h-4 w-4 text-slate-600" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-700">{file.name}</span>
                            <Badge variant="secondary" className="ml-2 bg-slate-200 text-slate-600 text-xs">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => removeFile(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {draftSavedAt && (
            <div className="flex items-center justify-center p-3 bg-slate-100 border border-slate-200 rounded">
              <div className="p-1 bg-slate-600 rounded-full mr-2">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Draft saved at {draftSavedAt}</span>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              onClick={handleSaveAsDraft}
              variant="outline"
              className="flex items-center gap-2 h-10 px-4 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-medium"
            >
              <Save className="h-4 w-4" />
              Save as Draft
            </Button>
            <Button
              onClick={handleSubmitClaim}
              className="h-10 px-6 bg-slate-800 hover:bg-slate-900 text-white font-medium flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Submit Claim
            </Button>
          </div>
        </TabsContent>

        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Claim Submitted Successfully
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Your warranty claim has been submitted successfully and is now being processed.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-500 mb-1">Claim ID</p>
                  <p className="text-lg font-semibold text-gray-900">{generatedClaimId}</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Please save this Claim ID for your records. You can track the status of your claim in the "Claim
                  Tracking" tab.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={handleCloseAndRedirect}
                variant="outline"
                className="border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700"
              >
                Close
              </Button>
              <Button onClick={handleCreateAnotherClaim} className="bg-green-600 hover:bg-green-700 text-white">
                Create Another Claim
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <TabsContent value="tracking" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Claims Tracking
              </CardTitle>
              <CardDescription>Track the status of your submitted warranty claims</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filters Section */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="searchClaimId">Search Claim ID</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter Claim ID"
                      className="pl-10"
                      value={searchClaimId}
                      onChange={(e) => {
                        setSearchClaimId(e.target.value)
                        setShowClaimSuggestions(e.target.value.length > 0)
                      }}
                      onFocus={() => setShowClaimSuggestions(searchClaimId.length > 0)}
                      onBlur={() => setTimeout(() => setShowClaimSuggestions(false), 200)}
                    />
                    {showClaimSuggestions && filteredClaimIds.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {filteredClaimIds.slice(0, 8).map((claimId) => (
                          <div
                            key={claimId}
                            className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                            onMouseDown={() => {
                              setSearchClaimId(claimId)
                              setShowClaimSuggestions(false)
                            }}
                          >
                            {claimId}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateRange">Date Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7">Last 7 days</SelectItem>
                      <SelectItem value="last30">Last 30 days</SelectItem>
                      <SelectItem value="last90">Last 90 days</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="statusFilter">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="info-required">Info Required</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="claimType">Claim Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="warranty">Warranty</SelectItem>
                      <SelectItem value="goodwill">Goodwill</SelectItem>
                      <SelectItem value="recall">Recall</SelectItem>
                      <SelectItem value="service">Service Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="searchVin">Search VIN/Lucid ID</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter VIN or Lucid ID" className="pl-10" />
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Showing 12 of 45 claims</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>

              {/* Claims Table */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="cursor-pointer hover:bg-muted/70">
                        Claim ID <ArrowUpDown className="ml-1 h-4 w-4 inline" />
                      </TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted/70">
                        VIN <ArrowUpDown className="ml-1 h-4 w-4 inline" />
                      </TableHead>
                      <TableHead>Lucid ID</TableHead>
                      <TableHead>Claim Type</TableHead>
                      <TableHead className="cursor-pointer hover:bg-muted/70">
                        Submission Date <ArrowUpDown className="ml-1 h-4 w-4 inline" />
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trackingClaims.map((claim) => (
                      <TableRow
                        key={claim.id}
                        className="hover:bg-muted/30 cursor-pointer"
                        onClick={() => handleClaimOpen(claim)}
                      >
                        <TableCell className="font-medium text-primary hover:underline">{claim.id}</TableCell>
                        <TableCell className="font-mono text-sm group relative">
                          {claim.vin}
                          <div className="absolute left-0 top-8 bg-popover border rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 min-w-[200px]">
                            <div className="text-sm space-y-1">
                              <div className="font-medium">Vehicle Details</div>
                              <div>Model: Air Dream Edition</div>
                              <div>Year: 2024</div>
                              <div>Mileage: 12,450 miles</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{claim.lucidId}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{claim.type}</Badge>
                        </TableCell>
                        <TableCell>{claim.submissionDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              claim.status === "Approved"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : claim.status === "Under Review"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : claim.status === "Info Required"
                                    ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                                    : claim.status === "Rejected"
                                      ? "bg-red-100 text-red-800 hover:bg-red-100"
                                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            }
                          >
                            {claim.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{claim.amount}</TableCell>
                        <TableCell>{claim.reviewer}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {claim.status === "Info Required" && (
                              <Button variant="ghost" size="sm">
                                <Upload className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Page 1 of 4</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading Overlay for Draft Redirects */}
          {isRedirecting && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="p-6 max-w-sm mx-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <div>
                    <div className="font-medium">Loading Draft Claim</div>
                    <div className="text-sm text-muted-foreground">
                      Redirecting to Claim Creation with saved data...
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Claim Detail Modal */}
          {selectedClaimId && (
            <Dialog open={!!selectedClaimId} onOpenChange={() => setSelectedClaimId(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <span>Claim Details - {selectedClaimId}</span>
                    {(() => {
                      const claim = trackingClaims.find((c) => c.id === selectedClaimId)
                      const statusColors = {
                        Approved: "bg-green-100 text-green-800",
                        "Under Review": "bg-yellow-100 text-yellow-800",
                        "Info Required": "bg-orange-100 text-orange-800",
                        Rejected: "bg-red-100 text-red-800",
                        Draft: "bg-gray-100 text-gray-800",
                      }
                      return (
                        <Badge
                          className={
                            statusColors[claim?.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
                          }
                        >
                          {claim?.status}
                        </Badge>
                      )
                    })()}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Header Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Vehicle Info</Label>
                      <div className="mt-1">
                        <div className="font-mono text-sm">5UXTA6C07N9B12345</div>
                        <div className="text-sm text-muted-foreground">2024 Air Dream Edition</div>
                        <div className="text-sm text-muted-foreground">Lucid ID: LID-789123</div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Dates</Label>
                      <div className="mt-1">
                        <div className="text-sm">Submitted: Jan 15, 2025</div>
                        <div className="text-sm">Last Updated: Jan 18, 2025</div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Reviewer</Label>
                      <div className="mt-1">
                        <div className="text-sm">Sarah Chen</div>
                        <div className="text-sm text-muted-foreground">Senior Claims Specialist</div>
                      </div>
                    </div>
                  </div>

                  {/* Claim Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Claim Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Claim Type</Label>
                          <div className="mt-1">Warranty Claim</div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Total Amount</Label>
                          <div className="mt-1 font-medium">$1,245.50</div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                        <div className="mt-1 text-sm">
                          Battery cooling system malfunction causing reduced range and performance issues. Customer
                          reported 40% range reduction during cold weather conditions.
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Parts & Labor</Label>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Battery Cooling Pump (P/N: BCP-2024-001)</span>
                            <span>$890.00</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Labor: Battery System Repair (2.5 hrs @ $142/hr)</span>
                            <span>$355.50</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-medium">
                            <span>Total</span>
                            <span>$1,245.50</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Dynamic Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Claim Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const claim = trackingClaims.find((c) => c.id === selectedClaimId)
                        const timelineStages = getTimelineStages(claim?.status || "")

                        return (
                          <div className="space-y-4">
                            {timelineStages.map((stage, index) => (
                              <div key={stage.name} className="flex items-center space-x-3">
                                <div
                                  className={`w-3 h-3 rounded-full ${stage.completed ? "bg-green-500" : "bg-gray-300"}`}
                                />
                                <div className="flex-1">
                                  <div
                                    className={`font-medium ${stage.completed ? "text-green-700" : "text-gray-500"}`}
                                  >
                                    {stage.name}
                                  </div>
                                  {stage.date && <div className="text-sm text-muted-foreground">{stage.date}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      })()}
                    </CardContent>
                  </Card>

                  {/* Reviewer Notes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Reviewer Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const claim = trackingClaims.find((c) => c.id === selectedClaimId)
                        return (
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="text-sm">{getReviewerNotes(claim?.status || "")}</div>
                          </div>
                        )
                      })()}
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button variant="outline" onClick={() => setSelectedClaimId(null)}>
                      Close
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      {(() => {
                        const claim = trackingClaims.find((c) => c.id === selectedClaimId)
                        if (!claim) return null

                        const canEscalate = canEscalateClaim(claim)
                        const isEscalated = escalatedClaims.has(selectedClaimId)
                        const isEnabled = canEscalate && !isEscalated
                        const tooltipMessage = getEscalationTooltip(claim)

                        return (
                          <div className="relative flex flex-col items-end">
                            <div className="group relative">
                              <Button
                                variant={isEnabled ? "destructive" : "outline"}
                                disabled={!isEnabled}
                                onClick={() => isEnabled && handleEscalateClaim(selectedClaimId)}
                                className={`${
                                  !isEnabled
                                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-400"
                                    : "bg-red-600 hover:bg-red-700 text-white font-semibold"
                                }`}
                              >
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Escalate Claim
                              </Button>

                              {/* Tooltip */}
                              {tooltipMessage && (
                                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                                  {tooltipMessage}
                                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              )}
                            </div>

                            {/* Inline message for already escalated claims */}
                            {isEscalated && claim.status === "Under Review" && (
                              <div className="text-xs text-muted-foreground mt-1">
                                This claim has already been escalated.
                              </div>
                            )}
                          </div>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <Dialog open={showVinDetailsModal} onOpenChange={setShowVinDetailsModal}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
                  <Car className="h-5 w-5 text-blue-600" />
                  Vehicle Information & Active Cases
                </DialogTitle>
                <DialogDescription>
                  VIN: {selectedVinData?.vin} - {selectedVinData?.model} ({selectedVinData?.year})
                </DialogDescription>
              </DialogHeader>

              {selectedVinData && (
                <div className="space-y-6">
                  {/* Vehicle Summary */}
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-600">Model:</span>
                        <p className="font-semibold">{selectedVinData.model}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-600">Year:</span>
                        <p className="font-semibold">{selectedVinData.year}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-600">Warranty:</span>
                        <p className="font-semibold text-green-600">{selectedVinData.warrantyStatus}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-600">Country:</span>
                        <p className="font-semibold">{selectedVinData.homologationCountry}</p>
                      </div>
                    </div>
                  </div>

                  {/* Active Service Campaigns */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Active Service Campaigns
                    </h3>
                    <div className="space-y-3">
                      {selectedVinData.serviceCampaigns.map((campaign, index) => (
                        <div key={index} className="border border-orange-200 bg-orange-50 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-orange-800">{campaign.title}</h4>
                              <p className="text-sm text-orange-600">Campaign ID: {campaign.id}</p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                campaign.priority === "High"
                                  ? "bg-red-100 text-red-700"
                                  : campaign.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {campaign.priority} Priority
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 mb-2">{campaign.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-600">
                            <span>Issued: {campaign.dateIssued}</span>
                            <span>Status: {campaign.status}</span>
                            <span>Affected Components: {campaign.affectedComponents.join(", ")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Customer Care Cases */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      Active Customer Care Cases
                    </h3>
                    <div className="space-y-3">
                      {selectedVinData.customerCareCases.map((caseItem, index) => (
                        <div key={index} className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-blue-800">Case #{caseItem.caseNumber}</h4>
                              <p className="text-sm text-blue-600">{caseItem.subject}</p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                caseItem.status === "Open"
                                  ? "bg-green-100 text-green-700"
                                  : caseItem.status === "In Progress"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {caseItem.status}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 mb-2">{caseItem.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-600">
                            <span>Created: {caseItem.dateCreated}</span>
                            <span>Owner: {caseItem.owner}</span>
                            <span>Priority: {caseItem.priority}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => setShowVinDetailsModal(false)}>
                      Close
                    </Button>
                    <Button className="bg-slate-800 hover:bg-slate-900">
                      <Download className="h-4 w-4 mr-2" />
                      Export Details
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Escalation Success Modal */}
          <Dialog open={showEscalationSuccess} onOpenChange={setShowEscalationSuccess}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  Escalation Successful
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  Your claim has been successfully escalated. The Lucid team has been notified immediately and will
                  review your case with priority.
                </p>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setShowEscalationSuccess(false)}>Got it</Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <Dialog open={!!selectedActionClaim} onOpenChange={() => setSelectedActionClaim(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Action Required - {selectedActionClaim?.id}
              </DialogTitle>
              <DialogDescription>Review the details and complete the required action for this claim</DialogDescription>
            </DialogHeader>

            {selectedActionClaim && (
              <div className="space-y-6">
                {/* Claim Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Claim Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Claim ID</label>
                        <p className="font-semibold">{selectedActionClaim.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">VIN</label>
                        <p className="font-semibold">{selectedActionClaim.vin}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Lucid ID</label>
                        <p className="font-semibold">{selectedActionClaim.lucidId}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Claim Type</label>
                        <p className="font-semibold">{selectedActionClaim.claimType}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Submission Date</label>
                        <p>{selectedActionClaim.submissionDate}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Deadline</label>
                        <p className={selectedActionClaim.status === "Overdue" ? "text-red-600 font-medium" : ""}>
                          {selectedActionClaim.deadline}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <Badge
                          variant={
                            selectedActionClaim.status === "Overdue"
                              ? "destructive"
                              : selectedActionClaim.status === "Pending"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {selectedActionClaim.status}
                          {selectedActionClaim.status === "Overdue" && ` (${selectedActionClaim.daysOverdue} days)`}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Required */}
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      Action Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Requested by</label>
                      <p className="font-semibold">{selectedActionClaim.requestedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Action Required</label>
                      <p className="font-semibold">{selectedActionClaim.pendingAction}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Details</label>
                      <p className="text-sm bg-white p-3 rounded border">{selectedActionClaim.actionDetails}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Complete Action</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedActionClaim.actionType === "photo_upload" && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Upload Photos</label>
                          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop photos</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Cost Breakdown</label>
                          <textarea
                            className="mt-1 w-full p-3 border rounded-md"
                            rows={4}
                            placeholder="Provide detailed cost breakdown..."
                          />
                        </div>
                      </div>
                    )}

                    {selectedActionClaim.actionType === "text_response" && (
                      <div>
                        <label className="text-sm font-medium">Response</label>
                        <textarea
                          className="mt-1 w-full p-3 border rounded-md"
                          rows={6}
                          placeholder="Provide detailed repair description and timeline..."
                        />
                      </div>
                    )}

                    {selectedActionClaim.actionType === "document_upload" && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Upload Documents</label>
                          <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <FileText className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop documents</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Additional Notes</label>
                          <textarea
                            className="mt-1 w-full p-3 border rounded-md"
                            rows={3}
                            placeholder="Any additional information..."
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1" onClick={handleSubmitResponse}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Submit Response
                      </Button>
                      <Button variant="outline" onClick={handleRequestExtension}>
                        <Clock className="h-4 w-4 mr-2" />
                        Request Extension
                      </Button>
                    </div>

                    {actionSuccessMessage && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-green-800 font-medium">{actionSuccessMessage}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <TabsContent value="actions-pending" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Actions Pending
              </CardTitle>
              <CardDescription>Claims requiring additional action from your side</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by Claim ID or VIN..." className="pl-10" />
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-types">
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">All Types</SelectItem>
                    <SelectItem value="warranty">Warranty</SelectItem>
                    <SelectItem value="service">Service Campaign</SelectItem>
                    <SelectItem value="goodwill">Goodwill</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Overdue Warning Banner */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-800">You have 2 claims requiring immediate attention.</span>
                </div>
              </div>

              {/* Claims Grid */}
              <div className="grid gap-4">
                {actionsPending.map((claim) => (
                  <Card
                    key={claim.id}
                    className={`border-l-4 ${
                      claim.status === "Overdue"
                        ? "border-l-red-500 bg-red-50/30"
                        : claim.status === "Pending"
                          ? "border-l-yellow-500 bg-yellow-50/30"
                          : "border-l-green-500 bg-green-50/30"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-semibold text-lg">{claim.id}</h3>
                              <p className="text-sm text-muted-foreground">
                                VIN: {claim.vin} • Lucid ID: {claim.lucidId}
                              </p>
                            </div>
                            <Badge
                              variant={
                                claim.status === "Overdue"
                                  ? "destructive"
                                  : claim.status === "Pending"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {claim.status}
                              {claim.status === "Overdue" && ` (${claim.daysOverdue} days)`}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Claim Type:</span>
                              <p className="text-muted-foreground">{claim.claimType}</p>
                            </div>
                            <div>
                              <span className="font-medium">Submitted:</span>
                              <p className="text-muted-foreground">{claim.submissionDate}</p>
                            </div>
                            <div>
                              <span className="font-medium">Deadline:</span>
                              <p
                                className={
                                  claim.status === "Overdue" ? "text-red-600 font-medium" : "text-muted-foreground"
                                }
                              >
                                {claim.deadline}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded border">
                            <span className="font-medium text-sm">Pending Action:</span>
                            <p className="text-sm text-muted-foreground mt-1">{claim.pendingAction}</p>
                            <p className="text-xs text-muted-foreground mt-2">Requested by: {claim.requestedBy}</p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => setSelectedActionClaim(claim)}
                            variant="outline"
                            className="w-full lg:w-auto"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing 1-{actionsPending.length} of {actionsPending.length} claims
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Header / Filters Section - Lucid Premium Design */}
          <Card className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-6 w-6 text-blue-400" />
                Claims Analytics Dashboard
                <Badge className="ml-auto bg-blue-500/20 text-blue-300 border-blue-400">Lucid Motors</Badge>
              </CardTitle>
              <CardDescription className="text-slate-300">
                Comprehensive insights and analytics for Lucid vehicle warranty claims
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Date Range</Label>
                  <Select defaultValue="30days">
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Claim Status</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="escalated">Escalated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Vehicle Trim</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="all">All Trims</SelectItem>
                      <SelectItem value="air-pure">Air Pure</SelectItem>
                      <SelectItem value="touring">Touring</SelectItem>
                      <SelectItem value="grand-touring">Grand Touring</SelectItem>
                      <SelectItem value="sapphire">Sapphire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-200">Repairer Location</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="california">California</SelectItem>
                      <SelectItem value="texas">Texas</SelectItem>
                      <SelectItem value="florida">Florida</SelectItem>
                      <SelectItem value="new-york">New York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-700 bg-transparent">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* KPI Cards - Premium Lucid Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-100">Total Claims Submitted</CardTitle>
                <FileText className="h-5 w-5 text-blue-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,245</div>
                <p className="text-xs text-blue-200 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-green-300">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-100">Claims Approved</CardTitle>
                <CheckCircle className="h-5 w-5 text-green-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">923</div>
                <p className="text-xs text-green-200 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-green-300">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-900 to-red-800 border-red-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-100">Claims Rejected</CardTitle>
                <XCircle className="h-5 w-5 text-red-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">112</div>
                <p className="text-xs text-red-200 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  <span className="text-red-300">+3.1%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-100">Claims Under Review</CardTitle>
                <Clock className="h-5 w-5 text-yellow-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">87</div>
                <p className="text-xs text-yellow-200 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  <span className="text-green-300">-2.4%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Avg. Resolution Time</CardTitle>
                <Activity className="h-5 w-5 text-purple-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5.6 days</div>
                <p className="text-xs text-purple-200 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  <span className="text-green-300">-0.8 days</span> improvement
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900 to-orange-800 border-orange-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-100">Escalated Claims</CardTitle>
                <AlertTriangle className="h-5 w-5 text-orange-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">32</div>
                <p className="text-xs text-orange-200 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-red-300">+5.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-900 to-teal-800 border-teal-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-teal-100">Claim Approval Rate</CardTitle>
                <Target className="h-5 w-5 text-teal-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">78.6%</div>
                <p className="text-xs text-teal-200 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-green-300">+2.1%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-rose-900 to-rose-800 border-rose-700 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-rose-100">Pending SLA Breaches</CardTitle>
                <Clock className="h-5 w-5 text-rose-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">15</div>
                <p className="text-xs text-rose-200 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-red-300">+12.3%</span> needs attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts & Graphs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Time Series Line Chart */}
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Claims Trend Over Time
                </CardTitle>
                <CardDescription>Claims submitted vs. approved vs. rejected (last 30 days)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    submitted: { label: "Submitted", color: "#3b82f6" },
                    approved: { label: "Approved", color: "#10b981" },
                    rejected: { label: "Rejected", color: "#ef4444" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { date: "Week 1", submitted: 95, approved: 72, rejected: 12 },
                        { date: "Week 2", submitted: 102, approved: 78, rejected: 15 },
                        { date: "Week 3", submitted: 88, approved: 65, rejected: 8 },
                        { date: "Week 4", submitted: 115, approved: 89, rejected: 18 },
                        { date: "Week 5", submitted: 98, approved: 74, rejected: 11 },
                        { date: "Week 6", submitted: 125, approved: 95, rejected: 22 },
                        { date: "Week 7", submitted: 108, approved: 82, rejected: 14 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="submitted"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="approved"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rejected"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Bar Chart - Claims per Lucid Vehicle Trim */}
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  Claims per Lucid Vehicle Trim
                </CardTitle>
                <CardDescription>Distribution across Air Pure, Touring, Grand Touring, Sapphire</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    claims: { label: "Claims", color: "#3b82f6" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { trim: "Air Pure", claims: 456 },
                        { trim: "Touring", claims: 389 },
                        { trim: "Grand Touring", claims: 278 },
                        { trim: "Sapphire", claims: 122 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="trim" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="claims" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Stacked Bar - Claims per Repairer Location */}
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Claims by Repairer Location
                </CardTitle>
                <CardDescription>Claims breakdown by location and status</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    approved: { label: "Approved", color: "#10b981" },
                    pending: { label: "Pending", color: "#f59e0b" },
                    rejected: { label: "Rejected", color: "#ef4444" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { location: "California", approved: 234, pending: 45, rejected: 23 },
                        { location: "Texas", approved: 189, pending: 32, rejected: 18 },
                        { location: "Florida", approved: 156, pending: 28, rejected: 15 },
                        { location: "New York", approved: 145, pending: 25, rejected: 12 },
                        { location: "Arizona", approved: 123, pending: 22, rejected: 10 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="location" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="approved" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="pending" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="rejected" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Donut Chart - Claims by Category */}
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  Claims by Reason
                </CardTitle>
                <CardDescription>Distribution by Parts, Labor, Battery, Software, Other</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    parts: { label: "Parts", color: "#3b82f6" },
                    labor: { label: "Labor", color: "#10b981" },
                    battery: { label: "Battery", color: "#f59e0b" },
                    software: { label: "Software", color: "#8b5cf6" },
                    other: { label: "Other", color: "#ef4444" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Parts", value: 445, fill: "#3b82f6" },
                          { name: "Labor", value: 312, fill: "#10b981" },
                          { name: "Battery", value: 234, fill: "#f59e0b" },
                          { name: "Software", value: 156, fill: "#8b5cf6" },
                          { name: "Other", value: 98, fill: "#ef4444" },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[
                          { name: "Parts", value: 445, fill: "#3b82f6" },
                          { name: "Labor", value: 312, fill: "#10b981" },
                          { name: "Battery", value: 234, fill: "#f59e0b" },
                          { name: "Software", value: 156, fill: "#8b5cf6" },
                          { name: "Other", value: 98, fill: "#ef4444" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* SLA Compliance Heatmap */}
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                SLA Compliance Heatmap
              </CardTitle>
              <CardDescription>Claims processing performance by day of week and hour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-8 gap-2 text-center text-sm font-medium">
                  <div></div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>
                {Array.from({ length: 12 }, (_, hour) => (
                  <div key={hour} className="grid grid-cols-8 gap-2 text-center">
                    <div className="text-sm font-medium text-slate-600">{hour + 8}:00</div>
                    {Array.from({ length: 7 }, (_, day) => {
                      const compliance = Math.floor(Math.random() * 40) + 60
                      return (
                        <div
                          key={day}
                          className={cn(
                            "h-8 w-full rounded text-xs flex items-center justify-center text-white font-medium transition-all hover:scale-105 cursor-pointer",
                            compliance >= 90
                              ? "bg-green-500 hover:bg-green-600"
                              : compliance >= 75
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : compliance >= 60
                                  ? "bg-orange-500 hover:bg-orange-600"
                                  : "bg-red-500 hover:bg-red-600",
                          )}
                          title={`${compliance}% SLA compliance`}
                        >
                          {compliance}%
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>90-100% Excellent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>75-89% Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>60-74% Fair</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Below 60% Poor</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Claim Lifecycle Funnel */}
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-blue-600" />
                Claim Lifecycle Funnel
              </CardTitle>
              <CardDescription>Claims progression through different stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative">
                  <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white text-center font-semibold shadow-lg">
                    Submitted: 1,245 claims (100%)
                  </div>
                </div>
                <div className="relative">
                  <div className="w-5/6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white text-center font-semibold shadow-lg mx-auto">
                    Under Review: 1,133 claims (91%)
                  </div>
                </div>
                <div className="relative">
                  <div className="w-4/6 bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white text-center font-semibold shadow-lg mx-auto">
                    Approved: 923 claims (74%)
                  </div>
                </div>
                <div className="relative">
                  <div className="w-2/6 bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white text-center font-semibold shadow-lg mx-auto">
                    Rejected: 112 claims (9%)
                  </div>
                </div>
                <div className="relative">
                  <div className="w-1/6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white text-center font-semibold shadow-lg mx-auto">
                    Escalated: 32 claims (3%)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tables & Lists Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top 10 High-Value Claims */}
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Top 10 High-Value Claims
                </CardTitle>
                <CardDescription>Claims with highest monetary value</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Vehicle Trim</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: "CLM-2024-001", trim: "Sapphire", amount: "$45,230", status: "Under Review" },
                      { id: "CLM-2024-002", trim: "Grand Touring", amount: "$38,950", status: "Approved" },
                      { id: "CLM-2024-003", trim: "Touring", amount: "$32,100", status: "Pending" },
                      { id: "CLM-2024-004", trim: "Sapphire", amount: "$28,750", status: "Under Review" },
                      { id: "CLM-2024-005", trim: "Grand Touring", amount: "$25,400", status: "Approved" },
                      { id: "CLM-2024-006", trim: "Air Pure", amount: "$22,800", status: "Pending" },
                      { id: "CLM-2024-007", trim: "Touring", amount: "$19,650", status: "Approved" },
                    ].map((claim) => (
                      <TableRow key={claim.id} className="hover:bg-slate-100">
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {claim.trim}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">{claim.amount}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="hover:bg-blue-100">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Claims Pending Beyond SLA */}
            <Card className="bg-slate-50 border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Claims Pending Beyond SLA
                </CardTitle>
                <CardDescription>Claims that have exceeded processing time limits</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Trim</TableHead>
                      <TableHead>Days Overdue</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: "CLM-2024-156", trim: "Sapphire", days: 12, priority: "High" },
                      { id: "CLM-2024-189", trim: "Grand Touring", days: 8, priority: "Medium" },
                      { id: "CLM-2024-203", trim: "Touring", days: 15, priority: "High" },
                      { id: "CLM-2024-234", trim: "Air Pure", days: 6, priority: "Low" },
                      { id: "CLM-2024-267", trim: "Grand Touring", days: 9, priority: "Medium" },
                    ].map((claim) => (
                      <TableRow key={claim.id} className="hover:bg-slate-100">
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {claim.trim}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-red-600">{claim.days} days</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              claim.priority === "High"
                                ? "destructive"
                                : claim.priority === "Medium"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              claim.priority === "High"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : claim.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  : "bg-slate-100 text-slate-800 border-slate-200"
                            }
                          >
                            {claim.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="hover:bg-red-100">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* AI-Powered Suggestions */}
          <Card className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-indigo-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-300" />
                AI-Powered Insights & Suggestions
                <Badge className="ml-auto bg-purple-500/20 text-purple-300 border-purple-400">Powered by AI</Badge>
              </CardTitle>
              <CardDescription className="text-indigo-200">
                Intelligent recommendations to optimize Lucid vehicle claims processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border border-red-400/30 rounded-lg p-4 bg-red-500/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="font-semibold text-red-300">SLA Risk Alert</span>
                    </div>
                    <p className="text-sm text-red-200 mb-3">
                      12 claims predicted to breach SLA this week. Sapphire trim claims require immediate attention due
                      to complexity.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-400 text-red-300 hover:bg-red-500/20 bg-transparent"
                    >
                      View Risk Claims
                    </Button>
                  </div>

                  <div className="border border-yellow-400/30 rounded-lg p-4 bg-yellow-500/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <span className="font-semibold text-yellow-300">Process Optimization</span>
                    </div>
                    <p className="text-sm text-yellow-200 mb-3">
                      California service centers process claims 2.3 days faster. Consider redistributing complex
                      Sapphire claims.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-yellow-400 text-yellow-300 hover:bg-yellow-500/20 bg-transparent"
                    >
                      View Analysis
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-blue-400/30 rounded-lg p-4 bg-blue-500/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                      <span className="font-semibold text-blue-300">Rejection Pattern</span>
                    </div>
                    <p className="text-sm text-blue-200 mb-3">
                      78% of battery-related rejections lack proper diagnostic data. Implement pre-submission validation
                      for 60% reduction.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-400 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                    >
                      Implement Solution
                    </Button>
                  </div>

                  <div className="border border-green-400/30 rounded-lg p-4 bg-green-500/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-green-400" />
                      <span className="font-semibold text-green-300">Performance Insight</span>
                    </div>
                    <p className="text-sm text-green-200 mb-3">
                      "Lucid Service Pro" achieves 94% approval rate with 4.2-day average. Consider expanding
                      partnership for Sapphire repairs.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-400 text-green-300 hover:bg-green-500/20 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
