import {
  z as zod
} from 'zod'

const createStudent = zod.object({
  "name": zod.string(),
  "ra": zod.coerce.number(),
  "image_base64": zod.string()
})

const editStudent = createStudent.extend({
  "active": zod.string()
})

export { createStudent,editStudent }

