import { toast } from "sonner"

export default function EditCompanyPage({ params }: { params: { id: string } }) {
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

  const handleSubmit = async (formData: CompanyFormData) => {
    try {
      await companiesApi.update(params.id, formData)
      toast.success("Company updated successfully")
      router.push(`/companies/${params.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update company")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Please log in to edit company details.</p>
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
        <h2 className="text-3xl font-bold tracking-tight">Edit Company</h2>
      </div>
      <CompanyForm
        initialData={company}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 