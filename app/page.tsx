import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, GraduationCap, ShieldCheck, User, Home, BookUser, ClipboardList } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
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
    <Link href="/login" className="ml-auto">
      <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg shadow-blue-500/20">
        Login
      </Button>
    </Link>
  </div>
</header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-4">
              <span className="text-sm font-medium text-blue-400">Premier Educational Institution</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Excellence in <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Education</span> & <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Hostel Facilities</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg">
              A world-class institution offering superior education and state-of-the-art hostel accommodations for students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/login">
                <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg shadow-blue-500/30">
                  Get Started <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="border-gray-700 hover:bg-gray-800/50 text-gray-300 hover:text-white">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" // Replace with your institution image
                alt="Goel Group Of Institutions Campus"
                className="w-full h-auto object-cover"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Campus Portals</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Dedicated portals for different members of our institution</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Portal */}
            <Card className="hover:shadow-lg transition-all duration-300 bg-gray-800/50 border border-gray-700 hover:border-blue-500/30 hover:translate-y-[-4px]">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Student Portal</h3>
                  <p className="text-gray-400">
                    Access academic records, hostel details, and campus resources.
                  </p>
                  <Link href="/login?type=student">
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                      Student Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Admin Portal */}
            <Card className="hover:shadow-lg transition-all duration-300 bg-gray-800/50 border border-gray-700 hover:border-blue-500/30 hover:translate-y-[-4px]">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Admin Portal</h3>
                  <p className="text-gray-400">
                    Manage institution operations, student records, and facilities.
                  </p>
                  <Link href="/login?type=admin">
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                      Admin Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Faculty Portal */}
            <Card className="hover:shadow-lg transition-all duration-300 bg-gray-800/50 border border-gray-700 hover:border-blue-500/30 hover:translate-y-[-4px]">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <BookUser className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Faculty Portal</h3>
                  <p className="text-gray-400">
                    Access teaching resources, student records, and academic tools.
                  </p>
                  <Link href="/login?type=faculty">
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                      Faculty Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Facilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">World-class amenities for our students</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Home className="h-8 w-8 text-blue-400" />,
                title: "Modern Hostels",
                description: "Comfortable living spaces with all necessary amenities"
              },
              {
                icon: <ClipboardList className="h-8 w-8 text-blue-400" />,
                title: "Academic Excellence",
                description: "Highly qualified faculty and cutting-edge curriculum"
              },
              {
                icon: <User className="h-8 w-8 text-blue-400" />,
                title: "Student Support",
                description: "Comprehensive support services for all students"
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-blue-400" />,
                title: "Campus Security",
                description: "24/7 security and surveillance for student safety"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-blue-500/30 transition-colors">
                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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