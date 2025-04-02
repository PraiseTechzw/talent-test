import { toast } from "sonner"

export default function CompaniesPage() {
  const [filters, setFilters] = useState<Record<string, string>>({})
  const { isAuthenticated } = useAuth()

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters)
  }

  const handleBulkUpload = async (formData: FormData) => {
    try {
      toast.loading("Uploading companies...")
      await companiesApi.bulkUpload(formData)
      toast.success("Companies uploaded successfully")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload companies")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Please log in to view companies.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
        <div className="flex items-center space-x-2">
          <CompanyUpload onUpload={handleBulkUpload} />
          <Button onClick={() => router.push("/companies/new")}>
            <Plus className="mr-2 h-4 w-4" /> Add Company
          </Button>
        </div>
      </div>
      <CompanyList initialFilters={filters} />
    </div>
  )
} 