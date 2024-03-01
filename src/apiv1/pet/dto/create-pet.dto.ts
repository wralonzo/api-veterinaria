import { EnumTypePet } from '@/shared/enum/type-pet.enum';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  @Transform((param) => param.value.toUpperCase())
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsEnum(EnumTypePet)
  @IsNotEmpty()
  gender: EnumTypePet;

  @IsNotEmpty()
  @IsNumber()
  client: number;

  @IsNotEmpty()
  @IsNumber()
  idUser: number;

  @IsNotEmpty()
  @IsString()
  @Transform((param) => param.value.toUpperCase())
  race: string;
}
