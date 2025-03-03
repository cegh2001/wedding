"use client";
import { Button } from "@/components/ui/button";
import { Check, StampIcon as Passport } from "lucide-react";
export interface AttendInterface {
  reset: () => void;
  setOpen: (value: boolean) => void;
}

export const StandarAttend = ({ reset, setOpen }: AttendInterface) => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 bg-primary/10">
          <Passport className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-serif mb-2 text-primary">¿Asistirás?</h3>
        <p className="text-primary/80">
          Tu presencia hará nuestra celebración aún más especial
        </p>
      </div>

      <Button
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="w-full bg-primary hover:bg-primary/90 text-white"
      >
        Seleccionar opción
      </Button>
    </>
  );
};
