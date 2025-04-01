"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2, Users, TrendingUp } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { companiesApi } from "@/lib/api"
import { cn } from "@/lib/utils"

interface Company {
  id: number
  name: string
  employee_count: number
  registration_number: string
}

export function TopCompanies() {
  const { isAuthenticated, isLoading } = useAuth()
  const [companies, setCompanies] = useState<Company[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanies = async () => {
      if (isLoading || !isAuthenticated) {
        return
      }

      try {
        const response = await companiesApi.getAll()
        setCompanies(response.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch companies")
      }
    }

    fetchCompanies()
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Top Companies</CardTitle>
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
          <CardTitle className="text-xl font-semibold">Top Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">Please log in to view companies</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Top Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Building2 className="h-12 w-12 text-destructive mb-4" />
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Top Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            {companies.map((company) => (
              <div key={company.id} className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{company.name}</p>
                  <p className="text-xs text-muted-foreground">{company.registration_number}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users className="mr-1 h-3 w-3" />
                    {company.employee_count} employees
                    <TrendingUp className="ml-2 h-3 w-3 text-green-500" />
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

