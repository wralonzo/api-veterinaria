import { CreateUserDto } from '@/apiv1/user/dto/create-user.dto';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ClientDto } from './client.dto';

export class CreateClientDto {
  @IsObject()
  @IsOptional()
  @ValidateNested()
  user: CreateUserDto;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  client: ClientDto;
}

