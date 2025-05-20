"use client"

import type React from "react"
import { useState } from "react"

interface FormData {
  name: string
  email: string
  telephone: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  telephone?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    telephone: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (formData.telephone && !/^\d{10,11}$/.test(formData.telephone.replace(/\D/g, ""))) {
      newErrors.telephone = "Telefone inválido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Simulação de envio para o backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        telephone: "",
        message: "",
      })

      // Reset do sucesso após 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      setSubmitError("Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
          <div className="hidden md:block md:w-2/5 relative">
            <div className="relative">
              {/* Elemento decorativo verde */}
              <div className="absolute -top-4 -left-4 w-8 h-16 bg-primary"></div>

              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-form-At8KljN82AMXqUzDaOcxuCwi2xisnN.png"
                alt=""
                className="w-full h-auto rounded-full"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="md:w-3/5">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                GET IN
                <span className="text-primary block">TOUCH</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Your name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  required
                />
                {errors.name && (
                  <span id="name-error" className="text-red-500 text-sm mt-1 block">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                  />
                  {errors.email && (
                    <span id="email-error" className="text-red-500 text-sm mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="telephone" className="block mb-2 font-medium">
                    Telephone*
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.telephone ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    aria-invalid={!!errors.telephone}
                    aria-describedby={errors.telephone ? "telephone-error" : undefined}
                  />
                  {errors.telephone && (
                    <span id="telephone-error" className="text-red-500 text-sm mt-1 block">
                      {errors.telephone}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  required
                ></textarea>
                {errors.message && (
                  <span id="message-error" className="text-red-500 text-sm mt-1 block">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-4 font-semibold uppercase tracking-wide disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "ENVIANDO..." : "SEND NOW"}
              </button>

              {submitSuccess && (
                <div className="bg-green-100 text-green-800 p-4 rounded-md" role="alert">
                  Mensagem enviada com sucesso!
                </div>
              )}

              {submitError && (
                <div className="bg-red-100 text-red-800 p-4 rounded-md" role="alert">
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
