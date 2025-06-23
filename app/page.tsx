"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building, Search, Shield, Users, FileText, Mail, Facebook, Twitter, Linkedin, Send, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import React from "react"

export default function Home() {
  const router = useRouter()
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  React.useEffect(() => {
    // Example: check localStorage for token (replace with real logic)
    setIsAuthenticated(!!localStorage.getItem('token'))
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-x-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-96 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#6366f1" fillOpacity="0.08" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>
      {/* Enhanced Header - mobile responsive and conditional rendering */}
      <header className="bg-white/70 dark:bg-gray-950/70 shadow-lg backdrop-blur-md z-20 relative border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
          {/* Logo and tagline */}
          <div className="flex flex-col items-start md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
            <div className="flex items-center space-x-2">
              <Shield className="h-10 w-10 text-primary drop-shadow" />
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">TalentVerify</span>
            </div>
          </div>
          {/* Desktop Navigation - only for unauthenticated users */}
          {!isAuthenticated && (
            <nav className="hidden md:flex space-x-6 ml-8">
              <Link href="/dashboard" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" aria-label="Dashboard">Dashboard</Link>
              <Link href="/companies" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" aria-label="Companies">Companies</Link>
              <Link href="/employees" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" aria-label="Employees">Employees</Link>
              <Link href="/search" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" aria-label="Search">Search</Link>
              <Link href="/documentation" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" aria-label="Documentation">Documentation</Link>
              <Link href="/settings" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" aria-label="Settings">Settings</Link>
            </nav>
          )}
          {/* Auth Buttons (desktop) - only for unauthenticated users */}
          {!isAuthenticated && (
            <div className="hidden md:flex space-x-3 ml-8">
              <Button onClick={() => router.push('/login')} variant="outline" className="transition hover:scale-105 focus:ring-2 focus:ring-indigo-400" aria-label="Log In">Log In</Button>
              <Button onClick={() => router.push('/register')} className="transition hover:scale-105 focus:ring-2 focus:ring-indigo-400" aria-label="Sign Up">Sign Up</Button>
            </div>
          )}
          {/* Authenticated: show only Go to Dashboard */}
          {isAuthenticated && (
            <div className="hidden md:flex ml-8">
              <Button onClick={() => router.push('/dashboard')} className="transition hover:scale-105 focus:ring-2 focus:ring-indigo-400" aria-label="Go to Dashboard">Go to Dashboard</Button>
            </div>
          )}
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" aria-label="Open navigation menu" onClick={() => setMobileNavOpen(true)}>
            <Menu className="h-7 w-7 text-gray-700 dark:text-gray-200" />
          </button>
          {/* Mobile Navigation Drawer - responsive and conditional */}
          {mobileNavOpen && (
            <div className="fixed inset-0 z-50 bg-black/40 flex justify-end" aria-modal="true" role="dialog">
              <div className="w-72 bg-white dark:bg-gray-900 h-full shadow-lg flex flex-col p-6 animate-slide-in">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold text-gray-900 dark:text-white">TalentVerify</span>
                  </div>
                  <button className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" aria-label="Close navigation menu" onClick={() => setMobileNavOpen(false)}>
                    <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                  </button>
                </div>
                {/* Mobile nav links - only for unauthenticated users */}
                {!isAuthenticated && (
                  <nav className="flex flex-col space-y-4">
                    <Link href="/dashboard" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" onClick={() => setMobileNavOpen(false)} aria-label="Dashboard">Dashboard</Link>
                    <Link href="/companies" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" onClick={() => setMobileNavOpen(false)} aria-label="Companies">Companies</Link>
                    <Link href="/employees" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" onClick={() => setMobileNavOpen(false)} aria-label="Employees">Employees</Link>
                    <Link href="/search" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" onClick={() => setMobileNavOpen(false)} aria-label="Search">Search</Link>
                    <Link href="/documentation" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" onClick={() => setMobileNavOpen(false)} aria-label="Documentation">Documentation</Link>
                    <Link href="/settings" className="text-gray-700 dark:text-gray-200 font-semibold px-3 py-2 rounded transition hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400" onClick={() => setMobileNavOpen(false)} aria-label="Settings">Settings</Link>
                  </nav>
                )}
                {/* Mobile auth buttons - only for unauthenticated users */}
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-3 mt-8">
                    <Button onClick={() => { setMobileNavOpen(false); router.push('/login') }} variant="outline" className="transition hover:scale-105 focus:ring-2 focus:ring-indigo-400" aria-label="Log In">Log In</Button>
                    <Button onClick={() => { setMobileNavOpen(false); router.push('/register') }} className="transition hover:scale-105 focus:ring-2 focus:ring-indigo-400" aria-label="Sign Up">Sign Up</Button>
                  </div>
                )}
                {/* Authenticated: show only Go to Dashboard */}
                {isAuthenticated && (
                  <div className="flex flex-col mt-8">
                    <Button onClick={() => { setMobileNavOpen(false); router.push('/dashboard') }} className="transition hover:scale-105 focus:ring-2 focus:ring-indigo-400" aria-label="Go to Dashboard">Go to Dashboard</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-20 flex flex-col items-center justify-center gap-6">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-2 text-gray-900 dark:text-white drop-shadow-lg">Secure Talent Verification Platform</h2>
          <p className="text-2xl md:text-3xl text-indigo-600 dark:text-indigo-300 font-semibold mb-2">Empowering businesses to verify, manage, and grow with confidence.</p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">Verify employment history, manage company records, and ensure data integrity with our comprehensive verification system.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button size="lg" className="px-8 py-5 text-lg font-bold flex items-center gap-2 transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-indigo-400" onClick={() => router.push('/register')} aria-label="Get Started">
              <ArrowRight className="h-5 w-5" /> Get Started
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-5 text-lg font-bold flex items-center gap-2 transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-indigo-400" onClick={() => router.push('/dashboard')} aria-label="Go to Dashboard">
              <Shield className="h-5 w-5" /> Go to Dashboard
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-5 text-lg font-bold flex items-center gap-2 transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-indigo-400" onClick={() => router.push('/documentation')} aria-label="Learn More">
              <FileText className="h-5 w-5" /> Learn More
            </Button>
          </div>
        </section>
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-10 mb-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="transition-transform duration-200 hover:scale-105 hover:shadow-xl focus-within:ring-2 focus-within:ring-indigo-400">
                  <CardHeader>
                    <Building className="h-12 w-12 text-primary mb-2" />
                    <CardTitle>Company Management</CardTitle>
                    <CardDescription>Register and manage company information with comprehensive details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                      <li>Company registration with detailed information</li>
                      <li>Update via single entry or bulk upload</li>
                      <li>Department and contact management</li>
                      <li>Secure data storage and access control</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => router.push('/companies')} aria-label="Explore Company Features">
                      <Building className="h-4 w-4 mr-2" /> Explore Company Features
                    </Button>
                  </CardFooter>
                </Card>
              </TooltipTrigger>
              <TooltipContent>Manage all your company data securely and efficiently.</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="transition-transform duration-200 hover:scale-105 hover:shadow-xl focus-within:ring-2 focus-within:ring-indigo-400">
                  <CardHeader>
                    <Users className="h-12 w-12 text-primary mb-2" />
                    <CardTitle>Employee Management</CardTitle>
                    <CardDescription>Track complete employment history across roles and companies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                      <li>Comprehensive employee records</li>
                      <li>Role and department tracking</li>
                      <li>Employment history verification</li>
                      <li>Bulk upload capabilities</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => router.push('/employees')} aria-label="Explore Employee Features">
                      <Users className="h-4 w-4 mr-2" /> Explore Employee Features
                    </Button>
                  </CardFooter>
                </Card>
              </TooltipTrigger>
              <TooltipContent>Maintain and verify employee records with ease.</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="transition-transform duration-200 hover:scale-105 hover:shadow-xl focus-within:ring-2 focus-within:ring-indigo-400">
                  <CardHeader>
                    <Search className="h-12 w-12 text-primary mb-2" />
                    <CardTitle>Advanced Search</CardTitle>
                    <CardDescription>Find and verify employment information quickly and accurately</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                      <li>Search by multiple criteria</li>
                      <li>Filter active and former employees</li>
                      <li>Company and department filtering</li>
                      <li>Date-based search capabilities</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => router.push('/search')} aria-label="Try Search Features">
                      <Search className="h-4 w-4 mr-2" /> Try Search Features
                    </Button>
                  </CardFooter>
                </Card>
              </TooltipTrigger>
              <TooltipContent>Quickly find the information you need.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </section>
        {/* System Architecture Section */}
        <section className="bg-white/90 dark:bg-gray-950/90 rounded-lg shadow-md p-8 mb-20 border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">System Architecture</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Backend (Django)</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Django REST API for secure data handling</li>
                <li>PostgreSQL database with optimized schema</li>
                <li>Role-based access control system</li>
                <li>Data encryption for sensitive information</li>
                <li>Comprehensive validation and error handling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Frontend (React)</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Responsive React components with modern UI</li>
                <li>Intuitive interfaces for data entry and retrieval</li>
                <li>Advanced form validation</li>
                <li>Interactive data visualization</li>
                <li>Optimized for performance and usability</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TalentVerify</h3>
              <p className="text-gray-400">
                Secure, reliable talent verification platform for businesses of all sizes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Company Management</li>
                <li>Employee Verification</li>
                <li>Advanced Search</li>
                <li>Secure Authentication</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Security</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>info@talentverify.com</li>
                <li>+263 77 123 4567</li>
                <li>123 Samora Machel Avenue</li>
                <li>Harare, Zimbabwe</li>
                <li>Praise Masunga</li>
                <li>Chinhoyi, Zimbabwe</li>
              </ul>
              {/* Social Icons */}
              <div className="flex space-x-4 mt-4">
                <a href="mailto:info@talentverify.com" aria-label="Email" className="hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full"><Mail className="h-6 w-6" /></a>
                <a href="#" aria-label="Facebook" className="hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full"><Facebook className="h-6 w-6" /></a>
                <a href="#" aria-label="Twitter" className="hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full"><Twitter className="h-6 w-6" /></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-full"><Linkedin className="h-6 w-6" /></a>
              </div>
              {/* Newsletter Signup */}
              <form className="mt-6 flex items-center gap-2" onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing!')}}>
                <input type="email" required aria-label="Email for newsletter" placeholder="Subscribe to newsletter" className="px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-2/3" />
                <Button size="icon" type="submit" aria-label="Subscribe"><Send className="h-5 w-5" /></Button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} TalentVerify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

