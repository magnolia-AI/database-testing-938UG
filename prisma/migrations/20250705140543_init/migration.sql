/*
  Warnings:

  - You are about to drop the column `goalId` on the `GoalCompletion` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `GoalCompletion` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Metric` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Metric` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `PageView` table. All the data in the column will be lost.
  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `goalName` to the `GoalCompletion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `GoalCompletion` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `GoalCompletion` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `type` to the `Metric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Metric` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GoalCompletion" DROP CONSTRAINT "GoalCompletion_goalId_fkey";

-- DropForeignKey
ALTER TABLE "GoalCompletion" DROP CONSTRAINT "GoalCompletion_userId_fkey";

-- DropIndex
DROP INDEX "GoalCompletion_goalId_timestamp_idx";

-- DropIndex
DROP INDEX "GoalCompletion_userId_timestamp_idx";

-- DropIndex
DROP INDEX "Metric_name_timestamp_idx";

-- DropIndex
DROP INDEX "PageView_path_timestamp_idx";

-- DropIndex
DROP INDEX "PageView_sessionId_timestamp_idx";

-- AlterTable
ALTER TABLE "GoalCompletion" DROP COLUMN "goalId",
DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "goalName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Metric" DROP COLUMN "name",
DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PageView" DROP COLUMN "sessionId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Goal";

-- AddForeignKey
ALTER TABLE "GoalCompletion" ADD CONSTRAINT "GoalCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
