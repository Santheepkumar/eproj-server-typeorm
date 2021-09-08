import {MigrationInterface, QueryRunner} from "typeorm";

export class createUser1631037822839 implements MigrationInterface {
    name = 'createUser1631037822839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" DROP COLUMN "applicationTemplateId"`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" DROP COLUMN "groupId"`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" DROP COLUMN "fieldId"`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" ADD "groupId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" ADD "fieldId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" ADD "applicationTemplateId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" DROP COLUMN "applicationTemplateId"`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" DROP COLUMN "fieldId"`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" DROP COLUMN "groupId"`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" ADD "fieldId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" ADD "groupId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."app_template_group_key" ADD "applicationTemplateId" integer NOT NULL`);
    }

}
