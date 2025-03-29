"use client"

import { useState } from "react"
import { Building, Home, Users, MessageSquare, FileText, Settings } from "lucide-react"

export default function WardenComplaintsPage() {
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

  // Mock data for complaints
  const complaints = [
    {
      id: "C-2023-001",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Plumbing",
      issue: "Sink leaking in common bathroom",
      description:
        "The sink in the common bathroom is leaking. Water is accumulating on the floor creating a slippery surface.",
      date: "2023-04-02",
      status: "In Progress",
      priority: "Medium",
      assignedTo: "Maintenance Staff",
      comments: [
        { user: "Admin", text: "Maintenance team has been notified", date: "2023-04-02" },
        { user: "Maintenance", text: "Will check today", date: "2023-04-03" },
      ],
    },
    {
      id: "C-2023-002",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Wi-Fi",
      issue: "Poor connectivity in room",
      description:
        "Unable to connect to the hostel Wi-Fi network from Room 203. The signal is weak and keeps disconnecting.",
      date: "2023-03-15",
      status: "Resolved",
      priority: "High",
      assignedTo: "IT Support",
      comments: [
        { user: "Admin", text: "IT team will check the router", date: "2023-03-16" },
        { user: "IT Support", text: "Router has been replaced", date: "2023-03-18" },
        { user: "Admin", text: "Issue resolved", date: "2023-03-20" },
      ],
    },
    {
      id: "C-2023-003",
      studentId: "STU001",
      studentName: "John Doe",
      room: "203, Block A",
      type: "Electrical",
      issue: "Power socket not working",
      description:
        "The power socket near my bed is not working. I've tried plugging in different devices but none work.",
      date: "2023-03-10",
      status: "Pending",
      priority: "Low",
      assignedTo: "Pending Assignment",
      comments: [],
    },
    {
      id: "C-2023-004",
      studentId: "STU002",
      studentName: "Priya Sharma",
      room: "105, Block A",
      type: "Furniture",
      issue: "Broken chair",
      description: "One of the chairs in my room is broken. The leg is loose and it's unsafe to sit on.",
      date: "2023-04-05",
      status: "Pending",
      priority: "Medium",
      assignedTo: "Pending Assignment",
      comments: [],
    },
    {
      id: "C-2023-005",
      studentId: "STU003",
      studentName: "Rahul Singh",
      room: "203, Block A",
      type: "Cleaning",
      issue: "Bathroom needs cleaning",
      description:
        "The shared bathroom on our floor hasn't been cleaned properly. There's mold growing in the corners.",
      date: "2023-04-10",
      status: "In Progress",
      priority: "High",
      assignedTo: "Cleaning Staff",
      comments: [{ user: "Admin", text: "Cleaning staff has been notified", date: "2023-04-10" }],
    },
  ]

  // Filter complaints based on search term
  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Complaint statistics
  const totalComplaints = complaints.length
}

