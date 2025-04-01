// Base API URL - would be set from environment variables in production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper function for handling API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Try to get error message from response
    let errorMessage
    try {
      const errorData = await response.json()
      errorMessage = errorData.detail || errorData.error || `Error: ${response.status}`
    } catch (e) {
      errorMessage = `Error: ${response.status} ${response.statusText}`
    }
    throw new Error(errorMessage)
  }
  return response.json()
}

// Authentication API
export const authApi = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    return handleResponse(response)
  },

  refreshToken: async (refreshToken: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })
    return handleResponse(response)
  },
}

// Companies API
export const companiesApi = {
  getAll: async (page = 1, filters = {}) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...filters,
    })

    const response = await fetch(`${API_BASE_URL}/companies/?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return handleResponse(response)
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/companies/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return handleResponse(response)
  },

  create: async (companyData: any) => {
    const response = await fetch(`${API_BASE_URL}/companies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(companyData),
    })
    return handleResponse(response)
  },

  update: async (id: string, companyData: any) => {
    const response = await fetch(`${API_BASE_URL}/companies/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(companyData),
    })
    return handleResponse(response)
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/companies/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    return true
  },

  bulkUpload: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/companies/bulk_upload/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
    return handleResponse(response)
  },
}

// Employees API
export const employeesApi = {
  getAll: async (page = 1, filters = {}) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...filters,
    })

    const response = await fetch(`${API_BASE_URL}/employees/?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return handleResponse(response)
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return handleResponse(response)
  },

  create: async (employeeData: any) => {
    const response = await fetch(`${API_BASE_URL}/employees/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(employeeData),
    })
    return handleResponse(response)
  },

  update: async (id: string, employeeData: any) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(employeeData),
    })
    return handleResponse(response)
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    return true
  },

  bulkUpload: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/employees/bulk_upload/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
    return handleResponse(response)
  },
}

// Search API
export const searchApi = {
  search: async (searchParams: any) => {
    const queryParams = new URLSearchParams(searchParams)

    const response = await fetch(`${API_BASE_URL}/search/?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return handleResponse(response)
  },
}

