import { HeaderBack2 } from "@/components/headerBack2";
import { Button } from "@/components/ui/button";
import { InputWithEndIcon } from "@/components/inputIconEnd";
import { Search, SquarePen, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllStudentsApiStudentsGet } from "@/chamada";
import { DataTableStudents } from "./table";
import { columnsStudents } from "@/columns/students";
import {
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
// import {}
export function Estudantes() {
  const [inputValue, setInputValue] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const { data, isLoading } = useGetAllStudentsApiStudentsGet();
  const table = useReactTable({
    columns: columnsStudents,
    data: data!,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })
  console.log(data);
  console.log(inputValue);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    table.getColumn("name")?.setFilterValue(e.target.value)
    setInputValue(e.target.value);
  }
  function handleClear() {
    setInputValue("");
  }
  return (
    <div className="pt-2 px-4">
      <HeaderBack2 link="/home " />
      <div className="flex flex-col gap-2 mt-4">
        <Button variant={"go"} className="rounded-3xl w-full">
          Adicionar estudante
        </Button>
        <InputWithEndIcon
          placeholder="Busque pelo nome do estudante"
          className="rounded-3xl"
          // value={table.getColumn("email")?.getFilterValue() as string) ?? ""}
          value = {table.getColumn("name")?.getFilterValue() as string ?? ""}
          onChange={handleChange}
        >
          {inputValue && <X onClick={handleClear} />}
          {!inputValue && <Search size={20} />}
        </InputWithEndIcon>
        <Button variant={"goSecondary"} className="rounded-3xl w-full">
          Importar CSV <Upload />
        </Button>

        {!isLoading && (
          // <Table className="border border-gray-200 rounded-lg">
          //   <TableHeader>
          //     <TableRow>
          //       <TableHead className="text-left border">Foto</TableHead>
          //       <TableHead className="text-left border ">Nome</TableHead>
          //       <TableHead className="text-left border">RA</TableHead>
          //       <TableHead className="text-left border">Ações</TableHead>
          //     </TableRow>
          //   </TableHeader>
          //   <TableBody>
          //     {data?.map((estudante) => (
          //       <TableRow key={estudante._id} className="*:border">
          //         <TableCell> 
          //           <img
          //             className="rounded-full"
          //             src={`http://localhost:2010/${estudante.image_path}`}
          //             width={40}
          //             height={40}
          //             alt={estudante.name}
          //           />
          //         </TableCell>
          //         <TableCell>{estudante.name}</TableCell>
          //         <TableCell>{estudante.ra}</TableCell>
          //         <TableCell >
          //           <div className="flex gap-4 items-center justify-center h-full">
          //             <SquarePen />
          //             <Trash2 className="text-tst-error-foreground" />
          //           </div>
          //         </TableCell>
          //       </TableRow>
          //     ))}
          //   </TableBody>
          // </Table>
          <DataTableStudents table={table}/>
        )}
      </div>
    </div>
  );
}
