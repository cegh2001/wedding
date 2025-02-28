"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, Clock, MapPin, Plane } from "lucide-react"

export default function EventDetails() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full snap-start flex flex-col items-center justify-center relative bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Detalles del Evento</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-12 bg-white/50"></div>
            <div className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/80"></div>
            </div>
            <div className="h-[1px] w-12 bg-white/50"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-serif text-white text-center mb-2">Fecha</h3>
            <p className="text-center text-white/90">15 de Junio, 2025</p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-center text-white/80 text-sm">
                Contamos los días para compartir este momento especial con vosotros
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-serif text-white text-center mb-2">Horario</h3>
            <p className="text-center text-white/90">Ceremonia: 17:00h</p>
            <p className="text-center text-white/90">Cóctel: 18:30h</p>
            <p className="text-center text-white/90">Cena: 20:00h</p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-center text-white/80 text-sm">
                La celebración continuará hasta altas horas de la madrugada
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-serif text-white text-center mb-2">Ubicación</h3>
            <p className="text-center text-white/90">Finca El Mirador</p>
            <p className="text-center text-white/90">Carretera de la Sierra, km 15</p>
            <p className="text-center text-white/90">Granada, España</p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-center text-white/80 text-sm">
                <a href="#" className="underline">
                  Ver en el mapa
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-white" />
              <span className="text-white">Código de vestimenta: Elegante</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

