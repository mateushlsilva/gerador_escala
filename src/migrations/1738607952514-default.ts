import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1738607952514 implements MigrationInterface {
    name = 'Default1738607952514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "disponibilidade" ("id" SERIAL NOT NULL, CONSTRAINT "PK_2c0cb4e3d1de771c23c19eab2d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "userEmail" character varying(70) NOT NULL, "userPassword" character varying(100) NOT NULL, CONSTRAINT "UQ_f68799d3baa0db9dd86f9f71b31" UNIQUE ("userEmail"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "disponibilidade"`);
    }

}
