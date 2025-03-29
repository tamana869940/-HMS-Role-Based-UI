"use client"

import { JSX, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Bookmark, Calendar, Clock, GraduationCap, Library, NotebookPen, School } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { studentNavItems } from "@/components/student/student-nav-items"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the type for academic records
interface AcademicRecord {
  id: string
  courseCode: string
  courseName: string
  instructor: string
  schedule: {
    day: string
    time: string
    room: string
  }
  credits: number
  attendance: {
    present: number
    total: number
    percentage: number
  }
  assignments: {
    pending: number
    submitted: number
    graded: number
  }
  exams: {
    upcoming: boolean
    date?: string
    type?: "midterm" | "final" | "quiz"
  }
}

export default function academics() {
  const [activeTab, setActiveTab] = useState("current")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSemester, setFilterSemester] = useState("all")

  // Mock academic data
  const academicRecords: AcademicRecord[] = [
    {
      id: "CS-101",
      courseCode: "CS-101",
      courseName: "Introduction to Computer Science",
      instructor: "Dr. Smith",
      schedule: {
        day: "Mon, Wed",
        time: "10:00 AM - 11:30 AM",
        room: "CS-202"
      },
      credits: 4,
      attendance: {
        present: 12,
        total: 15,
        percentage: 80
      },
      assignments: {
        pending: 1,
        submitted: 3,
        graded: 2
      },
      exams: {
        upcoming: true,
        date: "2023-11-15",
        type: "midterm"
      }
    },
    {
      id: "MATH-201",
      courseCode: "MATH-201",
      courseName: "Linear Algebra",
      instructor: "Prof. Johnson",
      schedule: {
        day: "Tue, Thu",
        time: "1:00 PM - 2:30 PM",
        room: "MATH-105"
      },
      credits: 3,
      attendance: {
        present: 14,
        total: 15,
        percentage: 93
      },
      assignments: {
        pending: 0,
        submitted: 4,
        graded: 4
      },
      exams: {
        upcoming: false
      }
    },
    {
      id: "PHYS-101",
      courseCode: "PHYS-101",
      courseName: "General Physics",
      instructor: "Dr. Williams",
      schedule: {
        day: "Mon, Fri",
        time: "3:00 PM - 4:30 PM",
        room: "PHYS-301"
      },
      credits: 4,
      attendance: {
        present: 10,
        total: 15,
        percentage: 67
      },
      assignments: {
        pending: 2,
        submitted: 2,
        graded: 1
      },
      exams: {
        upcoming: true,
        date: "2023-11-20",
        type: "quiz"
      }
    },
    {
      id: "ENG-102",
      courseCode: "ENG-102",
      courseName: "Academic Writing",
      instructor: "Prof. Davis",
      schedule: {
        day: "Wed",
        time: "9:00 AM - 12:00 PM",
        room: "ENG-204"
      },
      credits: 2,
      attendance: {
        present: 5,
        total: 5,
        percentage: 100
      },
      assignments: {
        pending: 1,
        submitted: 2,
        graded: 1
      },
      exams: {
        upcoming: false
      }
    }
  ]

  // Filter records based on active tab, search term, and semester
  const filteredRecords = academicRecords.filter((record) => {
    const matchesTab =
      activeTab === "current" ||
      (activeTab === "upcoming" && record.exams.upcoming) ||
      (activeTab === "attendance" && record.attendance.percentage < 75)

    const matchesSearch =
      record.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    // In a real app, you would filter by semester too
    const matchesSemester = filterSemester === "all" || true

    return matchesTab && matchesSearch && matchesSemester
  })

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    if (percentage >= 75) return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  }

  return (
    <DashboardLayout
      userType="student"
      userName="John Doe"
      userRole="Room 203, Block A"
      userAvatar="JD"
      navItems={studentNavItems}
    >
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Academic Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300">
              Track your courses, attendance, and academic progress
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={filterSemester} onValueChange={setFilterSemester}>
              <SelectTrigger className="w-[150px] dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200">
                <SelectValue placeholder="Filter by semester" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="all" className="dark:hover:bg-slate-700">
                  All Semesters
                </SelectItem>
                <SelectItem value="fall-2023" className="dark:hover:bg-slate-700">
                  Fall 2023
                </SelectItem>
                <SelectItem value="spring-2023" className="dark:hover:bg-slate-700">
                  Spring 2023
                </SelectItem>
                <SelectItem value="summer-2023" className="dark:hover:bg-slate-700">
                  Summer 2023
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-8 w-full md:w-[250px] dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <BookOpen className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-slate-300">
                Current Courses
              </CardTitle>
              <School className="h-4 w-4 text-muted-foreground dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-slate-100">{academicRecords.length}</div>
              <p className="text-xs text-muted-foreground dark:text-slate-400">
                Total registered courses
              </p>
            </CardContent>
          </Card>
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-slate-300">
                Total Credits
              </CardTitle>
              <Bookmark className="h-4 w-4 text-muted-foreground dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-slate-100">
                {academicRecords.reduce((sum, record) => sum + record.credits, 0)}
              </div>
              <p className="text-xs text-muted-foreground dark:text-slate-400">
                Current semester credits
              </p>
            </CardContent>
          </Card>
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-slate-300">
                Average Attendance
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-slate-100">
                {Math.round(
                  academicRecords.reduce((sum, record) => sum + record.attendance.percentage, 0) /
                    academicRecords.length
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground dark:text-slate-400">
                Across all courses
              </p>
            </CardContent>
          </Card>
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-slate-300">
                Pending Assignments
              </CardTitle>
              <NotebookPen className="h-4 w-4 text-muted-foreground dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-slate-100">
                {academicRecords.reduce((sum, record) => sum + record.assignments.pending, 0)}
              </div>
              <p className="text-xs text-muted-foreground dark:text-slate-400">
                To be submitted
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="current" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 dark:bg-slate-800 dark:border-slate-700">
            <TabsTrigger
              value="current"
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>Current Courses</span>
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="dark:data-[state=active]:bg-yellow-600 dark:data-[state=active]:text-white"
            >
              <Clock className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>Upcoming Exams</span>
            </TabsTrigger>
            <TabsTrigger
              value="attendance"
              className="dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white"
            >
              <GraduationCap className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>Low Attendance</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="current">
            <AcademicRecordsList records={filteredRecords} getAttendanceColor={getAttendanceColor} />
          </TabsContent>
          <TabsContent value="upcoming">
            <AcademicRecordsList records={filteredRecords} getAttendanceColor={getAttendanceColor} />
          </TabsContent>
          <TabsContent value="attendance">
            <AcademicRecordsList records={filteredRecords} getAttendanceColor={getAttendanceColor} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function AcademicRecordsList({
  records,
  getAttendanceColor,
}: {
  records: AcademicRecord[]
  getAttendanceColor: (percentage: number) => string
}) {
  return (
    <Card className="dark:bg-slate-800 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="dark:text-slate-100">Academic Records</CardTitle>
        <CardDescription className="dark:text-slate-400">
          {records.length === 0
            ? "No records found"
            : `Showing ${records.length} course${records.length !== 1 ? "s" : ""}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {records.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground dark:text-slate-400">No records match your filters</p>
            </div>
          ) : (
            records.map((record) => (
              <div
                key={record.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Library className="h-4 w-4 text-indigo-500" />
                    <h3 className="font-semibold dark:text-slate-100">
                      {record.courseCode} - {record.courseName}
                    </h3>
                    <Badge
                      variant="outline"
                      className="capitalize dark:border-slate-700 dark:text-slate-300"
                    >
                      {record.credits} credits
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground dark:text-slate-400 mt-1 md:mt-0">
                    Instructor: {record.instructor}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1 dark:text-slate-300">Schedule</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {record.schedule.day}, {record.schedule.time}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground dark:text-slate-400 ml-6">
                      Room: {record.schedule.room}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1 dark:text-slate-300">Attendance</h4>
                    <Badge
                      variant="outline"
                      className={getAttendanceColor(record.attendance.percentage)}
                    >
                      {record.attendance.percentage}% ({record.attendance.present}/{record.attendance.total})
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1 dark:text-slate-300">Assignments</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        Submitted: {record.assignments.submitted}
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        Pending: {record.assignments.pending}
                      </Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Graded: {record.assignments.graded}
                      </Badge>
                    </div>
                  </div>
                </div>

                {record.exams.upcoming && (
                  <div className="mt-4 pt-4 border-t dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium dark:text-slate-300">Upcoming Exam</span>
                      <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        {record.exams.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground dark:text-slate-400">
                        on {record.exams.date}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}