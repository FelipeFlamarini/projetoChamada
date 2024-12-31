/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import type { UserCreateIsActive } from './userCreateIsActive';
import type { UserCreateIsSuperuser } from './userCreateIsSuperuser';
import type { UserCreateIsVerified } from './userCreateIsVerified';

export interface UserCreate {
  email: string;
  is_active?: UserCreateIsActive;
  is_superuser?: UserCreateIsSuperuser;
  is_verified?: UserCreateIsVerified;
  password: string;
}
