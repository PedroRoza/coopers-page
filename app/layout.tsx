import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from 'react-hot-toast'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coopers - Organize your daily jobs",
  description: "The only way to get things done. Organize your tasks and improve your productivity.",
  keywords: "to-do list, task management, productivity, organization",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      <Toaster position="top-right" />  
      </body>
    </html>
  )
}
