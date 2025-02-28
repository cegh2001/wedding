"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"

export default function CoupleSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full snap-start flex flex-col items-center justify-center relative bg-[#f8f5f0] px-4 md:px-8 py-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-[#2c3e50] mb-4">Nuestra Historia</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-12 bg-[#2c3e50]/30"></div>
            <div className="w-6 h-6 rounded-full border border-[#2c3e50]/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#2c3e50]/60"></div>
            </div>
            <div className="h-[1px] w-12 bg-[#2c3e50]/30"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <div className="absolute -top-4 -right-4 w-24 h-24 rotate-12">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Passport stamp"
                  width={100}
                  height={100}
                  className="opacity-30"
                />
              </div>
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Bride"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-2xl font-serif text-[#2c3e50] mb-2">María González</h3>
            <div className="flex items-center text-[#2c3e50]/70 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Madrid, España</span>
            </div>
            <p className="text-center text-[#2c3e50]/80">
              Amante de los viajes, fotógrafa aficionada y soñadora empedernida. Siempre con una maleta lista para la
              próxima aventura.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <div className="absolute -top-4 -left-4 w-24 h-24 -rotate-12">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Passport stamp"
                  width={100}
                  height={100}
                  className="opacity-30"
                />
              </div>
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Groom"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-2xl font-serif text-[#2c3e50] mb-2">Juan Rodríguez</h3>
            <div className="flex items-center text-[#2c3e50]/70 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Barcelona, España</span>
            </div>
            <p className="text-center text-[#2c3e50]/80">
              Aventurero, amante de la naturaleza y coleccionista de momentos. Siempre buscando nuevos horizontes que
              explorar.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-[#2c3e50]/80 max-w-2xl mx-auto">
            Nos conocimos en un viaje a Tailandia hace 5 años. Desde entonces, hemos recorrido juntos más de 20 países y
            ahora estamos listos para comenzar la aventura más importante de nuestras vidas.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

