"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/date-picker"
import { SearchIcon, Filter, Download } from "lucide-react"
import SearchResults from "@/components/search-results"
import { useToast } from "@/hooks/use-toast"
import { companiesApi } from "@/lib/api"

interface SearchParams {
  search_term: string
  company: string
  department: string
  position: string
  start_date: string
  end_date: string
  active_only: boolean
  former_only: boolean
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search_term: "",
    company: "all",
    department: "all",
    position: "",
    start_date: "",
    end_date: "",
    active_only: false,
    former_only: false,
  })
  const [companies, setCompanies] = useState<Array<{ id: string; name: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [submittedParams, setSubmittedParams] = useState<SearchParams | null>(null)
  const [page, setPage] = useState(1)

  // Fetch companies for the dropdown
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companiesApi.getAll()
        setCompanies(response.results || [])
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch companies",
          variant: "destructive",
        })
      }
    }
    fetchCompanies()
  }, [toast])

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate search parameters
    if (!searchParams.search_term && (!searchParams.company || searchParams.company === "all") && (!searchParams.department || searchParams.department === "all") && !searchParams.position) {
      toast({
        title: "Search Error",
        description: "Please enter at least one search criterion",
        variant: "destructive",
      })
      return
    }
    // Validate date range
    if (searchParams.start_date && searchParams.end_date && new Date(searchParams.start_date) > new Date(searchParams.end_date)) {
      toast({
        title: "Search Error",
        description: "Start date cannot be after end date",
        variant: "destructive",
      })
      return
    }
    // Validate employment status
    if (searchParams.active_only && searchParams.former_only) {
      toast({
        title: "Search Error",
        description: "Cannot select both active and former employees",
        variant: "destructive",
      })
      return
    }
    setSubmittedParams({ ...searchParams })
    setPage(1)
  }

  // Handle export
  const handleExport = async () => {
    try {
      toast({
        title: "Export Started",
        description: "Your export is being prepared and will download shortly.",
      })

      // Convert search parameters to API format
      const apiParams: Record<string, string> = {
        ...(searchParams.search_term && { search: searchParams.search_term }),
        ...(searchParams.company && searchParams.company !== "all" && { company: searchParams.company }),
        ...(searchParams.department && searchParams.department !== "all" && { department: searchParams.department }),
        ...(searchParams.position && { position: searchParams.position }),
        ...(searchParams.start_date && { start_date: searchParams.start_date }),
        ...(searchParams.end_date && { end_date: searchParams.end_date }),
        ...(searchParams.active_only && { is_active: "true" }),
        ...(searchParams.former_only && { is_active: "false" }),
      }

      // Call the export API
      const response = await fetch(`/api/search/export?${new URLSearchParams(apiParams)}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'search-results.csv'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Export Complete",
        description: "Your export has been downloaded.",
      })
    } catch (err) {
      toast({
        title: "Export Failed",
        description: err instanceof Error ? err.message : "Failed to export results",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Advanced Search</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Search and verify employment records across the database
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Search Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSearch}>
              <div className="space-y-2">
                <Label htmlFor="search-term">Search Term</Label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search-term"
                    placeholder="Name, ID, position..."
                    className="pl-10"
                    value={searchParams.search_term}
                    onChange={(e) => setSearchParams({ ...searchParams, search_term: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select
                  value={searchParams.company}
                  onValueChange={(value) => setSearchParams({ ...searchParams, company: value })}
                >
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={searchParams.department}
                  onValueChange={(value) => setSearchParams({ ...searchParams, department: value })}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="Job title or position"
                  value={searchParams.position}
                  onChange={(e) => setSearchParams({ ...searchParams, position: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <DatePicker
                    date={searchParams.start_date ? new Date(searchParams.start_date) : undefined}
                    onDateChange={(date) => setSearchParams({ ...searchParams, start_date: date ? date.toISOString() : "" })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <DatePicker
                    date={searchParams.end_date ? new Date(searchParams.end_date) : undefined}
                    onDateChange={(date) => setSearchParams({ ...searchParams, end_date: date ? date.toISOString() : "" })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Employment Status</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="active"
                    checked={searchParams.active_only}
                    onCheckedChange={(checked) => {
                      setSearchParams({
                        ...searchParams,
                        active_only: checked as boolean,
                        former_only: checked ? false : searchParams.former_only,
                      })
                    }}
                  />
                  <Label htmlFor="active" className="text-sm font-normal">
                    Active Employees
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="former"
                    checked={searchParams.former_only}
                    onCheckedChange={(checked) => {
                      setSearchParams({
                        ...searchParams,
                        former_only: checked as boolean,
                        active_only: checked ? false : searchParams.active_only,
                      })
                    }}
                  />
                  <Label htmlFor="former" className="text-sm font-normal">
                    Former Employees
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                <SearchIcon className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Search Results</CardTitle>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" /> Export Results
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {submittedParams && <SearchResults searchParams={submittedParams} page={page} />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

