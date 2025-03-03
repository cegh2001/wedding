"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/hero-section";
import PrepareSection from "@/components/prepare-section";
import PassportSection from "@/components/passport-section";
import LocationsSection from "@/components/locations-section";
import AttendanceSection from "@/components/attendance-section";
import ItinerarySection from "@/components/itinerary-section";
import GiftSection from "@/components/gift-section";
import CountdownSection from "@/components/countdown-section";
import PhotosSection from "@/components/photos-section";
import Navigation from "@/components/navigation";
import TravelElements from "@/components/travel-elements";
import CoverPage from "@/components/cover-page";
import Loading from "@/components/loading";
import FarewellSection from "@/components/farewell-section";
import ThemeToggle from "@/components/ThemeToggle";
import { useParams } from "next/navigation";
import { useGetWeddingServices } from "./services/weddingServices";

export default function Home() {
  const params = useParams(); // Obtiene los parámetros de la URL
  const { name } = params;
  const firstParam = name ? name[0] : ""; // Obtiene el primer parámetro de la URL
  const formattedName = firstParam.replace(/[_-]/g, " ");  
 

  const [isLoading, setIsLoading] = useState(true);
  const [showCover, setShowCover] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterSite = () => {
    setShowCover(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden transition-colors duration-300">
      <ThemeToggle />
      <AnimatePresence mode="wait">
        {showCover ? (
          <CoverPage key="cover" onEnter={handleEnterSite} />
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
              <HeroSection  invite={formattedName}/>
              <PrepareSection />
              <PassportSection />
              <LocationsSection />
              <AttendanceSection name={formattedName} url={firstParam}/>
              <ItinerarySection />
              <GiftSection />
              <CountdownSection />
              <PhotosSection />
              <FarewellSection invite={formattedName}/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
