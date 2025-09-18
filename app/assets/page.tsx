"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Download,
  Filter,
  Eye,
  Calendar,
  MapPin,
  Car,
  Shield,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for 10+ VINs with comprehensive asset details
const mockAssets = [
  {
    vin: "5UXTA6C07N9L12345",
    assetName: "Lucid Air Dream Edition",
    lucidId: "LUC-DE-001",
    homologationCountry: "Germany",
    make: "Lucid",
    variant: "Dream Edition",
    model: "Air",
    year: 2024,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2024DE001",
    warrantyExpiry: "2027-03-15",
    assetCreated: "2023-03-22",
    lastModified: "2024-07-18",
    status: "Active",
    warrantyStatus: "Active",
  },
  {
    vin: "5UXTA6C07N9L23456",
    assetName: "Lucid Air Grand Touring",
    lucidId: "LUC-GT-002",
    homologationCountry: "Netherlands",
    make: "Lucid",
    variant: "Grand Touring",
    model: "Air",
    year: 2024,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2024GT002",
    warrantyExpiry: "2027-05-20",
    assetCreated: "2023-05-10",
    lastModified: "2024-08-12",
    status: "Active",
    warrantyStatus: "Active",
  },
  {
    vin: "5UXTA6C07N9L34567",
    assetName: "Lucid Air Touring",
    lucidId: "LUC-TO-003",
    homologationCountry: "Belgium",
    make: "Lucid",
    variant: "Touring",
    model: "Air",
    year: 2023,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2023TO003",
    warrantyExpiry: "2026-08-30",
    assetCreated: "2023-08-15",
    lastModified: "2024-06-25",
    status: "Active",
    warrantyStatus: "Near Expiry",
  },
  {
    vin: "5UXTA6C07N9L45678",
    assetName: "Lucid Air Pure",
    lucidId: "LUC-PU-004",
    homologationCountry: "Norway",
    make: "Lucid",
    variant: "Pure",
    model: "Air",
    year: 2024,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2024PU004",
    warrantyExpiry: "2027-01-12",
    assetCreated: "2023-01-08",
    lastModified: "2024-09-03",
    status: "Active",
    warrantyStatus: "Active",
  },
  {
    vin: "5UXTA6C07N9L56789",
    assetName: "Lucid Air Sapphire",
    lucidId: "LUC-SA-005",
    homologationCountry: "Germany",
    make: "Lucid",
    variant: "Sapphire",
    model: "Air",
    year: 2024,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2024SA005",
    warrantyExpiry: "2027-11-28",
    assetCreated: "2023-11-20",
    lastModified: "2024-10-15",
    status: "Active",
    warrantyStatus: "Active",
  },
  {
    vin: "5UXTA6C07N9L67890",
    assetName: "Lucid Air Dream Edition",
    lucidId: "LUC-DE-006",
    homologationCountry: "France",
    make: "Lucid",
    variant: "Dream Edition",
    model: "Air",
    year: 2023,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2023DE006",
    warrantyExpiry: "2025-12-10",
    assetCreated: "2022-12-05",
    lastModified: "2024-04-18",
    status: "Active",
    warrantyStatus: "Expired",
  },
  {
    vin: "5UXTA6C07N9L78901",
    assetName: "Lucid Air Grand Touring",
    lucidId: "LUC-GT-007",
    homologationCountry: "Sweden",
    make: "Lucid",
    variant: "Grand Touring",
    model: "Air",
    year: 2024,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2024GT007",
    warrantyExpiry: "2027-04-22",
    assetCreated: "2023-04-15",
    lastModified: "2024-11-08",
    status: "Active",
    warrantyStatus: "Active",
  },
  {
    vin: "5UXTA6C07N9L89012",
    assetName: "Lucid Air Touring",
    lucidId: "LUC-TO-008",
    homologationCountry: "Denmark",
    make: "Lucid",
    variant: "Touring",
    model: "Air",
    year: 2023,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2023TO008",
    warrantyExpiry: "2026-07-14",
    assetCreated: "2023-07-10",
    lastModified: "2024-05-30",
    status: "Active",
    warrantyStatus: "Near Expiry",
  },
  {
    vin: "5UXTA6C07N9L90123",
    assetName: "Lucid Air Pure",
    lucidId: "LUC-PU-009",
    homologationCountry: "Austria",
    make: "Lucid",
    variant: "Pure",
    model: "Air",
    year: 2024,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2024PU009",
    warrantyExpiry: "2027-09-05",
    assetCreated: "2023-09-01",
    lastModified: "2024-12-12",
    status: "Active",
    warrantyStatus: "Active",
  },
  {
    vin: "5UXTA6C07N9L01234",
    assetName: "Lucid Air Sapphire",
    lucidId: "LUC-SA-010",
    homologationCountry: "Switzerland",
    make: "Lucid",
    variant: "Sapphire",
    model: "Air",
    year: 2024,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2024SA010",
    warrantyExpiry: "2027-06-18",
    assetCreated: "2023-06-12",
    lastModified: "2024-08-25",
    status: "Active",
    warrantyStatus: "Active",
  },
  {
    vin: "5UXTA6C07N9L11111",
    assetName: "Lucid Gravity SUV",
    lucidId: "LUC-GR-011",
    homologationCountry: "Germany",
    make: "Lucid",
    variant: "Grand Touring",
    model: "Gravity",
    year: 2024,
    manufacturer: "Lucid Motors",
    registrationNo: "LUC2024GR011",
    warrantyExpiry: "2027-10-30",
    assetCreated: "2023-10-25",
    lastModified: "2024-11-20",
    status: "Active",
    warrantyStatus: "Active",
  },
]

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVin, setSelectedVin] = useState<string | null>(null)
  const [countryFilter, setCountryFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [variantFilter, setVariantFilter] = useState("all")
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    warranty: false,
    registration: false,
  })

  // Filter and search logic
  const filteredAssets = useMemo(() => {
    return mockAssets.filter((asset) => {
      const matchesSearch =
        asset.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.lucidId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCountry = countryFilter === "all" || asset.homologationCountry === countryFilter
      const matchesYear = yearFilter === "all" || asset.year.toString() === yearFilter
      const matchesVariant = variantFilter === "all" || asset.variant === variantFilter

      return matchesSearch && matchesCountry && matchesYear && matchesVariant
    })
  }, [searchTerm, countryFilter, yearFilter, variantFilter])

  const selectedAsset = selectedVin ? mockAssets.find((asset) => asset.vin === selectedVin) : null

  const getWarrantyStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Near Expiry":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Expired":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Vehicle Assets
              </h1>
              <p className="text-slate-600 mt-1">Manage and track Lucid vehicle assets with comprehensive details</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="h-5 w-5 text-slate-600" />
                Asset Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by VIN, Asset Name, or Lucid ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base border-slate-200 focus:border-slate-400 transition-colors"
                />
              </div>

              {/* Quick Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="Netherlands">Netherlands</SelectItem>
                    <SelectItem value="Belgium">Belgium</SelectItem>
                    <SelectItem value="Norway">Norway</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Sweden">Sweden</SelectItem>
                    <SelectItem value="Denmark">Denmark</SelectItem>
                    <SelectItem value="Austria">Austria</SelectItem>
                    <SelectItem value="Switzerland">Switzerland</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={variantFilter} onValueChange={setVariantFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Variant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Variants</SelectItem>
                    <SelectItem value="Dream Edition">Dream Edition</SelectItem>
                    <SelectItem value="Grand Touring">Grand Touring</SelectItem>
                    <SelectItem value="Touring">Touring</SelectItem>
                    <SelectItem value="Pure">Pure</SelectItem>
                    <SelectItem value="Sapphire">Sapphire</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="h-10 gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Assets Table */}
            <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-slate-600" />
                  Vehicle Assets ({filteredAssets.length})
                </CardTitle>
                <CardDescription>Click on any asset to view detailed information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        <TableHead className="font-semibold">VIN</TableHead>
                        <TableHead className="font-semibold">Asset Name</TableHead>
                        <TableHead className="font-semibold">Variant</TableHead>
                        <TableHead className="font-semibold">Year</TableHead>
                        <TableHead className="font-semibold">Country</TableHead>
                        <TableHead className="font-semibold">Warranty</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssets.map((asset) => (
                        <TableRow
                          key={asset.vin}
                          className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                            selectedVin === asset.vin ? "bg-blue-50 border-blue-200" : "border-slate-100"
                          }`}
                          onClick={() => setSelectedVin(asset.vin)}
                        >
                          <TableCell className="font-mono text-sm">{asset.vin}</TableCell>
                          <TableCell className="font-medium">{asset.assetName}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {asset.variant}
                            </Badge>
                          </TableCell>
                          <TableCell>{asset.year}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            {asset.homologationCountry}
                          </TableCell>
                          <TableCell>
                            <Badge className={`text-xs ${getWarrantyStatusColor(asset.warrantyStatus)}`}>
                              {asset.warrantyStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Asset Details Panel */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-600" />
                  Asset Details
                </CardTitle>
                <CardDescription>
                  {selectedAsset ? `Details for ${selectedAsset.lucidId}` : "Select an asset to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedAsset ? (
                  <div className="space-y-4">
                    {/* General Information */}
                    <Collapsible open={expandedSections.general} onOpenChange={() => toggleSection("general")}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-slate-600" />
                          <span className="font-medium">General Information</span>
                        </div>
                        {expandedSections.general ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3 space-y-3">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">Asset Name</span>
                            <span className="text-sm font-medium">{selectedAsset.assetName}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">Lucid ID</span>
                            <span className="text-sm font-medium font-mono">{selectedAsset.lucidId}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">VIN</span>
                            <span className="text-sm font-medium font-mono">{selectedAsset.vin}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">Make</span>
                            <span className="text-sm font-medium">{selectedAsset.make}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">Model</span>
                            <span className="text-sm font-medium">{selectedAsset.model}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">Variant</span>
                            <Badge variant="outline" className="text-xs">
                              {selectedAsset.variant}
                            </Badge>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">Year</span>
                            <span className="text-sm font-medium">{selectedAsset.year}</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-sm text-slate-600">Manufacturer</span>
                            <span className="text-sm font-medium">{selectedAsset.manufacturer}</span>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Warranty Information */}
                    <Collapsible open={expandedSections.warranty} onOpenChange={() => toggleSection("warranty")}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-slate-600" />
                          <span className="font-medium">Warranty Information</span>
                        </div>
                        {expandedSections.warranty ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3 space-y-3">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">Warranty Status</span>
                            <Badge className={`text-xs ${getWarrantyStatusColor(selectedAsset.warrantyStatus)}`}>
                              {selectedAsset.warrantyStatus}
                            </Badge>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">Warranty Expiry</span>
                            <span className="text-sm font-medium">{selectedAsset.warrantyExpiry}</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-sm text-slate-600 cursor-help">Homologation Country</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Country where the vehicle was certified for road use</p>
                              </TooltipContent>
                            </Tooltip>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-slate-400" />
                              <span className="text-sm font-medium">{selectedAsset.homologationCountry}</span>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Registration Information */}
                    <Collapsible
                      open={expandedSections.registration}
                      onOpenChange={() => toggleSection("registration")}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-600" />
                          <span className="font-medium">Registration & Tracking</span>
                        </div>
                        {expandedSections.registration ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3 space-y-3">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">Registration No</span>
                            <span className="text-sm font-medium font-mono">{selectedAsset.registrationNo}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-600">Asset Created</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-slate-400" />
                              <span className="text-sm font-medium">{selectedAsset.assetCreated}</span>
                            </div>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-sm text-slate-600">Last Modified</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-slate-400" />
                              <span className="text-sm font-medium">{selectedAsset.lastModified}</span>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Action Buttons */}
                    <div className="pt-4 space-y-2">
                      <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 transition-all duration-200">
                        View Service History
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Claims History
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Add to Favorites
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Car className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p>Select a vehicle asset from the table to view detailed information</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
