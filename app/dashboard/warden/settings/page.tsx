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
  MessageSquare,
  FileText,
  Settings,
  Building,
  Users,
  Bell,
  Lock,
  Save,
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit2,
  Eye,
  MoreHorizontal,
  Check,
  X,
  Calendar,
  ClipboardList
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

type AssistantWarden = {
  id: number
  name: string
  email: string
  block: string
  status: "Active" | "Inactive"
}

type Student = {
  id: number
  name: string
  roomNumber: string
  status: "Present" | "Absent" | "On Leave"
}

export default function WardenSettingsPage() {
  const [currentTab, setCurrentTab] = useState("general")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddAssistantOpen, setIsAddAssistantOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<{id: number, type: 'assistant'}>()

  // Form states
  const [newAssistant, setNewAssistant] = useState({
    name: "",
    email: "",
    block: "Block A",
    status: "Active" as "Active" | "Inactive"
  })

  const navItems = [
    {
      href: "/dashboard/warden",
      label: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/warden/students",
      label: "Students",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/warden/rooms",
      label: "Rooms",
      icon: <Building className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/warden/complaints",
      label: "Complaints",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/warden/leave",
      label: "Leave Applications",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/warden/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      active: true
    },
  ]

  // Mock data for assistant wardens
  const [assistantWardens, setAssistantWardens] = useState<AssistantWarden[]>([
    { id: 1, name: "Dr. Sanjay Verma", email: "sanjay@university.edu", block: "Block A", status: "Active" },
    { id: 2, name: "Dr. Neha Sharma", email: "neha@university.edu", block: "Block B", status: "Active" },
    { id: 3, name: "Dr. Amit Patel", email: "amit@university.edu", block: "Block C", status: "Inactive" },
  ])

  // Mock data for students under warden's block
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Rahul Kumar", roomNumber: "A-105", status: "Present" },
    { id: 2, name: "Priya Sharma", roomNumber: "A-203", status: "On Leave" },
    { id: 3, name: "Amit Singh", roomNumber: "B-101", status: "Present" },
    { id: 4, name: "Neha Gupta", roomNumber: "B-205", status: "Absent" },
    { id: 5, name: "Rohan Mehta", roomNumber: "C-102", status: "Present" },
  ])

  // Pagination
  const itemsPerPage = 5
  const totalAssistantPages = Math.ceil(assistantWardens.length / itemsPerPage)
  const totalStudentPages = Math.ceil(students.length / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (currentTab === "assistants" ? totalAssistantPages : totalStudentPages)) {
      setCurrentPage(newPage)
    }
  }

  const handleAddAssistant = () => {
    if (!newAssistant.name || !newAssistant.email) {
      toast.error("Please fill all required fields")
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(newAssistant.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    const newAssistantWarden: AssistantWarden = {
      id: assistantWardens.length + 1,
      ...newAssistant
    }

    setAssistantWardens([...assistantWardens, newAssistantWarden])
    setIsAddAssistantOpen(false)
    setNewAssistant({
      name: "",
      email: "",
      block: "Block A",
      status: "Active"
    })
    toast.success("Assistant warden added successfully")
  }

  const handleDeleteUser = () => {
    if (!userToDelete) return

    setAssistantWardens(assistantWardens.filter(user => user.id !== userToDelete.id))
    setIsDeleteDialogOpen(false)
    toast.success("Assistant warden deleted successfully")
  }

  const toggleUserStatus = (id: number) => {
    setAssistantWardens(assistantWardens.map(user => 
      user.id === id 
        ? {...user, status: user.status === "Active" ? "Inactive" : "Active"} 
        : user
    ))
    toast.success("Assistant warden status updated")
  }

  const updateStudentStatus = (id: number, status: "Present" | "Absent" | "On Leave") => {
    setStudents(students.map(student => 
      student.id === id ? {...student, status} : student
    ))
    toast.success("Student status updated")
  }

  const saveSettings = () => {
    toast.success("Settings saved successfully")
  }

  return (
    <DashboardLayout
      userType="warden"
      userName="Dr. Rajesh Kumar"
      userRole="Hostel Warden"
      userAvatar="RK"
      navItems={navItems}
    >
      <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Warden Settings</h1>
          <p className="text-muted-foreground">Manage your hostel block settings and configurations</p>
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
              <Settings className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger 
              value="assistants" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
            >
              <User className="h-4 w-4" />
              <span>Assistant Wardens</span>
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
            >
              <Users className="h-4 w-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger 
              value="rules" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
            >
              <ClipboardList className="h-4 w-4" />
              <span>Hostel Rules</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Block Settings</CardTitle>
                <CardDescription>Configure settings for your hostel block</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="block-name">Block Name</Label>
                    <Input 
                      id="block-name" 
                      defaultValue="Block A" 
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="warden-email">Warden Email</Label>
                    <Input 
                      id="warden-email" 
                      type="email" 
                      defaultValue="rajesh@university.edu" 
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-number">Contact Number</Label>
                    <Input 
                      id="contact-number" 
                      defaultValue="+91 98765 43210" 
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Total Capacity</Label>
                    <Input 
                      id="capacity" 
                      defaultValue="200" 
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notice">Current Notice</Label>
                  <Textarea 
                    id="notice" 
                    rows={3} 
                    placeholder="Enter notice for students in your block..."
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visiting-hours">Visiting Hours</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input 
                        id="start-time" 
                        type="time" 
                        defaultValue="16:00" 
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Input 
                        id="end-time" 
                        type="time" 
                        defaultValue="19:00" 
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
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

          <TabsContent value="assistants">
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Assistant Wardens</CardTitle>
                <CardDescription>Manage assistant wardens for your hostel block</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Assistant Wardens List</h3>
                    <Button 
                      size="sm" 
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() => setIsAddAssistantOpen(true)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Assistant</span>
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
                        {assistantWardens.map((user) => (
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
                                    onClick={() => toggleUserStatus(user.id)}
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
                                      setUserToDelete({id: user.id, type: 'assistant'})
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
                      Showing {assistantWardens.length} of {assistantWardens.length} assistant wardens
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
                        disabled={currentPage >= totalAssistantPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
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

          <TabsContent value="students">
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Student Management</CardTitle>
                <CardDescription>Manage students in your hostel block</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table>
                      <TableHeader className="bg-gray-50 dark:bg-gray-700">
                        <TableRow>
                          <TableHead className="text-gray-900 dark:text-gray-100">Name</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Room Number</TableHead>
                          <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                          <TableHead className="text-right text-gray-900 dark:text-gray-100">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{student.name}</TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">{student.roomNumber}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  student.status === "Present" ? "default" : 
                                  student.status === "On Leave" ? "secondary" : "destructive"
                                }
                                className={
                                  student.status === "Present" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                                  student.status === "On Leave" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                                  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                }
                              >
                                {student.status}
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
                                  <DropdownMenuLabel className="text-gray-900 dark:text-gray-100">Update Status</DropdownMenuLabel>
                                  <DropdownMenuItem 
                                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => updateStudentStatus(student.id, "Present")}
                                  >
                                    <Check className="h-4 w-4 text-green-600 dark:text-green-300" />
                                    <span className="text-gray-700 dark:text-gray-300">Mark Present</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => updateStudentStatus(student.id, "Absent")}
                                  >
                                    <X className="h-4 w-4 text-red-600 dark:text-red-300" />
                                    <span className="text-gray-700 dark:text-gray-300">Mark Absent</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => updateStudentStatus(student.id, "On Leave")}
                                  >
                                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                                    <span className="text-gray-700 dark:text-gray-300">Mark On Leave</span>
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
                      Showing {students.length} of {students.length} students
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
                        disabled={currentPage >= totalStudentPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Hostel Rules</CardTitle>
                <CardDescription>Manage rules and regulations for your hostel block</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-rules">Current Rules</Label>
                    <Textarea 
                      id="current-rules" 
                      rows={8} 
                      defaultValue={`1. Curfew time is 10:00 PM for all students.
2. Visitors are allowed only during visiting hours (4:00 PM - 7:00 PM).
3. Students must maintain cleanliness in their rooms and common areas.
4. Any damage to hostel property will be charged to the student.
5. Smoking and alcohol are strictly prohibited in the hostel premises.
6. Students must inform the warden before going on leave.
7. Quiet hours are from 11:00 PM to 6:00 AM.`}
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
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
                  <span>Update Rules</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Assistant Warden Dialog */}
      <Dialog open={isAddAssistantOpen} onOpenChange={setIsAddAssistantOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Add New Assistant Warden</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new assistant warden
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="assistant-name" className="text-gray-900 dark:text-gray-100">Full Name</Label>
              <Input 
                id="assistant-name" 
                value={newAssistant.name}
                onChange={(e) => setNewAssistant({...newAssistant, name: e.target.value})}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assistant-email" className="text-gray-900 dark:text-gray-100">Email</Label>
              <Input 
                id="assistant-email" 
                type="email" 
                value={newAssistant.email}
                onChange={(e) => setNewAssistant({...newAssistant, email: e.target.value})}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assistant-block" className="text-gray-900 dark:text-gray-100">Block</Label>
              <Select
                value={newAssistant.block}
                onValueChange={(value) => setNewAssistant({...newAssistant, block: value})}
              >
                <SelectTrigger 
                  id="assistant-block" 
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  <SelectValue placeholder="Select block" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="Block A">Block A</SelectItem>
                  <SelectItem value="Block B">Block B</SelectItem>
                  <SelectItem value="Block C">Block C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assistant-status" className="text-gray-900 dark:text-gray-100">Status</Label>
              <Select
                value={newAssistant.status}
                onValueChange={(value) => setNewAssistant({...newAssistant, status: value as "Active" | "Inactive"})}
              >
                <SelectTrigger 
                  id="assistant-status" 
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
              onClick={() => setIsAddAssistantOpen(false)}
              className="border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddAssistant}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Add Assistant
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
              This action cannot be undone. This will permanently delete the assistant warden from your block.
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
              Delete Assistant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}