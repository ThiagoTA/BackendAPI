import {MigrationInterface, QueryRunner, Table} from "typeorm";


export class createFotosFuncionario1605808657608 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table ({
      name: 'fotos_funcionarios',
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
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'funcionario_id',
          type: 'integer',
        },
      ],
      foreignKeys: [
        {
          name: 'FotoFuncionario',
          columnNames: ['funcionario_id'],
          referencedTableName: 'funcionario',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
    ]
    }));  
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fotos_funcionarios');
  }

}
