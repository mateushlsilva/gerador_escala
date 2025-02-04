import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1738673683371 implements MigrationInterface {
    name = 'Default1738673683371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "userTN" boolean DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."usuarios_usertype_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "userType" "public"."usuarios_usertype_enum" NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "userName" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_e37cd632074e05be44a7cafd88b" UNIQUE ("userName")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_e37cd632074e05be44a7cafd88b"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "userType"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_usertype_enum"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "userTN"`);
    }

}
