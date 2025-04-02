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
import { companiesApi } from "@/lib/api"
import { toast } from "sonner"

interface Company {
  id: string
  name: string
  registration_date: string
  registration_number: string
  address: string
  contact_person: string
  departments: string[]
  employee_count: number
  phone: string
  email: string
}

interface CompanyListProps {
  initialFilters?: Record<string, string>
}

export default function CompanyList({ initialFilters = {} }: CompanyListProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState(initialFilters)

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await companiesApi.getAll(currentPage, filters)
        setCompanies(response.results)
        setTotalPages(Math.ceil(response.count / 10)) // Assuming 10 items per page
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch companies")
        toast.error(err instanceof Error ? err.message : "Failed to fetch companies")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanies()
  }, [currentPage, filters])

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await companiesApi.delete(id)
        setCompanies(companies.filter((company) => company.id !== id))
        toast.success("Company deleted successfully")
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete company")
      }
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // We're now letting the loading.tsx handle the loading state
  // This component will not render during loading

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error: {error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setIsLoading(true)} // This will trigger a re-fetch
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No companies found.</p>
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
              <TableHead>Registration Number</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Departments</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.registration_number}</TableCell>
                <TableCell>{company.registration_date}</TableCell>
                <TableCell>{company.contact_person}</TableCell>
                <TableCell>{company.employee_count}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {company.departments.slice(0, 2).map((dept, index) => (
                      <Badge key={index} variant="outline">
                        {dept}
                      </Badge>
                    ))}
                    {company.departments.length > 2 && (
                      <Badge variant="outline">+{company.departments.length - 2} more</Badge>
                    )}
                  </div>
                </TableCell>
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
                        <Edit className="mr-2 h-4 w-4" /> Edit Company
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(company.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Company
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

