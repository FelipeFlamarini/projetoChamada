import { ColumnDef } from "@tanstack/react-table";
import { getAllStudentsApiStudentsGetResponseItem as Student } from "../schemas/endpoints/students/students.zod";
import z from "zod";
import { SquarePen, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columnsStudents: ColumnDef<z.infer<typeof Student>>[] = [
  {
    accessorKey: "image_path",
    header: "Foto",
    cell: (cell) => {
      return (
        <Avatar>
          <AvatarImage src={cell.row.original.image_path!} alt={cell.row.original.name} />
          <AvatarFallback className="uppercase">{cell.row.original.name[0]}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "ra",
    header: "Ra",
  },
  {
    header: "Ações",
    id: "actions",
    cell: () => {
      return (
        <div className="flex gap-4 items-center justify-center h-full">
          <SquarePen />
          <Trash2 className="text-tst-error-foreground" />
        </div>
      );
    },
  },
];
