import { toast } from "sonner"

export default function NewEmployeePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handleSubmit = async (formData: EmployeeFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      await employeesApi.create(formData)
      toast.success("Employee created successfully")
      router.push("/employees")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create employee")
      toast.error(err instanceof Error ? err.message : "Failed to create employee")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Please log in to create a new employee.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">New Employee</h2>
      </div>
      <EmployeeForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        companies={[]} // This should be populated with actual companies data
      />
    </div>
  )
} 