import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/date-picker"
import { SearchIcon, Filter, Download } from "lucide-react"
import SearchResults from "@/components/search-results"

export default function SearchPage() {
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
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search-term">Search Term</Label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input id="search-term" placeholder="Name, ID, position..." className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select>
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    <SelectItem value="acme">Acme Corporation</SelectItem>
                    <SelectItem value="globex">Globex Industries</SelectItem>
                    <SelectItem value="initech">Initech</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
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
                <Input id="position" placeholder="Job title or position" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <DatePicker />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <DatePicker />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Employment Status</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" />
                  <Label htmlFor="active" className="text-sm font-normal">
                    Active Employees
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="former" />
                  <Label htmlFor="former" className="text-sm font-normal">
                    Former Employees
                  </Label>
                </div>
              </div>

              <Button className="w-full">
                <SearchIcon className="mr-2 h-4 w-4" /> Search Records
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Search Results</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export Results
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <SearchResults />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

