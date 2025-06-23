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
  name?: string
  employee_id?: string
  company?: string
  department?: string
  role?: string
  start_date_from?: string
  start_date_to?: string
  is_active?: boolean
}

export default function SearchPage() {
  const [form, setForm] = useState({
    name: "",
    employee_id: "",
    company: "all",
    department: "all",
    role: "",
    start_date_from: "",
    start_date_to: "",
    is_active: undefined as boolean | undefined,
  })
  const [companies, setCompanies] = useState<Array<{ id: string; name: string }>>([])
  const [submittedParams, setSubmittedParams] = useState<SearchParams | null>(null)
  const [page, setPage] = useState(1)
  const { toast } = useToast()

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate at least one field
    if (!form.name && !form.employee_id && (!form.company || form.company === "all") && (!form.department || form.department === "all") && !form.role) {
      toast({
        title: "Search Error",
        description: "Please enter at least one search criterion",
        variant: "destructive",
      })
      return
    }
    // Validate date range
    if (form.start_date_from && form.start_date_to && new Date(form.start_date_from) > new Date(form.start_date_to)) {
      toast({
        title: "Search Error",
        description: "Start date cannot be after end date",
        variant: "destructive",
      })
      return
    }
    // Build params for backend
    const params: SearchParams = {}
    if (form.name) params.name = form.name
    if (form.employee_id) params.employee_id = form.employee_id
    if (form.company && form.company !== "all") params.company = form.company
    if (form.department && form.department !== "all") params.department = form.department
    if (form.role) params.role = form.role
    if (form.start_date_from) params.start_date_from = form.start_date_from
    if (form.start_date_to) params.start_date_to = form.start_date_to
    if (form.is_active !== undefined) params.is_active = form.is_active
    setSubmittedParams(params)
    setPage(1)
  }

  const handleClear = () => {
    setForm({
      name: "",
      employee_id: "",
      company: "all",
      department: "all",
      role: "",
      start_date_from: "",
      start_date_to: "",
      is_active: undefined,
    })
    setSubmittedParams(null)
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
        ...(submittedParams?.name && { name: submittedParams.name }),
        ...(submittedParams?.employee_id && { employee_id: submittedParams.employee_id }),
        ...(submittedParams?.company && submittedParams.company !== "all" && { company: submittedParams.company }),
        ...(submittedParams?.department && submittedParams.department !== "all" && { department: submittedParams.department }),
        ...(submittedParams?.role && { role: submittedParams.role }),
        ...(submittedParams?.start_date_from && { start_date_from: submittedParams.start_date_from }),
        ...(submittedParams?.start_date_to && { start_date_to: submittedParams.start_date_to }),
        ...(submittedParams?.is_active !== undefined && { is_active: submittedParams.is_active ? "true" : "false" }),
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
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee_id">Employee ID</Label>
                <Input id="employee_id" placeholder="Employee ID" value={form.employee_id} onChange={e => setForm({ ...form, employee_id: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select value={form.company} onValueChange={value => setForm({ ...form, company: value })}>
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {companies.map(company => (
                      <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={form.department} onValueChange={value => setForm({ ...form, department: value })}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {/* You can populate department options dynamically if available */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_date_from">Start Date From</Label>
                <Input id="start_date_from" type="date" value={form.start_date_from} onChange={e => setForm({ ...form, start_date_from: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_date_to">Start Date To</Label>
                <Input id="start_date_to" type="date" value={form.start_date_to} onChange={e => setForm({ ...form, start_date_to: e.target.value })} />
              </div>
              <div className="flex items-center gap-4">
                <Checkbox id="active_only" checked={form.is_active === true} onCheckedChange={checked => setForm({ ...form, is_active: checked ? true : undefined })} />
                <Label htmlFor="active_only">Active Employees Only</Label>
                <Checkbox id="former_only" checked={form.is_active === false} onCheckedChange={checked => setForm({ ...form, is_active: checked ? false : undefined })} />
                <Label htmlFor="former_only">Former Employees Only</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="w-full">Search</Button>
                <Button type="button" variant="outline" onClick={handleClear}>Clear</Button>
              </div>
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

