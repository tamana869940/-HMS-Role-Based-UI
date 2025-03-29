import { Home, Users, Building, CreditCard, MessageSquare, FileText, Settings } from "lucide-react"

export const adminNavItems = [
  {
    href: "/dashboard/admin",
    label: "Dashboard",
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/admin/students",
    label: "Students",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/admin/rooms",
    label: "Rooms",
    icon: <Building className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/admin/payments",
    label: "Payments",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/admin/complaints",
    label: "Complaints",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/admin/leave",
    label: "Leave Applications",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/admin/settings",
    label: "Settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];