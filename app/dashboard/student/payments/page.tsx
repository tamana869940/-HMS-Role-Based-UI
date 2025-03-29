"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, User, CreditCard, MessageSquare, FileText, Settings, Download, Calendar, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { studentNavItems } from "@/components/student/student-nav-items"

export default function StudentPaymentsPage() {
  const [activeTab, setActiveTab] = useState("history")

  // Mock payment data
  const paymentHistory = [
    {
      id: "HF-2023-001",
      date: "Jan 15, 2023",
      description: "Hostel Fee - Spring Semester 2023",
      amount: "₹45,000",
      status: "Paid",
      type: "hostel"
    },
    {
      id: "MF-2023-001",
      date: "Jan 20, 2023",
      description: "Mess Fee - Spring Semester 2023",
      amount: "₹12,000",
      status: "Paid",
      type: "mess"
    },
    {
      id: "LF-2023-001",
      date: "Feb 5, 2023",
      description: "Late Fee - Spring Semester 2023",
      amount: "₹500",
      status: "Paid",
      type: "late"
    },
    {
      id: "HF-2022-002",
      date: "Jul 10, 2022",
      description: "Hostel Fee - Fall Semester 2022",
      amount: "₹45,000",
      status: "Paid",
      type: "hostel"
    }
  ]

  const pendingPayments = [
    {
      id: "HF-2023-002",
      description: "Hostel Fee - Fall Semester 2023",
      dueDate: "Jul 15, 2023",
      amount: "₹45,000",
      status: "Upcoming"
    },
    {
      id: "MF-2023-002",
      description: "Mess Fee - Fall Semester 2023",
      dueDate: "Jul 20, 2023",
      amount: "₹12,000",
      status: "Upcoming"
    }
  ]

  const handleDownloadReceipt = (paymentId: string) => {
    // In a real app, this would download the receipt PDF
    console.log(`Downloading receipt for payment ${paymentId}`)
    // Mock download functionality
    alert(`Receipt for ${paymentId} would be downloaded in a real application`)
  }

  const handlePayNow = (paymentId: string) => {
    // In a real app, this would initiate a payment flow
    console.log(`Initiating payment for ${paymentId}`)
    // Mock payment functionality
    alert(`Payment flow for ${paymentId} would be initiated in a real application`)
  }

  return (
    <DashboardLayout
      userType="student"
      userName="John Doe"
      userRole="Room 203, Block A"
      userAvatar="JD"
      navItems={studentNavItems}
    >
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Payments</h1>
          <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300">Manage your hostel and mess fee payments</p>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Hostel Fee</p>
                  <h3 className="text-2xl font-bold mt-1 dark:text-slate-100">₹45,000</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">Paid for current semester</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Mess Fee</p>
                  <h3 className="text-2xl font-bold mt-1 dark:text-slate-100">₹12,000</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">Paid for current semester</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Next Payment</p>
                  <h3 className="text-2xl font-bold mt-1 dark:text-slate-100">₹57,000</h3>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">Due on July 15, 2023</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 dark:bg-slate-800 dark:border-slate-700">
            <TabsTrigger 
              value="history" 
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="dark:data-[state=active]:bg-yellow-600 dark:data-[state=active]:text-white"
            >
              <AlertCircle className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>Pending</span>
            </TabsTrigger>
            <TabsTrigger 
              value="receipts" 
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              <Download className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>Receipts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="dark:text-slate-100">Payment History</CardTitle>
                <CardDescription className="dark:text-slate-400">View all your previous payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden dark:border-slate-700">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                          <th className="text-left p-3 font-medium dark:text-slate-300">Receipt No.</th>
                          <th className="text-left p-3 font-medium dark:text-slate-300">Date</th>
                          <th className="text-left p-3 font-medium dark:text-slate-300">Description</th>
                          <th className="text-left p-3 font-medium dark:text-slate-300">Amount</th>
                          <th className="text-left p-3 font-medium dark:text-slate-300">Status</th>
                          <th className="text-left p-3 font-medium dark:text-slate-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {paymentHistory.map((payment) => (
                          <tr key={payment.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <td className="p-3 dark:text-slate-300">{payment.id}</td>
                            <td className="p-3 dark:text-slate-300">{payment.date}</td>
                            <td className="p-3 dark:text-slate-300">{payment.description}</td>
                            <td className="p-3 dark:text-slate-300">{payment.amount}</td>
                            <td className="p-3">
                              <Badge 
                                variant="outline" 
                                className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300"
                              >
                                {payment.status}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1 dark:border-slate-700 dark:text-slate-300"
                                onClick={() => handleDownloadReceipt(payment.id)}
                              >
                                <Download className="h-3 w-3" />
                                <span>Receipt</span>
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

          <TabsContent value="pending">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="dark:text-slate-100">Pending Payments</CardTitle>
                <CardDescription className="dark:text-slate-400">Upcoming fee payments that need to be made</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingPayments.map((payment) => (
                    <div 
                      key={payment.id} 
                      className="border rounded-lg p-4 dark:border-slate-700 dark:bg-slate-700/30"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold dark:text-slate-100">{payment.description}</h3>
                          <p className="text-sm text-muted-foreground dark:text-slate-400 mt-1">
                            Due on {payment.dueDate}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge 
                              variant="outline" 
                              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300"
                            >
                              {payment.status}
                            </Badge>
                            <p className="text-sm font-medium dark:text-slate-300">{payment.amount}</p>
                          </div>
                        </div>
                        <Button 
                          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                          onClick={() => handlePayNow(payment.id)}
                        >
                          <span>Pay Now</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receipts">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="dark:text-slate-100">Payment Receipts</CardTitle>
                <CardDescription className="dark:text-slate-400">Download receipts for your payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentHistory.map((payment) => (
                    <div 
                      key={payment.id} 
                      className="border rounded-lg p-4 dark:border-slate-700 dark:bg-slate-700/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold dark:text-slate-100">
                          {payment.type === 'hostel' ? 'Hostel Fee Receipt' : 
                           payment.type === 'mess' ? 'Mess Fee Receipt' : 'Late Fee Receipt'}
                        </h3>
                        <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-300">
                          {payment.date.includes('Jan') ? 'Spring 2023' : 
                           payment.date.includes('Jul') ? 'Fall 2022' : 'Other'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-slate-400 mb-4">
                        Receipt for {payment.description.toLowerCase()} of {payment.amount} made on {payment.date}.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2 dark:border-slate-700 dark:text-slate-300"
                        onClick={() => handleDownloadReceipt(payment.id)}
                      >
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}