"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  FileEdit,
  CheckCircle,
  Building,
  Home,
  Users,
  CreditCard,
  MessageSquare,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

export default function AdminComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [comment, setComment] = useState("")

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
      active: true
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
    },
  ]

  // Mock data for complaints
  const complaints = [
    {
      id: "C-2023-001",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Plumbing",
      issue: "Sink leaking in common bathroom",
      description:
        "The sink in the common bathroom is leaking. Water is accumulating on the floor creating a slippery surface.",
      date: "2023-04-02",
      status: "In Progress",
      priority: "Medium",
      assignedTo: "Maintenance Staff",
      comments: [
        { user: "Admin", text: "Maintenance team has been notified", date: "2023-04-02" },
        { user: "Maintenance", text: "Will check today", date: "2023-04-03" },
      ],
    },
    {
      id: "C-2023-002",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Wi-Fi",
      issue: "Poor connectivity in room",
      description:
        "Unable to connect to the hostel Wi-Fi network from Room 203. The signal is weak and keeps disconnecting.",
      date: "2023-03-15",
      status: "Resolved",
      priority: "High",
      assignedTo: "IT Support",
      comments: [
        { user: "Admin", text: "IT team will check the router", date: "2023-03-16" },
        { user: "IT Support", text: "Router has been replaced", date: "2023-03-18" },
        { user: "Admin", text: "Issue resolved", date: "2023-03-20" },
      ],
    },
    {
      id: "C-2023-003",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Electrical",
      issue: "Power socket not working",
      description:
        "The power socket near my bed is not working. I've tried plugging in different devices but none work.",
      date: "2023-03-10",
      status: "Pending",
      priority: "Low",
      assignedTo: "Pending Assignment",
      comments: [],
    },
    {
      id: "C-2023-004",
      studentId: "STU002",
      studentName: "Priya Sharma",
      room: "105, Block A",
      type: "Furniture",
      issue: "Broken chair",
      description: "One of the chairs in my room is broken. The leg is loose and it's unsafe to sit on.",
      date: "2023-04-05",
      status: "Pending",
      priority: "Medium",
      assignedTo: "Pending Assignment",
      comments: [],
    },
    {
      id: "C-2023-005",
      studentId: "STU003",
      studentName: "Rahul Singh",
      room: "203, Block A",
      type: "Cleaning",
      issue: "Bathroom needs cleaning",
      description:
        "The shared bathroom on our floor hasn't been cleaned properly. There's mold growing in the corners.",
      date: "2023-04-10",
      status: "In Progress",
      priority: "High",
      assignedTo: "Cleaning Staff",
      comments: [{ user: "Admin", text: "Cleaning staff has been notified", date: "2023-04-10" }],
    },
    {
      id: "C-2023-006",
      studentId: "STU004",
      studentName: "Ananya Patel",
      room: "304, Block B",
      type: "Security",
      issue: "Broken door lock",
      description: "The lock on my room door is broken. I can't lock my room when I leave.",
      date: "2023-04-12",
      status: "Pending",
      priority: "High",
      assignedTo: "Pending Assignment",
      comments: [],
    },
  ]

  // Filter complaints based on search term and filters
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = 
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === "all" || complaint.type.toLowerCase().includes(typeFilter.toLowerCase())
    const matchesPriority = priorityFilter === "all" || complaint.priority.toLowerCase() === priorityFilter.toLowerCase()
    
    return matchesSearch && matchesType && matchesPriority
  })

  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage)
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Complaint statistics
  const totalComplaints = complaints.length
  const pendingComplaints = complaints.filter((complaint) => complaint.status === "Pending").length
  const inProgressComplaints = complaints.filter((complaint) => complaint.status === "In Progress").length
  const resolvedComplaints = complaints.filter((complaint) => complaint.status === "Resolved").length
  const highPriorityComplaints = complaints.filter((complaint) => complaint.priority === "High").length

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleAddComment = (complaintId: string) => {
    // In a real app, you would update the complaint with the new comment
    console.log(`Adding comment to complaint ${complaintId}:`, comment)
    setComment("")
  }

  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userRole="Hostel Administrator"
      userAvatar="AD"
      navItems={navItems}
    >
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Complaint Management</h1>
            <p className="text-muted-foreground">View and manage all student complaints and maintenance requests</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Complaints</p>
                  <h3 className="text-2xl font-bold mt-1">{totalComplaints}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <h3 className="text-2xl font-bold mt-1">{pendingComplaints}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <h3 className="text-2xl font-bold mt-1">{inProgressComplaints}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Being addressed</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <h3 className="text-2xl font-bold mt-1">{resolvedComplaints}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Completed</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                  <h3 className="text-2xl font-bold mt-1">{highPriorityComplaints}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Urgent issues</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Complaints</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search complaints..."
                  className="pl-9 w-full"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    <span className="hidden sm:inline">Filters</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2 space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="type-filter">Complaint Type</Label>
                      <Select
                        value={typeFilter}
                        onValueChange={(value) => {
                          setTypeFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="type-filter" className="h-8">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="wifi">Wi-Fi</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="cleaning">Cleaning</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="priority-filter">Priority</Label>
                      <Select
                        value={priorityFilter}
                        onValueChange={(value) => {
                          setPriorityFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="priority-filter" className="h-8">
                          <SelectValue placeholder="All Priorities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Download size={16} />
              </Button>
            </div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>All Complaints</CardTitle>
                    <CardDescription>
                      Showing {filteredComplaints.length} complaint records
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={currentPage <= 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={currentPage >= totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedComplaints.length > 0 ? (
                        paginatedComplaints.map((complaint) => (
                          <TableRow key={complaint.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{complaint.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{complaint.studentName}</div>
                              <div className="text-xs text-muted-foreground">{complaint.room}</div>
                            </TableCell>
                            <TableCell>{complaint.type}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{complaint.issue}</TableCell>
                            <TableCell>
                              {format(new Date(complaint.date), "dd MMM yyyy")}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={complaint.priority === "High" ? "destructive" : 
                                        complaint.priority === "Medium" ? "outline" : "default"}
                              >
                                {complaint.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={complaint.status === "Resolved" ? "default" : 
                                        complaint.status === "In Progress" ? "secondary" : "destructive"}
                              >
                                {complaint.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Eye className="h-4 w-4" />
                                    <span>View Details</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <FileEdit className="h-4 w-4" />
                                    <span>Update Status</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>Add Comment</span>
                                  </DropdownMenuItem>
                                  {complaint.status !== "Resolved" && (
                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                      <CheckCircle className="h-4 w-4" />
                                      <span>Mark as Resolved</span>
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No complaints found matching your criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pending Complaints</CardTitle>
                <CardDescription>
                  {pendingComplaints} complaints awaiting assignment or resolution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints
                    .filter((complaint) => complaint.status === "Pending")
                    .map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{complaint.issue}</h3>
                              <Badge
                                variant={complaint.priority === "High" ? "destructive" : 
                                        complaint.priority === "Medium" ? "outline" : "default"}
                              >
                                {complaint.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {complaint.id} • {complaint.type} • Reported on {format(new Date(complaint.date), "dd MMM yyyy")}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="text-sm">
                              <span className="font-medium">Student:</span> {complaint.studentName} ({complaint.room})
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mb-4">{complaint.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <FileEdit className="h-4 w-4" />
                                <span>Assign</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Assign Complaint</DialogTitle>
                                <DialogDescription>
                                  Assign this complaint to staff and update its status
                                </DialogDescription>
                              </DialogHeader>
                              <Separator />
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="assign-to">Assign To</Label>
                                  <Select>
                                    <SelectTrigger id="assign-to">
                                      <SelectValue placeholder="Select staff" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="maintenance">Maintenance Staff</SelectItem>
                                      <SelectItem value="it">IT Support</SelectItem>
                                      <SelectItem value="cleaning">Cleaning Staff</SelectItem>
                                      <SelectItem value="security">Security Staff</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="priority">Priority</Label>
                                  <Select defaultValue={complaint.priority.toLowerCase()}>
                                    <SelectTrigger id="priority">
                                      <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="status">Status</Label>
                                  <Select defaultValue="in-progress">
                                    <SelectTrigger id="status">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="in-progress">In Progress</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="comment">Comment</Label>
                                  <Textarea 
                                    id="comment" 
                                    placeholder="Add a comment about this assignment" 
                                    rows={3}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  />
                                </div>
                              </div>
                              <Separator />
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button onClick={() => handleAddComment(complaint.id)}>Assign & Update</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in-progress">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>In Progress Complaints</CardTitle>
                <CardDescription>
                  {inProgressComplaints} complaints currently being addressed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints
                    .filter((complaint) => complaint.status === "In Progress")
                    .map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{complaint.issue}</h3>
                              <Badge
                                variant={complaint.priority === "High" ? "destructive" : 
                                        complaint.priority === "Medium" ? "outline" : "default"}
                              >
                                {complaint.priority}
                              </Badge>
                              <Badge variant="secondary">In Progress</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {complaint.id} • {complaint.type} • Reported on {format(new Date(complaint.date), "dd MMM yyyy")}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="text-sm">
                              <span className="font-medium">Assigned to:</span> {complaint.assignedTo}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mb-4">{complaint.description}</p>

                        {complaint.comments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Comments:</p>
                            <div className="space-y-2 pl-4 border-l-2">
                              {complaint.comments.map((comment, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{comment.user}:</span>
                                    <span className="text-xs text-muted-foreground">
                                      {format(new Date(comment.date), "dd MMM yyyy")}
                                    </span>
                                  </div>
                                  <p>{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                <span>Add Comment</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Add Comment</DialogTitle>
                                <DialogDescription>
                                  Add a comment to update the status of this complaint
                                </DialogDescription>
                              </DialogHeader>
                              <Separator />
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="comment">Comment</Label>
                                  <Textarea 
                                    id="comment" 
                                    placeholder="Add your comment here" 
                                    rows={4}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  />
                                </div>
                              </div>
                              <Separator />
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button onClick={() => handleAddComment(complaint.id)}>Add Comment</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Resolved Complaints</CardTitle>
                <CardDescription>
                  {resolvedComplaints} complaints that have been resolved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complaints
                    .filter((complaint) => complaint.status === "Resolved")
                    .map((complaint) => (
                      <div key={complaint.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{complaint.issue}</h3>
                              <Badge variant="default">Resolved</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {complaint.id} • {complaint.type} • Reported on {format(new Date(complaint.date), "dd MMM yyyy")}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <p className="text-sm">
                              <span className="font-medium">Resolved by:</span> {complaint.assignedTo}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mb-4">{complaint.description}</p>

                        {complaint.comments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Resolution History:</p>
                            <div className="space-y-2 pl-4 border-l-2">
                              {complaint.comments.map((comment, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{comment.user}:</span>
                                    <span className="text-xs text-muted-foreground">
                                      {format(new Date(comment.date), "dd MMM yyyy")}
                                    </span>
                                  </div>
                                  <p>{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>View Full Details</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}