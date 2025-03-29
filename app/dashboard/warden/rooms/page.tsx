"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  Building,
  Home,
  Users,
  MessageSquare,
  FileText,
  Settings,
  User,
  Wrench,
  ChevronLeft,
  ChevronRight
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "recharts"

export default function WardenRoomsPage() {
  const isMobile = useIsMobile("(max-width: 640px)")
  const [searchTerm, setSearchTerm] = useState("")
  const [blockFilter, setBlockFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewingRoom, setViewingRoom] = useState<{
    id: string;
    block: string;
    number: string;
    type: string;
    capacity: number;
    occupied: number;
    status: string;
    occupants: string[];
    lastMaintenance: string;
    issues: number;
  } | null>(null)

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

  // Mock data for rooms
  const rooms = [
    {
      id: "A-101",
      block: "A",
      number: "101",
      type: "Double Sharing",
      capacity: 2,
      occupied: 2,
      status: "Occupied",
      occupants: ["John Doe", "Rahul Singh"],
      lastMaintenance: "2023-02-15",
      issues: 0
    },
    {
      id: "A-102",
      block: "A",
      number: "102",
      type: "Double Sharing",
      capacity: 2,
      occupied: 1,
      status: "Partially Occupied",
      occupants: ["Priya Sharma"],
      lastMaintenance: "2023-02-15",
      issues: 1
    },
    {
      id: "A-103",
      block: "A",
      number: "103",
      type: "Single",
      capacity: 1,
      occupied: 1,
      status: "Occupied",
      occupants: ["Vikram Mehta"],
      lastMaintenance: "2023-02-15",
      issues: 0
    },
    {
      id: "A-104",
      block: "A",
      number: "104",
      type: "Double Sharing",
      capacity: 2,
      occupied: 0,
      status: "Vacant",
      occupants: [],
      lastMaintenance: "2023-02-15",
      issues: 0
    },
    {
      id: "B-201",
      block: "B",
      number: "201",
      type: "Double Sharing",
      capacity: 2,
      occupied: 2,
      status: "Occupied",
      occupants: ["Ananya Patel", "Neha Gupta"],
      lastMaintenance: "2023-03-10",
      issues: 0
    },
    {
      id: "B-202",
      block: "B",
      number: "202",
      type: "Double Sharing",
      capacity: 2,
      occupied: 2,
      status: "Occupied",
      occupants: ["Amit Kumar", "Rajesh Verma"],
      lastMaintenance: "2023-03-10",
      issues: 2
    },
    {
      id: "B-203",
      block: "B",
      number: "203",
      type: "Single",
      capacity: 1,
      occupied: 0,
      status: "Under Maintenance",
      occupants: [],
      lastMaintenance: "2023-04-05",
      issues: 1
    },
  ]

  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = 
      room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesBlock = blockFilter === "all" || room.block === blockFilter
    const matchesStatus = statusFilter === "all" || room.status.replace(" ", "").toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesBlock && matchesStatus
  })

  // Room statistics
  const totalRooms = rooms.length
  const occupiedRooms = rooms.filter((room) => room.status === "Occupied").length
  const partiallyOccupiedRooms = rooms.filter((room) => room.status === "Partially Occupied").length
  const vacantRooms = rooms.filter((room) => room.status === "Vacant").length
  const underMaintenanceRooms = rooms.filter((room) => room.status === "Under Maintenance").length
  const roomsWithIssues = rooms.filter((room) => room.issues > 0).length

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
            <h1 className="text-2xl font-bold tracking-tight">Room Management</h1>
            <p className="text-muted-foreground text-sm">View and manage all hostel rooms</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Rooms"
            value={totalRooms}
            icon={<Building className="h-5 w-5" />}
            color="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
            border="border-indigo-200 dark:border-indigo-800"
            hover="hover:border-indigo-300 dark:hover:border-indigo-600"
          />
          <StatCard
            title="Occupied"
            value={occupiedRooms}
            icon={<User className="h-5 w-5" />}
            color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
            border="border-emerald-200 dark:border-emerald-800"
            hover="hover:border-emerald-300 dark:hover:border-emerald-600"
          />
          <StatCard
            title="Partially Occupied"
            value={partiallyOccupiedRooms}
            icon={<User className="h-5 w-5" />}
            color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300"
            border="border-amber-200 dark:border-amber-800"
            hover="hover:border-amber-300 dark:hover:border-amber-600"
          />
          <StatCard
            title="Vacant"
            value={vacantRooms}
            icon={<Building className="h-5 w-5" />}
            color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
            border="border-blue-200 dark:border-blue-800"
            hover="hover:border-blue-300 dark:hover:border-blue-600"
          />
          <StatCard
            title="Maintenance"
            value={underMaintenanceRooms}
            icon={<Wrench className="h-5 w-5" />}
            color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300"
            border="border-red-200 dark:border-red-800"
            hover="hover:border-red-300 dark:hover:border-red-600"
          />
        </div>

        {/* Room Directory */}
        <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Rooms Directory</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Total of {rooms.length} rooms across all blocks
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
                  placeholder="Search rooms..."
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
                  <SelectItem value="A">Block A</SelectItem>
                  <SelectItem value="B">Block B</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] sm:w-[180px] text-sm h-9 sm:h-10">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="PartiallyOccupied">Partially Occupied</SelectItem>
                  <SelectItem value="Vacant">Vacant</SelectItem>
                  <SelectItem value="UnderMaintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="flex items-center gap-2 h-9 sm:h-10">
                <Filter size={16} />
                <span className="hidden sm:inline">More</span>
              </Button>
            </div>

            {/* Room Table */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Room ID</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Block</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Room No.</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Type</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Occupancy</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Status</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Issues</th>
                      <th className="text-left p-3 sm:p-4 font-medium text-xs sm:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.length > 0 ? (
                      filteredRooms.map((room) => (
                        <tr 
                          key={room.id} 
                          className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="p-3 sm:p-4 text-sm font-medium">{room.id}</td>
                          <td className="p-3 sm:p-4 text-sm">Block {room.block}</td>
                          <td className="p-3 sm:p-4 text-sm">{room.number}</td>
                          <td className="p-3 sm:p-4 text-sm">{room.type}</td>
                          <td className="p-3 sm:p-4 text-sm">
                            {room.occupied}/{room.capacity}
                          </td>
                          <td className="p-3 sm:p-4">
                            <Badge
                              variant="outline"
                              className={
                                room.status === "Occupied"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                  : room.status === "Partially Occupied"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                    : room.status === "Vacant"
                                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 text-xs"
                                      : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 text-xs"
                              }
                            >
                              {room.status}
                            </Badge>
                          </td>
                          <td className="p-3 sm:p-4">
                            <Badge
                              variant="outline"
                              className={
                                room.issues === 0
                                  ? "text-xs"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                              }
                            >
                              {room.issues || 0}
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
                                    onClick={() => setViewingRoom(room)}
                                  >
                                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="sr-only">View</span>
                                  </Button>
                                </DialogTrigger>
                                {viewingRoom && (
                                  <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                      <DialogTitle>Room Details</DialogTitle>
                                      <DialogDescription>
                                        Complete information about {viewingRoom.id}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label className="text-sm">Room ID</Label>
                                          <p className="font-medium text-sm">{viewingRoom.id}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-sm">Block</Label>
                                          <p className="font-medium text-sm">Block {viewingRoom.block}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label className="text-sm">Room Number</Label>
                                          <p className="font-medium text-sm">{viewingRoom.number}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-sm">Type</Label>
                                          <p className="font-medium text-sm">{viewingRoom.type}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label className="text-sm">Capacity</Label>
                                          <p className="font-medium text-sm">{viewingRoom.capacity}</p>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-sm">Occupancy</Label>
                                          <p className="font-medium text-sm">{viewingRoom.occupied}/{viewingRoom.capacity}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <Label className="text-sm">Status</Label>
                                          <Badge
                                            variant="outline"
                                            className={
                                              viewingRoom.status === "Occupied"
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                                : viewingRoom.status === "Partially Occupied"
                                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                                  : viewingRoom.status === "Vacant"
                                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs"
                                            }
                                          >
                                            {viewingRoom.status}
                                          </Badge>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-sm">Active Issues</Label>
                                          <Badge
                                            variant="outline"
                                            className={
                                              viewingRoom.issues === 0
                                                ? "text-xs"
                                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                            }
                                          >
                                            {viewingRoom.issues || 0}
                                          </Badge>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <Label className="text-sm">Last Maintenance</Label>
                                        <p className="font-medium text-sm">{viewingRoom.lastMaintenance}</p>
                                      </div>
                                      
                                      <div className="space-y-1">
                                        <Label className="text-sm">Current Occupants</Label>
                                        {viewingRoom.occupants.length > 0 ? (
                                          <div className="space-y-2 mt-2">
                                            {viewingRoom.occupants.map((occupant, index) => (
                                              <div key={index} className="flex items-center gap-2">
                                                <div className="bg-slate-100 dark:bg-slate-700 h-6 w-6 rounded-full flex items-center justify-center text-xs">
                                                  {occupant.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="text-sm">{occupant}</span>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <p className="text-sm text-muted-foreground">No current occupants</p>
                                        )}
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
                                    <Eye className="mr-2 h-3.5 w-3.5" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-xs sm:text-sm">
                                    <Users className="mr-2 h-3.5 w-3.5" />
                                    View Occupants
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-xs sm:text-sm">
                                    <MessageSquare className="mr-2 h-3.5 w-3.5" />
                                    Report Issue
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-xs sm:text-sm">
                                    <Wrench className="mr-2 h-3.5 w-3.5" />
                                    Maintenance
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
                          No rooms found matching your criteria
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
                Showing <span className="font-medium">{filteredRooms.length}</span> of{" "}
                <span className="font-medium">{rooms.length}</span> rooms
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