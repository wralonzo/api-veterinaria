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
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/utils/jwt-auth.guard';
import { CreateServicePetDto } from './dto/create-service-pet.dto';
import { UpdateServicePetDto } from './dto/update-service-pet.dto';

@Controller({
  path: 'service',
  version: '1',
})
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  private async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      return this.serviceService.create(createServiceDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('pet')
  private async createPetService(
    @Body() createServiceDto: CreateServicePetDto,
  ) {
    try {
      return this.serviceService.createPet(createServiceDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('pet')
  private async getPetService() {
    try {
      return this.serviceService.findPet();
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  private async findAll() {
    try {
      return await this.serviceService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  private async findOne(@Param('id') id: string) {
    try {
      return this.serviceService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  private async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    try {
      return this.serviceService.update(+id, updateServiceDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('pet/:id')
  private async updatePet(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServicePetDto,
  ) {
    try {
      return this.serviceService.updatePet(+id, updateServiceDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  private async remove(@Param('id') id: string) {
    try {
      return this.serviceService.remove(+id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('pet/:id')
  private async removePet(@Param('id') id: string) {
    try {
      return this.serviceService.removePet(+id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('pet/:id')
  private async petFinds(@Param('id') id: string) {
    try {
      return this.serviceService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }
}
