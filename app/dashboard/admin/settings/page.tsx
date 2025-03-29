"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Home,
  User,
  CreditCard,
  MessageSquare,
  FileText,
  Settings,
  Building,
  Users,
  Bell,
  Lock,
  Save,
  Globe,
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit2,
  Eye,
  MoreHorizontal,
  Check,
  X
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type AdminUser = {
  id: number
  name: string
  email: string
  role: "Super Admin" | "Admin"
  status: "Active" | "Inactive"
}

type WardenUser = {
  id: number
  name: string
  email: string
  block: string
  status: "Active" | "Inactive"
}

export default function AdminSettingsPage() {
  const [currentTab, setCurrentTab] = useState("general")
  const [currentPage, setCurrentPage] = useState(1)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [passwordLength, setPasswordLength] = useState(8)
  const [sessionTimeout, setSessionTimeout] = useState(30)
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false)
  const [isAddWardenOpen, setIsAddWardenOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<{id: number, type: 'admin' | 'warden'}>()

  // Form states
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Admin" as "Admin" | "Super Admin",
    status: "Active" as "Active" | "Inactive"
  })

  const [newWarden, setNewWarden] = useState({
    name: "",
    email: "",
    block: "Block A",
    status: "Active" as "Active" | "Inactive"
  })

  const navItems = [
    {
      href: "/dashboard/admin",
      label: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/students",
      label: "Students",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/rooms",
      label: "Rooms",
      icon: <Building className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/payments",
      label: "Payments",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/complaints",
      label: "Complaints",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/leave",
      label: "Leave Applications",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      active: true
    },
  ]

  // Mock data for admin users
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    { id: 1, name: "Admin User", email: "admin@university.edu", role: "Super Admin", status: "Active" },
    { id: 2, name: "Sanjay Kumar", email: "sanjay@university.edu", role: "Admin", status: "Active" },
    { id: 3, name: "Priya Sharma", email: "priya@university.edu", role: "Admin", status: "Inactive" },
  ])

  // Mock data for warden users
  const [wardenUsers, setWardenUsers] = useState<WardenUser[]>([
    { id: 1, name: "Dr. Rajesh Kumar", email: "rajesh@university.edu", block: "Block A", status: "Active" },
    { id: 2, name: "Dr. Priya Verma", email: "priya@university.edu", block: "Block B", status: "Active" },
    { id: 3, name: "Dr. Amit Patel", email: "amit@university.edu", block: "Block C", status: "Inactive" },
  ])

  // Pagination
  const itemsPerPage = 5
  const totalAdminPages = Math.ceil(adminUsers.length / itemsPerPage)
  const totalWardenPages = Math.ceil(wardenUsers.length / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (currentTab === "users" ? totalAdminPages : totalWardenPages)) {
      setCurrentPage(newPage)
    }
  }

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) {
      toast.error("Please fill all required fields")
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(newAdmin.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    const newAdminUser: AdminUser = {
      id: adminUsers.length + 1,
      ...newAdmin
    }

    setAdminUsers([...adminUsers, newAdminUser])
    setIsAddAdminOpen(false)
    setNewAdmin({
      name: "",
      email: "",
      role: "Admin",
      status: "Active"
    })
    toast.success("Admin user added successfully")
  }

  const handleAddWarden = () => {
    if (!newWarden.name || !newWarden.email) {
      toast.error("Please fill all required fields")
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(newWarden.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    const newWardenUser: WardenUser = {
      id: wardenUsers.length + 1,
      ...newWarden
    }

    setWardenUsers([...wardenUsers, newWardenUser])
    setIsAddWardenOpen(false)
    setNewWarden({
      name: "",
      email: "",
      block: "Block A",
      status: "Active"
    })
    toast.success("Warden user added successfully")
  }

  const handleDeleteUser = () => {
    if (!userToDelete) return

    if (userToDelete.type === 'admin') {
      setAdminUsers(adminUsers.filter(user => user.id !== userToDelete.id))
    } else {
      setWardenUsers(wardenUsers.filter(user => user.id !== userToDelete.id))
    }

    setIsDeleteDialogOpen(false)
    toast.success("User deleted successfully")
  }

  const toggleUserStatus = (id: number, type: 'admin' | 'warden') => {
    if (type === 'admin') {
      setAdminUsers(adminUsers.map(user => 
        user.id === id 
          ? {...user, status: user.status === "Active" ? "Inactive" : "Active"} 
          : user
      ))
    } else {
      setWardenUsers(wardenUsers.map(user => 
        user.id === id 
          ? {...user, status: user.status === "Active" ? "Inactive" : "Active"} 
          : user
      ))
    }
    toast.success("User status updated")
  }

  const saveSettings = () => {
    toast.success("Settings saved successfully")
  }

  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userRole="Hostel Administrator"
      userAvatar="AD"
      navItems={navItems}
    >
      <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">System Settings</h1>
          <p className="text-muted-foreground">Manage hostel system settings and configurations</p>
        </div>

        <Tabs 
          defaultValue="general" 
          className="w-full"
          value={currentTab}
          onValueChange={setCurrentTab}
        >
          <TabsList className="mb-6 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger 
              value="general" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
            >
              <Globe className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
            >
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
            >
              <Users className="h-4 w-4" />
              <span>User Management</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">General Settings</CardTitle>
                <CardDescription>Configure general hostel system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="hostel-name">Hostel Name</Label>
                    <Input 
                      id="hostel-name" 
                      defaultValue="University Hostel" 
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input 
                      id="admin-email" 
                      type="email" 
                      defaultValue="admin@university.edu" 
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-number">Contact Number</Label>
                    <Input 
                      id="contact-number" 
                      defaultValue="+91 12345 67890" 
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="academic-year">Current Academic Year</Label>
                    <Input 
                      id="academic-year" 
                      defaultValue="2023-2024" 
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Hostel Address</Label>
                  <Textarea 
                    id="address" 
                    rows={3} 
                    defaultValue="123 University Campus, Main Road, City - 123456" 
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select defaultValue="ist">
                      <SelectTrigger 
                        id="timezone" 
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      >
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <SelectItem value="ist">Indian Standard Time (IST)</SelectItem>
                        <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="inr">
                      <SelectTrigger 
                        id="currency" 
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      >
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                        <SelectItem value="usd">US Dollar ($)</SelectItem>
                        <SelectItem value="eur">Euro (€)</SelectItem>
                        <SelectItem value="gbp">British Pound (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <div>
                      <Label className="text-gray-900 dark:text-gray-100">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the system in maintenance mode</p>
                    </div>
                    <Switch 
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-gray-200 dark:border-gray-700">
                <Button 
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={saveSettings}
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Security Settings</CardTitle>
                <CardDescription>Configure security and access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Password Policy</h3>
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Minimum Password Length</Label>
                        <p className="text-sm text-muted-foreground">Set minimum length for user passwords</p>
                      </div>
                      <Input 
                        type="number" 
                        className="w-20 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" 
                        value={passwordLength}
                        onChange={(e) => setPasswordLength(Number(e.target.value))}
                        min="6" 
                        max="16" 
                      />
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-600" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Require Special Characters</Label>
                        <p className="text-sm text-muted-foreground">Require at least one special character</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-600" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Require Numbers</Label>
                        <p className="text-sm text-muted-foreground">Require at least one number</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-600" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Password Expiry</Label>
                        <p className="text-sm text-muted-foreground">Days before password expires</p>
                      </div>
                      <Input 
                        type="number" 
                        className="w-20 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" 
                        defaultValue="90" 
                        min="30" 
                        max="180" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Two-Factor Authentication</h3>
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Enable for Admins</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-600" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Enable for Wardens</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for all warden accounts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-600" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Enable for Students</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for all student accounts</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Session Settings</h3>
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">Minutes of inactivity before session expires</p>
                      </div>
                      <Input 
                        type="number" 
                        className="w-20 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" 
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(Number(e.target.value))}
                        min="5" 
                        max="120" 
                      />
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-600" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Remember Me Duration</Label>
                        <p className="text-sm text-muted-foreground">Days to remember login (if selected)</p>
                      </div>
                      <Input 
                        type="number" 
                        className="w-20 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" 
                        defaultValue="14" 
                        min="1" 
                        max="30" 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-gray-200 dark:border-gray-700">
                <Button 
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={saveSettings}
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Notification Settings</CardTitle>
                <CardDescription>Configure system notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Email Notifications</h3>
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">New Student Registration</Label>
                        <p className="text-sm text-muted-foreground">Send email when a new student is registered</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-600" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Payment Confirmation</Label>
                        <p className="text-sm text-muted-foreground">Send email when a payment is received</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-600" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Leave Application Status</Label>
                        <p className="text-sm text-muted-foreground">Send email when leave status changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-600" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Complaint Status</Label>
                        <p className="text-sm text-muted-foreground">Send email when complaint status changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">SMS Notifications</h3>
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Emergency Alerts</Label>
                        <p className="text-sm text-muted-foreground">Send SMS for emergency situations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-600" />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-900 dark:text-gray-100">Payment Reminders</Label>
                        <p className="text-sm text-muted-foreground">Send SMS reminders for due payments</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Email Configuration</h3>
                  <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-server">SMTP Server</Label>
                        <Input 
                          id="smtp-server" 
                          defaultValue="smtp.university.edu" 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtp-port">SMTP Port</Label>
                        <Input 
                          id="smtp-port" 
                          defaultValue="587" 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-username">SMTP Username</Label>
                        <Input 
                          id="smtp-username" 
                          defaultValue="hostel@university.edu" 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtp-password">SMTP Password</Label>
                        <Input 
                          id="smtp-password" 
                          type="password" 
                          defaultValue="********" 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="from-email">From Email</Label>
                      <Input 
                        id="from-email" 
                        defaultValue="hostel@university.edu" 
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-gray-200 dark:border-gray-700">
                <Button 
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={saveSettings}
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">User Management</CardTitle>
                <CardDescription>Manage system users and roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Admin Users</h3>
                    <Button 
                      size="sm" 
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() => setIsAddAdminOpen(true)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Admin</span>
                    </Button>
                  </div>
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table>
                      <TableHeader className="bg-gray-50 dark:bg-gray-700">
                        <TableRow>
                          <TableHead className="text-gray-900 dark:text-gray-100">Name</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Email</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Role</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                          <TableHead className="text-right text-gray-900 dark:text-gray-100">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {adminUsers.map((user) => (
                          <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{user.name}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{user.email}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{user.role}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={user.status === "Active" ? "default" : "secondary"}
                                className={user.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"}
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                  <DropdownMenuLabel className="text-gray-900 dark:text-gray-100">Actions</DropdownMenuLabel>
                                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Eye className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                    <span className="text-gray-700 dark:text-gray-300">View</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Edit2 className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                    <span className="text-gray-700 dark:text-gray-300">Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => toggleUserStatus(user.id, 'admin')}
                                  >
                                    {user.status === "Active" ? (
                                      <>
                                        <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-gray-700 dark:text-gray-300">Deactivate</span>
                                      </>
                                    ) : (
                                      <>
                                        <Check className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-gray-700 dark:text-gray-300">Activate</span>
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                                  <DropdownMenuItem 
                                    className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    onClick={() => {
                                      setUserToDelete({id: user.id, type: 'admin'})
                                      setIsDeleteDialogOpen(true)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {adminUsers.length} of {adminUsers.length} admin users
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={currentPage <= 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={currentPage >= totalAdminPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Warden Users</h3>
                    <Button 
                      size="sm" 
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() => setIsAddWardenOpen(true)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Warden</span>
                    </Button>
                  </div>
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table>
                      <TableHeader className="bg-gray-50 dark:bg-gray-700">
                        <TableRow>
                          <TableHead className="text-gray-900 dark:text-gray-100">Name</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Email</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Block</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                          <TableHead className="text-right text-gray-900 dark:text-gray-100">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {wardenUsers.map((user) => (
                          <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{user.name}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{user.email}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{user.block}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={user.status === "Active" ? "default" : "secondary"}
                                className={user.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"}
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                  <DropdownMenuLabel className="text-gray-900 dark:text-gray-100">Actions</DropdownMenuLabel>
                                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Eye className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                    <span className="text-gray-700 dark:text-gray-300">View</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Edit2 className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                    <span className="text-gray-700 dark:text-gray-300">Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => toggleUserStatus(user.id, 'warden')}
                                  >
                                    {user.status === "Active" ? (
                                      <>
                                        <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-gray-700 dark:text-gray-300">Deactivate</span>
                                      </>
                                    ) : (
                                      <>
                                        <Check className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        <span className="text-gray-700 dark:text-gray-300">Activate</span>
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                                  <DropdownMenuItem 
                                    className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    onClick={() => {
                                      setUserToDelete({id: user.id, type: 'warden'})
                                      setIsDeleteDialogOpen(true)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {wardenUsers.length} of {wardenUsers.length} warden users
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={currentPage <= 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={currentPage >= totalWardenPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Role Permissions</h3>
                  <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">Configure what each role can access and modify in the system</p>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      Manage Role Permissions
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-gray-200 dark:border-gray-700">
                <Button 
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={saveSettings}
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Admin Dialog */}
      <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Add New Admin</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new admin user
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="admin-name" className="text-gray-900 dark:text-gray-100">Full Name</Label>
              <Input 
                id="admin-name" 
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-gray-900 dark:text-gray-100">Email</Label>
              <Input 
                id="admin-email" 
                type="email" 
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-role" className="text-gray-900 dark:text-gray-100">Role</Label>
              <Select
                value={newAdmin.role}
                onValueChange={(value) => setNewAdmin({...newAdmin, role: value as "Admin" | "Super Admin"})}
              >
                <SelectTrigger 
                  id="admin-role" 
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-status" className="text-gray-900 dark:text-gray-100">Status</Label>
              <Select
                value={newAdmin.status}
                onValueChange={(value) => setNewAdmin({...newAdmin, status: value as "Active" | "Inactive"})}
              >
                <SelectTrigger 
                  id="admin-status" 
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddAdminOpen(false)}
              className="border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddAdmin}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Add Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Warden Dialog */}
      <Dialog open={isAddWardenOpen} onOpenChange={setIsAddWardenOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Add New Warden</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new warden user
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="warden-name" className="text-gray-900 dark:text-gray-100">Full Name</Label>
              <Input 
                id="warden-name" 
                value={newWarden.name}
                onChange={(e) => setNewWarden({...newWarden, name: e.target.value})}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="warden-email" className="text-gray-900 dark:text-gray-100">Email</Label>
              <Input 
                id="warden-email" 
                type="email" 
                value={newWarden.email}
                onChange={(e) => setNewWarden({...newWarden, email: e.target.value})}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="warden-block" className="text-gray-900 dark:text-gray-100">Block</Label>
              <Select
                value={newWarden.block}
                onValueChange={(value) => setNewWarden({...newWarden, block: value})}
              >
                <SelectTrigger 
                  id="warden-block" 
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  <SelectValue placeholder="Select block" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="Block A">Block A</SelectItem>
                  <SelectItem value="Block B">Block B</SelectItem>
                  <SelectItem value="Block C">Block C</SelectItem>
                  <SelectItem value="Block D">Block D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="warden-status" className="text-gray-900 dark:text-gray-100">Status</Label>
              <Select
                value={newWarden.status}
                onValueChange={(value) => setNewWarden({...newWarden, status: value as "Active" | "Inactive"})}
              >
                <SelectTrigger 
                  id="warden-status" 
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddWardenOpen(false)}
              className="border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddWarden}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Add Warden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the user from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}