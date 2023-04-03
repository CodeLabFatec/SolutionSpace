import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1680389187539 implements MigrationInterface {
  name = 'default1680389187539'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."statusConfigurations_requeststep_enum" AS ENUM('Analise de risco', 'Alinhamento estratégico')`
    )
    await queryRunner.query(
      `CREATE TABLE "statusConfigurations" ("status_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" text NOT NULL, "status" text NOT NULL, "requestStep" "public"."statusConfigurations_requeststep_enum", CONSTRAINT "PK_e6630724a6ce2f340ec05b6868f" PRIMARY KEY ("status_id"))`
    )
    await queryRunner.query(`ALTER TABLE "requests" ADD "status" text NOT NULL DEFAULT 'Aberto'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "status"`)
    await queryRunner.query(`DROP TABLE "statusConfigurations"`)
    await queryRunner.query(`DROP TYPE "public"."statusConfigurations_requeststep_enum"`)
  }
}
