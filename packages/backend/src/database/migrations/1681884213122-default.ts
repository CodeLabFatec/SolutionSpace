import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681884213122 implements MigrationInterface {
    name = 'default1681884213122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRequestFeatures" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRequestHotfix" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRatingAnalise" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "mustRateAnalise" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRatingAnalinhamento" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "mustRateAnalinhamento" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "team_id" uuid`);
        await queryRunner.query(`ALTER TYPE "public"."requests_requesttype_enum" RENAME TO "requests_requesttype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."requests_requesttype_enum" AS ENUM('feature', 'hotfix')`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "requestType" TYPE "public"."requests_requesttype_enum" USING "requestType"::"text"::"public"."requests_requesttype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."requests_requesttype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_af7c865954dd00ce35028fae2a1" FOREIGN KEY ("team_id") REFERENCES "teams"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_af7c865954dd00ce35028fae2a1"`);
        await queryRunner.query(`CREATE TYPE "public"."requests_requesttype_enum_old" AS ENUM('Feature', 'Hotfix')`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "requestType" TYPE "public"."requests_requesttype_enum_old" USING "requestType"::"text"::"public"."requests_requesttype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."requests_requesttype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."requests_requesttype_enum_old" RENAME TO "requests_requesttype_enum"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "team_id"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "mustRateAnalinhamento"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRatingAnalinhamento"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "mustRateAnalise"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRatingAnalise"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRequestHotfix"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRequestFeatures"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "description"`);
    }

}
