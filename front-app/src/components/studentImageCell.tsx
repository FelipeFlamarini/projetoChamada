import { useState, useEffect } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { getStudentImageApiStaticStudentsImagesStudentRaGet as getStudentImage } from "@/chamada";

export const StudentImageCell = ({
  ra,
  name,
}: {
  ra: string;
  name: string;
}) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const studentImage = await getStudentImage(ra);
      setImage(`data:image/jpeg;base64,${studentImage}`);
    };

    fetchImage();
  }, [ra]);

  return (
    <Avatar>
      <AvatarImage src={image} alt={name} className="object-cover" />
      <AvatarFallback className="uppercase">{name[0]}</AvatarFallback>
    </Avatar>
  );
};
