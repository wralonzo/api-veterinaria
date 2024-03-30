import { Injectable } from '@nestjs/common';
import { Reservation } from '@/typeorm/entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConstancyDto } from '../constancy/dto/create-constancy.dto';
import { UpdateConstancyDto } from '../constancy/dto/update-constancy.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly repository: Repository<Reservation>,
  ) {}
  public async create(createConstancyDto: CreateConstancyDto) {
    try {
      const data = await this.repository.save(createConstancyDto);
      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public async findAll() {
    try {
      const data = await this.repository.find({
        relations: {
          reservacionFk: {
            clientPetFk: {
              clientFk: true,
            },
          },
        },
      });

      return data.map((item) => {
        return {
          id: item.id,
          horaInicio: item.horaInicio,
          horaFin: item.horaFin,
          fecha: item.fecha,
          comentario: item.comentario,
          estado: item.estado,
          idPet: item.idPet,
          namePet: item.reservacionFk.name,
          createdAt: item.createdAt,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: number) {
    try {
      const data = await this.repository.find({
        where: {
          id,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, updateConstancyDto: UpdateConstancyDto) {
    try {
      const data = await this.repository.update({ id }, updateConstancyDto);
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: number) {
    try {
      const data = await this.repository.softDelete({ id });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
