import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowTokenHashNullable1704095747654 implements MigrationInterface {
    name = 'AllowTokenHashNullable1704095747654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification_token_entity" ALTER COLUMN "token_hash" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "email_verification_token_entity" ALTER COLUMN "expiresAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification_token_entity" ALTER COLUMN "expiresAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "email_verification_token_entity" ALTER COLUMN "token_hash" SET NOT NULL`);
    }

}
