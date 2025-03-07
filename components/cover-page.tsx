"use client";

import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface CoverPageProps {
  onEnter: () => void;
  startAudio: () => void;
}

export default function CoverPage({ onEnter, startAudio }: CoverPageProps) {
  const { theme } = useTheme();

  const handleEnter = () => {
    startAudio();
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed inset-0 flex flex-col items-center justify-center z-40 cursor-pointer ${
        theme === "warm" ? "bg-[#f8f5f1]" : "bg-white"
      }`}
      onClick={handleEnter}
    >
      {/* El audio se mueve al componente padre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center px-4"
      >
        <h1
          className={`text-2xl md:text-4xl font-serif italic mb-12 ${
            theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
          }`}
        >
          Bienvenidos a nuestro viaje
        </h1>

        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <MousePointerClick
              className={`w-8 h-8 ${
                theme === "warm" ? "text-[#8a6d46]" : "text-wedding-turquoise"
              }`}
            />
          </motion.div>
          <p
            className={`text-sm md:text-base ${
              theme === "warm" ? "text-[#8a6d46]/80" : "text-wedding-navy/80"
            }`}
          >
            Haz clic y desliza para saber más
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
