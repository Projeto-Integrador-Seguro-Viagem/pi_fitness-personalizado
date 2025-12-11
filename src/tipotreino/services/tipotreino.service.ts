// import { ExercicioService};
import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TipoTreino } from "../entities/tipotreino.entity";

@Injectable() // Indica que é uma Classe de Serviço e pode ser inserida/injetada 
export class TipoTreinoService {
    constructor(
        @InjectRepository(TipoTreino) 
        private tipoTreinoRepository: Repository<TipoTreino>
    ) { }

    async findAll(): Promise<TipoTreino[]> {
        return await this.tipoTreinoRepository.find({
            relations:{ // Indica que queremos trazer também o relacionamento
                exercicios: true
            }
        });
    }

    async findById(id: number): Promise<TipoTreino> {  // Verifica primeiro se a postagem existe

        const tipoTreino = await this.tipoTreinoRepository.findOne({
            where: {id},
            relations:{
                exercicios: true
            }
        });

        if (!tipoTreino) // Se o treino não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
            throw new HttpException('Tipo de Treino não encontrado!', HttpStatus.NOT_FOUND);

        return tipoTreino;
    }

    async findByNivel(nivel: string): Promise<TipoTreino[]> {
        return await this.tipoTreinoRepository.find({
            where:{nivel},
            relations:{
               exercicios: true
            }
        })
    }

    async findByDescricao(descricao: string): Promise<TipoTreino[]> {
        return await this.tipoTreinoRepository.find({
            where:{ descricao: ILike(`%${descricao}%`)},
            relations:{
                exercicios: true
            }
        })
    }

    async create(tipoTreino: TipoTreino): Promise<TipoTreino> {
       
     const existente = await this.tipoTreinoRepository.findOne({
            where: { nome: tipoTreino.nome },
        });

        if (existente) {
            throw new BadRequestException("Já existe um treino com esse nome!");
        }

        return this.tipoTreinoRepository.save(tipoTreino);
            

    }

    async update(tipoTreino: TipoTreino): Promise<TipoTreino> {
        
        let buscaTreino: TipoTreino = await this.findById(tipoTreino.id);   // Chama o método findById anteriro para pesquisar uma postagem pelo id extraido do objeto postagem

        if (!buscaTreino || !tipoTreino.id) // Se o treino não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
            throw new HttpException('Treino não encontrado!', HttpStatus.NOT_FOUND);
    
        return await this.tipoTreinoRepository.save({
            ...buscaTreino,
            ...tipoTreino,
    });

    }
        
    async delete(id: number): Promise<DeleteResult> {
        
        let buscaTreino = await this.findById(id);

        if (!buscaTreino)
            throw new HttpException('Treino não encontrado!', HttpStatus.NOT_FOUND);

        return await this.tipoTreinoRepository.delete(id);

    }

}