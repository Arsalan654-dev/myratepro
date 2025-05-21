"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the auth context
const AuthContext = createContext()

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext)
}

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      const user = localStorage.getItem("user")
      if (user) {
        setCurrentUser(JSON.parse(user))
        setIsAuthenticated(true)
      }
      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      const user = {
        id: "1",
        name: "Admin User",
        email: email,
        role: "admin",
        avatar: null,
      }

      localStorage.setItem("user", JSON.stringify(user))
      setCurrentUser(user)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Signup function
  const signup = async (name, email, password) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful signup
      const user = {
        id: "1",
        name: name,
        email: email,
        role: "admin",
        avatar: null,
      }

      localStorage.setItem("user", JSON.stringify(user))
      setCurrentUser(user)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  // Update user profile
  const updateProfile = (userData) => {
    const updatedUser = { ...currentUser, ...userData }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setCurrentUser(updatedUser)
    return { success: true }
  }

  // Request password reset
  const requestPasswordReset = async (email) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful request
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Reset password
  const resetPassword = async (token, newPassword) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful reset
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful change
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Context value
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    requestPasswordReset,
    resetPassword,
    changePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
