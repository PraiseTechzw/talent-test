"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Building2, Calendar } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { employeesApi } from "@/lib/api"
import { cn } from "@/lib/utils"

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
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Recent Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                  <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{employee.name}</p>
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
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

