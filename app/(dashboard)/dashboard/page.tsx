import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BarChart3, Activity } from "lucide-react"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { RecentActivities } from "@/components/recent-activities"
import { TopCompanies } from "@/components/top-companies"
import { RecentEmployees } from "@/components/recent-employees"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>

        <DashboardMetrics />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Top Companies by Employee Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TopCompanies />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Recent Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentEmployees />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivities />
        </CardContent>
      </Card>
    </div>
  )
}

