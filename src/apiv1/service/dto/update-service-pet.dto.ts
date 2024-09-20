import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateServicePetDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  time: number;

  @IsNumber()
  @IsOptional()
  idService: number;
}
