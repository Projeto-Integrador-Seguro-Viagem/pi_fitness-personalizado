import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '83626122.Ends',
      database: 'db_fitness_personalizado',
      entities: [],
      synchronize: true,
      logging: true,
    }),

  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
