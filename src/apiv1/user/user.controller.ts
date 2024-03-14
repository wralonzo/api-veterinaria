import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/utils/jwt-auth.guard';
import { EnumTypeUser } from '@/shared/enum/type-user.enum';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  private async create(@Body() body: CreateUserDto) {
    try {
      return await this.userService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all/')
  private async findAll(@Param('id') typeUser: EnumTypeUser) {
    try {
      return await this.userService.findAll(typeUser);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  private async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  private async update(@Body() body: UpdateUserDto) {
    try {
      return await this.userService.update(body);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  private async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
