"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Main"
import TodoSection from "@/components/TodoSection"
import GoodThings from "@/components/GoodThings"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Login from "@/components/Login"
import Signup from "@/components/Signup"

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

      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <Signup onClose={toggleSignup} onLoginClick={toggleLogin} />
        </div>
      )}

      <Hero />
      <TodoSection />
      <GoodThings />
      <Contact />
      <Footer />
    </main>
  )
}
