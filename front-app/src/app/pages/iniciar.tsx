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
import {
  useStartRollcallApiRollcallStartPost,
  useStopRollcallApiRollcallStopPost,
} from "@/chamada";
import { checkToast } from "@/components/toasts/checkToast";
import { errorToast } from "@/components/toasts/errorToast";
import undrawReading from "/undrawReading.svg";

const formSchema = z.object({
  rollcall_token: z.string().min(4).max(4),
});

export function Iniciar() {
  const useStartRollcall = useStartRollcallApiRollcallStartPost();
  const useStopRollcall = useStopRollcallApiRollcallStopPost();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rollcall_token: "",
    },
  });

  async function onSubmitStart(values: z.infer<typeof formSchema>) {
    await useStartRollcall.mutateAsync(
      { data: values },
      {
        onSuccess: () => {
          checkToast({
            titulo: "Chamada iniciada com sucesso",
          });
        },
        onError: () => {
          errorToast({
            titulo: "Erro ao iniciar chamada",
            descricao: "Verifique a conexão com o servidor",
          });
        },
      }
    );
  }

  async function onSubmitStop(values: z.infer<typeof formSchema>) {
    await useStopRollcall.mutateAsync(
      { data: values },
      {
        onSuccess: () => {
          checkToast({
            titulo: "Chamada parada com sucesso",
          });
        },
        onError: () => {
          errorToast({
            titulo: "Erro ao parar chamada",
            descricao: "Verifique a conexão com o servidor",
          });
        },
      }
    );
  }

  return (
    <div className="pt-5 px-4 h-screen flex flex-col justify-between max-w-sm w-full mx-auto">
      <HeaderBack2 link="/home" />
      <Form {...form}>
        <form className="flex-1 flex flex-col gap-5 items-center justify-center">
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
                    className="w-full text-center uppercase placeholder:lowercase"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-4 w-full">
            <Button
              className="rounded-md w-full"
              variant={"go"}
              onClick={form.handleSubmit(onSubmitStart)}
            >
              Iniciar
            </Button>
            <Button
              className="rounded-md w-full"
              onClick={form.handleSubmit(onSubmitStop)}
            >
              Parar
            </Button>
          </div>
        </form>
      </Form>
      <div className="w-full flex justify-center pb-4">
        <img src={undrawReading} alt="" className="w-40 h-w-40" />
      </div>
    </div>
  );
}
