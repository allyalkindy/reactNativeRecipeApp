CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "favorites" ALTER COLUMN "cook_time" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "favorites" ALTER COLUMN "servings" SET DATA TYPE integer;