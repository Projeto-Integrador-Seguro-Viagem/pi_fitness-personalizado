import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercicio } from './entities/exercicio.entity';
import { ExercicioController } from './controllers/exercicio.controller';
import { ExercicioService } from './services/exercicio.service';
import { TipoTreino } from '../tipotreino/entities/tipotreino.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Exercicio]), TipoTreino],
  controllers: [ExercicioController],
  providers: [ExercicioService],
  exports: [],
})
export class ExercicioModule {}



