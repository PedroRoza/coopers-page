"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"

interface RegisterDialogProps {
  onClose: () => void
  onLogin: () => void
}

export default function RegisterDialog({ onClose, onLogin }: RegisterDialogProps) {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    server: "",
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {
      user: "",
      email: "",
      password: "",
      confirmPassword: "",
      server: "",
    }
    let isValid = true

    const trimmedUsername = formData.user.trim()

    if (!trimmedUsername) {
      newErrors.user = "User is required"
      isValid = false
    } else if (trimmedUsername.length > 50) {
      newErrors.user = "User must be at most 50 characters"
      isValid = false
    } else if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
      newErrors.user = "User can only contain letters, numbers and underscores"
      isValid = false
    }

    const trimmedEmail = formData.email.trim()
    if (!trimmedEmail) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      newErrors.email = "Email is invalid"
      isValid = false
    } else if (trimmedEmail.length > 50) {
      newErrors.email = "Email must be at most 50 characters"
      isValid = false
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    } else if (formData.password.length > 25) {
      newErrors.password = "Password must be at most 25 characters"
      isValid = false
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "", server: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    const toastId = toast.loading("Registering...")    

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.user.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors((prev) => ({ ...prev, server: data.error || "Registration failed" }))
        toast.error(data.error || "Registration failed", { id: toastId })
      } else {
        toast.success("Registration successful!", { id: toastId })
        onClose()
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, server: "Something went wrong." }))
      toast.error("Something went wrong.", { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-30">
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
            {["user", "email", "password", "confirmPassword"].map((field) => {
              const isPasswordField = field === "password" || field === "confirmPassword"
              const show =
                field === "password" ? showPassword : field === "confirmPassword" ? showConfirmPassword : false
              const toggleShow =
                field === "password"
                  ? () => setShowPassword((prev) => !prev)
                  : () => setShowConfirmPassword((prev) => !prev)

              return (
                <div key={field}>
                  <label htmlFor={`register-${field}`} className="block mb-1 capitalize">
                    {field === "confirmPassword"
                      ? "Confirm Password"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                    :
                  </label>
                  <div className="relative">
                    <input
                      type={
                        isPasswordField ? (show ? "text" : "password") : field === "email" ? "email" : "text"
                      }
                      id={`register-${field}`}
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      maxLength={
                        field === "user" || field === "email"
                          ? 50
                          : field.includes("password")
                          ? 25
                          : undefined
                      }
                      className={`w-full p-2 pr-10 border ${
                        (errors as any)[field] ? "border-red-500" : "border-gray-300"
                      } rounded`}
                      aria-invalid={(errors as any)[field] ? "true" : undefined}
                    />
                    {isPasswordField && (
                      <button
                        type="button"
                        onClick={toggleShow}
                        className="absolute inset-y-0 right-2 px-1 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                        tabIndex={-1}
                      >
                        {show ? "Hide" : "Show"}
                      </button>
                    )}
                  </div>
                  {(errors as any)[field] && (
                    <p className="mt-1 text-red-500 text-sm">{(errors as any)[field]}</p>
                  )}
                </div>
              )
            })}

            {errors.server && <p className="text-red-600 text-sm">{errors.server}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
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
