"use client"

import { useRef } from "react"  // Ya no necesitamos useEffect
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Camera } from "lucide-react"
import DecorativeElement from "./decorative-element"
import { useTheme } from "@/contexts/ThemeContext"
// Importar el nuevo hook
import { useAnimatedBackground } from "@/hooks/useParticleBackground"

export default function PhotosSection() {
  const sectionRef = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { theme } = useTheme()
  
  // Usar el hook de animación de fondo
  useAnimatedBackground(canvasRef, theme, { count: 70 });

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300
                  ${theme === "warm" ? "bg-[#f8f5f1]" : "bg-white"}`}
    >
      {/* Fondo animado */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <DecorativeElement type="compass" position="top-8 left-8" delay={0.5} />
      <DecorativeElement type="heart" position="bottom-8 right-8" delay={0.7} />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl md:text-5xl font-serif mb-6 ${
              theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
            }`}
          >
            Fotos
          </h2>

          <div className="flex justify-center mb-8">
            <div className={`w-32 h-[2px] ${theme === "warm" ? "bg-[#8a6d46]/30" : "bg-wedding-turquoise/30"}`}></div>
          </div>

          <p className={`text-xl mb-2 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
            El día de la boda toma muchas fotos
          </p>
          <p className={`text-xl mb-2 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
            y déjanos un bonito
          </p>
          <p className={`text-xl mb-2 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
            y divertido recuerdo
          </p>
          <p className={`text-xl mb-2 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
            haciendo clic en el icono
          </p>
          <p className={`text-xl mb-6 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
            de la cámara de fotos
          </p>

          <div className="flex justify-center mb-4">
            <div className={`w-32 h-[2px] ${theme === "warm" ? "bg-[#8a6d46]/30" : "bg-wedding-turquoise/30"}`}></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform hover:scale-105 focus:scale-105"
          >
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center ${
                theme === "warm"
                  ? "bg-white/50 backdrop-blur-sm border border-[#8a6d46]/30"
                  : "bg-wedding-skyblue/50 border border-wedding-navy/30"
              }`}
            >
              <Camera className={`w-12 h-12 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`} />
            </div>
            <p className={`text-center mt-2 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}> (clic)</p>
          </a>
        </motion.div>
      </div>
    </section>
  )
}