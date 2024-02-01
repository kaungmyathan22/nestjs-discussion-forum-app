import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionTableRename1706803500006 implements MigrationInterface {
    name = 'QuestionTableRename1706803500006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "authorId" integer, CONSTRAINT "PK_14a0a509f33d8cd3a96a448dcd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "question_entity" ADD CONSTRAINT "FK_1f1917a088f01f0cdbb7cf90829" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_entity" DROP CONSTRAINT "FK_1f1917a088f01f0cdbb7cf90829"`);
        await queryRunner.query(`DROP TABLE "question_entity"`);
    }

}
