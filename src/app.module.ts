import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTreinoModule } from './tipotreino/tipotreino.module';
import { TipoTreino } from './tipotreino/entities/tipotreino.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_fitness_personalizado',
      entities: [TipoTreino, Usuario], // ← combinar aqui
      synchronize: true,
      logging: true,
    }),
    TipoTreinoModule,
    UsuarioModule, // ← manter os dois módulos
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
