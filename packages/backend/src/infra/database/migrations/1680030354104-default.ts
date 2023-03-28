import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1680030354104 implements MigrationInterface {
  name = 'default1680030354104'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."requests_requesttype_enum" RENAME TO "requests_requesttype_enum_old"`)
    await queryRunner.query(`CREATE TYPE "public"."requests_requesttype_enum" AS ENUM('Feature', 'Hotfix')`)
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "requestType" TYPE "public"."requests_requesttype_enum" USING "requestType"::"text"::"public"."requests_requesttype_enum"`
    )
    await queryRunner.query(`DROP TYPE "public"."requests_requesttype_enum_old"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."requests_requesttype_enum_old" AS ENUM('feature', 'hotfix')`)
    await queryRunner.query(
      `ALTER TABLE "requests" ALTER COLUMN "requestType" TYPE "public"."requests_requesttype_enum_old" USING "requestType"::"text"::"public"."requests_requesttype_enum_old"`
    )
    await queryRunner.query(`DROP TYPE "public"."requests_requesttype_enum"`)
    await queryRunner.query(`ALTER TYPE "public"."requests_requesttype_enum_old" RENAME TO "requests_requesttype_enum"`)
  }
}
