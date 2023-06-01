import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685625706920 implements MigrationInterface {
    name = 'default1685625706920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ADD "group_id" uuid`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_a1289c5ff0911c22a96359a806c" FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_a1289c5ff0911c22a96359a806c"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "group_id"`);
    }

}
