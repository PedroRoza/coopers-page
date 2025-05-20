"use client"

import { useState, useRef, useEffect } from "react"

export default function GoodThings() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const posts = [
    {
      id: 1,
      title: "Organize your daily job enhance your life performance",
      category: "Productivity",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image1-vHZKqWBX6s4aPSlbqAQJjKMiYfJLoO.png",
    },
    {
      id: 2,
      title: "Mark one activity as done makes your brain understands the power of doing",
      category: "Productivity",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image2-Hq8W2GIHdEtrCTHysmcAtRidKSGo6b.png",
    },
    {
      id: 3,
      title: "Careful with misunderstanding the difference between a list of things and a list of desires",
      category: "Productivity",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image3-jQUGcuq5Wm3VVekR22b1fYNXfveIpT.png",
    },
  ]

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition = currentSlide * carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }, [currentSlide])

  // Detectar swipe em dispositivos móveis
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let startX: number
    let endX: number

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX

      const diff = startX - endX

      if (diff > 50) {
        // Swipe para a esquerda
        setCurrentSlide((prev) => Math.min(prev + 1, posts.length - 1))
      } else if (diff < -50) {
        // Swipe para a direita
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
      }
    }

    carousel.addEventListener("touchstart", handleTouchStart)
    carousel.addEventListener("touchend", handleTouchEnd)

    return () => {
      carousel.removeEventListener("touchstart", handleTouchStart)
      carousel.removeEventListener("touchend", handleTouchEnd)
    }
  }, [posts.length])

  return (
    <section className="relative bg-primary py-12 md:py-16">
      <div className="container-custom">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-8">good things</h2>

        <div className="relative overflow-hidden">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            ref={carouselRef}
            aria-live="polite"
          >
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4 snap-start"
                aria-hidden={currentSlide !== index}
              >
                <div className="bg-white rounded-lg overflow-hidden h-full">
                  <div className="h-48 overflow-hidden">
                    <img src={post.image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-gray-500 block mb-2">{post.category}</span>
                    <h3 className="text-lg font-semibold mb-4 line-clamp-2">{post.title}</h3>
                    <a href="#" className="text-primary font-semibold text-sm">
                      read more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            {posts.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para o slide ${index + 1}`}
                aria-current={currentSlide === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
