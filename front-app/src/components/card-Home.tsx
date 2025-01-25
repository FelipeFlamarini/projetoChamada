import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import undrawHello from "/undrawHello.svg";
import { Link } from "react-router";
import { ButtonHome } from "./buttons/homeBtn";
import {
  ClipboardCheck,
  Download,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";

export function CardHome() {
  return (
    <Card className="mx-auto max-w-sm w-full border-none flex flex-col flex-1 justify-between">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl">Seja bem-vindo!</CardTitle>
        <CardDescription className="text-subText text-center">
          O que você deseja fazer agora?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Link to="/camera" className="w-full">
          <ButtonHome className="text-center p-4 pt-1">
            <ClipboardCheck className="mb-1" />
            Iniciar Chamada Inteligente
          </ButtonHome>
        </Link>
        <Link to="/exportar" className="w-full">
          <ButtonHome className="text-center p-4 pt-1">
            <Download className="mb-1" />
            Exportar lista de chamada
          </ButtonHome>
        </Link>
        <Link to="/estudantes" className="w-full">
          <ButtonHome className="text-center p-4 pt-1">
            <SlidersHorizontal />
            Gerenciar estudantes
          </ButtonHome>
        </Link>
        <Link to="/login" className="w-full">
          <ButtonHome className="p-4 pt-2 flex flex-col">
            <LogOut className="mb-3" />
            <div className="flex w-full justify-center">Sair</div>
          </ButtonHome>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-center mt-2">
        <img src={undrawHello} alt="" className="w-40 h-w-40" />
      </CardFooter>
    </Card>
  );
}
