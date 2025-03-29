"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { adminNavItems } from "@/components/admin/admin-nav-items"
import { useIsMobile } from "@/hooks/use-mobile"
import { toast } from "sonner"
import { 
  Building, 
  Download, 
  Eye, 
  FileEdit, 
  Plus, 
  Search, 
  Trash2,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

type Room = {
  id: string
  block: string
  number: string
  type: string
  capacity: number
  occupied: number
  status: "Occupied" | "Partially Occupied" | "Vacant" | "Under Maintenance"
  occupants: string[]
  lastMaintenance: string
}

export default function AdminRoomsPage() {
  const isMobile = useIsMobile("(max-width: 640px)")
  const [searchTerm, setSearchTerm] = useState("")
  const [roomTypeFilter, setRoomTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data for rooms
  const [rooms, setRooms] = useState<Room[]>([
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
    {
      id: "C-301",
      block: "C",
      number: "301",
      type: "Triple Sharing",
      capacity: 3,
      occupied: 2,
      status: "Partially Occupied",
      occupants: ["Sanjay Patel", "Kiran Shah"],
      lastMaintenance: "2023-01-20",
    },
  ])

  // State for new room form
  const [newRoom, setNewRoom] = useState<Omit<Room, 'id' | 'occupants' | 'lastMaintenance'>>({
    block: "",
    number: "",
    type: "",
    capacity: 2,
    occupied: 0,
    status: "Vacant"
  })

  // State for editing room
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [viewingRoom, setViewingRoom] = useState<Room | null>(null)
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null)

  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = 
      roomTypeFilter === "all" || 
      room.type.toLowerCase().includes(roomTypeFilter.toLowerCase())
    
    const matchesStatus = 
      statusFilter === "all" || 
      room.status.toLowerCase().includes(statusFilter.toLowerCase())
    
    return matchesSearch && matchesType && matchesStatus
  })

  // Room statistics
  const totalRooms = rooms.length
  const occupiedRooms = rooms.filter((room) => room.status === "Occupied").length
  const partiallyOccupiedRooms = rooms.filter((room) => room.status === "Partially Occupied").length
  const vacantRooms = rooms.filter((room) => room.status === "Vacant").length
  const underMaintenanceRooms = rooms.filter((room) => room.status === "Under Maintenance").length

  // Handle adding a new room
  const handleAddRoom = () => {
    if (!newRoom.block || !newRoom.number || !newRoom.type) {
      toast.error("Please fill in all required fields")
      return
    }

    const newId = `${newRoom.block}-${newRoom.number}`
    
    const addedRoom: Room = {
      ...newRoom,
      id: newId,
      occupants: [],
      lastMaintenance: new Date().toISOString().split('T')[0]
    }

    setRooms([...rooms, addedRoom])
    setNewRoom({
      block: "",
      number: "",
      type: "",
      capacity: 2,
      occupied: 0,
      status: "Vacant"
    })
    toast.success("Room added successfully")
  }

  // Handle updating a room
  const handleUpdateRoom = () => {
    if (!editingRoom) return

    const updatedRooms = rooms.map(room => 
      room.id === editingRoom.id ? editingRoom : room
    )
    
    setRooms(updatedRooms)
    setEditingRoom(null)
    toast.success("Room updated successfully")
  }

  // Handle deleting a room
  const handleDeleteRoom = () => {
    if (!deleteRoomId) return

    setRooms(rooms.filter(room => room.id !== deleteRoomId))
    setDeleteRoomId(null)
    toast.success("Room deleted successfully")
  }

  return (
    <DashboardLayout
      userType="admin"
      userName="Admin User"
      userRole="Hostel Administrator"
      userAvatar="AD"
      navItems={adminNavItems}
    >
      <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Room Management</h1>
            <p className="text-muted-foreground text-sm">View and manage all hostel rooms</p>
          </div>
          
          {/* Add New Room Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus size={16} />
                <span>Add New Room</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <DialogDescription>
                  Enter the details of the new room to add to the hostel.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="block">Block <span className="text-red-500">*</span></Label>
                    <Select
                      value={newRoom.block}
                      onValueChange={(value) => setNewRoom({...newRoom, block: value})}
                    >
                      <SelectTrigger id="block">
                        <SelectValue placeholder="Select block" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Block A</SelectItem>
                        <SelectItem value="B">Block B</SelectItem>
                        <SelectItem value="C">Block C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room-number">Room Number <span className="text-red-500">*</span></Label>
                    <Input 
                      id="room-number" 
                      placeholder="Enter room number" 
                      value={newRoom.number}
                      onChange={(e) => setNewRoom({...newRoom, number: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-type">Room Type <span className="text-red-500">*</span></Label>
                  <Select
                    value={newRoom.type}
                    onValueChange={(value) => setNewRoom({...newRoom, type: value})}
                  >
                    <SelectTrigger id="room-type">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Double Sharing">Double Sharing</SelectItem>
                      <SelectItem value="Triple Sharing">Triple Sharing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input 
                      id="capacity" 
                      type="number" 
                      min="1" 
                      max="4" 
                      placeholder="Enter room capacity" 
                      value={newRoom.capacity}
                      onChange={(e) => setNewRoom({...newRoom, capacity: parseInt(e.target.value) || 1})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room-status">Room Status</Label>
                    <Select
                      value={newRoom.status}
                      onValueChange={(value) => setNewRoom({...newRoom, status: value as Room['status']})}
                    >
                      <SelectTrigger id="room-status">
                        <SelectValue placeholder="Select room status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vacant">Vacant</SelectItem>
                        <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700" 
                  onClick={handleAddRoom}
                >
                  Add Room
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator className="my-4" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
            icon={<Building className="h-5 w-5" />}
            color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
            border="border-emerald-200 dark:border-emerald-800"
            hover="hover:border-emerald-300 dark:hover:border-emerald-600"
          />
          <StatCard
            title="Partially Occupied"
            value={partiallyOccupiedRooms}
            icon={<Building className="h-5 w-5" />}
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
            title="Under Maintenance"
            value={underMaintenanceRooms}
            icon={<Building className="h-5 w-5" />}
            color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300"
            border="border-red-200 dark:border-red-800"
            hover="hover:border-red-300 dark:hover:border-red-600"
            className="hidden xl:block"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
            <TabsList className="grid w-full md:w-auto grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="block-a">Block A</TabsTrigger>
              <TabsTrigger value="block-b">Block B</TabsTrigger>
              <TabsTrigger value="block-c">Block C</TabsTrigger>
            </TabsList>
            
            <div className="w-full md:w-auto flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                <Download size={16} />
                <span>Export</span>
              </Button>
            </div>
          </div>

          {/* All Rooms Tab */}
          <TabsContent value="all" className="space-y-6">
            <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
              <CardHeader className="p-4 sm:p-6 pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">All Rooms</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Total of {rooms.length} rooms in the hostel
                    </CardDescription>
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
                  <Select value={roomTypeFilter} onValueChange={setRoomTypeFilter}>
                    <SelectTrigger className="w-[150px] sm:w-[180px] text-sm h-9 sm:h-10">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="double">Double Sharing</SelectItem>
                      <SelectItem value="triple">Triple Sharing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px] sm:w-[180px] text-sm h-9 sm:h-10">
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

                {/* Room Table */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Room ID</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Block</th>
                          {!isMobile && (
                            <>
                              <th className="text-left p-3 font-medium text-xs sm:text-sm">Room Number</th>
                              <th className="text-left p-3 font-medium text-xs sm:text-sm">Type</th>
                            </>
                          )}
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Capacity</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Occupancy</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Status</th>
                          <th className="text-left p-3 font-medium text-xs sm:text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {filteredRooms.length > 0 ? (
                          filteredRooms.map((room) => (
                            <tr key={room.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-3 text-sm">{room.id}</td>
                              <td className="p-3 text-sm">Block {room.block}</td>
                              {!isMobile && (
                                <>
                                  <td className="p-3 text-sm">{room.number}</td>
                                  <td className="p-3 text-sm">{room.type}</td>
                                </>
                              )}
                              <td className="p-3 text-sm">{room.capacity}</td>
                              <td className="p-3 text-sm">
                                {room.occupied}/{room.capacity}
                              </td>
                              <td className="p-3">
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
                              <td className="p-3">
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
                                          <div className="flex items-center gap-4">
                                            <div className="bg-slate-100 dark:bg-slate-700 h-14 w-14 sm:h-16 sm:w-16 rounded-lg flex items-center justify-center">
                                              <Building className="h-6 w-6 sm:h-8 sm:w-8 text-slate-600 dark:text-slate-300" />
                                            </div>
                                            <div>
                                              <h3 className="text-lg sm:text-xl font-bold">{viewingRoom.id}</h3>
                                              <Badge className="mt-1 text-xs sm:text-sm">
                                                Block {viewingRoom.block}
                                              </Badge>
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
                                              <p className="font-medium text-sm">
                                                {viewingRoom.occupied}/{viewingRoom.capacity}
                                              </p>
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
                                              <Label className="text-sm">Last Maintenance</Label>
                                              <p className="font-medium text-sm">
                                                {viewingRoom.lastMaintenance}
                                              </p>
                                            </div>
                                          </div>
                                          
                                          <div className="space-y-1">
                                            <Label className="text-sm">Occupants</Label>
                                            {viewingRoom.occupants.length > 0 ? (
                                              <ul className="space-y-1">
                                                {viewingRoom.occupants.map((occupant, index) => (
                                                  <li key={index} className="font-medium text-sm">
                                                    {occupant}
                                                  </li>
                                                ))}
                                              </ul>
                                            ) : (
                                              <p className="font-medium text-sm text-muted-foreground">
                                                No occupants
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <Button size="sm">Close</Button>
                                          </DialogClose>
                                        </DialogFooter>
                                      </DialogContent>
                                    )}
                                  </Dialog>
                                  
                                  {/* Edit Button */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-200 dark:hover:bg-slate-700"
                                        onClick={() => setEditingRoom(room)}
                                      >
                                        <FileEdit className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="sr-only">Edit</span>
                                      </Button>
                                    </DialogTrigger>
                                    {editingRoom && (
                                      <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                          <DialogTitle>Edit Room</DialogTitle>
                                          <DialogDescription>
                                            Update the details of {editingRoom.id}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                              <Label htmlFor="edit-block" className="text-sm">Block</Label>
                                              <Select
                                                value={editingRoom.block}
                                                onValueChange={(value) => setEditingRoom({...editingRoom, block: value})}
                                              >
                                                <SelectTrigger id="edit-block" className="text-sm h-9">
                                                  <SelectValue placeholder="Select block" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="A" className="text-sm">Block A</SelectItem>
                                                  <SelectItem value="B" className="text-sm">Block B</SelectItem>
                                                  <SelectItem value="C" className="text-sm">Block C</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <div className="space-y-1">
                                              <Label htmlFor="edit-number" className="text-sm">Room Number</Label>
                                              <Input
                                                id="edit-number"
                                                className="text-sm h-9"
                                                value={editingRoom.number}
                                                onChange={(e) => setEditingRoom({...editingRoom, number: e.target.value})}
                                              />
                                            </div>
                                          </div>
                                          
                                          <div className="space-y-1">
                                            <Label htmlFor="edit-type" className="text-sm">Room Type</Label>
                                            <Select
                                              value={editingRoom.type}
                                              onValueChange={(value) => setEditingRoom({...editingRoom, type: value})}
                                            >
                                              <SelectTrigger id="edit-type" className="text-sm h-9">
                                                <SelectValue placeholder="Select room type" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="Single" className="text-sm">Single</SelectItem>
                                                <SelectItem value="Double Sharing" className="text-sm">Double Sharing</SelectItem>
                                                <SelectItem value="Triple Sharing" className="text-sm">Triple Sharing</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                              <Label htmlFor="edit-capacity" className="text-sm">Capacity</Label>
                                              <Input
                                                id="edit-capacity"
                                                type="number"
                                                min="1"
                                                max="4"
                                                className="text-sm h-9"
                                                value={editingRoom.capacity}
                                                onChange={(e) => setEditingRoom({...editingRoom, capacity: parseInt(e.target.value) || 1})}
                                              />
                                            </div>
                                            <div className="space-y-1">
                                              <Label htmlFor="edit-occupied" className="text-sm">Occupied</Label>
                                              <Input
                                                id="edit-occupied"
                                                type="number"
                                                min="0"
                                                max={editingRoom.capacity}
                                                className="text-sm h-9"
                                                value={editingRoom.occupied}
                                                onChange={(e) => setEditingRoom({...editingRoom, occupied: parseInt(e.target.value) || 0})}
                                              />
                                            </div>
                                          </div>
                                          
                                          <div className="space-y-1">
                                            <Label htmlFor="edit-status" className="text-sm">Status</Label>
                                            <Select
                                              value={editingRoom.status}
                                              onValueChange={(value) => setEditingRoom({...editingRoom, status: value as Room['status']})}
                                            >
                                              <SelectTrigger id="edit-status" className="text-sm h-9">
                                                <SelectValue placeholder="Select status" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="Occupied" className="text-sm">Occupied</SelectItem>
                                                <SelectItem value="Partially Occupied" className="text-sm">Partially Occupied</SelectItem>
                                                <SelectItem value="Vacant" className="text-sm">Vacant</SelectItem>
                                                <SelectItem value="Under Maintenance" className="text-sm">Under Maintenance</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <Button variant="outline" size="sm">Cancel</Button>
                                          </DialogClose>
                                          <Button 
                                            className="bg-indigo-600 hover:bg-indigo-700" 
                                            size="sm"
                                            onClick={handleUpdateRoom}
                                          >
                                            Save Changes
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    )}
                                  </Dialog>
                                  
                                  {/* Delete Button */}
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-200 dark:hover:bg-slate-700 text-red-600 hover:text-red-700"
                                        onClick={() => setDeleteRoomId(room.id)}
                                      >
                                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="sr-only">Delete</span>
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                      <DialogHeader>
                                        <DialogTitle>Delete Room</DialogTitle>
                                        <DialogDescription>
                                          Are you sure you want to delete {room.id}? This action cannot be undone.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogFooter>
                                        <DialogClose asChild>
                                          <Button variant="outline" size="sm">Cancel</Button>
                                        </DialogClose>
                                        <Button 
                                          variant="destructive" 
                                          size="sm"
                                          onClick={handleDeleteRoom}
                                        >
                                          Delete Room
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
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
          </TabsContent>

          {/* Block A Tab */}
          <TabsContent value="block-a">
            <RoomBlockTable 
              rooms={rooms.filter(room => room.block === "A")} 
              block="A" 
              isMobile={isMobile}
              onViewRoom={setViewingRoom}
            />
          </TabsContent>

          {/* Block B Tab */}
          <TabsContent value="block-b">
            <RoomBlockTable 
              rooms={rooms.filter(room => room.block === "B")} 
              block="B" 
              isMobile={isMobile}
              onViewRoom={setViewingRoom}
            />
          </TabsContent>

          {/* Block C Tab */}
          <TabsContent value="block-c">
            <RoomBlockTable 
              rooms={rooms.filter(room => room.block === "C")} 
              block="C" 
              isMobile={isMobile}
              onViewRoom={setViewingRoom}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Room Block Table Component
function RoomBlockTable({ rooms, block, isMobile, onViewRoom }: {
  rooms: Room[]
  block: string
  isMobile: boolean
  onViewRoom: (room: Room) => void
}) {
  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6 pb-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">Block {block} Rooms</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Total of {rooms.length} rooms in Block {block}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Room ID</th>
                  {!isMobile && (
                    <th className="text-left p-3 font-medium text-xs sm:text-sm">Room Number</th>
                  )}
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Type</th>
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Capacity</th>
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Occupancy</th>
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Status</th>
                  <th className="text-left p-3 font-medium text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 text-sm">{room.id}</td>
                    {!isMobile && (
                      <td className="p-3 text-sm">{room.number}</td>
                    )}
                    <td className="p-3 text-sm">{room.type}</td>
                    <td className="p-3 text-sm">{room.capacity}</td>
                    <td className="p-3 text-sm">
                      {room.occupied}/{room.capacity}
                    </td>
                    <td className="p-3">
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
                    <td className="p-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-xs sm:text-sm"
                        onClick={() => onViewRoom(room)}
                      >
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
  className?: string;
}

function StatCard({ title, value, icon, color, border, hover, className }: StatCardProps) {
  return (
    <Card className={`border ${border} ${hover} transition-colors dark:bg-slate-800/50 ${className}`}>
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