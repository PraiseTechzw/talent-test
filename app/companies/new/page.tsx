import { toast } from "sonner"

export default function NewCompanyPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handleSubmit = async (formData: CompanyFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      await companiesApi.create(formData)
      toast.success("Company created successfully")
      router.push("/companies")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create company")
      toast.error(err instanceof Error ? err.message : "Failed to create company")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Please log in to create a new company.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">New Company</h2>
      </div>
      <CompanyForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
} 