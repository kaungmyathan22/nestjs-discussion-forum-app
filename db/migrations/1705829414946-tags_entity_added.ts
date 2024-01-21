import { MigrationInterface, QueryRunner } from "typeorm";

export class TagsEntityAdded1705829414946 implements MigrationInterface {
    name = 'TagsEntityAdded1705829414946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_98efc66e2a1ce7fa1425e21e468" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_entity_tags_tag_entity" ("articleEntityId" integer NOT NULL, "tagEntityId" integer NOT NULL, CONSTRAINT "PK_a346f9d457b549425e8bf9b3a4a" PRIMARY KEY ("articleEntityId", "tagEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_27412319887306a6e46ba04181" ON "article_entity_tags_tag_entity" ("articleEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_89c7cf1771b06ea2b0ee720385" ON "article_entity_tags_tag_entity" ("tagEntityId") `);
        await queryRunner.query(`CREATE TABLE "tag_entity_articles_article_entity" ("tagEntityId" integer NOT NULL, "articleEntityId" integer NOT NULL, CONSTRAINT "PK_bafd10e4645de2e1aa999d4d483" PRIMARY KEY ("tagEntityId", "articleEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_901c9dd43284edfaabc2552235" ON "tag_entity_articles_article_entity" ("tagEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce049b52348668a7144e404ee2" ON "tag_entity_articles_article_entity" ("articleEntityId") `);
        await queryRunner.query(`ALTER TABLE "article_entity_tags_tag_entity" ADD CONSTRAINT "FK_27412319887306a6e46ba041817" FOREIGN KEY ("articleEntityId") REFERENCES "article_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_entity_tags_tag_entity" ADD CONSTRAINT "FK_89c7cf1771b06ea2b0ee7203850" FOREIGN KEY ("tagEntityId") REFERENCES "tag_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_entity_articles_article_entity" ADD CONSTRAINT "FK_901c9dd43284edfaabc2552235c" FOREIGN KEY ("tagEntityId") REFERENCES "tag_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_entity_articles_article_entity" ADD CONSTRAINT "FK_ce049b52348668a7144e404ee2c" FOREIGN KEY ("articleEntityId") REFERENCES "article_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_entity_articles_article_entity" DROP CONSTRAINT "FK_ce049b52348668a7144e404ee2c"`);
        await queryRunner.query(`ALTER TABLE "tag_entity_articles_article_entity" DROP CONSTRAINT "FK_901c9dd43284edfaabc2552235c"`);
        await queryRunner.query(`ALTER TABLE "article_entity_tags_tag_entity" DROP CONSTRAINT "FK_89c7cf1771b06ea2b0ee7203850"`);
        await queryRunner.query(`ALTER TABLE "article_entity_tags_tag_entity" DROP CONSTRAINT "FK_27412319887306a6e46ba041817"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce049b52348668a7144e404ee2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_901c9dd43284edfaabc2552235"`);
        await queryRunner.query(`DROP TABLE "tag_entity_articles_article_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89c7cf1771b06ea2b0ee720385"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_27412319887306a6e46ba04181"`);
        await queryRunner.query(`DROP TABLE "article_entity_tags_tag_entity"`);
        await queryRunner.query(`DROP TABLE "tag_entity"`);
    }

}
