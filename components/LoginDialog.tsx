"use client"

import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

interface LoginDialogProps {
  onClose: () => void
  onRegister: () => void
}

export default function LoginDialog({ onClose, onRegister }: LoginDialogProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ username: "", password: "" })

  const validateForm = () => {
    const newErrors = { username: "", password: "" }
    let isValid = true

    if (!username.trim()) {
      newErrors.username = "Username is required"
      isValid = false
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const err = await response.json()
        toast.error(err.message || "Login failed")
        return
      }

      const userData = await response.json()
      const dataToStore = { ...userData }
      localStorage.setItem("userData", JSON.stringify(dataToStore))

      toast.success("Login successful!")
      onClose()
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Error during login. Please try again.")
    }
  }

  return (
    <>
      <Toaster position="top-right" />
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
                Sign in
                <span className="block text-green-500 text-lg font-normal">to access your list</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-1">
                  User:
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                <label htmlFor="password" className="block mb-1">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </form>

            <div className="mt-4 text-center">
              <button onClick={onRegister} className="text-green-500 hover:underline focus:outline-none">
                Don't have an account? Register now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
