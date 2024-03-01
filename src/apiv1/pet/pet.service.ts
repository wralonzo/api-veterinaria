import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from '@/typeorm/entities/pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly repository: Repository<Pet>,
  ) {}
  public async create(createPetDto: CreatePetDto) {
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
      const pet = await this.repository.find();
      return pet;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: number) {
    try {
      const pet = await this.repository.findOne({
        where: {
          id: id,
        },
      });
      if (pet) {
        return pet;
      }
      throw new HttpException('No se encontro la mascota', HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, updatePetDto: UpdatePetDto) {
    try {
      const pet = await this.repository.update(
        {
          id: id,
        },
        updatePetDto,
      );
      if (pet.affected > 0) {
        return true;
      }
      throw new HttpException(
        'No se actualizo la mascota',
        HttpStatus.CONFLICT,
      );
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: number) {
    try {
      const pet = await this.repository.softDelete({ id: id });
      if (pet.affected > 0) {
        return true;
      }
      throw new HttpException('No se elimino la mascota', HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }

  public async findClient(idClient: number) {
    try {
      const pet = await this.repository.find({
        relations: {
          serivicePetFk: true,
          vaccinePetFk: true,
          consultsFk: true,
        },
        where: {
          client: idClient,
        },
      });
      if (pet.length > 0) {
        return pet;
      }
      throw new HttpException('No se encontro la mascota', HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }
}
