import { HeaderBack2 } from "@/components/headerBack2";
import { Button } from "@/components/ui/button";
import { InputWithEndIcon } from "@/components/inputIconEnd";
import { Loader2, Search, X } from "lucide-react";
import { useState } from "react";
// import { useGetAllStudentsApiStudentsGet } from "@/chamada";

import {
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  flexRender,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
import { FileUploadDialog } from "@/components/uploadCsv";
import { useDeactivateStudentBulkByRaApiStudentsBulkDeactivatePatch as useDeactivateStudents } from "@/chamada";
import { FormError } from "@/components/form/error";

interface Student {
  ra: number;
  name: string;
  image_base64?: string;
}

interface EstudantesProps {
  dataE: Student[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnsStudents: any;
}

export function Estudantes({ dataE, columnsStudents }: EstudantesProps) {
  const [inputValue, setInputValue] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<null | string>(null)
  const [rowSelection, setRowSelection] = useState({});

  console.log(formError)
  const table = useReactTable<Student>({
    columns: columnsStudents,
    data: dataE,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  });

  // const { data, isLoading } = useGetStudentsApiStudentsGet();
  const createStudentMutation = useCreateStudentApiStudentsPost();
  const deactivateStudentsMutation = useDeactivateStudents();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof createStudent>>({
    resolver: zodResolver(createStudent),
    defaultValues: {
      name: "",
      ra: undefined,
      image_base64: "",
    },
  });

  // const { formState } = form;
  // console.log(formState.errors);

  function onSubmit(data: z.infer<typeof createStudent>) {
    createStudentMutation.mutate(
      { data: data },
      {
        onSuccess: () => {
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
          const detailData = error.response?.data.detail
          console.log(JSON.stringify(detailData))
          if (detailData) {
            setFormError(detailData)
          }
        }
      }
    );
  }

  function excludeStudents() {
    const ras = table
      .getSelectedRowModel()
      .rows.map((row) => (row.original as Student).ra);
    deactivateStudentsMutation.mutate(
      { data: ras },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: activeStudentsKey() });
          checkToast({
            titulo: "Tudo certo!",
            descricao: "Os estudantes foram desativados da lista de chamada",
          });
        },
        onError: (error) => {
          console.error("Erro ao desativar estudantes", error);
        },
      }
    );
  }

  // function isEmpty(obj) {
  //   return Object.keys(obj).length === 0;
  // }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    table.getColumn("name")?.setFilterValue(e.target.value);
    setInputValue(e.target.value);
  }
  function handleClear() {
    setInputValue("");
    table.getColumn("name")?.setFilterValue("");
  }

  return (
    <>
      <div className="flex flex-col pt-2 px-4 gap-2 max-w-sm mx-auto">
        <HeaderBack2 link="/home" />
        {table.getSelectedRowModel().rows.length === 0 && (
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
                      className="rounded-3xl border border-black w-full"
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
                    Enviando...
                  </Button>
                )}

                {formError &&
                  <FormError>
                    {formError}
                  </FormError>}
              </DialogContent>
            </Dialog>
            <InputWithEndIcon
              placeholder="Busque pelo nome do estudante"
              className="rounded-3xl"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={handleChange}
            >
              {inputValue && <X onClick={handleClear} />}
              {!inputValue && <Search size={20} />}
            </InputWithEndIcon>
            <FileUploadDialog />
          </div>
        )}
        {table.getSelectedRowModel().rows.length !== 0 && (
          <div className="flex flex-col gap-2 mt-4">
            <Button
              variant={"go"}
              className="rounded-3xl w-full"
              onClick={excludeStudents}
            >
              Desativar estudantes
            </Button>
            <Button
              variant="goSecondary"
              className="rounded-3xl w-full"
              onClick={() => table.toggleAllPageRowsSelected(false)}
            >
              Cancelar
            </Button>
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel()?.rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    Não há estudantes cadastrados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
