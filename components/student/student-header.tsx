"use client";

import { Button } from "@/components/ui/button";
import { Bell, Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function StudentHeader() {
  const isMobile = useIsMobile("(max-width: 640px)");

  return (
    <header className="w-full relative z-50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Student Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300">
            Welcome back, <span className="font-medium">John Doe</span>
          </p>
        </div>

        {/* Desktop Buttons - now shown on all screen sizes */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size={isMobile ? "icon" : "sm"}
            className="rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            {!isMobile && (
              <span className="ml-2 text-indigo-600 dark:text-indigo-300">Notifications</span>
            )}
          </Button>

          <Button
            variant="ghost"
            size={isMobile ? "icon" : "sm"}
            className="rounded-full hover:bg-teal-50 dark:hover:bg-teal-900/30"
            aria-label="Calendar"
          >
            <Calendar className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            {!isMobile && (
              <span className="ml-2 text-teal-600 dark:text-teal-300">Calendar</span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}