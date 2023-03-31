import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1680265710809 implements MigrationInterface {
  name = 'default1680265710809'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" ADD "request_id" uuid`)
    await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "UQ_fee65e62557b5c91d557a1f1501" UNIQUE ("team_name")`)
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_2b2d2d8b847afcbd55559acd60a" FOREIGN KEY ("request_id") REFERENCES "requests"("request_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_2b2d2d8b847afcbd55559acd60a"`)
    await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "UQ_fee65e62557b5c91d557a1f1501"`)
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "request_id"`)
  }
}
