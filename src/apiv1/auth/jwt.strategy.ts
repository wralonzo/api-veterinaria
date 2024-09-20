import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthHelper } from './utils/auth.helper';
import { ConfigService } from '@nestjs/config';
import { User } from '@/typeorm/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(@Inject(ConfigService) config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:  config.get('JWT_KEY'),
      ignoreExpiration: true,
    });
  }

  private async validate(payload: string): Promise<User | never> {
    return await this.helper.validateUser(payload);
  }
}