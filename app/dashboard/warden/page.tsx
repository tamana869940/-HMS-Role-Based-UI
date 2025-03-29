"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import wardenNavItems from "@/components/warden/warden-nav-items"
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
  ArrowRight,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useIsMobile } from "@/hooks/use-mobile"

export default function WardenDashboard() {
  const isMobile = useIsMobile("(max-width: 640px)")
  

  return (
    <DashboardLayout
      userType="warden"
      userName="Dr. Rajesh Kumar"
      userRole="Hostel Warden"
      userAvatar="RK"
      navItems={wardenNavItems}
    >
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Warden Dashboard</h1>
            <p className="text-muted-foreground dark:text-slate-400">Welcome, Dr. Rajesh Kumar</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-slate-400" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-full md:w-[200px] pl-8 text-sm h-9" 
              />
            </div>
            <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard 
            title="Total Students"
            value="450"
            description="Under your supervision"
            icon={<Users className="h-5 w-5" />}
            color="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
            border="border-indigo-200 dark:border-indigo-800"
            hover="hover:border-indigo-300 dark:hover:border-indigo-600"
          />
          
          <StatCard 
            title="Students Present"
            value="425"
            description="94% attendance rate"
            icon={<CheckCircle className="h-5 w-5" />}
            color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
            border="border-emerald-200 dark:border-emerald-800"
            hover="hover:border-emerald-300 dark:hover:border-emerald-600"
            trend="up"
          />
          
          <StatCard 
            title="Pending Complaints"
            value="12"
            description="Requires attention"
            icon={<MessageSquare className="h-5 w-5" />}
            color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300"
            border="border-amber-200 dark:border-amber-800"
            hover="hover:border-amber-300 dark:hover:border-amber-600"
          />
          
          <StatCard 
            title="Leave Requests"
            value="8"
            description="Pending approval"
            icon={<FileText className="h-5 w-5" />}
            color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
            border="border-blue-200 dark:border-blue-800"
            hover="hover:border-blue-300 dark:hover:border-blue-600"
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
              value="complaints" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
            >
              <MessageSquare className="h-4 w-4 mr-1 sm:mr-2" />
              {!isMobile && "Complaints"}
            </TabsTrigger>
            <TabsTrigger 
              value="leave" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
            >
              <FileText className="h-4 w-4 mr-1 sm:mr-2" />
              {!isMobile && "Leave Applications"}
            </TabsTrigger>
            <TabsTrigger 
              value="attendance" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
            >
              <CheckCircle className="h-4 w-4 mr-1 sm:mr-2" />
              {!isMobile && "Attendance"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <RecentActivities />
                <BlockDistribution />
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <PendingApprovals />
                <UpcomingEvents />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="complaints">
            <div className="flex items-center justify-center h-64 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
              <div className="text-center space-y-2">
                <MessageSquare className="mx-auto h-8 w-8 text-slate-400" />
                <h3 className="font-medium text-sm">Complaints Management</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Student complaints and issues will appear here
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leave">
            <div className="flex items-center justify-center h-64 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
              <div className="text-center space-y-2">
                <FileText className="mx-auto h-8 w-8 text-slate-400" />
                <h3 className="font-medium text-sm">Leave Applications</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Student leave requests will appear here
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attendance">
            <div className="flex items-center justify-center h-64 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
              <div className="text-center space-y-2">
                <CheckCircle className="mx-auto h-8 w-8 text-slate-400" />
                <h3 className="font-medium text-sm">Attendance Records</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Student attendance tracking will appear here
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Reusable Stat Card Component (same as admin dashboard)
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
      title: "Student Check-in",
      time: "2 hours ago",
      description: "Amit Kumar returned to hostel after weekend leave"
    },
    {
      icon: <CheckCircle className="h-4 w-4" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300",
      title: "Complaint Resolved",
      time: "5 hours ago",
      description: "Electrical issue in Room 105 has been fixed"
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      iconBg: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300",
      title: "New Complaint",
      time: "Yesterday",
      description: "Plumbing issue reported in Room 203, Block A"
    },
    {
      icon: <FileText className="h-4 w-4" />,
      iconBg: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
      title: "Leave Approved",
      time: "Yesterday",
      description: "Rahul Singh's weekend leave request has been approved"
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
          Latest actions in the hostel
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

// Block Distribution Component
function BlockDistribution() {
  interface Block {
    name: string;
    percentage: number;
    students: number;
  }

  const blocks: Block[] = [
    { name: "Block A", percentage: 90, students: 180 },
    { name: "Block B", percentage: 85, students: 170 },
    { name: "Block C", percentage: 50, students: 100 }
  ];

  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Block-wise Student Distribution</CardTitle>
        <CardDescription className="dark:text-slate-400 text-xs sm:text-sm">
          Number of students in each hostel block
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
        {blocks.map((block, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <p className="font-medium text-sm sm:text-base">{block.name}</p>
              <p className="text-xs sm:text-sm font-medium">
                <span className="text-primary">{block.students} students</span>
              </p>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-2 rounded-full" 
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
      description: "Priya Sharma (Room 105) has requested medical leave from Apr 10-12.",
      variant: "default"
    },
    {
      title: "Night Out Permission",
      badge: "New",
      description: "John Doe (Room 203) has requested permission to stay out on April 15.",
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