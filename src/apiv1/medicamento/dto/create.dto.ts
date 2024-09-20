import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMeidcamentoDto {
  @IsNotEmpty()
  @IsString()
  @Transform((param) => param.value.toUpperCase())
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform((param) => param.value.toUpperCase())
  description: string;

  @IsNotEmpty()
  @IsNumber()
  idPet: number;

  @IsNotEmpty()
  @IsNumber()
  idUser: number;
}
