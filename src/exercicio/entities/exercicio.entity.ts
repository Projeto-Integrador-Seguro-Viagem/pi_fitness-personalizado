import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { TipoTreino } from '../../tipotreino/entities/tipotreino.entity';

@Entity('tb_exercicios')
export class Exercicio {
  @PrimaryGeneratedColumn()
  id: number; // PK

  @Column({ type: 'varchar', length: 100 })
  nome_exercicio: string;

  @Column({ type: 'varchar', length: 100 })
  grupo_muscular: string;

  @Column({ type: 'int' })
  series: number;

  @Column({ type: 'int' })
  caloriasEstimadas: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.exercicios, { onDelete: 'CASCADE' })
  usuario: Usuario; 

  @ManyToOne(() => TipoTreino, (tipoTreino) => tipoTreino.exercicios, { onDelete: 'CASCADE' })
  tipoTreino: TipoTreino; 
}

