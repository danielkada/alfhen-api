import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1674080630317 implements MigrationInterface {
  name = 'default1674080630317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "books" ("id" character varying NOT NULL, "title" character varying NOT NULL, "authors" character varying array NOT NULL, "publishedDate" character varying NOT NULL, "description" character varying NOT NULL, "numberOfPages" integer NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL, "name" text NOT NULL, "surname" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "readings" ("id" uuid NOT NULL, "current_page" character varying NOT NULL DEFAULT \'0\', "book_id" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0f3aa79140b41884f2e53ba52a" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "readings" ADD CONSTRAINT "FK_c2a7827076a2ca8393ef61a0255" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "readings" ADD CONSTRAINT "FK_1669179f7fb984f5d0021ad6b64" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "readings" DROP CONSTRAINT "FK_1669179f7fb984f5d0021ad6b64"');
    await queryRunner.query('ALTER TABLE "readings" DROP CONSTRAINT "FK_c2a7827076a2ca8393ef61a0255"');
    await queryRunner.query('DROP TABLE "readings"');
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TABLE "books"');
  }
}
