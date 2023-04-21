import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681590491394 implements MigrationInterface {
    name = 'default1681590491394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRequestFeatures" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRequestHotfix" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRatingAnalise" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "mustRateAnalise" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "canRatingAnalinhamento" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "groups" ADD "mustRateAnalinhamento" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "mustRateAnalinhamento"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRatingAnalinhamento"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "mustRateAnalise"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRatingAnalise"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRequestHotfix"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "canRequestFeatures"`);
    }

}
