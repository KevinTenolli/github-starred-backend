import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1709160506275 implements MigrationInterface {
    name = 'Migration1709160506275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "owner" ("id" integer NOT NULL, "ownerUsername" character varying NOT NULL, CONSTRAINT "UQ_8e86b6b9f94aece7d12d465dc0c" UNIQUE ("id"), CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`)
        await queryRunner.query(`CREATE TABLE "repo" ("id" integer NOT NULL, "repoName" character varying NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "UQ_6c3318a15f9a297481f341128cf" UNIQUE ("id"), CONSTRAINT "PK_6c3318a15f9a297481f341128cf" PRIMARY KEY ("id"))`)
        await queryRunner.query(`CREATE TABLE "repo_commits" ("id" SERIAL NOT NULL, "commitDate" character varying NOT NULL, "repoId" integer NOT NULL, "numberOfCommits" integer NOT NULL, CONSTRAINT "UQ_4eb87147c4c1c39f7317572a386" UNIQUE ("repoId", "commitDate"), CONSTRAINT "PK_07de39fd0fb0953bb5dfee09f30" PRIMARY KEY ("id", "commitDate", "repoId"))`)
        await queryRunner.query(`ALTER TABLE "repo" ADD CONSTRAINT "FK_c9e09ec6c1f5a017144f99d2afd" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE "repo_commits" ADD CONSTRAINT "FK_b915b4d2a197f48cd5263fa0097" FOREIGN KEY ("repoId") REFERENCES "repo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repo_commits" DROP CONSTRAINT "FK_b915b4d2a197f48cd5263fa0097"`)
        await queryRunner.query(`ALTER TABLE "repo" DROP CONSTRAINT "FK_c9e09ec6c1f5a017144f99d2afd"`)
        await queryRunner.query(`DROP TABLE "repo_commits"`)
        await queryRunner.query(`DROP TABLE "repo"`)
        await queryRunner.query(`DROP TABLE "owner"`)
    }

}
