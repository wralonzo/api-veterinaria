import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Client } from '@/typeorm/entities/client.entity';
import { EnumState } from '@/shared/enum/state.enum';
import { EnumTypeUser } from '@/shared/enum/type-user.enum';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
    private readonly serviceUser: UserService,
  ) {}

  public async create(body: CreateClientDto) {
    try {
      const user = await this.serviceUser.create(body.user);
      if (user) {
        body.client.idUser = user.id;
        const client = await this.repository.save(body.client);
        if (client) {
          return user;
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
      const request = await this.repository.findOneBy({
        id: id,
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
          };
          const updateUser = await this.serviceUser.update(user);
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
      if (deleteClient.affected > 0) {
        return true;
      }
      throw new HttpException(`Cliente no eliminado`, HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }
}
