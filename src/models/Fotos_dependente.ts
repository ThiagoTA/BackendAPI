import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Dependente from './Dependente'

@Entity('fotos_dependentes')
export default class Fotos_dependente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne (() => Dependente, dependente => dependente.fotos_dependente)
  @JoinColumn({ name: 'dependente_id' })
  dependente: Dependente;
}

