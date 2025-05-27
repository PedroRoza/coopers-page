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
  const [usernameAvailable, setUsernameAvailable] = useState<null | boolean>(null)
  const [emailAvailable, setEmailAvailable] = useState<null | boolean>(null)

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
    const trimmedEmail = formData.email.trim()

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
    if (name === "user") setUsernameAvailable(null)
    if (name === "email") setEmailAvailable(null)
  }

  const checkFieldAvailability = async (field: "username" | "email", value: string) => {
    if (!value.trim()) return

    try {
      const res = await fetch("/api/verifyUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value.trim() }),
      })

      const data = await res.json()

      if (data.exists) {
        setErrors((prev) => ({
          ...prev,
          [field === "username" ? "user" : "email"]: `${field === "username" ? "Username" : "Email"} already exists.`,
        }))
        if (field === "username") setUsernameAvailable(false)
        if (field === "email") setEmailAvailable(false)
      } else {
        setErrors((prev) => ({
          ...prev,
          [field === "username" ? "user" : "email"]: "",
        }))
        if (field === "username") setUsernameAvailable(true)
        if (field === "email") setEmailAvailable(true)
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        [field === "username" ? "user" : "email"]: `Error checking ${field}`,
      }))
      if (field === "username") setUsernameAvailable(false)
      if (field === "email") setEmailAvailable(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    const toastId = toast.loading("Registering...")

    try {
      const res = await fetch("/api/register", {
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
    } catch {
      setErrors((prev) => ({ ...prev, server: "Something went wrong." }))
      toast.error("Something went wrong.", { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-30">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">close</button>
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">
              Register
              <span className="block text-green-500 text-lg font-normal">create your account</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* USERNAME */}
            <div>
              <label htmlFor="register-user" className="block mb-1">Username:</label>
              <div className="relative">
                <input
                  type="text"
                  id="register-user"
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  onBlur={() => checkFieldAvailability("username", formData.user)}
                  maxLength={50}
                  className={`w-full p-2 pr-10 border ${errors.user ? "border-red-500" : "border-gray-300"} rounded`}
                />
                {usernameAvailable === true && <span className="absolute right-2 top-2 text-green-500">✅</span>}
                {usernameAvailable === false && <span className="absolute right-2 top-2 text-red-500">❌</span>}
              </div>
              {errors.user && <p className="text-red-500 text-sm mt-1">{errors.user}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="register-email" className="block mb-1">Email:</label>
              <div className="relative">
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => checkFieldAvailability("email", formData.email)}
                  maxLength={50}
                  className={`w-full p-2 pr-10 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`}
                />
                {emailAvailable === true && <span className="absolute right-2 top-2 text-green-500">✅</span>}
                {emailAvailable === false && <span className="absolute right-2 top-2 text-red-500">❌</span>}
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* PASSWORD + CONFIRM */}
            {["password", "confirmPassword"].map((field) => {
              const isPasswordField = field.includes("password")
              const show = field === "password" ? showPassword : showConfirmPassword
              const toggleShow = field === "password"
                ? () => setShowPassword((prev) => !prev)
                : () => setShowConfirmPassword((prev) => !prev)

              return (
                <div key={field}>
                  <label htmlFor={`register-${field}`} className="block mb-1 capitalize">
                    {field === "confirmPassword" ? "Confirm Password" : "Password"}
                  </label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      id={`register-${field}`}
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      maxLength={25}
                      className={`w-full p-2 pr-10 border ${(errors as any)[field] ? "border-red-500" : "border-gray-300"} rounded`}
                    />
                    <button type="button" onClick={toggleShow} className="absolute right-2 top-2 text-sm text-gray-500">
                      {show ? "Hide" : "Show"}
                    </button>
                  </div>
                  {(errors as any)[field] && <p className="text-red-500 text-sm mt-1">{(errors as any)[field]}</p>}
                </div>
              )
            })}

            {errors.server && <p className="text-red-600 text-sm">{errors.server}</p>}

            <button type="submit" disabled={loading} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50">
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={onLogin} className="text-green-500 hover:underline">
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
