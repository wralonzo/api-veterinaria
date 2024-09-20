import { Post, Body, UseGuards, Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/utils/jwt-auth.guard';
import { CreateMeidcamentoDto } from './dto/create.dto';
import { MedicamentoService } from './medicamento.service';

@Controller({
  path: 'medicamento',
  version: '1',
})
export class MedicamentoController {
  constructor(private readonly petService: MedicamentoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  private async create(@Body() createPetDto: CreateMeidcamentoDto) {
    try {
      return this.petService.create(createPetDto);
    } catch (error) {
      throw error;
    }
  }
}
