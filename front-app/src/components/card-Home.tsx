import { Link } from "react-router";
import {
  ClipboardCheck,
  Download,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ButtonHome } from "./buttons/homeBtn";
import undrawHello from "/undrawHello.svg";
import { useAuthJwtLogoutApiAuthLogoutPost } from "@/chamada";

export function CardHome() {
  const logout = useAuthJwtLogoutApiAuthLogoutPost();

  return (
    <Card className="mx-auto max-w-sm w-full border-none flex flex-col flex-1 justify-between">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-xl text-text text-center">
          O que você deseja fazer agora?
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Link to="/iniciar" className="w-full">
          <ButtonHome className="text-center p-4 pt-1">
            <ClipboardCheck className="mb-1" />
            Gerenciar Chamada Inteligente
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
        <ButtonHome
          className="p-4 pt-2 flex flex-col w-full"
          onClick={() => {
            logout.mutate(undefined, {
              onSettled: () => {
                window.location.href = "/";
              },
            });
          }}
        >
          <LogOut className="mb-3" />
          <div className="flex w-full justify-center">Sair</div>
        </ButtonHome>
      </CardContent>
      <CardFooter className="flex justify-center mt-2">
        <img src={undrawHello} alt="" className="w-40 h-w-40" />
      </CardFooter>
    </Card>
  );
}
