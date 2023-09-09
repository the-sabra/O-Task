CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" char(150) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"restToken" text,
	"tokenExp" bigserial NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
