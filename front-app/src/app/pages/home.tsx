import { LogoCI } from "@/components/logo";
import { CardHome } from "@/components/card-Home";

function Home() {
  return (
    <div className="flex flex-col items-center gap-2 h-dvh p-2 sm:py-8">
      <LogoCI />
      <CardHome />
    </div>
  );
}

export { Home };
