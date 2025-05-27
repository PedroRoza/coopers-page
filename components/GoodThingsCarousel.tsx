"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface CarouselItem {
  id: number
  image: string
  title: string
  description: string
  altText: string
}

export default function GoodThingsCarousel() {
  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      image: "/image1.png",
      title: "Productivity",
      description: "Organize your daily job enhance your life performance",
      altText: "Two men looking at a laptop",
    },
    {
      id: 2,
      image: "/image2.png",
      title: "Track Your Progress",
      description: "Mark one activity as done makes your brain understands the power of doing",
      altText: "Person working with art supplies",
    },
    {
      id: 3,
      image: "/image3.png",
      title: "Careful Planning",
      description: "Careful with misunderstanding the difference between a list of things and a list of desires",
      altText: "Hands working on a sewing machine",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isMdOrLarger, setIsMdOrLarger] = useState(false)

  // Detecta se a tela é md ou maior
  useEffect(() => {
    function handleResize() {
      setIsMdOrLarger(window.matchMedia("(min-width: 768px)").matches)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Função de navegação, garante índice correto e avança apenas 1
  const goToSlide = (index: number) => {
    setCurrentIndex((current) => {
      let newIndex = index
      if (newIndex < 0) newIndex = carouselItems.length - 1
      else if (newIndex >= carouselItems.length) newIndex = 0
      return newIndex
    })
  }

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) goToSlide(currentIndex + 1)
    else if (touchStart - touchEnd < -50) goToSlide(currentIndex - 1)
  }

  useEffect(() => {
    if (isMdOrLarger) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex + 1
        if (newIndex >= carouselItems.length) newIndex = 0
        return newIndex
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isMdOrLarger])

  return (
    <section className="w-full bg-white py-16">
      <div className="container relative">
        <div
          className="bg-green-500 h-3/4 w-10/12 absolute left-0"
          style={{ borderRadius: "0 15px 15px 0" }}
        ></div>
        <div className="p-6 md:p-10 rounded-md relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">good things</h2>
          {isMdOrLarger ? (
            <div className="flex justify-center gap-6">
              {carouselItems.map(({ id, image, title, description, altText }) => (
                <div key={id} className="bg-white rounded-lg shadow-lg max-w-sm flex-shrink-0">
                  <div className="relative h-64">
                    <Image src={image} alt={altText} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <button className="text-green-500 hover:text-green-700 focus:outline-none focus:underline">
                      read more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="relative overflow-hidden max-w-md mx-auto"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={carouselItems[currentIndex].image || "/placeholder.svg"}
                    alt={carouselItems[currentIndex].altText}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{carouselItems[currentIndex].title}</h3>
                  <p className="text-gray-600 mb-4">{carouselItems[currentIndex].description}</p>
                  <button className="text-green-500 hover:text-green-700 focus:outline-none focus:underline">
                    read more
                  </button>
                </div>
              </div>

              {/* Bullets */}
              <div className="flex justify-center mt-6 space-x-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white ${
                      index === currentIndex ? "bg-green-500" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === currentIndex ? "true" : "false"}
                  />
                ))}
              </div>

              {/* Botões Previous/Next corrigidos */}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() =>
                  setCurrentIndex((prev) => (prev - 1 < 0 ? carouselItems.length - 1 : prev - 1))
                }
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1 >= carouselItems.length ? 0 : prev + 1))
                }
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
