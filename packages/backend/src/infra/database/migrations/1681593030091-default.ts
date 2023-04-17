import { MigrationInterface, QueryRunner } from "typeorm";

export class default1681593030091 implements MigrationInterface {
    name = 'default1681593030091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "team_id" uuid`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_af7c865954dd00ce35028fae2a1" FOREIGN KEY ("team_id") REFERENCES "teams"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_af7c865954dd00ce35028fae2a1"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "team_id"`);
    }

}
