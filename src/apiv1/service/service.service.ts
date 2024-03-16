import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCatalog } from '@/typeorm/entities/service-catalog.entity';
import { Repository } from 'typeorm';
import { ServicePet } from '@/typeorm/entities/service-pet';
import { CreateServicePetDto } from './dto/create-service-pet.dto';
import { UpdateServicePetDto } from './dto/update-service-pet.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceCatalog)
    private readonly repository: Repository<ServiceCatalog>,
    @InjectRepository(ServicePet)
    private readonly repositorypet: Repository<ServicePet>,
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

  public async createPet(createServiceDto: CreateServicePetDto) {
    try {
      const data = await this.repositorypet.save(createServiceDto);
      if (data) return data;
      throw new HttpException('No se agrego el registro', HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<Array<ServiceCatalog>> {
    try {
      const data = await this.repository.find({});
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async findPet(): Promise<Array<any>> {
    try {
      const data = await this.repositorypet.find({
        relations: {
          serivicePetFk: true,
          serviceFK: true,
          serviceRegisterFk: true,
        },
        order: {
          dateCreated: 'desc',
        },
      });
      return data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          time: item.time,
          idServicio: item.serviceFK.id,
          nameServicio: item.serviceFK.name,
          idPet: item.serivicePetFk.id,
          namePet: item.serivicePetFk.name,
          idUser: item.serviceRegisterFk.id,
          nameUser:
            item.serviceRegisterFk.name + ' ' + item.serviceRegisterFk.surname,
          dateCreated: item.dateCreated,
        };
      });
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

  public async updatePet(id: number, updateServiceDto: UpdateServicePetDto) {
    try {
      const data = await this.repositorypet.update({ id }, updateServiceDto);
      if (data.affected > 0) return true;
      throw new HttpException(
        'No se modifico el registro',
        HttpStatus.CONFLICT,
      );
    } catch (error) {
      throw error;
    }
  }

  public async removePet(id: number) {
    try {
      const data = await this.repositorypet.softDelete({ id });
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
