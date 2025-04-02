import { toast } from "sonner"

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search_term: "",
    company: "all",
    department: "all",
    position: "",
    start_date: "",
    end_date: "",
    active_only: false,
    former_only: false,
  })
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companiesApi.getAll()
        setCompanies(response.results)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to fetch companies")
      }
    }

    fetchCompanies()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate search parameters
      if (!searchParams.search_term && 
          searchParams.company === "all" && 
          searchParams.department === "all" && 
          !searchParams.position && 
          !searchParams.start_date && 
          !searchParams.end_date && 
          !searchParams.active_only && 
          !searchParams.former_only) {
        toast.error("Please provide at least one search criterion")
        setIsLoading(false)
        return
      }

      // Validate date range
      if (searchParams.start_date && searchParams.end_date && 
          new Date(searchParams.start_date) > new Date(searchParams.end_date)) {
        toast.error("End date must be after start date")
        setIsLoading(false)
        return
      }

      // Validate employment status
      if (searchParams.active_only && searchParams.former_only) {
        toast.error("Cannot search for both active and former employees simultaneously")
        setIsLoading(false)
        return
      }

      // Search will be handled by the SearchResults component
      setIsLoading(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to perform search")
      setIsLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      toast.loading("Preparing export...")
      const response = await searchApi.exportResults(searchParams)
      const blob = new Blob([response], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'search-results.csv'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success("Export completed successfully")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to export results")
    }
  }
} 