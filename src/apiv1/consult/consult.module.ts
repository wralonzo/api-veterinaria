import { Module } from '@nestjs/common';
import { ConsultService } from './consult.service';
import { ConsultController } from './consult.controller';
import { Consult } from '@/typeorm/entities/consult.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Consult])],
  controllers: [ConsultController],
  providers: [ConsultService],
})
export class ConsultModule {}
