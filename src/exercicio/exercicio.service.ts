import { Injectable } from '@nestjs/common';
import { CreateExercicioDto } from './dto/create-exercicio.dto';
import { UpdateExercicioDto } from './dto/update-exercicio.dto';

@Injectable()
export class ExercicioService {
  private exercicios = [];
  private idCount = 1;

  create(dto: CreateExercicioDto) {
    const novo = { id: this.idCount++, ...dto };
    this.exercicios.push(novo);
    return novo;
  }

  findAll() {
    return this.exercicios;
  }

  findOne(id: number) {
    return this.exercicios.find(e => e.id === id);
  }

  update(id: number, dto: UpdateExercicioDto) {
    const index = this.exercicios.findIndex(e => e.id === id);
    this.exercicios[index] = { ...this.exercicios[index], ...dto };
    return this.exercicios[index];
  }

  remove(id: number) {
    this.exercicios = this.exercicios.filter(e => e.id !== id);
    return { message: 'Exercicio removido' };
  }
}
