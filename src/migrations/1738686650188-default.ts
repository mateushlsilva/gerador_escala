import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1738686650188 implements MigrationInterface {
    name = 'Default1738686650188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "admin_id" integer`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_15def65c65681d022727b7ae7b4" FOREIGN KEY ("admin_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_15def65c65681d022727b7ae7b4"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "admin_id"`);
    }

}
