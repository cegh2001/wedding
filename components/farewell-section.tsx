"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Heart, Slash } from "lucide-react"
import Footer from "./footer"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"

interface Props {
  invite: string
}

export default function FarewellSection({invite}: Props) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { theme } = useTheme();

  // Función para decodificar acentos en el nombre
  function decodeInviteName(name: string): string {
    try {
      // Decodificar caracteres URL-encoded (como %C3%A1 → á)
      return decodeURIComponent(name);
    } catch (e) {
      console.error("Error decodificando nombre:", e);
      return name; // Devolver el nombre original si hay error
    }
  }

  // Colores prohibidos con sus nombres
  const prohibidosColores = [
    { color: "#7b1fa2", nombre: "Morado" }, // morado fuerte
    { color: "#556B2F", nombre: "Aceituna" }, // aceituna
    { color: "#8B0000", nombre: "Vinotinto" }, // vinotinto
  ];

  // Colores recomendados (pasteles)
  const recomendadosColores = [
    { color: "#F8BBD0", nombre: "Rosa" },
    { color: "#B2EBF2", nombre: "Celeste" },
    { color: "#DCEDC8", nombre: "Verde" },
    { color: "#FFF9C4", nombre: "Amarillo" },
    { color: "#E1BEE7", nombre: "Lavanda" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300
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
          <div className="text-center">
            {/* Passport-like header */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <div
                  className={`h-[1px] flex-1 ${
                    theme === "warm" ? "bg-[#8a6d46]/30" : "bg-wedding-navy/30"
                  }`}
                ></div>
                <h2
                  className={`text-4xl md:text-5xl font-serif capitalize ${
                    theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                  }`}
                >
                  {decodeInviteName(invite)}
                </h2>
                <div
                  className={`h-[1px] flex-1 ${
                    theme === "warm" ? "bg-[#8a6d46]/30" : "bg-wedding-navy/30"
                  }`}
                ></div>
              </div>

              <div
                className={`flex justify-center gap-2 md:gap-8 ${
                  theme === "warm"
                    ? "text-[#8a6d46]/70"
                    : "text-wedding-navy/70"
                } text-[10px] md:text-sm`}
              >
                <span>TYPE: BODA</span>
                <span>CODE: GALIPÁN</span>
                <span>PASSPORT Nº 15062025</span>
              </div>
            </div>

            {/* Main content */}
            <div className="space-y-6">
              {/* Sección de Código de Vestimenta */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                }
                transition={{ duration: 0.8, delay: 0.7 }}
                className={`mx-auto max-w-lg rounded-lg mt-6 p-5 border ${
                  theme === "warm"
                    ? "border-[#8a6d46]/30"
                    : "border-wedding-navy/30"
                }`}
              >
                <div className="text-center mb-4">
                  <h3
                    className={`font-serif text-xl ${
                      theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                    }`}
                  >
                    DRESS CODE
                  </h3>
                  <div
                    className={`h-[1px] w-16 mx-auto mt-1 ${
                      theme === "warm"
                        ? "bg-[#8a6d46]/50"
                        : "bg-wedding-navy/50"
                    }`}
                  ></div>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Colores a evitar */}
                  <div>
                    <p
                      className={`text-sm mb-2 ${
                        theme === "warm"
                          ? "text-[#8a6d46]/90"
                          : "text-wedding-navy/90"
                      }`}
                    >
                      Por favor, evitar estos colores:
                    </p>
                    <div className="flex justify-center gap-4">
                      {prohibidosColores.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="relative">
                            <div
                              className="w-8 h-8 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Slash className="w-10 h-10 text-white stroke-[3] drop-shadow-md" />
                            </div>
                          </div>
                          <span
                            className={`text-xs mt-1 ${
                              theme === "warm"
                                ? "text-[#8a6d46]/80"
                                : "text-wedding-navy/80"
                            }`}
                          >
                            {item.nombre}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Colores recomendados */}
                  <div>
                    <p
                      className={`text-sm mb-2 ${
                        theme === "warm"
                          ? "text-[#8a6d46]/90"
                          : "text-wedding-navy/90"
                      }`}
                    >
                      Recomendamos colores pasteles como:
                    </p>
                    <div className="flex justify-center gap-3">
                      {recomendadosColores.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="w-6 h-6 rounded-full border border-gray-200"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span
                            className={`text-[10px] mt-1 ${
                              theme === "warm"
                                ? "text-[#8a6d46]/80"
                                : "text-wedding-navy/80"
                            }`}
                          >
                            {item.nombre}
                          </span>
                        </div>
                      ))}
                    </div>
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
      <Footer />
    </section>
  );
}

