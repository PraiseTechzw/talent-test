import { toast } from "sonner"

export default function EmployeeDetailsPage({ params }: { params: { id: string } }) {
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeesApi.delete(params.id)
        toast.success("Employee deleted successfully")
        router.push("/employees")
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete employee")
      }
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Please log in to view employee details.</p>
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
        <h2 className="text-3xl font-bold tracking-tight">{employee.name}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => router.push(`/employees/${params.id}/edit`)}>
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
            <CardTitle className="text-sm font-medium">Employee ID</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employee.employee_id}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Company</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employee.company_name}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employee.department}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={employee.is_active ? "default" : "outline"}>
              {employee.is_active ? "Active" : "Former"}
            </Badge>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Employment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Role</p>
              <p className="text-sm text-muted-foreground">{employee.role}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">{employee.start_date}</p>
            </div>
            <div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">{employee.end_date || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Duties</p>
              <p className="text-sm text-muted-foreground">{employee.duties}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 