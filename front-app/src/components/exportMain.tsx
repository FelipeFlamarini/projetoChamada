import { CaledarBtn } from "./buttons/calendarBtn";
import { Calendar } from "lucide-react";
import { ExportarBtn } from "./buttons/exportarBtn";

export const ExportarMain = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center flex-1">
      <h1 className="text-3xl max-w-[13rem]">Exportar Lista de Chamada</h1>
      <h2 className="text-[#2E18149E] text-lg">
        Selecione uma data e clique em “Exportar Lista” para fazer download da
        chamada
      </h2>
      <div className="w-full flex flex-col gap-3 mt-5">
        <CaledarBtn
          Icon={Calendar}
          placeholder="Data da chamada"
          className="rounded-3xl w-full"
        />
        <ExportarBtn className="rounded-3xl w-full" />
      </div>
    </div>
  );
};
