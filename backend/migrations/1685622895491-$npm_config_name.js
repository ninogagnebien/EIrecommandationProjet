import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685622895491 {
    name = ' $npmConfigName1685622895491'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user_genres_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9c1f84e5631e967d3530c16420" ON "user_genres_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9bee2551954c075dd4aa6e3ec7" ON "user_genres_movie" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_9c1f84e5631e967d3530c16420"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_9bee2551954c075dd4aa6e3ec7"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user_genres_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_9c1f84e5631e967d3530c164207" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_9bee2551954c075dd4aa6e3ec7d" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user_genres_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "user_genres_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "user_genres_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user_genres_movie"
                RENAME TO "user_genres_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9c1f84e5631e967d3530c16420" ON "user_genres_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9bee2551954c075dd4aa6e3ec7" ON "user_genres_movie" ("movieId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_9bee2551954c075dd4aa6e3ec7"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_9c1f84e5631e967d3530c16420"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_genres_movie"
                RENAME TO "temporary_user_genres_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_genres_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user_genres_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "temporary_user_genres_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user_genres_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9bee2551954c075dd4aa6e3ec7" ON "user_genres_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9c1f84e5631e967d3530c16420" ON "user_genres_movie" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_9bee2551954c075dd4aa6e3ec7"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_9c1f84e5631e967d3530c16420"
        `);
        await queryRunner.query(`
            DROP TABLE "user_genres_movie"
        `);
    }
}
