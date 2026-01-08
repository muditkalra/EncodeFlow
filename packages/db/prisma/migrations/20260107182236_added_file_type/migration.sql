/*
  Warnings:

  - Added the required column `fileType` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "fileType" TEXT NOT NULL;
