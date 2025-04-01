"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, Building2, User } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { companiesApi, employeesApi } from "@/lib/api"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: number
  type: string
  description: string
  timestamp: string
}

interface Company {
  id: number
  name: string
  created_at: string
}

interface Employee {
  id: number
  name: string
  created_at: string
}

export function RecentActivities() {
  const { isAuthenticated, isLoading } = useAuth()
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      if (isLoading || !isAuthenticated) {
        return
      }

      try {
        const [companiesRes, employeesRes] = await Promise.all([
          companiesApi.getAll(),
          employeesApi.getAll()
        ])

        const companyActivities = (companiesRes.results || []).map((company: Company) => ({
          id: company.id,
          type: 'Company',
          description: company.name,
          timestamp: company.created_at
        }))

        const employeeActivities = (employeesRes.results || []).map((employee: Employee) => ({
          id: employee.id,
          type: 'Employee',
          description: employee.name,
          timestamp: employee.created_at
        }))

        const allActivities = [...companyActivities, ...employeeActivities]
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 10)

        setActivities(allActivities)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch activities")
      }
    }

    fetchActivities()
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
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
          <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Activity className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">Please log in to view activities</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Activity className="h-12 w-12 text-destructive mb-4" />
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={cn(
                  "p-2 rounded-full",
                  activity.type === 'Company' ? "bg-blue-100 dark:bg-blue-900" : "bg-green-100 dark:bg-green-900"
                )}>
                  {activity.type === 'Company' ? (
                    <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.type === 'Company' ? 'New Company Added' : 'New Employee Added'}
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
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

