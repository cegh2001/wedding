import { Check, Frown } from "lucide-react";
import { AttendInterface } from "./StandarAttend";
import { Button } from "@/components/ui/button";

export const NoAttend = ({ reset, setOpen }: AttendInterface) => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 bg-red-300">
          <Frown className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-serif mb-2 text-primary">Que lastima</h3>
        <p className="text-primary/80">
          Lamentamos que no puedas asistir, nos harás mucha falta en nuestra celebración.
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
