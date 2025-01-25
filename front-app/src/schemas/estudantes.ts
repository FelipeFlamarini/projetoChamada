import { z as zod } from "zod";

const createStudent = zod.object({
  name: zod.string(),
  ra: zod.coerce.number({ message: "RA deve ser um número" }),
  image_base64: zod.string(),
});

const editStudent = zod.object({
  name: zod.string().optional(),
  ra: zod.coerce.number().optional(),
  image_base64: zod.string().optional(),
});

export { createStudent, editStudent };
