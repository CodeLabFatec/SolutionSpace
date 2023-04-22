import { MigrationInterface, QueryRunner } from "typeorm";

export class default1682189846479 implements MigrationInterface {
    name = 'default1682189846479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "description"`);
    }

}
