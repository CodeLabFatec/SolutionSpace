import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1680270256435 implements MigrationInterface {
  name = 'default1680270256435'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "statusConfigurations" DROP CONSTRAINT "UQ_70e86ed7c0e66b1e822dc35aea2"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statusConfigurations" ADD CONSTRAINT "UQ_70e86ed7c0e66b1e822dc35aea2" UNIQUE ("rating")`
    )
  }
}
