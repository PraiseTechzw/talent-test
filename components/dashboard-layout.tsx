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
  const { isAuthenticated, isLoading, user } = useAuth()
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
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
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
          className={`relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-800 pt-5 pb-4 shadow-xl transition transform ${
            sidebarOpen ? "translate-x-0 ease-out duration-300" : "-translate-x-full ease-in duration-200"
          }`}
        >
          {/* Close button */}
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-shrink-0 items-center px-4 mb-6">
            <Shield className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">TalentVerify</span>
          </div>

          {/* Navigation */}
          <div className="mt-5 h-0 flex-1 overflow-y-auto">
            <nav className="space-y-1 px-2">
              {/* Dashboard nav links with icons and active state */}
              <Link
                href="/dashboard"
                className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all ${
                  isActive("/dashboard")
                    ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                    : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Dashboard"`}
                onClick={() => setSidebarOpen(false)}
              >
                <Home className="mr-4 h-6 w-6 flex-shrink-0" /> Dashboard
              </Link>
              <Link
                href="/companies"
                className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all ${
                  isActive("/companies")
                    ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                    : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Companies"`}
                onClick={() => setSidebarOpen(false)}
              >
                <Building className="mr-4 h-6 w-6 flex-shrink-0" /> Companies
              </Link>
              <Link
                href="/employees"
                className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all ${
                  isActive("/employees")
                    ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                    : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Employees"`}
                onClick={() => setSidebarOpen(false)}
              >
                <Users className="mr-4 h-6 w-6 flex-shrink-0" /> Employees
              </Link>
              <Link
                href="/search"
                className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all ${
                  isActive("/search")
                    ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                    : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Search"`}
                onClick={() => setSidebarOpen(false)}
              >
                <Search className="mr-4 h-6 w-6 flex-shrink-0" /> Search
              </Link>
              <Link
                href="/documentation"
                className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all ${
                  isActive("/documentation")
                    ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                    : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Documentation"`}
                onClick={() => setSidebarOpen(false)}
              >
                <FileText className="mr-4 h-6 w-6 flex-shrink-0" /> Documentation
              </Link>
              <Link
                href="/settings"
                className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all ${
                  isActive("/settings")
                    ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                    : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Settings"`}
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="mr-4 h-6 w-6 flex-shrink-0" /> Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop - collapsible */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white/90 dark:bg-gray-800/90 border-r border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
          <Shield className="h-8 w-8 text-primary" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">TalentVerify</span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {/* Dashboard nav links with icons and active state */}
            <Link
              href="/dashboard"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive("/dashboard")
                  ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                  : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Dashboard"`}
            >
              <Home className="mr-4 h-6 w-6 flex-shrink-0" /> Dashboard
            </Link>
            <Link
              href="/companies"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive("/companies")
                  ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                  : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Companies"`}
            >
              <Building className="mr-4 h-6 w-6 flex-shrink-0" /> Companies
            </Link>
            <Link
              href="/employees"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive("/employees")
                  ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                  : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Employees"`}
            >
              <Users className="mr-4 h-6 w-6 flex-shrink-0" /> Employees
            </Link>
            <Link
              href="/search"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive("/search")
                  ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                  : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Search"`}
            >
              <Search className="mr-4 h-6 w-6 flex-shrink-0" /> Search
            </Link>
            <Link
              href="/documentation"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive("/documentation")
                  ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                  : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Documentation"`}
            >
              <FileText className="mr-4 h-6 w-6 flex-shrink-0" /> Documentation
            </Link>
            <Link
              href="/settings"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive("/settings")
                  ? "bg-indigo-100 dark:bg-indigo-900 text-primary shadow"
                  : "text-gray-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Settings"`}
            >
              <Settings className="mr-4 h-6 w-6 flex-shrink-0" /> Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content area with top bar */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex h-16 bg-white/80 dark:bg-gray-900/80 shadow-sm items-center px-4 border-b border-gray-200 dark:border-gray-800 justify-between">
          <button
            type="button"
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex-1 flex items-center justify-end space-x-4">
            {/* Theme toggle */}
            <ThemeToggle />
            {/* User avatar and dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                  <User className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                  <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200">{user?.username || "User"}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-transparent">
          {children}
        </main>
      </div>
    </div>
  )
}

