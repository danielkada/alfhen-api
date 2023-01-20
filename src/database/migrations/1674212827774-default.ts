import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1674212827774 implements MigrationInterface {
  name = 'default1674212827774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "readings" DROP CONSTRAINT "FK_0e3a7a8ef0c7f9ad758f4bc0e94"');
    await queryRunner.query('ALTER TABLE "books" ADD "subtitle" character varying');
    await queryRunner.query('ALTER TABLE "books" ADD "imageURL" character varying');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT \'now()\'');
    await queryRunner.query('ALTER TABLE "readings" ALTER COLUMN "created_at" SET DEFAULT \'now()\'');
    await queryRunner.query('ALTER TABLE "books" ALTER COLUMN "publishedDate" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "readings" ADD CONSTRAINT "FK_0e3a7a8ef0c7f9ad758f4bc0e94" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "readings" DROP CONSTRAINT "FK_0e3a7a8ef0c7f9ad758f4bc0e94"');
    await queryRunner.query('ALTER TABLE "books" ALTER COLUMN "publishedDate" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "readings" ALTER COLUMN "created_at" SET DEFAULT now()');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()');
    await queryRunner.query('ALTER TABLE "books" DROP COLUMN "imageURL"');
    await queryRunner.query('ALTER TABLE "books" DROP COLUMN "subtitle"');
    await queryRunner.query('ALTER TABLE "readings" ADD CONSTRAINT "FK_0e3a7a8ef0c7f9ad758f4bc0e94" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
  }
}
