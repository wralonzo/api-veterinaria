import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentoService } from './pet.service';
import { Medicamento } from '@/typeorm/entities/medicamentos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicamento])
  ],
  controllers: [PetController],
  providers: [MedicamentoService],
})
export class PetModule {}
