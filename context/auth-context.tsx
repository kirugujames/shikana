"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
    id: string
    username: string
    email: string
    first_name?: string
    last_name?: string
    phone?: string
    role?: string
    [key: string]: any
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (user: User, token: string) => void
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check storage on mount
        const storedUser = sessionStorage.getItem("user")
        const storedToken = sessionStorage.getItem("token")

        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser))
                setToken(storedToken)
            } catch (e) {
                console.error("Failed to parse user data", e)
                sessionStorage.removeItem("user")
                sessionStorage.removeItem("token")
            }
        }
        setIsLoading(false)
    }, [])

    const login = (userData: User, authToken: string) => {
        setUser(userData)
        setToken(authToken)
        sessionStorage.setItem("user", JSON.stringify(userData))
        sessionStorage.setItem("token", authToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
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
