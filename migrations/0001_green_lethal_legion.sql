ALTER TABLE "companies" DROP CONSTRAINT "companies_name_unique";--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "departments" ALTER COLUMN "name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "first_name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "last_name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "email" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "employees" ALTER COLUMN "phone" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "code" varchar NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "code_idx" ON "companies" USING btree ("code");--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_code_unique" UNIQUE("code");