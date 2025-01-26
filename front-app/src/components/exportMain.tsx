import { CaledarBtn } from "./buttons/calendarBtn";
import { Calendar } from "lucide-react";
import { ExportarBtn } from "./buttons/exportarBtn";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createAttendanceCsvByDateApiAttendancesCsvPost, getAttendancesDatesApiAttendancesAttendanceDatesGet as getAttendancesDate } from "@/chamada";

export const ExportarMain = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [attendancesDate, setAttendancesDate] = useState<string[]>([]);

  const handleExport = async () => {
    if (!selectedDate) {
      toast.error("Selecione uma data para exportar a lista de chamada");
      return;
    }
    const exportedDate = await createAttendanceCsvByDateApiAttendancesCsvPost({ date: selectedDate.toISOString().split("T")[0].toString() });

    const blob = new Blob([exportedDate as BlobPart], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a') as HTMLAnchorElement;
    a.href = url;
    a.download = `chamada-${selectedDate.toISOString()}.csv`; 
    a.click();
    window.URL.revokeObjectURL(url);
    window.URL.revokeObjectURL(url);

  };

  useEffect(() => {
    const fetchAttendancesDate = async () => {
      try {
        const atD = await getAttendancesDate() as string[];
        setAttendancesDate(atD);
      } catch (error) {
        console.error("Failed to fetch attendance dates:", error);
      }
    };

    fetchAttendancesDate();
  }, []);

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
          onDateChange={setSelectedDate} // Passa o manipulador de data
          dates={attendancesDate} // Passa as datas disponíveis
        />
        <ExportarBtn className="rounded-3xl w-full" onClick={handleExport} />
      </div>
    </div>
  );
};
