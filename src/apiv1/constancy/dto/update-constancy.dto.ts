import { PartialType } from '@nestjs/mapped-types';
import { CreateConstancyDto } from './create-constancy.dto';

export class UpdateConstancyDto extends PartialType(CreateConstancyDto) {}
