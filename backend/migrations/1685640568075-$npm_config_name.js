import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685640568075 {
    name = ' $npmConfigName1685640568075'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user_recommandations_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5fc25f81b80b236480661d042e" ON "user_recommandations_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_071bbb9618854fe81253716514" ON "user_recommandations_movie" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_5fc25f81b80b236480661d042e"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_071bbb9618854fe81253716514"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user_recommandations_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_5fc25f81b80b236480661d042e9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_071bbb9618854fe812537165147" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user_recommandations_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "user_recommandations_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "user_recommandations_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user_recommandations_movie"
                RENAME TO "user_recommandations_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5fc25f81b80b236480661d042e" ON "user_recommandations_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_071bbb9618854fe81253716514" ON "user_recommandations_movie" ("movieId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_071bbb9618854fe81253716514"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_5fc25f81b80b236480661d042e"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_recommandations_movie"
                RENAME TO "temporary_user_recommandations_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_recommandations_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user_recommandations_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "temporary_user_recommandations_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user_recommandations_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_071bbb9618854fe81253716514" ON "user_recommandations_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5fc25f81b80b236480661d042e" ON "user_recommandations_movie" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_071bbb9618854fe81253716514"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_5fc25f81b80b236480661d042e"
        `);
        await queryRunner.query(`
            DROP TABLE "user_recommandations_movie"
        `);
    }
}
