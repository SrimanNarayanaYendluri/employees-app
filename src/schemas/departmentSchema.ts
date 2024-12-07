import { pgTable, serial, varchar, text, timestamp, integer, index } from "drizzle-orm/pg-core";
import { companies } from "./companySchema";

export const departments = pgTable(
  "departments",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    description: text("description"),
    company_id: integer("company_id").references(() => companies.id).notNull(), 
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at"),
    deleted_at: timestamp("deleted_at"),
  },
  (t) => ({
    departmentNameIdx: index("department_name_idx").on(t.name),
    departmentCompanyIdx: index("department_company_idx").on(t.company_id),
    departmentCreatedAtIdx: index("department_created_at_idx").on(t.created_at),
    departmentUpdatedAtIdx: index("department_updated_at_idx").on(t.updated_at),
    departmentDeletedAtIdx: index("department_deleted_at_idx").on(t.deleted_at),
  })
);

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
export type DepartmentsTable = typeof departments;
