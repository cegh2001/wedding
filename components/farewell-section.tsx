"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Compass, LuggageIcon as Suitcase, Heart, Slash } from "lucide-react"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"

interface Props {
  invite: string
}

export default function FarewellSection({invite}: Props) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { theme } = useTheme()

  // Colores prohibidos con sus nombres
  const prohibidosColores = [
    { color: "#7b1fa2", nombre: "Morado" },  // morado fuerte
    { color: "#556B2F", nombre: "Aceituna" }, // aceituna
    { color: "#8B0000", nombre: "Vinotinto" }, // vinotinto
  ]

  // Colores recomendados (pasteles)
  const recomendadosColores = [
    { color: "#F8BBD0", nombre: "Rosa" },
    { color: "#B2EBF2", nombre: "Celeste" },
    { color: "#DCEDC8", nombre: "Verde" },
    { color: "#FFF9C4", nombre: "Amarillo" },
    { color: "#E1BEE7", nombre: "Lavanda" },
  ]

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300
                  ${theme === "warm" ? "bg-[#f8f5f1]" : "bg-white"}`}
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

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className={`bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 md:p-12 ${
            theme === "warm"
              ? "border border-[#8a6d46]/20"
              : "border border-wedding-navy/20"
          }`}
        >
          <div className="text-center space-y-8">
            {/* Passport-like header */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <div
                  className={`h-[1px] flex-1 ${
                    theme === "warm" ? "bg-[#8a6d46]/30" : "bg-wedding-navy/30"
                  }`}
                ></div>
                <h2
                  className={`text-4xl md:text-5xl font-serif ${
                    theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                  }`}
                >
                  {invite}
                </h2>
                <div
                  className={`h-[1px] flex-1 ${
                    theme === "warm" ? "bg-[#8a6d46]/30" : "bg-wedding-navy/30"
                  }`}
                ></div>
              </div>

              <div
                className={`flex justify-center gap-8 ${
                  theme === "warm"
                    ? "text-[#8a6d46]/70"
                    : "text-wedding-navy/70"
                } text-sm`}
              >
                <span>TYPE: BODA</span>
                <span>CODE: BARCELONA</span>
                <span>PASSPORT Nº 15062025</span>
              </div>
            </div>

            {/* Main content */}
            <div className="space-y-6">
              {/* Sección de Código de Vestimenta */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-center"
              >
                <div className="w-24 h-24 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Suitcase
                      className={`w-12 h-12 ${
                        theme === "warm"
                          ? "text-[#8a6d46]"
                          : "text-wedding-navy"
                      }`}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                    <Compass
                      className={`w-24 h-24 ${
                        theme === "warm"
                          ? "text-[#8a6d46]/20"
                          : "text-wedding-navy/20"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Nuevo mensaje emotivo */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`text-base md:text-lg font-serif italic mx-auto max-w-2xl ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                Hay momentos en la vida que son muy especiales por sí solos,
                <br />
                pero al compartirlos con personas tan especiales como tú,
                <br />
                se convierte en momentos imposible de olvidar
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex items-center justify-center gap-2"
              >
                <Heart
                  className={`w-5 h-5 ${
                    theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                  }`}
                />
                <p
                  className={`text-2xl md:text-3xl font-serif ${
                    theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                  }`}
                >
                  ¡Te esperamos en nuestra boda!
                </p>
                <Heart
                  className={`w-5 h-5 ${
                    theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                  }`}
                />
              </motion.div>
            </div>

            {/* Decorative footer */}
            <div className="pt-4">
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <div
                    className={`h-[1px] w-full ${
                      theme === "warm"
                        ? "bg-[#8a6d46]/30"
                        : "bg-wedding-navy/30"
                    }`}
                  ></div>
                  <div
                    className={`h-[1px] w-full ${
                      theme === "warm"
                        ? "bg-[#8a6d46]/30"
                        : "bg-wedding-navy/30"
                    } mt-1`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

