import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative w-full bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Organize
            <span className="block text-green-500">your daily jobs</span>
          </h1>
          <p className="text-lg mb-6">The only way to get things done</p>
          <Link
            href="#todo-list"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Go to To-do list"
          >
            Go to To-do list
          </Link>
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0 relative">
          <div className="absolute top-0 right-0 w-full h-full bg-green-500 transform -rotate-6 z-0"></div>
          <div className="relative z-10">
            <Image
              src="/foto.png"
              alt="Modern apartment interior"
              width={500}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 mb-12">
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
          className="animate-bounce"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    </section>
  )
}
