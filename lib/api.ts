// Base API URL - would be set from environment variables in production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper function to get the current token
const getAuthToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem("token")
}

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

// Helper function to dispatch auth state change event
const dispatchAuthStateChange = () => {
  if (typeof window !== 'undefined') {
    console.log('Dispatching auth state change event')
    const event = new Event('authStateChanged')
    window.dispatchEvent(event)
  }
}

// Authentication API
export const authApi = {
  login: async (username: string, password: string) => {
    console.log('Attempting login...')
    const response = await fetch(`${API_BASE_URL}/auth/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    const data = await handleResponse(response)
    
    // Store both access and refresh tokens
    localStorage.setItem("token", data.access)
    localStorage.setItem("refresh_token", data.refresh)
    
    console.log('Login successful, tokens stored')
    // Dispatch auth state change event
    dispatchAuthStateChange()
    return data
  },

  logout: () => {
    console.log('Logging out...')
    // Remove both tokens
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
    
    // Dispatch auth state change event
    dispatchAuthStateChange()
  },

  refreshToken: async (refreshToken: string) => {
    console.log('Refreshing token...')
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })
    const data = await handleResponse(response)
    
    // Update the access token
    localStorage.setItem("token", data.access)
    
    console.log('Token refreshed successfully')
    // Dispatch auth state change event
    dispatchAuthStateChange()
    return data
  },
}

// Helper function to get headers with authentication
const getAuthHeaders = (contentType: string = 'application/json') => {
  const token = getAuthToken()
  const headers: Record<string, string> = {
    'Content-Type': contentType,
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

// Helper function to handle API requests with token refresh
const handleApiRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  if (!token) {
    throw new Error("No authentication token found")
  }

  const response = await fetch(url, options)
  
  if (response.status === 401) {
    // Token might be expired, try to refresh
    const refreshToken = localStorage.getItem("refresh_token")
    if (refreshToken) {
      try {
        const data = await authApi.refreshToken(refreshToken)
        
        // Retry the original request with new token
        const newOptions = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${data.access}`,
          },
        }
        return fetch(url, newOptions)
      } catch (err) {
        // If refresh fails, clear tokens and throw error
        localStorage.removeItem("token")
        localStorage.removeItem("refresh_token")
        dispatchAuthStateChange()
        throw new Error("Session expired. Please log in again.")
      }
    } else {
      // No refresh token available, clear access token and throw error
      localStorage.removeItem("token")
      dispatchAuthStateChange()
      throw new Error("Please log in to continue.")
    }
  }
  
  return response
}

// Companies API
export const companiesApi = {
  getAll: async (page: number = 1, params: Record<string, any> = {}) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...params,
    })
    const response = await handleApiRequest(
      `${API_BASE_URL}/companies/?${queryParams}`,
      {
        headers: getAuthHeaders(),
      }
    )
    return handleResponse(response)
  },

  getById: async (id: string) => {
    const response = await handleApiRequest(`${API_BASE_URL}/companies/${id}/`, {
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },

  create: async (companyData: any) => {
    const response = await handleApiRequest(`${API_BASE_URL}/companies/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(companyData),
    })
    return handleResponse(response)
  },

  update: async (id: string, companyData: any) => {
    const response = await handleApiRequest(`${API_BASE_URL}/companies/${id}/`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(companyData),
    })
    return handleResponse(response)
  },

  delete: async (id: string) => {
    const response = await handleApiRequest(`${API_BASE_URL}/companies/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    return true
  },

  bulkUpload: async (formData: FormData) => {
    const response = await handleApiRequest(`${API_BASE_URL}/companies/bulk_upload/`, {
      method: "POST",
      headers: getAuthHeaders('multipart/form-data'),
      body: formData,
    })
    return handleResponse(response)
  },
}

// Employees API
export const employeesApi = {
  getAll: async (page: number = 1, params: Record<string, any> = {}) => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...params,
    })
    const response = await handleApiRequest(
      `${API_BASE_URL}/employees/?${queryParams}`,
      {
        headers: getAuthHeaders(),
      }
    )
    return handleResponse(response)
  },

  getById: async (id: string) => {
    const response = await handleApiRequest(`${API_BASE_URL}/employees/${id}/`, {
      headers: getAuthHeaders(),
    })
    return handleResponse(response)
  },

  create: async (employeeData: any) => {
    const response = await handleApiRequest(`${API_BASE_URL}/employees/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(employeeData),
    })
    return handleResponse(response)
  },

  update: async (id: string, employeeData: any) => {
    const response = await handleApiRequest(`${API_BASE_URL}/employees/${id}/`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(employeeData),
    })
    return handleResponse(response)
  },

  delete: async (id: string) => {
    const response = await handleApiRequest(`${API_BASE_URL}/employees/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }

    return true
  },

  bulkUpload: async (formData: FormData) => {
    const response = await handleApiRequest(`${API_BASE_URL}/employees/bulk_upload/`, {
      method: "POST",
      headers: getAuthHeaders('multipart/form-data'),
      body: formData,
    })
    return handleResponse(response)
  },
}

// Search API
export const searchApi = {
  search: async (params: Record<string, string>) => {
    const queryParams = new URLSearchParams(params)
    const response = await handleApiRequest(
      `${API_BASE_URL}/search/?${queryParams}`,
      {
        headers: getAuthHeaders(),
      }
    )
    return handleResponse(response)
  },

  exportResults: async (params: Record<string, string>) => {
    const queryParams = new URLSearchParams(params)
    const response = await handleApiRequest(
      `${API_BASE_URL}/search/export/?${queryParams}`,
      {
        headers: getAuthHeaders(),
      }
    )
    return handleResponse(response)
  },
}