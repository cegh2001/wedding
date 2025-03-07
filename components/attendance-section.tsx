"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DecorativeElement from "./decorative-element";
import {
  useGetWeddingServices,
  usePostWeddingService,
} from "@/app/[...name]/services/weddingServices";
import { StandarAttend } from "@/app/[...name]/views/StandarAttend";
import { YesAttend } from "@/app/[...name]/views/YesAttend";
import { NoAttend } from "@/app/[...name]/views/NoAttend";

interface Props {
  url: string;
  name: string;
}

export interface BodyPostWedding {
  url: string;
  name: string;
  attend: boolean;
}

// Esquema de validación para el formulario
const schema = yup.object().shape({
  attendance: yup.string().required("Debes seleccionar una opción"),
});

// Definir un tema de ejemplo. Puedes obtenerlo desde props o contexto.
const theme = "warm";

export default function AttendanceSection({ name, url }: Props) {
  const { findByUrl, mutate } = useGetWeddingServices({ name });
  const wedding = findByUrl(url);
  const attend = wedding ? wedding.attend : null;
  const sectionRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const {
    postWedding,
    isLoading: isLoadingPost,
    setIsLoadingPost,
  } = usePostWeddingService();

  // Estado para controlar la apertura del Dialog
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Selecciona la vista actual según la asistencia registrada
  const ViewAttend =
    attend === null ? (
      <StandarAttend reset={reset} setOpen={setOpen} />
    ) : attend ? (
      <YesAttend reset={reset} setOpen={setOpen} />
    ) : (
      <NoAttend reset={reset} setOpen={setOpen} />
    );

  // Función de envío del formulario
  const onSubmit = async ({ attendance }: any) => {
    setIsLoadingPost(true);
    const body: BodyPostWedding = {
      url,
      name,
      attend: attendance === "yes",
    };
    postWedding(body).then(() => {
      setOpen(false);
      setIsLoadingPost(false);
      mutate();
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300 ${
        theme === "warm" ? "bg-[#f8f5f0]" : "bg-white"
      }`}
    >
      {/* Fondo animado */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <DecorativeElement type="heart" position="top-8 left-8" delay={0.5} />
      <DecorativeElement
        type="compass"
        position="bottom-8 right-8"
        delay={0.7}
      />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl md:text-5xl font-serif mb-6 ${
              theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
            }`}
          >
            Confirma tu Asistencia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-md mx-auto ${
            theme === "warm"
              ? "border border-[#8a6d46]/20"
              : "border border-wedding-navy/20"
          }`}
        >
          {ViewAttend}
        </motion.div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`bg-white border-2 max-w-md ${
            theme === "warm" ? "border-[#8a6d46]/30" : "border-wedding-navy/30"
          }`}
        >
          <DialogHeader>
            <DialogTitle
              className={`text-2xl font-serif text-center ${
                theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
              }`}
            >
              Asistirá a la boda
            </DialogTitle>
            <DialogDescription
              className={`text-center ${
                theme === "warm"
                  ? "text-[#8a6d46]/80"
                  : "text-wedding-turquoise"
              }`}
            >
              Completa el siguiente formulario para confirmar tu asistencia
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="py-4 space-y-4">
            <Label
              className={
                theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
              }
            >
              ¿Podrás asistir?
            </Label>
            <RadioGroup
              onValueChange={(value) => setValue("attendance", value)}
              {...register("attendance")}
              className="flex space-x-4"
              defaultValue={
                attend !== null ? (attend ? "yes" : "no") : undefined
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="attendance-yes" />
                <Label htmlFor="attendance-yes">Sí, asistiré</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="attendance-no" />
                <Label htmlFor="attendance-no">No podré asistir</Label>
              </div>
            </RadioGroup>
            {errors.attendance && (
              <p className="text-red-500 text-sm">
                {errors.attendance.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || isLoadingPost}
              className="w-full"
            >
              {isSubmitting || isLoadingPost ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
