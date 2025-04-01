"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { employeesApi } from "@/lib/api"

interface Employee {
  id: string
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
      if (!isAuthenticated) {
        setError("Please log in to view employees")
        return
      }

      try {
        const response = await employeesApi.getAll(1, { ordering: '-start_date' })
        setEmployees(response.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch employees")
      }
    }

    fetchEmployees()
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-8 w-8 animate-pulse rounded bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{employee.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {employee.position} at {employee.company}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Started {new Date(employee.start_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

