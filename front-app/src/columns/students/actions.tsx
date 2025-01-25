import { SquarePen, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { InputLogin } from "@/components/ui/input";
import { UploadBtn } from "@/components/buttons/uploadBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editStudent } from "@/schemas/estudantes";
// ver se a melhor opção é fazer um refetch ou pegar pela row
// import { useGetStudentByRaApiStudentsStudentRaGet as useGetStudentByRa } from "@/chamada";
import { useUpdateStudentByRaApiStudentsStudentRaPatch as useUpdateStudentsByRa } from "@/chamada";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkToast } from "@/components/toasts/checkToast";
import { useQueryClient } from "@tanstack/react-query";
import { getGetAllStudentsApiStudentsAllGetQueryKey as allStudentsKey } from "@/chamada";

interface ActionsProps {
  row: any;
}

export const Actions = ({ row }: ActionsProps) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // const getStudentByRaQuery = useGetStudentByRa(row.ra);
  const updateStudentByRaMutation = useUpdateStudentsByRa();
  const queryClient = useQueryClient();

  console.log(row);
  const defaultValues = {
    name: row.name,
    ra: row.ra,
    active: row.active ? "active" : "inactive",
    image_base64: row.image_path,
  };
  const form = useForm<z.infer<typeof editStudent>>({
    resolver: zodResolver(editStudent),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: z.infer<typeof editStudent>) => {
    const nData = {
      ...data,
      active: data.active === "active" ? true : false,
    };

    updateStudentByRaMutation.mutate(
      {
        studentRa: row.ra,
        data: nData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: allStudentsKey() });
          setOpen(false);
          checkToast({
            titulo: "Tudo Certo",
            descricao: "As alterações foram salvas com sucesso!",
          });
        },
      }
    );
  };

  const deactivateStudent = () => {
    updateStudentByRaMutation.mutate(
      {
        studentRa: row.ra,
        data: {
          active: false,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: allStudentsKey() });
          setOpenDelete(false);
          checkToast({
            titulo: "Tudo Certo",
            descricao: "O estudante foi desativado com sucesso!",
          });
        },
      }
    );
  };

  return (
    <div className="flex gap-4 items-center justify-center h-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <SquarePen />
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-inputLogin rounded-3xl">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <UploadBtn
                className="rounded-3xl border border-black"
                title="Faça upload da foto"
                form={form}
                name="image_base64"
              />
            </form>
          </Form>
          <Button
            variant={"go"}
            className="rounded-3xl w-full mt-6 mb-4"
            onClick={form.handleSubmit(onSubmit)}
          >
            Salvar
          </Button>
        </DialogContent>
      </Dialog>
      {/* <SquarePen /> */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger>
          <Trash2 className="text-tst-error-foreground" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tem Certeza que quer excluir este estudante?
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button
              className="rounded-3xl"
              variant={"goSecondary"}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="rounded-3xl"
              variant={"go"}
              onClick={deactivateStudent}
            >
              Desativar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
