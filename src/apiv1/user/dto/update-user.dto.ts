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
  public name?: string;

  @IsString()
  @IsOptional()
  @Transform((param) => param.value.toUpperCase())
  public surname?: string;

  @IsString()
  @IsOptional()
  public mobile?: string;

  @IsString()
  @IsOptional()
  public password?: string;

  @IsString()
  @IsOptional()
  public email?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public id: number;

  @IsOptional()
  public typeUser?: EnumTypeUser;
}
