import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterMoviesTableAddNullableDescriptionColumn1682564653775
  implements MigrationInterface
{
  name = 'AlterMoviesTableAddNullableDescriptionColumn1682564653775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "description" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
