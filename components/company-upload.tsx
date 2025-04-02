"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, FileText, X } from "lucide-react"
import { companiesApi } from "@/lib/api"
import { toast } from "sonner"

export default function CompanyUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit")
        toast.error("File size exceeds 10MB limit")
        return
      }
      // Check file type
      if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file)
        setError(null)
      } else {
        setError("Please upload a CSV or Excel file")
        toast.error("Please upload a CSV or Excel file")
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setError(null)
    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await companiesApi.bulkUpload(formData)
      toast.success(response.message || "Companies uploaded successfully")
      setSelectedFile(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to upload companies"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700'}
          ${error ? 'border-destructive' : ''}`}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <div className="flex items-center justify-center space-x-2">
            <FileText className="h-12 w-12 text-primary" />
            <div className="text-left">
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                removeFile()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {isDragActive ? "Drop the file here" : "Drop your file here or click to browse"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Supported formats: CSV, Excel (.xlsx, .xls)
            </p>
            {error && (
              <p className="text-destructive text-sm mt-2">{error}</p>
            )}
          </>
        )}
      </div>

      {selectedFile && (
        <div className="flex justify-center">
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload File"
            )}
          </Button>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Upload Instructions</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Ensure all required fields are filled in the template</li>
          <li>Company names must be unique</li>
          <li>Registration numbers must be valid and unique</li>
          <li>Department lists should be comma-separated</li>
          <li>Maximum file size: 10MB</li>
        </ul>
        <div className="mt-4 text-center">
          <a
            href="/templates/company_template.csv"
            download
            className="text-primary hover:underline inline-flex items-center"
          >
            <FileText className="mr-2 h-4 w-4" />
            Download Template
          </a>
        </div>
      </div>
    </div>
  )
} 