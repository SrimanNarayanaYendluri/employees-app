ALTER TABLE "companies" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "companies" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "updated_at_idx" ON "companies" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "deleted_at_idx" ON "companies" USING btree ("deleted_at");