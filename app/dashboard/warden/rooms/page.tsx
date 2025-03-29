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

export default function WardenRoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")

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
    },
  ]

  // Filter rooms based on search term
  const filteredRooms = rooms.filter(
    (room) =>
      room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Room statistics
  const totalRooms = rooms.length
  const occupiedRooms = rooms.filter((room) => room.status === "Occupied").length
  const partiallyOccupiedRooms = rooms.filter((room) => room.status === "Partially Occupied").length
  const vacantRooms = rooms.filter((room) => room.status === "Vacant").length
  const underMaintenanceRooms = rooms.filter((room) => room.status === "Under Maintenance").length

  return (
    <DashboardLayout
      userType="warden"
      userName="Dr. Rajesh Kumar"
      userRole="Hostel Warden"
      userAvatar="RK"
      navItems={navItems}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Room Management</h1>
            <p className="text-muted-foreground">View and manage all hostel rooms</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                  <h3 className="text-2xl font-bold mt-1">{totalRooms}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Building className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                  <h3 className="text-2xl font-bold mt-1">{occupiedRooms}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Partially Occupied</p>
                  <h3 className="text-2xl font-bold mt-1">{partiallyOccupiedRooms}</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Building className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vacant</p>
                  <h3 className="text-2xl font-bold mt-1">{vacantRooms}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Under Maintenance</p>
                  <h3 className="text-2xl font-bold mt-1">{underMaintenanceRooms}</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <Building className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Rooms</TabsTrigger>
            <TabsTrigger value="block-a">Block A</TabsTrigger>
            <TabsTrigger value="block-b">Block B</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Rooms</CardTitle>
                <CardDescription>Total of {rooms.length} rooms in the hostel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search rooms..."
                        className="pl-8 w-full md:w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="double">Double Sharing</SelectItem>
                        <SelectItem value="triple">Triple Sharing</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="partially">Partially Occupied</SelectItem>
                        <SelectItem value="vacant">Vacant</SelectItem>
                        <SelectItem value="maintenance">Under Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={16} />
                      <span className="hidden sm:inline">Advanced Filters</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download size={16} />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left p-3 font-medium">Room ID</th>
                          <th className="text-left p-3 font-medium">Block</th>
                          <th className="text-left p-3 font-medium">Room Number</th>
                          <th className="text-left p-3 font-medium">Type</th>
                          <th className="text-left p-3 font-medium">Capacity</th>
                          <th className="text-left p-3 font-medium">Occupancy</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRooms.map((room) => (
                          <tr key={room.id} className="border-t hover:bg-slate-50">
                            <td className="p-3">{room.id}</td>
                            <td className="p-3">Block {room.block}</td>
                            <td className="p-3">{room.number}</td>
                            <td className="p-3">{room.type}</td>
                            <td className="p-3">{room.capacity}</td>
                            <td className="p-3">
                              {room.occupied}/{room.capacity}
                            </td>
                            <td className="p-3">
                              <Badge
                                variant="outline"
                                className={
                                  room.status === "Occupied"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : room.status === "Partially Occupied"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : room.status === "Vacant"
                                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                        : "bg-red-100 text-red-800 hover:bg-red-100"
                                }
                              >
                                {room.status}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>View Details</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>View Occupants</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>Report Issue</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredRooms.length} of {rooms.length} rooms
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="block-a">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Block A Rooms</CardTitle>
                <CardDescription>
                  Total of {rooms.filter((room) => room.block === "A").length} rooms in Block A
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left p-3 font-medium">Room ID</th>
                          <th className="text-left p-3 font-medium">Room Number</th>
                          <th className="text-left p-3 font-medium">Type</th>
                          <th className="text-left p-3 font-medium">Capacity</th>
                          <th className="text-left p-3 font-medium">Occupancy</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rooms
                          .filter((room) => room.block === "A")
                          .map((room) => (
                            <tr key={room.id} className="border-t hover:bg-slate-50">
                              <td className="p-3">{room.id}</td>
                              <td className="p-3">{room.number}</td>
                              <td className="p-3">{room.type}</td>
                              <td className="p-3">{room.capacity}</td>
                              <td className="p-3">
                                {room.occupied}/{room.capacity}
                              </td>
                              <td className="p-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    room.status === "Occupied"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : room.status === "Partially Occupied"
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                        : room.status === "Vacant"
                                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                          : "bg-red-100 text-red-800 hover:bg-red-100"
                                  }
                                >
                                  {room.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Button variant="ghost" size="sm">
                                  View Details
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
          </TabsContent>

          <TabsContent value="block-b">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Block B Rooms</CardTitle>
                <CardDescription>
                  Total of {rooms.filter((room) => room.block === "B").length} rooms in Block B
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="text-left p-3 font-medium">Room ID</th>
                          <th className="text-left p-3 font-medium">Room Number</th>
                          <th className="text-left p-3 font-medium">Type</th>
                          <th className="text-left p-3 font-medium">Capacity</th>
                          <th className="text-left p-3 font-medium">Occupancy</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rooms
                          .filter((room) => room.block === "B")
                          .map((room) => (
                            <tr key={room.id} className="border-t hover:bg-slate-50">
                              <td className="p-3">{room.id}</td>
                              <td className="p-3">{room.number}</td>
                              <td className="p-3">{room.type}</td>
                              <td className="p-3">{room.capacity}</td>
                              <td className="p-3">
                                {room.occupied}/{room.capacity}
                              </td>
                              <td className="p-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    room.status === "Occupied"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : room.status === "Partially Occupied"
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                        : room.status === "Vacant"
                                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                          : "bg-red-100 text-red-800 hover:bg-red-100"
                                  }
                                >
                                  {room.status}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Button variant="ghost" size="sm">
                                  View Details
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

