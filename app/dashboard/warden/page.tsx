"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Bell,
  Building,
  Calendar,
  CheckCircle,
  FileText,
  Home,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function WardenDashboard() {
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

  return (
    <DashboardLayout
      userType="warden"
      userName="Dr. Rajesh Kumar"
      userRole="Hostel Warden"
      userAvatar="RK"
      navItems={navItems}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Warden Dashboard</h1>
            <p className="text-muted-foreground dark:text-slate-400">Welcome, Dr. Rajesh Kumar</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
              <Input type="search" placeholder="Search..." className="w-full md:w-[200px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Total Students</p>
                  <h3 className="text-2xl font-bold mt-1">450</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground dark:text-slate-400 mt-2">Under your supervision</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Students Present</p>
                  <h3 className="text-2xl font-bold mt-1">425</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">94% attendance rate</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Pending Complaints</p>
                  <h3 className="text-2xl font-bold mt-1">12</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-xs text-yellow-600 mt-2">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Leave Requests</p>
                  <h3 className="text-2xl font-bold mt-1">8</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">Pending approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="leave">Leave Applications</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription className="dark:text-slate-400">Latest actions in the hostel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 py-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Student Check-in</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">2 hours ago</p>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            Amit Kumar returned to hostel after weekend leave
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-2">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Complaint Resolved</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">5 hours ago</p>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">Electrical issue in Room 105 has been fixed</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-2">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <MessageSquare className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">New Complaint</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">Yesterday</p>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">Plumbing issue reported in Room 203, Block A</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-2">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Leave Approved</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">Yesterday</p>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-slate-400">
                            Rahul Singh's weekend leave request has been approved
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Block-wise Student Distribution</CardTitle>
                    <CardDescription className="dark:text-slate-400">Number of students in each hostel block</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">Block A</p>
                          <p className="text-sm font-medium">180 students</p>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">Block B</p>
                          <p className="text-sm font-medium">170 students</p>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">Block C</p>
                          <p className="text-sm font-medium">100 students</p>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: "50%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                    <CardDescription className="dark:text-slate-400">Items requiring your attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Leave Application</h3>
                          <Badge>Urgent</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                          Priya Sharma (Room 105) has requested medical leave from Apr 10-12.
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="w-full">
                            Reject
                          </Button>
                          <Button size="sm" className="w-full">
                            Approve
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Night Out Permission</h3>
                          <Badge variant="outline">New</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-slate-400 mb-2">
                          John Doe (Room 203) has requested permission to stay out on April 15.
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="w-full">
                            Reject
                          </Button>
                          <Button size="sm" className="w-full">
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 h-12 w-12 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Cultural Night</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">April 15, 2023</p>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 h-12 w-12 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Sports Day</p>
                            <p className="text-sm text-muted-foreground dark:text-slate-400">April 22, 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
      </Tabs>
    </div>
  </DashboardLayout>
  )
}

