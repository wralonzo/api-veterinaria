import { Module } from '@nestjs/common';
import { ServicePetService } from './service-pet.service';
import { ServicePetController } from './service-pet.controller';

@Module({
  controllers: [ServicePetController],
  providers: [ServicePetService],
})
export class ServicePetModule {}
