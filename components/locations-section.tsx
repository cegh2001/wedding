"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Church, Home } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export default function LocationsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [activeLocation, setActiveLocation] = useState<"escala" | "destino">("escala")
  const { theme } = useTheme()

  const locations = {
    escala: {
      icon: <Church className="w-12 h-12" />,
      name: "Centro Médico de Ccs, San Bernandino y Parada en Galipan, Macuto",
      address: ["San Bernandino,", "1011 Caracas, Distrito Capital"],
      mapsUrl:
        "https://www.bing.com/maps?&cp=10.528815~-66.893418&lvl=14.22&pi=0&tstt0=De%20Centro%20M%C3%A9dico%20de%20Caracas%20a%20Carretera%20Galip%C3%A1n%20-%20Macuto%2C%20Macuto%2C%20Estado%20Vargas&tsts0=%2526ty%253D0%2526rtp%253Dpos.10.512032_-66.896912_Av.%252520Eraso%25252C%252520Plaza%252520El%252520Estanque%25252C%252520Urb.%252520San%252520Bernardino%25252C%252520Caracas%2525201011_Centro%252520M%2525C3%2525A9dico%252520de%252520Caracas__e_~pos.10.548588_-66.89029_Carretera%252520Galip%2525C3%2525A1n%252520-%252520Macuto%25252C%252520Macuto%25252C%252520Estado%252520Vargas_Carretera%252520Galip%2525C3%2525A1n%252520-%252520Macuto%25252C%252520Macuto%25252C%252520Estado%252520Vargas__e_%2526mode%253Dm%2526sri%253D0%2526u%253D1&ftst=0&ftics=False&v=2&sV=2&form=S00027",
    },
    destino: {
      icon: <Home className="w-12 h-12" />,
      name: "Restaurante Galipán Grill",
      address: ["San Antonio de Galipán,", "1164 Macuto, La Guaira"],
      mapsUrl: "https://maps.app.goo.gl/yzTSFVa9uGjtW8sBA",
    },
  };

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 transition-colors duration-300
                  ${theme === "warm" ? "bg-[#f8f5f1]" : "bg-[#f0f4f8]"}`}
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

      <div className="max-w-2xl mx-auto w-full relative z-10">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveLocation("escala")}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeLocation === "escala"
                ? theme === "warm"
                  ? "bg-[#8a6d46] text-white"
                  : "bg-wedding-navy text-white"
                : theme === "warm"
                  ? "bg-white/50 text-[#8a6d46] hover:bg-white/80"
                  : "bg-wedding-skyblue/50 text-wedding-navy hover:bg-wedding-skyblue/80"
            }`}
          >
            Escala
          </button>
          <button
            onClick={() => setActiveLocation("destino")}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeLocation === "destino"
                ? theme === "warm"
                  ? "bg-[#8a6d46] text-white"
                  : "bg-wedding-navy text-white"
                : theme === "warm"
                  ? "bg-white/50 text-[#8a6d46] hover:bg-white/80"
                  : "bg-wedding-skyblue/50 text-wedding-navy hover:bg-wedding-skyblue/80"
            }`}
          >
            Destino
          </button>
        </div>

        <motion.div
          key={activeLocation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div
              className={`w-20 h-20 flex items-center justify-center ${
                theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
              }`}
            >
              {locations[activeLocation].icon}
            </div>
          </div>

          <h3
            className={`text-2xl md:text-3xl font-serif mb-4 ${
              theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
            }`}
          >
            {locations[activeLocation].name}
          </h3>

          {locations[activeLocation].address.map((line, index) => (
            <p key={index} className={`mb-1 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-turquoise"}`}>
              {line}
            </p>
          ))}

          <div className="mt-6">
            <a
              href={locations[activeLocation].mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block px-6 py-2 rounded-full transition-colors ${
                theme === "warm"
                  ? "bg-[#8a6d46] text-white hover:bg-[#8a6d46]/90"
                  : "bg-wedding-navy text-white hover:bg-wedding-navy/90"
              }`}
            >
              Ver en Google Maps
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

