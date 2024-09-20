import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from '@/typeorm/entities/pet.entity';
import { Medicamento } from '@/typeorm/entities/medicamentos.entity';
import { CreateMeidcamentoDto } from './dto/create.dto';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private readonly repository: Repository<Medicamento>,
  ) {}
  public async create(createPetDto: CreateMeidcamentoDto) {
    try {
      const pet = await this.repository.save(createPetDto);
      if (pet) {
        return pet;
      }
      throw new HttpException('No se creo la mascota', HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }
}
