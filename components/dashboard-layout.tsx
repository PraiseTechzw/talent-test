"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/hooks/use-auth"
import { authApi } from "@/lib/api"
import { Building, FileText, Home, LogOut, Menu, Search, Settings, Shield, User, Users, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Check authentication status
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  const handleLogout = () => {
    authApi.logout()
    router.push("/login")
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? "visible" : "invisible"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
            sidebarOpen ? "opacity-100 ease-out duration-300" : "opacity-0 ease-in duration-200"
          }`}
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar panel */}
        <div
          className={`relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-800 pt-5 pb-4 transition transform ${
            sidebarOpen ? "translate-x-0 ease-out duration-300" : "-translate-x-full ease-in duration-200"
          }`}
        >
          {/* Close button */}
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-shrink-0 items-center px-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">TalentVerify</span>
          </div>

          {/* Navigation */}
          <div className="mt-5 h-0 flex-1 overflow-y-auto">
            <nav className="space-y-1 px-2">
              <Link
                href="/dashboard"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive("/dashboard")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Home className="mr-4 h-6 w-6 flex-shrink-0" />
                Dashboard
              </Link>

              <Link
                href="/companies"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive("/companies")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Building className="mr-4 h-6 w-6 flex-shrink-0" />
                Companies
              </Link>

              <Link
                href="/employees"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive("/employees")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Users className="mr-4 h-6 w-6 flex-shrink-0" />
                Employees
              </Link>

              <Link
                href="/search"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive("/search")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Search className="mr-4 h-6 w-6 flex-shrink-0" />
                Search
              </Link>

              <Link
                href="/documentation"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive("/documentation")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <FileText className="mr-4 h-6 w-6 flex-shrink-0" />
                Documentation
              </Link>

              <Link
                href="/settings"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive("/settings")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="mr-4 h-6 w-6 flex-shrink-0" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
            <Shield className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">TalentVerify</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <Link
                href="/dashboard"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive("/dashboard")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Home className="mr-3 h-5 w-5 flex-shrink-0" />
                Dashboard
              </Link>

              <Link
                href="/companies"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive("/companies")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Building className="mr-3 h-5 w-5 flex-shrink-0" />
                Companies
              </Link>

              <Link
                href="/employees"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive("/employees")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Users className="mr-3 h-5 w-5 flex-shrink-0" />
                Employees
              </Link>

              <Link
                href="/search"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive("/search")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Search className="mr-3 h-5 w-5 flex-shrink-0" />
                Search
              </Link>

              <Link
                href="/documentation"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive("/documentation")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <FileText className="mr-3 h-5 w-5 flex-shrink-0" />
                Documentation
              </Link>

              <Link
                href="/settings"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive("/settings")
                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:pl-64 flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">{/* Search bar could go here */}</div>
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <ThemeToggle />

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full p-1">
                    <span className="sr-only">Open user menu</span>
                    <User className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-4 py-3">
                    <p className="text-sm">Signed in as</p>
                    <p className="text-sm font-medium truncate">User</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}

