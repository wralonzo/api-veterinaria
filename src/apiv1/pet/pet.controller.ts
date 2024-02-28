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
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { JwtAuthGuard } from '../auth/utils/jwt-auth.guard';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  private async create(@Body() createPetDto: CreatePetDto) {
    try {
      return this.petService.create(createPetDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  private async findAll() {
    try {
      return this.petService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  private async findOne(@Param('id') id: string) {
    try {
      return this.petService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  private async update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ) {
    try {
      return this.petService.update(+id, updatePetDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  private async remove(@Param('id') id: string) {
    try {
      return this.petService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
