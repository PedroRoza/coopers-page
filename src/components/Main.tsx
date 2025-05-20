"use client"


export default function Hero() {
  const user = true

  const scrollToTodoList = () => {
    const todoSection = document.getElementById("todo-section")
    if (todoSection) {
      todoSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative pb-16 pt-4 md:pt-8 md:pb-24 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              Organize
              <span className="block text-primary">your daily jobs</span>
            </h1>
            <p className="text-lg mb-8">The only way to get things done</p>
            <button
              onClick={scrollToTodoList}
              className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              aria-label="Ir para a lista de tarefas"
            >
              Go to To-do list
            </button>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative">
              {/* Elemento decorativo verde */}
              <div className="absolute -top-8 -right-8 -bottom-8 -left-8 bg-primary -z-10 transform rotate-6"></div>

              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto-Nmn1Y5vLSYMznR8UA4ff8vzIdAxAdD.png"
                alt=""
                className="w-full h-auto relative z-10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <button onClick={scrollToTodoList} aria-label="Rolar para baixo" className="animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}
