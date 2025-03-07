import { Smile } from "lucide-react";
import { AttendInterface } from "./StandarAttend";
import { Button } from "@/components/ui/button";

export const YesAttend = ({ reset, setOpen }: AttendInterface) => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 bg-green-200">
          <Smile className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-serif mb-2 text-primary">Excelente</h3>
        <p className="text-primary/80">
          ¡Estamos emocionados de que puedas asistir! Tu presencia hará nuestra celebración aún más especial.
        </p>
      </div>

      <Button
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="w-full bg-primary hover:bg-primary/90 text-white"
      >
        Cambiar mi respuesta
      </Button>
    </>
  );
};
