import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1679516032411 implements MigrationInterface {
  name = 'default1679516032411'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "type"`)
    await queryRunner.query(`CREATE TYPE "public"."requests_requesttype_enum" AS ENUM('feature', 'hotfix')`)
    await queryRunner.query(`ALTER TABLE "requests" ADD "RequestType" "public"."requests_requesttype_enum" NOT NULL`)
    await queryRunner.query(`ALTER TABLE "requests" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "requests" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "requests" ADD "user_id" uuid`)
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_9e5e2eb56e3837b43e5a547be23" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_9e5e2eb56e3837b43e5a547be23"`)
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "user_id"`)
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "updated_at"`)
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "created_at"`)
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "RequestType"`)
    await queryRunner.query(`DROP TYPE "public"."requests_requesttype_enum"`)
    await queryRunner.query(`ALTER TABLE "requests" ADD "type" text NOT NULL`)
  }
}
