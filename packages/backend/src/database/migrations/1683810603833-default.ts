import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683810603833 implements MigrationInterface {
    name = 'default1683810603833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "targetGroup"`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "targetGroup" uuid`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_2e737e17920eccaf44a46ddc1b8" FOREIGN KEY ("targetGroup") REFERENCES "groups"("group_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_2e737e17920eccaf44a46ddc1b8"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "targetGroup"`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "targetGroup" text`);
    }

}
