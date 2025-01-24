import { HeaderBack2 } from "@/components/headerBack2";
import { Button } from "@/components/ui/button";
import { InputWithEndIcon } from "@/components/inputIconEnd";
import { Loader2, Search, Upload, X } from "lucide-react";
import { useState } from "react";
// import { useGetAllStudentsApiStudentsGet } from "@/chamada";
import { DataTableStudents } from "./table";
import { columnsStudents } from "@/columns/students/students";
import {
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { InputLogin } from "@/components/ui/input";
import { UploadBtn } from "@/components/buttons/uploadBtn";
import { useCreateStudentApiStudentsPost } from "@/chamada";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createStudent } from "@/schemas/estudantes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { checkToast } from "@/components/toasts/checkToast";
import { getGetStudentsApiStudentsGetQueryKey as activeStudentsKey } from "@/chamada";
import { useGetStudentsApiStudentsGet } from "@/chamada";

export function Estudantes() {
  const [inputValue, setInputValue] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetStudentsApiStudentsGet();
  const createStudentMutation = useCreateStudentApiStudentsPost();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createStudent>>({
    resolver: zodResolver(createStudent),
    defaultValues: {
      name: "",
      ra: undefined,
      image_base64: "",
    },
  });

  const { formState } = form;
  console.log(formState.errors);

  function onSubmit(data: z.infer<typeof createStudent>) {
    createStudentMutation.mutate(
      { data: data },
      {
        onSuccess: () => {
          console.log("Estudante cadastrado com sucesso");
          queryClient.invalidateQueries({ queryKey: activeStudentsKey() });
          setOpen(false);
          checkToast({
            titulo: "Tudo certo!",
            descricao: "O estudante foi adicionado a lista de chamada",
          });
          form.reset();
        },
        onError: (error) => {
          console.error("Erro ao cadastrar estudante", error);
        },
      }
    );
  }

  const table = useReactTable({
    columns: columnsStudents,
    data: data!,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    table.getColumn("name")?.setFilterValue(e.target.value);
    setInputValue(e.target.value);
  }
  function handleClear() {
    setInputValue("");
    table.getColumn("name")?.setFilterValue("");
  }
  return (
    <div className="pt-2 px-4">
      <HeaderBack2 link="/home " />
      <div className="flex flex-col gap-2 mt-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button variant={"go"} className="rounded-3xl w-full">
              Adicionar estudante
            </Button>
          </DialogTrigger>
          <DialogContent className="gap-0">
            <DialogHeader>
              <DialogTitle>Cadastrar Estudante</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3 mt-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputLogin
                          placeholder="Nome Completo"
                          className="rounded-3xl border border-black"
                          {...field}
                          disabled={createStudentMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ra"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputLogin
                          placeholder="RA do Estudante"
                          className="rounded-3xl border border-black"
                          {...field}
                          disabled={createStudentMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <UploadBtn
                  className="rounded-3xl border border-black"
                  title="Faça upload da foto"
                  form={form}
                  name="image_base64"
                  disabled={createStudentMutation.isPending}
                />
              </form>
            </Form>
            {/* <div className="flex flex-col gap-3 mt-6">
              <InputLogin
                placeholder="Nome Completo"
                className="rounded-3xl border border-black"
              />
              <InputLogin
                placeholder="RA do Estudante"
                className="rounded-3xl border border-black"
              />
              <UploadBtn
                className="rounded-3xl border border-black"
                title="Faça upload da foto"
              />
            </div> */}
            {!createStudentMutation.isPending && (
              <Button
                variant={"go"}
                className="rounded-3xl w-full mt-6 mb-4"
                onClick={form.handleSubmit(onSubmit)}
              >
                Salvar
              </Button>
            )}
            {createStudentMutation.isPending && (
              <Button disabled className="rounded-3xl w-full mt-6 mb-4">
                <Loader2 className="animate-spin" />
                enviando...
              </Button>
            )}
          </DialogContent>
        </Dialog>
        <InputWithEndIcon
          placeholder="Busque pelo nome do estudante"
          className="rounded-3xl"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={handleChange}
        >
          {inputValue && <X onClick={handleClear} />}
          {!inputValue && <Search size={20} />}
        </InputWithEndIcon>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"goSecondary"} className="rounded-3xl w-full">
              Importar CSV <Upload />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Importar Csv</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {!isLoading && <DataTableStudents table={table} />}
      </div>
    </div>
  );
}
