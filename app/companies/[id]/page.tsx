import { toast } from "sonner"

export default function CompanyDetailsPage({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchCompany = async () => {
      if (!isAuthenticated) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await companiesApi.getById(params.id)
        setCompany(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch company details")
        toast.error(err instanceof Error ? err.message : "Failed to fetch company details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompany()
  }, [params.id, isAuthenticated])

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await companiesApi.delete(params.id)
        toast.success("Company deleted successfully")
        router.push("/companies")
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete company")
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Please log in to view company details.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <LoadingOverlay />
  }

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-center py-8">
          <p className="text-destructive">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsLoading(true)}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Company not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{company.name}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => router.push(`/companies/${params.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registration Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{company.registration_number}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registration Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{company.registration_date}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{company.employee_count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{company.departments.length}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Contact Person</p>
              <p className="text-sm text-muted-foreground">{company.contact_person}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{company.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">{company.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-muted-foreground">{company.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {company.departments.map((department, index) => (
              <Badge key={index} variant="outline">
                {department}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 