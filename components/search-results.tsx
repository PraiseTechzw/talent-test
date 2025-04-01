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
import { Eye, FileText, Download } from "lucide-react"
import { searchApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface SearchResult {
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

interface SearchResultsProps {
  searchParams: Record<string, string>
}

export default function SearchResults({ searchParams }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  useEffect(() => {
    const fetchResults = async () => {
      if (Object.keys(searchParams).length === 0) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await searchApi.search({
          ...searchParams,
          page: currentPage.toString(),
        })
        setResults(response.results)
        setTotalPages(Math.ceil(response.count / 10)) // Assuming 10 items per page
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch search results")
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Failed to fetch search results",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [currentPage, searchParams, toast])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleExport = async () => {
    try {
      // In a real app, this would call an API endpoint to generate and download a CSV/Excel file
      toast({
        title: "Export Started",
        description: "Your export is being prepared and will download shortly.",
      })

      // Simulate download delay
      setTimeout(() => {
        toast({
          title: "Export Complete",
          description: "Your export has been downloaded.",
        })
      }, 2000)
    } catch (err) {
      toast({
        title: "Export Failed",
        description: err instanceof Error ? err.message : "Failed to export results",
        variant: "destructive",
      })
    }
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
          onClick={() => setIsLoading(true)} // This will trigger a re-fetch
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (Object.keys(searchParams).length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No search criteria</h3>
        <p className="text-gray-500 dark:text-gray-400">Please select search criteria to find employee records.</p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No results found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search criteria to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Found {results.length} results matching your search criteria
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Export Results
        </Button>
      </div>

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
              <TableHead>Employment Period</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">{result.name}</TableCell>
                <TableCell>{result.employee_id}</TableCell>
                <TableCell>{result.company_name}</TableCell>
                <TableCell>{result.department}</TableCell>
                <TableCell>{result.role}</TableCell>
                <TableCell>
                  {result.is_active ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500 dark:text-gray-400">
                      Former
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {result.start_date} - {result.end_date || "Present"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Button>
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

