import { MigrationInterface, QueryRunner } from "typeorm";

export class AnswerEntityAdded1706866135845 implements MigrationInterface {
    name = 'AnswerEntityAdded1706866135845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answer_entity" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "authorId" integer, "questionId" integer, CONSTRAINT "PK_3158283e703015676d2e7c7d862" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answer_entity" ADD CONSTRAINT "FK_3ea173bcc299b46513ae953fdf0" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer_entity" ADD CONSTRAINT "FK_46f9a8790125a0d72234dda1614" FOREIGN KEY ("questionId") REFERENCES "question_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer_entity" DROP CONSTRAINT "FK_46f9a8790125a0d72234dda1614"`);
        await queryRunner.query(`ALTER TABLE "answer_entity" DROP CONSTRAINT "FK_3ea173bcc299b46513ae953fdf0"`);
        await queryRunner.query(`DROP TABLE "answer_entity"`);
    }

}
