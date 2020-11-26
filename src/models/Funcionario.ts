import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Fotos_funcionario from './Fotos_funcionario';

@Entity('funcionario')
export default class Funcionario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  funcao: string;

  @Column()
  departamento: string;

  @Column()
  email: string;

  @Column()
  telefone: number;

  @Column()
  curtir: number;

  @OneToMany(() => Fotos_funcionario, fotos_funcionario => fotos_funcionario.funcionario, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'funcionario_id' })
  fotos_funcionario: Fotos_funcionario[];
}