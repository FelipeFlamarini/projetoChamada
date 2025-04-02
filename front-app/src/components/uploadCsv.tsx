import * as React from "react";
import { Download, Upload, X } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import usePostUploadStudentsCsv from "@/hooks/usePostUploadStudentsCsv";
import ProgressBar from "./progressBar";
import { checkToast } from "@/components/toasts/checkToast";
import { errorToast } from "@/components/toasts/errorToast";

interface UploadedFile {
  id: string;
  file: File;
}

export function FileUploadDialog() {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const createStudentsByCsvMutation =
    usePostUploadStudentsCsv(setUploadProgress);

  React.useEffect(() => {
    if (uploadProgress < 0 || uploadProgress > 1) {
      setUploadProgress(1);
    }
  }, [uploadProgress, setUploadProgress]);

  const handleCreateStudentsByCsv = async () => {
    files.map(async (file) => {
      await createStudentsByCsvMutation.mutateAsync(
        {
          data: {
            csv_file: file.file,
          },
        },
        {
          onSuccess: () => {
            checkToast({
              titulo: "Tudo certo!",
              descricao: "Verifique se os estudantes foram adicionados",
            });
          },
          onError: () => {
            errorToast({
              titulo: "Erro ao importar",
              descricao: "Verifique se o arquivo está correto",
            });
          },
          onSettled: () => {
            setUploadProgress(0);
            setIsDialogOpen(false);
          },
        }
      );
    });
    setFiles([]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        id: uuidv4(),
        file: file,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"goSecondary"} className="rounded-3xl w-full">
          Importar CSV <Upload />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[320px] rounded-2xl p-0 shadow-lg">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-center text-base font-medium">
            Importar CSV
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 p-4">
          {createStudentsByCsvMutation.isPending ? (
            <ProgressBar progress={uploadProgress} />
          ) : (
            <>
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-full bg-gray-100 px-4 py-2"
                >
                  <span className="flex-1 text-sm text-gray-700">
                    {file.file.name
                      ? file.file.name.replace(/\.csv$/i, "")
                      : "Sem Nome"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full hover:bg-gray-200"
                    onClick={() => handleDelete(file.id)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
              <div className="grid gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".csv"
                  id="file-upload"
                />
                {files.length === 0 ? (
                  <label
                    htmlFor="file-upload"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    Adicionar arquivo CSV
                    <Download className="h-4 w-4" />
                  </label>
                ) : null}
                <p className="text-center">Limite de tamanho: 500MB</p>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full rounded-full bg-[#FF5533] font-medium hover:bg-[#FF5533]/90"
            disabled={files.length === 0}
            onClick={handleCreateStudentsByCsv}
          >
            Importar e salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
