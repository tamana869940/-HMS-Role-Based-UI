"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  MessageSquare,
  FileText,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Building,
  Settings,
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
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function WardenStudentsPage() {
  const isMobile = useIsMobile("(max-width: 640px)")
  const [searchTerm, setSearchTerm] = useState("")
  const [blockFilter, setBlockFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  interface Student {
    id: string;
    name: string;
    room: string;
    block: string;
    course: string;
    year: string;
    contact: string;
    email: string;
    status: string;
    avatar: string;
    attendance: string;
    complaints: number;
    leaveRequests: number;
    admissionDate: string;
    emergencyContact: string;
    address: string;
  }

  const [viewingStudent, setViewingStudent] = useState<Student | null>(null)

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
      href: "/dashboard/warden/leave-applications",
      label: "Leave Applications",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/warden/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  // Mock data for students
  const students = [
    {
      id: "STU001",
      name: "John Doe",
      room: "203",
      block: "Block A",
      course: "Computer Science",
      year: "3rd Year",
      contact: "+91 98765 43210",
      email: "john.doe@example.com",
      status: "Active",
      avatar: "JD",
      attendance: "92%",
      complaints: 2,
      leaveRequests: 1,
      admissionDate: "2021-07-15",
      emergencyContact: "+91 98765 43211",
      address: "123 Main St, Bangalore, Karnataka"
    },
    {
      id: "STU002",
      name: "Priya Sharma",
      room: "105",
      block: "Block A",
      course: "Electronics",
      year: "2nd Year",
      contact: "+91 87654 32109",
      email: "priya.sharma@example.com",
      status: "Active",
      avatar: "PS",
      attendance: "95%",
      complaints: 0,
      leaveRequests: 3,
      admissionDate: "2022-07-10",
      emergencyContact: "+91 87654 32108",
      address: "456 Oak Ave, Mumbai, Maharashtra"
    },
    {
      id: "STU003",
      name: "Rahul Singh",
      room: "203",
      block: "Block A",
      course: "Computer Science",
      year: "3rd Year",
      contact: "+91 76543 21098",
      email: "rahul.singh@example.com",
      status: "On Leave",
      avatar: "RS",
      attendance: "88%",
      complaints: 1,
      leaveRequests: 2,
      admissionDate: "2021-07-12",
      emergencyContact: "+91 76543 21097",
      address: "789 Pine Rd, Delhi"
    },
    {
      id: "STU004",
      name: "Ananya Patel",
      room: "304",
      block: "Block B",
      course: "Mechanical",
      year: "4th Year",
      contact: "+91 65432 10987",
      email: "ananya.patel@example.com",
      status: "Active",
      avatar: "AP",
      attendance: "90%",
      complaints: 0,
      leaveRequests: 0,
      admissionDate: "2020-07-20",
      emergencyContact: "+91 65432 10986",
      address: "321 Elm St, Hyderabad, Telangana"
    },
    {
      id: "STU005",
      name: "Vikram Mehta",
      room: "210",
      block: "Block C",
      course: "Civil",
      year: "2nd Year",
      contact: "+91 54321 09876",
      email: "vikram.mehta@example.com",
      status: "Active",
      avatar: "VM",
      attendance: "85%",
      complaints: 1,
      leaveRequests: 1,
      admissionDate: "2022-07-18",
      emergencyContact: "+91 54321 09875",
      address: "654 Maple Dr, Chennai, Tamil Nadu"
    },
    {
      id: "STU006",
      name: "Neha Gupta",
      room: "106",
      block: "Block A",
      course: "Information Technology",
      year: "1st Year",
      contact: "+91 43210 98765",
      email: "neha.gupta@example.com",
      status: "Active",
      avatar: "NG",
      attendance: "98%",
      complaints: 0,
      leaveRequests: 1,
      admissionDate: "2023-07-05",
      emergencyContact: "+91 43210 98764",
      address: "987 Cedar Ln, Pune, Maharashtra"
    },
  ]

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.block.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesBlock = blockFilter === "all" || student.block === blockFilter
    const matchesYear = yearFilter === "all" || student.year.startsWith(yearFilter)
    
    return matchesSearch && matchesBlock && matchesYear
  })

  const averageAttendance = Math.round(
    students.reduce((sum, student) => sum + parseInt(student.attendance), 0) / students.length
  )

  return (
    <DashboardLayout
      userType="warden"
      userName="Dr. Rajesh Kumar"
      userRole="Hostel Warden"
      userAvatar="RK"
      navItems={navItems}
    >
      <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
            <p className="text-muted-foreground text-sm">View and manage all students in your hostel block</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={students.length}
            icon={<Users className="h-5 w-5" />}
            color="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
            border="border-indigo-200 dark:border-indigo-800"
            hover="hover:border-indigo-300 dark:hover:border-indigo-600"
          />
          <StatCard
            title="Present Today"
            value={students.filter((s) => s.status === "Active").length}
            icon={<UserCheck className="h-5 w-5" />}
            color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
            border="border-emerald-200 dark:border-emerald-800"
            hover="hover:border-emerald-300 dark:hover:border-emerald-600"
          />
          <StatCard
            title="On Leave"
            value={students.filter((s) => s.status === "On Leave").length}
            icon={<UserX className="h-5 w-5" />}
            color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300"
            border="border-amber-200 dark:border-amber-800"
            hover="hover:border-amber-300 dark:hover:border-amber-600"
          />
          <StatCard
            title="Avg Attendance"
            value={`${averageAttendance}%`}
            icon={<Users className="h-5 w-5" />}
            color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
            border="border-blue-200 dark:border-blue-800"
            hover="hover:border-blue-300 dark:hover:border-blue-600"
          />
        </div>

        {/* Student Directory */}
        <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Students Directory</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Total of {students.length} students under your supervision
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download size={16} />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-9 text-sm h-9 sm:h-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={blockFilter} onValueChange={setBlockFilter}>
                <SelectTrigger className="w-[130px] sm:w-[150px] text-sm h-9 sm:h-10">
                  <SelectValue placeholder="Filter by block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blocks</SelectItem>
                  <SelectItem value="Block A">Block A</SelectItem>
                  <SelectItem value="Block B">Block B</SelectItem>
                  <SelectItem value="Block C">Block C</SelectItem>
                </SelectContent>
              </Select>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[120px] sm:w-[140px] text-sm h-9 sm:h-10">
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="flex items-center gap-2 h-9 sm:h-10">
                <Filter size={16} />
                <span className="hidden sm:inline">More</span>
              </Button>
            </div>

            {/* Student Table */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Student</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Room/Block</th>
                      {!isMobile && (
                        <>
                          <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Course</th>
                          <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Year</th>
                        </>
                      )}
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Attendance</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Complaints</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Status</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr 
                          key={student.id} 
                          className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="p-3 sm:p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                                <AvatarFallback className="bg-slate-100 dark:bg-slate-700 text-xs sm:text-sm">
                                  {student.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm sm:text-base">{student.name}</div>
                                <div className="text-xs text-muted-foreground">{student.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 sm:p-4 text-sm">
                            <div className="font-medium">{student.room}</div>
                            <div className="text-xs text-muted-foreground">{student.block}</div>
                          </td>
                          {!isMobile && (
                            <>
                              <td className="p-3 sm:p-4 text-sm">{student.course}</td>
                              <td className="p-3 sm:p-4 text-sm">{student.year}</td>
                            </>
                          )}
                          <td className="p-3 sm:p-4 text-sm font-medium">{student.attendance}</td>
                          <td className="p-3 sm:p-4">
                            <Badge
                              variant="outline"
                              className={
                                student.complaints === 0
                                  ? "text-xs"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                              }
                            >
                              {student.complaints || 0}
                            </Badge>
                          </td>
                          <td className="p-3 sm:p-4">
                            <Badge
                              variant="outline"
                              className={
                                student.status === "Active"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                              }
                            >
                              {student.status}
                            </Badge>
                          </td>
                          <td className="p-3 sm:p-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                              {/* View Button */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-200 dark:hover:bg-slate-700"
                                    onClick={() => setViewingStudent(student)}
                                  >
                                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="sr-only">View</span>
                                  </Button>
                                </DialogTrigger>
                                {viewingStudent && (
                                  <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Student Details</DialogTitle>
                                      <DialogDescription>
                                        Complete information about {viewingStudent.name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Avatar className="h-14 w-14 sm:h-16 sm:w-16">
                                          <AvatarFallback className="text-lg sm:text-xl bg-slate-100 dark:bg-slate-700">
                                            {viewingStudent.avatar}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="text-lg sm:text-xl font-bold">{viewingStudent.name}</h3>
                                          <p className="text-muted-foreground text-sm">{viewingStudent.id}</p>
                                          <Badge className="mt-1 text-xs sm:text-sm">
                                            {viewingStudent.course} - {viewingStudent.year}
                                          </Badge>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label className="text-sm">Room/Block</Label>
                                          <p className="font-medium text-sm">{viewingStudent.room}, {viewingStudent.block}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-sm">Admission Date</Label>
                                          <p className="font-medium text-sm">{viewingStudent.admissionDate}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label className="text-sm">Contact</Label>
                                          <p className="font-medium text-sm">{viewingStudent.contact}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-sm">Email</Label>
                                          <p className="font-medium text-sm">{viewingStudent.email}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <Label className="text-sm">Emergency Contact</Label>
                                        <p className="font-medium text-sm">
                                          {viewingStudent.emergencyContact || "Not provided"}
                                        </p>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <Label className="text-sm">Address</Label>
                                        <p className="font-medium text-sm">
                                          {viewingStudent.address || "Not provided"}
                                        </p>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                          <Label className="text-sm">Status</Label>
                                          <Badge
                                            variant="outline"
                                            className={
                                              viewingStudent.status === "Active"
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                            }
                                          >
                                            {viewingStudent.status}
                                          </Badge>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-sm">Attendance</Label>
                                          <p className="font-medium text-sm">{viewingStudent.attendance}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-sm">Complaints</Label>
                                          <Badge
                                            variant="outline"
                                            className={
                                              viewingStudent.complaints === 0
                                                ? "text-xs"
                                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                            }
                                          >
                                            {viewingStudent.complaints || 0}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                )}
                              </Dialog>
                              
                              {/* More Actions Dropdown */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-200 dark:hover:bg-slate-700"
                                  >
                                    <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="sr-only">More</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem className="text-xs sm:text-sm">
                                    <MessageSquare className="mr-2 h-3.5 w-3.5" />
                                    Add Complaint
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-xs sm:text-sm">
                                    <FileText className="mr-2 h-3.5 w-3.5" />
                                    Process Leave
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-xs sm:text-sm">
                                    <Eye className="mr-2 h-3.5 w-3.5" />
                                    View Details
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
                          No students found matching your criteria
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
                Showing <span className="font-medium">{filteredStudents.length}</span> of{" "}
                <span className="font-medium">{students.length}</span> students
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Previous</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Next</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  border: string;
  hover: string;
}

function StatCard({ title, value, icon, color, border, hover }: StatCardProps) {
  return (
    <Card className={`border ${border} ${hover} transition-colors dark:bg-slate-800/50`}>
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