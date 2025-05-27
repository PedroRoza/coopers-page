"use client"

import { useEffect, useState } from "react"

export default function TodoSection() {
  const [hasUserData, setHasUserData] = useState<boolean | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    setHasUserData(!!userData)
  }, [])

  return (
    <section id="todo-list" className="w-full bg-black text-white py-16 relative -z-10" style={{
      clipPath: 'polygon(0 15%, 100% 0%, 100% 85%, 0% 100%)'
    }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">To-do list</h2>
        
        {hasUserData === false && (
          <p className="text-center text-lg text-red-400 mb-4">
            Please log in to manage your to-do list.
          </p>
        )}

        <p className="text-center text-lg text-gray-300">
          Drag and drop to set your main priorities, check
        </p>
        <p className="text-center text-lg text-gray-300">
          when done and create what's new.
        </p>
      </div>
    </section>
  )
}
