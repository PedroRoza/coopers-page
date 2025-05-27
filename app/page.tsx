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

  if (hasUserData === null) return null; // ou um loader/spinner temporário

  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <Hero />
      <TodoTitle />
      <div>
        <div className="z-0 absolute left-0 w-32 flex items-start h-40">
          <img
            src="/lateral.png"
            alt="triangle design decorative"
            width={300}
            height={200}
            className="object-cover"
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
