"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { employeesApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface Employee {
  id: string
  name: string
  employee_id: string
  company: string
  company_name: string
  department: string
  role: string
  start_date: string
  end_date: string | null
  is_active: boolean
}

interface EmployeeListProps {
  initialFilters?: Record<string, string>
}

export default function EmployeeList({ initialFilters = {} }: EmployeeListProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState(initialFilters)
  const { toast } = useToast()

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await employeesApi.getAll(currentPage, filters)
        setEmployees(response.results)
        setTotalPages(Math.ceil(response.count / 10)) // Assuming 10 items per page
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch employees")
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Failed to fetch employees",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployees()
  }, [currentPage, filters, toast])

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeesApi.delete(id)
        setEmployees(employees.filter((employee) => employee.id !== id))
        toast({
          title: "Success",
          description: "Employee deleted successfully",
        })
      } catch (err) {
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Failed to delete employee",
          variant: "destructive",
        })
      }
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return null
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error: {error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setIsLoading(true)} // This will trigger a
          className="mt-4"
          onClick={() => setIsLoading(true)} // This will trigger a re-fetch
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (employees.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No employees found.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.employee_id}</TableCell>
                <TableCell>{employee.company_name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  {employee.is_active ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500 dark:text-gray-400">
                      Former
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{employee.start_date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit Employee
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(employee.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Employee
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) handlePageChange(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(page)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) handlePageChange(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

