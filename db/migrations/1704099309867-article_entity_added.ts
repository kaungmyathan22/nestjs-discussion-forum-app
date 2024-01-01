import { MigrationInterface, QueryRunner } from "typeorm";

export class ArticleEntityAdded1704099309867 implements MigrationInterface {
    name = 'ArticleEntityAdded1704099309867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_362cadb16e72c369a1406924e2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "article_entity" ADD CONSTRAINT "FK_d84d3caa203db7cf1725b95b0c4" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_entity" DROP CONSTRAINT "FK_d84d3caa203db7cf1725b95b0c4"`);
        await queryRunner.query(`DROP TABLE "article_entity"`);
    }

}
