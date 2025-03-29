"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import wardenNavItems from "@/components/warden/warden-nav-items"
import { useIsMobile } from "@/hooks/use-mobile"
import { toast } from "sonner"
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  X,
  Plus, 
  Search, 
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  User
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

type LeaveApplication = {
  id: string
  studentId: string
  studentName: string
  room: string
  block: string
  type: string
  fromDate: string
  toDate: string
  reason: string
  appliedOn: string
  status: "Pending" | "Approved" | "Rejected"
  approvedBy: string | null
  comments: {
    user: string
    text: string
    date: string
  }[]
}

export default function WardenLeavePage() {
  const isMobile = useIsMobile("(max-width: 640px)")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [blockFilter, setBlockFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [approvalComment, setApprovalComment] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [viewingApplication, setViewingApplication] = useState<LeaveApplication | null>(null)
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null)

  // Mock data for leave applications
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([
    {
      id: "L-2023-001",
      studentId: "STU001",
      studentName: "Rahul Sharma",
      room: "A-203",
      block: "A",
      type: "Weekend",
      fromDate: "2023-04-14",
      toDate: "2023-04-16",
      reason: "Going home for the weekend",
      appliedOn: "2023-04-10",
      status: "Pending",
      approvedBy: null,
      comments: []
    },
    {
      id: "L-2023-002",
      studentId: "STU002",
      studentName: "Priya Patel",
      room: "B-105",
      block: "B",
      type: "Medical",
      fromDate: "2023-04-15",
      toDate: "2023-04-17",
      reason: "Doctor's appointment",
      appliedOn: "2023-04-12",
      status: "Approved",
      approvedBy: "Dr. Rajesh Kumar",
      comments: [{ user: "Warden", text: "Approved with medical certificate", date: "2023-04-13" }]
    },
    {
      id: "L-2023-003",
      studentId: "STU003",
      studentName: "Amit Singh",
      room: "A-312",
      block: "A",
      type: "Academic",
      fromDate: "2023-04-18",
      toDate: "2023-04-19",
      reason: "Conference attendance",
      appliedOn: "2023-04-14",
      status: "Rejected",
      approvedBy: "Dr. Rajesh Kumar",
      comments: [{ user: "Warden", text: "Conference dates conflict with exams", date: "2023-04-15" }]
    },
    {
      id: "L-2023-004",
      studentId: "STU004",
      studentName: "Neha Gupta",
      room: "B-204",
      block: "B",
      type: "Night Out",
      fromDate: "2023-04-20",
      toDate: "2023-04-20",
      reason: "Family function",
      appliedOn: "2023-04-16",
      status: "Pending",
      approvedBy: null,
      comments: []
    },
    {
      id: "L-2023-005",
      studentId: "STU005",
      studentName: "Vikram Mehta",
      room: "A-102",
      block: "A",
      type: "Personal",
      fromDate: "2023-04-21",
      toDate: "2023-04-23",
      reason: "Family emergency",
      appliedOn: "2023-04-18",
      status: "Approved",
      approvedBy: "Dr. Rajesh Kumar",
      comments: [{ user: "Warden", text: "Approved due to emergency", date: "2023-04-19" }]
    }
  ])

  // Filter leave applications based on search and filters
  const filteredLeaveApplications = leaveApplications.filter((application) => {
    const matchesSearch = 
      application.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === "all" || application.type.toLowerCase().includes(typeFilter.toLowerCase())
    const matchesBlock = blockFilter === "all" || application.block.toLowerCase() === blockFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || application.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesType && matchesBlock && matchesStatus
  })

  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredLeaveApplications.length / itemsPerPage)
  const paginatedApplications = filteredLeaveApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Leave application statistics
  const totalApplications = leaveApplications.length
  const pendingApplications = leaveApplications.filter((app) => app.status === "Pending").length
  const approvedApplications = leaveApplications.filter((app) => app.status === "Approved").length
  const rejectedApplications = leaveApplications.filter((app) => app.status === "Rejected").length

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleApprove = (applicationId: string) => {
    const updatedApplications = leaveApplications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: "Approved" as const,
          approvedBy: "Dr. Rajesh Kumar",
          comments: [
            ...app.comments,
            {
              user: "Warden",
              text: approvalComment || "Leave application approved",
              date: new Date().toISOString().split('T')[0]
            }
          ]
        }
      }
      return app
    })
    
    setLeaveApplications(updatedApplications)
    setApprovalComment("")
    toast.success("Leave application approved")
  }

  const handleReject = (applicationId: string) => {
    const updatedApplications = leaveApplications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: "Rejected" as const,
          approvedBy: "Dr. Rajesh Kumar",
          comments: [
            ...app.comments,
            {
              user: "Warden",
              text: rejectionReason || "Leave application rejected",
              date: new Date().toISOString().split('T')[0]
            }
          ]
        }
      }
      return app
    })
    
    setLeaveApplications(updatedApplications)
    setRejectionReason("")
    toast.success("Leave application rejected")
  }

  return (
    <DashboardLayout
      userType="warden"
      userName="Dr. Rajesh Kumar"
      userRole="Hostel Warden"
      userAvatar="RK"
      navItems={wardenNavItems}
    >
      <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Leave Application Management</h1>
            <p className="text-muted-foreground text-sm">View and manage all student leave applications</p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Applications"
            value={totalApplications}
            icon={<FileText className="h-5 w-5" />}
            color="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
            border="border-indigo-200 dark:border-indigo-800"
            hover="hover:border-indigo-300 dark:hover:border-indigo-600"
          />
          <StatCard
            title="Pending"
            value={pendingApplications}
            icon={<FileText className="h-5 w-5" />}
            color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300"
            border="border-amber-200 dark:border-amber-800"
            hover="hover:border-amber-300 dark:hover:border-amber-600"
          />
          <StatCard
            title="Approved"
            value={approvedApplications}
            icon={<CheckCircle className="h-5 w-5" />}
            color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
            border="border-emerald-200 dark:border-emerald-800"
            hover="hover:border-emerald-300 dark:hover:border-emerald-600"
          />
          <StatCard
            title="Rejected"
            value={rejectedApplications}
            icon={<X className="h-5 w-5" />}
            color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300"
            border="border-red-200 dark:border-red-800"
            hover="hover:border-red-300 dark:hover:border-red-600"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
            <TabsList className="grid w-full md:w-auto grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            
            <div className="w-full md:w-auto flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search applications..."
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
                      <Label htmlFor="type-filter" className="text-xs">Leave Type</Label>
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
                          <SelectItem value="weekend">Weekend</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="night-out">Night Out</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="block-filter" className="text-xs">Hostel Block</Label>
                      <Select
                        value={blockFilter}
                        onValueChange={(value) => {
                          setBlockFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="block-filter" className="h-8 text-xs">
                          <SelectValue placeholder="All Blocks" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Blocks</SelectItem>
                          <SelectItem value="a">Block A</SelectItem>
                          <SelectItem value="b">Block B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="status-filter" className="text-xs">Status</Label>
                      <Select
                        value={statusFilter}
                        onValueChange={(value) => {
                          setStatusFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="status-filter" className="h-8 text-xs">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
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

          {/* All Applications Tab */}
          <TabsContent value="all" className="space-y-6">
            <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
              <CardHeader className="p-4 sm:p-6 pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">All Leave Applications</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Showing {filteredLeaveApplications.length} of {leaveApplications.length} applications
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
                {/* Applications Table */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Application ID</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Student</th>
                          {!isMobile && (
                            <>
                              <th className="text-left p-3 font-medium text-xs sm:text-sm">Type</th>
                              <th className="text-left p-3 font-medium text-xs sm:text-sm">Dates</th>
                            </>
                          )}
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Applied On</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Status</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {paginatedApplications.length > 0 ? (
                          paginatedApplications.map((application) => (
                            <tr key={application.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-3 text-sm">{application.id}</td>
                              <td className="p-3 text-sm">
                                <div className="font-medium">{application.studentName}</div>
                                <div className="text-xs text-muted-foreground">Block {application.block}, Room {application.room.split('-')[1]}</div>
                              </td>
                              {!isMobile && (
                                <>
                                  <td className="p-3 text-sm">{application.type}</td>
                                  <td className="p-3 text-sm">
                                    {format(new Date(application.fromDate), "dd MMM")} - {format(new Date(application.toDate), "dd MMM yyyy")}
                                  </td>
                                </>
                              )}
                              <td className="p-3 text-sm">
                                {format(new Date(application.appliedOn), "dd MMM yyyy")}
                              </td>
                              <td className="p-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    application.status === "Approved"
                                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                      : application.status === "Rejected"
                                        ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 text-xs"
                                        : "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                  }
                                >
                                  {application.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  {/* View Button */}
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-200 dark:hover:bg-slate-700"
                                    onClick={() => setViewingApplication(application)}
                                  >
                                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="sr-only">View</span>
                                  </Button>
                                  
                                  {/* Actions Dropdown */}
                                  {application.status === "Pending" && (
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
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <DropdownMenuItem 
                                              className="flex items-center gap-2 cursor-pointer"
                                              onSelect={(e) => e.preventDefault()}
                                            >
                                              <CheckCircle className="h-4 w-4" />
                                              <span>Approve</span>
                                            </DropdownMenuItem>
                                          </DialogTrigger>
                                          <DialogContent className="sm:max-w-[500px]">
                                            <DialogHeader>
                                              <DialogTitle>Approve Leave Application</DialogTitle>
                                              <DialogDescription>
                                                Approve this leave application and add a comment if needed
                                              </DialogDescription>
                                            </DialogHeader>
                                            <Separator />
                                            <div className="grid gap-4 py-4">
                                              <div className="space-y-2">
                                                <Label htmlFor="comment">Comment (Optional)</Label>
                                                <Textarea 
                                                  id="comment" 
                                                  placeholder="Add a comment for the student" 
                                                  rows={3}
                                                  value={approvalComment}
                                                  onChange={(e) => setApprovalComment(e.target.value)}
                                                />
                                              </div>
                                            </div>
                                            <Separator />
                                            <DialogFooter>
                                              <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                              </DialogClose>
                                              <Button 
                                                onClick={() => {
                                                  handleApprove(application.id)
                                                }}
                                              >
                                                Approve Leave
                                              </Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <DropdownMenuItem 
                                              className="flex items-center gap-2 cursor-pointer"
                                              onSelect={(e) => e.preventDefault()}
                                            >
                                              <X className="h-4 w-4" />
                                              <span>Reject</span>
                                            </DropdownMenuItem>
                                          </DialogTrigger>
                                          <DialogContent className="sm:max-w-[500px]">
                                            <DialogHeader>
                                              <DialogTitle>Reject Leave Application</DialogTitle>
                                              <DialogDescription>
                                                Reject this leave application and provide a reason
                                              </DialogDescription>
                                            </DialogHeader>
                                            <Separator />
                                            <div className="grid gap-4 py-4">
                                              <div className="space-y-2">
                                                <Label htmlFor="reason">Reason for Rejection</Label>
                                                <Textarea
                                                  id="reason"
                                                  placeholder="Provide a reason for rejecting this application"
                                                  rows={3}
                                                  value={rejectionReason}
                                                  onChange={(e) => setRejectionReason(e.target.value)}
                                                />
                                              </div>
                                            </div>
                                            <Separator />
                                            <DialogFooter>
                                              <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                              </DialogClose>
                                              <Button 
                                                variant="destructive" 
                                                onClick={() => {
                                                  handleReject(application.id)
                                                }}
                                              >
                                                Reject Leave
                                              </Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="p-6 text-center text-muted-foreground text-sm">
                              No leave applications found matching your criteria
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
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredLeaveApplications.length)}</span> of{" "}
                    <span className="font-medium">{filteredLeaveApplications.length}</span> applications
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

          {/* Pending Applications Tab */}
          <TabsContent value="pending">
            <LeaveStatusTable 
              applications={leaveApplications.filter(app => app.status === "Pending")} 
              status="Pending" 
              isMobile={isMobile}
              onViewApplication={setViewingApplication}
              onApprove={handleApprove}
              onReject={handleReject}
              approvalComment={approvalComment}
              onApprovalCommentChange={setApprovalComment}
              rejectionReason={rejectionReason}
              onRejectionReasonChange={setRejectionReason}
            />
          </TabsContent>

          {/* Approved Applications Tab */}
          <TabsContent value="approved">
            <LeaveStatusTable 
              applications={leaveApplications.filter(app => app.status === "Approved")} 
              status="Approved" 
              isMobile={isMobile}
              onViewApplication={setViewingApplication}
              viewOnly={true}
            />
          </TabsContent>

          {/* Rejected Applications Tab */}
          <TabsContent value="rejected">
            <LeaveStatusTable 
              applications={leaveApplications.filter(app => app.status === "Rejected")} 
              status="Rejected" 
              isMobile={isMobile}
              onViewApplication={setViewingApplication}
              viewOnly={true}
            />
          </TabsContent>
        </Tabs>

        {/* View Application Dialog */}
        {viewingApplication && (
          <Dialog open={!!viewingApplication} onOpenChange={(open) => !open && setViewingApplication(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Leave Application Details</DialogTitle>
                <DialogDescription>
                  Complete information about {viewingApplication.id}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 dark:bg-slate-700 h-14 w-14 sm:h-16 sm:w-16 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">{viewingApplication.id}</h3>
                    <Badge className="mt-1 text-xs sm:text-sm">
                      {viewingApplication.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm">Student Name</Label>
                    <p className="font-medium text-sm">{viewingApplication.studentName}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Room</Label>
                    <p className="font-medium text-sm">Block {viewingApplication.block}, Room {viewingApplication.room.split('-')[1]}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm">From Date</Label>
                    <p className="font-medium text-sm">
                      {format(new Date(viewingApplication.fromDate), "dd MMM yyyy")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">To Date</Label>
                    <p className="font-medium text-sm">
                      {format(new Date(viewingApplication.toDate), "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm">Applied On</Label>
                    <p className="font-medium text-sm">
                      {format(new Date(viewingApplication.appliedOn), "dd MMM yyyy")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Status</Label>
                    <Badge
                      variant="outline"
                      className={
                        viewingApplication.status === "Approved"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                          : viewingApplication.status === "Rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                      }
                    >
                      {viewingApplication.status}
                    </Badge>
                  </div>
                </div>
                
                {viewingApplication.approvedBy && (
                  <div className="space-y-1">
                    <Label className="text-sm">
                      {viewingApplication.status === "Approved" ? "Approved By" : "Rejected By"}
                    </Label>
                    <p className="font-medium text-sm">{viewingApplication.approvedBy}</p>
                  </div>
                )}
                
                <div className="space-y-1">
                  <Label className="text-sm">Reason</Label>
                  <p className="text-sm text-muted-foreground">
                    {viewingApplication.reason}
                  </p>
                </div>
                
                {viewingApplication.comments.length > 0 && (
                  <div className="space-y-1">
                    <Label className="text-sm">Comments</Label>
                    <div className="space-y-2 pl-4 border-l-2">
                      {viewingApplication.comments.map((comment, index) => (
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
                {viewingApplication.status === "Pending" && (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Reject</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Reject Leave Application</DialogTitle>
                          <DialogDescription>
                            Reject this leave application and provide a reason
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="reason">Reason for Rejection</Label>
                            <Textarea
                              id="reason"
                              placeholder="Provide a reason for rejecting this application"
                              rows={3}
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button 
                              variant="destructive" 
                              onClick={() => {
                                handleReject(viewingApplication.id)
                              }}
                            >
                              Reject Leave
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Approve</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Approve Leave Application</DialogTitle>
                          <DialogDescription>
                            Approve this leave application and add a comment if needed
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="comment">Comment (Optional)</Label>
                            <Textarea 
                              id="comment" 
                              placeholder="Add a comment for the student" 
                              rows={3}
                              value={approvalComment}
                              onChange={(e) => setApprovalComment(e.target.value)}
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
                                handleApprove(viewingApplication.id)
                              }}
                            >
                              Approve Leave
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
                {viewingApplication.status !== "Pending" && (
                  <DialogClose asChild>
                    <Button>Close</Button>
                  </DialogClose>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  )
}

// Leave Status Table Component
function LeaveStatusTable({ 
  applications, 
  status, 
  isMobile, 
  onViewApplication, 
  onApprove, 
  onReject, 
  approvalComment, 
  onApprovalCommentChange, 
  rejectionReason, 
  onRejectionReasonChange,
  viewOnly = false 
}: {
  applications: LeaveApplication[]
  status: string
  isMobile: boolean
  onViewApplication: (app: LeaveApplication) => void
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  approvalComment?: string
  onApprovalCommentChange?: (value: string) => void
  rejectionReason?: string
  onRejectionReasonChange?: (value: string) => void
  viewOnly?: boolean
}) {
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null)

  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6 pb-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">{status} Applications</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Total of {applications.length} {status.toLowerCase()} applications
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
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Application ID</th>
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Student</th>
                  {!isMobile && (
                    <th className="text-left p-3 font-medium text-xs sm:text-sm">Type</th>
                  )}
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Dates</th>
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {applications.length > 0 ? (
                  applications.map((application) => (
                    <tr key={application.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 text-sm">{application.id}</td>
                      <td className="p-3 text-sm">
                        <div className="font-medium">{application.studentName}</div>
                        <div className="text-xs text-muted-foreground">Block {application.block}, Room {application.room.split('-')[1]}</div>
                      </td>
                      {!isMobile && (
                        <td className="p-3 text-sm">{application.type}</td>
                      )}
                      <td className="p-3 text-sm">
                        {format(new Date(application.fromDate), "dd MMM")} - {format(new Date(application.toDate), "dd MMM yyyy")}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-xs sm:text-sm"
                            onClick={() => onViewApplication(application)}
                          >
                            View
                          </Button>
                          {!viewOnly && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-xs sm:text-sm"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem 
                                      className="flex items-center gap-2 cursor-pointer"
                                      onSelect={(e) => e.preventDefault()}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                      <span>Approve</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                      <DialogTitle>Approve Leave Application</DialogTitle>
                                      <DialogDescription>
                                        Approve this leave application and add a comment if needed
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="comment">Comment (Optional)</Label>
                                        <Textarea 
                                          id="comment" 
                                          placeholder="Add a comment for the student" 
                                          rows={3}
                                          value={approvalComment}
                                          onChange={(e) => onApprovalCommentChange?.(e.target.value)}
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
                                            if (onApprove && application.id) {
                                              onApprove(application.id)
                                            }
                                          }}
                                        >
                                          Approve Leave
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem 
                                      className="flex items-center gap-2 cursor-pointer"
                                      onSelect={(e) => e.preventDefault()}
                                    >
                                      <X className="h-4 w-4" />
                                      <span>Reject</span>
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                      <DialogTitle>Reject Leave Application</DialogTitle>
                                      <DialogDescription>
                                        Reject this leave application and provide a reason
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="reason">Reason for Rejection</Label>
                                        <Textarea
                                          id="reason"
                                          placeholder="Provide a reason for rejecting this application"
                                          rows={3}
                                          value={rejectionReason}
                                          onChange={(e) => onRejectionReasonChange?.(e.target.value)}
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                      </DialogClose>
                                      <DialogClose asChild>
                                        <Button 
                                          variant="destructive" 
                                          onClick={() => {
                                            if (onReject && application.id) {
                                              onReject(application.id)
                                            }
                                          }}
                                        >
                                          Reject Leave
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-muted-foreground text-sm">
                      No {status.toLowerCase()} applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Stat Card Component
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