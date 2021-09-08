import { MigrationInterface, QueryRunner } from "typeorm";

export class programProgramcycleMigration1631088383277
  implements MigrationInterface
{
  name = "programProgramcycleMigration1631088383277";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "programs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, "description" character varying NOT NULL, CONSTRAINT "PK_d43c664bcaafc0e8a06dfd34e05" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "program_cycles" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "startDate" integer NOT NULL, "endDate" integer NOT NULL, "programId" integer NOT NULL, CONSTRAINT "PK_454e645d1d5cb8b67f55317405a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "program_cycles" ADD CONSTRAINT "FK_ff42aa96a90f0e22d17445eb278" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "program_cycles" DROP CONSTRAINT "FK_ff42aa96a90f0e22d17445eb278"`
    );
    await queryRunner.query(`DROP TABLE "program_cycles"`);
    await queryRunner.query(`DROP TABLE "programs"`);
  }
}
