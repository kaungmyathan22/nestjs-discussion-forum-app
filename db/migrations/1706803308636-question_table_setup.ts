import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionTableSetup1706803308636 implements MigrationInterface {
    name = 'QuestionTableSetup1706803308636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "authorId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_75fc761f2752712276be38e7d13" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_75fc761f2752712276be38e7d13"`);
        await queryRunner.query(`DROP TABLE "question"`);
    }

}
