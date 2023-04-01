import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1680361928323 implements MigrationInterface {
  name = 'default1680361928323'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" SET DEFAULT 'Aberto'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "status" DROP DEFAULT`)
  }
}
