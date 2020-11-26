import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createFuncionários1605704115314 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "funcionario",
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'funcao',
          type: 'varchar'
        },
        {
          name: 'departamento',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar'
        },
        {
          name: 'telefone',
          type: 'number'
        },
        {
          name: 'curtir',
          type: 'number',
          default: 0
        }
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('funcionario')
  }

}
