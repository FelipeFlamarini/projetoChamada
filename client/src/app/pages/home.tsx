// import { LogoCI } from "./components/logo";
import { LogoCI } from "@/components/logo";
// import { CardTitle, CardDescription } from "@/components/ui/card";
import { CardHome } from "@/components/card-Home";
function Home() {
  return (
    <div className="flex flex-col items-center gap-2 h-screen p-2 sm:py-8">
      <LogoCI />
      <CardHome />
    </div>
  );
}

export { Home };
