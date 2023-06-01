import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685630431594 {
    name = ' $npmConfigName1685630431594'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user_favoris_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_755a2b4d2732766d1721f3a1fc" ON "user_favoris_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_64538e42f289018786f5706bb2" ON "user_favoris_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE TABLE "user_liste_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_338450a593d3133deae0d87834" ON "user_liste_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_526d25296cc16c1784896a4c89" ON "user_liste_movie" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_755a2b4d2732766d1721f3a1fc"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_64538e42f289018786f5706bb2"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user_favoris_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_755a2b4d2732766d1721f3a1fcf" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_64538e42f289018786f5706bb27" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user_favoris_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "user_favoris_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "user_favoris_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user_favoris_movie"
                RENAME TO "user_favoris_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_755a2b4d2732766d1721f3a1fc" ON "user_favoris_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_64538e42f289018786f5706bb2" ON "user_favoris_movie" ("movieId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_338450a593d3133deae0d87834"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_526d25296cc16c1784896a4c89"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user_liste_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "FK_338450a593d3133deae0d878344" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_526d25296cc16c1784896a4c89a" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user_liste_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "user_liste_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "user_liste_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user_liste_movie"
                RENAME TO "user_liste_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_338450a593d3133deae0d87834" ON "user_liste_movie" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_526d25296cc16c1784896a4c89" ON "user_liste_movie" ("movieId")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX "IDX_526d25296cc16c1784896a4c89"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_338450a593d3133deae0d87834"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_liste_movie"
                RENAME TO "temporary_user_liste_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_liste_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user_liste_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "temporary_user_liste_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user_liste_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_526d25296cc16c1784896a4c89" ON "user_liste_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_338450a593d3133deae0d87834" ON "user_liste_movie" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_64538e42f289018786f5706bb2"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_755a2b4d2732766d1721f3a1fc"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_favoris_movie"
                RENAME TO "temporary_user_favoris_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_favoris_movie" (
                "userId" integer NOT NULL,
                "movieId" integer NOT NULL,
                PRIMARY KEY ("userId", "movieId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user_favoris_movie"("userId", "movieId")
            SELECT "userId",
                "movieId"
            FROM "temporary_user_favoris_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user_favoris_movie"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_64538e42f289018786f5706bb2" ON "user_favoris_movie" ("movieId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_755a2b4d2732766d1721f3a1fc" ON "user_favoris_movie" ("userId")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_526d25296cc16c1784896a4c89"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_338450a593d3133deae0d87834"
        `);
        await queryRunner.query(`
            DROP TABLE "user_liste_movie"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_64538e42f289018786f5706bb2"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_755a2b4d2732766d1721f3a1fc"
        `);
        await queryRunner.query(`
            DROP TABLE "user_favoris_movie"
        `);
    }
}
