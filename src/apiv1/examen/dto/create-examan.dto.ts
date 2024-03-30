import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExamanDto {
  @IsNumber()
  @IsNotEmpty()
  idPet: number;

  @IsString()
  @IsNotEmpty()
  motivo: string;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;
}
