import {
  Post,
  Body,
  UseGuards,
  Controller,
  Param,
  Delete,
  Patch,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/utils/jwt-auth.guard';
import { CreateMeidcamentoDto } from './dto/create.dto';
import { MedicamentoService } from './medicamento.service';
import { UpdateMedicamentoDto } from './dto/update.dto';

@Controller({
  path: 'medicamento',
  version: '1',
})
export class MedicamentoController {
  constructor(private readonly service: MedicamentoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  private async create(@Body() createPetDto: CreateMeidcamentoDto) {
    try {
      return this.service.create(createPetDto);
    } catch (error) {
      throw error;
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  private async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  private async findOne(@Param('id') id: string) {
    try {
      return await this.service.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  private async update(
    @Param('id') id: string,
    @Body() updateConsultDto: UpdateMedicamentoDto,
  ) {
    try {
      return this.service.update(+id, updateConsultDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  private async remove(@Param('id') id: string) {
    try {
      return this.service.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
