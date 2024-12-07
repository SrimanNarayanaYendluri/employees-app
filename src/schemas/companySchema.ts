import { pgTable, serial, varchar, text, timestamp, index } from "drizzle-orm/pg-core";

export const companies = pgTable(
    "companies",
    {
        id: serial("id").primaryKey(),
        name: varchar("name").notNull(),
        description: text("description"),
        address: text("address"),
        code: varchar("code").unique().notNull(),
        created_at: timestamp("created_at").defaultNow(),
        updated_at: timestamp("updated_at"),
        deleted_at: timestamp("deleted_at"),
    },
    (table) => ({
        nameIndex: index("name_idx").on(table.name),
        codeIndex: index("code_idx").on(table.code),
        createdAtIndex: index("created_at_idx").on(table.created_at),
        updatedAtIndex: index("updated_at_idx").on(table.updated_at),
        deletedAtIndex: index("deleted_at_idx").on(table.deleted_at),
    })
);

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
export type CompanyTable = typeof companies;