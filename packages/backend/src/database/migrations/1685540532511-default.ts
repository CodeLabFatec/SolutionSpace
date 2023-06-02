import { MigrationInterface, QueryRunner } from "typeorm";

export class default1685540532511 implements MigrationInterface {
    name = 'default1685540532511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "kanban" ("kanban_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "column" text NOT NULL, CONSTRAINT "PK_ea441abdd89509656c08afda4ee" PRIMARY KEY ("kanban_id"))`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "kanban_id" uuid`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_2f28c1c12eda3f200a2a71bea83" FOREIGN KEY ("kanban_id") REFERENCES "kanban"("kanban_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_2f28c1c12eda3f200a2a71bea83"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "kanban_id"`);
        await queryRunner.query(`DROP TABLE "kanban"`);
    }

}
