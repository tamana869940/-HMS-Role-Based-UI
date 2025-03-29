"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, ShieldCheck, User, Home, Key, Mail, ChevronLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("student")
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const type = searchParams.get("type")
    if (type && ["student", "admin", "warden"].includes(type)) {
      setActiveTab(type)
    }
  }, [searchParams])

  const handleLogin = (e: React.FormEvent, userType: string) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login successful",
        description: `Welcome to the ${userType} dashboard`,
      })
      router.push(`/dashboard/${userType}`)
    }, 1000)
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Reset link sent",
        description: "We've sent a password reset link to your email",
      })
      setShowForgotPassword(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
  <div className="container mx-auto px-4 py-4 flex items-center">
    {/* Logo and Institution Name - Left Side */}
    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity mr-auto">
      <div className="relative h-8 w-8">
        <Image 
          src="/logo.png" 
          alt="Goel Group Of Institutions Logo"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        Goel Group Of Institutions
      </h1>
    </Link>

    {/* Navigation - Centered */}
    <nav className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
      <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
        Features
      </Link>
      <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
        About
      </Link>
      <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
        Contact
      </Link>
    </nav>
    {/* Login Button - Right Side */}
    <Link href="/login" className="ml-auto">
      <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg shadow-blue-500/20">
        Login
      </Button>
    </Link>
  </div>
</header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="w-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden shadow-xl">
            {/* Gradient Accent */}
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600" aria-hidden="true"></div>

            <CardHeader className="text-center pt-8 pb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-500/10 p-3 rounded-full">
                  {showForgotPassword ? (
                    <Mail className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                  ) : (
                    <Key className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                  )}
                </div>
              </div>
              <CardTitle className="text-2xl text-white font-bold">
                {showForgotPassword ? "Reset Your Password" : "Welcome Back"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {showForgotPassword
                  ? "Enter your email to receive a reset link"
                  : `Login to your ${activeTab} account`}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              {showForgotPassword ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email" className="text-gray-300">
                      Email Address
                    </Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                      aria-describedby="email-help"
                    />
                    <p id="email-help" className="text-xs text-gray-500">
                      Enter the email associated with your account
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-700 hover:bg-gray-800 text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-500"
                      onClick={() => setShowForgotPassword(false)}
                      aria-label="Cancel password reset"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-500"
                      disabled={isLoading}
                      aria-label="Send password reset link"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : "Send Reset Link"}
                    </Button>
                  </div>
                </form>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6 bg-gray-800 p-1 rounded-lg h-auto">
                    <TabsTrigger
                      value="student"
                      className="flex flex-col items-center gap-1 py-2 px-1 rounded-md data-[state=active]:bg-gray-700 focus-visible:ring-2 focus-visible:ring-indigo-500"
                      aria-label="Student login"
                    >
                      <User className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs sm:text-sm">Student</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="admin"
                      className="flex flex-col items-center gap-1 py-2 px-1 rounded-md data-[state=active]:bg-gray-700 focus-visible:ring-2 focus-visible:ring-indigo-500"
                      aria-label="Admin login"
                    >
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs sm:text-sm">Admin</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="warden"
                      className="flex flex-col items-center gap-1 py-2 px-1 rounded-md data-[state=active]:bg-gray-700 focus-visible:ring-2 focus-visible:ring-indigo-500"
                      aria-label="Warden login"
                    >
                      <Home className="h-5 w-5" aria-hidden="true" />
                      <span className="text-xs sm:text-sm">Warden</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Student Login */}
                  <TabsContent value="student">
                    <form onSubmit={(e) => handleLogin(e, "student")} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-id" className="text-gray-300">Hostel ID</Label>
                        <Input
                          id="student-id"
                          placeholder="HST20230001"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                          aria-describedby="student-id-help"
                        />
                        <p id="student-id-help" className="text-xs text-gray-500">
                          Your unique hostel identification number
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-password" className="text-gray-300">Password</Label>
                        <Input
                          id="student-password"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-500"
                        disabled={isLoading}
                        aria-label="Login as student"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                          </span>
                        ) : "Login as Student"}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Admin Login */}
                  <TabsContent value="admin">
                    <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-email" className="text-gray-300">Email</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@hostelhub.edu"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                          aria-describedby="admin-email-help"
                        />
                        <p id="admin-email-help" className="text-xs text-gray-500">
                          Your administrative email address
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-password" className="text-gray-300">Password</Label>
                        <Input
                          id="admin-password"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-500"
                        disabled={isLoading}
                        aria-label="Login as admin"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                          </span>
                        ) : "Login as Admin"}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Warden Login */}
                  <TabsContent value="warden">
                    <form onSubmit={(e) => handleLogin(e, "warden")} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="warden-email" className="text-gray-300">Email</Label>
                        <Input
                          id="warden-email"
                          type="email"
                          placeholder="warden@hostelhub.edu"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                          aria-describedby="warden-email-help"
                        />
                        <p id="warden-email-help" className="text-xs text-gray-500">
                          Your warden email address
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="warden-password" className="text-gray-300">Password</Label>
                        <Input
                          id="warden-password"
                          type="password"
                          placeholder="••••••••"
                          required
                          className="bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-500"
                        disabled={isLoading}
                        aria-label="Login as warden"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                          </span>
                        ) : "Login as Warden"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>

            <CardFooter className="flex flex-col items-center pt-0 pb-6">
              {!showForgotPassword && (
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-1"
                  aria-label="Forgot password?"
                >
                  Forgot password?
                </button>
              )}
              <p className="text-xs text-gray-400">
                By continuing, you agree to our{' '}
                <Link
                  href="#"
                  className="text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-1"
                  aria-label="View terms of service"
                >
                  Terms
                </Link>{' '}
                and{' '}
                <Link
                  href="#"
                  className="text-indigo-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-1"
                  aria-label="View privacy policy"
                >
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-950 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-8 w-8">
                  <Image
                    src="/logo.png"
                    alt="Goel Group Of Institutions Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Goel Group Of Institutions
                </h3>
              </div>
              <p className="text-gray-400">
                Committed to excellence in education since 1985.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Facilities</Link></li>
                <li><Link href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">123 Education Road</li>
                <li className="text-gray-400">New Delhi, India 110001</li>
                <li className="text-gray-400">info@goelgroup.edu</li>
                <li className="text-gray-400">+91 11 2345 6789</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} Goel Group Of Institutions. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}