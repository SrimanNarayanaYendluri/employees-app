CREATE INDEX IF NOT EXISTS "employee_created_at_idx" ON "employees" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_updated_at_idx" ON "employees" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_deleted_at_idx" ON "employees" USING btree ("deleted_at");