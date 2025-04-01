"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { companiesApi, employeesApi } from "@/lib/api"

interface Activity {
  id: string
  action: string
  timestamp: string
  user: string
  details: string
}

export function RecentActivities() {
  const { isAuthenticated, isLoading } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      if (!isAuthenticated) {
        setError("Please log in to view activities")
        return
      }

      try {
        // Fetch both companies and employees to simulate recent activities
        const [companiesRes, employeesRes] = await Promise.all([
          companiesApi.getAll(1, { ordering: '-created_at' }),
          employeesApi.getAll(1, { ordering: '-created_at' })
        ])

        // Transform the data into activities
        const companyActivities = (companiesRes.results || []).map(company => ({
          id: `company-${company.id}`,
          action: 'Company Created',
          timestamp: company.created_at,
          user: 'System',
          details: `New company "${company.name}" was registered`
        }))

        const employeeActivities = (employeesRes.results || []).map(employee => ({
          id: `employee-${employee.id}`,
          action: 'Employee Added',
          timestamp: employee.created_at,
          user: 'System',
          details: `New employee "${employee.name}" was added to ${employee.company}`
        }))

        // Combine and sort activities by timestamp
        const allActivities = [...companyActivities, ...employeeActivities]
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 10)

        setActivities(allActivities)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch activities")
      }
    }

    fetchActivities()
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
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
          <CardTitle>Recent Activities</CardTitle>
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
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.details}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleString()}
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

