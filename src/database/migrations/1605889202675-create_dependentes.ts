import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createDependentes1605889202675 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "dependente",
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
          name: 'data_nascimento',
          type: 'varchar'
        },
        {
          name: 'grau_parentesco',
          type: 'varchar'
        },
        {
          name: 'funcionario_id',
          type: 'integer',
        }
      ],
      foreignKeys: [
        {
          name: 'Dependentes',
          columnNames: ['funcionario_id'],
          referencedTableName: 'funcionario',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
    ]
    }))
  }
           

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dependente')
  }

}
