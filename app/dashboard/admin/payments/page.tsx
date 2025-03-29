"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { adminNavItems } from "@/components/admin/admin-nav-items"
import { format } from "date-fns"
import { toast } from "sonner"
import { 
  Search, 
  Download, 
  Filter, 
  Eye, 
  FileEdit, 
  Plus, 
  Building, 
  CreditCard, 
  Receipt,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Payment = {
  id: string
  studentId: string
  studentName: string
  type: string
  amount: number
  date: string
  status: "Paid" | "Pending"
  paymentMethod: string | null
  semester: string
  receiptNo: string | null
}

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("all")
  const [semesterFilter, setSemesterFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for payments
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "PAY-2023-001",
      studentId: "STU001",
      studentName: "John Doe",
      type: "Hostel Fee",
      amount: 45000,
      date: "2023-01-15",
      status: "Paid",
      paymentMethod: "Online Transfer",
      semester: "Spring 2023",
      receiptNo: "HF-2023-001",
    },
    {
      id: "PAY-2023-002",
      studentId: "STU001",
      studentName: "John Doe",
      type: "Mess Fee",
      amount: 12000,
      date: "2023-01-20",
      status: "Paid",
      paymentMethod: "Online Transfer",
      semester: "Spring 2023",
      receiptNo: "MF-2023-001",
    },
    {
      id: "PAY-2023-003",
      studentId: "STU002",
      studentName: "Priya Sharma",
      type: "Hostel Fee",
      amount: 45000,
      date: "2023-01-18",
      status: "Paid",
      paymentMethod: "Credit Card",
      semester: "Spring 2023",
      receiptNo: "HF-2023-002",
    },
    {
      id: "PAY-2023-004",
      studentId: "STU002",
      studentName: "Priya Sharma",
      type: "Mess Fee",
      amount: 12000,
      date: "2023-01-22",
      status: "Paid",
      paymentMethod: "Credit Card",
      semester: "Spring 2023",
      receiptNo: "MF-2023-002",
    },
    {
      id: "PAY-2023-005",
      studentId: "STU003",
      studentName: "Rahul Singh",
      type: "Hostel Fee",
      amount: 45000,
      date: "2023-01-10",
      status: "Paid",
      paymentMethod: "Debit Card",
      semester: "Spring 2023",
      receiptNo: "HF-2023-003",
    },
    {
      id: "PAY-2023-006",
      studentId: "STU004",
      studentName: "Ananya Patel",
      type: "Hostel Fee",
      amount: 45000,
      date: "2023-07-15",
      status: "Pending",
      paymentMethod: null,
      semester: "Fall 2023",
      receiptNo: null,
    },
    {
      id: "PAY-2023-007",
      studentId: "STU006",
      studentName: "Neha Gupta",
      type: "Hostel Fee",
      amount: 45000,
      date: "2023-07-15",
      status: "Pending",
      paymentMethod: null,
      semester: "Fall 2023",
      receiptNo: null,
    },
  ])

  // State for new payment form
  const [newPayment, setNewPayment] = useState<Omit<Payment, 'id' | 'receiptNo'>>({
    studentId: "",
    studentName: "",
    type: "",
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    status: "Paid",
    paymentMethod: "",
    semester: ""
  })

  // Filter payments based on search term and filters
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = paymentTypeFilter === "all" || payment.type.toLowerCase().includes(paymentTypeFilter.toLowerCase())
    const matchesSemester = semesterFilter === "all" || payment.semester.toLowerCase().includes(semesterFilter.toLowerCase())
    
    return matchesSearch && matchesType && matchesSemester
  })

  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Payment statistics
  const totalAmount = payments.reduce((sum, payment) => (payment.status === "Paid" ? sum + payment.amount : sum), 0)
  const pendingAmount = payments.reduce(
    (sum, payment) => (payment.status === "Pending" ? sum + payment.amount : sum),
    0,
  )
  const hostelFeeAmount = payments
    .filter((payment) => payment.type === "Hostel Fee" && payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const messFeeAmount = payments
    .filter((payment) => payment.type === "Mess Fee" && payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // Handle adding a new payment
  const handleAddPayment = () => {
    if (!newPayment.studentId || !newPayment.type || !newPayment.amount || !newPayment.semester) {
      toast.error("Please fill in all required fields")
      return
    }

    const newId = `PAY-${new Date().getFullYear()}-${(payments.length + 1).toString().padStart(3, '0')}`
    const receiptNo = newPayment.status === "Paid" ? 
      `${newPayment.type.charAt(0)}F-${new Date().getFullYear()}-${(payments.filter(p => p.type === newPayment.type).length + 1).toString().padStart(3, '0')}` : 
      null

    const addedPayment: Payment = {
      ...newPayment,
      id: newId,
      receiptNo,
      date: new Date().toISOString().split('T')[0]
    }

    setPayments([...payments, addedPayment])
    setNewPayment({
      studentId: "",
      studentName: "",
      type: "",
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      status: "Paid",
      paymentMethod: "",
      semester: ""
    })
    toast.success("Payment recorded successfully")
  }

  // Handle marking payment as paid
  const handleMarkAsPaid = (paymentId: string) => {
    const updatedPayments = payments.map(payment => {
      if (payment.id === paymentId) {
        return {
          ...payment,
          status: "Paid" as "Paid" | "Pending",
          paymentMethod: payment.paymentMethod || "Cash",
          receiptNo: `${payment.type.charAt(0)}F-${new Date().getFullYear()}-${(payments.filter(p => p.type === payment.type).length + 1).toString().padStart(3, '0')}`
        }
      }
      return payment
    })
    
    setPayments(updatedPayments)
    toast.success("Payment marked as paid")
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
            <h1 className="text-2xl font-bold tracking-tight">Payment Management</h1>
            <p className="text-muted-foreground text-sm">View and manage all hostel payments</p>
          </div>
          
          {/* Add New Payment Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus size={16} />
                <span>Record Payment</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
                <DialogDescription>
                  Enter the details of the payment to record in the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student" className="text-sm">
                      Student <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={newPayment.studentId}
                      onValueChange={(value) => setNewPayment({
                        ...newPayment,
                        studentId: value,
                        studentName: value === "STU001" ? "John Doe" : 
                                     value === "STU002" ? "Priya Sharma" :
                                     value === "STU003" ? "Rahul Singh" : "Ananya Patel"
                      })}
                    >
                      <SelectTrigger id="student" className="text-sm h-9">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STU001">John Doe (STU001)</SelectItem>
                        <SelectItem value="STU002">Priya Sharma (STU002)</SelectItem>
                        <SelectItem value="STU003">Rahul Singh (STU003)</SelectItem>
                        <SelectItem value="STU004">Ananya Patel (STU004)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-type" className="text-sm">
                      Payment Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={newPayment.type}
                      onValueChange={(value) => setNewPayment({...newPayment, type: value})}
                    >
                      <SelectTrigger id="payment-type" className="text-sm h-9">
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hostel Fee">Hostel Fee</SelectItem>
                        <SelectItem value="Mess Fee">Mess Fee</SelectItem>
                        <SelectItem value="Late Fee">Late Fee</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm">
                      Amount (₹) <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="Enter amount" 
                      className="text-sm h-9"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({...newPayment, amount: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-date" className="text-sm">
                      Payment Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="payment-date"
                      type="date"
                      className="text-sm h-9"
                      value={newPayment.date}
                      onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-method" className="text-sm">
                      Payment Method
                    </Label>
                    <Select
                      value={newPayment.paymentMethod || ""}
                      onValueChange={(value) => setNewPayment({...newPayment, paymentMethod: value})}
                    >
                      <SelectTrigger id="payment-method" className="text-sm h-9">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Online Transfer">Online Transfer</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Debit Card">Debit Card</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester" className="text-sm">
                      Semester <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={newPayment.semester}
                      onValueChange={(value) => setNewPayment({...newPayment, semester: value})}
                    >
                      <SelectTrigger id="semester" className="text-sm h-9">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Spring 2023">Spring 2023</SelectItem>
                        <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                        <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm">
                    Status
                  </Label>
                  <Select
                    value={newPayment.status}
                    onValueChange={(value) => setNewPayment({...newPayment, status: value as "Paid" | "Pending"})}
                  >
                    <SelectTrigger id="status" className="text-sm h-9">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700" 
                  onClick={handleAddPayment}
                >
                  Record Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator className="my-4" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={totalAmount}
            icon={<CreditCard className="h-5 w-5" />}
            color="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
            border="border-indigo-200 dark:border-indigo-800"
            hover="hover:border-indigo-300 dark:hover:border-indigo-600"
            trend="up"
            trendValue="12%"
          />
          <StatCard
            title="Hostel Fee"
            value={hostelFeeAmount}
            icon={<Building className="h-5 w-5" />}
            color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
            border="border-emerald-200 dark:border-emerald-800"
            hover="hover:border-emerald-300 dark:hover:border-emerald-600"
            description={`${payments.filter(p => p.type === "Hostel Fee" && p.status === "Paid").length} payments`}
          />
          <StatCard
            title="Mess Fee"
            value={messFeeAmount}
            icon={<Receipt className="h-5 w-5" />}
            color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
            border="border-blue-200 dark:border-blue-800"
            hover="hover:border-blue-300 dark:hover:border-blue-600"
            description={`${payments.filter(p => p.type === "Mess Fee" && p.status === "Paid").length} payments`}
          />
          <StatCard
            title="Pending Amount"
            value={pendingAmount}
            icon={<ArrowUpDown className="h-5 w-5" />}
            color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300"
            border="border-amber-200 dark:border-amber-800"
            hover="hover:border-amber-300 dark:hover:border-amber-600"
            description={`${payments.filter(p => p.status === "Pending").length} pending`}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3 sm:grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="hostel">Hostel</TabsTrigger>
              <TabsTrigger value="mess">Mess</TabsTrigger>
            </TabsList>
            
            <div className="w-full md:w-auto flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search payments..."
                  className="pl-9 text-sm h-9 sm:h-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-9 sm:h-10">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Filters</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2 space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="type-filter" className="text-xs">Payment Type</Label>
                      <Select
                        value={paymentTypeFilter}
                        onValueChange={(value) => {
                          setPaymentTypeFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="type-filter" className="h-8 text-xs">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="hostel">Hostel Fee</SelectItem>
                          <SelectItem value="mess">Mess Fee</SelectItem>
                          <SelectItem value="late">Late Fee</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="semester-filter" className="text-xs">Semester</Label>
                      <Select
                        value={semesterFilter}
                        onValueChange={(value) => {
                          setSemesterFilter(value)
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger id="semester-filter" className="h-8 text-xs">
                          <SelectValue placeholder="All Semesters" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Semesters</SelectItem>
                          <SelectItem value="spring2023">Spring 2023</SelectItem>
                          <SelectItem value="fall2023">Fall 2023</SelectItem>
                          <SelectItem value="spring2024">Spring 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" className="h-9 sm:h-10">
                <Download className="h-4 w-4 mr-2" />
                <span>Export</span>
              </Button>
            </div>
          </div>

          {/* All Payments Tab */}
          <TabsContent value="all">
            <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
              <CardHeader className="p-4 sm:p-6 pb-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">All Payments</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Showing {filteredPayments.length} payment records
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8"
                      disabled={currentPage <= 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8"
                      disabled={currentPage >= totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-800">
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Payment ID</TableHead>
                        <TableHead className="text-xs sm:text-sm">Student</TableHead>
                        <TableHead className="text-xs sm:text-sm">Type</TableHead>
                        <TableHead className="text-xs sm:text-sm">Amount</TableHead>
                        <TableHead className="text-xs sm:text-sm">Date</TableHead>
                        <TableHead className="text-xs sm:text-sm">Semester</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedPayments.length > 0 ? (
                        paginatedPayments.map((payment) => (
                          <TableRow key={payment.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <TableCell className="font-medium text-xs sm:text-sm">{payment.id}</TableCell>
                            <TableCell className="text-xs sm:text-sm">
                              <div className="font-medium">{payment.studentName}</div>
                              <div className="text-muted-foreground">{payment.studentId}</div>
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm">{payment.type}</TableCell>
                            <TableCell className="text-xs sm:text-sm">₹{payment.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-xs sm:text-sm">
                              {format(new Date(payment.date), "dd MMM yyyy")}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm">{payment.semester}</TableCell>
                            <TableCell className="text-xs sm:text-sm">
                              <Badge
                                variant="outline"
                                className={
                                  payment.status === "Paid"
                                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs"
                                    : "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 text-xs"
                                }
                              >
                                {payment.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-xs cursor-pointer">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  {payment.status === "Paid" && (
                                    <DropdownMenuItem className="text-xs cursor-pointer">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download Receipt
                                    </DropdownMenuItem>
                                  )}
                                  {payment.status === "Pending" && (
                                    <DropdownMenuItem 
                                      className="text-xs cursor-pointer"
                                      onClick={() => handleMarkAsPaid(payment.id)}
                                    >
                                      <FileEdit className="mr-2 h-4 w-4" />
                                      Mark as Paid
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center text-muted-foreground text-sm">
                            No payments found matching your criteria
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paid Payments Tab */}
          <TabsContent value="paid">
            <PaidPaymentsTab 
              payments={payments.filter(p => p.status === "Paid")} 
              totalAmount={totalAmount}
            />
          </TabsContent>

          {/* Pending Payments Tab */}
          <TabsContent value="pending">
            <PendingPaymentsTab 
              payments={payments.filter(p => p.status === "Pending")} 
              pendingAmount={pendingAmount}
              onMarkAsPaid={handleMarkAsPaid}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Paid Payments Tab Component
function PaidPaymentsTab({ payments, totalAmount }: { payments: Payment[], totalAmount: number }) {
  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6 pb-0">
        <div>
          <CardTitle className="text-lg sm:text-xl">Paid Payments</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {payments.length} paid payments totaling ₹{totalAmount.toLocaleString()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-800">
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Payment ID</TableHead>
                <TableHead className="text-xs sm:text-sm">Student</TableHead>
                <TableHead className="text-xs sm:text-sm">Type</TableHead>
                <TableHead className="text-xs sm:text-sm">Amount</TableHead>
                <TableHead className="text-xs sm:text-sm">Date</TableHead>
                <TableHead className="text-xs sm:text-sm">Receipt No.</TableHead>
                <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <TableCell className="font-medium text-xs sm:text-sm">{payment.id}</TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      <div className="font-medium">{payment.studentName}</div>
                      <div className="text-muted-foreground">{payment.studentId}</div>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">{payment.type}</TableCell>
                    <TableCell className="text-xs sm:text-sm">₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {format(new Date(payment.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">{payment.receiptNo}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-xs sm:text-sm"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground text-sm">
                    No paid payments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// Pending Payments Tab Component
function PendingPaymentsTab({ payments, pendingAmount, onMarkAsPaid }: { 
  payments: Payment[], 
  pendingAmount: number,
  onMarkAsPaid: (id: string) => void 
}) {
  return (
    <Card className="border border-slate-200 dark:border-slate-800 dark:bg-slate-800/50">
      <CardHeader className="p-4 sm:p-6 pb-0">
        <div>
          <CardTitle className="text-lg sm:text-xl">Pending Payments</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {payments.length} pending payments totaling ₹{pendingAmount.toLocaleString()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-800">
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Payment ID</TableHead>
                <TableHead className="text-xs sm:text-sm">Student</TableHead>
                <TableHead className="text-xs sm:text-sm">Type</TableHead>
                <TableHead className="text-xs sm:text-sm">Amount</TableHead>
                <TableHead className="text-xs sm:text-sm">Due Date</TableHead>
                <TableHead className="text-xs sm:text-sm">Semester</TableHead>
                <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <TableCell className="font-medium text-xs sm:text-sm">{payment.id}</TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      <div className="font-medium">{payment.studentName}</div>
                      <div className="text-muted-foreground">{payment.studentId}</div>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">{payment.type}</TableCell>
                    <TableCell className="text-xs sm:text-sm">₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {format(new Date(payment.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">{payment.semester}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        className="h-8 text-xs sm:text-sm"
                        onClick={() => onMarkAsPaid(payment.id)}
                      >
                        Mark as Paid
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground text-sm">
                    No pending payments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
  description?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}

function StatCard({ 
  title, 
  value, 
  icon, 
  color, 
  border, 
  hover, 
  description,
  trend,
  trendValue
}: StatCardProps) {
  return (
    <Card className={`border ${border} ${hover} transition-colors dark:bg-slate-800/50`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-xl sm:text-2xl font-bold">₹{value.toLocaleString()}</h3>
            <div className="flex items-center mt-1 sm:mt-2">
              {trend && (
                <Badge 
                  variant={trend === 'up' ? 'default' : 'destructive'} 
                  className="mr-1 sm:mr-2 px-1 py-0 text-xs"
                >
                  {trend === 'up' ? `↑ ${trendValue}` : `↓ ${trendValue}`}
                </Badge>
              )}
              {description && (
                <p className="text-xs text-muted-foreground dark:text-slate-400">{description}</p>
              )}
            </div>
          </div>
          <div className={`${color} p-2 sm:p-3 rounded-lg`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}