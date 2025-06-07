/*
  Warnings:

  - You are about to drop the column `upload_at` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `upload_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "upload_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "upload_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
