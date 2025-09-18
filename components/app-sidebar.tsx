"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Boxes,
  Receipt,
  LayoutDashboard,
  Users,
  PackageSearch,
  Wallet,
  User,
  Settings,
  Shield,
  LogOut,
  GitBranch,
  CheckCircle,
  Building2,
  TruckIcon,
  ArrowLeftRight,
  AlertTriangle,
  Headphones,
  FileText,
  Plus,
  Search,
  Clock,
  BarChart3,
  Car,
  Wrench,
  Mail,
  Wifi,
  Database,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const repairerNav = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Assets", href: "/assets", icon: Car },
  {
    title: "Parts Management",
    icon: Boxes,
    items: [
      { title: "Parts Order & Tracking", href: "/orders", icon: Boxes },
      { title: "OS&D Management", href: "/order-acknowledgment", icon: CheckCircle },
      { title: "Quality Alerts", href: "/quality-alerts", icon: AlertTriangle },
      { title: "BuyBack", href: "/buyback", icon: ArrowLeftRight },
    ],
  },
  {
    title: "Claims Management",
    icon: FileText,
    items: [
      { title: "Claim Creation", href: "/claims?tab=create", icon: Plus },
      { title: "Claim Tracking", href: "/claims?tab=tracking", icon: Search },
      { title: "Actions Pending", href: "/claims?tab=actions-pending", icon: Clock },
      { title: "Claim Analytics", href: "/claims?tab=analytics", icon: BarChart3 },
      { title: "Record RO", href: "/record-ro", icon: Wrench }, // Added Record RO to Claims Management
    ],
  },
  {
    title: "Technical FSE Escalation",
    icon: Wrench,
    items: [
      { title: "Create Technical Escalation", href: "/technical-escalation", icon: Plus },
      { title: "FSE Case Search", href: "/fse-case-search", icon: Search },
    ],
  },
  { title: "Billing", href: "/billing", icon: Receipt },
  { title: "Repairers", href: "/repairers", icon: Users },
  { title: "Payment Wallet", href: "/payment-wallet", icon: Wallet },
  { title: "System Journey", href: "/system-journey", icon: GitBranch },
  { title: "Customer Care", href: "/customer-care", icon: Headphones },
  { title: "Contact Us", href: "/contact-us", icon: Mail }, // Added Contact Us to repairer navigation
]

const importerNav = [
  { title: "Dashboard", href: "/importer", icon: LayoutDashboard },
  { title: "Assets", href: "/importer/assets", icon: Car },
  {
    title: "Order Management",
    icon: Boxes,
    items: [
      { title: "Bulk Orders", href: "/importer/orders", icon: Boxes },
      { title: "Invoicing", href: "/importer/invoicing", icon: Receipt },
    ],
  },
  {
    title: "Vehicle Management",
    icon: TruckIcon,
    items: [
      { title: "Connectivity Management", href: "/importer/vehicles?tab=connectivity", icon: Wifi },
      { title: "Lucid ID Administration", href: "/importer/vehicles?tab=lucid-id", icon: User },
      { title: "Vehicle Data Access", href: "/importer/vehicles?tab=data-access", icon: Database },
    ],
  },
  { title: "Customer Management", href: "/importer/customers", icon: User },
  { title: "Customer Care", href: "/importer/customer-care", icon: Headphones },
  { title: "Registration & Warranty", href: "/importer/registration", icon: Shield },
  { title: "Contact Us", href: "/importer/contact-us", icon: Mail },
]

const agentNav = [
  { title: "Dashboard", href: "/agent", icon: LayoutDashboard },
  { title: "Assets", href: "/agent/assets", icon: Car },
  { title: "Lead Management", href: "/agent/leads", icon: Users }, // Removed sub-headings under Lead Management
  {
    title: "Retail Orders",
    icon: Boxes,
    items: [
      { title: "Place Order", href: "/agent/retail-orders?tab=place", icon: Plus },
      { title: "Manage Orders", href: "/agent/retail-orders?tab=manage", icon: Boxes },
      { title: "Order Tracking", href: "/agent/retail-orders?tab=tracking", icon: Search },
    ],
  },
  {
    title: "Wholesale Order Management",
    icon: TruckIcon,
    items: [
      { title: "Bulk Orders", href: "/agent/wholesale-orders", icon: Boxes },
      { title: "Invoicing", href: "/agent/wholesale-invoicing", icon: Receipt },
    ],
  },
  {
    title: "Incentives & Discounts",
    icon: Receipt,
    items: [
      { title: "Discount Library", href: "/agent/incentives?tab=overview", icon: Receipt },
      { title: "Apply Discounts", href: "/agent/incentives?tab=apply", icon: Plus },
      { title: "Compensation Reporting", href: "/agent/incentives?tab=reporting", icon: BarChart3 },
      { title: "Audit Trail", href: "/agent/incentives?tab=audit", icon: Search },
    ],
  },
  { title: "Customer Care", href: "/agent/customer-care", icon: Headphones },
  { title: "Contact Us", href: "/agent/contact-us", icon: Mail },
]

