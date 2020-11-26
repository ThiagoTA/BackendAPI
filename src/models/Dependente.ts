import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Fotos_dependente from './Fotos_dependente';

@Entity('dependente')
export default class Dependente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  data_nascimento: string;

  @Column()
  grau_parentesco: string;

  @Column()
  funcionario_id: string;

  @OneToMany(() => Fotos_dependente, fotos_dependente => fotos_dependente.dependente, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'dependente_id' })
  fotos_dependente: Fotos_dependente[];
}