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
  FileEdit,
  Trash2,
  UserPlus,
  Users,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  Home,
  BookOpen,
  Wallet,
  Calendar
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
import { adminNavItems } from "@/components/admin/admin-nav-items"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useIsMobile } from "@/hooks/use-mobile"

type Student = {
  id: string
  name: string
  room: string
  course: string
  year: string
  contact: string
  email: string
  status: "Active" | "On Leave" | "Suspended"
  avatar: string
  feeStatus: "Paid" | "Pending" | "Overdue"
  admissionDate: string
  emergencyContact?: string
  address?: string
}

export default function AdminStudentsPage() {
  const isMobile = useIsMobile("(max-width: 640px)")
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [students, setStudents] = useState<Student[]>([
    {
      id: "STU001",
      name: "John Doe",
      room: "203, Block A",
      course: "Computer Science",
      year: "3rd Year",
      contact: "+91 98765 43210",
      email: "john.doe@example.com",
      status: "Active",
      avatar: "JD",
      feeStatus: "Paid",
      admissionDate: "2021-07-15",
      emergencyContact: "+91 98765 43211",
      address: "123 Main St, Bangalore, Karnataka"
    },
    {
      id: "STU002",
      name: "Priya Sharma",
      room: "105, Block A",
      course: "Electronics",
      year: "2nd Year",
      contact: "+91 87654 32109",
      email: "priya.sharma@example.com",
      status: "Active",
      avatar: "PS",
      feeStatus: "Paid",
      admissionDate: "2022-07-10",
      emergencyContact: "+91 87654 32108",
      address: "456 Oak Ave, Mumbai, Maharashtra"
    },
    {
      id: "STU003",
      name: "Rahul Singh",
      room: "203, Block A",
      course: "Computer Science",
      year: "3rd Year",
      contact: "+91 76543 21098",
      email: "rahul.singh@example.com",
      status: "On Leave",
      avatar: "RS",
      feeStatus: "Paid",
      admissionDate: "2021-07-12",
      emergencyContact: "+91 76543 21097",
      address: "789 Pine Rd, Delhi"
    },
    {
      id: "STU004",
      name: "Ananya Patel",
      room: "304, Block B",
      course: "Mechanical",
      year: "4th Year",
      contact: "+91 65432 10987",
      email: "ananya.patel@example.com",
      status: "Active",
      avatar: "AP",
      feeStatus: "Pending",
      admissionDate: "2020-07-20",
      emergencyContact: "+91 65432 10986",
      address: "321 Elm St, Hyderabad, Telangana"
    },
    {
      id: "STU005",
      name: "Vikram Mehta",
      room: "210, Block A",
      course: "Civil",
      year: "2nd Year",
      contact: "+91 54321 09876",
      email: "vikram.mehta@example.com",
      status: "Active",
      avatar: "VM",
      feeStatus: "Paid",
      admissionDate: "2022-07-18",
      emergencyContact: "+91 54321 09875",
      address: "654 Maple Dr, Chennai, Tamil Nadu"
    },
    {
      id: "STU006",
      name: "Neha Gupta",
      room: "106, Block A",
      course: "Information Technology",
      year: "1st Year",
      contact: "+91 43210 98765",
      email: "neha.gupta@example.com",
      status: "Active",
      avatar: "NG",
      feeStatus: "Pending",
      admissionDate: "2023-07-05",
      emergencyContact: "+91 43210 98764",
      address: "987 Cedar Ln, Pune, Maharashtra"
    },
  ])

  // State for new student form
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id' | 'avatar' | 'status' | 'feeStatus' | 'admissionDate'>>({
    name: "",
    room: "",
    course: "",
    year: "",
    contact: "",
    email: "",
  })

  // State for editing student
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null)
  const [deleteStudentId, setDeleteStudentId] = useState<string | null>(null)

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCourse = courseFilter === "all" || student.course.toLowerCase().includes(courseFilter.toLowerCase())
    const matchesYear = yearFilter === "all" || student.year.startsWith(yearFilter)
    
    return matchesSearch && matchesCourse && matchesYear
  })

  // Handle adding a new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.contact) {
      toast.error("Please fill in all required fields")
      return
    }

    const initials = newStudent.name.split(' ').map(n => n[0]).join('').toUpperCase()
    const newId = `STU${String(students.length + 1).padStart(3, '0')}`
    
    const addedStudent: Student = {
      ...newStudent,
      id: newId,
      avatar: initials,
      status: "Active",
      feeStatus: "Pending",
      admissionDate: new Date().toISOString().split('T')[0]
    }

    setStudents([...students, addedStudent])
    setNewStudent({
      name: "",
      room: "",
      course: "",
      year: "",
      contact: "",
      email: "",
    })
    toast.success("Student added successfully")
  }

  // Handle updating a student
  const handleUpdateStudent = () => {
    if (!editingStudent) return

    const updatedStudents = students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    )
    
    setStudents(updatedStudents)
    setEditingStudent(null)
    toast.success("Student updated successfully")
  }

  // Handle deleting a student
  const handleDeleteStudent = () => {
    if (!deleteStudentId) return

    setStudents(students.filter(student => student.id !== deleteStudentId))
    setDeleteStudentId(null)
    toast.success("Student deleted successfully")
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
            <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
            <p className="text-muted-foreground text-sm">View and manage all students in the hostel</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                <UserPlus size={16} />
                <span>Add New Student</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the details of the new student to add them to the hostel.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="name" 
                      placeholder="Enter full name" 
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter email address" 
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number <span className="text-red-500">*</span></Label>
                    <Input 
                      id="contact" 
                      placeholder="Enter contact number" 
                      value={newStudent.contact}
                      onChange={(e) => setNewStudent({...newStudent, contact: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select
                      value={newStudent.course}
                      onValueChange={(value) => setNewStudent({...newStudent, course: value})}
                    >
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select
                      value={newStudent.year}
                      onValueChange={(value) => setNewStudent({...newStudent, year: value})}
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room">Room</Label>
                    <Input 
                      id="room" 
                      placeholder="Enter room number" 
                      value={newStudent.room}
                      onChange={(e) => setNewStudent({...newStudent, room: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700" 
                  onClick={handleAddStudent}
                >
                  Add Student
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            title="Active Students"
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
            title="Fee Pending"
            value={students.filter((s) => s.feeStatus === "Pending").length}
            icon={<Wallet className="h-5 w-5" />}
            color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300"
            border="border-red-200 dark:border-red-800"
            hover="hover:border-red-300 dark:hover:border-red-600"
          />
        </div>

        {/* Student Directory */}
        <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Students Directory</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Total of {students.length} students registered in the hostel
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
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[150px] sm:w-[180px] text-sm h-9 sm:h-10">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
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
                <span className="hidden sm:inline">Advanced</span>
              </Button>
            </div>

            {/* Student Table */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Student</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Room</th>
                      {!isMobile && (
                        <>
                          <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Course</th>
                          <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Year</th>
                        </>
                      )}
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Fee Status</th>
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
                          <td className="p-3 sm:p-4 text-sm">{student.room}</td>
                          {!isMobile && (
                            <>
                              <td className="p-3 sm:p-4 text-sm">{student.course}</td>
                              <td className="p-3 sm:p-4 text-sm">{student.year}</td>
                            </>
                          )}
                          <td className="p-3 sm:p-4">
                            <Badge
                              variant="outline"
                              className={
                                student.feeStatus === "Paid"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                  : student.feeStatus === "Pending"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                    : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 text-xs"
                              }
                            >
                              {student.feeStatus}
                            </Badge>
                          </td>
                          <td className="p-3 sm:p-4">
                            <Badge
                              variant="outline"
                              className={
                                student.status === "Active"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                  : student.status === "On Leave"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                    : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 text-xs"
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
                                          <Label className="text-sm">Room</Label>
                                          <p className="font-medium text-sm">{viewingStudent.room}</p>
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
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label className="text-sm">Status</Label>
                                          <Badge
                                            variant="outline"
                                            className={
                                              viewingStudent.status === "Active"
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                                : viewingStudent.status === "On Leave"
                                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs"
                                            }
                                          >
                                            {viewingStudent.status}
                                          </Badge>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-sm">Fee Status</Label>
                                          <Badge
                                            variant="outline"
                                            className={
                                              viewingStudent.feeStatus === "Paid"
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                                : viewingStudent.feeStatus === "Pending"
                                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs"
                                            }
                                          >
                                            {viewingStudent.feeStatus}
                                          </Badge>
                                        </div>
                                      </div>
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
                                    onClick={() => setEditingStudent(student)}
                                  >
                                    <FileEdit className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </DialogTrigger>
                                {editingStudent && (
                                  <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Edit Student</DialogTitle>
                                      <DialogDescription>
                                        Update the details of {editingStudent.name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label htmlFor="edit-name" className="text-sm">Name</Label>
                                          <Input
                                            id="edit-name"
                                            className="text-sm h-9"
                                            value={editingStudent.name}
                                            onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="edit-email" className="text-sm">Email</Label>
                                          <Input
                                            id="edit-email"
                                            type="email"
                                            className="text-sm h-9"
                                            value={editingStudent.email}
                                            onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                                          />
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label htmlFor="edit-contact" className="text-sm">Contact</Label>
                                          <Input
                                            id="edit-contact"
                                            className="text-sm h-9"
                                            value={editingStudent.contact}
                                            onChange={(e) => setEditingStudent({...editingStudent, contact: e.target.value})}
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="edit-room" className="text-sm">Room</Label>
                                          <Input
                                            id="edit-room"
                                            className="text-sm h-9"
                                            value={editingStudent.room}
                                            onChange={(e) => setEditingStudent({...editingStudent, room: e.target.value})}
                                          />
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label htmlFor="edit-course" className="text-sm">Course</Label>
                                          <Select
                                            value={editingStudent.course}
                                            onValueChange={(value) => setEditingStudent({...editingStudent, course: value})}
                                          >
                                            <SelectTrigger id="edit-course" className="text-sm h-9">
                                              <SelectValue placeholder="Select course" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Computer Science" className="text-sm">Computer Science</SelectItem>
                                              <SelectItem value="Electronics" className="text-sm">Electronics</SelectItem>
                                              <SelectItem value="Mechanical" className="text-sm">Mechanical</SelectItem>
                                              <SelectItem value="Civil" className="text-sm">Civil</SelectItem>
                                              <SelectItem value="Information Technology" className="text-sm">Information Technology</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="edit-year" className="text-sm">Year</Label>
                                          <Select
                                            value={editingStudent.year}
                                            onValueChange={(value) => setEditingStudent({...editingStudent, year: value})}
                                          >
                                            <SelectTrigger id="edit-year" className="text-sm h-9">
                                              <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="1st Year" className="text-sm">1st Year</SelectItem>
                                              <SelectItem value="2nd Year" className="text-sm">2nd Year</SelectItem>
                                              <SelectItem value="3rd Year" className="text-sm">3rd Year</SelectItem>
                                              <SelectItem value="4th Year" className="text-sm">4th Year</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label htmlFor="edit-status" className="text-sm">Status</Label>
                                          <Select
                                            value={editingStudent.status}
                                            onValueChange={(value) => setEditingStudent({...editingStudent, status: value as Student['status']})}
                                          >
                                            <SelectTrigger id="edit-status" className="text-sm h-9">
                                              <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Active" className="text-sm">Active</SelectItem>
                                              <SelectItem value="On Leave" className="text-sm">On Leave</SelectItem>
                                              <SelectItem value="Suspended" className="text-sm">Suspended</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-1">
                                          <Label htmlFor="edit-feeStatus" className="text-sm">Fee Status</Label>
                                          <Select
                                            value={editingStudent.feeStatus}
                                            onValueChange={(value) => setEditingStudent({...editingStudent, feeStatus: value as Student['feeStatus']})}
                                          >
                                            <SelectTrigger id="edit-feeStatus" className="text-sm h-9">
                                              <SelectValue placeholder="Select fee status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Paid" className="text-sm">Paid</SelectItem>
                                              <SelectItem value="Pending" className="text-sm">Pending</SelectItem>
                                              <SelectItem value="Overdue" className="text-sm">Overdue</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <Label htmlFor="edit-emergencyContact" className="text-sm">Emergency Contact</Label>
                                        <Input
                                          id="edit-emergencyContact"
                                          className="text-sm h-9"
                                          value={editingStudent.emergencyContact || ""}
                                          onChange={(e) => setEditingStudent({...editingStudent, emergencyContact: e.target.value})}
                                        />
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <Label htmlFor="edit-address" className="text-sm">Address</Label>
                                        <Textarea
                                          id="edit-address"
                                          className="text-sm min-h-[80px]"
                                          value={editingStudent.address || ""}
                                          onChange={(e) => setEditingStudent({...editingStudent, address: e.target.value})}
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
                                        onClick={handleUpdateStudent}
                                      >
                                        Save Changes
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                )}
                              </Dialog>
                              
                              {/* Delete Button */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-200 dark:hover:bg-slate-700 text-red-600 hover:text-red-700"
                                    onClick={() => setDeleteStudentId(student.id)}
                                  >
                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Delete Student</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to delete {student.name}? This action cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline" size="sm">Cancel</Button>
                                    </DialogClose>
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      onClick={handleDeleteStudent}
                                    >
                                      Delete Student
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-muted-foreground text-sm">
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
  value: number;
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