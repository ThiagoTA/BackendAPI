import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Funcionario from './Funcionario'

@Entity('fotos_funcionarios')
export default class Fotos_funcionario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne (() => Funcionario, funcionario => funcionario.fotos_funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario[];
}