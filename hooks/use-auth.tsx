"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authApi } from "@/lib/api"

interface User {
  id: string
  username: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkAuth = async () => {
    const token = localStorage.getItem("token")
    const refreshToken = localStorage.getItem("refresh_token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      try {
        // Check if token is expired
        const tokenData = JSON.parse(atob(token.split('.')[1]))
        const isExpired = tokenData.exp * 1000 < Date.now()

        if (isExpired && refreshToken) {
          try {
            const data = await authApi.refreshToken(refreshToken)
            localStorage.setItem("token", data.access)
            if (data.refresh) {
              localStorage.setItem("refresh_token", data.refresh)
            }
          } catch (err) {
            // If refresh fails, log out
            logout()
            return
          }
        }

        setUser(JSON.parse(userData))
      } catch (e) {
        // Invalid token or user data
        logout()
      }
    }

    setIsLoading(false)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await authApi.login(username, password)

      // Store tokens
      localStorage.setItem("token", data.access)
      localStorage.setItem("refresh_token", data.refresh)

      // For this example, we'll assume the token payload contains user info
      // In a real app, you might need to make another API call to get user details
      const userData: User = {
        id: "1", // This would come from the API
        username,
        email: "user@example.com", // This would come from the API
        role: "admin", // This would come from the API
      }

      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

