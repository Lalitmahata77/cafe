ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "fname";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "lname";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "provider";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "external_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "role";