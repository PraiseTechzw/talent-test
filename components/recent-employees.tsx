"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Building2, Calendar } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { employeesApi } from "@/lib/api"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Employee {
  id: number
  name: string
  company: string
  position: string
  start_date: string
}

export function RecentEmployees() {
  const { isAuthenticated, isLoading } = useAuth()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      if (isLoading || !isAuthenticated) {
        return
      }

      try {
        const response = await employeesApi.getAll()
        setEmployees(response.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch employees")
      }
    }

    fetchEmployees()
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Recent Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isAuthenticated) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Recent Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">Please log in to view employees</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Recent Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <User className="h-12 w-12 text-destructive mb-4" />
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <TooltipProvider>
      <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-950">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Recent Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-6">
              {employees.map((employee) => {
                const isNew = (new Date().getTime() - new Date(employee.start_date).getTime()) < 7 * 24 * 60 * 60 * 1000
                return (
                  <Tooltip key={employee.id}>
                    <TooltipTrigger asChild>
                      <div className={`flex items-start space-x-4 p-2 rounded-lg transition-transform hover:scale-105 hover:shadow-md ${isNew ? 'bg-green-100 dark:bg-green-800' : ''}`} tabIndex={0} aria-label={`Employee: ${employee.name}`}>
                        <div className="p-2 rounded-full bg-green-200 dark:bg-green-900">
                          <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium leading-none">{employee.name}</p>
                            {isNew && <span className="px-2 py-0.5 text-xs rounded bg-yellow-300 text-yellow-900 font-semibold">New</span>}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Building2 className="mr-1 h-3 w-3" />
                            {employee.company}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            Started {new Date(employee.start_date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Position: {employee.position || 'N/A'}</TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

