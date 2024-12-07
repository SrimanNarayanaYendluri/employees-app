import { pgTable, serial, varchar, text, timestamp, index } from "drizzle-orm/pg-core";

export const companies = pgTable(
  "companies",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).unique().notNull(),
    description: text("description"),
    address: text("address"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at"),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  })
);

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
