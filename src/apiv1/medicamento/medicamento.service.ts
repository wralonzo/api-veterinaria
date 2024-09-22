import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from '@/typeorm/entities/pet.entity';
import { Medicamento } from '@/typeorm/entities/medicamentos.entity';
import { CreateMeidcamentoDto } from './dto/create.dto';
import { UpdateMedicamentoDto } from './dto/update.dto';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private readonly repository: Repository<Medicamento>,
    @InjectRepository(Pet)
    private readonly repositoryPet: Repository<Pet>,
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

  public async findAll() {
    try {
      const data = await this.repository.find({
        order: {
          dateCreated: 'DESC',
        },
      });

      const response = [];

      for await (const item of data) {
        const pet = await this.repositoryPet.findOne({
          where: {
            id: item.idPet,
          },
        });
        response.push({
          ...item,
          namePet: pet.name,
          pet: pet,
        });
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: number) {
    try {
      return await this.repository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, updateConstancyDto: UpdateMedicamentoDto) {
    try {
      return await this.repository.update({ id }, updateConstancyDto);
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: number) {
    try {
      return await this.repository.softDelete({ id });
    } catch (error) {
      throw error;
    }
  }
}
