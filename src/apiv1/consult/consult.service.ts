import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateConsultDto } from './dto/create-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { Consult } from '@/typeorm/entities/consult.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConsultService {
  constructor(
    @InjectRepository(Consult)
    private readonly repository: Repository<Consult>,
  ) {}
  public async create(createConsultDto: CreateConsultDto): Promise<Consult> {
    try {
      const create = await this.repository.save(createConsultDto);
      if (create) return create;
      throw new HttpException('No se guardo el registro', HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }

  public async findAll() {
    try {
      const data = await this.repository.find({
        relations: {
          consultsFk: {
            clientPetFk: {
              clientFk: true,
            },
          },
        },
      });
      return data.map((item) => {
        return {
          id: item.id,
          descripcion: item.description,
          name: item.name,
          dateCreated: item.dateCreated,
          client: item.consultsFk.clientPetFk.clientFk.name,
          pet: item.consultsFk.name,
          idClient: item.consultsFk.clientPetFk.id,
          idPet: item.pet,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: number): Promise<Consult> {
    try {
      const data = await this.repository.findOne({
        where: {
          id: id,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, updateConsultDto: UpdateConsultDto) {
    try {
      const data = await this.repository.update({ id }, updateConsultDto);
      if (data.affected > 0) return true;
      throw new HttpException(
        'No se actualizo el registro',
        HttpStatus.CONFLICT,
      );
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: number) {
    try {
      const data = await this.repository.softDelete({
        id,
      });
      if (data.affected > 0) return true;
      throw new HttpException('No se elimino el registro', HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }
}
