import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicePetService } from './service-pet.service';
import { CreateServicePetDto } from './dto/create-service-pet.dto';
import { UpdateServicePetDto } from './dto/update-service-pet.dto';

@Controller('service-pet')
export class ServicePetController {
  constructor(private readonly servicePetService: ServicePetService) {}

  @Post()
  private async create(@Body() createServicePetDto: CreateServicePetDto) {
    try {
      return this.servicePetService.create(createServicePetDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  private async findAll() {
    try {
      return this.servicePetService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  private async findOne(@Param('id') id: string) {
    try {
      return this.servicePetService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  private async update(
    @Param('id') id: string,
    @Body() updateServicePetDto: UpdateServicePetDto,
  ) {
    try {
      return this.servicePetService.update(+id, updateServicePetDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  private async remove(@Param('id') id: string) {
    try {
      return this.servicePetService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
