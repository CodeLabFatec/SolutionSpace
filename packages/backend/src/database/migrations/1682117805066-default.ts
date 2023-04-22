import { MigrationInterface, QueryRunner } from "typeorm";

export class default1682117805066 implements MigrationInterface {
    name = 'default1682117805066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groups" ("group_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "group_name" text NOT NULL, "canRequestFeatures" boolean NOT NULL DEFAULT false, "canRequestHotfix" boolean NOT NULL DEFAULT false, "canRateAnalise" boolean NOT NULL DEFAULT false, "mustRateAnalise" boolean NOT NULL DEFAULT false, "canRateAnalinhamento" boolean NOT NULL DEFAULT false, "mustRateAnalinhamento" boolean NOT NULL DEFAULT false, "team_id" uuid, CONSTRAINT "UQ_ef10d4611e4f355d10ecaa10ac6" UNIQUE ("group_name"), CONSTRAINT "PK_7cfd923277f6ef9f89b04c60436" PRIMARY KEY ("group_id"))`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionCreateUsers" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionCreateTeams" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionCreateGroups" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionEditRequests" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionUnarchiveRequests" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female', 'others')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" "public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "group_id" uuid`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_af7c865954dd00ce35028fae2a1" FOREIGN KEY ("team_id") REFERENCES "teams"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0" FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_af7c865954dd00ce35028fae2a1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "group_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionUnarchiveRequests"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionEditRequests"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionCreateGroups"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionCreateTeams"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionCreateUsers"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "description"`);
        await queryRunner.query(`DROP TABLE "groups"`);
    }

}
