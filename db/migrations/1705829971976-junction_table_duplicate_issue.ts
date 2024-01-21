import { MigrationInterface, QueryRunner } from "typeorm";

export class JunctionTableDuplicateIssue1705829971976 implements MigrationInterface {
    name = 'JunctionTableDuplicateIssue1705829971976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_98efc66e2a1ce7fa1425e21e468" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_tags" ("articleEntityId" integer NOT NULL, "tagEntityId" integer NOT NULL, CONSTRAINT "PK_f89fad0d0dfea5ae81259e158cc" PRIMARY KEY ("articleEntityId", "tagEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a291978620fff99b1a7c566f1" ON "article_tags" ("articleEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4afc4cb5e2f7bfb76207ed4a5e" ON "article_tags" ("tagEntityId") `);
        await queryRunner.query(`ALTER TABLE "article_tags" ADD CONSTRAINT "FK_6a291978620fff99b1a7c566f19" FOREIGN KEY ("articleEntityId") REFERENCES "article_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_tags" ADD CONSTRAINT "FK_4afc4cb5e2f7bfb76207ed4a5e3" FOREIGN KEY ("tagEntityId") REFERENCES "tag_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_tags" DROP CONSTRAINT "FK_4afc4cb5e2f7bfb76207ed4a5e3"`);
        await queryRunner.query(`ALTER TABLE "article_tags" DROP CONSTRAINT "FK_6a291978620fff99b1a7c566f19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4afc4cb5e2f7bfb76207ed4a5e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a291978620fff99b1a7c566f1"`);
        await queryRunner.query(`DROP TABLE "article_tags"`);
        await queryRunner.query(`DROP TABLE "tag_entity"`);
    }

}
