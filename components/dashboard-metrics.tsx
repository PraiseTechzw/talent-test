"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, FileCheck, Percent } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { companiesApi, employeesApi } from "@/lib/api"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"

interface Metrics {
  total_companies: number
  total_employees: number
  total_verifications: number
  success_rate: number
}

function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const end = value
    if (start === end) return
    let increment = end / 30
    let current = start
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setDisplay(end)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(current))
      }
    }, 20)
    return () => clearInterval(timer)
  }, [value])
  return <span>{display}</span>
}

export function DashboardMetrics() {
  const { isAuthenticated, isLoading } = useAuth()
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      // Don't fetch if still loading or not authenticated
      if (isLoading || !isAuthenticated) {
        return
      }

      try {
        const [companiesRes, employeesRes] = await Promise.all([
          companiesApi.getAll(),
          employeesApi.getAll()
        ])

        setMetrics({
          total_companies: companiesRes.count || 0,
          total_employees: employeesRes.count || 0,
          total_verifications: 0, // This would come from a verifications API
          success_rate: 0 // This would come from a verifications API
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch metrics")
      }
    }

    fetchMetrics()
  }, [isAuthenticated, isLoading])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Show error state if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Please log in to view metrics</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Show error state if API call failed
  if (error) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{error}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="hover:scale-105 transition-transform shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">Total Companies</CardTitle>
                <Building className="h-5 w-5 text-blue-500 dark:text-blue-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-200">
                  <CountUp value={metrics?.total_companies || 0} />
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>Number of companies registered in the system.</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="hover:scale-105 transition-transform shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">Total Employees</CardTitle>
                <Users className="h-5 w-5 text-green-500 dark:text-green-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700 dark:text-green-200">
                  <CountUp value={metrics?.total_employees || 0} />
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>Number of employees in all companies.</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="hover:scale-105 transition-transform shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">Total Verifications</CardTitle>
                <FileCheck className="h-5 w-5 text-purple-500 dark:text-purple-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-200">
                  <CountUp value={metrics?.total_verifications || 0} />
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>Total employment verifications processed.</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="hover:scale-105 transition-transform shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">Success Rate</CardTitle>
                <Percent className="h-5 w-5 text-yellow-500 dark:text-yellow-300" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-700 dark:text-yellow-200">
                  <CountUp value={metrics?.success_rate || 0} />%
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>Percentage of successful verifications.</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

