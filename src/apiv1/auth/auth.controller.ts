import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './utils/jwt-auth.guard';

import { Request } from 'express';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  private async login(@Body() body: LoginDto) {
    try {
      const DATA = await this.authService.login(body);
      const RESPONSE = DATA;
      return RESPONSE;
    } catch (error) {
      throw error;
    }
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() { user }: Request): Promise<string | never> {
    return this.authService.refresh(<any>user);
  }
}
