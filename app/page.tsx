import Header from "@/components/Header"
import Hero from "@/components/Hero"
import TodoSection from "@/components/TodoSection"
import GoodThingsCarousel from "@/components/GoodThingsCarousel"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <TodoSection />
      <GoodThingsCarousel />
      <ContactForm />
      <Footer />
    </main>
  )
}
