import { MigrationInterface, QueryRunner } from "typeorm";

export class SuaMigration1757115907577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "username" VARCHAR(255) NOT NULL UNIQUE,
                "avatar" VARCHAR(255) NOT NULL
            );
        `);

    await queryRunner.query(`
            CREATE TABLE "post" (
                "id" SERIAL PRIMARY KEY,
                "cover" VARCHAR(255) NOT NULL,
                "title" VARCHAR(255) NOT NULL,
                "slug" VARCHAR(255) NOT NULL,
                "body" TEXT NOT NULL,
                "markdown" TEXT NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "authorId" INTEGER NOT NULL,
                CONSTRAINT "FK_post_author" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "post"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
  }
}
