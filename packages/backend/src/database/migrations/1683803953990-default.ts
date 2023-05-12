import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683803953990 implements MigrationInterface {
    name = 'default1683803953990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ADD "approved" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "approved"`);
    }

}
