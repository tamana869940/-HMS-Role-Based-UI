"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminHeader } from "@/components/admin/admin-header"
import { adminNavItems } from "@/components/admin/admin-nav-items"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Building, 
  CreditCard, 
  FileText, 
  User, 
  MessageSquare, 
  Calendar, 
  Search, 
  ArrowRight,
  Home,
  BookOpen,
  Wallet
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function AdminDashboard() {
  const isMobile = useIsMobile("(max-width: 640px)")

  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userRole="Hostel Administrator"
      userAvatar="AD"
      navItems={adminNavItems}
    >
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        <AdminHeader />
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard 
            title="Total Students"
            value="450"
            description="Across all blocks"
            icon={<Users className="h-5 w-5" />}
            color="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
            border="border-indigo-200 dark:border-indigo-800"
            hover="hover:border-indigo-300 dark:hover:border-indigo-600"
          />
          
          <StatCard 
            title="Rooms Occupied"
            value="215/250"
            description="86% occupancy rate"
            icon={<Building className="h-5 w-5" />}
            color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
            border="border-emerald-200 dark:border-emerald-800"
            hover="hover:border-emerald-300 dark:hover:border-emerald-600"
            trend="up"
          />
          
          <StatCard 
            title="Total Revenue"
            value="₹45,75,000"
            description="Current semester"
            icon={<CreditCard className="h-5 w-5" />}
            color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
            border="border-blue-200 dark:border-blue-800"
            hover="hover:border-blue-300 dark:hover:border-blue-600"
          />
          
          <StatCard 
            title="Pending Requests"
            value="24"
            description="Requires attention"
            icon={<FileText className="h-5 w-5" />}
            color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300"
            border="border-amber-200 dark:border-amber-800"
            hover="hover:border-amber-300 dark:hover:border-amber-600"
            trend="up"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-slate-100 dark:bg-slate-800 p-1 h-auto flex-wrap">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
            >
              <Home className="h-4 w-4 mr-1 sm:mr-2" />
              {!isMobile && "Overview"}
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
            >
              <Users className="h-4 w-4 mr-1 sm:mr-2" />
              {!isMobile && "Students"}
            </TabsTrigger>
            <TabsTrigger 
              value="rooms" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
            >
              <Building className="h-4 w-4 mr-1 sm:mr-2" />
              {!isMobile && "Rooms"}
            </TabsTrigger>
            <TabsTrigger 
              value="payments" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
            >
              <Wallet className="h-4 w-4 mr-1 sm:mr-2" />
              {!isMobile && "Payments"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <RecentActivities />
                <OccupancyStatus />
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <PendingApprovals />
                <UpcomingEvents />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <StudentDirectory />
          </TabsContent>

          <TabsContent value="rooms">
            <div className="flex items-center justify-center h-64 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
              <div className="text-center space-y-2">
                <Building className="mx-auto h-8 w-8 text-slate-400" />
                <h3 className="font-medium text-sm">Rooms Management</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Room allocation and management will appear here
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="flex items-center justify-center h-64 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
              <div className="text-center space-y-2">
                <CreditCard className="mx-auto h-8 w-8 text-slate-400" />
                <h3 className="font-medium text-sm">Payment Records</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Payment history and transactions will appear here
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  border: string;
  hover: string;
  trend?: 'up' | 'down';
}

function StatCard({ title, value, description, icon, color, border, hover, trend }: StatCardProps) {
  return (
    <Card className={`border ${border} ${hover} transition-colors duration-200 dark:bg-slate-800/50 group`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground dark:text-slate-400 mb-1">{title}</p>
            <h3 className="text-xl sm:text-2xl font-bold">{value}</h3>
            <div className="flex items-center mt-1 sm:mt-2">
              {trend && (
                <Badge 
                  variant={trend === 'up' ? 'default' : 'destructive'} 
                  className="mr-1 sm:mr-2 px-1 py-0 text-xs"
                >
                  {trend === 'up' ? '↑ 12%' : '↓ 5%'}
                </Badge>
              )}
              <p className="text-xs text-muted-foreground dark:text-slate-400">{description}</p>
            </div>
          </div>
          <div className={`${color} p-2 sm:p-3 rounded-lg group-hover:scale-105 transition-transform`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Recent Activities Component
function RecentActivities() {
  const activities = [
    {
      icon: <User className="h-4 w-4" />,
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300",
      title: "New Student Registration",
      time: "2 hours ago",
      description: "Amit Kumar was assigned to Room 304, Block B"
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300",
      title: "Payment Received",
      time: "5 hours ago",
      description: "Hostel fee payment of ₹45,000 received from Priya Sharma"
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      iconBg: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300",
      title: "New Complaint",
      time: "Yesterday",
      description: "Electrical issue reported in Room 105, Block A"
    },
    {
      icon: <FileText className="h-4 w-4" />,
      iconBg: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
      title: "Leave Application",
      time: "Yesterday",
      description: "Rahul Singh applied for weekend leave (Apr 14-16)"
    }
  ];

  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center justify-between text-base sm:text-lg">
          Recent Activities
          <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm">
            View All <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </CardTitle>
        <CardDescription className="dark:text-slate-400 text-xs sm:text-sm">
          Latest actions in the hostel management system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-2 sm:p-6 pt-0">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 p-2 sm:p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
          >
            <div className={`${activity.iconBg} p-2 rounded-lg mt-0.5 flex-shrink-0`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-sm sm:text-base truncate">{activity.title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400 whitespace-nowrap">
                  {activity.time}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400 mt-1 truncate">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Occupancy Status Component
function OccupancyStatus() {
  interface Block {
    name: string;
    percentage: number;
    occupied: number;
    total: number;
  }

  const blocks: Block[] = [
    { name: "Block A", percentage: 90, occupied: 90, total: 100 },
    { name: "Block B", percentage: 85, occupied: 85, total: 100 },
    { name: "Block C", percentage: 80, occupied: 40, total: 50 }
  ];

  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Occupancy Status</CardTitle>
        <CardDescription className="dark:text-slate-400 text-xs sm:text-sm">
          Current room occupancy by block
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
        {blocks.map((block, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <p className="font-medium text-sm sm:text-base">{block.name}</p>
              <p className="text-xs sm:text-sm font-medium">
                <span className="text-emerald-600 dark:text-emerald-400">{block.percentage}%</span> 
                <span className="text-muted-foreground dark:text-slate-400"> ({block.occupied}/{block.total})</span>
              </p>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full" 
                style={{ width: `${block.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Pending Approvals Component
function PendingApprovals() {
  const approvals = [
    {
      title: "Leave Application",
      badge: "Urgent",
      description: "Rahul Singh (Room 203) has requested weekend leave from Apr 14-16.",
      variant: "default"
    },
    {
      title: "Room Change Request",
      badge: "New",
      description: "Priya Sharma (Room 105) has requested to change to Room 210.",
      variant: "outline"
    }
  ];

  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Pending Approvals</CardTitle>
        <CardDescription className="dark:text-slate-400 text-xs sm:text-sm">
          Items requiring your attention
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
        {approvals.map((approval, index) => (
          <div 
            key={index} 
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 sm:p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="font-semibold text-sm sm:text-base">{approval.title}</h3>
              <Badge 
                variant={approval.variant as "default" | "outline" | "secondary" | "destructive"} 
                className={`text-xs ${approval.variant === "default" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" : ""}`}
              >
                {approval.badge}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400 mb-3 sm:mb-4">
              {approval.description}
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="w-full text-xs sm:text-sm">
                Reject
              </Button>
              <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm">
                Approve
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Upcoming Events Component
function UpcomingEvents() {
  const events = [
    {
      title: "Cultural Night",
      date: "April 15, 2023",
      time: "6:00 PM - 10:00 PM"
    },
    {
      title: "Sports Day",
      date: "April 22, 2023",
      time: "9:00 AM - 5:00 PM"
    }
  ];

  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center justify-between text-base sm:text-lg">
          Upcoming Events
          <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm">
            View All <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6 pt-0">
        {events.map((event, index) => (
          <div 
            key={index} 
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 sm:p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 h-8 sm:h-10 w-8 sm:w-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base truncate">{event.title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-400 truncate">
                  {event.date}
                </p>
                <p className="text-xs text-muted-foreground dark:text-slate-400 mt-0.5 sm:mt-1 truncate">
                  {event.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Student Directory Component
function StudentDirectory() {
  const students = [
    {
      id: 1,
      name: "John Doe",
      initials: "JD",
      room: "203, Block A",
      course: "Computer Science",
      contact: "+91 98765 43210",
      status: "Active"
    },
    {
      id: 2,
      name: "Priya Sharma",
      initials: "PS",
      room: "105, Block A",
      course: "Electronics",
      contact: "+91 87654 32109",
      status: "Active"
    },
    {
      id: 3,
      name: "Amit Kumar",
      initials: "AK",
      room: "304, Block B",
      course: "Mechanical",
      contact: "+91 76543 21098",
      status: "Active"
    },
    {
      id: 4,
      name: "Rahul Singh",
      initials: "RS",
      room: "210, Block C",
      course: "Civil",
      contact: "+91 65432 10987",
      status: "Active"
    }
  ];

  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <CardTitle className="text-base sm:text-lg">Student Directory</CardTitle>
            <CardDescription className="dark:text-slate-400 text-xs sm:text-sm">
              Manage all students in the hostel
            </CardDescription>
          </div>
          <Button className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-xs sm:text-sm h-8 sm:h-9">
            Add New Student
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="relative mb-4 sm:mb-6 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground dark:text-slate-400" />
          <Input 
            type="search" 
            placeholder="Search students..." 
            className="w-full pl-8 sm:pl-9 text-xs sm:text-sm h-8 sm:h-9" 
          />
        </div>

        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left p-2 sm:p-4 font-medium text-xs sm:text-sm">Name</th>
                  <th className="text-left p-2 sm:p-4 font-medium text-xs sm:text-sm">Room</th>
                  <th className="text-left p-2 sm:p-4 font-medium text-xs sm:text-sm">Course</th>
                  <th className="text-left p-2 sm:p-4 font-medium text-xs sm:text-sm">Contact</th>
                  <th className="text-left p-2 sm:p-4 font-medium text-xs sm:text-sm">Status</th>
                  <th className="text-left p-2 sm:p-4 font-medium text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr 
                    key={student.id} 
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="p-2 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="h-7 w-7 sm:h-9 sm:w-9">
                          <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm">
                            {student.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm">{student.room}</td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">
                      {student.course}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm">{student.contact}</td>
                    <td className="p-2 sm:p-4">
                      <Badge 
                        variant="outline" 
                        className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-2 sm:p-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm h-6 sm:h-8 px-2 sm:px-3"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}