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
import { FormError } from "@/components/form/error";

import { HeaderBack2 } from "@/components/headerBack2";
import {
  useGetStudentsApiStudentsGet,
  useStartRollcallApiRollcallStartPost,
  useStopRollcallApiRollcallStopPost,
} from "@/chamada";
import { checkToast } from "@/components/toasts/checkToast";
import { errorToast } from "@/components/toasts/errorToast";
import undrawReading from "/undrawReading.svg";
import { Skeleton } from "@/components/ui/skeleton"


const formSchema = z.object({
  rollcall_token: z.string().min(4).max(4),
});

export function Iniciar() {
  const useStartRollcall = useStartRollcallApiRollcallStartPost();
  const useStopRollcall = useStopRollcallApiRollcallStopPost();
  const getStudentesQuery = useGetStudentsApiStudentsGet();
  console.log(getStudentesQuery.data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rollcall_token: "",
    },
  });

  const isEnoughStudents = () => {
    return (getStudentesQuery.data?.length ?? 0) >= 2;
  }

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
      {!getStudentesQuery.isLoading && <Form {...form}>
        <form className="flex flex-col gap-5 items-center justify-center">
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
                    className="w-full text-center uppercase placeholder:normal-case"
                    {...field}
                    disabled={!isEnoughStudents()}
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
              disabled={!isEnoughStudents()}
            >
              Iniciar
            </Button>
            <Button
              className="rounded-md w-full"
              onClick={form.handleSubmit(onSubmitStop)}
              disabled={!isEnoughStudents()}
            >
              Parar
            </Button>
          </div>
        </form>
      </Form>}
      {getStudentesQuery.isLoading && <div className="flex-1 flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-8 w-3/5 self-center" />
          <Skeleton className="h-10 w-full " />
        </div>
        <div className="flex gap-4 w-full">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>}
      {
        (!getStudentesQuery.isLoading && !isEnoughStudents()) && 
          <div className="w-full">
            <FormError className="text-center text-lg">Não há alunos suficientes para iniciar a chamada</FormError>
          </div>
      }
      <div className="w-full flex justify-center pb-4">
        <img src={undrawReading} alt="" className="w-40 h-w-40" />
      </div>
    </div>
  );
}
