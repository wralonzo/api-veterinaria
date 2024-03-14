import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConsultDto {
  @IsString()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  name: string;

  @IsString()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  description: string;

  @IsNotEmpty()
  @IsNumber()
  pet: number;

  @IsNotEmpty()
  @IsNumber()
  idUserRegister: number;
}
