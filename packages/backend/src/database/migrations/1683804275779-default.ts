import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683804275779 implements MigrationInterface {
    name = 'default1683804275779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "colorStatus"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "status_id" uuid`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_40439e52fda158f5cced900a7bb" FOREIGN KEY ("status_id") REFERENCES "statusConfigurations"("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_40439e52fda158f5cced900a7bb"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status_id"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "colorStatus" text`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "status" text NOT NULL DEFAULT 'Aberto'`);
    }

}
