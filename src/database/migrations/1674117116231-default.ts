import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1674117116231 implements MigrationInterface {
  name = 'default1674117116231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "surname" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "books" ("id" character varying NOT NULL, "title" character varying NOT NULL, "authors" character varying array NOT NULL, "publishedDate" character varying NOT NULL, "description" character varying NOT NULL, "numberOfPages" integer NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "readings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "current_page" character varying NOT NULL DEFAULT 0, "book_id" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0f3aa79140b41884f2e53ba52a" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "readings" ADD CONSTRAINT "FK_0e3a7a8ef0c7f9ad758f4bc0e94" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "readings" ADD CONSTRAINT "FK_7fb6640d22c7483fa51cc39269a" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "readings" DROP CONSTRAINT "FK_7fb6640d22c7483fa51cc39269a"');
    await queryRunner.query('ALTER TABLE "readings" DROP CONSTRAINT "FK_0e3a7a8ef0c7f9ad758f4bc0e94"');
    await queryRunner.query('DROP TABLE "readings"');
    await queryRunner.query('DROP TABLE "books"');
    await queryRunner.query('DROP TABLE "users"');
  }

}
