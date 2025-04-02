import { toast } from "sonner"

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!isAuthenticated) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await employeesApi.getById(params.id)
        setEmployee(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch employee details")
        toast.error(err instanceof Error ? err.message : "Failed to fetch employee details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployee()
  }, [params.id, isAuthenticated])

  const handleSubmit = async (formData: EmployeeFormData) => {
    try {
      await employeesApi.update(params.id, formData)
      toast.success("Employee updated successfully")
      router.push(`/employees/${params.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update employee")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Please log in to edit employee details.</p>
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

  if (!employee) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Employee not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Edit Employee</h2>
      </div>
      <EmployeeForm
        initialData={employee}
        onSubmit={handleSubmit}
        companies={[]} // This should be populated with actual companies data
      />
    </div>
  )
} 