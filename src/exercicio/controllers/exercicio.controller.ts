import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ExercicioService } from '../services/exercicio.service';
import { Exercicio } from '../entities/exercicio.entity';

@Controller('exercicios')
export class ExercicioController {
  constructor(private readonly exercicioService: ExercicioService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Exercicio[]> {
    return this.exercicioService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Exercicio> {
    return this.exercicioService.findById(id);
  }

  @Get('/grupomuscular/:grupo_muscular')
  @HttpCode(HttpStatus.OK)
  findByGrupoMuscular(
    @Param('grupo_muscular') grupo_muscular: string,
  ): Promise<Exercicio[]> {
    return this.exercicioService.findByGrupoMuscular(grupo_muscular);
  }

  @Get('/nomeexercicio/:nome_exercicio')
  @HttpCode(HttpStatus.OK)
  findByNomeExercicio(
    @Param('nome_exercicio') nome_exercicio: string,
  ): Promise<Exercicio[]> {
    return this.exercicioService.findByNomeExercicio(nome_exercicio);
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() exercicios: Exercicio): Promise<Exercicio> {
    return this.exercicioService.create(exercicios);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() exercicio: Exercicio,
  ): Promise<Exercicio> {
    exercicio.id = id;
    return this.exercicioService.update(exercicio);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.exercicioService.delete(id);
  }
}
