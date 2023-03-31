import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1680224074647 implements MigrationInterface {
  name = 'default1680224074647'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_2b2d2d8b847afcbd55559acd60a"`)
    await queryRunner.query(
      `CREATE TABLE "request_file" ("request" uuid NOT NULL, "file" uuid NOT NULL, CONSTRAINT "PK_9bb2a9faddda4bce13aa87c451a" PRIMARY KEY ("request", "file"))`
    )
    await queryRunner.query(`CREATE INDEX "IDX_2e6785126aeadc3ea753077195" ON "request_file" ("request") `)
    await queryRunner.query(`CREATE INDEX "IDX_0430a086f95df2a36fa1404c7c" ON "request_file" ("file") `)
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "request_id"`)
    await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "UQ_fee65e62557b5c91d557a1f1501" UNIQUE ("team_name")`)
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "requestType" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "ratings" ALTER COLUMN "requestStep" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "request_file" ADD CONSTRAINT "FK_2e6785126aeadc3ea7530771950" FOREIGN KEY ("request") REFERENCES "files"("file_id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "request_file" ADD CONSTRAINT "FK_0430a086f95df2a36fa1404c7c3" FOREIGN KEY ("file") REFERENCES "requests"("request_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request_file" DROP CONSTRAINT "FK_0430a086f95df2a36fa1404c7c3"`)
    await queryRunner.query(`ALTER TABLE "request_file" DROP CONSTRAINT "FK_2e6785126aeadc3ea7530771950"`)
    await queryRunner.query(`ALTER TABLE "ratings" ALTER COLUMN "requestStep" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "requestType" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "UQ_fee65e62557b5c91d557a1f1501"`)
    await queryRunner.query(`ALTER TABLE "files" ADD "request_id" uuid`)
    await queryRunner.query(`DROP INDEX "public"."IDX_0430a086f95df2a36fa1404c7c"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_2e6785126aeadc3ea753077195"`)
    await queryRunner.query(`DROP TABLE "request_file"`)
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_2b2d2d8b847afcbd55559acd60a" FOREIGN KEY ("request_id") REFERENCES "requests"("request_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
