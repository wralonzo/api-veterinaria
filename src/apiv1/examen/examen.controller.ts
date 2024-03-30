import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamenService } from './examen.service';
import { CreateExamanDto } from './dto/create-examan.dto';
import { UpdateExamanDto } from './dto/update-examan.dto';

@Controller({
  version: '1',
  path: 'examen',
})
export class ExamenController {
  constructor(private readonly examenService: ExamenService) {}

  @Post()
  private async create(@Body() createConstancyDto: CreateExamanDto) {
    return await this.examenService.create(createConstancyDto);
  }

  @Get()
  private async findAll() {
    return await this.examenService.findAll();
  }

  @Get(':id')
  private async findOne(@Param('id') id: string) {
    return await this.examenService.findOne(+id);
  }

  @Patch(':id')
  private async update(
    @Param('id') id: string,
    @Body() updateConstancyDto: UpdateExamanDto,
  ) {
    return await this.examenService.update(+id, updateConstancyDto);
  }

  @Delete(':id')
  private async remove(@Param('id') id: string) {
    return await this.examenService.remove(+id);
  }
}
