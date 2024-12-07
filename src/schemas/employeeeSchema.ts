import { pgTable, serial, varchar, text, timestamp, boolean, integer, index } from "drizzle-orm/pg-core";
import { departments } from "./departmentSchema";
import { roles } from "./roleSchema";
import { companies } from "./companySchema";

export const employees = pgTable(
    "employees",
    {
        id: serial("id").primaryKey(),
        first_name: varchar("first_name").notNull(),
        last_name: varchar("last_name").notNull(),
        email: varchar("email").unique().notNull(),
        phone: varchar("phone").notNull(),
        address: text("address"),
        date_of_birth: timestamp("date_of_birth"),
        date_of_joining: timestamp("date_of_joining").notNull(),

        department_id: integer("department_id").references(() => departments.id).notNull(),
        role_id: integer("role_id").references(() => roles.id).notNull(),
        company_id: integer("company_id").references(() => companies.id).notNull(),

        salary: integer("salary").notNull(),
        is_active: boolean("is_active").default(true),

        created_at: timestamp("created_at").defaultNow(),
        updated_at: timestamp("updated_at"),
        deleted_at: timestamp("deleted_at"),
    },
    (t) => ({
        employeeEmailIdx: index("employee_email_idx").on(t.email),
        employeeIsActiveIdx: index("employee_is_active_idx").on(t.is_active),
        employeeCompanyIdx: index("employee_company_idx").on(t.company_id),
        employeeDepartmentIdx: index("employee_department_idx").on(t.department_id),
        employeeRoleIdx: index("employee_role_idx").on(t.role_id),
        employeeDateOfJoiningIdx: index("employee_date_of_joining_idx").on(t.date_of_joining),
        employeeCreatedAtIdx: index("employee_created_at_idx").on(t.created_at),
        employeeUpdatedAtIdx: index("employee_updated_at_idx").on(t.updated_at),
        employeeDeletedAtIdx: index("employee_deleted_at_idx").on(t.deleted_at),
    })
);

export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;
export type EmployeesTable = typeof employees;
