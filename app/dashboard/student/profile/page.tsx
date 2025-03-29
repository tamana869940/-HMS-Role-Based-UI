"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, User, CreditCard, MessageSquare, FileText, Settings, Upload, Save } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { studentNavItems } from "@/components/student/student-nav-items"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [documents, setDocuments] = useState<{
    idProof: File | null,
    addressProof: File | null,
    medicalCertificate: File | null,
    marksheet: File | null
  }>({
    idProof: null,
    addressProof: null,
    medicalCertificate: null,
    marksheet: null
  })
  
  // Refs for file inputs
  const fileInputRefs = {
    profile: useRef(null),
    idProof: useRef(null),
    addressProof: useRef(null),
    medicalCertificate: useRef(null),
    marksheet: useRef(null)
  }

  // Handle file upload
  const handleFileUpload = (type: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file) return

    if (type === 'profile') {
      setProfileImage(URL.createObjectURL(file))
    } else {
      setDocuments(prev => ({
        ...prev,
        [type]: file
      }))
    }
  }

  // Trigger file input click
  const triggerFileInput = (type: string) => {
    (fileInputRefs[type as keyof typeof fileInputRefs]?.current as unknown as HTMLInputElement)?.click()
  }

  // View document
  const viewDocument = (file: Blob | MediaSource | null) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      window.open(fileUrl, '_blank')
    }
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
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">My Profile</h1>
          <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300">View and update your personal information</p>
        </div>

        <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-slate-800 dark border-blue-200 dark:border-blue-800">
            <TabsTrigger 
              value="personal" 
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              <User className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>Personal</span>
            </TabsTrigger>
            <TabsTrigger 
              value="academic" 
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>Academic</span>
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white"
            >
              <Upload className="h-4 w-4 mr-2 hidden sm:inline" />
              <span>Documents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="dark:text-slate-100">Personal Information</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profileImage || "/placeholder.svg?height=128&width=128"} alt="Profile" />
                      <AvatarFallback className="dark:bg-slate-700 dark:text-slate-200">JD</AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      ref={fileInputRefs.profile}
                      onChange={(e) => handleFileUpload('profile', e)}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 dark:border-slate-700 dark:text-slate-200"
                      onClick={() => triggerFileInput('profile')}
                    >
                      <Upload className="h-4 w-4" />
                      <span>{profileImage ? "Change Photo" : "Upload Photo"}</span>
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="dark:text-slate-300">First Name</Label>
                        <Input 
                          id="first-name" 
                          defaultValue="John" 
                          className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="dark:text-slate-300">Last Name</Label>
                        <Input 
                          id="last-name" 
                          defaultValue="Doe" 
                          className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="dark:text-slate-300">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="john.doe@example.com" 
                        className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="dark:text-slate-300">Phone Number</Label>
                      <Input 
                        id="phone" 
                        defaultValue="+91 98765 43210" 
                        className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dob" className="dark:text-slate-300">Date of Birth</Label>
                        <Input 
                          id="dob" 
                          type="date" 
                          defaultValue="2000-05-15" 
                          className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="dark:text-slate-300">Gender</Label>
                        <Select defaultValue="male">
                          <SelectTrigger 
                            id="gender" 
                            className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                          >
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                            <SelectItem value="male" className="dark:hover:bg-slate-700">Male</SelectItem>
                            <SelectItem value="female" className="dark:hover:bg-slate-700">Female</SelectItem>
                            <SelectItem value="other" className="dark:hover:bg-slate-700">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="dark:text-slate-300">Permanent Address</Label>
                  <Textarea 
                    id="address" 
                    rows={3} 
                    defaultValue="123 Main Street, City Name, State, PIN: 123456" 
                    className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-slate-300">Emergency Contact</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      id="emergency-contact-name" 
                      placeholder="Contact Name" 
                      defaultValue="Robert Doe" 
                      className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    />
                    <Input 
                      id="emergency-contact-number" 
                      placeholder="Contact Number" 
                      defaultValue="+91 87654 32109" 
                      className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    />
                  </div>
                  <Input
                    id="emergency-contact-relation"
                    placeholder="Relation"
                    defaultValue="Father"
                    className="mt-2 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="dark:text-slate-100">Academic Information</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Your academic details and course information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="student-id" className="dark:text-slate-300">Student ID</Label>
                    <Input 
                      id="student-id" 
                      defaultValue="STU001" 
                      readOnly 
                      className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admission-year" className="dark:text-slate-300">Admission Year</Label>
                    <Input 
                      id="admission-year" 
                      defaultValue="2021" 
                      readOnly 
                      className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course" className="dark:text-slate-300">Course</Label>
                    <Input 
                      id="course" 
                      defaultValue="B.Tech Computer Science" 
                      readOnly 
                      className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year" className="dark:text-slate-300">Current Year</Label>
                    <Input 
                      id="year" 
                      defaultValue="3rd Year" 
                      readOnly 
                      className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester" className="dark:text-slate-300">Current Semester</Label>
                    <Input 
                      id="semester" 
                      defaultValue="5th Semester" 
                      readOnly 
                      className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa" className="dark:text-slate-300">Current CGPA</Label>
                    <Input 
                      id="cgpa" 
                      defaultValue="8.5" 
                      readOnly 
                      className="dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-slate-300">Hostel Details</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-md dark:border-slate-700 dark:bg-slate-700">
                      <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Block</p>
                      <p className="font-medium dark:text-slate-200">Block A</p>
                    </div>
                    <div className="p-4 border rounded-md dark:border-slate-700 dark:bg-slate-700">
                      <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Room Number</p>
                      <p className="font-medium dark:text-slate-200">203</p>
                    </div>
                    <div className="p-4 border rounded-md dark:border-slate-700 dark:bg-slate-700">
                      <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">Room Type</p>
                      <p className="font-medium dark:text-slate-200">Double Sharing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="dark:text-slate-100">Documents</CardTitle>
                <CardDescription className="dark:text-slate-400">
                  Upload and manage your important documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* ID Proof */}
                  <div className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-md dark:border-slate-700">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium dark:text-slate-200">ID Proof</p>
                      <p className="text-sm text-muted-foreground dark:text-slate-400">
                        {documents.idProof ? documents.idProof.name : "Aadhar Card or PAN Card"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRefs.idProof}
                        onChange={(e) => handleFileUpload('idProof', e)}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="dark:border-slate-700 dark:text-slate-200"
                        onClick={() => viewDocument(documents.idProof)}
                        disabled={!documents.idProof}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                        onClick={() => triggerFileInput('idProof')}
                      >
                        {documents.idProof ? "Change" : "Upload"}
                      </Button>
                    </div>
                  </div>

                  {/* Address Proof */}
                  <div className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-md dark:border-slate-700">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium dark:text-slate-200">Address Proof</p>
                      <p className="text-sm text-muted-foreground dark:text-slate-400">
                        {documents.addressProof ? documents.addressProof.name : "Passport, Voter ID, or Utility Bill"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRefs.addressProof}
                        onChange={(e) => handleFileUpload('addressProof', e)}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="dark:border-slate-700 dark:text-slate-200"
                        onClick={() => viewDocument(documents.addressProof)}
                        disabled={!documents.addressProof}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                        onClick={() => triggerFileInput('addressProof')}
                      >
                        {documents.addressProof ? "Change" : "Upload"}
                      </Button>
                    </div>
                  </div>

                  {/* Medical Certificate */}
                  <div className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-md dark:border-slate-700">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium dark:text-slate-200">Medical Certificate</p>
                      <p className="text-sm text-muted-foreground dark:text-slate-400">
                        {documents.medicalCertificate ? documents.medicalCertificate.name : "Health and fitness certificate"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRefs.medicalCertificate}
                        onChange={(e) => handleFileUpload('medicalCertificate', e)}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="dark:border-slate-700 dark:text-slate-200"
                        onClick={() => viewDocument(documents.medicalCertificate)}
                        disabled={!documents.medicalCertificate}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                        onClick={() => triggerFileInput('medicalCertificate')}
                      >
                        {documents.medicalCertificate ? "Change" : "Upload"}
                      </Button>
                    </div>
                  </div>

                  {/* Marksheet */}
                  <div className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-md dark:border-slate-700">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium dark:text-slate-200">Previous Semester Marksheet</p>
                      <p className="text-sm text-muted-foreground dark:text-slate-400">
                        {documents.marksheet ? documents.marksheet.name : "4th Semester results"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRefs.marksheet}
                        onChange={(e) => handleFileUpload('marksheet', e)}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="dark:border-slate-700 dark:text-slate-200"
                        onClick={() => viewDocument(documents.marksheet)}
                        disabled={!documents.marksheet}
                      >
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                        onClick={() => triggerFileInput('marksheet')}
                      >
                        {documents.marksheet ? "Change" : "Upload"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}