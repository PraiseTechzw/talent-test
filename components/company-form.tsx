"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import { Badge } from "@/components/ui/badge"
import { X, Loader2 } from "lucide-react"
import { companiesApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface CompanyFormProps {
  initialData?: any
  isEdit?: boolean
}

export default function CompanyForm({ initialData, isEdit = false }: CompanyFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    registration_number: initialData?.registration_number || "",
    registration_date: initialData?.registration_date ? new Date(initialData.registration_date) : undefined,
    employee_count: initialData?.employee_count || "",
    contact_person: initialData?.contact_person || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
  })

  const [departments, setDepartments] = useState<string[]>(initialData?.departments || [])
  const [newDepartment, setNewDepartment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const addDepartment = () => {
    if (newDepartment.trim() !== "" && !departments.includes(newDepartment.trim())) {
      setDepartments([...departments, newDepartment.trim()])
      setNewDepartment("")
    }
  }

  const removeDepartment = (index: number) => {
    setDepartments(departments.filter((_, i) => i !== index))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id.replace("company-", "")]: value,
    })
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData({
      ...formData,
      registration_date: date,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const companyData = {
        ...formData,
        departments,
        registration_date: formData.registration_date ? formData.registration_date.toISOString().split("T")[0] : null,
        employee_count: Number.parseInt(formData.employee_count.toString()),
      }

      if (isEdit && initialData?.id) {
        await companiesApi.update(initialData.id, companyData)
        toast({
          title: "Success",
          description: "Company updated successfully",
        })
      } else {
        await companiesApi.create(companyData)
        toast({
          title: "Success",
          description: "Company created successfully",
        })
      }

      router.push("/companies")
      router.refresh()
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to save company",
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
          <Label htmlFor="company-name">Company Name *</Label>
          <Input
            id="company-name"
            placeholder="Enter company name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-registration_number">Registration Number *</Label>
          <Input
            id="company-registration_number"
            placeholder="Enter registration number"
            required
            value={formData.registration_number}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-registration_date">Registration Date *</Label>
          <DatePicker date={formData.registration_date} onDateChange={handleDateChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-employee_count">Employee Count *</Label>
          <Input
            id="company-employee_count"
            type="number"
            min="1"
            placeholder="Enter number of employees"
            required
            value={formData.employee_count}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-contact_person">Contact Person *</Label>
          <Input
            id="company-contact_person"
            placeholder="Enter contact person name"
            required
            value={formData.contact_person}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-phone">Phone Number *</Label>
          <Input
            id="company-phone"
            placeholder="Enter phone number"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-email">Email Address *</Label>
          <Input
            id="company-email"
            type="email"
            placeholder="Enter email address"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Departments</Label>
          <div className="flex space-x-2">
            <Input
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              placeholder="Add department"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addDepartment()
                }
              }}
            />
            <Button type="button" onClick={addDepartment}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {departments.map((dept, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {dept}
                <button
                  type="button"
                  onClick={() => removeDepartment(index)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company-address">Address *</Label>
        <Textarea
          id="company-address"
          placeholder="Enter company address"
          required
          value={formData.address}
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
            "Update Company"
          ) : (
            "Save Company"
          )}
        </Button>
      </div>
    </form>
  )
}

