import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="rollcall_token"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="rollcall_token"
                  type="text"
                  placeholder="Token da chamada"
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="rounded-full" variant={"go"}>
          Iniciar chamada
        </Button>
      </form>
    </Form>
  );
}
