import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTreinoModule } from './tipotreino/tipotreino.module';
import { TipoTreino } from './tipotreino/entities/tipotreino.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { ExercicioModule } from './exercicio/exercicio.module';
import { Exercicio } from './exercicio/entities/exercicio.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_fitness_personalizado',
      entities: [TipoTreino, Usuario, Exercicio],
      synchronize: true,
      logging: true,
    }),
    TipoTreinoModule,
    UsuarioModule,
    ExercicioModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
