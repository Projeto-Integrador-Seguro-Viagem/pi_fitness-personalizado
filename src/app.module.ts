import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTreinoModule } from './tipotreino/tipotreino.module';
import { TipoTreino } from './tipotreino/entities/tipotreino.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_fitness_personalizado',
      entities: [TipoTreino],
      synchronize: true,
      logging: true,
    }),
    TipoTreinoModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
