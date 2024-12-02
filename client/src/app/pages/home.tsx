// import { LogoCI } from "./components/logo";
import { LogoCI } from "@/components/logo";
// import { CardTitle, CardDescription } from "@/components/ui/card";
import { CardHome } from "@/components/card-Home";
function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-dvh p-2 sm:p-0">
      <LogoCI />
      <CardHome />
    </div>
  );
}

export { Home };
