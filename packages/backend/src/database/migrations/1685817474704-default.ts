import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685817474704 implements MigrationInterface {
    name = 'default1685817474704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "colorStatus"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "status_id" uuid`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionConfigureStatus" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "targetGroup"`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "targetGroup" uuid`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_40439e52fda158f5cced900a7bb" FOREIGN KEY ("status_id") REFERENCES "statusConfigurations"("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_2e737e17920eccaf44a46ddc1b8" FOREIGN KEY ("targetGroup") REFERENCES "groups"("group_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_2e737e17920eccaf44a46ddc1b8"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_40439e52fda158f5cced900a7bb"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "targetGroup"`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "targetGroup" text`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionConfigureStatus"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status_id"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "colorStatus" text`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "status" text NOT NULL DEFAULT 'Aberto'`);
    }

}
