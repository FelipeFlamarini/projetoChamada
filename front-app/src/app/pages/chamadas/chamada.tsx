import { LogoCI } from "@/components/logo";
import { CardChamada } from "@/components/cardChamada";

function Chamada() {
  return (
    <div className="flex flex-col items-center gap-2 h-dvh p-2 sm:py-8">
      <LogoCI />
      <CardChamada />
    </div>
  );
}

export { Chamada };
