"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, LogOut, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeColor?: string;
  badgeCount?: number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: "student" | "admin" | "warden";
  userName: string;
  userRole: string;
  userAvatar: string;
  navItems: NavItem[];
}

export function DashboardLayout({
  children,
  userType,
  userName,
  userRole,
  userAvatar,
  navItems,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const colorSchemes = {
    student: {
      primary: "bg-indigo-600",
      secondary: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
      hover: "hover:bg-indigo-500",
      border: "border-indigo-300 dark:border-indigo-700",
    },
    admin: {
      primary: "bg-emerald-600",
      secondary: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
      hover: "hover:bg-emerald-500",
      border: "border-emerald-300 dark:border-emerald-700",
    },
    warden: {
      primary: "bg-amber-600",
      secondary: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
      hover: "hover:bg-amber-500",
      border: "border-amber-300 dark:border-amber-700",
    },
  };

  const colors = colorSchemes[userType];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col">
      {/* Mobile Header - Fixed at top */}
      <header className="md:hidden bg-white dark:bg-slate-800 border-b p-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <Image
              src="/logo.png"
              alt="Goel Group Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <h1 className="font-bold text-[15px]">Goel Group Of Institution</h1>
            <p className="text-xs text-muted-foreground">Hostel Management</p>
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <div className="h-full flex flex-col">
              <div className="p-6 flex flex-col items-center border-b">
                <div className="mb-4 flex flex-col items-center">
                  <div className="relative h-12 w-12 mb-2">
                    <Image
                      src="/logo.png"
                      alt="Goel Group Logo"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-lg font-semibold">Goel Group Of Institution</h2>
                  <p className="text-sm text-muted-foreground">Hostel Management</p>
                </div>
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold">{userName}</h2>
                <p className="text-sm text-muted-foreground dark:text-slate-400">
                  {userRole}
                </p>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      pathname === item.href ? colors.secondary : ""
                    }`}
                    asChild
                  >
                    <Link href={item.href}>
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                      {item.badgeCount && (
                        <span
                          className={`ml-auto ${colors.primary} text-white text-xs px-2 py-0.5 rounded-full`}
                        >
                          {item.badgeCount}
                        </span>
                      )}
                    </Link>
                  </Button>
                ))}
              </nav>

              <div className="p-4 border-t flex flex-col gap-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </Button>

                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-center"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content - Adjusted for fixed header */}
      <div className="flex flex-1 pt-[64px] md:pt-0">
        {/* Desktop Sidebar */}
        <aside className={`hidden md:flex flex-col bg-white dark:bg-slate-800 border-r ${colors.border} w-64 h-screen sticky top-0`}>
          <div className="flex flex-col h-full">
            {/* Institution Branding Section */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10">
                  <Image
                    src="/logo.png"
                    alt="Goel Group Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold leading-tight">Goel Group Of Institution</h1>
                  <p className="text-xs text-muted-foreground">Hostel Management System</p>
                </div>
              </div>
            </div>

            {/* User Profile Section */}
            <div className="flex flex-col items-center px-6 py-4 mb-4">
              <Avatar className="h-16 w-16 mb-3">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold text-center">{userName}</h2>
              <p className="text-sm text-muted-foreground dark:text-slate-300 text-center">
                {userRole}
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <nav className="flex-1 px-2 space-y-1 overflow-y-auto scrollbar-hidden">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={`w-full justify-start rounded-lg px-3 ${
                      pathname === item.href ? colors.secondary : "hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                    asChild
                  >
                    <Link href={item.href}>
                      <span className="mr-3">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                      {item.badgeCount && (
                        <span
                          className={`ml-auto ${colors.primary} text-white text-xs px-2 py-0.5 rounded-full`}
                        >
                          {item.badgeCount}
                        </span>
                      )}
                    </Link>
                  </Button>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg px-3 hover:bg-slate-100 dark:hover:bg-slate-700 mb-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-3 h-4 w-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-3 h-4 w-4" />
                    Dark Mode
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg px-3 hover:bg-slate-100 dark:hover:bg-slate-700 text-red-500 dark:text-red-400"
                asChild
              >
                <Link href="/" className="flex items-center">
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}