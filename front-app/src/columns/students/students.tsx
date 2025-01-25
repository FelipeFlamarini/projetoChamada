import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

import { Actions } from "./actions";
import { getStudentsApiStudentsGetResponseItem as Student } from "@/schemas/endpoints/students/students.zod";
import { Checkbox } from "@/components/ui/checkbox";
import { StudentImageCell } from "@/components/studentImageCell";

export function getColumnsStudents(): ColumnDef<z.infer<typeof Student>>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "image_path",
      header: "Foto",
      cell: ({ row }) => (
        <StudentImageCell ra={row.original.ra} name={row.original.name} />
      ),
    },
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "ra",
      header: "RA",
    },
    {
      header: "Ações",
      id: "actions",
      cell: ({ row }) => <Actions ra={row.original.ra} />,
    },
  ];
}
