import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentoService } from './medicamento.service';
import { Medicamento } from '@/typeorm/entities/medicamentos.entity';
import { MedicamentoController } from './medicamento.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicamento])
  ],
  controllers: [MedicamentoController],
  providers: [MedicamentoService],
})
export class MedicamentoModule {}
