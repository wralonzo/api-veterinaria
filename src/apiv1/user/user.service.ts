import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthHelper } from '../auth/utils/auth.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from '../../typeorm/entities/user.entity';
import { EnumState } from '../../shared/enum/state.enum';
import { EnumTypeUser } from '@/shared/enum/type-user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) { }

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async create(
    body: CreateUserDto,
  ): Promise<User> {
    try {
      const generateUserPass = this.generateUser(body.name, body.surname);
      const userExist = await this.repository.findOne({
        where: {
          user: generateUserPass.user,
          state: EnumState.ACTIVE,
        },
      });
      if (!userExist) {
        body.password = this.helper.encodePassword(generateUserPass.password);
        body.user = generateUserPass.user;
        body['passwordGenerate'] = generateUserPass.password;

        const newUser = await this.repository.save(body);
        if (newUser) {
          return newUser;
        }
        throw new HttpException(
          'Error al guardar el usuario',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        `Error ya existe el usuario con el codigo ${generateUserPass.user}`,
        HttpStatus.CONFLICT,
      );
    } catch (error) {
      throw error;
    }
  }

  public async findAll(typeUser: EnumTypeUser) {
    try {
      const users = await this.repository.find({
        relations: {
          appUserFk: {
            userAppFk: true,
          },
          roleUserFk: {
            userRoleFk: true,
            appRoleFk: true
          },
        },
        where: {
          state: EnumState.ACTIVE,
          typeUser: Not(EnumTypeUser.CLIENT),
        },
      });
      if (users.length > 0) {
        return users.map((user) => {
          return {
            idUser: user.id,
            name: user.name,
            surname: user.surname,
            user: user.user,
            email: user.email,
            mobile: user.mobile,
            passwordGenerate: user.passwordGenerate,
            type: user.typeUser,
            apps: user.appUserFk.map((item) => {
              return {
                id: item.id,
                name: item.userAppFk.name,
                route: item.userAppFk.route,
              };
            }),
            rols: user.roleUserFk.map((item) => {
              return {
                id: item.id,
                name: item.userRoleFk.name,
                key: `${item.userRoleFk.key}_${item.appRoleFk.route}`,
              };
            }),
          };
        });
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: number) {
    try {
      const user = await this.repository.findOne({
        relations: {
          appUserFk: {
            userAppFk: true,
          },
          roleUserFk: {
            roleUserFk: true,
          },
        },
        where: {
          id: id,
          state: EnumState.ACTIVE,
        },
      });
      if (user) {
        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          user: user.user,
          email: user.email,
          typeUser: user.typeUser,
          passwordGenerate: user.passwordGenerate,
          apps: user.appUserFk.map((item) => {
            return {
              id: item.userAppFk.id,
              name: item.userAppFk.name,
              route: item.userAppFk.route,
            };
          }),
          role: user.roleUserFk.map((item) => {
            return {
              id: item.roleUserFk.id,
              name: item.userRoleFk.name,
              key: `${item.userRoleFk.key}_${item.appRoleFk.route}`,
            };
          }),
        };
      }
      throw new NotFoundException('No existe el usuario');
    } catch (error) {
      throw error;
    }
  }

  public async update(body: UpdateUserDto) {
    try {
      const exist = await this.findOne(body.id);
      if (exist) {
        const REQUEST_DB = await this.repository.update({ id: exist.id }, body);
        if (REQUEST_DB) {
          return true;
        }
        throw new HttpException(
          'Error no se actualizo el registro',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException('Error el código ya existe', HttpStatus.CONFLICT);
    } catch (error) {
      throw error;
    }
  }

  public async remove(id: number) {
    try {
      const exist = await this.findOne(id);
      const REQUEST_DB = await this.repository.softDelete({
        id: exist.id,
      });
      if (REQUEST_DB) {
        console.log(REQUEST_DB);
        return true;
      }
      throw new ConflictException('Error no se actualizo el registro');
    } catch (error) {
      throw error;
    }
  }

  private generateUser(
    firstName: string,
    surname: string,
  ): { user: string; password: string } {
    try {
      const userName = `${firstName.substring(0, 2)}${surname.substring(0, 2)}${Math.floor(Math.random() * 1000)}`;
      const userPass = Math.random().toString(36).slice(-8);
      return {
        user: userName,
        password: userPass,
      };
    } catch (error) {
      throw error;
    }
  }
}
