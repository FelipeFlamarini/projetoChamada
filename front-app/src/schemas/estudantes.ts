import { z as zod } from "zod";

const base64ImageRegex =
  /^data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/]+={0,2}$/;

// Esquema de validação com Zod

const createStudent = zod.object({
  name: zod
    .string()
    .min(1, { message: "Nome deve ter pelo menos 1 caractere" }),
  ra: zod.coerce
    .number({ message: "RA deve ser um número" })
    .int({ message: "RA deve ser um número inteiro" })
    .positive({ message: "RA deve ser um número positivo" }),
  image_base64: zod.string().regex(base64ImageRegex, "Não é uma imagem valida"),
});

const editStudent = createStudent.partial();
export { createStudent, editStudent };
