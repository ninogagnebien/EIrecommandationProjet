import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685537213476 {
    name = ' $npmConfigName1685537213476'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "release_date" datetime,
                "backdrop_path" varchar,
                "adult" boolean,
                "genre_ids" varchar,
                "original_language" varchar,
                "original_title" varchar,
                "overview" varchar,
                "poster_path" varchar,
                "popularity" integer,
                "vote_average" integer,
                "vote_count" integer
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
                "vote_count" integer NOT NULL
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
    }
}
