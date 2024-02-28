import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Transform((param) => param.value.toUpperCase())
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}