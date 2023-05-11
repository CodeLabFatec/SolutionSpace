import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683813798806 implements MigrationInterface {
    name = 'default1683813798806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" ADD "permissionConfigureStatus" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "permissionConfigureStatus"`);
    }

}
