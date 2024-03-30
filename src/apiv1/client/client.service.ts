import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Client } from '@/typeorm/entities/client.entity';
import { EnumState } from '@/shared/enum/state.enum';
import { EnumTypeUser } from '@/shared/enum/type-user.enum';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { Pet } from '@/typeorm/entities/pet.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
    @InjectRepository(Pet)
    private readonly repositoryPet: Repository<Pet>,
    private readonly serviceUser: UserService,
  ) {}

  public async create(body: CreateClientDto) {
    try {
      const user = await this.serviceUser.create(body.user);
      if (user) {
        body.client.idUser = user.id;
        const client = await this.repository.save(body.client);
        if (client) {
          return {
            id: client.id,
            address: client.address,
            name: user.name,
            surname: user.surname,
            user: user.user,
            email: user.email,
            mobile: user.mobile,
            passwordGenerate: user.passwordGenerate,
          };
        }
        throw new HttpException(
          'Error al guardar el cliente',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Error al guardar el usuario',
        HttpStatus.CONFLICT,
      );
    } catch (error) {
      throw error;
    }
  }

  public async findAll() {
    try {
      const request = await this.repository.find({
        relations: {
          clientFk: true,
        },
        where: {
          state: EnumState.ACTIVE,
          clientFk: {
            typeUser: EnumTypeUser.CLIENT,
          },
        },
        order: {
          dateCreated: 'DESC',
        },
      });

      const data = request.map((client) => {
        return {
          id: client.id,
          address: client.address,
          name: client.clientFk.name,
          surname: client.clientFk.surname,
          user: client.clientFk.user,
          email: client.clientFk.email,
          mobile: client.clientFk.mobile,
          passwordGenerate: client.clientFk.passwordGenerate,
        };
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: number) {
    try {
      const request = await this.repository.findOne({
        relations: {
          clientFk: true,
        },
        where: {
          id: id,
        },
      });

      return {
        id: request.id,
        address: request.address,
        name: request.clientFk.name,
        surname: request.clientFk.surname,
        user: request.clientFk.user,
        email: request.clientFk.email,
        mobile: request.clientFk.mobile,
        idUser: request.clientFk.id,
      };
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, updateClientDto: CreateClientDto) {
    try {
      const client = await this.findOne(id);
      if (client) {
        const request = await this.repository.update(
          {
            id: id,
          },
          updateClientDto.client,
        );
        if (request.affected > 0) {
          const user: UpdateUserDto = {
            name: updateClientDto.user.name,
            email: updateClientDto.user.email,
            id: client.idUser,
            typeUser: updateClientDto.user.typeUser,
            mobile: updateClientDto.user.mobile,
            surname: updateClientDto.user.surname,
          };
          const updateUser = await this.serviceUser.update(user);
          if (updateUser) {
            return client;
          }
        }
        throw new HttpException(
          `No se actualizo el cliente`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(`Cliente no registrado`, HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: number) {
    try {
      const deleteClient = await this.repository.softDelete({ id: id });
      console.log(deleteClient);
      if (deleteClient.affected > 0) {
        return true;
      }
      throw new HttpException(`Cliente no eliminado`, HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }

  public async tracking(idClient: number) {
    try {
      const data = await this.repositoryPet.find({
        relations: {
          consultsFk: true,
          serivicePetFk: {
            serviceFK: true,
          },
          examenFk: true,
          reservacionFk: true,
          constancyFk: true,
        },
        where: {
          client: idClient,
        },
      });

      return data.map((item) => {
        const consultas = item.consultsFk.map((itemc) => {
          return {
            id: itemc.id,
            name: itemc.name,
            description: itemc.description,
            dateCreated: itemc.dateCreated,
          };
        });

        const servicios = item.serivicePetFk.map((itemc) => {
          return {
            id: itemc.id,
            name: itemc.name,
            time: itemc.time,
            servicio: itemc.serviceFK.name,
            dateCreated: itemc.dateCreated,
          };
        });

        const examenes = item.examenFk.map((itemc) => {
          return {
            id: itemc.id,
            diagnostico: itemc.diagnostico,
            motivo: itemc.motivo,
            createdAt: itemc.createdAt,
          };
        });
        const constancias = item.constancyFk.map((itemc) => {
          return {
            id: itemc.id,
            comentario: itemc.comentario,
            createdAt: itemc.createdAt,
          };
        });
        const reservaciones = item.reservacionFk.map((itemc) => {
          return {
            id: itemc.id,
            horaInicio: itemc.horaInicio,
            horaFin: itemc.horaFin,
            fecha: itemc.fecha,
            comentario: itemc.comentario,
            estado: itemc.estado,
            createdAt: itemc.createdAt,
          };
        });
        return {
          id: item.id,
          name: item.name,
          age: item.age,
          gender: item.gender,
          race: item.race,
          consultas,
          examenes,
          reservaciones,
          constancias,
          servicios,
        };
      });
    } catch (error) {
      throw error;
    }
  }
}
