import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServicePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  time: number;

  @IsNumber()
  @IsNotEmpty()
  idPet: number;

  @IsNumber()
  @IsNotEmpty()
  idService: number;

  @IsNumber()
  @IsNotEmpty()
  idUserRegister: number;
}
