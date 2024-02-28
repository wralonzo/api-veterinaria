import { PartialType } from '@nestjs/mapped-types';
import { CreateServicePetDto } from './create-service-pet.dto';

export class UpdateServicePetDto extends PartialType(CreateServicePetDto) {}
