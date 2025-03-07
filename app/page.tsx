"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HeroSection from "@/components/hero-section"
import PrepareSection from "@/components/prepare-section"
import PassportSection from "@/components/passport-section"
import LocationsSection from "@/components/locations-section"
import AttendanceSection from "@/components/attendance-section"
import ItinerarySection from "@/components/itinerary-section"
import GiftSection from "@/components/gift-section"
import CountdownSection from "@/components/countdown-section"
import PhotosSection from "@/components/photos-section"
import Navigation from "@/components/navigation"
import TravelElements from "@/components/travel-elements"
import CoverPage from "@/components/cover-page"
import Loading from "@/components/loading"
import FarewellSection from "@/components/farewell-section"
import ThemeToggle from "@/components/ThemeToggle"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showCover, setShowCover] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Función para iniciar la reproducción de audio
  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5 // Ajusta el volumen si es necesario
      audioRef.current.play().catch(error => {
        console.error("Error al reproducir audio:", error)
      })
    }
  }

  // Precarga el audio cuando se monta el componente
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
    }
  }, [])

  const handleEnterSite = () => {
    setShowCover(false)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden transition-colors duration-300">
      {/* Elemento de audio que permanecerá montado durante toda la navegación */}
      <audio ref={audioRef} src="/Multiverso.mp3" preload="auto" loop />
      
      <ThemeToggle />
      <AnimatePresence mode="wait">
        {showCover ? (
          <CoverPage key="cover" onEnter={handleEnterSite} startAudio={startAudio} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <TravelElements />
            <Navigation />
            <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
              <HeroSection />
              <PrepareSection />
              <PassportSection />
              <LocationsSection />
              <AttendanceSection />
              <ItinerarySection />
              <GiftSection />
              <CountdownSection />
              <PhotosSection />
              <FarewellSection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}