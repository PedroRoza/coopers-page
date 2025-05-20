"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário está logado ao carregar a página
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulação de chamada à API
      // Na implementação real, isso seria uma chamada fetch para o backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulação de resposta do servidor
      const userData = {
        id: "user-" + Date.now(),
        name: email.split("@")[0], // Usando parte do email como nome para simulação
        email,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      return userData
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      throw new Error("Falha ao fazer login")
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Simulação de chamada à API
      // Na implementação real, isso seria uma chamada fetch para o backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulação de resposta do servidor
      const userData = {
        id: "user-" + Date.now(),
        name,
        email,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      return userData
    } catch (error) {
      console.error("Erro ao criar conta:", error)
      throw new Error("Falha ao criar conta")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}
