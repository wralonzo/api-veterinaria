import { EnumTypeUser } from '@/shared/enum/type-user.enum';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsEnum, NotEquals } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  public name: string;

  @IsString()
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  public surname: string;

  @IsString()
  @IsOptional()
  public mobile: string;

  @IsString()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public password: string;

  @IsOptional()
  @IsString()
  public user: string;

  @IsEnum(EnumTypeUser)
  public typeUser: EnumTypeUser;
}
