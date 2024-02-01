import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionTagRelationAdded1706804043080 implements MigrationInterface {
    name = 'QuestionTagRelationAdded1706804043080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question_tags" ("tagEntityId" integer NOT NULL, "questionEntityId" integer NOT NULL, CONSTRAINT "PK_46a7fad18bb84d7089c72cc6aee" PRIMARY KEY ("tagEntityId", "questionEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f3ac167eac6f0b2b0c2c2f5109" ON "question_tags" ("tagEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_31b848240078aff84455b8a2c8" ON "question_tags" ("questionEntityId") `);
        await queryRunner.query(`ALTER TABLE "question_tags" ADD CONSTRAINT "FK_f3ac167eac6f0b2b0c2c2f51093" FOREIGN KEY ("tagEntityId") REFERENCES "tag_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_tags" ADD CONSTRAINT "FK_31b848240078aff84455b8a2c83" FOREIGN KEY ("questionEntityId") REFERENCES "question_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_tags" DROP CONSTRAINT "FK_31b848240078aff84455b8a2c83"`);
        await queryRunner.query(`ALTER TABLE "question_tags" DROP CONSTRAINT "FK_f3ac167eac6f0b2b0c2c2f51093"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31b848240078aff84455b8a2c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3ac167eac6f0b2b0c2c2f5109"`);
        await queryRunner.query(`DROP TABLE "question_tags"`);
    }

}
