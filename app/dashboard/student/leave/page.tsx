"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { studentNavItems } from "@/components/student/student-nav-items"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function StudentLeavePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock leave applications data
  const leaveApplications = [
    {
      id: "LA-2023-001",
      type: "Medical",
      reason: "Fever and viral infection",
      fromDate: "2023-04-10",
      toDate: "2023-04-15",
      status: "Approved",
      submittedOn: "2023-04-05",
      approvedOn: "2023-04-07",
      approvedBy: "Dr. Sharma (Warden)"
    },
    {
      id: "LA-2023-002",
      type: "Personal",
      reason: "Family function",
      fromDate: "2023-03-20",
      toDate: "2023-03-22",
      status: "Rejected",
      submittedOn: "2023-03-15",
      rejectedOn: "2023-03-17",
      rejectedBy: "Dr. Sharma (Warden)",
      comments: "Too many leaves already taken this semester"
    },
    {
      id: "LA-2023-003",
      type: "Academic",
      reason: "Conference participation",
      fromDate: "2023-05-10",
      toDate: "2023-05-12",
      status: "Pending",
      submittedOn: "2023-05-01"
    }
  ]

  // Filter leave applications based on the active tab
  const filteredApplications = leaveApplications.filter(app => {
    if (activeTab === "all") return true
    if (activeTab === "approved") return app.status === "Approved"
    if (activeTab === "rejected") return app.status === "Rejected"
    if (activeTab === "pending") return app.status === "Pending"
    return false
  })

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
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Leave Applications</h1>
            <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300">
              Apply for leave and track your applications
            </p>
          </div>
          <Button 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>New Application</span>
          </Button>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 dark:bg-slate-800 dark:border-slate-700">
            <TabsTrigger 
              value="all" 
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="dark:data-[state=active]:bg-yellow-600 dark:data-[state=active]:text-white"
            >
              <Clock className="h-4 w-4 sm:mr-2" />
              Pending
            </TabsTrigger>
            <TabsTrigger 
              value="approved" 
              className="dark:data-[state=active]:bg-green-600 dark:data-[state=active]:text-white"
            >
              <CheckCircle className="h-4 w-4 sm:mr-2" />
              Approved
            </TabsTrigger>
            <TabsTrigger 
              value="rejected" 
              className="dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white"
            >
              <AlertCircle className="h-4 w-4 sm:mr-2" />
              Rejected
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="all">
            <LeaveApplicationsList applications={filteredApplications} />
          </TabsContent>
          <TabsContent value="pending">
            <LeaveApplicationsList applications={filteredApplications} />
          </TabsContent>
          <TabsContent value="approved">
            <LeaveApplicationsList applications={filteredApplications} />
          </TabsContent>
          <TabsContent value="rejected">
            <LeaveApplicationsList applications={filteredApplications} />
          </TabsContent>
        </Tabs>

        {/* New Leave Application Dialog */}
        {isDialogOpen && (
          <NewLeaveApplicationDialog onClose={() => setIsDialogOpen(false)} />
        )}
      </div>
    </DashboardLayout>
  )
}

interface LeaveApplication {
  id: string;
  type: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: string;
  submittedOn: string;
  approvedOn?: string;
  approvedBy?: string;
  rejectedOn?: string;
  rejectedBy?: string;
  comments?: string;
}

function LeaveApplicationsList({ applications }: { applications: LeaveApplication[] }) {
  return (
    <Card className="dark:bg-slate-800 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="dark:text-slate-100">Leave Applications</CardTitle>
        <CardDescription className="dark:text-slate-400">
          {applications.length === 0 ? "No leave applications found" : 
           "View and manage your leave applications"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground dark:text-slate-400">No leave applications found</p>
          </div>
        ) : (
          applications.map((app) => (
            <LeaveApplicationCard key={app.id} application={app} />
          ))
        )}
      </CardContent>
    </Card>
  )
}

function LeaveApplicationCard({ application }: { application: LeaveApplication }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow dark:border-slate-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold dark:text-slate-100">{application.type} Leave</h3>
          <Badge
            variant="outline"
            className={
              application.status === "Approved"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : application.status === "Rejected"
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
            }
          >
            {application.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <p className="text-xs text-muted-foreground dark:text-slate-400">ID: {application.id}</p>
          <p className="text-xs text-muted-foreground dark:text-slate-400">|</p>
          <p className="text-xs text-muted-foreground dark:text-slate-400">
            Submitted on: {application.submittedOn}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">
        <span className="font-medium dark:text-slate-300">Reason:</span> {application.reason}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium dark:text-slate-300">From Date</p>
          <p className="text-sm dark:text-slate-400">{application.fromDate}</p>
        </div>
        <div>
          <p className="text-sm font-medium dark:text-slate-300">To Date</p>
          <p className="text-sm dark:text-slate-400">{application.toDate}</p>
        </div>
        <div>
          <p className="text-sm font-medium dark:text-slate-300">Duration</p>
          <p className="text-sm dark:text-slate-400">
            {Math.ceil((new Date(application.toDate).getTime() - new Date(application.fromDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
          </p>
        </div>
      </div>
      {application.status === "Approved" && (
        <div className="mt-2">
          <p className="text-sm font-medium dark:text-slate-300">Approval Details</p>
          <p className="text-sm dark:text-slate-400">
            Approved on {application.approvedOn} by {application.approvedBy}
          </p>
        </div>
      )}
      {application.status === "Rejected" && (
        <div className="mt-2">
          <p className="text-sm font-medium dark:text-slate-300">Rejection Details</p>
          <p className="text-sm dark:text-slate-400">
            Rejected on {application.rejectedOn} by {application.rejectedBy}
          </p>
          {application.comments && (
            <p className="text-sm dark:text-slate-400 mt-1">
              <span className="font-medium">Comments:</span> {application.comments}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function NewLeaveApplicationDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-slate-100">New Leave Application</CardTitle>
          <CardDescription className="dark:text-slate-400">
            Fill in the details for your leave request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="leaveType" className="dark:text-slate-300">Leave Type</Label>
            <Select>
              <SelectTrigger id="leaveType" className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                <SelectItem value="medical" className="dark:hover:bg-slate-700">Medical</SelectItem>
                <SelectItem value="personal" className="dark:hover:bg-slate-700">Personal</SelectItem>
                <SelectItem value="academic" className="dark:hover:bg-slate-700">Academic</SelectItem>
                <SelectItem value="emergency" className="dark:hover:bg-slate-700">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromDate" className="dark:text-slate-300">From Date</Label>
              <Input 
                id="fromDate" 
                type="date" 
                className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toDate" className="dark:text-slate-300">To Date</Label>
              <Input 
                id="toDate" 
                type="date" 
                className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason" className="dark:text-slate-300">Reason</Label>
            <Textarea 
              id="reason" 
              rows={4} 
              placeholder="Provide details about your leave request"
              className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="document" className="dark:text-slate-300">Supporting Document (Optional)</Label>
            <Input 
              id="document" 
              type="file" 
              className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
            />
            <p className="text-xs text-muted-foreground dark:text-slate-400">
              Upload medical certificate or other supporting documents
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            className="dark:border-slate-700 dark:text-slate-300"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            onClick={onClose}
          >
            Submit Application
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}