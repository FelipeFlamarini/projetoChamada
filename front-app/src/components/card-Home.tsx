import { Button } from "@/components/ui/button";
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

export function CardHome() {
  return (
    <Card className="mx-auto max-w-sm w-full border-none flex flex-col flex-1 justify-between">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl">Seja Bem Vindo!</CardTitle>
        <CardDescription className="text-subText text-center">
          O que você deseja fazer agora?
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 items-start">
        <div className="flex flex-col justify-between gap-4 h-full">
          <div className="grid gap-3.5">
            <Button variant={"go"} className="rounded-full" asChild>
              <Link to="/camera">Iniciar Chamada Inteligente</Link>
            </Button>
            <Button variant={"goSecondary"} className="rounded-full">
              Exportar Lista de Chamada
            </Button>
            <Button variant={"goOutline"} className="rounded-full" asChild>
              <Link to="/login">Sair</Link>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
          <img src={undrawHello} alt="" className="w-40 h-w-40" />
      </CardFooter>
    </Card>
  );
}
