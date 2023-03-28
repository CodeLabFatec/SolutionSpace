import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1680030083992 implements MigrationInterface {
  name = 'default1680030083992'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "teams" ("team_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "team_name" text NOT NULL, CONSTRAINT "PK_10ccce4d7d878c221ee7c5c8057" PRIMARY KEY ("team_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "team_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "requests" ("request_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text, "requestType" "public"."requests_requesttype_enum", "requestStep" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_4e7b87d34546d9f21a648aed04d" PRIMARY KEY ("request_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "ratings" ("rating_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" text NOT NULL, "title" text NOT NULL, "description" text, "requestStep" "public"."ratings_requeststep_enum", "targetGroup" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "request_id" uuid, CONSTRAINT "PK_dc4f636dd0dd5a75e84115a606f" PRIMARY KEY ("rating_id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "files" ("file_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" text NOT NULL, "base64" text NOT NULL, "ext" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "request_id" uuid, "rating_id" uuid, CONSTRAINT "PK_a753eb40fcc8cd925fe9c9aded4" PRIMARY KEY ("file_id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1208ee1db5ddb64b48a86b46a61" FOREIGN KEY ("team_id") REFERENCES "teams"("team_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_9e5e2eb56e3837b43e5a547be23" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_f49ef8d0914a14decddbb170f2f" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_3cb8f146d96bca48dcca4330f7b" FOREIGN KEY ("request_id") REFERENCES "requests"("request_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_2b2d2d8b847afcbd55559acd60a" FOREIGN KEY ("request_id") REFERENCES "requests"("request_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_5fa3fbbb01348617185afd39557" FOREIGN KEY ("rating_id") REFERENCES "ratings"("rating_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_5fa3fbbb01348617185afd39557"`)
    await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_2b2d2d8b847afcbd55559acd60a"`)
    await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_3cb8f146d96bca48dcca4330f7b"`)
    await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_f49ef8d0914a14decddbb170f2f"`)
    await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_9e5e2eb56e3837b43e5a547be23"`)
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1208ee1db5ddb64b48a86b46a61"`)
    await queryRunner.query(`DROP TABLE "files"`)
    await queryRunner.query(`DROP TABLE "ratings"`)
    await queryRunner.query(`DROP TABLE "requests"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "teams"`)
  }
}
