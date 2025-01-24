import { useGetStudentsApiStudentsGet } from "@/chamada";
import { Estudantes } from "./estudantes";
import { columnsStudents } from "@/columns/students/students";

export function PageEstudantes() {
  const { data, isLoading } = useGetStudentsApiStudentsGet();
  console.log(data);
  return !isLoading && <Estudantes dataE={data} columnsStudents={columnsStudents} />;
}
