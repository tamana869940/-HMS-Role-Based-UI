"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, CreditCard, FileText, Home, MessageSquare, Settings, User, Phone, Users, Award, BookOpen } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StudentHeader } from "@/components/student/student-header"
import { studentNavItems } from "@/components/student/student-nav-items"

export default function StudentDashboard() {
  return (
    <DashboardLayout
      userType="student"
      userName="John Doe"
      userRole="Room 203, Block A"
      userAvatar="JD"
      navItems={studentNavItems}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <StudentHeader />

        {/* Quick Stats - 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Room Number Card */}
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 border-indigo-200 dark:border-indigo-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">Room Number</p>
                  <h3 className="text-2xl font-bold mt-1 text-indigo-900 dark:text-white">203</h3>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-800/50 p-3 rounded-full">
                  <Home className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                </div>
              </div>
              <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-2">Block A, Second Floor</p>
            </CardContent>
          </Card>

          {/* Hostel Fee Card */}
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">Hostel Fee</p>
                  <h3 className="text-2xl font-bold mt-1 text-emerald-900 dark:text-white">₹45,000</h3>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-800/50 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                </div>
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2">Paid for current semester</p>
            </CardContent>
          </Card>

          {/* Mess Balance Card */}
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Mess Balance</p>
                  <h3 className="text-2xl font-bold mt-1 text-amber-900 dark:text-white">₹2,500</h3>
                </div>
                <div className="bg-amber-100 dark:bg-amber-800/50 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                </div>
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">Valid until 30 April</p>
            </CardContent>
          </Card>

          {/* Attendance Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Attendance</p>
                  <h3 className="text-2xl font-bold mt-1 text-blue-900 dark:text-white">92%</h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/50 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Good standing</p>
            </CardContent>
          </Card>
        </div>

        {/* Information Grid - Room, Events, Contacts, Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Information */}
          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-indigo-800 dark:text-indigo-100">Room Information</CardTitle>
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                  <Home className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                </div>
              </div>
              <CardDescription className="text-indigo-600 dark:text-indigo-400">
                Details about your accommodation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Room Number</p>
                  <p className="font-medium">203</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Block</p>
                  <p className="font-medium">A</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Floor</p>
                  <p className="font-medium">Second</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="font-medium">Double Sharing</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Roommate</p>
                  <p className="font-medium">Rahul Singh</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Check-in Date</p>
                  <p className="font-medium">15 Jan 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-teal-200 dark:border-teal-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-teal-800 dark:text-teal-100">Upcoming Events</CardTitle>
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30">
                  <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                </div>
              </div>
              <CardDescription className="text-teal-600 dark:text-teal-400">
                Stay updated with hostel events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                  <Award className="h-4 w-4 text-teal-600 dark:text-teal-300" />
                </div>
                <div>
                  <h4 className="font-medium">Sports Day</h4>
                  <p className="text-sm text-muted-foreground">April 15 • 9:00 AM - 5:00 PM</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="text-teal-600 dark:text-teal-300">Main Ground</Badge>
                    <Badge variant="outline" className="bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-300">Compulsory</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                  <Users className="h-4 w-4 text-teal-600 dark:text-teal-300" />
                </div>
                <div>
                  <h4 className="font-medium">Cultural Fest</h4>
                  <p className="text-sm text-muted-foreground">May 10 • 6:00 PM - 10:00 PM</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="text-teal-600 dark:text-teal-300">Auditorium</Badge>
                    <Badge variant="outline" className="bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-300">Register Now</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                  <BookOpen className="h-4 w-4 text-teal-600 dark:text-teal-300" />
                </div>
                <div>
                  <h4 className="font-medium">Annual Day</h4>
                  <p className="text-sm text-muted-foreground">June 5 • 4:00 PM - 8:00 PM</p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline" className="text-teal-600 dark:text-teal-300">Main Hall</Badge>
                    <Badge variant="outline" className="bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-300">Formal Dress</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Contacts */}
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-800 dark:text-blue-100">Important Contacts</CardTitle>
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Phone className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Reach out for assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Warden</h4>
                  <p className="text-sm text-muted-foreground">Dr. Rajesh Kumar</p>
                </div>
                <a href="tel:+919876543210" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  +91 9876543210
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Home className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Reception</h4>
                  <p className="text-sm text-muted-foreground">24/7 Available</p>
                </div>
                <a href="tel:+911234567890" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  +91 1234567890
                </a>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Security</h4>
                  <p className="text-sm text-muted-foreground">Emergency</p>
                </div>
                <a href="tel:+911122334455" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  +91 1122334455
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-emerald-800 dark:text-emerald-100">Recent Transactions</CardTitle>
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                </div>
              </div>
              <CardDescription className="text-emerald-600 dark:text-emerald-400">
                Your payment history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <Home className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-medium">Hostel Fee</h4>
                    <p className="text-sm text-muted-foreground">March 1, 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-emerald-600 dark:text-emerald-400">₹45,000</p>
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-200">Paid</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mess Fee</h4>
                    <p className="text-sm text-muted-foreground">March 15, 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-emerald-600 dark:text-emerald-400">₹2,500</p>
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-200">Paid</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-medium">Library Fee</h4>
                    <p className="text-sm text-muted-foreground">March 20, 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-emerald-600 dark:text-emerald-400">₹1,000</p>
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-200">Paid</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full border-emerald-300 text-emerald-600 dark:border-emerald-600 dark:text-emerald-300">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}