import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter, Plus, Search, Upload, UserPlus } from "lucide-react"
import EmployeeList from "@/components/employee-list"
import EmployeeForm from "@/components/employee-form"

export default function EmployeesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employees</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage employee records and employment history</p>
        </div>
        <div className="flex space-x-3">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="list">Employee List</TabsTrigger>
          <TabsTrigger value="add">Add Employee</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search employees..." className="pl-10" />
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <EmployeeList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                Register New Employee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Upload Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Drop your file here or click to browse</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Supported formats: CSV, Excel (.xlsx)</p>
                <Button>Select File</Button>
                <div className="mt-4 text-sm text-gray-500">
                  <a href="#" className="text-primary hover:underline">
                    Download template
                  </a>{" "}
                  for the correct format
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Upload Instructions</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Ensure all required fields are filled in the template</li>
                  <li>Employee IDs must be unique</li>
                  <li>Company names must match existing companies in the system</li>
                  <li>Date format should be YYYY-MM-DD</li>
                  <li>Maximum file size: 10MB</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

