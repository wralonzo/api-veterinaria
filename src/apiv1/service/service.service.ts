import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '@/typeorm/entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly repository: Repository<Service>,
  ) {}

  public async create(createServiceDto: CreateServiceDto) {
    try {
      const data = await this.repository.save(createServiceDto);
      if (data) return data;
      throw new HttpException('No se agrego el registro', HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }

  public async findAll() {
    try {
      const data = await this.repository.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: number) {
    try {
      const data = await this.repository.findOne({ where: { id } });
      if (data) return data;
      throw new HttpException(
        'No se encontro el registro',
        HttpStatus.CONFLICT,
      );
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const data = await this.repository.update({ id }, updateServiceDto);
      if (data.affected > 0) return true;
      throw new HttpException(
        'No se modifico el registro',
        HttpStatus.CONFLICT,
      );
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: number) {
    try {
      const data = await this.repository.softDelete({ id });
      if (data.affected > 0) return true;
      throw new HttpException(
        'No se modifico el registro',
        HttpStatus.CONFLICT,
      );
    } catch (error) {
      throw error;
    }
  }
}
