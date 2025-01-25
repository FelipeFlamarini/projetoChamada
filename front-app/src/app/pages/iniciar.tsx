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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-dvh flex flex-col gap-12 px-2 pt-8 pb-2 sm:py-2 sm:gap-2 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="rollcall_token"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-center">
                Insira o token de chamada
              </FormLabel>
              <FormControl>
                <Input
                  id="rollcall_token"
                  type="text"
                  placeholder="Token da chamada"
                  required
                  className="w-44"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="rounded-md w-44" variant={"go"}>
          Iniciar chamada
        </Button>
      </form>
    </Form>
  );
}
