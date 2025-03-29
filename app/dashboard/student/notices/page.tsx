"use client"

import { JSX, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, BellOff, AlertTriangle, Info } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { studentNavItems } from "@/components/student/student-nav-items"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the type for a notice
interface Notice {
  id: string
  title: string
  category: string
  content: string
  date: string
  priority: "high" | "medium" | "low"
  issuedBy: string
  read: boolean
}

export default function StudentNoticePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  // Mock notices data
  const notices: Notice[] = [
    {
      id: "N-2023-001",
      title: "Hostel Maintenance Shutdown",
      category: "maintenance",
      content: "There will be a water supply shutdown on 15th April from 9 AM to 5 PM for maintenance work. Please store water accordingly.",
      date: "2023-04-10",
      priority: "high",
      issuedBy: "Hostel Office",
      read: false,
    },
    {
      id: "N-2023-002",
      title: "Semester End Celebration",
      category: "event",
      content: "The hostel will organize a semester-end celebration on 20th May at the common area. All students are invited.",
      date: "2023-04-05",
      priority: "low",
      issuedBy: "Student Council",
      read: true,
    },
    {
      id: "N-2023-003",
      title: "New Mess Menu",
      category: "mess",
      content: "The mess menu has been updated starting next week. Please check the notice board for details.",
      date: "2023-04-08",
      priority: "medium",
      issuedBy: "Mess Committee",
      read: false,
    },
    {
      id: "N-2023-004",
      title: "Emergency Drill",
      category: "safety",
      content: "An emergency drill will be conducted on 25th April. Please participate actively.",
      date: "2023-04-12",
      priority: "high",
      issuedBy: "Hostel Office",
      read: true,
    },
    {
      id: "N-2023-005",
      title: "Library Hours Extension",
      category: "academic",
      content: "The library hours have been extended till 10 PM starting next week.",
      date: "2023-04-15",
      priority: "low",
      issuedBy: "Library Committee",
      read: false,
    },
  ]

  // Filter notices based on active tab, search term, and category
  const filteredNotices = notices.filter((notice) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notice.read) ||
      (activeTab === "high" && notice.priority === "high")

    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || notice.category === filterCategory

    return matchesTab && matchesSearch && matchesCategory
  })

  const getPriorityIcon = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Info className="h-4 w-4 text-yellow-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
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
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Notice Board</h1>
            <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300">
              Important announcements and updates from hostel administration
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[150px] dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="all" className="dark:hover:bg-slate-700">
                  All Categories
                </SelectItem>
                <SelectItem value="maintenance" className="dark:hover:bg-slate-700">
                  Maintenance
                </SelectItem>
                <SelectItem value="event" className="dark:hover:bg-slate-700">
                  Events
                </SelectItem>
                <SelectItem value="mess" className="dark:hover:bg-slate-700">
                  Mess
                </SelectItem>
                <SelectItem value="safety" className="dark:hover:bg-slate-700">
                  Safety
                </SelectItem>
                <SelectItem value="academic" className="dark:hover:bg-slate-700">
                  Academic
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search notices..."
                className="pl-8 w-full md:w-[250px] dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Bell className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 dark:bg-slate-800 dark:border-slate-700">
            <TabsTrigger
              value="all"
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>All Notices</span>
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="dark:data-[state=active]:bg-yellow-600 dark:data-[state=active]:text-white"
            >
              <BellOff className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>Unread</span>
            </TabsTrigger>
            <TabsTrigger
              value="high"
              className="dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white"
            >
              <AlertTriangle className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>High Priority</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="all">
            <NoticesList notices={filteredNotices} getPriorityIcon={getPriorityIcon} />
          </TabsContent>
          <TabsContent value="unread">
            <NoticesList notices={filteredNotices} getPriorityIcon={getPriorityIcon} />
          </TabsContent>
          <TabsContent value="high">
            <NoticesList notices={filteredNotices} getPriorityIcon={getPriorityIcon} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function NoticesList({
  notices,
  getPriorityIcon,
}: {
  notices: Notice[]
  getPriorityIcon: (priority: "high" | "medium" | "low") => JSX.Element
}) {
  return (
    <Card className="dark:bg-slate-800 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="dark:text-slate-100">Notices</CardTitle>
        <CardDescription className="dark:text-slate-400">
          {notices.length === 0
            ? "No notices found"
            : `Showing ${notices.length} notice${notices.length !== 1 ? "s" : ""}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground dark:text-slate-400">No notices match your filters</p>
            </div>
          ) : (
            notices.map((notice) => (
              <div
                key={notice.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(notice.priority)}
                    <h3 className="font-semibold dark:text-slate-100">{notice.title}</h3>
                    <Badge
                      variant="outline"
                      className="capitalize dark:border-slate-700 dark:text-slate-300"
                    >
                      {notice.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <p className="text-xs text-muted-foreground dark:text-slate-400">ID: {notice.id}</p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">|</p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">
                      Posted on: {notice.date}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">{notice.content}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground dark:text-slate-400">
                    Issued by: {notice.issuedBy}
                  </p>
                  <Badge
                    variant="outline"
                    className={
                      notice.priority === "high"
                        ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300"
                        : notice.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
                    }
                  >
                    {notice.priority} priority
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}