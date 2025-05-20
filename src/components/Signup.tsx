"use client"

import type React from "react"
import { useState } from "react"

interface SignupProps {
  onClose: () => void
  onLoginClick: () => void
}

export default function Signup({ onClose, onLoginClick }: SignupProps) {
  const signup  = true

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupError, setSignupError] = useState("")

  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.email && !newErrors.password && !newErrors.confirmPassword
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
    setSignupError("")

    try {
      await signup(formData.name, formData.email, formData.password)
      onClose()
    } catch (error) {
      setSignupError("Erro ao criar conta. Este email pode já estar em uso.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        onClick={onClose}
        aria-label="Fechar modal de cadastro"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="signup-name" className="block mb-2 font-medium">
            Nome
          </label>
          <input
            type="text"
            id="signup-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "signup-name-error" : undefined}
            required
          />
          {errors.name && (
            <span id="signup-name-error" className="text-red-500 text-sm mt-1 block">
              {errors.name}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="signup-email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="signup-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "signup-email-error" : undefined}
            required
          />
          {errors.email && (
            <span id="signup-email-error" className="text-red-500 text-sm mt-1 block">
              {errors.email}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="signup-password" className="block mb-2 font-medium">
            Senha
          </label>
          <input
            type="password"
            id="signup-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "signup-password-error" : undefined}
            required
          />
          {errors.password && (
            <span id="signup-password-error" className="text-red-500 text-sm mt-1 block">
              {errors.password}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="signup-confirm-password" className="block mb-2 font-medium">
            Confirmar Senha
          </label>
          <input
            type="password"
            id="signup-confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? "signup-confirm-password-error" : undefined}
            required
          />
          {errors.confirmPassword && (
            <span id="signup-confirm-password-error" className="text-red-500 text-sm mt-1 block">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        {signupError && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md" role="alert">
            {signupError}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="text-center text-sm mt-4">
          Já tem uma conta?{" "}
          <button type="button" className="text-primary font-semibold hover:underline" onClick={onLoginClick}>
            Faça login
          </button>
        </p>
      </form>
    </div>
  )
}
