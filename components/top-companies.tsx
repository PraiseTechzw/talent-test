"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { companiesApi } from "@/lib/api"

interface Company {
  id: string
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
      if (!isAuthenticated) {
        setError("Please log in to view companies")
        return
      }

      try {
        const response = await companiesApi.getAll(1, { ordering: '-employee_count' })
        setCompanies(response.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch companies")
      }
    }

    fetchCompanies()
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Companies</CardTitle>
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
          <CardTitle>Top Companies</CardTitle>
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
        <CardTitle>Top Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {companies.map((company) => (
              <div key={company.id} className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{company.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {company.registration_number} • {company.employee_count} employees
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

