"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, User, CreditCard, MessageSquare, FileText, Settings, Lock, Bell, Save } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { studentNavItems } from "@/components/student/student-nav-items"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentSettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [formData, setFormData] = useState({
    displayName: "John Doe",
    email: "john.doe@example.com",
    language: "en",
    timezone: "ist",
    accountVisibility: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
    emailNotifications: {
      complaintUpdates: true,
      leaveUpdates: true,
      paymentReminders: true,
      hostelAnnouncements: true
    },
    smsNotifications: {
      emergencyAlerts: true,
      leaveApproval: false
    },
    appNotifications: {
      allActivities: true,
      mentions: true
    }
  })

  const handleInputChange = (e: { target: { id: any; value: any; type: any; checked: any } }) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSwitchChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedSwitchChange = (category: keyof typeof formData, field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object' && prev[category] !== null
        ? { ...prev[category], [field]: value }
        : { [field]: value }
    }))
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // In a real app, you would send this data to your backend
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
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="account" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 dark:bg-slate-800 dark:border-slate-700">
            <TabsTrigger 
              value="account" 
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              <Lock className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="dark:text-slate-100">Account Settings</CardTitle>
                <CardDescription className="dark:text-slate-400">Update your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="dark:text-slate-300">Display Name</Label>
                  <Input 
                    id="displayName" 
                    value={formData.displayName} 
                    onChange={handleInputChange}
                    className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                  />
                  <p className="text-xs text-muted-foreground dark:text-slate-400">
                    This is how your name will appear in the hostel system
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-slate-300">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                  />
                  <p className="text-xs text-muted-foreground dark:text-slate-400">
                    This email will be used for all communications
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language" className="dark:text-slate-300">Language</Label>
                  <Select 
                    value={formData.language} 
                    onValueChange={(value) => setFormData({...formData, language: value})}
                  >
                    <SelectTrigger className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="en" className="dark:hover:bg-slate-700">English</SelectItem>
                      <SelectItem value="hi" className="dark:hover:bg-slate-700">Hindi</SelectItem>
                      <SelectItem value="ta" className="dark:hover:bg-slate-700">Tamil</SelectItem>
                      <SelectItem value="te" className="dark:hover:bg-slate-700">Telugu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="dark:text-slate-300">Time Zone</Label>
                  <Select 
                    value={formData.timezone} 
                    onValueChange={(value) => setFormData({...formData, timezone: value})}
                  >
                    <SelectTrigger className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="ist" className="dark:hover:bg-slate-700">Indian Standard Time (IST)</SelectItem>
                      <SelectItem value="utc" className="dark:hover:bg-slate-700">Coordinated Universal Time (UTC)</SelectItem>
                      <SelectItem value="est" className="dark:hover:bg-slate-700">Eastern Standard Time (EST)</SelectItem>
                      <SelectItem value="pst" className="dark:hover:bg-slate-700">Pacific Standard Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="dark:text-slate-300">Account Visibility</Label>
                      <p className="text-sm text-muted-foreground dark:text-slate-400">
                        Allow other students to see your profile
                      </p>
                    </div>
                    <Switch 
                      checked={formData.accountVisibility} 
                      onCheckedChange={(value) => handleSwitchChange('accountVisibility', value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                  onClick={handleSubmit}
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="dark:text-slate-100">Security Settings</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-slate-200">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="dark:text-slate-300">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        type="password" 
                        value={formData.currentPassword} 
                        onChange={handleInputChange}
                        className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="dark:text-slate-300">New Password</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        value={formData.newPassword} 
                        onChange={handleInputChange}
                        className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="dark:text-slate-300">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        value={formData.confirmPassword} 
                        onChange={handleInputChange}
                        className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-slate-200">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium dark:text-slate-300">Enable Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground dark:text-slate-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch 
                      checked={formData.twoFactorAuth} 
                      onCheckedChange={(value) => handleSwitchChange('twoFactorAuth', value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-slate-200">Login Sessions</h3>
                  <div className="border rounded-lg p-4 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium dark:text-slate-300">Current Session</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">
                          Chrome on Windows • IP: 192.168.1.1
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="dark:border-slate-700 dark:text-slate-300">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                  onClick={handleSubmit}
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="dark:text-slate-100">Notification Preferences</CardTitle>
                <CardDescription className="dark:text-slate-400">Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-slate-200">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium dark:text-slate-300">Complaint Updates</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">
                          Receive email when your complaint status changes
                        </p>
                      </div>
                      <Switch 
                        checked={formData.emailNotifications.complaintUpdates} 
                        onCheckedChange={(value) => handleNestedSwitchChange('emailNotifications', 'complaintUpdates', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium dark:text-slate-300">Leave Application Updates</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">
                          Receive email when your leave application status changes
                        </p>
                      </div>
                      <Switch 
                        checked={formData.emailNotifications.leaveUpdates} 
                        onCheckedChange={(value) => handleNestedSwitchChange('emailNotifications', 'leaveUpdates', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium dark:text-slate-300">Payment Reminders</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">
                          Receive email reminders for upcoming payments
                        </p>
                      </div>
                      <Switch 
                        checked={formData.emailNotifications.paymentReminders} 
                        onCheckedChange={(value) => handleNestedSwitchChange('emailNotifications', 'paymentReminders', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium dark:text-slate-300">Hostel Announcements</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">
                          Receive email about important hostel announcements
                        </p>
                      </div>
                      <Switch 
                        checked={formData.emailNotifications.hostelAnnouncements} 
                        onCheckedChange={(value) => handleNestedSwitchChange('emailNotifications', 'hostelAnnouncements', value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-slate-200">SMS Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium dark:text-slate-300">Emergency Alerts</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">
                          Receive SMS for emergency situations
                        </p>
                      </div>
                      <Switch 
                        checked={formData.smsNotifications.emergencyAlerts} 
                        onCheckedChange={(value) => handleNestedSwitchChange('smsNotifications', 'emergencyAlerts', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium dark:text-slate-300">Leave Approval</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">
                          Receive SMS when your leave is approved or rejected
                        </p>
                      </div>
                      <Switch 
                        checked={formData.smsNotifications.leaveApproval} 
                        onCheckedChange={(value) => handleNestedSwitchChange('smsNotifications', 'leaveApproval', value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium dark:text-slate-200">In-App Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium dark:text-slate-300">All Activities</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">
                          Receive in-app notifications for all activities
                        </p>
                      </div>
                      <Switch 
                        checked={formData.appNotifications.allActivities} 
                        onCheckedChange={(value) => handleNestedSwitchChange('appNotifications', 'allActivities', value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium dark:text-slate-300">Mentions</p>
                        <p className="text-sm text-muted-foreground dark:text-slate-400">
                          Receive in-app notifications when you are mentioned
                        </p>
                      </div>
                      <Switch 
                        checked={formData.appNotifications.mentions} 
                        onCheckedChange={(value) => handleNestedSwitchChange('appNotifications', 'mentions', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                  onClick={handleSubmit}
                >
                  <Save className="h-4 w-4" />
                  <span>Save Preferences</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}