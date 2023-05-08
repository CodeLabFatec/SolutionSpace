import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683331568012 implements MigrationInterface {
    name = 'default1683331568012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ADD "hasRead" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "hasRead"`);
    }

}
