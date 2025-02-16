CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"image" text,
	"description" text,
	"price" integer NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "fname" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lname" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "provider" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "external_id" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar(12) DEFAULT 'customer' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");