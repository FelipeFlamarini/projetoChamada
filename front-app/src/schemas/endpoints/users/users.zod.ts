/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import {
  z as zod
} from 'zod'

/**
 * @summary Get Current User
 */
export const getCurrentUserApiUsersMeGetResponse = zod.object({
  "id": zod.string(),
  "email": zod.string().email(),
  "is_active": zod.boolean().optional(),
  "is_superuser": zod.boolean().optional(),
  "is_verified": zod.boolean().optional()
})

