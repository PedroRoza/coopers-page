"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Main from "@/components/Main"
import Login from "@/components/Login"

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const user = true 
  const loading = true

  const toggleLogin = () => {
    setShowLogin(!showLogin)
    setShowSignup(false)
  }

  const toggleSignup = () => {
    setShowSignup(!showSignup)
    setShowLogin(false)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header onLoginClick={toggleLogin} />

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <Login onClose={toggleLogin} onSignupClick={toggleSignup} />
        </div>
      )}


      <Main />
    </main>
  )
}
