"use client";

import * as React from "react";
import { Download, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCreateStudentsByCsvApiStudentsCsvPost } from "@/chamada";

interface UploadedFile {
  id: string;
  file: File;
}

export function FileUploadDialog() {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const createStudentsByCsvMutation = useCreateStudentsByCsvApiStudentsCsvPost();

  const handleCreateStudentsByCsv = async () => {
    files.map(async (file) => {
      console.log("file", file.file);
      await createStudentsByCsvMutation.mutateAsync({
        data:{
          csv_file: file.file
        }
      });
    });
    setFiles([]);
  }
  // console.log("files", files)
  const handleInputClick = () => {
    // colocar fora do setTimeout
    setTimeout(() => {
      // console.log("fileInputRef", fileInputRef);
      if (fileInputRef.current) {
        console.log("fileInputRef");
        fileInputRef.current.click();
      }
    }, 0);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(
        (file) => (
          console.log("file", file),
          {
            id: crypto.randomUUID(),
            file: file,
          }
        )
      );
      // console.log("newFiles", newFiles)
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"goSecondary"}
          className="rounded-3xl w-full"
          onClick={handleInputClick}
        >
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
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
            >
              Adicionar arquivo CSV
              <Download className="h-4 w-4" />
            </label>
          </div>
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
