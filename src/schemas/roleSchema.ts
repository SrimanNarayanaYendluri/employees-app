import { pgTable, serial, varchar, text, timestamp, index } from "drizzle-orm/pg-core";

export const roles = pgTable(
  "roles",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 50 }).unique().notNull(),
    description: text("description"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at"),
  },
  (table) => ({
    titleIndex: index("title_idx").on(table.title),
  })
);

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
