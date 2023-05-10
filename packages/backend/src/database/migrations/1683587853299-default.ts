import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683587853299 implements MigrationInterface {
    name = 'default1683587853299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ADD "colorStatus" text`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "arquived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "statusConfigurations" ADD "color" text`);
        await queryRunner.query(`ALTER TABLE "statusConfigurations" ADD "archiveRequests" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statusConfigurations" DROP COLUMN "archiveRequests"`);
        await queryRunner.query(`ALTER TABLE "statusConfigurations" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "arquived"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "colorStatus"`);
    }

}
