import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTreino } from './entities/tipotreino.entity';
import { TipoTreinoController } from './controller/tipotreino.controller';
import { TipoTreinoService } from './services/tipotreino.service';


@Module({
  imports: [TypeOrmModule.forFeature([TipoTreino])],
  controllers: [TipoTreinoController],
  providers: [TipoTreinoService],
  exports: [],
})
export class TipoTreinoModule {}
