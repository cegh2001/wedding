"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useAnimatedBackground } from "@/hooks/useParticleBackground";

interface Props {
  invite: string;
}

export default function PassportSection({ invite }: Props) {
  const sectionRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { theme } = useTheme();

  // Usar el hook de animación de fondo
  useAnimatedBackground(canvasRef, theme, { count: 70 });

  const primaryColor = theme === "warm" ? "#8a6d46" : "#1a3a5a";
  const secondaryColor = theme === "warm" ? "#d4a76a" : "#3d7ea6";
  const bgColor = theme === "warm" ? "#f8f5f1" : "#f0f4f8";

  function formatName(name: string): string {
    try {
      // Primero decodificar los caracteres codificados en URL
      const decodedName = decodeURIComponent(name);

      // Luego reemplazar los guiones por espacios
      const nameWithSpaces = decodedName.replace(/-/g, " ");

      const lower = nameWithSpaces.toLowerCase();
      const parts = lower.split(" ");
      return parts
        .map((word) => {
          // Capitalizar cada palabra que no sea 'de' o 'y' (preposiciones y conjunciones)
          if (word === "de" || word === "y") {
            return word;
          }
          // Capitalizar todas las demás palabras (nombres y apellidos)
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    } catch (e) {
      // Si hay un error en la decodificación, volver al método original
      console.error("Error decodificando nombre:", e);

      // Método original como respaldo
      const nameWithSpaces = name.replace(/-/g, " ");
      const lower = nameWithSpaces.toLowerCase();
      const parts = lower.split(" ");
      return parts
        .map((word) => {
          if (word === "de" || word === "y") {
            return word;
          }
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 transition-colors duration-300`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Fondo animado */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full mx-auto bg-slate-50 rounded-lg border border-slate-200 shadow-center overflow-hidden max-w-[460px] md:max-w-[500px] grid grid-rows-2"
      >
        {/* Sección superior con mapa mundial */}
        <div className="relative w-full overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/passport-HBiAvpRRaEtz1ieTwQ61f4tPCPHm4F.png"
              alt="Mapa Mundial con Detalles de Boda"
              fill
              className="object-contain shadow-b"
            />
            {/* Gradiente superpuesto para mejorar visibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="p-6 flex md:flex-row gap-4 shadow-t">
          {/* Lado izquierdo - Foto (más grande en móvil) */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-full overflow-hidden rounded">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20241124-WA0177%5B1%5D.jpg-yr7zEW5IOE9EuFSaEbtSghG9vTeu7w.jpeg"
                alt="Pareja"
                fill
                className="w-full h-full object-cover object-center"
              />
              {/* Sombra interna para efecto de foto */}
              <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]"></div>
            </div>
          </div>

          {/* Lado derecho - Contenido */}
          <div className="md:w-1/2 relative">
            <h2
              className="text-sm md:text-xl font-bold mb-2"
              style={{ color: primaryColor }}
            >
              PASAPORTE DE BODA
            </h2>

            <p className="text-xs md:text-sm" style={{ color: primaryColor }}>
              PASAPORTE PARA:
            </p>
            <p
              className="text-xs md:text-base font-semibold mb-3"
              style={{ color: secondaryColor }}
            >
              {formatName(invite)}
            </p>

            <p className="text-xs md:text-sm" style={{ color: primaryColor }}>
              A LA BODA DE:
            </p>
            <p
              className="text-xs md:text-base font-semibold mb-3"
              style={{ color: secondaryColor }}
            >
              María Gabriela & Jhon Alexander
            </p>

            <p className="text-xs md:text-sm" style={{ color: primaryColor }}>
              FECHA DE CEREMONIA:
            </p>
            <p
              className="text-xs md:text-base font-semibold mb-3"
              style={{ color: secondaryColor }}
            >
              24 de julio, 2025
            </p>

            <p className="text-xs md:text-sm" style={{ color: primaryColor }}>
              LUGAR DE CEREMONIA:
            </p>
            <p
              className="text-xs md:text-base font-semibold"
              style={{ color: secondaryColor }}
            >
              Restaurant
              <br />
              Galipán Grill
            </p>
          </div>
          {/* Sello */}
          <div className="absolute bottom-1.5 right-1.5">
            <div
              className="w-16 h-16 rounded-full border-2 flex items-center justify-center rotate-[-15deg] relative"
              style={{ borderColor: primaryColor }}
            >
              <div
                className="absolute inset-0 rounded-full border border-dashed border-opacity-50"
                style={{ borderColor: primaryColor }}
              ></div>
              <div className="text-center">
                <div
                  className="text-xs font-bold"
                  style={{ color: primaryColor }}
                >
                  2025
                </div>
                <div
                  className="text-lg font-bold"
                  style={{ color: primaryColor }}
                >
                  VE
                </div>
                <div className="text-[8px]" style={{ color: primaryColor }}>
                  VENEZUELA
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
