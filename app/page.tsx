"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building, Search, Shield, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-950 shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TalentVerify</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/companies"
              className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-foreground"
            >
              Companies
            </Link>
            <Link
              href="/employees"
              className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-foreground"
            >
              Employees
            </Link>
            <Link
              href="/search"
              className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-foreground"
            >
              Search
            </Link>
            <Link
              href="/documentation"
              className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-foreground"
            >
              Documentation
            </Link>
          </nav>
          <div className="flex space-x-3">
            <Button onClick={() => router.push('/login')} variant="outline">Log In</Button>
            <Button onClick={() => router.push('/register')}>Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Secure Talent Verification Platform</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Verify employment history, manage company records, and ensure data integrity with our comprehensive
            verification system.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="px-6" onClick={() => router.push('/register')}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="px-6" onClick={() => router.push('/documentation')}>
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Building className="h-10 w-10 text-primary mb-2" />
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
              <Button variant="outline" className="w-full" onClick={() => router.push('/companies')}>
                Explore Company Features
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
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
              <Button variant="outline" className="w-full" onClick={() => router.push('/employees')}>
                Explore Employee Features
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Search className="h-10 w-10 text-primary mb-2" />
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
              <Button variant="outline" className="w-full" onClick={() => router.push('/search')}>
                Try Search Features
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-8 mb-16">
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

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
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
                <li>+1 (555) 123-4567</li>
                <li>123 Verification St, Suite 100</li>
                <li>San Francisco, CA 94103</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} TalentVerify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

