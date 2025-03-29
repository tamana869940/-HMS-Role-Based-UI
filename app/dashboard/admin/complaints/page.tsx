"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { adminNavItems } from "@/components/admin/admin-nav-items"
import { useIsMobile } from "@/hooks/use-mobile"
import { toast } from "sonner"
import { 
  MessageSquare, 
  Download, 
  Eye, 
  FileEdit, 
  Plus, 
  Search, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle,
  MoreHorizontal
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

type Complaint = {
  id: string
  studentId: string
  studentName: string
  room: string
  type: string
  issue: string
  description: string
  date: string
  status: "Pending" | "In Progress" | "Resolved"
  priority: "High" | "Medium" | "Low"
  assignedTo: string
  comments: {
    user: string
    text: string
    date: string
  }[]
}

export default function AdminComplaintsPage() {
  const isMobile = useIsMobile("(max-width: 640px)")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [comment, setComment] = useState("")
  const [viewingComplaint, setViewingComplaint] = useState<Complaint | null>(null)
  const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null)

  // Mock data for complaints
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: "C-2023-001",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Plumbing",
      issue: "Sink leaking in common bathroom",
      description: "The sink in the common bathroom is leaking. Water is accumulating on the floor creating a slippery surface.",
      date: "2023-04-02",
      status: "In Progress",
      priority: "Medium",
      assignedTo: "Maintenance Staff",
      comments: [
        { user: "Admin", text: "Maintenance team has been notified", date: "2023-04-02" },
        { user: "Maintenance", text: "Will check today", date: "2023-04-03" },
      ],
    },
    // ... (other complaint objects from your original code)
  ])

  // Filter complaints based on search and filters
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
    if (!comment.trim()) {
      toast.error("Please enter a comment")
      return
    }

    const updatedComplaints = complaints.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          comments: [
            ...c.comments,
            {
              user: "Admin",
              text: comment,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        }
      }
      return c
    })

    setComplaints(updatedComplaints)
    setComment("")
    toast.success("Comment added successfully")
  }

  const handleUpdateStatus = (complaintId: string, newStatus: Complaint['status']) => {
    const updatedComplaints = complaints.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: newStatus as Complaint['status']
        }
      }
      return c
    })

    setComplaints(updatedComplaints)
    toast.success(`Complaint marked as ${newStatus}`)
  }

  const handleAssignComplaint = (complaintId: string, assignedTo: string) => {
    const updatedComplaints = complaints.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          assignedTo,
          status: "In Progress" as Complaint['status']
        }
      }
      return c
    })

    setComplaints(updatedComplaints)
    toast.success(`Complaint assigned to ${assignedTo}`)
  }

  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userRole="Hostel Administrator"
      userAvatar="AD"
      navItems={adminNavItems}
    >
      <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Complaint Management</h1>
            <p className="text-muted-foreground text-sm">View and manage all student complaints and maintenance requests</p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <StatCard
            title="Total Complaints"
            value={totalComplaints}
            icon={<MessageSquare className="h-5 w-5" />}
            color="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
            border="border-indigo-200 dark:border-indigo-800"
            hover="hover:border-indigo-300 dark:hover:border-indigo-600"
          />
          <StatCard
            title="Pending"
            value={pendingComplaints}
            icon={<MessageSquare className="h-5 w-5" />}
            color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300"
            border="border-amber-200 dark:border-amber-800"
            hover="hover:border-amber-300 dark:hover:border-amber-600"
          />
          <StatCard
            title="In Progress"
            value={inProgressComplaints}
            icon={<MessageSquare className="h-5 w-5" />}
            color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
            border="border-blue-200 dark:border-blue-800"
            hover="hover:border-blue-300 dark:hover:border-blue-600"
          />
          <StatCard
            title="Resolved"
            value={resolvedComplaints}
            icon={<CheckCircle className="h-5 w-5" />}
            color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
            border="border-emerald-200 dark:border-emerald-800"
            hover="hover:border-emerald-300 dark:hover:border-emerald-600"
          />
          <StatCard
            title="High Priority"
            value={highPriorityComplaints}
            icon={<MessageSquare className="h-5 w-5" />}
            color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300"
            border="border-red-200 dark:border-red-800"
            hover="hover:border-red-300 dark:hover:border-red-600"
            className="hidden xl:block"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
            <TabsList className="grid w-full md:w-auto grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            
            <div className="w-full md:w-auto flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search complaints..."
                  className="pl-9 text-sm h-9 sm:h-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-9 sm:h-10">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Filters</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2 space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="type-filter" className="text-xs">Complaint Type</Label>
                      <Select
                        value={typeFilter}
                        onValueChange={(value) => {
                          setTypeFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="type-filter" className="h-8 text-xs">
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
                      <Label htmlFor="priority-filter" className="text-xs">Priority</Label>
                      <Select
                        value={priorityFilter}
                        onValueChange={(value) => {
                          setPriorityFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="priority-filter" className="h-8 text-xs">
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
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 h-9 sm:h-10">
                <Download size={16} />
                <span>Export</span>
              </Button>
            </div>
          </div>

          {/* All Complaints Tab */}
          <TabsContent value="all" className="space-y-6">
            <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
              <CardHeader className="p-4 sm:p-6 pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">All Complaints</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Showing {filteredComplaints.length} of {complaints.length} complaints
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={currentPage <= 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={currentPage >= totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {/* Complaint Table */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Complaint ID</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Student</th>
                          {!isMobile && (
                            <>
                              <th className="text-left p-3 font-medium text-xs sm:text-sm">Type</th>
                              <th className="text-left p-3 font-medium text-xs sm:text-sm">Issue</th>
                            </>
                          )}
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Date</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Priority</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Status</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {paginatedComplaints.length > 0 ? (
                          paginatedComplaints.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-3 text-sm">{complaint.id}</td>
                              <td className="p-3 text-sm">
                                <div className="font-medium">{complaint.studentName}</div>
                                <div className="text-xs text-muted-foreground">{complaint.room}</div>
                              </td>
                              {!isMobile && (
                                <>
                                  <td className="p-3 text-sm">{complaint.type}</td>
                                  <td className="p-3 text-sm max-w-[200px] truncate">{complaint.issue}</td>
                                </>
                              )}
                              <td className="p-3 text-sm">
                                {format(new Date(complaint.date), "dd MMM yyyy")}
                              </td>
                              <td className="p-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    complaint.priority === "High"
                                      ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 text-xs"
                                      : complaint.priority === "Medium"
                                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                        : "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 text-xs"
                                  }
                                >
                                  {complaint.priority}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    complaint.status === "Resolved"
                                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                      : complaint.status === "In Progress"
                                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 text-xs"
                                        : "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                  }
                                >
                                  {complaint.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  {/* View Button */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-200 dark:hover:bg-slate-700"
                                        onClick={() => setViewingComplaint(complaint)}
                                      >
                                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="sr-only">View</span>
                                      </Button>
                                    </DialogTrigger>
                                    {viewingComplaint && (
                                      <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                          <DialogTitle>Complaint Details</DialogTitle>
                                          <DialogDescription>
                                            Complete information about {viewingComplaint.id}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="flex items-center gap-4">
                                            <div className="bg-slate-100 dark:bg-slate-700 h-14 w-14 sm:h-16 sm:w-16 rounded-lg flex items-center justify-center">
                                              <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-slate-600 dark:text-slate-300" />
                                            </div>
                                            <div>
                                              <h3 className="text-lg sm:text-xl font-bold">{viewingComplaint.id}</h3>
                                              <Badge className="mt-1 text-xs sm:text-sm">
                                                {viewingComplaint.type}
                                              </Badge>
                                            </div>
                                          </div>
                                          
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                              <Label className="text-sm">Student Name</Label>
                                              <p className="font-medium text-sm">{viewingComplaint.studentName}</p>
                                            </div>
                                            <div className="space-y-1">
                                              <Label className="text-sm">Room</Label>
                                              <p className="font-medium text-sm">{viewingComplaint.room}</p>
                                            </div>
                                          </div>
                                          
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                              <Label className="text-sm">Date Reported</Label>
                                              <p className="font-medium text-sm">
                                                {format(new Date(viewingComplaint.date), "dd MMM yyyy")}
                                              </p>
                                            </div>
                                            <div className="space-y-1">
                                              <Label className="text-sm">Status</Label>
                                              <Badge
                                                variant="outline"
                                                className={
                                                  viewingComplaint.status === "Resolved"
                                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                                    : viewingComplaint.status === "In Progress"
                                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs"
                                                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                                }
                                              >
                                                {viewingComplaint.status}
                                              </Badge>
                                            </div>
                                          </div>
                                          
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                              <Label className="text-sm">Priority</Label>
                                              <Badge
                                                variant="outline"
                                                className={
                                                  viewingComplaint.priority === "High"
                                                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs"
                                                    : viewingComplaint.priority === "Medium"
                                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs"
                                                }
                                              >
                                                {viewingComplaint.priority}
                                              </Badge>
                                            </div>
                                            <div className="space-y-1">
                                              <Label className="text-sm">Assigned To</Label>
                                              <p className="font-medium text-sm">
                                                {viewingComplaint.assignedTo || "Not assigned"}
                                              </p>
                                            </div>
                                          </div>
                                          
                                          <div className="space-y-1">
                                            <Label className="text-sm">Issue</Label>
                                            <p className="font-medium text-sm">{viewingComplaint.issue}</p>
                                          </div>
                                          
                                          <div className="space-y-1">
                                            <Label className="text-sm">Description</Label>
                                            <p className="text-sm text-muted-foreground">
                                              {viewingComplaint.description}
                                            </p>
                                          </div>
                                          
                                          {viewingComplaint.comments.length > 0 && (
                                            <div className="space-y-1">
                                              <Label className="text-sm">Comments</Label>
                                              <div className="space-y-2 pl-4 border-l-2">
                                                {viewingComplaint.comments.map((comment, index) => (
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
                                        </div>
                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <Button size="sm">Close</Button>
                                          </DialogClose>
                                        </DialogFooter>
                                      </DialogContent>
                                    )}
                                  </Dialog>
                                  
                                  {/* Edit Button */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-200 dark:hover:bg-slate-700"
                                        onClick={() => setEditingComplaint(complaint)}
                                      >
                                        <FileEdit className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="sr-only">Edit</span>
                                      </Button>
                                    </DialogTrigger>
                                    {editingComplaint && (
                                      <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                          <DialogTitle>Update Complaint</DialogTitle>
                                          <DialogDescription>
                                            Update the details of {editingComplaint.id}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                              <Label htmlFor="edit-status" className="text-sm">Status</Label>
                                              <Select
                                                value={editingComplaint.status}
                                                onValueChange={(value) => setEditingComplaint({
                                                  ...editingComplaint,
                                                  status: value as Complaint['status']
                                                })}
                                              >
                                                <SelectTrigger id="edit-status" className="text-sm h-9">
                                                  <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="Pending">Pending</SelectItem>
                                                  <SelectItem value="In Progress">In Progress</SelectItem>
                                                  <SelectItem value="Resolved">Resolved</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div className="space-y-1">
                                              <Label htmlFor="edit-priority" className="text-sm">Priority</Label>
                                              <Select
                                                value={editingComplaint.priority}
                                                onValueChange={(value) => setEditingComplaint({
                                                  ...editingComplaint,
                                                  priority: value as Complaint['priority']
                                                })}
                                              >
                                                <SelectTrigger id="edit-priority" className="text-sm h-9">
                                                  <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="High">High</SelectItem>
                                                  <SelectItem value="Medium">Medium</SelectItem>
                                                  <SelectItem value="Low">Low</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                          </div>
                                          
                                          <div className="space-y-1">
                                            <Label htmlFor="edit-assigned" className="text-sm">Assigned To</Label>
                                            <Select
                                              value={editingComplaint.assignedTo}
                                              onValueChange={(value) => setEditingComplaint({
                                                ...editingComplaint,
                                                assignedTo: value
                                              })}
                                            >
                                              <SelectTrigger id="edit-assigned" className="text-sm h-9">
                                                <SelectValue placeholder="Select staff" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="Maintenance Staff">Maintenance Staff</SelectItem>
                                                <SelectItem value="IT Support">IT Support</SelectItem>
                                                <SelectItem value="Cleaning Staff">Cleaning Staff</SelectItem>
                                                <SelectItem value="Security Staff">Security Staff</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          
                                          <div className="space-y-1">
                                            <Label htmlFor="edit-comment" className="text-sm">Add Comment</Label>
                                            <Textarea
                                              id="edit-comment"
                                              className="text-sm"
                                              rows={3}
                                              value={comment}
                                              onChange={(e) => setComment(e.target.value)}
                                              placeholder="Add a comment about this complaint"
                                            />
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <Button variant="outline" size="sm">Cancel</Button>
                                          </DialogClose>
                                          <Button 
                                            className="bg-indigo-600 hover:bg-indigo-700" 
                                            size="sm"
                                            onClick={() => {
                                              handleAddComment(editingComplaint.id)
                                              // Update the complaint in state
                                              const updatedComplaints = complaints.map(c => 
                                                c.id === editingComplaint.id ? editingComplaint : c
                                              )
                                              setComplaints(updatedComplaints)
                                              setEditingComplaint(null)
                                            }}
                                          >
                                            Save Changes
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    )}
                                  </Dialog>
                                  
                                  {/* Actions Dropdown */}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-200 dark:hover:bg-slate-700"
                                      >
                                        <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem 
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => setViewingComplaint(complaint)}
                                      >
                                        <Eye className="h-4 w-4" />
                                        <span>View Details</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => setEditingComplaint(complaint)}
                                      >
                                        <FileEdit className="h-4 w-4" />
                                        <span>Update Status</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => handleUpdateStatus(complaint.id, "Resolved")}
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                        <span>Mark as Resolved</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="p-6 text-center text-muted-foreground text-sm">
                              No complaints found matching your criteria
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 sm:mt-6">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredComplaints.length)}</span> of{" "}
                    <span className="font-medium">{filteredComplaints.length}</span> complaints
                  </p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 gap-1"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Previous</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 gap-1"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                    >
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Next</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Complaints Tab */}
          <TabsContent value="pending">
            <ComplaintStatusTable 
              complaints={complaints.filter(c => c.status === "Pending")} 
              status="Pending" 
              isMobile={isMobile}
              onViewComplaint={setViewingComplaint}
              onAssignComplaint={handleAssignComplaint}
            />
          </TabsContent>

          {/* In Progress Complaints Tab */}
          <TabsContent value="in-progress">
            <ComplaintStatusTable 
              complaints={complaints.filter(c => c.status === "In Progress")} 
              status="In Progress" 
              isMobile={isMobile}
              onViewComplaint={setViewingComplaint}
              onAddComment={handleAddComment}
            />
          </TabsContent>

          {/* Resolved Complaints Tab */}
          <TabsContent value="resolved">
            <ComplaintStatusTable 
              complaints={complaints.filter(c => c.status === "Resolved")} 
              status="Resolved" 
              isMobile={isMobile}
              onViewComplaint={setViewingComplaint}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Complaint Status Table Component
function ComplaintStatusTable({ complaints, status, isMobile, onViewComplaint, onAssignComplaint, onAddComment }: {
  complaints: Complaint[]
  status: string
  isMobile: boolean
  onViewComplaint: (complaint: Complaint) => void
  onAssignComplaint?: (complaintId: string, assignedTo: string) => void
  onAddComment?: (complaintId: string) => void
}) {
  const [comment, setComment] = useState("")
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null)

  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6 pb-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">{status} Complaints</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Total of {complaints.length} {status.toLowerCase()} complaints
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Complaint ID</th>
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Student</th>
                  {!isMobile && (
                    <th className="text-left p-3 font-medium text-xs sm:text-sm">Type</th>
                  )}
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Issue</th>
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Priority</th>
                  {status === "In Progress" && (
                    <th className="text-left p-3 font-medium text-xs sm:text-sm">Assigned To</th>
                  )}
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 text-sm">{complaint.id}</td>
                    <td className="p-3 text-sm">
                      <div className="font-medium">{complaint.studentName}</div>
                      <div className="text-xs text-muted-foreground">{complaint.room}</div>
                    </td>
                    {!isMobile && (
                      <td className="p-3 text-sm">{complaint.type}</td>
                    )}
                    <td className="p-3 text-sm max-w-[200px] truncate">{complaint.issue}</td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={
                          complaint.priority === "High"
                            ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 text-xs"
                            : complaint.priority === "Medium"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 text-xs"
                        }
                      >
                        {complaint.priority}
                      </Badge>
                    </td>
                    {status === "In Progress" && (
                      <td className="p-3 text-sm">{complaint.assignedTo}</td>
                    )}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-xs sm:text-sm"
                          onClick={() => onViewComplaint(complaint)}
                        >
                          View
                        </Button>
                        {status === "Pending" && onAssignComplaint && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs sm:text-sm"
                                onClick={() => setSelectedComplaintId(complaint.id)}
                              >
                                Assign
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Assign Complaint</DialogTitle>
                                <DialogDescription>
                                  Assign this complaint to staff and update its status
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="assign-to">Assign To</Label>
                                  <Select
                                    onValueChange={(value) => {
                                      if (selectedComplaintId && onAssignComplaint) {
                                        onAssignComplaint(selectedComplaintId, value)
                                      }
                                    }}
                                  >
                                    <SelectTrigger id="assign-to">
                                      <SelectValue placeholder="Select staff" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Maintenance Staff">Maintenance Staff</SelectItem>
                                      <SelectItem value="IT Support">IT Support</SelectItem>
                                      <SelectItem value="Cleaning Staff">Cleaning Staff</SelectItem>
                                      <SelectItem value="Security Staff">Security Staff</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button>Assign</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                        {status === "In Progress" && onAddComment && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs sm:text-sm"
                                onClick={() => setSelectedComplaintId(complaint.id)}
                              >
                                Comment
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Add Comment</DialogTitle>
                                <DialogDescription>
                                  Add a comment to this complaint
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="comment">Comment</Label>
                                  <Textarea
                                    id="comment"
                                    rows={4}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Enter your comment here..."
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button 
                                    onClick={() => {
                                      if (selectedComplaintId && onAddComment) {
                                        onAddComment(selectedComplaintId)
                                      }
                                    }}
                                  >
                                    Add Comment
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Stat Card Component (reused from rooms page)
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  border: string;
  hover: string;
  className?: string;
}

function StatCard({ title, value, icon, color, border, hover, className }: StatCardProps) {
  return (
    <Card className={`border ${border} ${hover} transition-colors dark:bg-slate-800/50 ${className}`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-xl sm:text-2xl font-bold">{value}</h3>
          </div>
          <div className={`${color} p-2 sm:p-3 rounded-lg`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}