import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Copy, Check, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import DecorativeElement from "./decorative-element";
import { useTheme } from "@/contexts/ThemeContext";
import { useAnimatedBackground } from "@/hooks/useParticleBackground";

export default function GiftSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  // Datos bancarios
  const bankData = {
    banco: "Mercantil, C.A, Banco Universal",
    rif: "J-00002961-0",
    nombre: "Jhon Veliz",
    tipoCuenta: "Cuenta de Ahorro",
    numeroCuenta: "01050662010662116836",
    cedula: "V-24.459.025"
  };

  // Memoizar la configuración para evitar crear un nuevo objeto en cada renderización
  const particleConfig = useMemo(() => ({ count: 70 }), []);

  // Usar el hook de animación de fondo con configuración memoizada
  useAnimatedBackground(canvasRef, theme, particleConfig);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bankData.numeroCuenta);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300
                  ${theme === "warm" ? "bg-[#f8f5f1]" : "bg-[#f0f4f8]"}`}
    >
      {/* Fondo animado */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <DecorativeElement type="compass" position="top-8 right-8" delay={0.5} />
      <DecorativeElement type="heart" position="bottom-8 left-8" delay={0.7} />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                theme === "warm" ? "bg-[#8a6d46]/10" : "bg-wedding-skyblue/30"
              }`}
            >
              <Gift
                className={`w-10 h-10 ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              />
            </div>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-serif mb-6 ${
              theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
            }`}
          >
            Regalo
          </h2>

          <p
            className={`text-xl mb-6 ${
              theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
            }`}
          >
            Lo más importante es vuestra presencia, pero si deseáis hacernos un
            regalo, aquí dejamos nuestros datos bancarios
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-6 mb-8"
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-y-4 p-6 border rounded-lg ${
              theme === "warm"
                ? "bg-white/50 backdrop-blur-sm border-[#8a6d46]/30"
                : "bg-wedding-skyblue/30 border-wedding-navy/30"
            }`}
          >
            <div>
              <p
                className={`text-sm uppercase font-medium mb-1 opacity-70 ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                Banco
              </p>
              <p
                className={`font-medium ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                {bankData.banco}
              </p>
              <p
                className={`text-sm ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                RIF: {bankData.rif}
              </p>
            </div>

            <div className ="text-end">
              <p
                className={`text-sm uppercase font-medium mb-1 opacity-70 ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                Beneficiario
              </p>
              <p
                className={`font-medium ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                {bankData.nombre}
              </p>
              <p
                className={`text-sm ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                C.I.: {bankData.cedula}
              </p>
            </div>

            <div>
              <p
                className={`text-sm uppercase font-medium mb-1 opacity-70 ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                Tipo de cuenta
              </p>
              <p
                className={`font-medium ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                {bankData.tipoCuenta}
              </p>
            </div>

            <div className ="text-end">
              <p
                className={`text-sm uppercase font-medium mb-1 opacity-70 ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                Número de cuenta
              </p>
              <p
                className={`font-medium ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                {bankData.numeroCuenta}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            onClick={copyToClipboard}
            type="button"
            variant="outline"
            className={`${
              theme === "warm"
                ? "border-[#8a6d46]/50 text-[#8a6d46] hover:bg-[#8a6d46]/10 hover:text-[#8a6d46]"
                : "border-wedding-navy/50 text-wedding-navy hover:bg-wedding-skyblue/30 hover:text-wedding-navy"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Datos copiados
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar datos
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}