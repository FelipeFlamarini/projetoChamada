/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import type { Student } from './student';
import type { StudentNotCreated } from './studentNotCreated';

export interface StudentsCreatedByCSV {
  students_created: Student[];
  students_not_created: StudentNotCreated[];
}
