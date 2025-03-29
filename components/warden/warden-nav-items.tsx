import { Home, Users, Building, CreditCard, MessageSquare, FileText, Settings } from "lucide-react"
import { NavItem } from "../dashboard-layout";

const wardenNavItems: NavItem[] = [
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
      href: "/dashboard/warden/leave",
      label: "Leave Applications",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/warden/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
    ];
  
  export default wardenNavItems;
