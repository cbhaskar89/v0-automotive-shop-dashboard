"use client"

import { Avatar } from "@/components/ui/avatar"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  Clock,
  AlertCircle,
  CheckCircle,
  Upload,
  ArrowLeft,
  MessageSquare,
  Paperclip,
  Send,
  Download,
  Eye,
  Users,
  TrendingUp,
  AlertTriangle,
  FileText,
  Calendar,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus,
  PieChart,
  Activity,
  Target,
  Gauge,
  UserCheck,
  Zap,
  X,
  Loader2,
  Link,
  CheckSquare,
  Check,
} from "lucide-react"

export default function CustomerCarePage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const [showCreateCaseModal, setShowCreateCaseModal] = useState(false)
  const [isCreatingCase, setIsCreatingCase] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [newCaseId, setNewCaseId] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    vin: "",
    lucidId: "",
    customerInfo: "",
    caseType: "",
    priority: "",
    channel: "",
    subject: "",
    description: "",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [vinSuggestions, setVinSuggestions] = useState<string[]>([])
  const [lucidIdSuggestions, setLucidIdSuggestions] = useState<string[]>([])
  const [showVinSuggestions, setShowVinSuggestions] = useState(false)
  const [showLucidIdSuggestions, setShowLucidIdSuggestions] = useState(false)

  const [analyticsTimeRange, setAnalyticsTimeRange] = useState("30")
  const [analyticsCaseTypeFilter, setAnalyticsCaseTypeFilter] = useState("all")
  const [analyticsResolutionTimeFilter, setAnalyticsResolutionTimeFilter] = useState("all")
  const [analyticsRepeatCasesFilter, setAnalyticsRepeatCasesFilter] = useState("all")
  const [analyticsEscalatedFilter, setAnalyticsEscalatedFilter] = useState("all")
  const [analyticsSLAStatusFilter, setAnalyticsSLAStatusFilter] = useState("all")

  // Mock data for auto-suggestions
  const mockVins = [
    "5UXTA6C07N9B12345",
    "5UXTA6C07N9B67890",
    "5UXTA6C07N9B54321",
    "5UXTA6C07N9B98765",
    "5UXTA6C07N9B11111",
  ]

  const mockLucidIds = ["LID-789123", "LID-456789", "LID-123456", "LID-987654", "LID-555666"]

  const [cases, setCases] = useState([
    {
      id: "CASE-001",
      subject: "Vehicle charging issue – Air Dream Edition",
      customer: "John Smith",
      vin: "5UXTA6C07N9B12345",
      lucidId: "LID-789123",
      priority: "urgent",
      status: "open",
      type: "technical",
      created: "2024-01-20",
      slaHours: 4,
      slaRemaining: 2.5,
      assignee: "Technical Support",
      description:
        "Customer John Smith from Belgium Auto Imports B.V. reports a critical charging issue with their Air Dream Edition vehicle. The charging port became completely unresponsive following the latest over-the-air software update (v2.1.47) that was deployed on January 18th. The customer attempted multiple charging stations including Tesla Superchargers, Electrify America, and home Level 2 charging with no success. Vehicle displays 'Charging System Fault' error code E-CHG-001. This is affecting customer's daily commute and they have requested immediate technical assistance. Initial diagnostic scan shows communication error between charging control module and main vehicle computer. Customer has been driving Lucid vehicles for 18 months with no prior issues. Vehicle is still under comprehensive warranty coverage.",
      healthIndicator: "red",
      customerInfo: {
        name: "John Smith",
        email: "john.smith@belgiumimports.com",
        phone: "+32 2 123 4567",
        company: "Belgium Auto Imports B.V.",
        address: "Industrieweg 123, 2030 Antwerp, Belgium",
        customerType: "Importer",
        accountManager: "Sarah Williams",
        preferredLanguage: "English",
        timeZone: "CET (UTC+1)",
      },
      channel: "Phone",
      createdDate: "2024-01-20 09:15",
      lastUpdated: "2024-01-20 10:30",
      comments: [
        {
          id: 1,
          user: "Jan Vermeulen",
          role: "Importer",
          message:
            "Customer called this morning about charging issues. Vehicle completely unable to charge after latest software update.",
          timestamp: "2024-01-20 09:15",
          attachments: [],
        },
        {
          id: 2,
          user: "Sarah Tech",
          role: "Lucid",
          message:
            "I've reviewed the case and error codes. This appears to be related to the charging control module firmware. Can you please upload the complete diagnostic logs from the vehicle's service menu?",
          timestamp: "2024-01-20 10:30",
          attachments: [],
        },
      ],
      files: [
        { name: "diagnostic_log.pdf", size: "2.4 MB", uploadedBy: "Jan Vermeulen", uploadedAt: "2024-01-20 09:20" },
        {
          name: "charging_port_photo.jpg",
          size: "1.8 MB",
          uploadedBy: "Jan Vermeulen",
          uploadedAt: "2024-01-20 09:22",
        },
        {
          name: "error_codes_screenshot.png",
          size: "890 KB",
          uploadedBy: "Jan Vermeulen",
          uploadedAt: "2024-01-20 09:25",
        },
      ],
      timeline: [
        { action: "Case created", user: "Jan Vermeulen", role: "Importer", timestamp: "2024-01-20 09:15" },
        { action: "Files uploaded", user: "Jan Vermeulen", role: "Importer", timestamp: "2024-01-20 09:20" },
        { action: "Assigned to Technical Support", user: "System", role: "System", timestamp: "2024-01-20 09:25" },
        { action: "Comment added", user: "Sarah Tech", role: "Lucid", timestamp: "2024-01-20 10:30" },
      ],
    },
    {
      id: "CASE-002",
      subject: "Warranty claim for glass canopy replacement",
      customer: "Sarah Johnson",
      vin: "5UXTA6C07N9B67890",
      lucidId: "LID-456789",
      priority: "high",
      status: "in-progress",
      type: "warranty",
      created: "2024-01-19",
      slaHours: 24,
      slaRemaining: 18.5,
      assignee: "Warranty Team",
      description:
        "Customer Sarah Johnson from Nordic Luxury Motors reports stress fractures appearing on the glass canopy of their Air Touring model. The fractures were first noticed during routine vehicle inspection and appear to be manufacturing-related rather than impact damage. Vehicle has 8,500 miles and is 14 months old, well within warranty coverage. Customer is concerned about safety implications and potential for complete glass failure. Initial assessment by local service center confirms the fractures are consistent with thermal stress patterns. Customer has provided detailed photographs and is requesting expedited replacement under warranty terms. Vehicle is currently safe to drive but customer prefers not to use glass canopy features until replacement is completed. This is the customer's second Lucid vehicle and they have been very satisfied with previous service experience.",
      healthIndicator: "yellow",
      customerInfo: {
        name: "Sarah Johnson",
        email: "sarah.johnson@nordicluxury.no",
        phone: "+47 22 12 34 56",
        company: "Nordic Luxury Motors AS",
        address: "Storgata 45, 0182 Oslo, Norway",
        customerType: "Importer",
        accountManager: "Erik Andersen",
        preferredLanguage: "English",
        timeZone: "CET (UTC+1)",
      },
      channel: "Email",
      createdDate: "2024-01-19 14:20",
      lastUpdated: "2024-01-19 16:45",
      comments: [
        {
          id: 1,
          user: "Sarah Johnson",
          role: "Importer",
          message:
            "Customer noticed stress fractures on glass canopy during routine inspection. Photos attached showing the extent of the damage.",
          timestamp: "2024-01-19 14:20",
          attachments: ["canopy_damage.jpg"],
        },
        {
          id: 2,
          user: "Mike Warranty",
          role: "Lucid",
          message:
            "Photos received and reviewed. This appears to be covered under warranty as thermal stress damage. Processing replacement order and will coordinate with local service center for installation.",
          timestamp: "2024-01-19 16:45",
          attachments: [],
        },
      ],
      files: [
        { name: "canopy_damage.jpg", size: "3.2 MB", uploadedBy: "Sarah Johnson", uploadedAt: "2024-01-19 14:25" },
        { name: "warranty_form.pdf", size: "1.1 MB", uploadedBy: "Mike Warranty", uploadedAt: "2024-01-19 16:50" },
        {
          name: "service_center_assessment.pdf",
          size: "1.8 MB",
          uploadedBy: "Mike Warranty",
          uploadedAt: "2024-01-19 16:52",
        },
      ],
      timeline: [
        { action: "Case created", user: "Sarah Johnson", role: "Importer", timestamp: "2024-01-19 14:20" },
        { action: "Damage photos uploaded", user: "Sarah Johnson", role: "Importer", timestamp: "2024-01-19 14:25" },
        { action: "Assigned to Warranty Team", user: "System", role: "System", timestamp: "2024-01-19 14:30" },
        { action: "Warranty approved", user: "Mike Warranty", role: "Lucid", timestamp: "2024-01-19 16:45" },
        {
          action: "Status changed to In Progress",
          user: "Mike Warranty",
          role: "Lucid",
          timestamp: "2024-01-19 16:46",
        },
      ],
    },
    {
      id: "CASE-003",
      subject: "Service appointment scheduling - 12 month maintenance",
      customer: "Michael Chen",
      vin: "5UXTA6C07N9B54321",
      lucidId: "LID-123456",
      priority: "low",
      status: "awaiting-input",
      type: "service",
      created: "2024-01-18",
      slaHours: 48,
      slaRemaining: 36.2,
      assignee: "Service Center",
      description:
        "Customer Michael Chen from Pacific Coast Motors is requesting to schedule the 12-month comprehensive maintenance service for their Air Pure model. Vehicle has reached 12,000 miles and is due for the first major service interval which includes battery health check, software updates, tire rotation, brake inspection, and full vehicle diagnostic scan. Customer prefers morning appointments and has requested service to be completed within a single day if possible. They have been very satisfied with their Lucid ownership experience and want to maintain optimal vehicle performance. Customer is flexible with dates but prefers weekdays due to business schedule. This is a routine maintenance request with no current vehicle issues reported. Customer has also inquired about available software updates and any recall notices for their specific VIN. Service history shows excellent maintenance compliance with all previous services completed on schedule.",
      healthIndicator: "green",
      customerInfo: {
        name: "Michael Chen",
        email: "michael.chen@pacificcoast.com",
        phone: "+1 (415) 555-0123",
        company: "Pacific Coast Motors LLC",
        address: "1234 Ocean Boulevard, San Francisco, CA 94102",
        customerType: "Importer",
        accountManager: "Jennifer Liu",
        preferredLanguage: "English",
        timeZone: "PST (UTC-8)",
      },
      channel: "Service Center",
      createdDate: "2024-01-18 11:30",
      lastUpdated: "2024-01-18 15:20",
      comments: [
        {
          id: 1,
          user: "Michael Chen",
          role: "Importer",
          message:
            "Customer wants to schedule 12-month comprehensive service. Prefers morning appointments and single-day completion if possible.",
          timestamp: "2024-01-18 11:30",
          attachments: [],
        },
        {
          id: 2,
          user: "Lisa Service",
          role: "Lucid",
          message:
            "We have availability next week Tuesday through Thursday. Morning slots available at 8:00 AM. Service typically takes 4-6 hours. Please confirm preferred date with customer.",
          timestamp: "2024-01-18 15:20",
          attachments: [],
        },
      ],
      files: [
        { name: "service_history.pdf", size: "890 KB", uploadedBy: "Lisa Service", uploadedAt: "2024-01-18 15:25" },
        {
          name: "maintenance_checklist.pdf",
          size: "1.2 MB",
          uploadedBy: "Lisa Service",
          uploadedAt: "2024-01-18 15:27",
        },
      ],
      timeline: [
        { action: "Case created", user: "Michael Chen", role: "Importer", timestamp: "2024-01-18 11:30" },
        { action: "Assigned to Service Center", user: "System", role: "System", timestamp: "2024-01-18 11:35" },
        {
          action: "Service availability confirmed",
          user: "Lisa Service",
          role: "Lucid",
          timestamp: "2024-01-18 15:20",
        },
        {
          action: "Status changed to Awaiting Input",
          user: "Lisa Service",
          role: "Lucid",
          timestamp: "2024-01-18 15:21",
        },
      ],
    },
  ])

  const [commentAttachments, setCommentAttachments] = useState([])
  const [isDragging, setIsDragging] = useState(false)

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const [showEscalationModal, setShowEscalationModal] = useState(false)
  const [escalationFormData, setEscalationFormData] = useState({
    reason: "",
    notes: "",
    attachments: [] as File[],
  })
  const [escalationErrors, setEscalationErrors] = useState<{ [key: string]: string }>({})
  const [isEscalating, setIsEscalating] = useState(false)
  const [escalationSuccess, setEscalationSuccess] = useState(false)

  const [showCloseCaseModal, setShowCloseCaseModal] = useState(false)
  const [closeCaseSuccess, setCloseCaseSuccess] = useState(false)
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false)

  const [commentText, setCommentText] = useState("")
  const [isPostingComment, setIsPostingComment] = useState(false)

  const handlePostComment = async () => {
    if (!commentText.trim()) return

    setIsPostingComment(true)

    // Create new comment object
    const newComment = {
      id: Date.now(),
      user: "You",
      role: "Importer",
      message: commentText,
      timestamp: new Date().toLocaleString(),
      attachments: commentAttachments,
    }

    // Add comment to the case
    const updatedCases = cases.map((c) => {
      if (c.id === selectedCase) {
        return {
          ...c,
          comments: [...(c.comments || []), newComment],
          timeline: [
            ...(c.timeline || []),
            {
              type: "comment",
              user: "You",
              role: "Importer",
              action: "added a comment",
              timestamp: new Date().toLocaleString(),
              details: commentText,
            },
          ],
        }
      }
      return c
    })

    setCases(updatedCases)

    // Clear form
    setCommentText("")
    setCommentAttachments([])
    setIsPostingComment(false)
  }

  const handleEscalationSubmit = async () => {
    const errors: { [key: string]: string } = {}

    if (!escalationFormData.reason) {
      errors.reason = "Escalation reason is required"
    }
    if (!escalationFormData.notes.trim()) {
      errors.notes = "Additional notes are required"
    }

    setEscalationErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    setIsEscalating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setCases((prevCases) =>
      prevCases.map((c) => (c.id === selectedCase ? { ...c, status: "Escalated", priority: "urgent" } : c)),
    )

    setIsEscalating(false)
    setEscalationSuccess(true)

    setTimeout(() => {
      setShowEscalationModal(false)
      setEscalationSuccess(false)
      setEscalationFormData({ reason: "", notes: "", attachments: [] })
      setEscalationErrors({})
    }, 2000)
  }

  const handleEscalationFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files)
      setEscalationFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }))
    }
  }

  const removeEscalationFile = (index: number) => {
    setEscalationFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.vin.trim()) errors.vin = "VIN is required"
    if (!formData.caseType) errors.caseType = "Case type is required"
    if (!formData.priority) errors.priority = "Priority is required"
    if (!formData.channel) errors.channel = "Customer channel is required"
    if (!formData.subject.trim()) errors.subject = "Subject cannot be empty"
    if (!formData.description.trim()) errors.description = "Description is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleVinChange = (value: string) => {
    setFormData((prev) => ({ ...prev, vin: value }))
    if (value.length >= 3) {
      const suggestions = mockVins.filter((vin) => vin.toLowerCase().includes(value.toLowerCase()))
      setVinSuggestions(suggestions)
      setShowVinSuggestions(true)
    } else {
      setShowVinSuggestions(false)
    }
  }

  const handleLucidIdChange = (value: string) => {
    setFormData((prev) => ({ ...prev, lucidId: value }))
    if (value.length >= 2) {
      const suggestions = mockLucidIds.filter((id) => id.toLowerCase().includes(value.toLowerCase()))
      setLucidIdSuggestions(suggestions)
      setShowLucidIdSuggestions(true)
    } else {
      setShowLucidIdSuggestions(false)
    }
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleCreateCase = async () => {
    if (!validateForm()) return

    setIsCreatingCase(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const caseId = `CASE-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`

    const newCase = {
      id: caseId,
      subject: formData.subject,
      customer: formData.customerInfo || "Unknown Customer",
      vin: formData.vin,
      lucidId: formData.lucidId,
      priority: formData.priority,
      status: "Open",
      created: new Date().toLocaleDateString(),
      updated: new Date().toLocaleDateString(),
      caseType: formData.caseType,
      channel: formData.channel,
      description: formData.description,
      attachments: uploadedFiles,
      slaRemaining: 48,
      healthIndicator: "healthy",
      assignee: "Auto-assigned",
      comments: [
        {
          id: "1",
          user: "System",
          message: `Case created via ${formData.channel}. Initial description: ${formData.description}`,
          timestamp: new Date().toLocaleString(),
          type: "system",
        },
      ],
    }

    // Add new case to the beginning of cases array
    setCases((prevCases) => [newCase, ...prevCases])

    setNewCaseId(caseId)
    setIsCreatingCase(false)
    setShowSuccessMessage(true)

    // Reset form and redirect to case detail after success message
    setTimeout(() => {
      setShowSuccessMessage(false)
      setShowCreateCaseModal(false)
      setSelectedCase(caseId) // Redirect to case detail
      // Reset form
      setFormData({
        vin: "",
        lucidId: "",
        customerInfo: "",
        caseType: "",
        priority: "",
        channel: "",
        subject: "",
        description: "",
      })
      setUploadedFiles([])
      setFormErrors({})
    }, 2000)
  }

  const handleSaveAsDraft = () => {
    // Save to localStorage or send to API
    localStorage.setItem("draftCase", JSON.stringify(formData))
    // Show toast notification (would implement with toast library)
    alert("Draft saved successfully!")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "standard":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "escalated":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "awaiting-input":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "resolved":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "closed":
        return "bg-gray-100 text-gray-600 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getHealthIndicatorColor = (indicator: string) => {
    switch (indicator) {
      case "red":
        return "bg-red-500"
      case "yellow":
        return "bg-yellow-500"
      case "green":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTrendIndicator = (value: number, isPositive = true) => {
    if (value === 0) return { icon: Minus, color: "text-gray-500", text: "0%" }
    const Icon = value > 0 ? ArrowUp : ArrowDown
    const color = (value > 0 && isPositive) || (value < 0 && !isPositive) ? "text-green-500" : "text-red-500"
    return { icon: Icon, color, text: `${Math.abs(value)}%` }
  }

  const filteredCases = cases.filter((case_) => {
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter
    const matchesSearch =
      searchQuery === "" ||
      case_.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.vin.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesPriority && matchesSearch
  })

  const getSelectedCase = () => cases.find((c) => c.id === selectedCase)

  const getFilteredData = () => {
    // Mock data for demo purposes
    const caseVolumeData = {
      totalCreated: 145,
      totalResolved: 121,
      daily: [
        { date: "1", created: 20, resolved: 15 },
        { date: "2", created: 22, resolved: 18 },
        { date: "3", created: 18, resolved: 20 },
        { date: "4", created: 25, resolved: 22 },
        { date: "5", created: 19, resolved: 17 },
        { date: "6", created: 21, resolved: 23 },
        { date: "7", created: 23, resolved: 19 },
      ],
    }

    const slaCompliance = {
      onTime: 72,
      atRisk: 16,
      breached: 12,
    }

    const priorityBreakdown = {
      urgent: 30,
      high: 45,
      standard: 55,
      low: 15,
      total: 145,
    }

    const statusBreakdown = {
      open: 32,
      inProgress: 28,
      escalated: 15,
      closed: 25,
      total: 145,
    }

    const slaHeatmapData = [
      { date: "1", breaches: 1 },
      { date: "2", breaches: 3 },
      { date: "3", breaches: 0 },
      { date: "4", breaches: 5 },
      { date: "5", breaches: 2 },
      { date: "6", breaches: 4 },
      { date: "7", breaches: 1 },
      { date: "8", breaches: 0 },
      { date: "9", breaches: 2 },
      { date: "10", breaches: 3 },
      { date: "11", breaches: 5 },
      { date: "12", breaches: 1 },
      { date: "13", breaches: 0 },
      { date: "14", breaches: 2 },
      { date: "15", breaches: 4 },
      { date: "16", breaches: 6 },
      { date: "17", breaches: 3 },
      { date: "18", breaches: 1 },
      { date: "19", breaches: 0 },
      { date: "20", breaches: 2 },
      { date: "21", breaches: 5 },
      { date: "22", breaches: 3 },
      { date: "23", breaches: 1 },
      { date: "24", breaches: 0 },
      { date: "25", breaches: 2 },
      { date: "26", breaches: 4 },
      { date: "27", breaches: 6 },
      { date: "28", breaches: 3 },
      { date: "29", breaches: 1 },
      { date: "30", breaches: 0 },
      { date: "31", breaches: 2 },
    ]

    return { caseVolumeData, slaCompliance, priorityBreakdown, statusBreakdown, slaHeatmapData }
  }

  const caseData = getSelectedCase()

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {selectedCase && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedCase(null)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cases
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {selectedCase ? `Case ${selectedCase}` : "Customer Care"}
            </h1>
            <p className="text-muted-foreground">
              {selectedCase ? getSelectedCase()?.subject : "Create, manage, and collaborate on customer care cases"}
            </p>
          </div>
        </div>
        {!selectedCase && (
          <Dialog open={showCreateCaseModal} onOpenChange={setShowCreateCaseModal}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Create New Case
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Case</DialogTitle>
                <DialogDescription>Create a new customer care case with all relevant information</DialogDescription>
              </DialogHeader>

              {showSuccessMessage ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-800">✅ Case created successfully!</h3>
                    <p className="text-sm text-muted-foreground mt-1">Case ID: {newCaseId}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 relative">
                      <Label htmlFor="vin" className="flex items-center gap-1">
                        VIN <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="vin"
                        placeholder="Enter vehicle VIN"
                        value={formData.vin}
                        onChange={(e) => handleVinChange(e.target.value)}
                        className={formErrors.vin ? "border-red-500" : ""}
                      />
                      {formErrors.vin && <p className="text-sm text-red-500">{formErrors.vin}</p>}
                      {showVinSuggestions && vinSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                          {vinSuggestions.map((vin, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, vin }))
                                setShowVinSuggestions(false)
                              }}
                            >
                              <span className="font-medium">{vin.substring(0, formData.vin.length)}</span>
                              {vin.substring(formData.vin.length)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 relative">
                      <Label htmlFor="lucid-id">Lucid ID (Optional)</Label>
                      <Input
                        id="lucid-id"
                        placeholder="Enter Lucid ID"
                        value={formData.lucidId}
                        onChange={(e) => handleLucidIdChange(e.target.value)}
                      />
                      {showLucidIdSuggestions && lucidIdSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                          {lucidIdSuggestions.map((id, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, lucidId: id }))
                                setShowLucidIdSuggestions(false)
                              }}
                            >
                              <span className="font-medium">{id.substring(0, formData.lucidId.length)}</span>
                              {id.substring(formData.lucidId.length)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-info">Customer Contact Info (Optional)</Label>
                    <Textarea
                      id="customer-info"
                      placeholder="Enter customer contact information"
                      value={formData.customerInfo}
                      onChange={(e) => setFormData((prev) => ({ ...prev, customerInfo: e.target.value }))}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="case-type" className="flex items-center gap-1">
                        Case Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.caseType}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, caseType: value }))}
                      >
                        <SelectTrigger className={formErrors.caseType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select case type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="warranty">Warranty</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="software">Software</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.caseType && <p className="text-sm text-red-500">{formErrors.caseType}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority" className="flex items-center gap-1">
                        Priority Tag <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger className={formErrors.priority ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">🔴 Urgent</SelectItem>
                          <SelectItem value="high">🟠 High</SelectItem>
                          <SelectItem value="standard">⚫ Standard</SelectItem>
                          <SelectItem value="low">🟢 Low</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.priority && <p className="text-sm text-red-500">{formErrors.priority}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="channel" className="flex items-center gap-1">
                        Customer Channel <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.channel}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, channel: value }))}
                      >
                        <SelectTrigger className={formErrors.channel ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select channel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="service-center">Service Center</SelectItem>
                          <SelectItem value="chat">Chat</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {formErrors.channel && <p className="text-sm text-red-500">{formErrors.channel}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="flex items-center gap-1">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Enter case subject"
                      value={formData.subject}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                      className={formErrors.subject ? "border-red-500" : ""}
                    />
                    {formErrors.subject && <p className="text-sm text-red-500">{formErrors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-1">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      className={`resize-none ${formErrors.description ? "border-red-500" : ""}`}
                      style={{ minHeight: "100px" }}
                    />
                    {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Attach Media (Optional)</Label>
                    <div
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                      onClick={() => document.getElementById("file-upload")?.click()}
                      onDrop={(e) => {
                        e.preventDefault()
                        handleFileUpload(e.dataTransfer.files)
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-1">Support for photos, logs, documents, etc.</p>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Attached Files:</p>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={handleSaveAsDraft} disabled={isCreatingCase}>
                      Save as Draft
                    </Button>
                    <Button
                      onClick={handleCreateCase}
                      disabled={isCreatingCase}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      {isCreatingCase ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Case...
                        </>
                      ) : (
                        "Create Case"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>

      {selectedCase ? (
        <div className="h-screen bg-slate-50 overflow-hidden flex flex-col">
          {(() => {
            if (!caseData) return null

            return (
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 space-y-6">
                  {/* Professional Header Section */}
                  <Card className="shadow-sm rounded-2xl border-0 bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-3">
                          {/* Case ID + Subject as bold headline */}
                          <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-gray-900">
                              {caseData.id} • {caseData.subject}
                            </h1>

                            {/* Priority and Status Chips */}
                            <div className="flex items-center gap-3">
                              <Badge
                                className={`px-3 py-1 text-sm font-medium ${
                                  caseData.priority === "Urgent"
                                    ? "bg-red-100 text-red-800 border-red-200"
                                    : caseData.priority === "High"
                                      ? "bg-orange-100 text-orange-800 border-orange-200"
                                      : caseData.priority === "Medium"
                                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                        : "bg-green-100 text-green-800 border-green-200"
                                }`}
                              >
                                {caseData.priority === "Urgent" && "🔴"}
                                {caseData.priority === "High" && "🟠"}
                                {caseData.priority === "Medium" && "🟡"}
                                {caseData.priority === "Low" && "🟢"}
                                {" " + caseData.priority}
                              </Badge>

                              <Badge
                                className={`px-3 py-1 text-sm font-medium ${
                                  caseData.status === "Open"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : caseData.status === "In Progress"
                                      ? "bg-purple-100 text-purple-800 border-purple-200"
                                      : caseData.status === "Escalated"
                                        ? "bg-red-100 text-red-800 border-red-200"
                                        : "bg-gray-100 text-gray-800 border-gray-200"
                                }`}
                              >
                                {caseData.status}
                              </Badge>
                            </div>
                          </div>

                          {/* SLA Timer with Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>SLA: 2.5h remaining</span>
                            </div>
                            <div className="w-64 bg-gray-200 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <div className="relative">
                            <Button
                              onClick={() => setShowEscalationModal(true)}
                              disabled={caseData.status === "Closed" || caseData.status === "Escalated"}
                              className={`px-6 py-2 font-medium ${
                                caseData.status === "Closed" || caseData.status === "Escalated"
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-red-600 hover:bg-red-700 text-white"
                              }`}
                            >
                              Escalate
                            </Button>
                            {(caseData.status === "Closed" || caseData.status === "Escalated") && (
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                {caseData.status === "Closed"
                                  ? "Cannot escalate closed case"
                                  : "Case has already been escalated"}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                              </div>
                            )}
                          </div>
                          <Button
                            onClick={() => setShowCloseCaseModal(true)}
                            disabled={caseData.status === "Closed"}
                            className={`px-6 py-2 font-medium ${
                              caseData.status === "Closed"
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-black hover:bg-gray-800 text-white"
                            }`}
                          >
                            Close Case
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Metadata - 2 Column Grid */}
                  <Card className="shadow-sm rounded-2xl border-0 bg-white">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-4 text-gray-900">Customer Information</h4>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Customer:</span>
                          <span className="font-medium text-gray-900">{caseData.customerInfo?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium text-gray-900">{caseData.customerInfo?.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium text-gray-900">{caseData.customerInfo?.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Company:</span>
                          <span className="font-medium text-gray-900">{caseData.customerInfo?.company}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">VIN:</span>
                          <span className="font-medium text-gray-900">{caseData.vin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lucid ID:</span>
                          <span className="font-medium text-gray-900">{caseData.lucidId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account Manager:</span>
                          <span className="font-medium text-gray-900">{caseData.customerInfo?.accountManager}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time Zone:</span>
                          <span className="font-medium text-gray-900">{caseData.customerInfo?.timeZone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Channel:</span>
                          <span className="font-medium text-gray-900">{caseData.channel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Assignee:</span>
                          <span className="font-medium text-gray-900">{caseData.assignee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span className="font-medium text-gray-900">{caseData.createdDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Updated:</span>
                          <span className="font-medium text-gray-900">{caseData.lastUpdated}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Case Description */}
                  <Card className="shadow-sm rounded-2xl border-0 bg-white">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-3 text-gray-900">Case Description</h4>
                      <p className="text-gray-700 leading-relaxed">{caseData.description}</p>
                    </CardContent>
                  </Card>

                  {/* Main Content - Single Column Layout */}
                  <div className="space-y-6">
                    {/* Timeline & Comments - Full Width */}
                    <Card className="shadow-sm rounded-2xl border-0 bg-white">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-semibold text-gray-900">
                            Case Timeline & Comments
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="text-sm bg-transparent">
                              Comments
                            </Button>
                            <Button variant="ghost" size="sm" className="text-sm">
                              Timeline
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="max-h-96 overflow-y-auto space-y-6">
                        {(caseData.comments || []).map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                {comment.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-2xl rounded-tl-sm p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-sm text-gray-900">{comment.user}</span>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      comment.role === "Lucid"
                                        ? "bg-blue-100 text-blue-700"
                                        : comment.role === "Importer"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {comment.role}
                                  </span>
                                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">{comment.message}</p>
                                {comment.attachments && comment.attachments.length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {comment.attachments.map((attachment, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                                      >
                                        <Paperclip className="h-3 w-3" />
                                        {attachment}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="border-t pt-4">
                          <div className="flex gap-3">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">You</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-3">
                              <Textarea
                                placeholder="Add a comment..."
                                className="min-h-[80px] resize-none border-gray-200 focus:border-blue-500"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                              />

                              {/* File Upload Area */}
                              <div
                                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                                }`}
                                onDragOver={(e) => {
                                  e.preventDefault()
                                  setIsDragging(true)
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                  e.preventDefault()
                                  setIsDragging(false)
                                  // Handle file drop
                                }}
                              >
                                <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-600">
                                  Drag and drop files here, or{" "}
                                  <button className="text-blue-600 hover:text-blue-700 font-medium">browse</button>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Supports PDF, JPG, PNG up to 10MB</p>
                              </div>

                              {commentAttachments.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {commentAttachments.map((file, idx) => (
                                    <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                                      <Paperclip className="h-4 w-4 text-gray-500" />
                                      <span className="text-sm text-gray-700">{file.name}</span>
                                      <button
                                        onClick={() =>
                                          setCommentAttachments((prev) => prev.filter((_, i) => i !== idx))
                                        }
                                        className="text-gray-400 hover:text-red-500"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="flex justify-end">
                                <Button
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                  onClick={handlePostComment}
                                  disabled={!commentText.trim() || isPostingComment}
                                >
                                  {isPostingComment ? "Posting..." : "Post Comment"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {(caseData.timeline || []).map((item, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {index < (caseData.timeline || []).length - 1 && (
                                <div className="w-px h-8 bg-gray-200 mt-2"></div>
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">{item.action}</span>
                                {item.role && item.role !== "System" && (
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      item.role === "Lucid"
                                        ? "bg-blue-100 text-blue-700"
                                        : item.role === "Importer"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {item.role}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{item.user}</span>
                                <span>•</span>
                                <span>{item.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>

                      {/* Comment Input */}
                      {/* <div className="border-t p-6">
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10 border-2 border-gray-100 flex-shrink-0">
                            <AvatarFallback className="bg-green-100 text-green-700 font-medium">YU</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-3">
                            <div className="relative">
                              <textarea
                                placeholder="Add a comment..."
                                className="w-full p-4 bg-gray-50 border-0 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                                rows={2}
                              />
                              <Button variant="ghost" size="sm" className="absolute bottom-3 left-3 text-gray-500">
                                <Paperclip className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex justify-end">
                              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
                                Post Comment
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </Card>

                    <div className="grid gap-6 md:grid-cols-3">
                      {/* Files & Documents */}
                      <Card className="shadow-sm rounded-2xl border-0 bg-white">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Files & Documents
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                          {(caseData.files || []).map((file, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-100 transition-colors"
                            >
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                                <FileText className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Related Cases */}
                      <Card className="shadow-sm rounded-2xl border-0 bg-white">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Link className="h-5 w-5" />
                            Related Cases
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                          {[
                            { id: "CASE-001", subject: "Battery charging issue", status: "Closed" },
                            { id: "CASE-004", subject: "Software update failure", status: "Open" },
                          ].map((relatedCase) => (
                            <div
                              key={relatedCase.id}
                              className="bg-gray-50 rounded-lg p-3 hover:bg-blue-50 cursor-pointer transition-colors border border-transparent hover:border-blue-200"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{relatedCase.id}</p>
                                  <p className="text-xs text-gray-600 truncate">{relatedCase.subject}</p>
                                </div>
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${
                                    relatedCase.status === "Closed"
                                      ? "bg-gray-100 text-gray-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  {relatedCase.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Suggested Actions */}
                      <Card className="shadow-sm rounded-2xl border-0 bg-white">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <CheckSquare className="h-5 w-5" />
                            Suggested Actions
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                          {[
                            { action: "Request diagnostic logs", completed: true },
                            { action: "Schedule service appointment", completed: false },
                            { action: "Send software update", completed: false },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                              <div
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                  item.completed
                                    ? "bg-green-500 border-green-500"
                                    : "border-gray-300 hover:border-gray-400"
                                }`}
                              >
                                {item.completed && <Check className="h-3 w-3 text-white" />}
                              </div>
                              <span
                                className={`text-sm ${item.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
                              >
                                {item.action}
                              </span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="cases">All Cases</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-xs">3 urgent</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">-3 from yesterday</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-xs">5 near SLA</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+4 from yesterday</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs">94% within SLA</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
                  <Clock className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18.4h</div>
                  <div className="flex items-center gap-1 mt-1">
                    {(() => {
                      const trend = getTrendIndicator(8, false)
                      const Icon = trend.icon
                      return (
                        <>
                          <Icon className={`h-3 w-3 ${trend.color}`} />
                          <span className={`text-xs ${trend.color}`}>{trend.text}</span>
                          <span className="text-xs text-muted-foreground">vs last week</span>
                        </>
                      )
                    })()}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">🔵 Stable trend</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Cases</CardTitle>
                <CardDescription>Latest customer care cases requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cases.slice(0, 3).map((case_) => (
                    <div
                      key={case_.id}
                      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedCase(case_.id)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getHealthIndicatorColor(case_.healthIndicator)}`} />
                          <span className="font-medium">{case_.id}</span>
                          <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                          <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                        </div>
                        <p className="text-sm font-medium">{case_.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {case_.customer} • VIN: {case_.vin} • Created: {case_.created}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">SLA: {case_.slaRemaining}h</p>
                        <p className="text-xs text-muted-foreground">{case_.assignee}</p>
                        <Progress value={(case_.slaRemaining / case_.slaHours) * 100} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by Case ID, VIN, customer name, or subject..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">🟢 Open</SelectItem>
                    <SelectItem value="in-progress">🟡 In Progress</SelectItem>
                    <SelectItem value="escalated">🔵 Escalated</SelectItem>
                    <SelectItem value="awaiting-input">🟣 Awaiting Input</SelectItem>
                    <SelectItem value="resolved">⚫ Resolved</SelectItem>
                    <SelectItem value="closed">⚫ Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">🔴 Urgent</SelectItem>
                    <SelectItem value="high">🟠 High</SelectItem>
                    <SelectItem value="standard">⚫ Standard</SelectItem>
                    <SelectItem value="low">🟢 Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Color-coded legends */}
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Priority:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>Urgent</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full" />
                    <span>Standard</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Low</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">Status:</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Open</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span>In Progress</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Escalated</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full" />
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredCases.map((case_) => (
                <Card
                  key={case_.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.01]"
                  onClick={() => setSelectedCase(case_.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getHealthIndicatorColor(case_.healthIndicator)}`} />
                          <span className="font-bold text-lg">{case_.id}</span>
                          <Badge className={getPriorityColor(case_.priority)}>{case_.priority}</Badge>
                          <Badge className={getStatusColor(case_.status)}>{case_.status}</Badge>
                          <Badge variant="outline">{case_.type}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{case_.subject}</h3>
                        <p className="text-sm text-muted-foreground">{case_.description}</p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {case_.customer}
                          </span>
                          <span>VIN: {case_.vin}</span>
                          <span>Lucid ID: {case_.lucidId}</span>
                          <span>Created: {case_.created}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-medium">SLA: {case_.slaRemaining}h</span>
                        </div>
                        <Progress value={(case_.slaRemaining / case_.slaHours) * 100} className="w-24 h-2" />
                        <p className="text-xs text-muted-foreground">{case_.assignee}</p>
                        <div className="flex items-center gap-1 text-xs">
                          <MessageSquare className="h-3 w-3" />
                          <span>{case_.comments.length} comments</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* ... existing analytics content ... */}
            {/* Filters Section */}
            <Card className="bg-gradient-to-r from-gray-50 to-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-600" />
                    <h3 className="font-semibold text-lg">Analytics Filters</h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAnalyticsTimeRange("30")
                      setAnalyticsCaseTypeFilter("all")
                      setAnalyticsResolutionTimeFilter("all")
                      setAnalyticsRepeatCasesFilter("all")
                      setAnalyticsEscalatedFilter("all")
                      setAnalyticsSLAStatusFilter("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Time Range</Label>
                    <Select value={analyticsTimeRange} onValueChange={setAnalyticsTimeRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Case Type</Label>
                    <Select value={analyticsCaseTypeFilter} onValueChange={setAnalyticsCaseTypeFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="warranty">Warranty</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Resolution Time</Label>
                    <Select value={analyticsResolutionTimeFilter} onValueChange={setAnalyticsResolutionTimeFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Times</SelectItem>
                        <SelectItem value="under24h">{"<24 hours"}</SelectItem>
                        <SelectItem value="1-3days">1-3 days</SelectItem>
                        <SelectItem value="over7days">{">7 days"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Repeat Cases</Label>
                    <Select value={analyticsRepeatCasesFilter} onValueChange={setAnalyticsRepeatCasesFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cases</SelectItem>
                        <SelectItem value="repeat-only">Repeat Cases Only</SelectItem>
                        <SelectItem value="first-time">First Time Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Escalated Cases</Label>
                    <Select value={analyticsEscalatedFilter} onValueChange={setAnalyticsEscalatedFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cases</SelectItem>
                        <SelectItem value="escalated-only">Escalated Only</SelectItem>
                        <SelectItem value="non-escalated">Non-Escalated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">SLA Status</Label>
                    <Select value={analyticsSLAStatusFilter} onValueChange={setAnalyticsSLAStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="within-sla">Within SLA</SelectItem>
                        <SelectItem value="at-risk">At Risk</SelectItem>
                        <SelectItem value="breached">Breached</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics KPIs */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <div className="flex items-center gap-1 mt-1">
                    {(() => {
                      const trend = getTrendIndicator(8, false)
                      const Icon = trend.icon
                      return (
                        <>
                          <Icon className={`h-3 w-3 ${trend.color}`} />
                          <span className={`text-xs ${trend.color}`}>{trend.text}</span>
                          <span className="text-xs text-muted-foreground">vs last week</span>
                        </>
                      )
                    })()}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">🔵 Stable trend</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">SLA Breaches</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.3%</div>
                  <div className="flex items-center gap-1 mt-1">
                    {(() => {
                      const trend = getTrendIndicator(-2.1, true)
                      const Icon = trend.icon
                      return (
                        <>
                          <Icon className={`h-3 w-3 ${trend.color}`} />
                          <span className={`text-xs ${trend.color}`}>{trend.text}</span>
                          <span className="text-xs text-muted-foreground">vs last week</span>
                        </>
                      )
                    })()}
                  </div>
                  <div className="mt-2 text-xs text-red-600">🔴 Above 10% threshold</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18.4h</div>
                  <div className="flex items-center gap-1 mt-1">
                    {(() => {
                      const trend = getTrendIndicator(-12, true)
                      const Icon = trend.icon
                      return (
                        <>
                          <Icon className={`h-3 w-3 ${trend.color}`} />
                          <span className={`text-xs ${trend.color}`}>{trend.text}</span>
                          <span className="text-xs text-muted-foreground">vs last week</span>
                        </>
                      )
                    })()}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Target: 24h</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-l-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
                  <UserCheck className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2/5</div>
                  <div className="flex items-center gap-1 mt-1">
                    {(() => {
                      const trend = getTrendIndicator(3.5, true)
                      const Icon = trend.icon
                      return (
                        <>
                          <Icon className={`h-3 w-3 ${trend.color}`} />
                          <span className={`text-xs ${trend.color}`}>{trend.text}</span>
                          <span className="text-xs text-muted-foreground">vs last week</span>
                        </>
                      )
                    })()}
                  </div>
                  <div className="mt-2 text-xs text-green-600">🟢 Above target</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Case Volume</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="flex items-center gap-1 mt-1">
                    {(() => {
                      const trend = getTrendIndicator(15.2, false)
                      const Icon = trend.icon
                      return (
                        <>
                          <Icon className={`h-3 w-3 ${trend.color}`} />
                          <span className={`text-xs ${trend.color}`}>{trend.text}</span>
                          <span className="text-xs text-muted-foreground">vs last period</span>
                        </>
                      )
                    })()}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">This month</div>
                </CardContent>
              </Card>
            </div>

            {/* Health Score Meter */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-blue-600" />
                  Customer Care Health Score
                </CardTitle>
                <CardDescription>Overall performance combining SLA, resolution time, and satisfaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-24">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600">82</div>
                        <div className="text-sm text-muted-foreground">Health Score</div>
                      </div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <path
                        d="M 20 80 A 80 80 0 0 1 180 80"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 20 80 A 80 80 0 0 1 148 80"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-green-600">87%</div>
                    <div className="text-xs text-muted-foreground">SLA Compliance</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-blue-600">18.4h</div>
                    <div className="text-xs text-muted-foreground">Avg Resolution</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-yellow-600">4.2/5</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Case Volume Over Time
                  </CardTitle>
                  <CardDescription>Daily case inflow vs resolved, filterable by priority/type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last 30 days</span>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          <span>Created: {getFilteredData().caseVolumeData.totalCreated}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <span>Resolved: {getFilteredData().caseVolumeData.totalResolved}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 h-48">
                      {getFilteredData().caseVolumeData.daily.map((day, index) => (
                        <div key={index} className="flex flex-col justify-end space-y-1">
                          <div
                            className="bg-blue-500 rounded-t-sm min-h-[2px]"
                            style={{ height: `${(day.created / 25) * 100}%` }}
                            title={`Created: ${day.created}`}
                          />
                          <div
                            className="bg-green-500 rounded-t-sm min-h-[2px]"
                            style={{ height: `${(day.resolved / 25) * 100}%` }}
                            title={`Resolved: ${day.resolved}`}
                          />
                          <div className="text-xs text-center text-muted-foreground">{day.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    SLA Compliance Breakdown
                  </CardTitle>
                  <CardDescription>Cases resolved within SLA vs breached</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                        {/* On Time - 72% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="20"
                          strokeDasharray={`${getFilteredData().slaCompliance.onTime * 5.03} 502.3`}
                          strokeDashoffset="0"
                        />
                        {/* At Risk - 16% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="20"
                          strokeDasharray={`${getFilteredData().slaCompliance.atRisk * 5.03} 502.3`}
                          strokeDashoffset={`-${getFilteredData().slaCompliance.onTime * 5.03}`}
                        />
                        {/* Breached - 12% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="20"
                          strokeDasharray={`${getFilteredData().slaCompliance.breached * 5.03} 502.3`}
                          strokeDashoffset={`-${(getFilteredData().slaCompliance.onTime + getFilteredData().slaCompliance.atRisk) * 5.03}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{getFilteredData().slaCompliance.onTime}%</div>
                          <div className="text-sm text-muted-foreground">On Time</div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-8 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full" />
                        <span className="text-sm">On Time ({getFilteredData().slaCompliance.onTime}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                        <span className="text-sm">At Risk ({getFilteredData().slaCompliance.atRisk}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                        <span className="text-sm">Breached ({getFilteredData().slaCompliance.breached}%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Cases by Priority
                  </CardTitle>
                  <CardDescription>Priority distribution with Lucid brand colors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] space-y-4">
                    <div className="space-y-3">
                      {[
                        {
                          label: "Urgent",
                          count: getFilteredData().priorityBreakdown.urgent,
                          color: "bg-red-500",
                          percentage: Math.round(
                            (getFilteredData().priorityBreakdown.urgent / getFilteredData().priorityBreakdown.total) *
                              100,
                          ),
                        },
                        {
                          label: "High",
                          count: getFilteredData().priorityBreakdown.high,
                          color: "bg-orange-500",
                          percentage: Math.round(
                            (getFilteredData().priorityBreakdown.high / getFilteredData().priorityBreakdown.total) *
                              100,
                          ),
                        },
                        {
                          label: "Standard",
                          count: getFilteredData().priorityBreakdown.standard,
                          color: "bg-gray-500",
                          percentage: Math.round(
                            (getFilteredData().priorityBreakdown.standard / getFilteredData().priorityBreakdown.total) *
                              100,
                          ),
                        },
                        {
                          label: "Low",
                          count: getFilteredData().priorityBreakdown.low,
                          color: "bg-green-500",
                          percentage: Math.round(
                            (getFilteredData().priorityBreakdown.low / getFilteredData().priorityBreakdown.total) * 100,
                          ),
                        },
                      ].map((priority, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{priority.label}</span>
                            <span className="text-muted-foreground">
                              {priority.count} ({priority.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${priority.color} transition-all duration-500`}
                              style={{ width: `${priority.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        Total Cases: {getFilteredData().priorityBreakdown.total}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    Cases by Status
                  </CardTitle>
                  <CardDescription>Live status distribution with percentages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                        {/* Open - 32% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="20"
                          strokeDasharray={`${getFilteredData().statusBreakdown.open * 5.03} 502.3`}
                          strokeDashoffset="0"
                        />
                        {/* In Progress - 28% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="20"
                          strokeDasharray={`${getFilteredData().statusBreakdown.inProgress * 5.03} 502.3`}
                          strokeDashoffset={`-${getFilteredData().statusBreakdown.open * 5.03}`}
                        />
                        {/* Escalated - 15% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="20"
                          strokeDasharray={`${getFilteredData().statusBreakdown.escalated * 5.03} 502.3`}
                          strokeDashoffset={`-${(getFilteredData().statusBreakdown.open + getFilteredData().statusBreakdown.inProgress) * 5.03}`}
                        />
                        {/* Closed - 25% */}
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#6b7280"
                          strokeWidth="20"
                          strokeDasharray={`${getFilteredData().statusBreakdown.closed * 5.03} 502.3`}
                          strokeDashoffset={`-${(getFilteredData().statusBreakdown.open + getFilteredData().statusBreakdown.inProgress + getFilteredData().statusBreakdown.escalated) * 5.03}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{getFilteredData().statusBreakdown.total}</div>
                          <div className="text-sm text-muted-foreground">Total Cases</div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-8 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full" />
                        <span className="text-sm">Open ({getFilteredData().statusBreakdown.open}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                        <span className="text-sm">In Progress ({getFilteredData().statusBreakdown.inProgress}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                        <span className="text-sm">Escalated ({getFilteredData().statusBreakdown.escalated}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-500 rounded-full" />
                        <span className="text-sm">Closed ({getFilteredData().statusBreakdown.closed}%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-red-600" />
                  SLA Breach Heatmap
                </CardTitle>
                <CardDescription>Calendar view showing case breaches per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">January 2025</h4>
                    <div className="flex items-center gap-2 text-xs">
                      <span>Low</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-green-100 border rounded" />
                        <div className="w-3 h-3 bg-yellow-200 border rounded" />
                        <div className="w-3 h-3 bg-orange-300 border rounded" />
                        <div className="w-3 h-3 bg-red-400 border rounded" />
                        <div className="w-3 h-3 bg-red-600 border rounded" />
                      </div>
                      <span>High</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-xs text-center text-muted-foreground p-2 font-medium">
                        {day}
                      </div>
                    ))}
                    {getFilteredData().slaHeatmapData.map((day, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded cursor-pointer border transition-all hover:scale-110 flex items-center justify-center text-xs font-medium ${
                          day.breaches === 0
                            ? "bg-green-100 text-green-800"
                            : day.breaches <= 2
                              ? "bg-yellow-200 text-yellow-800"
                              : day.breaches <= 4
                                ? "bg-orange-300 text-orange-800"
                                : day.breaches <= 6
                                  ? "bg-red-400 text-red-800"
                                  : "bg-red-600 text-white"
                        }`}
                        title={`${day.date}: ${day.breaches} breaches`}
                      >
                        {day.date}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Click any day to drill down into breached cases</div>
                </div>
              </CardContent>
            </Card>

            {/* Export and Actions */}
            <Card className="bg-gray-50 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Export & Share</h3>
                    <p className="text-sm text-muted-foreground">Download reports or share analytics with your team</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Share via Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <Dialog open={showCloseCaseModal} onOpenChange={setShowCloseCaseModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Close Case {caseData?.id}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to close this case? This action will mark the case as resolved.
            </DialogDescription>
          </DialogHeader>

          {closeCaseSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-800">✅ Case closed successfully!</h3>
                <p className="text-sm text-muted-foreground mt-1">Case ID: {caseData?.id} has been marked as closed</p>
              </div>
              <Button
                onClick={() => {
                  setShowCloseCaseModal(false)
                  setCloseCaseSuccess(false)
                }}
                className="mt-4"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-gray-900">Current Case Status</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(caseData?.status)}>{caseData?.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Priority:</span>
                    <Badge className={getPriorityColor(caseData?.priority)}>{caseData?.priority}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">SLA Remaining:</span>
                    <span className="font-medium">{caseData?.slaRemaining}h</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowCloseCaseModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setCloseCaseSuccess(true)
                    if (caseData) {
                      caseData.status = "Closed"
                      // Update the case in the cases array as well
                      setCases((prevCases) =>
                        prevCases.map((c) => (c.id === caseData.id ? { ...c, status: "Closed" } : c)),
                      )
                    }
                  }}
                  className="bg-black hover:bg-gray-800 text-white"
                >
                  Yes, Close Case
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showEscalationModal} onOpenChange={setShowEscalationModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-xl font-semibold">Escalate Case {caseData?.id}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Escalating this case will notify the Lucid escalation team and mark it as high priority. Please provide
              escalation details below.
            </DialogDescription>
          </DialogHeader>

          {escalationSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-800">✅ Case escalated successfully!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Case ID: {caseData?.id} has been moved to Escalation Team
                </p>
              </div>
              <Button
                onClick={() => {
                  setShowEscalationModal(false)
                  setEscalationSuccess(false)
                }}
                className="mt-4"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {/* Case Snapshot */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-gray-900">Case Snapshot</h4>
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Case ID & Subject:</span>
                      <span className="font-medium">
                        {caseData?.id} — {caseData?.subject}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Status:</span>
                      <Badge variant={caseData?.status === "Open" ? "default" : "secondary"}>{caseData?.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Priority:</span>
                      <Badge
                        className={
                          caseData?.priority === "Urgent"
                            ? "bg-red-100 text-red-800"
                            : caseData?.priority === "High"
                              ? "bg-orange-100 text-orange-800"
                              : caseData?.priority === "Standard"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-green-100 text-green-800"
                        }
                      >
                        {caseData?.priority === "Urgent"
                          ? "🔴"
                          : caseData?.priority === "High"
                            ? "🟠"
                            : caseData?.priority === "Standard"
                              ? "⚫"
                              : "🟢"}{" "}
                        {caseData?.priority}
                      </Badge>
                    </div>
                    {caseData?.slaRemaining && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SLA Countdown:</span>
                        <span className="font-medium text-orange-600">{caseData.slaRemaining}h remaining</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Escalation Input Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="escalation-reason" className="flex items-center gap-1">
                      Reason for Escalation <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={escalationFormData.reason}
                      onValueChange={(value) => setEscalationFormData((prev) => ({ ...prev, reason: value }))}
                    >
                      <SelectTrigger className={escalationErrors.reason ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select escalation reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sla-breach">SLA Breach / At Risk</SelectItem>
                        <SelectItem value="safety-concern">Safety Concern</SelectItem>
                        <SelectItem value="customer-dissatisfaction">Customer Dissatisfaction</SelectItem>
                        <SelectItem value="technical-blocker">Technical Blocker</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {escalationErrors.reason && <p className="text-sm text-red-500">{escalationErrors.reason}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="escalation-notes" className="flex items-center gap-1">
                      Additional Notes <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="escalation-notes"
                      placeholder="Provide detailed information about why this case needs escalation..."
                      value={escalationFormData.notes}
                      onChange={(e) => setEscalationFormData((prev) => ({ ...prev, notes: e.target.value }))}
                      className={`min-h-[100px] ${escalationErrors.notes ? "border-red-500" : ""}`}
                    />
                    {escalationErrors.notes && <p className="text-sm text-red-500">{escalationErrors.notes}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Attachments (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => handleEscalationFileUpload(e.target.files)}
                        className="hidden"
                        id="escalation-file-upload"
                      />
                      <label htmlFor="escalation-file-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag
                          and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, images, documents up to 10MB</p>
                      </label>
                    </div>

                    {escalationFormData.attachments.length > 0 && (
                      <div className="space-y-2">
                        {escalationFormData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeEscalationFile(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Escalation Impact Info */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">Escalation Impact</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>
                      • This case will move to <strong>Escalated</strong> status
                    </li>
                    <li>• Assignee will be notified immediately</li>
                    <li>• SLA will reset to escalation SLA policy (2h response)</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t bg-white flex-shrink-0">
                <Button variant="outline" onClick={() => setShowEscalationModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleEscalationSubmit}
                  disabled={isEscalating}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {isEscalating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Escalating...
                    </>
                  ) : (
                    <>🚨 Confirm Escalation</>
                  )}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
