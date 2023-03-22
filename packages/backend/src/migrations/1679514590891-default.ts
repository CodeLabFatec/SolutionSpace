import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1679514590891 implements MigrationInterface {
  name = 'default1679514590891'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "groups" ("group_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "group_name" text NOT NULL, CONSTRAINT "PK_7cfd923277f6ef9f89b04c60436" PRIMARY KEY ("group_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "group_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "files" ("file_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" text NOT NULL, "base64" text NOT NULL, "ext" text NOT NULL, CONSTRAINT "PK_a753eb40fcc8cd925fe9c9aded4" PRIMARY KEY ("file_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "requests" ("request_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, "type" text NOT NULL, "requestStep" text NOT NULL, CONSTRAINT "PK_4e7b87d34546d9f21a648aed04d" PRIMARY KEY ("request_id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0" FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0"`)
    await queryRunner.query(`DROP TABLE "requests"`)
    await queryRunner.query(`DROP TABLE "files"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "groups"`)
  }
}
