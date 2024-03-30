import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConstancyDto {
  @IsNotEmpty()
  @IsNumber()
  idPet: number;

  @IsNotEmpty()
  @IsString()
  comentario: string;
}
