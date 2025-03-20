"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";

// Referencia global para cachear los datos de animación entre cambios de tema
let cachedAnimationData: any = null;

// Importación dinámica de Lottie para evitar errores de SSR
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="w-full h-full max-w-4xl" />,
});

interface LottieAnimationProps {
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ className }) => {
  const [animationData, setAnimationData] = useState<any>(cachedAnimationData);
  
  // Definir correctamente la referencia para Lottie
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  
  // Cargar los datos de animación solo una vez y cachearlos
  useEffect(() => {
    if (!cachedAnimationData) {
      import("@/public/Animation - 1742479606579.json")
        .then((data) => {
          cachedAnimationData = data.default;
          setAnimationData(data.default);
        })
        .catch((err) => console.error("Error al cargar la animación Lottie:", err));
    }
  }, []);

  if (!animationData) {
    return <div className={className || "w-full h-full max-w-4xl"} />;
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={true}
      autoplay={true}
      className={className || "w-full md:h-full max-w-4xl"}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice'
      }}
    />
  );
};

// Memorizar el componente para evitar re-renderizados innecesarios
export default React.memo(LottieAnimation);