import { useGetStudentsApiStudentsGet } from "@/chamada";
import { Estudantes } from "./estudantes";
import { getColumnsStudents } from "@/columns/students/students";

export function PageEstudantes() {
  const { data, isLoading } = useGetStudentsApiStudentsGet();
  console.log(data);
  return (
    !isLoading && (
      <Estudantes dataE={data} columnsStudents={getColumnsStudents()} />
    )
  );
}
