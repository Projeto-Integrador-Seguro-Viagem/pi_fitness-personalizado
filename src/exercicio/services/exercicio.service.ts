import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercicio } from '../entities/exercicio.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ExercicioService {
  constructor(
    @InjectRepository(Exercicio)
    private exercicioRepository: Repository<Exercicio>,
  ) {}

  async findAll(): Promise<Exercicio[]> {
    return await this.exercicioRepository.find({
      relations: {
        usuario: true,
        tipoTreino: true,
      },
    });
  }

  async findById(id: number): Promise<Exercicio> {
    const exercicios = await this.exercicioRepository.findOne({
      where: { id },
      relations: {
        usuario: true,
        tipoTreino: true,
      },
    });

    if (!exercicios)
      throw new HttpException(
        'Exercicio não encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return exercicios;
  }

  async findByNomeExercicio(nome_exercicio: string): Promise<Exercicio[]> {
    return await this.exercicioRepository.find({
      where: { nome_exercicio },
      relations: {
        tipoTreino: true,
      },
    });
  }

  async findByGrupoMuscular(grupo_muscular: string): Promise<Exercicio[]> {
    return await this.exercicioRepository.find({
      where: { grupo_muscular },
      relations: {
        tipoTreino: true,
      },
    });
  }

  async create(exercicios: Exercicio): Promise<Exercicio> {
    const exercicio = this.exercicioRepository.create();
    return await this.exercicioRepository.save(exercicios);
  }

  async update(exercicios: Exercicio): Promise<Exercicio> {
    let exercicioUpdate: Exercicio = await this.findById(exercicios.id); 

    if (!exercicioUpdate)
      throw new HttpException('Exercício não encontrado!', HttpStatus.NOT_FOUND);

    return await this.exercicioRepository.save(exercicios);
  }

  async delete(id: number): Promise<DeleteResult> {
    let buscaTreino = await this.findById(id);

    if (!buscaTreino)
      throw new HttpException(
        'Exercicio não encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return await this.exercicioRepository.delete(id);
  }
}
