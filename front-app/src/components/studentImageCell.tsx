import { useQuery } from "@tanstack/react-query";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { getStudentImageApiStaticStudentsImagesStudentRaGet as getStudentImage } from "@/chamada";

// TODO: check if there is a better way to do this with orval
function useGetStudentImage(ra: number) {
  return useQuery({
    queryFn: () => {
      return getStudentImage(ra);
    },
    queryKey: ["studentImage", ra],
  });
}

export const StudentImageCell = ({
  ra,
  name,
}: {
  ra: number;
  name: string;
}) => {
  const { data: studentImage, isLoading } = useGetStudentImage(ra);

  return (
    <Avatar>
      <AvatarImage
        src={!isLoading ? `data:image/jpeg;base64,${studentImage}` : undefined}
        alt={name}
        className="object-cover"
      />
      <AvatarFallback className="uppercase">{name[0]}</AvatarFallback>
    </Avatar>
  );
};
