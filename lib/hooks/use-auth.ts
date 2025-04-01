import { useState, useEffect } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const accessToken = localStorage.getItem('token')
        const refreshToken = localStorage.getItem('refresh_token')
        
        // Check if both tokens exist and are not empty strings
        const hasValidTokens = !!accessToken && !!refreshToken && 
          accessToken.trim() !== '' && refreshToken.trim() !== ''
        
        setIsAuthenticated(hasValidTokens)
      } catch (error) {
        console.error('Error checking auth state:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    // Check auth immediately
    checkAuth()

    // Listen for storage changes
    window.addEventListener('storage', checkAuth)

    // Listen for custom auth events
    window.addEventListener('authStateChanged', checkAuth)

    // Check auth state periodically (every 5 minutes)
    const intervalId = setInterval(checkAuth, 5 * 60 * 1000)

    return () => {
      window.removeEventListener('storage', checkAuth)
      window.removeEventListener('authStateChanged', checkAuth)
      clearInterval(intervalId)
    }
  }, [])

  return { isAuthenticated, isLoading }
} 