function getCurrentViewAndNav(pathname: string) {
  if (pathname.startsWith("/importer")) {
    return {
      view: "importer",
      nav: importerNav,
      title: "Lucid Partner Portal",
      role: "Importer",
      network: "EU Distribution Network",
    }
  } else if (pathname.startsWith("/agent")) {
    return {
      view: "agent",
      nav: agentNav,
      title: "Lucid Partner Portal",
      role: "Sales Agent",
      network: "Customer Delivery Network",
    }
  } else {
    return {
      view: "repairer",
      nav: repairerNav,
      title: "Lucid Partner Portal",
      role: "Authorized Repairer",
      network: "EU Importer Model",
    }
  }
}

export default function AppSidebar() {
  const pathname = usePathname()
  const { view, nav, title, role, network } = getCurrentViewAndNav(pathname)

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (sectionTitle: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }))
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold">{title}</SidebarGroupLabel>

          <div className="px-2 py-2 space-y-2">
            <div className="flex flex-col gap-1">
              <Button
                asChild
                variant={view === "repairer" ? "default" : "outline"}
                size="sm"
                className="justify-start h-8 text-xs"
              >
                <Link href="/">
                  <ArrowLeftRight className="mr-2 h-3 w-3" />
                  Repairer View
                </Link>
              </Button>
              <Button
                asChild
                variant={view === "importer" ? "default" : "outline"}
                size="sm"
                className="justify-start h-8 text-xs"
              >
                <Link href="/importer">
                  <Building2 className="mr-2 h-3 w-3" />
                  Importer View
                </Link>
              </Button>
              <Button
                asChild
                variant={view === "agent" ? "default" : "outline"}
                size="sm"
                className="justify-start h-8 text-xs"
              >
                <Link href="/agent">
                  <TruckIcon className="mr-2 h-3 w-3" />
                  Agent View
                </Link>
              </Button>
            </div>
          </div>

          {view === "repairer" && (
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Parts Catalog">
                    <Link href="/orders">
                      <PackageSearch />
                      <span>Parts Catalog</span>
                    </Link>
                  </SidebarMenuButton>
                  <Badge className="ml-2" variant="secondary">
                    MVP
                  </Badge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => {
                if (item.items) {
                  const isOpen = openSections[item.title]
                  return (
                    <div key={item.title}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          className="font-medium text-muted-foreground cursor-pointer hover:bg-accent hover:text-accent-foreground"
                          onClick={() => toggleSection(item.title)}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          {isOpen ? (
                            <ChevronDown className="ml-auto h-4 w-4" />
                          ) : (
                            <ChevronRight className="ml-auto h-4 w-4" />
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-200 ease-in-out",
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                        )}
                      >
                        {item.items.map((subItem) => {
                          const isActive = subItem.href.includes("?tab=")
                            ? pathname === "/claims" &&
                              typeof window !== "undefined" &&
                              (window.location.search.includes(subItem.href.split("?tab=")[1]) ||
                                (subItem.href.split("?tab=")[1] === "create" &&
                                  !window.location.search.includes("tab=")))
                            : subItem.href === "/"
                              ? pathname === "/"
                              : pathname.startsWith(subItem.href.split("?")[0])
                          const SubIcon = subItem.icon
                          return (
                            <SidebarMenuItem key={subItem.title} className="ml-4">
                              <SidebarMenuButton asChild isActive={isActive} tooltip={subItem.title}>
                                <Link href={subItem.href}>
                                  <SubIcon className="h-4 w-4" />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        })}
                      </div>
                    </div>
                  )
                } else {
                  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-start">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                    <AvatarFallback>PR</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">Paxton Reed</span>
                    <span className="text-xs text-muted-foreground">Admin</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user-management">
                    <Shield className="mr-2 h-4 w-4" />
                    User Management
                  </Link>
                </DropdownMenuItem>
                {view !== "repairer" && (
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Shop Settings
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Context</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="text-xs px-2 py-1 rounded-md border bg-muted">
              <div className="font-medium">Role: {role}</div>
              <div className="text-muted-foreground">Network: {network}</div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
