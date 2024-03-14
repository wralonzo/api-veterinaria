import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PetModule } from './pet/pet.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { ServicePetModule } from './service-pet/service-pet.module';
import { ConsultModule } from './consult/consult.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [ClientModule, PetModule, VaccineModule, ServicePetModule, ConsultModule, ServiceModule],
})
export class ApiModule { }
