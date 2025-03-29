"use client"

import { SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Clock, Wrench, CheckCircle, AlertCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { studentNavItems } from "@/components/student/student-nav-items"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedComplaint, setSelectedComplaint] = useState<{
    id: string;
    type: string;
    issue: string;
    date: string;
    status: string;
    description: string;
    assignedTo: string;
    comments: { user: string; text: string; date: string }[];
  } | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for complaints
  const complaints = [
    {
      id: "C-2023-001",
      type: "Plumbing",
      issue: "Sink leaking in common bathroom",
      date: "2023-04-02",
      status: "In Progress",
      description: "The sink in the common bathroom is leaking. Water is accumulating on the floor creating a slippery surface.",
      assignedTo: "Maintenance Staff",
      comments: [
        { user: "Admin", text: "Maintenance team has been notified", date: "2023-04-02" },
        { user: "Maintenance", text: "Will check today", date: "2023-04-03" },
      ],
    },
    {
      id: "C-2023-002",
      type: "Wi-Fi",
      issue: "Poor connectivity in room",
      date: "2023-03-15",
      status: "Resolved",
      description: "Unable to connect to the hostel Wi-Fi network from Room 203. The signal is weak and keeps disconnecting.",
      assignedTo: "IT Support",
      comments: [
        { user: "Admin", text: "IT team will check the router", date: "2023-03-16" },
        { user: "IT Support", text: "Router has been replaced", date: "2023-03-18" },
        { user: "Admin", text: "Issue resolved", date: "2023-03-20" },
      ],
    },
    {
      id: "C-2023-003",
      type: "Electrical",
      issue: "Power socket not working",
      date: "2023-03-10",
      status: "Pending",
      description: "The power socket near my bed is not working. I've tried plugging in different devices but none work.",
      assignedTo: "Pending Assignment",
      comments: [],
    },
  ]

  // Filter complaints based on search term and active tab
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = 
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.issue.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "pending" && complaint.status === "Pending") ||
      (activeTab === "in-progress" && complaint.status === "In Progress") ||
      (activeTab === "resolved" && complaint.status === "Resolved")
    
    return matchesSearch && matchesTab
  })

  const handleViewDetails = (complaint: SetStateAction<{ id: string; type: string; issue: string; date: string; status: string; description: string; assignedTo: string; comments: { user: string; text: string; date: string }[] } | null>) => {
    setSelectedComplaint(complaint)
    setIsDetailsOpen(true)
  }

  return (
    <DashboardLayout
      userType="student"
      userName="John Doe"
      userRole="Room 203, Block A"
      userAvatar="JD"
      navItems={studentNavItems} // Using the imported studentNavItems
    >
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Complaints & Requests</h1>
            <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300">
              Submit and track your complaints and maintenance requests
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Complaint</span>
                <span className="sm:hidden">New</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] dark:bg-slate-800 dark:border-slate-700">
              <DialogHeader>
                <DialogTitle className="dark:text-slate-100">Submit New Complaint</DialogTitle>
                <DialogDescription className="dark:text-slate-400">
                  Fill in the details of your complaint or maintenance request
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="complaint-type" className="dark:text-slate-300">Complaint Type</Label>
                  <Select>
                    <SelectTrigger id="complaint-type" className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="plumbing" className="dark:hover:bg-slate-700">Plumbing</SelectItem>
                      <SelectItem value="electrical" className="dark:hover:bg-slate-700">Electrical</SelectItem>
                      <SelectItem value="wifi" className="dark:hover:bg-slate-700">Wi-Fi/Internet</SelectItem>
                      <SelectItem value="furniture" className="dark:hover:bg-slate-700">Furniture</SelectItem>
                      <SelectItem value="cleaning" className="dark:hover:bg-slate-700">Cleaning</SelectItem>
                      <SelectItem value="other" className="dark:hover:bg-slate-700">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complaint-title" className="dark:text-slate-300">Title</Label>
                  <Input 
                    id="complaint-title" 
                    placeholder="Brief title of your complaint" 
                    className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complaint-description" className="dark:text-slate-300">Description</Label>
                  <Textarea
                    id="complaint-description"
                    placeholder="Provide detailed information about your complaint"
                    rows={5}
                    className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complaint-location" className="dark:text-slate-300">Location</Label>
                  <Input
                    id="complaint-location"
                    placeholder="Where is the issue located?"
                    defaultValue="Room 203, Block A"
                    className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                >
                  Submit Complaint
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 dark:bg-slate-800 dark:border-slate-700">
            <TabsTrigger value="all" className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white">
              <span className="hidden sm:inline">All</span>
              <span className="sm:hidden">All</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">
              <AlertCircle className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Pending</span>
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="dark:data-[state=active]:bg-yellow-600 dark:data-[state=active]:text-white">
              <Wrench className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">In Progress</span>
            </TabsTrigger>
            <TabsTrigger value="resolved" className="dark:data-[state=active]:bg-green-600 dark:data-[state=active]:text-white">
              <CheckCircle className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Resolved</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ComplaintsList 
              complaints={filteredComplaints} 
              onViewDetails={handleViewDetails} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeTab={activeTab}
            />
          </TabsContent>

          <TabsContent value="pending">
            <ComplaintsList 
              complaints={filteredComplaints} 
              onViewDetails={handleViewDetails} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeTab={activeTab}
            />
          </TabsContent>

          <TabsContent value="in-progress">
            <ComplaintsList 
              complaints={filteredComplaints} 
              onViewDetails={handleViewDetails} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeTab={activeTab}
            />
          </TabsContent>

          <TabsContent value="resolved">
            <ComplaintsList 
              complaints={filteredComplaints} 
              onViewDetails={handleViewDetails} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeTab={activeTab}
            />
          </TabsContent>
        </Tabs>

        {/* Complaint Details Dialog */}
        {selectedComplaint && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="sm:max-w-[600px] dark:bg-slate-800 dark:border-slate-700">
              <DialogHeader>
                <DialogTitle className="dark:text-slate-100">Complaint Details</DialogTitle>
                <DialogDescription className="dark:text-slate-400">
                  Detailed information about your complaint
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="dark:text-slate-300">Complaint ID</Label>
                    <p className="text-sm dark:text-slate-200">{selectedComplaint.id}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="dark:text-slate-300">Status</Label>
                    <Badge
                      variant="outline"
                      className={
                        selectedComplaint.status === "Resolved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : selectedComplaint.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }
                    >
                      {selectedComplaint.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="dark:text-slate-300">Type</Label>
                    <p className="text-sm dark:text-slate-200">{selectedComplaint.type}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="dark:text-slate-300">Date Submitted</Label>
                    <p className="text-sm dark:text-slate-200">{selectedComplaint.date}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="dark:text-slate-300">Issue</Label>
                  <p className="text-sm font-medium dark:text-slate-200">{selectedComplaint.issue}</p>
                </div>

                <div className="space-y-1">
                  <Label className="dark:text-slate-300">Description</Label>
                  <p className="text-sm dark:text-slate-200">{selectedComplaint.description}</p>
                </div>

                <div className="space-y-1">
                  <Label className="dark:text-slate-300">Assigned To</Label>
                  <p className="text-sm dark:text-slate-200">{selectedComplaint.assignedTo}</p>
                </div>

                {selectedComplaint.comments.length > 0 && (
                  <div className="space-y-2">
                    <Label className="dark:text-slate-300">Updates</Label>
                    <div className="space-y-3">
                      {selectedComplaint.comments.map((comment, index) => (
                        <div key={index} className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/50">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium dark:text-slate-200">{comment.user}</p>
                            <p className="text-xs text-muted-foreground dark:text-slate-400">{comment.date}</p>
                          </div>
                          <p className="text-sm mt-1 dark:text-slate-300">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  )
}

function ComplaintsList({
  complaints,
  onViewDetails,
  searchTerm,
  setSearchTerm,
  activeTab,
}: {
  complaints: {
    id: string;
    type: string;
    issue: string;
    date: string;
    status: string;
    description: string;
    assignedTo: string;
    comments: { user: string; text: string; date: string }[];
  }[];
  onViewDetails: (complaint: {
    id: string;
    type: string;
    issue: string;
    date: string;
    status: string;
    description: string;
    assignedTo: string;
    comments: { user: string; text: string; date: string }[];
  }) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
}) {
  return (
    <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-900/80 border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="dark:text-slate-100">
              {activeTab === "all" && "All Complaints"}
              {activeTab === "pending" && "Pending Complaints"}
              {activeTab === "in-progress" && "In Progress Complaints"}
              {activeTab === "resolved" && "Resolved Complaints"}
            </CardTitle>
            <CardDescription className="dark:text-slate-400">
              {activeTab === "all" && "View all your submitted complaints and requests"}
              {activeTab === "pending" && "Complaints awaiting action"}
              {activeTab === "in-progress" && "Complaints currently being addressed"}
              {activeTab === "resolved" && "Successfully resolved complaints"}
            </CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
            <Input
              type="search"
              placeholder="Search complaints..."
              className="pl-8 w-full md:w-[250px] dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complaints.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground dark:text-slate-400">
                {activeTab === "all" && "No complaints found"}
                {activeTab === "pending" && "No pending complaints"}
                {activeTab === "in-progress" && "No complaints in progress"}
                {activeTab === "resolved" && "No resolved complaints"}
              </p>
            </div>
          ) : (
            complaints.map((complaint) => (
              <div 
                key={complaint.id} 
                className="border rounded-lg p-4 hover:shadow-md transition-shadow border-slate-200 dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold dark:text-slate-100">{complaint.issue}</h3>
                    <Badge
                      variant="outline"
                      className={
                        complaint.status === "Resolved"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300"
                          : complaint.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300"
                      }
                    >
                      {complaint.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <p className="text-xs text-muted-foreground dark:text-slate-400">ID: {complaint.id}</p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">|</p>
                    <p className="text-xs text-muted-foreground dark:text-slate-400">{complaint.date}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">
                  {complaint.description}
                </p>

                {complaint.comments.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2 dark:text-slate-300">Comments:</p>
                    <div className="space-y-2 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                      {complaint.comments.map((comment, index) => (
                        <div key={index} className="text-sm dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{comment.user}:</span>
                            <span className="text-xs text-muted-foreground dark:text-slate-500">
                              {comment.date}
                            </span>
                          </div>
                          <p>{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-600 dark:text-indigo-300 dark:hover:bg-indigo-900/30"
                    onClick={() => onViewDetails(complaint)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}