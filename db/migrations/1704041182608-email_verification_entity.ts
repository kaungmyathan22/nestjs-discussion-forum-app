import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailVerificationEntity1704041182608 implements MigrationInterface {
    name = 'EmailVerificationEntity1704041182608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_verification_token_entity" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" integer, CONSTRAINT "REL_fd5d35b89df90ddc04965fee17" UNIQUE ("userId"), CONSTRAINT "PK_b8d48e9438582184d36a207af1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "email_verification_token_entity" ADD CONSTRAINT "FK_fd5d35b89df90ddc04965fee17c" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification_token_entity" DROP CONSTRAINT "FK_fd5d35b89df90ddc04965fee17c"`);
        await queryRunner.query(`DROP TABLE "email_verification_token_entity"`);
    }

}
