import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InputLogin } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import undrawLogin from "/undrawLogin.svg";
import { Link } from "react-router";
import { NavLink } from "react-router";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription className="text-subText text-center">
          Entre com sua conta de administrador, para ter acesso completo ao
          sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2 text-start">
            {/* <Label htmlFor="email" className="text-text">
              Usuário
            </Label> */}
            <InputLogin
              id="email"
              type="email"
              placeholder="Usuário"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              {/* <Label htmlFor="password" className="text-text">
                Senha
              </Label> */}
            </div>
            <InputLogin
              id="password"
              type="password"
              placeholder="Senha"
              required
            />
          </div>
          <Button className="rounded-full" variant={"go"} asChild>
            <Link to="/" >Entrar</Link>
          </Button>

          <div className="flex justify-center">
            <img src={undrawLogin} alt="" className="w-40 h-w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
