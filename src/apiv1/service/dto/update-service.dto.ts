import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
}
