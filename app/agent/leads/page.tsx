"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  Phone,
  Mail,
  Calendar,
  Star,
  TrendingUp,
  Edit,
  Eye,
  Plus,
  Import,
  FileText,
  Clock,
  CheckCircle,
  User,
  Building,
  DollarSign,
  MessageSquare,
  Activity,
  Search,
} from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

const mockLeads = [
  {
    id: "LEAD-001",
    customerName: "Marcus Thompson",
    firstName: "Marcus",
    lastName: "Thompson",
    email: "marcus.thompson@email.com",
    phone: "+1 555-0198",
    contactPhone: "+1 555-0198",
    territory: "North America",
    region: "North America",
    source: "Website",
    leadSource: "Website",
    leadCaptureForm: "Lucid Web Trade-In",
    leadFormType: "Contact Request",
    leadCaptureStudio: "Downtown Studio",
    status: "Open",
    interest: "Air Dream Edition",
    interestedModel: "Air Dream Edition",
    interestedTrim: "Range+",
    assignedDate: "2025-01-15",
    priority: "High",
    score: 85,
    leadProfileScore: 85,
    generalNotes:
      "Interested in Air Dream Edition, currently drives Tesla Model S. Looking for upgrade with better range and luxury features. Has test drive scheduled for next week.",
    // Lead Status Progression
    contactingStampDate: "2025-01-16",
    engagedStampDate: null,
    closedStampDate: null,
    daysInOpenStatus: 3,
    daysInContactingStatus: 2,
    daysInEngagedStatus: 0,
    // Lucid Promotions
    currentPromotion: "Q1 2025 Lease Special",
    referredBy: "Sarah Mitchell",
    referralDate: "2025-01-14",
    referralStatus: "Active",
    // Lead Capture System
    leadType: "Sales",
    leadConversionDateTime: "2025-01-15 14:30:00",
    leaseManagement: "Standard",
    leadSourcePlatform: "Website",
    leadCaptureUser: "System Auto",
    studioKey: "DT001",
    // Next Steps & Close Reason
    nextSteps: "Schedule test drive appointment",
    reEngagementDate: "2025-01-20",
    lucidVehicleEPP: "Air Dream Edition Range+",
    activeLeadSalesCycle: true,
    lastSalesInteraction: "2025-01-16 10:15 AM",
    firstCompletedTestDriveDate: null,
    futureActivityDate: "2025-01-20",
    studioOwnership: "Downtown - Main",
    caseOrigin: "Web Lead",
    closeReason: null,
    closestSalesLocationName: "Downtown Lucid Studio",
    closestSalesLocationDistance: "2.5 miles",
    closestSalesLocationDuration: "8 minutes",
    usLeadScore: 1,
    leadOwnerHomeLocation: "Downtown District",
    leadOwnerAtHandoff: false,
    leadOwnerHomeLocationAtHandoff: null,
    dateTimeOfHandoff: null,
    // Purchase Profile
    decisionMakers: "Self and spouse",
    preferredContactMethod: "Email",
    purchaseType: "Lease",
    finance: "Lease",
    tradeIn: true,
    interestedVehicleCondition: "New",
    makeOfCurrentCar: "Tesla",
    modelOfCurrentCar: "Model S",
    evOwnership: true,
    timing: "Next 3 months",
    objections: "Price comparison with competitors",
    importantFeatures: "Range, luxury interior, performance",
    // Address Information
    streetAddress: "123 Oak Street",
    city: "San Francisco",
    stateProvince: "California",
    country: "US",
    zipCode: "94102",
    dma: "SAN FRANCISCO-OAKLAND-SAN JOSE, CA",
    leadCycleMarket: "North America",
    // System Information
    leadCreatedDate: "2025-01-15 14:30:00",
    createdBy: "System Auto",
    recordType: "Active Lead",
    lastModifiedBy: "Marcus Johnson",
    lastModifiedDate: "2025-01-16 10:15:00",
  },
  {
    id: "LEAD-002",
    customerName: "Jennifer Rodriguez",
    firstName: "Jennifer",
    lastName: "Rodriguez",
    email: "jennifer.rodriguez@email.com",
    phone: "+1 555-0287",
    contactPhone: "+1 555-0287",
    territory: "North America",
    region: "North America",
    source: "Referral",
    leadSource: "Referral",
    leadCaptureForm: "Lucid Web Trade-In",
    leadFormType: "Test Drive Request",
    leadCaptureStudio: "Beverly Hills Studio",
    status: "Contacting",
    interest: "Air Touring",
    interestedModel: "Air Touring",
    interestedTrim: "Standard",
    assignedDate: "2025-01-14",
    priority: "Medium",
    score: 72,
    leadProfileScore: 72,
    generalNotes:
      "Referred by existing customer. Currently drives BMW X5, looking for electric alternative. Interested in Air Touring for family use. Prefers weekend appointments.",
    // Lead Status Progression
    contactingStampDate: "2025-01-15",
    engagedStampDate: null,
    closedStampDate: null,
    daysInOpenStatus: 1,
    daysInContactingStatus: 3,
    daysInEngagedStatus: 0,
    // Lucid Promotions
    currentPromotion: "Referral Bonus Program",
    referredBy: "Michael Chen",
    referralDate: "2025-01-13",
    referralStatus: "Pending",
    // Lead Capture System
    leadType: "Sales",
    leadConversionDateTime: "2025-01-14 16:45:00",
    leaseManagement: "Premium",
    leadSourcePlatform: "Referral Network",
    leadCaptureUser: "Jennifer Smith",
    studioKey: "BH001",
    // Next Steps & Close Reason
    nextSteps: "Follow up call scheduled for Friday",
    reEngagementDate: "2025-01-19",
    lucidVehicleEPP: "Air Touring Standard",
    activeLeadSalesCycle: true,
    lastSalesInteraction: "2025-01-15 2:30 PM",
    firstCompletedTestDriveDate: null,
    futureActivityDate: "2025-01-19",
    studioOwnership: "Beverly Hills - Premium",
    caseOrigin: "Referral",
    closeReason: null,
    closestSalesLocationName: "Beverly Hills Lucid Studio",
    closestSalesLocationDistance: "1.2 miles",
    closestSalesLocationDuration: "5 minutes",
    usLeadScore: 1,
    leadOwnerHomeLocation: "Beverly Hills District",
    leadOwnerAtHandoff: false,
    leadOwnerHomeLocationAtHandoff: null,
    dateTimeOfHandoff: null,
    // Purchase Profile
    decisionMakers: "Self",
    preferredContactMethod: "Phone",
    purchaseType: "Finance",
    finance: "Finance",
    tradeIn: true,
    interestedVehicleCondition: "New",
    makeOfCurrentCar: "BMW",
    modelOfCurrentCar: "X5",
    evOwnership: false,
    timing: "Next 6 months",
    objections: "Charging infrastructure concerns",
    importantFeatures: "Safety, space, reliability",
    // Address Information
    streetAddress: "456 Maple Avenue",
    city: "Beverly Hills",
    stateProvince: "California",
    country: "US",
    zipCode: "90210",
    dma: "LOS ANGELES, CA",
    leadCycleMarket: "North America",
    // System Information
    leadCreatedDate: "2025-01-14 16:45:00",
    createdBy: "Jennifer Smith",
    recordType: "Active Lead",
    lastModifiedBy: "Jennifer Smith",
    lastModifiedDate: "2025-01-15 14:30:00",
  },
  {
    id: "LEAD-003",
    customerName: "David Park",
    firstName: "David",
    lastName: "Park",
    email: "david.park@email.com",
    phone: "+1 555-0356",
    contactPhone: "+1 555-0356",
    territory: "North America",
    region: "North America",
    source: "Website",
    leadSource: "Website",
    leadCaptureForm: "Lucid Web Trade-In",
    leadFormType: "Information Request",
    leadCaptureStudio: "Palo Alto Studio",
    status: "Engaged",
    interest: "Air Pure",
    interestedModel: "Air Pure",
    interestedTrim: "Base",
    assignedDate: "2025-01-12",
    priority: "High",
    score: 91,
    leadProfileScore: 91,
    generalNotes:
      "Tech executive interested in Air Pure. Has completed test drive and is comparing financing options. Very knowledgeable about EVs and technology features.",
    // Lead Status Progression
    contactingStampDate: "2025-01-13",
    engagedStampDate: "2025-01-15",
    closedStampDate: null,
    daysInOpenStatus: 1,
    daysInContactingStatus: 2,
    daysInEngagedStatus: 3,
    // Lucid Promotions
    currentPromotion: "Tech Professional Discount",
    referredBy: null,
    referralDate: null,
    referralStatus: null,
    // Lead Capture System
    leadType: "Sales",
    leadConversionDateTime: "2025-01-12 11:20:00",
    leaseManagement: "Executive",
    leadSourcePlatform: "Website",
    leadCaptureUser: "System Auto",
    studioKey: "PA001",
    // Next Steps & Close Reason
    nextSteps: "Prepare financing proposal and schedule delivery discussion",
    reEngagementDate: "2025-01-18",
    lucidVehicleEPP: "Air Pure Base",
    activeLeadSalesCycle: true,
    lastSalesInteraction: "2025-01-17 3:45 PM",
    firstCompletedTestDriveDate: "2025-01-16",
    futureActivityDate: "2025-01-18",
    studioOwnership: "Palo Alto - Tech",
    caseOrigin: "Web Lead",
    closeReason: null,
    closestSalesLocationName: "Palo Alto Lucid Studio",
    closestSalesLocationDistance: "0.8 miles",
    closestSalesLocationDuration: "3 minutes",
    usLeadScore: 1,
    leadOwnerHomeLocation: "Palo Alto District",
    leadOwnerAtHandoff: false,
    leadOwnerHomeLocationAtHandoff: null,
    dateTimeOfHandoff: null,
    // Purchase Profile
    decisionMakers: "Self",
    preferredContactMethod: "Email",
    purchaseType: "Purchase",
    finance: "Cash",
    tradeIn: false,
    interestedVehicleCondition: "New",
    makeOfCurrentCar: "Audi",
    modelOfCurrentCar: "e-tron",
    evOwnership: true,
    timing: "Next month",
    objections: "None identified",
    importantFeatures: "Technology, efficiency, performance",
    // Address Information
    streetAddress: "789 Pine Street",
    city: "Palo Alto",
    stateProvince: "California",
    country: "US",
    zipCode: "94301",
    dma: "SAN FRANCISCO-OAKLAND-SAN JOSE, CA",
    leadCycleMarket: "North America",
    // System Information
    leadCreatedDate: "2025-01-12 11:20:00",
    createdBy: "System Auto",
    recordType: "Active Lead",
    lastModifiedBy: "Alex Chen",
    lastModifiedDate: "2025-01-17 15:45:00",
  },
  {
    id: "LEAD-004",
    customerName: "Sarah Williams",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@email.com",
    phone: "+1 555-0423",
    contactPhone: "+1 555-0423",
    territory: "North America",
    region: "North America",
    source: "Website",
    leadSource: "Website",
    leadCaptureForm: "Lucid Web Trade-In",
    leadFormType: "Purchase Intent",
    leadCaptureStudio: "Miami Studio",
    status: "Order Commit",
    interest: "Air Grand Touring",
    interestedModel: "Air Grand Touring",
    interestedTrim: "Performance",
    assignedDate: "2025-01-08",
    priority: "High",
    score: 95,
    leadProfileScore: 95,
    generalNotes:
      "Ready to place order for Air Grand Touring Performance. Financing approved, trade-in evaluated. Discussing delivery timeline and configuration options.",
    contactingStampDate: "2025-01-09",
    engagedStampDate: "2025-01-11",
    closedStampDate: null,
    daysInOpenStatus: 1,
    daysInContactingStatus: 2,
    daysInEngagedStatus: 7,
    currentPromotion: "Performance Package Incentive",
    referredBy: null,
    referralDate: null,
    referralStatus: null,
    leadType: "Sales",
    leadConversionDateTime: "2025-01-08 09:15:00",
    leaseManagement: "Premium",
    leadSourcePlatform: "Website",
    leadCaptureUser: "System Auto",
    studioKey: "MI001",
    nextSteps: "Finalize order configuration and process payment",
    reEngagementDate: "2025-01-19",
    lucidVehicleEPP: "Air Grand Touring Performance",
    activeLeadSalesCycle: true,
    lastSalesInteraction: "2025-01-18 11:30 AM",
    firstCompletedTestDriveDate: "2025-01-10",
    futureActivityDate: "2025-01-19",
    studioOwnership: "Miami - Luxury",
    caseOrigin: "Web Lead",
    closeReason: null,
    closestSalesLocationName: "Miami Lucid Studio",
    closestSalesLocationDistance: "3.2 miles",
    closestSalesLocationDuration: "12 minutes",
    usLeadScore: 1,
    leadOwnerHomeLocation: "Miami District",
    leadOwnerAtHandoff: false,
    leadOwnerHomeLocationAtHandoff: null,
    dateTimeOfHandoff: null,
    decisionMakers: "Self and financial advisor",
    preferredContactMethod: "Email",
    purchaseType: "Purchase",
    finance: "Finance",
    tradeIn: true,
    interestedVehicleCondition: "New",
    makeOfCurrentCar: "Mercedes",
    modelOfCurrentCar: "S-Class",
    evOwnership: false,
    timing: "Immediate",
    objections: "None",
    importantFeatures: "Performance, luxury, technology",
    streetAddress: "321 Ocean Drive",
    city: "Miami",
    stateProvince: "Florida",
    country: "US",
    zipCode: "33139",
    dma: "MIAMI-FT. LAUDERDALE, FL",
    leadCycleMarket: "North America",
    leadCreatedDate: "2025-01-08 09:15:00",
    createdBy: "System Auto",
    recordType: "Active Lead",
    lastModifiedBy: "Carlos Martinez",
    lastModifiedDate: "2025-01-18 11:30:00",
  },
  {
    id: "LEAD-005",
    customerName: "Michael Chen",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@email.com",
    phone: "+1 555-0567",
    contactPhone: "+1 555-0567",
    territory: "North America",
    region: "North America",
    source: "Referral",
    leadSource: "Referral",
    leadCaptureForm: "Lucid Web Trade-In",
    leadFormType: "VIP Request",
    leadCaptureStudio: "Seattle Studio",
    status: "Handoff",
    interest: "Air Dream Edition",
    interestedModel: "Air Dream Edition",
    interestedTrim: "Range+",
    assignedDate: "2025-01-05",
    priority: "High",
    score: 88,
    leadProfileScore: 88,
    generalNotes:
      "VIP customer being handed off to delivery specialist. Order confirmed, vehicle in production. Coordinating delivery logistics and final preparations.",
    contactingStampDate: "2025-01-06",
    engagedStampDate: "2025-01-08",
    closedStampDate: null,
    daysInOpenStatus: 1,
    daysInContactingStatus: 2,
    daysInEngagedStatus: 10,
    currentPromotion: "VIP Experience Package",
    referredBy: "David Park",
    referralDate: "2025-01-04",
    referralStatus: "Completed",
    leadType: "Sales",
    leadConversionDateTime: "2025-01-05 14:20:00",
    leaseManagement: "VIP",
    leadSourcePlatform: "Referral Network",
    leadCaptureUser: "Lisa Wong",
    studioKey: "SE001",
    nextSteps: "Coordinate delivery appointment and final walkthrough",
    reEngagementDate: "2025-01-20",
    lucidVehicleEPP: "Air Dream Edition Range+",
    activeLeadSalesCycle: true,
    lastSalesInteraction: "2025-01-18 4:15 PM",
    firstCompletedTestDriveDate: "2025-01-07",
    futureActivityDate: "2025-01-20",
    studioOwnership: "Seattle - Premium",
    caseOrigin: "Referral",
    closeReason: null,
    closestSalesLocationName: "Seattle Lucid Studio",
    closestSalesLocationDistance: "1.5 miles",
    closestSalesLocationDuration: "6 minutes",
    usLeadScore: 1,
    leadOwnerHomeLocation: "Seattle District",
    leadOwnerAtHandoff: true,
    leadOwnerHomeLocationAtHandoff: "Delivery Center",
    dateTimeOfHandoff: "2025-01-18 16:15:00",
    decisionMakers: "Self",
    preferredContactMethod: "Phone",
    purchaseType: "Purchase",
    finance: "Cash",
    tradeIn: false,
    interestedVehicleCondition: "New",
    makeOfCurrentCar: "Porsche",
    modelOfCurrentCar: "Taycan",
    evOwnership: true,
    timing: "Immediate",
    objections: "None",
    importantFeatures: "Range, luxury, exclusivity",
    streetAddress: "654 Pine Avenue",
    city: "Seattle",
    stateProvince: "Washington",
    country: "US",
    zipCode: "98101",
    dma: "SEATTLE-TACOMA, WA",
    leadCycleMarket: "North America",
    leadCreatedDate: "2025-01-05 14:20:00",
    createdBy: "Lisa Wong",
    recordType: "Active Lead",
    lastModifiedBy: "Delivery Team",
    lastModifiedDate: "2025-01-18 16:15:00",
  },
  {
    id: "LEAD-006",
    customerName: "Robert Johnson",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@email.com",
    phone: "+1 555-0689",
    contactPhone: "+1 555-0689",
    territory: "North America",
    region: "North America",
    source: "Website",
    leadSource: "Website",
    leadCaptureForm: "Lucid Web Trade-In",
    leadFormType: "Information Request",
    leadCaptureStudio: "Chicago Studio",
    status: "Unresponsive",
    interest: "Air Touring",
    interestedModel: "Air Touring",
    interestedTrim: "Standard",
    assignedDate: "2024-12-20",
    priority: "Low",
    score: 45,
    leadProfileScore: 45,
    generalNotes:
      "Initial interest shown but has not responded to multiple follow-up attempts. Last contact attempt was via email and phone. May need different approach or timing.",
    contactingStampDate: "2024-12-21",
    engagedStampDate: null,
    closedStampDate: null,
    daysInOpenStatus: 1,
    daysInContactingStatus: 28,
    daysInEngagedStatus: 0,
    currentPromotion: "Holiday Special",
    referredBy: null,
    referralDate: null,
    referralStatus: null,
    leadType: "Sales",
    leadConversionDateTime: "2024-12-20 16:30:00",
    leaseManagement: "Standard",
    leadSourcePlatform: "Website",
    leadCaptureUser: "System Auto",
    studioKey: "CH001",
    nextSteps: "Try alternative contact method or schedule for future re-engagement",
    reEngagementDate: "2025-02-01",
    lucidVehicleEPP: "Air Touring Standard",
    activeLeadSalesCycle: false,
    lastSalesInteraction: "2025-01-10 2:00 PM",
    firstCompletedTestDriveDate: null,
    futureActivityDate: "2025-02-01",
    studioOwnership: "Chicago - Main",
    caseOrigin: "Web Lead",
    closeReason: null,
    closestSalesLocationName: "Chicago Lucid Studio",
    closestSalesLocationDistance: "5.2 miles",
    closestSalesLocationDuration: "18 minutes",
    usLeadScore: 1,
    leadOwnerHomeLocation: "Chicago District",
    leadOwnerAtHandoff: false,
    leadOwnerHomeLocationAtHandoff: null,
    dateTimeOfHandoff: null,
    decisionMakers: "Unknown",
    preferredContactMethod: "Email",
    purchaseType: "Unknown",
    finance: "Unknown",
    tradeIn: true,
    interestedVehicleCondition: "New",
    makeOfCurrentCar: "Ford",
    modelOfCurrentCar: "F-150",
    evOwnership: false,
    timing: "Undetermined",
    objections: "No response to determine",
    importantFeatures: "Unknown",
    streetAddress: "987 Michigan Avenue",
    city: "Chicago",
    stateProvince: "Illinois",
    country: "US",
    zipCode: "60611",
    dma: "CHICAGO, IL",
    leadCycleMarket: "North America",
    leadCreatedDate: "2024-12-20 16:30:00",
    createdBy: "System Auto",
    recordType: "Active Lead",
    lastModifiedBy: "Tom Wilson",
    lastModifiedDate: "2025-01-10 14:00:00",
  },
  {
    id: "LEAD-007",
    customerName: "Emily Davis",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@email.com",
    phone: "+1 555-0734",
    contactPhone: "+1 555-0734",
    territory: "North America",
    region: "North America",
    source: "Referral",
    leadSource: "Referral",
    leadCaptureForm: "Lucid Web Trade-In",
    leadFormType: "Purchase Intent",
    leadCaptureStudio: "Austin Studio",
    status: "Closed",
    interest: "Air Pure",
    interestedModel: "Air Pure",
    interestedTrim: "Base",
    assignedDate: "2024-12-15",
    priority: "High",
    score: 92,
    leadProfileScore: 92,
    generalNotes:
      "Successfully closed sale. Customer took delivery of Air Pure Base. Excellent experience throughout sales process. Potential referral source for future leads.",
    contactingStampDate: "2024-12-16",
    engagedStampDate: "2024-12-18",
    closedStampDate: "2025-01-12",
    daysInOpenStatus: 1,
    daysInContactingStatus: 2,
    daysInEngagedStatus: 25,
    currentPromotion: "Year-End Incentive",
    referredBy: "Sarah Williams",
    referralDate: "2024-12-14",
    referralStatus: "Completed",
    leadType: "Sales",
    leadConversionDateTime: "2024-12-15 10:45:00",
    leaseManagement: "Standard",
    leadSourcePlatform: "Referral Network",
    leadCaptureUser: "Mark Thompson",
    studioKey: "AU001",
    nextSteps: "Follow up for satisfaction survey and referral opportunities",
    reEngagementDate: null,
    lucidVehicleEPP: "Air Pure Base",
    activeLeadSalesCycle: false,
    lastSalesInteraction: "2025-01-12 3:30 PM",
    firstCompletedTestDriveDate: "2024-12-19",
    futureActivityDate: null,
    studioOwnership: "Austin - Main",
    caseOrigin: "Referral",
    closeReason: "Sale Completed",
    closestSalesLocationName: "Austin Lucid Studio",
    closestSalesLocationDistance: "2.1 miles",
    closestSalesLocationDuration: "9 minutes",
    usLeadScore: 1,
    leadOwnerHomeLocation: "Austin District",
    leadOwnerAtHandoff: false,
    leadOwnerHomeLocationAtHandoff: null,
    dateTimeOfHandoff: null,
    decisionMakers: "Self and spouse",
    preferredContactMethod: "Phone",
    purchaseType: "Lease",
    finance: "Lease",
    tradeIn: true,
    interestedVehicleCondition: "New",
    makeOfCurrentCar: "Honda",
    modelOfCurrentCar: "Accord",
    evOwnership: false,
    timing: "Completed",
    objections: "None",
    importantFeatures: "Efficiency, reliability, value",
    streetAddress: "147 South Street",
    city: "Austin",
    stateProvince: "Texas",
    country: "US",
    zipCode: "78701",
    dma: "AUSTIN, TX",
    leadCycleMarket: "North America",
    leadCreatedDate: "2024-12-15 10:45:00",
    createdBy: "Mark Thompson",
    recordType: "Closed Lead",
    lastModifiedBy: "Mark Thompson",
    lastModifiedDate: "2025-01-12 15:30:00",
  },
  {
    id: "LEAD-008",
    customerName: "James Wilson",
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@email.com",
    phone: "+1 555-0812",
    contactPhone: "+1 555-0812",
    territory: "North America",
    region: "North America",
    source: "Website",
    leadSource: "Website",
    leadCaptureForm: "Lucid Web Trade-In",
    leadFormType: "Information Request",
    leadCaptureStudio: "Denver Studio",
    status: "Expired",
    interest: "Air Touring",
    interestedModel: "Air Touring",
    interestedTrim: "Standard",
    assignedDate: "2024-10-15",
    priority: "Medium",
    score: 58,
    leadProfileScore: 58,
    generalNotes:
      "Lead expired after 90 days without progression. Customer showed initial interest but timing was not right. Market conditions and personal circumstances changed.",
    contactingStampDate: "2024-10-16",
    engagedStampDate: "2024-10-20",
    closedStampDate: null,
    daysInOpenStatus: 1,
    daysInContactingStatus: 4,
    daysInEngagedStatus: 90,
    currentPromotion: "Fall Promotion",
    referredBy: null,
    referralDate: null,
    referralStatus: null,
    leadType: "Sales",
    leadConversionDateTime: "2024-10-15 13:15:00",
    leaseManagement: "Standard",
    leadSourcePlatform: "Website",
    leadCaptureUser: "System Auto",
    studioKey: "DE001",
    nextSteps: "Archive lead, potential for future re-engagement",
    reEngagementDate: "2025-04-15",
    lucidVehicleEPP: "Air Touring Standard",
    activeLeadSalesCycle: false,
    lastSalesInteraction: "2024-12-20 1:45 PM",
    firstCompletedTestDriveDate: "2024-10-22",
    futureActivityDate: null,
    studioOwnership: "Denver - Main",
    caseOrigin: "Web Lead",
    closeReason: "Lead Expired - Timing",
    closestSalesLocationName: "Denver Lucid Studio",
    closestSalesLocationDistance: "4.7 miles",
    closestSalesLocationDuration: "15 minutes",
    usLeadScore: 1,
    leadOwnerHomeLocation: "Denver District",
    leadOwnerAtHandoff: false,
    leadOwnerHomeLocationAtHandoff: null,
    dateTimeOfHandoff: null,
    decisionMakers: "Self",
    preferredContactMethod: "Email",
    purchaseType: "Lease",
    finance: "Lease",
    tradeIn: false,
    interestedVehicleCondition: "New",
    makeOfCurrentCar: "Subaru",
    modelOfCurrentCar: "Outback",
    evOwnership: false,
    timing: "Timing not right",
    objections: "Market timing, personal circumstances",
    importantFeatures: "Reliability, range, value",
    streetAddress: "258 Mountain View Drive",
    city: "Denver",
    stateProvince: "Colorado",
    country: "US",
    zipCode: "80202",
    dma: "DENVER, CO",
    leadCycleMarket: "North America",
    leadCreatedDate: "2024-10-15 13:15:00",
    createdBy: "System Auto",
    recordType: "Expired Lead",
    lastModifiedBy: "Rachel Green",
    lastModifiedDate: "2024-12-20 13:45:00",
  },
]

