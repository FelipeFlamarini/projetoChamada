import { z } from "zod";

const calendarSchema = z.object({
  specificDate: z.date().optional(),
  initialDate: z.date().optional(),
  finalDate: z.date().optional(),
});

export { calendarSchema };
