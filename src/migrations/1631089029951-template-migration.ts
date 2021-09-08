import { MigrationInterface, QueryRunner } from "typeorm";

export class templateMigration1631089029951 implements MigrationInterface {
  name = "templateMigration1631089029951";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "app_field_rule" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fieldId" integer, CONSTRAINT "PK_4f1189e2da8c3c319b6f8019919" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "app_field_rule_detail_operation_enum" AS ENUM('eq', 'ne', 'lt', 'gt', 'lte', 'gte')`
    );
    await queryRunner.query(
      `CREATE TABLE "app_field_rule_detail" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "appFieldRuleId" integer, "depFieldId" integer, "operation" "app_field_rule_detail_operation_enum" NOT NULL, "values" text array NOT NULL, "show" boolean NOT NULL, "required" boolean NOT NULL DEFAULT false, "disabled" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_818667f662161d89e1755da18a9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "app_template_group" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "applicationTemplateId" integer, "name" character varying NOT NULL, "min" integer NOT NULL DEFAULT '0', "max" integer NOT NULL, CONSTRAINT "PK_2d85dc734bb433d415f189c4b75" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "app_group_instance" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "groupId" integer, "applicationId" integer, CONSTRAINT "PK_7a96e8a0a81a089896392024c3d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "app_template_group_key" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "groupId" integer, "fieldId" integer, CONSTRAINT "PK_2a4b0cc25bd678b43e4a812fe2d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "application_template_field_operation_enum" AS ENUM('Select', 'Radio', 'Checkbox')`
    );
    await queryRunner.query(
      `CREATE TABLE "application_template_field" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "applicationTemplateId" integer, "label" character varying NOT NULL, "type" character varying NOT NULL, "required" boolean NOT NULL DEFAULT false, "order" integer, "sectionId" integer, "groupId" integer, "validation" jsonb, "multipleValues" boolean NOT NULL DEFAULT false, "operation" "application_template_field_operation_enum", CONSTRAINT "PK_cb5fe28fdd866472a569adc9d02" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "application_template_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`
    );
    await queryRunner.query(
      `CREATE TABLE "application_template" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "application_template_status_enum" NOT NULL, CONSTRAINT "PK_fb8bb1ebb67aab4622dbfc1a273" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" DROP COLUMN "groupId"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" DROP COLUMN "fieldId"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" ADD "groupId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" ADD "fieldId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" ADD "applicationTemplateId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "application_template_field" ADD CONSTRAINT "FK_bee3c35cad281c96bf47b3137f8" FOREIGN KEY ("applicationTemplateId") REFERENCES "application_template"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "application_template_field" DROP CONSTRAINT "FK_bee3c35cad281c96bf47b3137f8"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" DROP COLUMN "name"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" DROP COLUMN "applicationTemplateId"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" DROP COLUMN "fieldId"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" DROP COLUMN "groupId"`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" ADD "fieldId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "app_template_group_key" ADD "groupId" integer`
    );
    await queryRunner.query(`DROP TABLE "application_template"`);
    await queryRunner.query(`DROP TYPE "application_template_status_enum"`);
    await queryRunner.query(`DROP TABLE "application_template_field"`);
    await queryRunner.query(
      `DROP TYPE "application_template_field_operation_enum"`
    );
    await queryRunner.query(`DROP TABLE "app_template_group_key"`);
    await queryRunner.query(`DROP TABLE "app_group_instance"`);
    await queryRunner.query(`DROP TABLE "app_template_group"`);
    await queryRunner.query(`DROP TABLE "app_field_rule_detail"`);
    await queryRunner.query(`DROP TYPE "app_field_rule_detail_operation_enum"`);
    await queryRunner.query(`DROP TABLE "app_field_rule"`);
  }
}
