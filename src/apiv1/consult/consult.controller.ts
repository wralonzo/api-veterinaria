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
import { ConsultService } from './consult.service';
import { CreateConsultDto } from './dto/create-consult.dto';
import { UpdateConsultDto } from './dto/update-consult.dto';
import { JwtAuthGuard } from '../auth/utils/jwt-auth.guard';

@Controller({ path: 'consult', version: '1' })
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  private async create(@Body() createConsultDto: CreateConsultDto) {
    try {
      return await this.consultService.create(createConsultDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  private async findAll() {
    try {
      return await this.consultService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  private async findOne(@Param('id') id: string) {
    try {
      return await this.consultService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  private async update(
    @Param('id') id: string,
    @Body() updateConsultDto: UpdateConsultDto,
  ) {
    try {
      return this.consultService.update(+id, updateConsultDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  private async remove(@Param('id') id: string) {
    try {
      return this.consultService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
