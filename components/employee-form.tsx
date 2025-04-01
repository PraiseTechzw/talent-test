"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { employeesApi, companiesApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Company {
  id: string
  name: string
}

interface EmployeeFormProps {
  initialData?: any
  isEdit?: boolean
}

export default function EmployeeForm({ initialData, isEdit = false }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    employee_id: initialData?.employee_id || "",
    company: initialData?.company || "",
    department: initialData?.department || "",
    role: initialData?.role || "",
    start_date: initialData?.start_date ? new Date(initialData.start_date) : undefined,
    end_date: initialData?.end_date ? new Date(initialData.end_date) : undefined,
    duties: initialData?.duties || "",
  })

  const [isCurrentEmployee, setIsCurrentEmployee] = useState(initialData ? !initialData.end_date : true)
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoadingCompanies(true)
      try {
        const response = await companiesApi.getAll(1, { page_size: 100 })
        setCompanies(response.results)
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load companies",
          variant: "destructive",
        })
      } finally {
        setIsLoadingCompanies(false)
      }
    }

    fetchCompanies()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id.replace("employee-", "")]: value,
    })
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleStartDateChange = (date: Date | undefined) => {
    setFormData({
      ...formData,
      start_date: date,
    })
  }

  const handleEndDateChange = (date: Date | undefined) => {
    setFormData({
      ...formData,
      end_date: date,
    })
  }

  const handleCurrentEmployeeChange = (checked: boolean) => {
    setIsCurrentEmployee(checked)
    if (checked) {
      setFormData({
        ...formData,
        end_date: undefined,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const employeeData = {
        ...formData,
        start_date: formData.start_date ? formData.start_date.toISOString().split("T")[0] : null,
        end_date: isCurrentEmployee ? null : formData.end_date ? formData.end_date.toISOString().split("T")[0] : null,
      }

      if (isEdit && initialData?.id) {
        await employeesApi.update(initialData.id, employeeData)
        toast({
          title: "Success",
          description: "Employee updated successfully",
        })
      } else {
        await employeesApi.create(employeeData)
        toast({
          title: "Success",
          description: "Employee created successfully",
        })
      }

      router.push("/employees")
      router.refresh()
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to save employee",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="employee-name">Full Name *</Label>
          <Input
            id="employee-name"
            placeholder="Enter employee name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employee-employee_id">Employee ID *</Label>
          <Input
            id="employee-employee_id"
            placeholder="Enter employee ID"
            required
            value={formData.employee_id}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Select
            value={formData.company}
            onValueChange={(value) => handleSelectChange("company", value)}
            disabled={isLoadingCompanies}
          >
            <SelectTrigger id="company">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {isLoadingCompanies ? (
                <div className="flex items-center justify-center p-2">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="research">Research</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employee-role">Role/Position *</Label>
          <Input
            id="employee-role"
            placeholder="Enter role or position"
            required
            value={formData.role}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date *</Label>
          <DatePicker date={formData.start_date} onDateChange={handleStartDateChange} />
        </div>

        <div className="space-y-2 flex items-center">
          <div className="flex items-center space-x-2">
            <Switch id="current-employee" checked={isCurrentEmployee} onCheckedChange={handleCurrentEmployeeChange} />
            <Label htmlFor="current-employee">Current Employee</Label>
          </div>
        </div>

        {!isCurrentEmployee && (
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date *</Label>
            <DatePicker date={formData.end_date} onDateChange={handleEndDateChange} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="employee-duties">Duties and Responsibilities</Label>
        <Textarea
          id="employee-duties"
          placeholder="Describe the employee's duties and responsibilities"
          rows={4}
          value={formData.duties}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : isEdit ? (
            "Update Employee"
          ) : (
            "Save Employee"
          )}
        </Button>
      </div>
    </form>
  )
}

