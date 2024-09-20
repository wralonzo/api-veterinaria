import { Module } from '@nestjs/common';
import { ExamenService } from './examen.service';
import { ExamenController } from './examen.controller';
import { Examen } from '@/typeorm/entities/examen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Examen])],
  controllers: [ExamenController],
  providers: [ExamenService],
})
export class ExamenModule {}
