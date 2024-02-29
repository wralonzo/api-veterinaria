import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard as Guard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends Guard('jwt') implements IAuthGuard {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const { user }: Request = context.switchToHttp().getRequest();
    // console.log(context.switchToHttp().getRequest());
    return user ? true : false;
  }
}
