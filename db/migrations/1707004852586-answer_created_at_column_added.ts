import { MigrationInterface, QueryRunner } from "typeorm";

export class AnswerCreatedAtColumnAdded1707004852586 implements MigrationInterface {
    name = 'AnswerCreatedAtColumnAdded1707004852586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer_entity" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2024-02-04T00:00:52.871Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer_entity" DROP COLUMN "createdAt"`);
    }

}
