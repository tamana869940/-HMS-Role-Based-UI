import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Bell } from "lucide-react"

export function AdminHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground dark:text-slate-400">Manage hostel operations</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-slate-400" />
          <Input type="search" placeholder="Search..." className="w-full md:w-[200px] pl-8" />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}