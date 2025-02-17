CREATE TABLE "delivery_persons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"phone" varchar(14) NOT NULL,
	"wareHouse_id" integer,
	"order_id" integer,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DROP INDEX "pincode_idx";--> statement-breakpoint
ALTER TABLE "delivery_persons" ADD CONSTRAINT "delivery_persons_wareHouse_id_wareHouses_id_fk" FOREIGN KEY ("wareHouse_id") REFERENCES "public"."wareHouses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_persons" ADD CONSTRAINT "delivery_persons_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;