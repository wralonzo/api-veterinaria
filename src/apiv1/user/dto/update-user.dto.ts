import { EnumTypeUser } from '@/shared/enum/type-user.enum';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Transform((param) => param.value.toUpperCase())
  public name: string;

  @IsString()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  public surname?: string;

  @IsString()
  @IsNotEmpty()
  public password?: string;

  @IsString()
  @IsOptional()
  public email: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public id: number;

  @IsOptional()
  public typeUser: EnumTypeUser;
}
