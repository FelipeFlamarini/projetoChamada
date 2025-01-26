import { Link } from "react-router";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

import { LogoCI } from "@/components/logo";
import undrawNotFound from "/undrawNotFound.svg";

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100 pt-2">
      <LogoCI />
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-8">
          A página que você está procurando não foi encontrada.
        </p>
        <Link to="/">
          <Button variant={"go"}>
            <Home className="mr-2 h-5 w-5" />
            <span>Voltar ao início</span>
          </Button>
        </Link>
      </div>
      <img src={undrawNotFound} alt="" className="w-40 h-w-40" />
    </div>
  );
}
