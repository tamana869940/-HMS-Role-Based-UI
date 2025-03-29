"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
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
  CheckCircle,
  X,
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

// Navigation items (can be imported from a shared config file)
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
    active: true
  },
  {
    href: "/dashboard/admin/settings",
    label: "Settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
]

// Mock data for leave applications
const leaveApplications = [
  {
    id: "L-2023-001",
    studentId: "STU001",
    studentName: "John Doe",
    room: "203, Block A",
    type: "Weekend",
    fromDate: "2023-04-14",
    toDate: "2023-04-16",
    reason: "Going home for the weekend",
    appliedOn: "2023-04-10",
    status: "Approved",
    approvedBy: "Dr. Rajesh Kumar",
    comments: [{ user: "Warden", text: "Approved. Make sure to return on time.", date: "2023-04-11" }],
  },
  {
    id: "L-2023-002",
    studentId: "STU003",
    studentName: "Rahul Singh",
    room: "203, Block A",
    type: "Medical",
    fromDate: "2023-03-05",
    toDate: "2023-03-08",
    reason: "Need to visit home for medical treatment",
    appliedOn: "2023-03-03",
    status: "Rejected",
    approvedBy: "Dr. Rajesh Kumar",
    comments: [
      { user: "Warden", text: "Rejected. Medical leave requires proper documentation.", date: "2023-03-04" },
      { user: "Student", text: "I don't have a certificate yet as I need to visit the doctor", date: "2023-03-04" },
    ],
  },
  {
    id: "L-2023-003",
    studentId: "STU002",
    studentName: "Priya Sharma",
    room: "105, Block A",
    type: "Academic",
    fromDate: "2023-05-10",
    toDate: "2023-05-12",
    reason: "Attending a conference at Delhi University",
    appliedOn: "2023-05-01",
    status: "Pending",
    approvedBy: null,
    comments: [],
  },
  {
    id: "L-2023-004",
    studentId: "STU004",
    studentName: "Ananya Patel",
    room: "304, Block B",
    type: "Personal",
    fromDate: "2023-04-20",
    toDate: "2023-04-22",
    reason: "Family function at home",
    appliedOn: "2023-04-15",
    status: "Pending",
    approvedBy: null,
    comments: [],
  },
  {
    id: "L-2023-005",
    studentId: "STU006",
    studentName: "Neha Gupta",
    room: "106, Block A",
    type: "Night Out",
    fromDate: "2023-04-18",
    toDate: "2023-04-18",
    reason: "Going for a cultural event in the city",
    appliedOn: "2023-04-16",
    status: "Pending",
    approvedBy: null,
    comments: [],
  },
]

