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
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid gap-2 text-start">
                  <FormControl>
                    <InputLogin
                      id="email"
                      type="email"
                      placeholder="Usuário"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2 text-start">
                  <FormControl>
                    <InputLogin
                      id="password"
                      type="password"
                      placeholder="Senha"
                      required
                      {...field}	
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="rounded-full" variant={"go"} asChild>
              <Link to="/">Entrar</Link>
            </Button>

            <div className="flex justify-center">
              <img src={undrawLogin} alt="" className="w-40 h-w-40" />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
