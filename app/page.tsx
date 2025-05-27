"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TodoSection from "@/components/TodoSection";
import TodoTitle from "@/components/TodoTitle";
import GoodThingsCarousel from "@/components/GoodThingsCarousel";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [hasUserData, setHasUserData] = useState<boolean | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setHasUserData(!!userData);
  }, []);

  if (hasUserData === null) return null;

  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <div className="absolute inset-y-0 right-0 top-0 z-10 w-2/5 h-screen hidden sm:block ">
        <img
          src="/BG.webp"
          alt="Fundo decorativo"
          className="w-full h-full object-cover"
        />
        <img
          src="/foto.webp"
          alt="Decoração lateral"
          className="w-full h-1/2 object-contain absolute top-1/4"
        />
      </div>
      <div className="absolute inset-y-0 right-0 top-1/2 z-10 w-3/4 block sm:hidden ">
        <img
          src="/BG.webp"
          alt="Fundo decorativo"
          className="w-full h-full object-cover"
        />
        <img
          src="/foto.webp"
          alt="Decoração lateral"
          className="w-full h-3/4 object-contain absolute top-10"
        />
      </div>

      <Header />
      <Hero />
      <TodoTitle />
      <div className="relative">
        <div className="absolute left-0 top-60 w-60 h-60 z-[-1]">
          <img
            src="/lateral.webp"
            alt="triangle design decorative"
            className="w-full h-full object-cover"
          />
        </div>
        {hasUserData === true && <TodoSection />}
      </div>
      <GoodThingsCarousel />
      <ContactForm />
      <Footer />
    </main>
  );
}
