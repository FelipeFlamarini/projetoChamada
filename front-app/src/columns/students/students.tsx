import { ColumnDef } from "@tanstack/react-table";
// import { getAllStudentsApiStudentsGetResponseItem as Student } from "../../schemas/endpoints/students/students.zod";
import { getStudentsApiStudentsGetResponseItem as Student } from "@/schemas/endpoints/students/students.zod";
import z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Actions } from "./actions";
import { Checkbox } from "@/components/ui/checkbox"



export const columnsStudents: ColumnDef<z.infer<typeof Student>>[] = [
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
    cell: ({row}) => <Actions ra={row.original.ra} />,
  },
];
