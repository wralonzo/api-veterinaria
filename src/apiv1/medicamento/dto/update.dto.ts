import { PartialType } from '@nestjs/mapped-types';
import { CreateMeidcamentoDto } from './create.dto';
export class UpdateMedicamentoDto extends PartialType(CreateMeidcamentoDto) {}
