import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentoService } from './medicamento.service';
import { Medicamento } from '@/typeorm/entities/medicamentos.entity';
import { MedicamentoController } from './medicamento.controller';
import { Pet } from '@/typeorm/entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicamento, Pet])],
  controllers: [MedicamentoController],
  providers: [MedicamentoService],
})
export class MedicamentoModule {}
