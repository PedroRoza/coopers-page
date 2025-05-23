"use client"

import type React from "react"

import { useState } from "react"

interface RegisterDialogProps {
  onClose: () => void
  onLogin: () => void
}

export default function RegisterDialog({ onClose, onLogin }: RegisterDialogProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
    let isValid = true

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Registration data:", formData)
      // Here you would normally handle the registration logic
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close dialog"
        >
          close
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">
              Register
              <span className="block text-green-500 text-lg font-normal">create your account</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="register-username" className="block mb-1">
                Username:
              </label>
              <input
                type="text"
                id="register-username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.username ? "border-red-500" : "border-gray-300"} rounded`}
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? "username-error" : undefined}
              />
              {errors.username && (
                <p id="username-error" className="mt-1 text-red-500 text-sm">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="register-email" className="block mb-1">
                Email:
              </label>
              <input
                type="email"
                id="register-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="register-password" className="block mb-1">
                Password:
              </label>
              <input
                type="password"
                id="register-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded`}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p id="password-error" className="mt-1 text-red-500 text-sm">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="register-confirm-password" className="block mb-1">
                Confirm Password:
              </label>
              <input
                type="password"
                id="register-confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded`}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              />
              {errors.confirmPassword && (
                <p id="confirm-password-error" className="mt-1 text-red-500 text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={onLogin} className="text-green-500 hover:underline focus:outline-none">
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
