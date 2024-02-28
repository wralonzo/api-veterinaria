import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { JwtAuthGuard } from '../auth/utils/jwt-auth.guard';

@Controller({ path: 'client', version: '1' })
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  private async create(@Body() createClientDto: CreateClientDto) {
    try {
      return await this.clientService.create(createClientDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  private async findAll() {
    try {
      console.log('hola cliente');
      return await this.clientService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  private findOne(@Param('id') id: string) {
    try {
      return this.clientService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  private update(
    @Param('id') id: string,
    @Body() updateClientDto: CreateClientDto,
  ) {
    try {
      return this.clientService.update(+id, updateClientDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  private async remove(@Param('id') id: string) {
    try {
      return await this.clientService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
