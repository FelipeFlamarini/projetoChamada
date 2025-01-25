import { useNavigate } from "react-router";

import { useGetStudentsApiStudentsGet } from "@/chamada";
import { Estudantes } from "./estudantes";
import { getColumnsStudents } from "@/columns/students/students";
import { useGetCurrentUserApiUsersMeGet } from "@/chamada";

export function PageEstudantes() {
  const navigate = useNavigate();
  const useGetCurrentUser = useGetCurrentUserApiUsersMeGet();
  if (!useGetCurrentUser.data) {
    navigate("/");
  }

  const { data, isLoading } = useGetStudentsApiStudentsGet();
  console.log(data);
  return (
    !isLoading && (
      <Estudantes dataE={data} columnsStudents={getColumnsStudents()} />
    )
  );
}
