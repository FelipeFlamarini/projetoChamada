import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { HeaderBack2 } from "@/components/headerBack2";
import { useStartRollcallApiRollcallStartPost } from "@/chamada";

const formSchema = z.object({
  rollcall_token: z.string().min(4).max(4),
});

export function Iniciar() {
  const useStartRollcall = useStartRollcallApiRollcallStartPost();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rollcall_token: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await useStartRollcall.mutateAsync(
      { data: values },
      {
        onSuccess: () => {
          console.log("Chamada iniciada com sucesso!");
        },
      }
    );
  }

  return (
    <div className="pt-5 px-4 h-screen flex flex-col justify-between max-w-sm w-full mx-auto">
      <HeaderBack2 link="/" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col gap-5 items-center justify-center"
        >
          <FormField
            control={form.control}
            name="rollcall_token"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-full">
                <FormLabel className="text-center text-xl">
                  Insira o token de chamada
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    id="rollcall_token"
                    type="text"
                    placeholder="Token da chamada"
                    required
                    className="w-full text-center"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="rounded-md w-full" variant={"go"}>
            Iniciar chamada
          </Button>
        </form>
      </Form>
    </ div>
  );
}
