import { IsNumber, IsOptional, IsString } from "class-validator";

export class ClientDto {
    @IsOptional()
    @IsString()
    address: string;
  
    @IsOptional()
    idUser?: number;
  
    @IsOptional()
    @IsNumber()
    idUserRegister?: number;
  }