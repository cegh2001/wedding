"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"

export default function PassportSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { theme } = useTheme()

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 transition-colors duration-300
                  ${theme === "warm" ? "bg-[#f8f5f0]" : "bg-white"}`}
    >
      <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
        <div className="absolute inset-0 w-[200%]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/38725a18-fb60-4b97-bfd7-72c257d5baa2-MbtlZunOBKD7CcdJCF2OCMveEkJkZf.png"
            alt="Background gradient"
            fill
            className="object-cover animate-slide"
          />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-sm md:max-w-lg w-full mx-auto bg-white rounded-lg shadow-2xl overflow-hidden"
        style={{
          backgroundImage:
            theme === "warm"
              ? "repeating-linear-gradient(45deg, #f8f5f0 0, #f8f5f0 10px, transparent 10px, transparent 20px)"
              : "repeating-linear-gradient(45deg, #E6F4F6 0, #E6F4F6 10px, transparent 10px, transparent 20px)",
        }}
      >
        {/* Header Image */}
        <div className="relative w-full h-36 md:h-48 overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20241124-WA0177%5B1%5D.jpg-yr7zEW5IOE9EuFSaEbtSghG9vTeu7w.jpeg"
            alt="Pareja en la montaña"
            fill
            className="object-cover"
          />
        </div>

        {/* Passport Content */}
        <div className={`p-4 md:p-8 border-t-2 ${theme === "warm" ? "border-[#8a6d46]/20" : "border-wedding-navy/20"}`}>
          <div className="text-center mb-6 md:mb-8">
            <h2
              className={`text-xl md:text-2xl font-serif tracking-wide mb-2 ${
                theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
              }`}
            >
              PASAPORTE A NUESTRA BODA
            </h2>
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4">
              <div
                className={`w-full h-full rounded-full border-2 flex items-center justify-center ${
                  theme === "warm" ? "border-[#8a6d46]" : "border-wedding-navy"
                }`}
              >
                <span
                  className={`font-serif text-base md:text-lg ${
                    theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                  }`}
                >
                  C&P
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:space-y-4 text-sm md:text-base">
            {[
              { label: "Fecha", value: "24 de Mayo, 2025" },
              { label: "Hora", value: "18:00 H" },
              { label: "Destino", value: "Barcelona" },
              { label: "Ceremonia", value: "Santa María Reina de Pedralbes" },
              { label: "Banquete", value: "Can Bonastre Wine Resort" },
            ].map((item, index) => (
              <div key={index} className="flex">
                <span className={`w-24 ${theme === "warm" ? "text-[#8a6d46]/60" : "text-wedding-navy/60"}`}>
                  {item.label}
                </span>
                <span className={theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 md:mt-8">
            <h3
              className={`text-xl md:text-2xl font-serif tracking-wide ${
                theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
              }`}
            >
              MARÍA & JUAN
            </h3>
          </div>

          {/* Decorative Stamp */}
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-16 h-16 md:w-20 md:h-20 opacity-30">
            <div
              className={`w-full h-full rounded-full border-2 flex items-center justify-center rotate-[-15deg] ${
                theme === "warm" ? "border-[#8a6d46]" : "border-wedding-navy"
              }`}
            >
              <span
                className={`font-serif text-xs md:text-sm ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}
              >
                VISA
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

