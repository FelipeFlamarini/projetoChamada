import { ExportarMain } from "@/components/exportMain";
import { HeaderBack2 } from "@/components/headerBack2";
import undrawDownload from "/undraw_download.svg";

export const ExportarChamada = () => {
  return (
    <div className="pt-5 px-4 h-screen flex flex-col justify-between max-w-sm w-full mx-auto">
      <HeaderBack2 link="/" />
      <div className="">
        <ExportarMain />
      </div>
      <div className="flex justify-center items-end mb-10">
        <img src={undrawDownload} alt="" className="w-40 h-w-40 " />
      </div>
    </div>
  );
};
