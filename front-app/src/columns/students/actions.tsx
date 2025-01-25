import { SquarePen, Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";
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
import { useEffect, useState } from "react";
import { InputLogin } from "@/components/ui/input";
import { UploadBtn } from "@/components/buttons/uploadBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editStudent } from "@/schemas/estudantes";
// ver se a melhor opção é fazer um refetch ou pegar pela row
// import { useGetStudentByRaApiStudentsStudentRaGet as useGetStudentByRa } from "@/chamada";
import { useUpdateStudentByRaApiStudentsStudentRaPatch as useUpdateStudentByRa } from "@/chamada";
import { checkToast } from "@/components/toasts/checkToast";
import { useQueryClient } from "@tanstack/react-query";
import { getGetStudentsApiStudentsGetQueryKey as activeStudentsKey } from "@/chamada";
import { useGetStudentByRaApiStudentsStudentRaGet as useGetStudentByRa } from "@/chamada";

interface ActionsProps {
  ra: number;
}

export const Actions = ({ ra }: ActionsProps) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const getStudentByRaQuery = useGetStudentByRa(ra);

  const updateStudentByRaMutation = useUpdateStudentByRa();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof editStudent>>({
    resolver: zodResolver(editStudent),
    defaultValues: {
      name: "",
      ra: 0,
      image_base64: "",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  useEffect(() => {
    if (getStudentByRaQuery.data) {
      form.reset({
        name: getStudentByRaQuery.data.name,
        ra: getStudentByRaQuery.data.ra,
        image_base64: getStudentByRaQuery.data.image_path || "",
      });
    }
  }, [getStudentByRaQuery.data, form]);

  const onSubmit = (data: z.infer<typeof editStudent>) => {
    updateStudentByRaMutation.mutate(
      {
        studentRa: ra,
        data: data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: activeStudentsKey() });
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
        studentRa: ra,
        data: {
          active: false,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: activeStudentsKey() });
          setOpenDelete(false);
          checkToast({
            titulo: "Tudo certo",
            descricao: "O estudante foi desativado com sucesso!",
          });
        },
      }
    );
  };

  return (
    !getStudentByRaQuery.isLoading && (
      <div className="flex gap-4 items-center  h-full">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <SquarePen />
          </DialogTrigger>
          <DialogContent className="gap-0">
            <DialogHeader>
              <DialogTitle>Editar estudante</DialogTitle>
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
                          placeholder="Nome completo"
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
                          placeholder="RA do estudante"
                          className="rounded-3xl border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <UploadBtn
                  className="rounded-3xl border border-black w-full"
                  title="Trocar foto"
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
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogTrigger>
            <Trash2 className="text-tst-error-foreground" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Tem certeza que quer desativar este estudante?
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Button
                className="rounded-3xl"
                variant={"goSecondary"}
                onClick={() => {
                  setOpenDelete(false);
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
    )
  );
};
