"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Edit, Trash2, Shield, Building2, Truck, Wrench } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for users and permissions
const users = [
  { id: 1, name: "Paxton Reed", email: "john@shop.com", role: "Shop Admin", status: "Active", lastLogin: "2024-01-15" },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@shop.com",
    role: "Parts Manager",
    status: "Active",
    lastLogin: "2024-01-14",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@shop.com",
    role: "Technician",
    status: "Active",
    lastLogin: "2024-01-13",
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa@shop.com",
    role: "Parts Clerk",
    status: "Inactive",
    lastLogin: "2024-01-10",
  },
]

const roles = [
  {
    name: "Shop Admin",
    description: "Full access to all shop operations and user management",
    permissions: [
      "Order Parts",
      "Manage Returns",
      "View Billing",
      "Manage Notifications",
      "User Management",
      "Payment Wallet",
      "Shop Settings",
      "View Reports",
    ],
  },
  {
    name: "Parts Manager",
    description: "Manage parts ordering, returns, and inventory",
    permissions: ["Order Parts", "Manage Returns", "View Billing", "Manage Notifications", "View Reports"],
  },
  {
    name: "Technician",
    description: "Access to parts ordering and service-related functions",
    permissions: ["Order Parts", "View Returns", "View Notifications"],
  },
  {
    name: "Parts Clerk",
    description: "Basic parts ordering and inventory access",
    permissions: ["Order Parts", "View Notifications"],
  },
]

const allPermissions = [
  "Order Parts",
  "Manage Returns",
  "View Returns",
  "View Billing",
  "Manage Billing",
  "Manage Notifications",
  "View Notifications",
  "User Management",
  "Payment Wallet",
  "Shop Settings",
  "View Reports",
  "Manage Reports",
]

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" })
  const [currentView, setCurrentView] = useState("repairer")
  const { toast } = useToast()

  const handleAddUser = () => {
    toast({
      title: "User Added",
      description: `${newUser.name} has been added to your shop.`,
    })
    setIsAddUserOpen(false)
    setNewUser({ name: "", email: "", role: "" })
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsEditUserOpen(true)
  }

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "User Removed",
      description: "User has been removed from your shop.",
      variant: "destructive",
    })
  }

  const handleViewSwitch = (view: string) => {
    setCurrentView(view)
    toast({
      title: "View Switched",
      description: `Switched to ${view.charAt(0).toUpperCase() + view.slice(1)} View`,
    })
    // In a real app, this would redirect to the appropriate view
    window.location.href = view === "repairer" ? "/" : `/${view}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage personnel and permissions for your authorized repairer shop</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Add a new team member to your shop</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="views">Switch Views</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shop Personnel</CardTitle>
              <CardDescription>Manage users and their access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "Shop Admin" ? "default" : "secondary"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid gap-4">
            {roles.map((role) => (
              <Card key={role.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        {role.name}
                      </CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Role
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium mb-3">Permissions</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {allPermissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <Checkbox checked={role.permissions.includes(permission)} disabled />
                          <span
                            className={`text-sm ${role.permissions.includes(permission) ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {permission}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="views" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Switch Interface View</CardTitle>
              <CardDescription>Access different partner portal interfaces based on your role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card
                  className={`cursor-pointer transition-colors ${currentView === "repairer" ? "ring-2 ring-primary" : ""}`}
                >
                  <CardHeader className="text-center">
                    <Wrench className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle>Repairer View</CardTitle>
                    <CardDescription>Parts ordering, returns, billing, and service operations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      variant={currentView === "repairer" ? "default" : "outline"}
                      onClick={() => handleViewSwitch("repairer")}
                    >
                      {currentView === "repairer" ? "Current View" : "Switch to Repairer"}
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-colors ${currentView === "importer" ? "ring-2 ring-primary" : ""}`}
                >
                  <CardHeader className="text-center">
                    <Building2 className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle>Importer View</CardTitle>
                    <CardDescription>Wholesale orders, vehicle management, and distribution operations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      variant={currentView === "importer" ? "default" : "outline"}
                      onClick={() => handleViewSwitch("importer")}
                    >
                      {currentView === "importer" ? "Current View" : "Switch to Importer"}
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-colors ${currentView === "agent" ? "ring-2 ring-primary" : ""}`}
                >
                  <CardHeader className="text-center">
                    <Truck className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle>Agent View</CardTitle>
                    <CardDescription>Customer handovers, performance metrics, and sales operations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      variant={currentView === "agent" ? "default" : "outline"}
                      onClick={() => handleViewSwitch("agent")}
                    >
                      {currentView === "agent" ? "Current View" : "Switch to Agent"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">
                  Current View: {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentView === "repairer" &&
                    "You're currently in the Authorized Repairer interface with access to parts ordering, returns, billing, and service operations."}
                  {currentView === "importer" &&
                    "You're currently in the Importer interface with access to wholesale orders, vehicle management, and distribution operations."}
                  {currentView === "agent" &&
                    "You're currently in the Agent interface with access to customer handovers, performance metrics, and sales operations."}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and permissions</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" defaultValue={selectedUser.name} />
              </div>
              <div>
                <Label htmlFor="edit-email">Email Address</Label>
                <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
              </div>
              <div>
                <Label htmlFor="edit-role">Role</Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "User Updated",
                  description: "User information has been updated successfully.",
                })
                setIsEditUserOpen(false)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
