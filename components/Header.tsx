"use client"

import Image from "next/image"
import { useState } from "react"
import LoginDialog from "./LoginDialog"
import RegisterDialog from "./RegisterDialog"

export default function Header() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  return (
    <header className="w-full py-4 px-4 md:px-8 flex justify-between items-center z-10">
      {/* Div da logo - pl-20 apenas em md+ */}
      <div className="logo pl-0 md:pl-20">
        <Image 
          src="/logo.png" 
          alt="Coopers Logo" 
          width={150} 
          height={40} 
          className="h-auto"
        />
      </div>
      
      <button
        onClick={() => setShowLogin(true)}
        className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 w-[120px]"
        aria-label="Entrar"
      >
        entrar
      </button>

      {/* Dialogs */}
      {showLogin && (
        <LoginDialog
          onClose={() => setShowLogin(false)}
          onRegister={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
        />
      )}

      {showRegister && (
        <RegisterDialog
          onClose={() => setShowRegister(false)}
          onLogin={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
        />
      )}
    </header>
  )
}