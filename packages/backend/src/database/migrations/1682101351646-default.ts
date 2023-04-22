import { MigrationInterface, QueryRunner } from "typeorm";

export class default1682101351646 implements MigrationInterface {
    name = 'default1682101351646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRatingAnalise"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRatingAnalinhamento"`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRateAnalise" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRateAnalinhamento" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionCreateUsers" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionCreateTeams" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionCreateGroups" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionEditRequests" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionUnarchiveRequests" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female', 'others')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" "public"."users_gender_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionUnarchiveRequests"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionEditRequests"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionCreateGroups"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionCreateTeams"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionCreateUsers"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRateAnalinhamento"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRateAnalise"`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRatingAnalinhamento" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRatingAnalise" boolean NOT NULL DEFAULT false`);
    }

}
