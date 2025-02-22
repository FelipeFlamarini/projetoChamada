/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import type { UserUpdateEmail } from './userUpdateEmail';
import type { UserUpdateIsActive } from './userUpdateIsActive';
import type { UserUpdateIsSuperuser } from './userUpdateIsSuperuser';
import type { UserUpdateIsVerified } from './userUpdateIsVerified';
import type { UserUpdatePassword } from './userUpdatePassword';

export interface UserUpdate {
  email?: UserUpdateEmail;
  is_active?: UserUpdateIsActive;
  is_superuser?: UserUpdateIsSuperuser;
  is_verified?: UserUpdateIsVerified;
  password?: UserUpdatePassword;
}
