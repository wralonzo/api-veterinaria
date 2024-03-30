import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller({
  version: '1',
  path: 'reservation',
})
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  private async create(@Body() createConstancyDto: CreateReservationDto) {
    return await this.reservationService.create(createConstancyDto);
  }

  @Get()
  private async findAll() {
    return await this.reservationService.findAll();
  }

  @Get(':id')
  private async findOne(@Param('id') id: string) {
    return await this.reservationService.findOne(+id);
  }

  @Patch(':id')
  private async update(
    @Param('id') id: string,
    @Body() updateConstancyDto: UpdateReservationDto,
  ) {
    return await this.reservationService.update(+id, updateConstancyDto);
  }

  @Delete(':id')
  private async remove(@Param('id') id: string) {
    return await this.reservationService.remove(+id);
  }
}
