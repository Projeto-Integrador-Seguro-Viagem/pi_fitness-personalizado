import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Exercicio } from "../../exercicio/entities/exercicio.entity";

@Entity ({ name: "tb_tipotreino"}) // Indicando que a classe é uma entidade/model
export class TipoTreino {

    @PrimaryGeneratedColumn() 
    id: number;

    @IsNotEmpty() // Validador de objeto
    @Column({ length: 100, nullable: false}) // Regra do MySQL - NOT NULL
    nome: string;

    @IsNotEmpty() // Validador de objeto
    @Column({ length: 1000, nullable: false}) // Regra do MySQL - NOT NULL
    descricao: string;

    @IsNotEmpty() // Validador de objeto
    @Column({ length: 50, nullable: false}) // Regra do MySQL - NOT NULL
    nivel: string;

    @OneToMany(() => Exercicio, (exercicio) => exercicio.tipoTreino)
    exercicios: Exercicio[];
}