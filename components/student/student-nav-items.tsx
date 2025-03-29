// components/student/student-nav-items.tsx
import { 
  Home, 
  User, 
  CreditCard, 
  MessageSquare, 
  FileText, 
  Settings,
  Bell,
  Calendar,
  BookOpenCheck,
  ClipboardList
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeColor: string;
  badgeCount?: number;
  disabled?: boolean;
};

export const studentNavItems: NavItem[] = [
  {
    href: "/dashboard/student",
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    activeColor: "text-indigo-500 dark:text-indigo-400",
    badgeCount: 3 // Example badge count
  },
  {
    href: "/dashboard/student/profile",
    label: "Profile",
    icon: <User className="h-5 w-5" />,
    activeColor: "text-teal-500 dark:text-teal-400"
  },
  {
    href: "/dashboard/student/payments",
    label: "Payments",
    icon: <CreditCard className="h-5 w-5" />,
    activeColor: "text-emerald-500 dark:text-emerald-400",
    badgeCount: 1 // Payment due
  },
  {
    href: "/dashboard/student/complaints",
    label: "Complaints",
    icon: <MessageSquare className="h-5 w-5" />,
    activeColor: "text-amber-500 dark:text-amber-400"
  },
  {
    href: "/dashboard/student/leave",
    label: "Leave Applications",
    icon: <FileText className="h-5 w-5" />,
    activeColor: "text-rose-500 dark:text-rose-400",
    badgeCount: 2 // Pending applications
  },
  {
    href: "/dashboard/student/notices",
    label: "Notices",
    icon: <ClipboardList className="h-5 w-5" />,
    activeColor: "text-blue-500 dark:text-blue-400"
  },
  {
    href: "/dashboard/student/academics",
    label: "Academics",
    icon: <BookOpenCheck className="h-5 w-5" />,
    activeColor: "text-purple-500 dark:text-purple-400",
    disabled: true // Coming soon feature
  },
  {
    href: "/dashboard/student/settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    activeColor: "text-gray-500 dark:text-gray-400"
  }
];

// Grouped navigation items for better organization
export const studentNavGroups = [
  {
    title: "Main",
    items: studentNavItems.slice(0, 1) // Dashboard
  },
  {
    title: "Personal",
    items: studentNavItems.slice(1, 3) // Profile, Payments
  },
  {
    title: "Services",
    items: studentNavItems.slice(3, 6) // Complaints, Leave, Notices
  },
  {
    title: "Others",
    items: studentNavItems.slice(6) // Academics, Settings
  }
];