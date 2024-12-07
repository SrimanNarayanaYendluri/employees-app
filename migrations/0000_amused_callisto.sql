CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"address" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "companies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	"company_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"address" text,
	"date_of_birth" timestamp,
	"date_of_joining" timestamp NOT NULL,
	"department_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"company_id" integer NOT NULL,
	"salary" integer NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "employees_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "roles_title_unique" UNIQUE("title")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departments" ADD CONSTRAINT "departments_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "companies" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "department_name_idx" ON "departments" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "department_company_idx" ON "departments" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "department_created_at_idx" ON "departments" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "department_updated_at_idx" ON "departments" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "department_deleted_at_idx" ON "departments" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_email_idx" ON "employees" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_is_active_idx" ON "employees" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_company_idx" ON "employees" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_department_idx" ON "employees" USING btree ("department_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_role_idx" ON "employees" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "employee_date_of_joining_idx" ON "employees" USING btree ("date_of_joining");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "roles" USING btree ("title");