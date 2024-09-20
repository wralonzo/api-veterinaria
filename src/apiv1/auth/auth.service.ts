import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth-login.dto';
import { AuthHelper } from './utils/auth.helper';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { EnumState } from '@/shared/enum/state.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private configService: ConfigService,
  ) {}

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public validateApiKey(apiKey: string) {
    const API_KEY: string = this.configService.get<string>('API_KEY');
    const isPasswordValid: boolean = this.helper.isPasswordValid(
      API_KEY,
      apiKey,
    );
    return isPasswordValid;
  }

  public async login(body: LoginDto) {
    try {
      const { email, password }: LoginDto = body;

      const user = await this.repository.findOne({
        relations: {
          appUserFk: {
            userAppFk: true,
          },
          roleUserFk: {
            userRoleFk: true,
            appRoleFk: true,
          },
        },
        where: {
          user: email,
          state: EnumState.ACTIVE,
        },
      });

      if (!user) {
        throw new HttpException(
          'Usuario y/o contraseña incorrectos',
          HttpStatus.NOT_FOUND,
        );
      }

      const isPasswordValid: boolean = this.helper.isPasswordValid(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new HttpException(
          'Usuario y/o contraseña incorrectos',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.repository.update({ id: user.id }, { lastLogin: new Date() });

      const token = this.helper.generateToken(user);
      if (token) {
        return {
          idUser: user.id,
          name: user.name,
          surname: user.surname,
          user: user.user,
          email: user.email,
          token: token,
          typeUser: user.typeUser,
          apps: user.appUserFk.map((item) => {
            return {
              id: item.userAppFk.id,
              name: item.userAppFk.name,
              route: item.userAppFk.route,
            };
          }),
          rols: user.roleUserFk.map((item) => `${item.userRoleFk.key}_${item.appRoleFk.route}`),
        };
      }
    } catch (error) {
      throw error;
    }
  }

  public async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }
}
