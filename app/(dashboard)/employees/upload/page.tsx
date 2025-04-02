import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EmployeeUpload from "@/components/employee-upload"

export default function EmployeeUploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Upload Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeeUpload />
        </CardContent>
      </Card>
    </div>
  )
} 