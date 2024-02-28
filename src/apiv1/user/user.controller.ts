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

  @Post()
  // @UseGuards(JwtAuthGuard)
  private async create(@Body() body: CreateUserDto) {
    try {
      const data = await this.userService.create(body);
      const response = data;
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  private async findAll(@Param('id') typeUser: EnumTypeUser) {
    try {
      const data = await this.userService.findAll(typeUser);
      const response = data;
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  private async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(+id);
      const response = data;
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  private async update(@Body() body: UpdateUserDto) {
    try {
      const data = await this.userService.update(body);
      const response = data;
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  private async remove(@Param('id') id: string) {
    try {
      const data = await this.userService.remove(+id);
      const response = data;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