export default function AdminLeavePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [approvalComment, setApprovalComment] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  // Filter leave applications based on search term and filters
  const filteredLeaveApplications = leaveApplications.filter((application) => {
    const matchesSearch = 
      application.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === "all" || application.type.toLowerCase().includes(typeFilter.toLowerCase())
    const matchesStatus = statusFilter === "all" || application.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesType && matchesStatus
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
    // In a real app, you would update the application status
    console.log(`Approving application ${applicationId} with comment:`, approvalComment)
    setApprovalComment("")
  }

  const handleReject = (applicationId: string) => {
    // In a real app, you would update the application status
    console.log(`Rejecting application ${applicationId} with reason:`, rejectionReason)
    setRejectionReason("")
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
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Leave Application Management</h1>
            <p className="text-muted-foreground">View and manage student leave applications</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Applications"
            value={totalApplications.toString()}
            description="This semester"
            icon={<FileText className="h-5 w-5" />}
            color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
          />
          
          <StatCard 
            title="Pending"
            value={pendingApplications.toString()}
            description="Requires action"
            icon={<FileText className="h-5 w-5" />}
            color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300"
          />
          
          <StatCard 
            title="Approved"
            value={approvedApplications.toString()}
            description="Completed"
            icon={<CheckCircle className="h-5 w-5" />}
            color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
          />
          
          <StatCard 
            title="Rejected"
            value={rejectedApplications.toString()}
            description="Not approved"
            icon={<X className="h-5 w-5" />}
            color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 h-auto">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 py-2 rounded-lg text-sm"
              >
                All Applications
              </TabsTrigger>
              <TabsTrigger 
                value="pending" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 py-2 rounded-lg text-sm"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger 
                value="approved" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 py-2 rounded-lg text-sm"
              >
                Approved
              </TabsTrigger>
              <TabsTrigger 
                value="rejected" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 py-2 rounded-lg text-sm"
              >
                Rejected
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search applications..."
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
                      <Label htmlFor="type-filter">Leave Type</Label>
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
                          <SelectItem value="weekend">Weekend</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="night-out">Night Out</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="status-filter">Status</Label>
                      <Select
                        value={statusFilter}
                        onValueChange={(value) => {
                          setStatusFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="status-filter" className="h-8">
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
              
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Download size={16} />
              </Button>
            </div>
          </div>

          {/* All Applications Tab */}
          <TabsContent value="all">
            <Card>
              <CardHeader className="p-4 sm:p-6 pt-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>All Leave Applications</CardTitle>
                    <CardDescription>
                      Showing {filteredLeaveApplications.length} application records
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
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedApplications.length > 0 ? (
                        paginatedApplications.map((application) => (
                          <TableRow key={application.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{application.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{application.studentName}</div>
                              <div className="text-xs text-muted-foreground">{application.room}</div>
                            </TableCell>
                            <TableCell>{application.type}</TableCell>
                            <TableCell>{format(new Date(application.fromDate), "dd MMM yyyy")}</TableCell>
                            <TableCell>{format(new Date(application.toDate), "dd MMM yyyy")}</TableCell>
                            <TableCell>{format(new Date(application.appliedOn), "dd MMM yyyy")}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  application.status === "Approved" ? "default" :
                                  application.status === "Rejected" ? "destructive" : "outline"
                                }
                              >
                                {application.status}
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
                                  {application.status === "Pending" && (
                                    <>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
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
                                            <Button variant="outline">Cancel</Button>
                                            <Button onClick={() => handleApprove(application.id)}>Approve Leave</Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
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
                                            <Button variant="outline">Cancel</Button>
                                            <Button variant="destructive" onClick={() => handleReject(application.id)}>
                                              Reject Leave
                                            </Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    </>
                                  )}
                                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>Add Comment</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No leave applications found matching your criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Applications Tab */}
          <TabsContent value="pending">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pending Leave Applications</CardTitle>
                <CardDescription>
                  {pendingApplications} applications awaiting your approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveApplications
                    .filter((application) => application.status === "Pending")
                    .map((application) => (
                      <LeaveApplicationCard 
                        key={application.id}
                        application={application}
                        onApprove={() => handleApprove(application.id)}
                        onReject={() => handleReject(application.id)}
                        approvalComment={approvalComment}
                        onApprovalCommentChange={setApprovalComment}
                        rejectionReason={rejectionReason}
                        onRejectionReasonChange={setRejectionReason}
                      />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approved Applications Tab */}
          <TabsContent value="approved">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Approved Leave Applications</CardTitle>
                <CardDescription>
                  {approvedApplications} applications that have been approved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveApplications
                    .filter((application) => application.status === "Approved")
                    .map((application) => (
                      <LeaveApplicationCard 
                        key={application.id}
                        application={application}
                        viewOnly={true}
                      />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rejected Applications Tab */}
          <TabsContent value="rejected">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Rejected Leave Applications</CardTitle>
                <CardDescription>
                  {rejectedApplications} applications that have been rejected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveApplications
                    .filter((application) => application.status === "Rejected")
                    .map((application) => (
                      <LeaveApplicationCard 
                        key={application.id}
                        application={application}
                        viewOnly={true}
                      />
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

// Stat Card Component (Reused from previous dashboard)
interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  border?: string;
  hover?: string;
}

function StatCard({ title, value, description, icon, color }: StatCardProps) {
  return (
    <Card className="border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className={`${color} p-3 rounded-full`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Leave Application Card Component
function LeaveApplicationCard({
  application,
  viewOnly = false,
  onApprove,
  onReject,
  approvalComment,
  onApprovalCommentChange,
  rejectionReason,
  onRejectionReasonChange,
}: {
  application: any;
  viewOnly?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  approvalComment?: string;
  onApprovalCommentChange?: (value: string) => void;
  rejectionReason?: string;
  onRejectionReasonChange?: (value: string) => void;
}) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{application.type} Leave</h3>
            <Badge variant={
              application.status === "Approved" ? "default" :
              application.status === "Rejected" ? "destructive" : "outline"
            }>
              {application.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {application.id} • Applied on {format(new Date(application.appliedOn), "dd MMM yyyy")}
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <p className="text-sm">
            <span className="font-medium">Student:</span> {application.studentName} ({application.room})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">From Date</p>
          <p className="font-medium">{format(new Date(application.fromDate), "dd MMM yyyy")}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">To Date</p>
          <p className="font-medium">{format(new Date(application.toDate), "dd MMM yyyy")}</p>
        </div>
      </div>

      <p className="text-sm mb-4">
        <span className="font-medium">Reason: </span>
        {application.reason}
      </p>

      {application.approvedBy && (
        <p className="text-sm mb-4">
          <span className="font-medium">
            {application.status === "Approved" ? "Approved by: " : "Rejected by: "}
          </span>
          {application.approvedBy}
        </p>
      )}

      {application.comments.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Comments:</p>
          <div className="space-y-2 pl-4 border-l-2">
            {application.comments.map((comment: any, index: number) => (
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
          <span>View Details</span>
        </Button>

        {!viewOnly && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Approve</span>
                </Button>
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
                      onChange={(e) => onApprovalCommentChange?.(e.target.value)}
                    />
                  </div>
                </div>
                <Separator />
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={onApprove}>Approve Leave</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  <span>Reject</span>
                </Button>
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
                      onChange={(e) => onRejectionReasonChange?.(e.target.value)}
                    />
                  </div>
                </div>
                <Separator />
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive" onClick={onReject}>
                    Reject Leave
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  )
}