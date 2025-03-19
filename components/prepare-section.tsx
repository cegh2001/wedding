"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"

export default function PrepareSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  // Definir las fotos con posiciones personalizadas
  const photos = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0005.jpg-MZQXpaU47rFmL5kdCxcrO3rAHkQj8y.jpeg",
      position: "center",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0002.jpg-NFp6V35Z4lYAfHMEWQ89mI4kcEDBsh.jpeg",
      position: "center", // Cambiar
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0007.jpg-vBdWb0SsJLy172I2Cs4tDQSEYAncyT.jpeg",
      position: "center",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0006.jpg-PV1Z2oujcseReINuANKy5CcznCa5dl.jpeg",
      position: "center 30%",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0009.jpg-urXsGCLvpSlfgRCVMnuG5XCzjFIVBM.jpeg",
      position: "center 40%", // Cambiar
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0001.jpg-hcgmTJo7K14p0otEFpOnY0j8Xdwox3.jpeg",
      position: "center 35%",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0003.jpg-YQR7ibaqAqyBy5l6v5AxWkIaJRKREz.jpeg",
      position: "center 45%",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0004.jpg-l3SuDsaWx8XTeqPxo1gw9iRIKxRQON.jpeg",
      position: "center 30%",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250319-WA0008.jpg-0Yk5b3auETNTf7dX6FDxWFc4DXq9Za.jpeg",
      position: "center",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhotoIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }, 3000) // Cambiar foto cada 3 segundos

    return () => clearInterval(interval)
  }, [photos.length])

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8"
    >
      {/* Overlay semitransparente para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Collage de fotos */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="grid grid-cols-3 h-full gap-2 p-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative w-full h-full rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{
                opacity: activePhotoIndex === index ? 0.9 : 0.5,
                scale: activePhotoIndex === index ? 1.05 : 1,
              }}
              transition={{ duration: 1.5 }}
            >
              <div
                className={`absolute inset-0 ${
                  [1, 4].includes(index)
                    ? "md:bg-cover bg-[length:200px_289px]"
                    : "bg-cover"
                }`}
                style={{
                  backgroundImage: `url(${photo.url})`,
                  backgroundPosition: photo.position,
                  backgroundRepeat: "no-repeat",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contenido de texto */}
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-6xl font-serif italic mb-2 md:mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Después de
          </h2>
          <p className="text-4xl md:text-7xl font-serif italic mb-2 md:mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            9 años juntos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 md:mb-12"
        >
          <p
            className="text-xl md:text-3xl italic text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{ transform: "rotate(-2deg)" }}
          >
            comenzaremos un nuevo viaje
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 md:mt-16"
        >
          <p className="text-2xl md:text-4xl font-serif italic leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            ¡Prepara tus maletas
            <br />y acompáñanos!
          </p>
        </motion.div>
      </div>
    </section>
  );
}