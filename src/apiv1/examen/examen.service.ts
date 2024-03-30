import { Injectable } from '@nestjs/common';
import { CreateExamanDto } from './dto/create-examan.dto';
import { UpdateExamanDto } from './dto/update-examan.dto';
import { Examen } from '@/typeorm/entities/examen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExamenService {
  constructor(
    @InjectRepository(Examen)
    private readonly repository: Repository<Examen>,
  ) {}
  public async create(createConstancyDto: CreateExamanDto) {
    try {
      const data = await this.repository.save(createConstancyDto);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async findAll() {
    try {
      const data = await this.repository.find({
        relations: {
          examenFk: {
            clientPetFk: {
              clientFk: true,
            },
          },
        },
        order: {
          createdAt: 'DESC',
        },
      });
      return data.map((item) => {
        return {
          id: item.id,
          motivo: item.motivo,
          diagnostico: item.diagnostico,
          createdAt: item.createdAt,
          idPet: item.idPet,
          namePet: item.examenFk.name,
          idClient: item.examenFk.clientPetFk.id,
          nameClient: item.examenFk.clientPetFk.clientFk.name,
        };
      });
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

  public async update(id: number, updateConstancyDto: UpdateExamanDto) {
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
