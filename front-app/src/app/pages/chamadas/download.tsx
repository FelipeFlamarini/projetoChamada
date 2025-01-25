import { Button } from "@/components/ui/button";

import { HeaderBack } from "@/components/headerBack";
import { SearchWithIcons } from "@/components/comp-26";

function DownloadChamada() {
  return (
    <div className="flex justify-center h-screen ">
      <div className="flex flex-col items-center gap-4 h-dvh p-2 px-3 sm:py-8 w-full max-w-screen-md">
        <HeaderBack title="Exportar Chamada" cvLeft="/chamada" />
        <SearchWithIcons title="Selecione a Data" className="rounded-3xl" />
        <Button variant={"go"} className="rounded-3xl w-full sm:max-w-[75%]">
          Dowload
        </Button>
      </div>
    </div>
  );
}

export { DownloadChamada };
