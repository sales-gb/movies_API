import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMoviesTable1682459053073 implements MigrationInterface {
    name = 'CreateMoviesTable1682459053073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" text NOT NULL, "duration" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_3a794f850bd3e432c46b3faa913" UNIQUE ("name"), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movies"`);
    }

}