interface Lead {
  id: string
  customerName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  contactPhone: string
  territory: string
  region: string
  source: string
  leadSource: string
  leadCaptureForm: string
  leadFormType: string
  leadCaptureStudio: string
  status: string
  interest: string
  interestedModel: string
  interestedTrim: string
  assignedDate: string
  priority: string
  score: number
  leadProfileScore: number
  generalNotes: string
  contactingStampDate: string | null
  engagedStampDate: string | null
  closedStampDate: string | null
  daysInOpenStatus: number
  daysInContactingStatus: number
  daysInEngagedStatus: number
  currentPromotion: string | null
  referredBy: string | null
  referralDate: string | null
  referralStatus: string | null
  leadType: string
  leadConversionDateTime: string
  leaseManagement: string
  leadSourcePlatform: string
  leadCaptureUser: string
  studioKey: string
  nextSteps: string
  reEngagementDate: string | null
  lucidVehicleEPP: string
  activeLeadSalesCycle: boolean
  lastSalesInteraction: string
  firstCompletedTestDriveDate: string | null
  futureActivityDate: string | null
  studioOwnership: string
  caseOrigin: string
  closeReason: string | null
  closestSalesLocationName: string
  closestSalesLocationDistance: string
  closestSalesLocationDuration: string
  usLeadScore: number
  leadOwnerHomeLocation: string
  leadOwnerAtHandoff: boolean
  leadOwnerHomeLocationAtHandoff: string | null
  dateTimeOfHandoff: string | null
  decisionMakers: string
  preferredContactMethod: string
  purchaseType: string
  finance: string
  tradeIn: boolean
  interestedVehicleCondition: string
  makeOfCurrentCar: string
  modelOfCurrentCar: string
  evOwnership: boolean
  timing: string
  objections: string
  importantFeatures: string
  streetAddress: string
  city: string
  stateProvince: string
  country: string
  zipCode: string
  dma: string
  leadCycleMarket: string
  leadCreatedDate: string
  createdBy: string
  recordType: string
  lastModifiedBy: string
  lastModifiedDate: string
}

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isNewLeadDialogOpen, setIsNewLeadDialogOpen] = useState(false)
  const [newLeadForm, setNewLeadForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    leadSource: "Website",
    interestedModel: "",
    currentVehicle: "",
    purchaseTimeframe: "",
    notes: "",
  })

  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesStatus = selectedStatus === "all" || lead.status.toLowerCase() === selectedStatus.toLowerCase()
    const matchesSearch = lead.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "contacting":
        return "bg-yellow-100 text-yellow-800"
      case "engaged":
        return "bg-green-100 text-green-800"
      case "order commit":
        return "bg-purple-100 text-purple-800"
      case "handoff":
        return "bg-orange-100 text-orange-800"
      case "unresponsive":
        return "bg-gray-100 text-gray-800"
      case "closed":
        return "bg-green-200 text-green-900"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const openLeadDetail = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailDialogOpen(true)
  }

  const handleNewLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("New lead created:", newLeadForm)
    setIsNewLeadDialogOpen(false)
    setNewLeadForm({
      customerName: "",
      email: "",
      phone: "",
      leadSource: "Website",
      interestedModel: "",
      currentVehicle: "",
      purchaseTimeframe: "",
      notes: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>
          <p className="text-muted-foreground">Comprehensive CRM for managing sales leads and customer relationships</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsNewLeadDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Lead
          </Button>
          <Button variant="outline">
            <Import className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">In sales pipeline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Badge className="bg-blue-100 text-blue-800">New</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">New assignments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.3%</div>
            <p className="text-xs text-muted-foreground">+5.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Lead Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82</div>
            <p className="text-xs text-muted-foreground">Quality rating</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Lead Pipeline</CardTitle>
          <CardDescription>
            Comprehensive lead management with full CRM capabilities and customer journey tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="contacting">Contacting</SelectItem>
                <SelectItem value="engaged">Engaged</SelectItem>
                <SelectItem value="order commit">Order Commit</SelectItem>
                <SelectItem value="handoff">Handoff</SelectItem>
                <SelectItem value="unresponsive">Unresponsive</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead Name</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Lead Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{lead.customerName}</div>
                        <div className="text-sm text-muted-foreground">{lead.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.leadSource}</div>
                      <div className="text-sm text-muted-foreground">{lead.leadCaptureForm}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.interestedModel}</div>
                      <div className="text-sm text-muted-foreground">{lead.interestedTrim}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="font-medium">{lead.leadProfileScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(lead.priority)}>{lead.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{lead.lastSalesInteraction}</div>
                      <div className="text-muted-foreground">Next: {lead.futureActivityDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/agent/leads/${lead.id}`}>
                          <Eye className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-full overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl">Lead: {selectedLead?.customerName}</DialogTitle>
                  <DialogDescription>
                    {selectedLead?.email} • {selectedLead?.phone} • {selectedLead?.leadSource} •{" "}
                    {selectedLead?.leadCaptureForm}
                  </DialogDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  LPS Quote Intake Request
                </Button>
                <Button size="sm" variant="outline">
                  Payment Estimate
                </Button>
              </div>
            </div>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              {/* Lead Status Pipeline */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4 overflow-x-auto">
                  {[
                    "Open",
                    "Contacting",
                    "Engaged",
                    "Order Commit",
                    "Handoff",
                    "Unresponsive",
                    "Closed",
                    "Expired",
                  ].map((status, index) => (
                    <div key={status} className="flex items-center gap-2 flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          selectedLead.status === status
                            ? "bg-black text-white"
                            : index <
                                [
                                  "Open",
                                  "Contacting",
                                  "Engaged",
                                  "Order Commit",
                                  "Handoff",
                                  "Unresponsive",
                                  "Closed",
                                  "Expired",
                                ].indexOf(selectedLead.status)
                              ? "bg-gray-300 text-gray-600"
                              : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {status === "Open"
                          ? "O"
                          : status === "Contacting"
                            ? "C"
                            : status === "Engaged"
                              ? "E"
                              : status === "Order Commit"
                                ? "OC"
                                : status === "Handoff"
                                  ? "H"
                                  : status === "Unresponsive"
                                    ? "U"
                                    : status === "Closed"
                                      ? "CL"
                                      : "EX"}
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">{status}</span>
                      {index < 7 && <div className="w-8 h-0.5 bg-gray-200 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 flex-shrink-0 ml-4">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Lead Status as Complete
                </Button>
              </div>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  {/* Key Fields */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Fields</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Next Steps</Label>
                          <p className="mt-1">{selectedLead.nextSteps}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Guidance for Success</Label>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {selectedLead.status === "Open"
                              ? "New lead, initial outreach and contact has not begun."
                              : selectedLead.status === "Contacting"
                                ? "Lead contacted, working on engagement."
                                : selectedLead.status === "Engaged"
                                  ? "Lead is engaged and progressing through sales process."
                                  : "Lead is in advanced stage of sales process."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Information Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Lead Name</Label>
                            <p className="mt-1 font-medium">{selectedLead.customerName}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">First Name</Label>
                            <p className="mt-1">{selectedLead.firstName}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Last Name</Label>
                            <p className="mt-1">{selectedLead.lastName}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Primary Email</Label>
                            <p className="mt-1 text-blue-600">{selectedLead.email}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                            <p className="mt-1">{selectedLead.phone}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Contact Phone</Label>
                            <p className="mt-1">{selectedLead.contactPhone}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Region</Label>
                            <p className="mt-1">{selectedLead.region}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Owner</Label>
                            <p className="mt-1 text-blue-600">{selectedLead.lastModifiedBy}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Account</Label>
                            <p className="mt-1 text-blue-600">{selectedLead.customerName}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Contact</Label>
                            <p className="mt-1 text-blue-600">{selectedLead.customerName}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Lead Status</Label>
                            <Badge className={getStatusColor(selectedLead.status)}>{selectedLead.status}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Situation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Situation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">General Notes</Label>
                        <p className="mt-2 text-sm leading-relaxed">{selectedLead.generalNotes}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lead Status Progression */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Lead Status Progression</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Contacting Stamp Date</Label>
                            <p className="mt-1">{selectedLead.contactingStampDate || "Not set"}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Engaged Stamp Date</Label>
                            <p className="mt-1">{selectedLead.engagedStampDate || "Not set"}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Closed Stamp Date</Label>
                            <p className="mt-1">{selectedLead.closedStampDate || "Not set"}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Days in Open Status</Label>
                            <p className="mt-1">{selectedLead.daysInOpenStatus}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Days in Contacting Status
                            </Label>
                            <p className="mt-1">{selectedLead.daysInContactingStatus}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Days in Engaged Status</Label>
                            <p className="mt-1">{selectedLead.daysInEngagedStatus}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lucid Promotions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Lucid Promotions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Current Promotion</Label>
                            <p className="mt-1">{selectedLead.currentPromotion}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Referred by</Label>
                            <p className="mt-1">{selectedLead.referredBy || "N/A"}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Referral Date</Label>
                            <p className="mt-1">{selectedLead.referralDate || "N/A"}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Referral Status</Label>
                            <p className="mt-1">{selectedLead.referralStatus || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lead Capture System Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Lead Capture System Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Lead Type</Label>
                            <p className="mt-1">{selectedLead.leadType}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Lead Conversion DateTime
                            </Label>
                            <p className="mt-1">{selectedLead.leadConversionDateTime}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Lease Management</Label>
                            <p className="mt-1">{selectedLead.leaseManagement}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Lead Source Platform</Label>
                            <p className="mt-1">{selectedLead.leadSourcePlatform}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Lead Capture Form</Label>
                            <p className="mt-1">{selectedLead.leadCaptureForm}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Lead Source</Label>
                            <p className="mt-1">{selectedLead.leadSource}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Lead Capture Studio</Label>
                            <p className="mt-1">{selectedLead.leadCaptureStudio}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Lead Capture User</Label>
                            <p className="mt-1 text-blue-600">{selectedLead.leadCaptureUser}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Studio Key</Label>
                            <p className="mt-1">{selectedLead.studioKey}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Purchase Profile */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Purchase Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Decision Maker(s)</Label>
                            <p className="mt-1">{selectedLead.decisionMakers}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Preferred Contact Method
                            </Label>
                            <p className="mt-1">{selectedLead.preferredContactMethod}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Interested Model</Label>
                            <p className="mt-1">{selectedLead.interestedModel}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">
                              Interested Vehicle Condition
                            </Label>
                            <p className="mt-1">{selectedLead.interestedVehicleCondition}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Make of Current Car</Label>
                            <p className="mt-1">{selectedLead.makeOfCurrentCar}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">EV Ownership</Label>
                            <p className="mt-1">{selectedLead.evOwnership ? "Yes" : "No"}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Purchase Type</Label>
                            <p className="mt-1">{selectedLead.purchaseType}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Finance</Label>
                            <p className="mt-1">{selectedLead.finance}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Trade-in</Label>
                            <p className="mt-1">{selectedLead.tradeIn ? "Yes" : "No"}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Interested Trim</Label>
                            <p className="mt-1">{selectedLead.interestedTrim}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Model of Current Car</Label>
                            <p className="mt-1">{selectedLead.modelOfCurrentCar}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Timing</Label>
                            <p className="mt-1">{selectedLead.timing}</p>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Objection(s)</Label>
                          <p className="mt-1">{selectedLead.objections}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Important Features</Label>
                          <p className="mt-1">{selectedLead.importantFeatures}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Address Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Address Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Street Address</Label>
                            <p className="mt-1">{selectedLead.streetAddress}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">State/Province</Label>
                            <p className="mt-1">{selectedLead.stateProvince}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Zip Code</Label>
                            <p className="mt-1">{selectedLead.zipCode}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">City</Label>
                            <p className="mt-1">{selectedLead.city}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Country</Label>
                            <p className="mt-1">{selectedLead.country}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">DMA</Label>
                            <p className="mt-1">{selectedLead.dma}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">System Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Lead Created Date</Label>
                            <p className="mt-1">{selectedLead.leadCreatedDate}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Record Type</Label>
                            <p className="mt-1">{selectedLead.recordType}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Created By</Label>
                            <p className="mt-1 text-blue-600">{selectedLead.createdBy}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Last Modified By</Label>
                            <p className="mt-1 text-blue-600">
                              {selectedLead.lastModifiedBy}, {selectedLead.lastModifiedDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="related">
                  <Card>
                    <CardHeader>
                      <CardTitle>Related List Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="justify-start bg-transparent">
                          <FileText className="h-4 w-4 mr-2 text-pink-500" />
                          Cases (0)
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                          Sales Events (1)
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <Clock className="h-4 w-4 mr-2 text-teal-500" />
                          Lead History (1)
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <MessageSquare className="h-4 w-4 mr-2 text-orange-500" />
                          Talkdesk Activities (0)
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                          Incentive Requests (0)
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <Building className="h-4 w-4 mr-2 text-red-500" />
                          Acquisitions (1)
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Talkdesk Activities (0)</CardTitle>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Activity className="h-4 w-4 mr-2" />
                            Activity
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chatter
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Sales Event
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <div className="text-muted-foreground mb-4">
                          <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p className="text-lg font-medium">No activities to show.</p>
                          <p className="text-sm">Get started by sending an email, scheduling a task, and more.</p>
                        </div>
                        <Button>Show All Activities</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isNewLeadDialogOpen} onOpenChange={setIsNewLeadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Lead</DialogTitle>
            <DialogDescription>Add a new lead to your sales pipeline</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleNewLeadSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={newLeadForm.customerName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, customerName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadSource">Lead Source</Label>
                <Select
                  value={newLeadForm.leadSource}
                  onValueChange={(value) => setNewLeadForm({ ...newLeadForm, leadSource: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Phone Call">Phone Call</SelectItem>
                    <SelectItem value="Walk-in">Walk-in</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interestedModel">Interested Model</Label>
                <Input
                  id="interestedModel"
                  value={newLeadForm.interestedModel}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, interestedModel: e.target.value })}
                  placeholder="e.g., Model S, Model 3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentVehicle">Current Vehicle</Label>
                <Input
                  id="currentVehicle"
                  value={newLeadForm.currentVehicle}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, currentVehicle: e.target.value })}
                  placeholder="e.g., 2020 Honda Civic"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchaseTimeframe">Purchase Timeframe</Label>
              <Select
                value={newLeadForm.purchaseTimeframe}
                onValueChange={(value) => setNewLeadForm({ ...newLeadForm, purchaseTimeframe: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Immediate">Immediate (0-30 days)</SelectItem>
                  <SelectItem value="Short-term">Short-term (1-3 months)</SelectItem>
                  <SelectItem value="Medium-term">Medium-term (3-6 months)</SelectItem>
                  <SelectItem value="Long-term">Long-term (6+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newLeadForm.notes}
                onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                placeholder="Additional notes about the lead..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsNewLeadDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Lead</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
