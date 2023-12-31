import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailVerificationEntityCodeColumnToTokenHash1704041997498 implements MigrationInterface {
    name = 'EmailVerificationEntityCodeColumnToTokenHash1704041997498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification_token_entity" RENAME COLUMN "code" TO "token_hash"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification_token_entity" RENAME COLUMN "token_hash" TO "code"`);
    }

}
