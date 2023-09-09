ALTER TABLE "task" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" DROP COLUMN IF EXISTS "updated_at";