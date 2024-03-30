import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConstancyService } from './constancy.service';
import { CreateConstancyDto } from './dto/create-constancy.dto';
import { UpdateConstancyDto } from './dto/update-constancy.dto';

@Controller({
  version: '1',
  path: 'constancy',
})
export class ConstancyController {
  constructor(private readonly constancyService: ConstancyService) {}

  @Post()
  private async create(@Body() createConstancyDto: CreateConstancyDto) {
    return await this.constancyService.create(createConstancyDto);
  }

  @Get()
  private async findAll() {
    return await this.constancyService.findAll();
  }

  @Get(':id')
  private async findOne(@Param('id') id: string) {
    return await this.constancyService.findOne(+id);
  }

  @Patch(':id')
  private async update(
    @Param('id') id: string,
    @Body() updateConstancyDto: UpdateConstancyDto,
  ) {
    return await this.constancyService.update(+id, updateConstancyDto);
  }

  @Delete(':id')
  private async remove(@Param('id') id: string) {
    return await this.constancyService.remove(+id);
  }
}
