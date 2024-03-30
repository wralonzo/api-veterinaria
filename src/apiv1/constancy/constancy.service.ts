import { Injectable } from '@nestjs/common';
import { CreateConstancyDto } from './dto/create-constancy.dto';
import { UpdateConstancyDto } from './dto/update-constancy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Constancy } from '@/typeorm/entities/contancy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConstancyService {
  constructor(
    @InjectRepository(Constancy)
    private readonly repository: Repository<Constancy>,
  ) {}
  public async create(createConstancyDto: CreateConstancyDto) {
    try {
      return await this.repository.save(createConstancyDto);
    } catch (error) {
      throw error;
    }
  }

  public async findAll() {
    try {
      const data = await this.repository.find({
        relations: {
          constancyFk: true,
        },
      });
      return data.map((item) => {
        return {
          id: item.id,
          comentario: item.comentario,
          idPet: item.idPet,
          namePet: item.constancyFk.name,
          createdAt: item.createdAt,
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

  public async update(id: number, updateConstancyDto: UpdateConstancyDto) {
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
