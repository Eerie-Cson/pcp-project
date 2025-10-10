"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  email: string
  role: "admin" | "user"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, role: "admin" | "user") => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing auth on mount
    const role = localStorage.getItem("user_role") as "admin" | "user" | null
    const token = localStorage.getItem("auth_token")
    const email = localStorage.getItem("user_email")

    if (role && token && email) {
      setUser({ email, role })
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, role: "admin" | "user") => {
    localStorage.setItem("user_role", role)
    localStorage.setItem("user_email", email)
    localStorage.setItem("auth_token", "demo_token_" + Date.now())
    setUser({ email, role })
  }

  const logout = () => {
    localStorage.removeItem("user_role")
    localStorage.removeItem("user_email")
    localStorage.removeItem("auth_token")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
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
