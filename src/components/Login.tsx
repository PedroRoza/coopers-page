"use client"

import type React from "react"
import { useState } from "react"

interface LoginProps {
  onClose: () => void
  onSignupClick: () => void
}

export default function Login({ onClose, onSignupClick }: LoginProps) {
  function login() {return true}

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState("")

  const validateForm = (): boolean => {
    const newErrors = {
      email: "",
      password: "",
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setLoginError("")

    try {
      await login(formData.email, formData.password)
      onClose()
    } catch (error) {
      setLoginError("Email ou senha inválidos. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        onClick={onClose}
        aria-label="Fechar modal de login"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="login-email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="login-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            required
          />
          {errors.email && (
            <span id="login-email-error" className="text-red-500 text-sm mt-1 block">
              {errors.email}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="login-password" className="block mb-2 font-medium">
            Senha
          </label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "login-password-error" : undefined}
            required
          />
          {errors.password && (
            <span id="login-password-error" className="text-red-500 text-sm mt-1 block">
              {errors.password}
            </span>
          )}
        </div>

        {loginError && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md" role="alert">
            {loginError}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-sm mt-4">
          Não tem uma conta?{" "}
          <button type="button" className="text-primary font-semibold hover:underline" onClick={onSignupClick}>
            Cadastre-se
          </button>
        </p>
      </form>
    </div>
  )
}
