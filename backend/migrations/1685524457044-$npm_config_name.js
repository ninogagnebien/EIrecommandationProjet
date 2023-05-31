import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685524457044 {
    name = ' $npmConfigName1685524457044'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "title")
            SELECT "id",
                "title"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "release_date" datetime NOT NULL,
                "backdrop_path" varchar NOT NULL,
                "adult" boolean NOT NULL,
                "genre_ids" varchar NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "popularity" integer NOT NULL,
                "vote_average" integer NOT NULL,
                "vote_count" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "title")
            SELECT "id",
                "title"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "release_date" datetime NOT NULL,
                "backdrop_path" varchar NOT NULL,
                "adult" boolean NOT NULL,
                "genre_ids" varchar NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "popularity" integer NOT NULL,
                "vote_average" integer NOT NULL,
                "vote_count" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"(
                    "id",
                    "title",
                    "release_date",
                    "backdrop_path",
                    "adult",
                    "genre_ids",
                    "original_language",
                    "original_title",
                    "overview",
                    "poster_path",
                    "popularity",
                    "vote_average",
                    "vote_count"
                )
            SELECT "id",
                "title",
                "release_date",
                "backdrop_path",
                "adult",
                "genre_ids",
                "original_language",
                "original_title",
                "overview",
                "poster_path",
                "popularity",
                "vote_average",
                "vote_count"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "release_date" datetime NOT NULL,
                "backdrop_path" varchar NOT NULL,
                "adult" boolean NOT NULL,
                "genre_ids" varchar NOT NULL,
                "original_language" varchar NOT NULL,
                "original_title" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "poster_path" varchar NOT NULL,
                "popularity" integer NOT NULL,
                "vote_average" integer NOT NULL,
                "vote_count" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"(
                    "id",
                    "title",
                    "release_date",
                    "backdrop_path",
                    "adult",
                    "genre_ids",
                    "original_language",
                    "original_title",
                    "overview",
                    "poster_path",
                    "popularity",
                    "vote_average",
                    "vote_count"
                )
            SELECT "id",
                "title",
                "release_date",
                "backdrop_path",
                "adult",
                "genre_ids",
                "original_language",
                "original_title",
                "overview",
                "poster_path",
                "popularity",
                "vote_average",
                "vote_count"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "title")
            SELECT "id",
                "title"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "releaseDate" datetime NOT NULL,
                "title" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "title")
            SELECT "id",
                "title"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
