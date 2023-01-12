import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateReading1673566286025 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'readings',
        columns: [
          {
            name: 'id',
            type: 'uuid'
          },
          {
            name: 'current_page',
            type: 'timestamp'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('readings');
  }

}
